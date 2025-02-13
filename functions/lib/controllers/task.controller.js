"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
class TaskController {
    constructor(taskService) {
        this.getAllTasks = async (req, res) => {
            try {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const uid = req.body.uid;
                const result = await this.taskService.getTasks(page, limit, uid);
                res.status(200).json(result);
            }
            catch (error) {
                console.error("Error en getAllTasks:", error.message);
                res.status(500).json({ message: "Error al obtener las tareas" });
            }
        };
        this.createTask = async (req, res) => {
            try {
                const { Titulo, Descripcion, Estado, uid } = req.body;
                await this.taskService.createTask({
                    Titulo,
                    Descripcion,
                    Estado,
                    Usuario: uid,
                });
                res.status(201).json({ message: "Tarea creada exitosamente" });
            }
            catch (error) {
                console.error("Error en createTask:", error.message);
                res.status(400).json({ message: error.message });
            }
        };
        this.updateTask = async (req, res) => {
            try {
                const { taskId } = req.params;
                const { Titulo, Descripcion } = req.body;
                if (!taskId) {
                    res.status(400).json({ message: "El ID de la tarea es obligatorio" });
                    return;
                }
                await this.taskService.updateTask(taskId, { Titulo, Descripcion });
                res.status(200).json({ message: "Tarea actualizada exitosamente" });
            }
            catch (error) {
                console.error("Error en updateTask:", error.message);
                res.status(400).json({ message: error.message });
            }
        };
        this.deleteTask = async (req, res) => {
            try {
                const { taskId } = req.params;
                if (!taskId) {
                    res.status(400).json({ message: "El ID de la tarea es obligatorio" });
                    return;
                }
                await this.taskService.deleteTask(taskId);
                res.status(200).json({ message: "Tarea eliminada exitosamente" });
            }
            catch (error) {
                console.error("Error en deleteTask", error.message);
                res.status(400).json({ message: error.message });
            }
        };
        this.completeTasks = async (req, res) => {
            try {
                const { taskIds } = req.body;
                if (!Array.isArray(taskIds) || taskIds.length === 0) {
                    res.status(400).json({ message: "Se requiere una lista de IDs de tareas" });
                }
                await this.taskService.completeTasks(taskIds);
                res.status(200).json({ message: "Tareas marcadas como completadas exitosamente" });
            }
            catch (error) {
                console.error("Error en completeTasks:", error.message);
                res.status(400).json({ message: error.message });
            }
        };
        this.taskService = taskService;
    }
}
exports.TaskController = TaskController;
//# sourceMappingURL=task.controller.js.map