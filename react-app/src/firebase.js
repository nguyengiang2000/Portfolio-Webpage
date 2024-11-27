import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCHpOHFCTqo-F1P7opcGBhg5PLMTjY3XMo",
  authDomain: "cp4-db.firebaseapp.com",
  projectId: "cp4-db",
  storageBucket: "cp4-db.firebasestorage.app",
  messagingSenderId: "783661946368",
  appId: "1:783661946368:web:3d476889f285944d526ae5",
  measurementId: "G-X8T6WVTGGQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app; 
