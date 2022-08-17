import Team from '../database/models/Team';

export default class TeamServices {
  constructor(
    private teamModel = Team,
  ) {}

  public async get(): Promise<Team[]> {
    const teams = await this.teamModel.findAll();
    return teams;
  }

  public async getById(id: number): Promise<Team> {
    const team = await this.teamModel.findByPk(id);
    return team as Team;
  }
}
