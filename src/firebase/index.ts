import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyBA1YGCNVFvCFY4a2LMuMk3UaTbJphs__Q",
	authDomain: "movie-app-eea02.firebaseapp.com",
	projectId: "movie-app-eea02",
	storageBucket: "movie-app-eea02.appspot.com",
	messagingSenderId: "384379827593",
	appId: "1:384379827593:web:f17a847102b7659604dd58",
};

const app = getApps() ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { db, auth };
