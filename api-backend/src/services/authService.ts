import { getRepository } from "typeorm";
import jwt from "jsonwebtoken";
import User from "../models/user";

class AuthService {
  static async register(userData: { username: string, password: string }) {
    const userRepository = getRepository(User);
    const user = userRepository.create(userData);
    await userRepository.save(user);
    return user;
  }

  static async login(username: string, password: string) {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { username } });
    if (!user || !(await user.validatePassword(password))) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    return { user, token };
  }

  static verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!);
  }
}

export default AuthService;