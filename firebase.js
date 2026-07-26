import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import { 
    getFirestore 
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";


// إعدادات مشروع Firebase الخاص بك

const firebaseConfig = {

  apiKey: "AIzaSyC9Una4Qs9WBHmAb9Qyw3mTJAnJCUNdgDM",

  authDomain: "gaada-9f860.firebaseapp.com",

  projectId: "gaada-9f860",

  storageBucket: "gaada-9f860.firebasestorage.app",

  messagingSenderId: "268184578905",

  appId: "1:268184578905:web:db1ba3d5e4d9cb73683a48"

};


// تشغيل Firebase

const app = initializeApp(firebaseConfig);


// قاعدة البيانات

export const db = getFirestore(app);
