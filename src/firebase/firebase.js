import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDQ1eV_ek938PatZRmn8xagPp6imKAFUus",
  authDomain: "shopzone-ed450.firebaseapp.com",
  projectId: "shopzone-ed450",
  storageBucket: "shopzone-ed450.firebasestorage.app",
  messagingSenderId: "858915821245",
  appId: "1:858915821245:web:f0d6e6ba7b2ab73132c9d4",
  measurementId: "G-TEPJDWKLMB"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()