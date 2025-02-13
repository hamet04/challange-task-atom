import { onRequest } from "firebase-functions/v2/https";
import "reflect-metadata";
import app from "./app";

// 🔥 Exporta la función HTTP de Firebase en la región correcta
export const api = onRequest({ region: "southamerica-east1" }, app);
