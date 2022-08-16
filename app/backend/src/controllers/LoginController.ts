import { Request, Response } from 'express';
import LoginServices from '../services/LoginServices';

export default class LoginController {
  constructor(
    private loginService = new LoginServices(),
  ) {}

  public async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const token = await this.loginService.login({ email, password });
    return response.status(200).json({ token });
  }

  public async validate(request: Request, response: Response): Promise<Response> {
    const token = request.headers.authorization;
    const role = await this.loginService.validate(token);
    return response.status(200).json({ role });
  }
}
