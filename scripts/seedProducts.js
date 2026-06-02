import 'dotenv/config'

import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const products = [
  {
    title: 'Смартфон Samsung Galaxy A55',
    description: 'Смартфон з AMOLED-дисплеєм, 128 GB памʼяті та потужною батареєю.',
    price: 15999,
    oldPrice: 17999,
    category: 'Смартфони',
    imageUrl: 'https://www.elektroefekt.cz/img/2114/galaxy-a55-5g-8-128gb-blue-samsung-0--.jpeg',
    rating: 4.8,
    reviews: 27,
    inStock: true,
  },
  {
    title: 'Ноутбук Lenovo IdeaPad 15',
    description: 'Ноутбук для навчання, роботи та базових ігор.',
    price: 24999,
    oldPrice: 27999,
    category: 'Ноутбуки',
    imageUrl: 'https://content2.rozetka.com.ua/goods/images/big/382161121.jpg',
    rating: 4.6,
    reviews: 20,
    inStock: true,
  },
  {
    title: 'Навушники JBL Tune 520BT',
    description: 'Бездротові навушники з якісним звуком та автономністю до 57 годин.',
    price: 1999,
    oldPrice: 2499,
    category: 'Аудіо',
    imageUrl: 'https://img.mta.ua/image/data/foto/z752/752880/description/nakladn-navushniki-jbl-tune-520bt-black-jblt520btblkeu--1-1733470346.jpeg',
    rating: 4.7,
    reviews: 100,
    inStock: true,
  },
  {
    title: 'Миша Logitech G102',
    description: 'Ігрова миша з RGB-підсвіткою та точним сенсором.',
    price: 899,
    oldPrice: 1199,
    category: 'Ігрова техніка',
    imageUrl: 'https://files.foxtrot.com.ua/PhotoNew/1_638127671091566213.jpg',
    rating: 4.9,
    reviews: 50,
    inStock: true,
  },
  {
    title: 'Декоративна підвіска Dragon Skull Crystal',
    description: 'Декоративна підвіска у вигляді черепа дракона, виготовлена з прозорої кольорової смоли. Підійде як подарунок для поціновувачів фентезі та готичного стилю.',
    price: 349,
    oldPrice: 0,
    category: 'Прикраси та аксесуари',
    imageUrl: 'https://i.pinimg.com/1200x/e8/f6/69/e8f66968a6e208125db9ab6bd0106e51.jpg',
    rating: 4.6,
    reviews: 12,
    inStock: true,
  },
  {
    title: 'Настільна LED-лампа з бездротовою зарядкою',
    description: 'Сучасна настільна лампа з регулюванням яскравості, сенсорним керуванням та функцією бездротової зарядки смартфона.',
    price: 1299,
    oldPrice: 1599,
    category: 'Товари для дому',
    imageUrl: 'https://content1.rozetka.com.ua/goods/images/big/372465123.jpg',
    rating: 4.8,
    reviews: 34,
    inStock: true,
  },
]

async function seedProducts() {
  try {
    for (const product of products) {
      await addDoc(collection(db, 'products'), {
        ...product,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    }

    console.log('Тестові товари успішно додані!')
  } catch (error) {
    console.error('Помилка додавання товарів:', error)
  }
}

seedProducts()