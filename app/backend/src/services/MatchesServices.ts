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

  // public async getById(id: number): Promise<Team> {
  //   const team = await this.teamModel.findByPk(id);
  //   return team as Team;
  // }
}
