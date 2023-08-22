import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAauMXVkaNsBYzn3eKTHnx6tBdEeuOrzwU",
  authDomain: "thumabnailsupport-blogapp.firebaseapp.com",
  projectId: "thumabnailsupport-blogapp",
  storageBucket: "thumabnailsupport-blogapp.appspot.com",
  messagingSenderId: "999921811314",
  appId: "1:999921811314:web:1e577b3b851c181d52a7eb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
