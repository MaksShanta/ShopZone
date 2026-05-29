import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore'

import { auth, db, googleProvider } from '../firebase/firebase'

export async function registerWithEmail(email, password, name) {
  const result = await createUserWithEmailAndPassword(auth, email, password)
  const user = result.user

  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    name,
    email: user.email,
    role: 'user',
    createdAt: serverTimestamp(),
  })

  return user
}

export async function loginWithEmail(email, password) {
  const result = await signInWithEmailAndPassword(auth, email, password)
  return result.user
}

export async function loginWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider)
  const user = result.user

  const userRef = doc(db, 'users', user.uid)
  const userSnap = await getDoc(userRef)

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      role: 'user',
      createdAt: serverTimestamp(),
    })
  }

  return user
}

export async function logoutUser() {
  await signOut(auth)
}

export function watchAuth(callback) {
  return onAuthStateChanged(auth, callback)
}

export async function getUserProfile(uid) {
  const userRef = doc(db, 'users', uid)
  const userSnap = await getDoc(userRef)

  if (!userSnap.exists()) {
    return null
  }

  return userSnap.data()
}