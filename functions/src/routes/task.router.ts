import { Router } from "express";
import { TaskService } from "../services/task.service";
import { TaskController } from "../controllers/task.controller";

const router = Router();
const taskService = new TaskService();
const taskController = new TaskController(taskService);

router.get("/getAll", taskController.getAllTasks);
router.post("/create", taskController.createTask);
router.put("/update/:taskId", taskController.updateTask);
router.delete("/delete/:taskId", taskController.deleteTask);
router.post("/complete", taskController.completeTasks);

export { router as taskRouter };