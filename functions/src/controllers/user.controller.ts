import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const { uid } = await this.userService.registerUser({
        email,
        password,
      });
      res.status(201).json({ uid });
    } catch (error) {
      console.error( "Error en UserController (register):", (error as Error).message );
      res.status(400).json({ message: (error as Error).message });
    }
  };

  public findUserByEmail = async ( req: Request, res: Response ): Promise<void> => {
    try {
      const { email } = req.params;
      const user = await this.userService.findUserByEmail(email);
      res.status(200).json(user);
    } catch (error) {
      console.error(
        "Error en UserController (findUserByEmail):",
        (error as Error).message
      );
      res.status(404).json({ message: (error as Error).message });
    }
  };
}
