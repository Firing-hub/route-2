import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDBSIuIW7DmEkF-M8tDWQURhZwuO_30QZI",
  authDomain: "dtiproject-731f2.firebaseapp.com",
  projectId: "dtiproject-731f2",
  storageBucket: "dtiproject-731f2.appspot.com",
  messagingSenderId: "61677806866",
  appId: "1:61677806866:web:9448b2711bbfcdf8737fcb"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const database = getDatabase(app);
export const refdb = ref;
