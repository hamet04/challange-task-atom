"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_repository_1 = require("../repositories/user.repository");
class UserService {
    constructor() {
        this.userRepository = new user_repository_1.UserRepository();
    }
    async registerUser(user) {
        if (!user.email) {
            throw new Error("El correo electrónico es obligatorio");
        }
        try {
            return await this.userRepository.registerUser(user);
        }
        catch (error) {
            console.error("Error en UserService al registrar usuario:", error.message);
            throw new Error("Error al registrar usuario");
        }
    }
    async findUserByEmail(email) {
        try {
            const user = await this.userRepository.findUserByEmail(email);
            if (!user) {
                throw new Error("Usuario no encontrado");
            }
            return user;
        }
        catch (error) {
            console.error("Error en UserService al buscar usuario:", error.message);
            throw new Error("Error al buscar usuario");
        }
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map