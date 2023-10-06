import app from "../lib/firebase-app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };