"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const firebase_1 = require("../config/firebase");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
class TaskRepository {
    constructor() {
        this.collection = firebase_1.db.collection("Task");
    }
    async getPaginatedTasks(userId, page, limit) {
        try {
            const offset = (page - 1) * limit;
            let query = this.collection
                .where("Usuario", "==", userId)
                .orderBy("TareaCreada", "desc");
            const totalSnapshot = await query.get();
            const totalRecords = totalSnapshot.size;
            const snapshot = await query.offset(offset).limit(limit).get();
            const tasks = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    Titulo: data.Titulo,
                    Descripcion: data.Descripcion,
                    TareaCreada: data.TareaCreada instanceof firebase_admin_1.default.firestore.Timestamp
                        ? data.TareaCreada.toDate().toISOString()
                        : null,
                    Estado: data.Estado,
                };
            });
            return { tasks, totalRecords };
        }
        catch (error) {
            console.error("Error en TaskRepository (getPaginatedTasks):", error.message);
            throw new Error("Error al obtener las tareas");
        }
    }
    async createTask(task) {
        try {
            await this.collection.add(Object.assign(Object.assign({}, task), { TareaCreada: firebase_admin_1.default.firestore.FieldValue.serverTimestamp() }));
        }
        catch (error) {
            console.error("Error en TaskRepository (createTask):", error.message);
            throw new Error("Error al crear la tarea");
        }
    }
    async updateTask(taskId, taskData) {
        try {
            const taskRef = this.collection.doc(taskId);
            const taskSnapshot = await taskRef.get();
            if (!taskSnapshot.exists) {
                throw new Error(`La tarea con ID ${taskId} no existe`);
            }
            await taskRef.update(taskData);
        }
        catch (error) {
            console.error("Error en TaskRepository (updateTask):", error.message);
            throw new Error("Error al actualizar la tarea");
        }
    }
    async deleteTask(taskId) {
        try {
            const taskRef = this.collection.doc(taskId);
            const taskSnapshot = await taskRef.get();
            if (!taskSnapshot.exists) {
                throw new Error(`La tarea con ID ${taskId} no existe`);
            }
            await taskRef.delete();
        }
        catch (error) {
            console.error("Error en TaskRepository (deleteTask):", error.message);
            throw new Error("Error al eliminar la tarea");
        }
    }
    async completeTasks(taskIds) {
        const batch = firebase_admin_1.default.firestore().batch();
        const missingIds = [];
        for (const taskId of taskIds) {
            const taskRef = this.collection.doc(taskId);
            const taskDoc = await taskRef.get();
            if (!taskDoc.exists) {
                missingIds.push(taskId);
            }
            else {
                batch.update(taskRef, { Estado: true });
            }
        }
        if (missingIds.length > 0) {
            throw new Error(`Las siguientes tareas no existen: ${missingIds.join(', ')}`);
        }
        try {
            await batch.commit();
        }
        catch (error) {
            console.error("Error en TaskRepository(completeTasks) :", error.message);
            throw new Error("Error al marcar tareas como completadas");
        }
    }
}
exports.TaskRepository = TaskRepository;
//# sourceMappingURL=task.repository.js.map