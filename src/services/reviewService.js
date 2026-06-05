import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore'

import { db } from '../firebase/firebase'

export async function addReview(productId, user, profile, reviewData) {
  if (!user) {
    throw new Error('Користувач не авторизований')
  }

  const review = {
    productId: String(productId),
    userId: user.uid,
    userName: profile?.name || user.displayName || user.email || 'Користувач',
    rating: Number(reviewData.rating),
    comment: reviewData.comment?.trim() || '',
    createdAt: serverTimestamp(),
  }

  const docRef = await addDoc(collection(db, 'reviews'), review)

  return {
    id: docRef.id,
    ...review,
  }
}

export async function getReviewsByProduct(productId) {
  const q = query(
    collection(db, 'reviews'),
    where('productId', '==', String(productId))
  )

  const snapshot = await getDocs(q)

  const reviews = snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }))

  return reviews.sort((a, b) => {
    const dateA = a.createdAt?.seconds || 0
    const dateB = b.createdAt?.seconds || 0

    return dateB - dateA
  })
}