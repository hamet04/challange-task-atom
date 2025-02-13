import { db } from "../config/firebase";
import { Task } from "../entities/task.entity";
import firebaseAdmin from "firebase-admin";

export class TaskRepository {
  private collection = db.collection("Task");

  async getPaginatedTasks(
    userId: string,
    page: number,
    limit: number,    
  ): Promise<{ tasks: Task[]; totalRecords: number }> {
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
          TareaCreada:
            data.TareaCreada instanceof firebaseAdmin.firestore.Timestamp
              ? data.TareaCreada.toDate().toISOString()
              : null,
          Estado: data.Estado,
        } as unknown as Task;
      });

      return { tasks, totalRecords };
    } catch (error) {
      console.error( "Error en TaskRepository (getPaginatedTasks):", (error as Error).message );
      throw new Error("Error al obtener las tareas");
    }
  }

  async createTask(task: Task): Promise<void> {
    try {
      await this.collection.add({
        ...task,
        TareaCreada: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error( "Error en TaskRepository (createTask):", (error as Error).message );
      throw new Error("Error al crear la tarea");
    }
  }

  async updateTask(taskId: string, taskData: Partial<Task>): Promise<void> {
    try {
      const taskRef = this.collection.doc(taskId);
      const taskSnapshot = await taskRef.get();

      if (!taskSnapshot.exists) {
        throw new Error(`La tarea con ID ${taskId} no existe`);
      }

      await taskRef.update(taskData);
    } catch (error) {
      console.error( "Error en TaskRepository (updateTask):", (error as Error).message );
      throw new Error("Error al actualizar la tarea");
    }
  }

  async deleteTask(taskId: string): Promise<void> {
    try {
      const taskRef = this.collection.doc(taskId);
      const taskSnapshot = await taskRef.get();

      if (!taskSnapshot.exists) {
        throw new Error(`La tarea con ID ${taskId} no existe`);
      }

      await taskRef.delete();
    } catch (error) {
      console.error( "Error en TaskRepository (deleteTask):", (error as Error).message );
      throw new Error("Error al eliminar la tarea");
    }
  }

  async completeTasks(taskIds: string[]): Promise<void> {
    const batch = firebaseAdmin.firestore().batch();

    const missingIds: string[] = [];
    for (const taskId of taskIds) {
      const taskRef = this.collection.doc(taskId);
      const taskDoc = await taskRef.get();
      if (!taskDoc.exists) {
        missingIds.push(taskId);
      } else {
        batch.update(taskRef, { Estado: true });
      }
    }

    if (missingIds.length > 0) {
      throw new Error(`Las siguientes tareas no existen: ${missingIds.join(', ')}`);
    }

    try {
      await batch.commit();
    } catch (error) {
      console.error("Error en TaskRepository(completeTasks) :", (error as Error).message);
      throw new Error("Error al marcar tareas como completadas");
    }
  }
}
