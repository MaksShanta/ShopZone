import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore'

import { db } from '../firebase/firebase'

const productsCollection = collection(db, 'products')

export async function getProducts() {
  const q = query(productsCollection, orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }))
}

export async function getProductById(id) {
  const productRef = doc(db, 'products', id)
  const productSnap = await getDoc(productRef)

  if (!productSnap.exists()) {
    return null
  }

  return {
    id: productSnap.id,
    ...productSnap.data(),
  }
}

export async function createProduct(productData) {
  const newProduct = {
    ...productData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }

  const docRef = await addDoc(productsCollection, newProduct)
  return docRef.id
}

export async function updateProduct(id, productData) {
  const productRef = doc(db, 'products', id)

  await updateDoc(productRef, {
    ...productData,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteProduct(id) {
  const productRef = doc(db, 'products', id)
  await deleteDoc(productRef)
}