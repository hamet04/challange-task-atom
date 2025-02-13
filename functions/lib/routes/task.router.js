"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
const express_1 = require("express");
const task_service_1 = require("../services/task.service");
const task_controller_1 = require("../controllers/task.controller");
const router = (0, express_1.Router)();
exports.taskRouter = router;
const taskService = new task_service_1.TaskService();
const taskController = new task_controller_1.TaskController(taskService);
router.get("/getAll", taskController.getAllTasks);
router.post("/create", taskController.createTask);
router.put("/update/:taskId", taskController.updateTask);
router.delete("/delete/:taskId", taskController.deleteTask);
router.post("/complete", taskController.completeTasks);
//# sourceMappingURL=task.router.js.map