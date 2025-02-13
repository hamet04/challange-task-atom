"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
class UserController {
    constructor() {
        this.register = async (req, res) => {
            try {
                const { email, password } = req.body;
                const { uid } = await this.userService.registerUser({
                    email,
                    password,
                });
                res.status(201).json({ uid });
            }
            catch (error) {
                console.error("Error en UserController al registrar usuario:", error.message);
                res.status(400).json({ message: error.message });
            }
        };
        this.findUserByEmail = async (req, res) => {
            try {
                const { email } = req.params;
                const user = await this.userService.findUserByEmail(email);
                res.status(200).json(user);
            }
            catch (error) {
                console.error("Error en UserController al buscar usuario:", error.message);
                res.status(404).json({ message: error.message });
            }
        };
        this.userService = new user_service_1.UserService();
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map