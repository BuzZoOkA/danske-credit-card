// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDCQ7rTDv1qK-G17llHEwM8f2WNDX25yts',
  authDomain: 'hack-ideas-bd851.firebaseapp.com',
  projectId: 'hack-ideas-bd851',
  storageBucket: 'hack-ideas-bd851.appspot.com',
  messagingSenderId: '299819654270',
  appId: '1:299819654270:web:90f231a0852669c4a4cc2f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
