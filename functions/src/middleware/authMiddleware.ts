import { Request, Response, NextFunction } from "express";
import firebaseAdmin from "firebase-admin";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Token de autenticación no proporcionado" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    req.body.uid = decodedToken.uid;
    next();
    return;
  } catch (error) {
    console.error("Error al verificar el token:", (error as Error).message);
    return res
      .status(401)
      .json({ message: "Token de autenticación no válido" });
  }
};
