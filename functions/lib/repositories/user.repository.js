"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
class UserRepository {
    async registerUser(user) {
        try {
            const userData = { email: user.email };
            if (user.password)
                userData.password = user.password;
            const userRecord = await firebase_admin_1.default.auth().createUser(userData);
            return { uid: userRecord.uid };
        }
        catch (error) {
            console.error("Error en UserRepository al registrar usuario:", error.message);
            throw new Error("Error al registrar usuario");
        }
    }
    async findUserByEmail(email) {
        try {
            const userRecord = await firebase_admin_1.default.auth().getUserByEmail(email);
            return {
                email: userRecord.email || "",
                uid: userRecord.uid || ""
            };
        }
        catch (error) {
            console.error("Error en UserRepository al buscar usuario:", error.message);
            throw new Error("Error al buscar usuario");
        }
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map