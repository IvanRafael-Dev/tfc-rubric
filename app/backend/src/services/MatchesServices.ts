import IMatchRequest from '../interfaces/IMatchRequest';
import Match from '../database/models/Match';

const association = {
  attributes: { exclude: ['home_team', 'away_team'] },
  include: [{ all: true, attributes: { exclude: ['id'] } }],
};

export default class MatchesServices {
  constructor(
    private matchModel = Match,
  ) {}

  public async get(inProgress: string): Promise<Match[]> {
    const valid = ['true', 'false'];
    const inProgressOptions = inProgress === 'true';
    if (inProgress && valid.includes(inProgress)) {
      return this.matchModel.findAll({ where: { inProgress: inProgressOptions }, ...association });
    }
    const matches = await this.matchModel.findAll(association);
    return matches;
  }

  public async add(match: IMatchRequest): Promise<Match> {
    const newMatch = await this.matchModel.create({ ...match, inProgress: true });
    return newMatch;
  }

  public async endGame(id: string): Promise<void> {
    await this.matchModel.update({ inProgress: false }, { where: { id } });
  }
}
