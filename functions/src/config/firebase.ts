import firebaseAdmin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Evitar inicialización múltiple de Firebase Admin
if (!firebaseAdmin.apps.length) {
  const serviceAccount: firebaseAdmin.ServiceAccount = {
    projectId: process.env.SERVICE_ACCOUNT_PROJECT_ID,
    clientEmail: process.env.SERVICE_ACCOUNT_CLIENT_EMAIL,
    privateKey: process.env.SERVICE_ACCOUNT_PRIVATE_KEY
      ? process.env.SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, "\n")
      : undefined,
  };

  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
  });
}

export const db = firebaseAdmin.firestore();
