// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBi0ise3CIbLfv6hnvr4yPcPlTgqo7XdhE",
    authDomain: "kerncater.firebaseapp.com",
    projectId: "kerncater",
    storageBucket: "kerncater.appspot.com",
    messagingSenderId: "874600098586",
    appId: "1:874600098586:web:ba30e06758e01e52029aa3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();