import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  authDomain: "painting-shop-krasteva.firebaseapp.com",
  databaseURL: "https://painting-shop-krasteva-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // Handle post-persistence setup without redirecting or refreshing
    console.log("Persistence has been set successfully.");
    // Optionally, update app state or call a function

    // Refresh current page when persistence is loaded, little hack
    //page.redirect(location.pathname)
  })
  .catch(err => {
    console.error("Failed to set persistence:", err);
  })


export { app, auth, database };