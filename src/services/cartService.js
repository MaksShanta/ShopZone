import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore'

import { db } from '../firebase/firebase'

export async function getCartItems(userId) {
  const cartRef = collection(db, 'cartItems')

  const q = query(
    cartRef,
    where('userId', '==', userId)
  )

  const snapshot = await getDocs(q)

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }))
}

export async function addProductToCart(userId, product) {
  const cartItems = await getCartItems(userId)

  const existingItem = cartItems.find(
    (item) => item.productId === product.id
  )

  if (existingItem) {
    const itemRef = doc(db, 'cartItems', existingItem.id)

    await updateDoc(itemRef, {
      quantity: existingItem.quantity + 1,
      updatedAt: serverTimestamp(),
    })

    return
  }

  await addDoc(collection(db, 'cartItems'), {
    userId,
    productId: product.id,
    title: product.title,
    price: product.price,
    imageUrl: product.imageUrl,
    quantity: 1,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function updateCartItemQuantity(cartItemId, quantity) {
  const itemRef = doc(db, 'cartItems', cartItemId)

  await updateDoc(itemRef, {
    quantity,
    updatedAt: serverTimestamp(),
  })
}

export async function removeCartItem(cartItemId) {
  const itemRef = doc(db, 'cartItems', cartItemId)
  await deleteDoc(itemRef)
}

export async function clearCart(userId) {
  const items = await getCartItems(userId)

  for (const item of items) {
    await removeCartItem(item.id)
  }
}