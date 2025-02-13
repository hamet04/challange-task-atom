import { Task } from "../entities/task.entity";
import { TaskRepository } from "../repositories/task.repository";

export class TaskService {
  private taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async getTasks(
    page: number = 1,
    limit: number = 10,    
    userId: string = ""
  ) {
    try {
      const { tasks, totalRecords } =
        await this.taskRepository.getPaginatedTasks(userId, page, limit);

      return {
        page,
        totalRecords,
        data: tasks,
      };
    } catch (error) {
      console.error( "Error en getTasks:", (error as Error).message );
      throw new Error("Error al obtener las tareas desde el servicio");
    }
  }

  async createTask(task: Task) {
    if (!task.Titulo) {
      throw new Error('El campo "Titulo" es obligatorio');
    }

    if (!task.Usuario) {
      throw new Error('El campo "Usuario" es obligatorio');
    }
    const newTask: Task = {
      Titulo: task.Titulo,
      Descripcion: task.Descripcion || "",
      Estado: task.Estado !== undefined ? task.Estado : false,
      Usuario: task.Usuario,
    };

    try {
      await this.taskRepository.createTask(newTask);
    } catch (error) {
      console.error( "Error en createTask:", (error as Error).message );
      throw new Error("Error al crear la tarea");
    }
  }

  async updateTask(taskId: string, taskData: Task) {
    if (!taskData.Titulo) {
      throw new Error('El campo "Titulo" es obligatorio');
    }

    try {
      const updateTask: Task = {
        Titulo: taskData.Titulo,
        Descripcion: taskData.Descripcion || "",
      };
      await this.taskRepository.updateTask(taskId, updateTask);
    } catch (error) {
      console.error( "Error en updateTask:", (error as Error).message );
      throw new Error("Error al actualizar la tarea");
    }
  }

  async deleteTask(taskId: string) {
    try {
      await this.taskRepository.deleteTask(taskId);
    } catch (error) {
      console.error( "Error en deleteTask:", (error as Error).message );
      throw new Error("Error al eliminar la tarea");
    }
  }

  async completeTasks(taskIds: string[]) {
    try {
      await this.taskRepository.completeTasks(taskIds);
    } catch (error) {
      console.error( "Error en completeTasks:", (error as Error).message );
      throw new Error("Error al marcar tareas como completadas");
    }
  }
}
