import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyDL4uCdMaofRKTjyE-ZqyU3keMWzLaxh2w',
  authDomain: 'sendcvtw.firebaseapp.com',
  databaseURL: 'https://sendcvtw-default-rtdb.firebaseio.com',
  projectId: 'sendcvtw',
  storageBucket: 'sendcvtw.appspot.com',
  messagingSenderId: '457930926774',
  appId: '1:457930926774:web:e359bd6df635269e085417',
  measurementId: 'G-XQ3E2W9RKJ',
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
