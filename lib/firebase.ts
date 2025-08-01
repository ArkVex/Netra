import { getApps, initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence, Auth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyD_qX-7jWYRZ9LkMn8TeMyVi9SfngASIuM",
  authDomain: "Drishti-3941f.firebaseapp.com",
  projectId: "Drishti-3941f",
  storageBucket: "Drishti-3941f.firebasestorage.app",
  messagingSenderId: "1048769202417",
  appId: "1:1048769202417:web:1d18c8586061417e818150"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize auth with AsyncStorage persistence
let auth: Auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} catch {
  // If auth is already initialized, get the existing instance
  auth = getAuth(app);
}

export { auth };
export default app;
