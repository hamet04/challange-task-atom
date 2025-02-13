"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const task_repository_1 = require("../repositories/task.repository");
class TaskService {
    constructor() {
        this.taskRepository = new task_repository_1.TaskRepository();
    }
    async getTasks(page = 1, limit = 10, userId = "") {
        try {
            const { tasks, totalRecords } = await this.taskRepository.getPaginatedTasks(userId, page, limit);
            return {
                page,
                totalRecords,
                data: tasks,
            };
        }
        catch (error) {
            console.error("Error en getTasks:", error.message);
            throw new Error("Error al obtener las tareas desde el servicio");
        }
    }
    async createTask(task) {
        if (!task.Titulo) {
            throw new Error('El campo "Titulo" es obligatorio');
        }
        if (!task.Usuario) {
            throw new Error('El campo "Usuario" es obligatorio');
        }
        const newTask = {
            Titulo: task.Titulo,
            Descripcion: task.Descripcion || "",
            Estado: task.Estado !== undefined ? task.Estado : false,
            Usuario: task.Usuario,
        };
        try {
            await this.taskRepository.createTask(newTask);
        }
        catch (error) {
            console.error("Error en createTask:", error.message);
            throw new Error("Error al crear la tarea");
        }
    }
    async updateTask(taskId, taskData) {
        if (!taskData.Titulo) {
            throw new Error('El campo "Titulo" es obligatorio');
        }
        try {
            const updateTask = {
                Titulo: taskData.Titulo,
                Descripcion: taskData.Descripcion || "",
            };
            await this.taskRepository.updateTask(taskId, updateTask);
        }
        catch (error) {
            console.error("Error en updateTask:", error.message);
            throw new Error("Error al actualizar la tarea");
        }
    }
    async deleteTask(taskId) {
        try {
            await this.taskRepository.deleteTask(taskId);
        }
        catch (error) {
            console.error("Error en deleteTask:", error.message);
            throw new Error("Error al eliminar la tarea");
        }
    }
    async completeTasks(taskIds) {
        try {
            await this.taskRepository.completeTasks(taskIds);
        }
        catch (error) {
            console.error("Error en completeTasks:", error.message);
            throw new Error("Error al marcar tareas como completadas");
        }
    }
}
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map