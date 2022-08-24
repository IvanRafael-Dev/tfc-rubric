import Model from '../database/models';
import leaderBoardHomeQuery from './queries/leaderBoardHome';
import leaderBoardAwayQuery from './queries/leaderBoardAway';

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

  async get(url: string): Promise<ILeaderBoard[]> {
    if (url === '/home') {
      const [leaderBoardHome] = await this.model.query(leaderBoardHomeQuery);
      return leaderBoardHome as ILeaderBoard[];
    }
    const [leaderBoardAway] = await this.model.query(leaderBoardAwayQuery);
    return leaderBoardAway as ILeaderBoard[];
  }
}
