import { Request, Response } from "express";
import AuthService from "../services/authService";

class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const { user, token } = await AuthService.login(username, password);
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(401).json({ message: error });
    }
  }
}

export default AuthController;