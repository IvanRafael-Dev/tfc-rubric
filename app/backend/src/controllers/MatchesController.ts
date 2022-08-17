import { Request, Response } from 'express';
import MatchesServices from '../services/MatchesServices';

export default class MatchesController {
  constructor(
    private matchesServices = new MatchesServices(),
  ) {}

  public async get(request: Request, response: Response): Promise<Response> {
    const inProgress = request.query.inProgress as string;
    const matches = await this.matchesServices.get(inProgress);
    return response.status(200).json(matches);
  }

  // public async getById(request: Request, response: Response): Promise<Response> {
  //   const { id } = request.params;
  //   const team = await this.teamsServices.getById(Number(id));
  //   return response.status(200).json(team);
  // }
}
