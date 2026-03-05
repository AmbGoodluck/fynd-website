import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtZk65H1piPxLbSM_RS7Q9-gjogYezWMI",
  authDomain: "fynd-app-42ef4.firebaseapp.com",
  projectId: "fynd-app-42ef4",
  storageBucket: "fynd-app-42ef4.firebasestorage.app",
  messagingSenderId: "52406028380",
  appId: "1:52406028380:web:ac4669fdb019ff9581be99",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export default app;
