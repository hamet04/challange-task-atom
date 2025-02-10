import { Router } from "express";
import { TaskService } from "../services/task.service";
import { TaskController } from "../controllers/task.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
const taskService = new TaskService();
const taskController = new TaskController(taskService);

router.get("/getAll", authMiddleware, taskController.getAllTasks);
router.post("/create", authMiddleware, taskController.createTask);
router.put("/update/:taskId", authMiddleware, taskController.updateTask);
router.delete("/delete/:taskId", authMiddleware, taskController.deleteTask);

router.post("/complete", authMiddleware, taskController.completeTasks);

export default router;
