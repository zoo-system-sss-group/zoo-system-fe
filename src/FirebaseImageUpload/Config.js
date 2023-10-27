import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyClCrvY6yCbNpLvLPB-VG3E7DCub5c_n7Q",
  authDomain: "uploadimage-16a8b.firebaseapp.com",
  projectId: "uploadimage-16a8b",
  storageBucket: "uploadimage-16a8b.appspot.com",
  messagingSenderId: "589502207271",
  appId: "1:589502207271:web:2165c59e4d9e7ac9954502",
  measurementId: "G-1ZF0EK0WK0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const imageDb = getStorage(app)