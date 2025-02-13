import { User } from "../entities/user.entity";
import firebaseAdmin from "firebase-admin";

export class UserRepository {
  async registerUser(user: User): Promise<{ uid: string }> {
    try {
      const userData: User = { email: user.email };
      if (user.password) userData.password = user.password;
      const userRecord = await firebaseAdmin.auth().createUser(userData);        
      return { uid: userRecord.uid };
    } catch (error) {
      console.error( "Error en UserRepository (registerUser):", (error as Error).message );
      throw new Error("Error al registrar usuario");
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      const userRecord = await firebaseAdmin.auth().getUserByEmail(email);
      return {
        email: userRecord.email || "",
        uid: userRecord.uid || ""
      };
    } catch (error) {
      console.error( "Error en UserRepository (findUserByEmail):", (error as Error).message );
      throw new Error("Error al buscar usuario");
    }
  }
}
