import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Usamos import.meta.env para leer las variables de entorno de Vite
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Inicializamos la App de Firebase
const app = initializeApp(firebaseConfig);

// Exportamos el servicio de Storage para usarlo en ImageField
export const storage = getStorage(app);