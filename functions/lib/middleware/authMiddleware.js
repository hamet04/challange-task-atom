"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res
            .status(401)
            .json({ message: "Token de autenticación no proporcionado" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decodedToken = await firebase_admin_1.default.auth().verifyIdToken(token);
        req.body.uid = decodedToken.uid;
        next();
        return;
    }
    catch (error) {
        console.error("Error al verificar el token:", error.message);
        return res
            .status(401)
            .json({ message: "Token de autenticación no válido" });
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map