import Model from '../database/models';
import leaderBoardHomeQuery from './queries/leaderBoardHome';

interface ILeaderBoard {
  name: string
  totalPoints: string
  totalGames: string
  totalVictories: string
  totalDraws: string
  totalLosses: string
  goalsFavor: string
  goalsOwn: string
  goalsBalance: string
  efficiency: string
}

export default class LeaderBoardServices {
  constructor(
    private model = Model,
  ) {}

  async getHome(): Promise<ILeaderBoard[]> {
    const [leaderBoardHome] = await this.model.query(leaderBoardHomeQuery);
    return leaderBoardHome as ILeaderBoard[];
  }
}
