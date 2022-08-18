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

  public async add(request: Request, response: Response): Promise<Response> {
    const newMatch = await this.matchesServices.add(request.body);
    return response.status(201).json(newMatch);
  }
}
