import UserRepository from "#repositories/userRepository.js";
import jwt from "jsonwebtoken";
import argon from "argon2";
import HttpError from "../errors/HttpError.js";

const userRepository = new UserRepository();

class AuthService {
  _generateAccessToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
  }

  _generateRefreshToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  }

  async login(email, password) {
    const user = await userRepository.getUserByEmail(email);

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    const isPasswordValid = await argon.verify(user.password, password);

    if(!isPasswordValid){
        throw new HttpError(400, 'Invalid credentials');
    }

    const accessToken = this._generateAccessToken(user);
    const refreshToken = this._generateRefreshToken(user);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      user,
    };
  }
}

export default AuthService;
