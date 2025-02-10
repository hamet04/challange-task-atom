import firebaseAdmin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

const serviceAccount: firebaseAdmin.ServiceAccount = {
  projectId: process.env.SERVICE_ACCOUNT_PROJECT_ID!,
  clientEmail: process.env.SERVICE_ACCOUNT_CLIENT_EMAIL!,
  privateKey: (process.env.SERVICE_ACCOUNT_PRIVATE_KEY || "").replace(/\\n/g, '\n')
};

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

export const db = firebaseAdmin.firestore();
