// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getDocs, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAE58Xrh5OTg5otiAE3g6aMxvQmaRTT5WU",
  authDomain: "gatetestseries-ee964.firebaseapp.com",
  projectId: "gatetestseries-ee964",
  storageBucket: "gatetestseries-ee964.appspot.com",
  messagingSenderId: "833501024272",
  appId: "1:833501024272:web:31c906651c5671fd7e3a95",
  measurementId: "G-77S051D81W",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

export const isAuthUser = async (email, key) => {
  try {
    let auth = false;
    await getDocs(collection(db, "keys")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      let isAuth = false;
      newData.forEach((i) => {
        if (isAuth) return;
        if (i["id"] === key && i["email"] === email) {
          auth = true;
          return auth;
        }
      });
    });
    return auth;
  } catch (e) {
    console.error("Error adding document: ", e);

    return false;
  }
};

export const isUserExist = async (email) => {
  try {
    let exist = false;
    await getDocs(collection(db, "keys")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      newData.forEach((i) => {
        console.log(i, email);
        if (i?.email === email) {
          exist = true;
          return;
        }
        if (exist) return;
      });
      return exist;
    });

    return exist;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};
