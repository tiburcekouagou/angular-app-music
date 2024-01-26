import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';
import { getDatabase } from 'firebase/database';
import { getAuth } from "firebase/auth";

// get the project configurations
const firebaseConfig = environment.firebaseConfig;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to service
const db = getDatabase(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { app, db, auth };
