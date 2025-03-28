import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzGRKMCcScRhROzD0m6vR1KEo2vRKS7Vg",
    authDomain: "shetkari-8da55.firebaseapp.com",
    databaseURL: "https://shetkari-8da55-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "shetkari-8da55",
    storageBucket: "shetkari-8da55.firebasestorage.app",
    messagingSenderId: "500027734760",
    appId: "1:500027734760:web:97079e9d15f6b525c7675d",
    measurementId: "G-LQ02SWBHPB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, get };
