import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD_qX-7jWYRZ9LkMn8TeMyVi9SfngASIuM",
  authDomain: "netra-3941f.firebaseapp.com",
  projectId: "netra-3941f",
  storageBucket: "netra-3941f.firebasestorage.app",
  messagingSenderId: "1048769202417",
  appId: "1:1048769202417:web:1d18c8586061417e818150"
};
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export { auth };
export default app;
