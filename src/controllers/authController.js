import AuthService from "#services/authService.js";
import { sendSuccess } from "../utils/response.js";

const authService = new AuthService();

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const response = await authService.login(email, password);

    sendSuccess(res, response, "Login successful", 200);
  } catch (error) {
    next(error);
  }
};
export { login };
