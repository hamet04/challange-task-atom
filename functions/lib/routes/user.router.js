"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
router.post("/register", userController.register);
router.get("/find-user-email/:email", userController.findUserByEmail);
exports.default = router;
//# sourceMappingURL=user.router.js.map