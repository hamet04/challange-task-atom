import { User } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async registerUser(user: User) {
    if (!user.email || !user.password) {
      throw new Error("El correo electrónico y la contraseña son obligatorios");
    }

    try {
      return await this.userRepository.registerUser(user);
    } catch (error) {
      console.error(
        "Error en UserService al registrar usuario:",
        (error as Error).message
      );
      throw new Error("Error al registrar usuario");
    }
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this.userRepository.findUserByEmail(email);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      return user;
    } catch (error) {
      console.error(
        "Error en UserService al buscar usuario:",
        (error as Error).message
      );
      throw new Error("Error al buscar usuario");
    }
  }
}
