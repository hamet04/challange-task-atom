import { User } from "../entities/user.entity";
import firebaseAdmin from "firebase-admin";

export class UserRepository {
  async registerUser(user: User): Promise<{ uid: string }> {
    try {
      const userRecord = await firebaseAdmin.auth().createUser({
        email: user.email,
        password: user.password,
      });

      return { uid: userRecord.uid };
    } catch (error) {
      console.error(
        "Error en UserRepository al registrar usuario:",
        (error as Error).message
      );
      throw new Error("Error al registrar usuario");
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      const userRecord = await firebaseAdmin.auth().getUserByEmail(email);
      return {
        email: userRecord.email || "",
      };
    } catch (error) {
      console.error(
        "Error en UserRepository al buscar usuario:",
        (error as Error).message
      );
      throw new Error("Error al buscar usuario");
    }
  }
}
