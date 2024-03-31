import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAVcr2AAjUNnmPGezYakAhQAtsl0GLIv48",
  authDomain: "newswave-cd190.firebaseapp.com",
  projectId: "newswave-cd190",
  storageBucket: "newswave-cd190.appspot.com",
  messagingSenderId: "493367578336",
  appId: "1:493367578336:web:04d844635e7db4a5924a85",
  measurementId: "G-3W3HYBBBWW"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
