import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'

import { db } from '../firebase/firebase'

export async function createOrder(userId, userInfo, cartItems, totalPrice) {
  const orderRef = await addDoc(collection(db, 'orders'), {
    userId,
    customerName: userInfo.name,
    customerPhone: userInfo.phone,
    customerCity: userInfo.city,
    customerAddress: userInfo.address,
    totalPrice,
    status: 'new',
    createdAt: serverTimestamp(),
  })

  for (const item of cartItems) {
    await addDoc(collection(db, 'orderItems'), {
      orderId: orderRef.id,
      userId,
      productId: item.productId,
      title: item.title,
      price: item.price,
      imageUrl: item.imageUrl,
      quantity: item.quantity,
      total: item.price * item.quantity,
      createdAt: serverTimestamp(),
    })
  }

  return orderRef.id
}

export async function getUserOrders(userId) {
  const q = query(
    collection(db, 'orders'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  )

  const snapshot = await getDocs(q)

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }))
}

export async function getOrderItems(orderId) {
  const q = query(
    collection(db, 'orderItems'),
    where('orderId', '==', orderId)
  )

  const snapshot = await getDocs(q)

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }))
}