"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const https_1 = require("firebase-functions/v2/https");
require("reflect-metadata");
const app_1 = __importDefault(require("./app"));
// 🔥 Exporta la función HTTP de Firebase en la región correcta
exports.api = (0, https_1.onRequest)({ region: "southamerica-east1" }, app_1.default);
//# sourceMappingURL=index.js.map