import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardServices';

export default class LeaderBoardController {
  constructor(
    private leaderBoardService = new LeaderBoardService(),
  ) {}

  async getHome(request: Request, response: Response): Promise<Response> {
    const leaderBoard = await this.leaderBoardService.getHome();
    return response.status(200).json(leaderBoard);
  }
}
