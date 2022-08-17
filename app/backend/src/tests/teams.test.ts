import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /teams', () => {
  beforeEach(() => sinon.restore())
  describe('quando a requisição é feita com sucesso', () => {
    it('deve retornar um status 200', async () => {
      const teams = [
        {
          "id": 1,
          "teamName": "Avaí/Kindermann"
        },
        {
          "id": 2,
          "teamName": "Bahia"
        }
      ]
      sinon.stub(Team, 'findAll').resolves(teams as Team[]);
      const httpRequest = await chai.request(app).get('/teams');
      expect(httpRequest.status).to.equal(200);
    });

    it('deve retornar um array com os times cadastrados', async () => {
      const teams = [
        {
          "id": 1,
          "teamName": "Avaí/Kindermann"
        },
        {
          "id": 2,
          "teamName": "Bahia"
        }
      ]
      sinon.stub(Team, 'findAll').resolves(teams as Team[]);
      const httpRequest = await chai.request(app).get('/teams');
      expect(httpRequest.body).to.deep.equal(teams);
    });
  });
});

describe('GET /teams/:id', () => {
  beforeEach(() => sinon.restore())
  describe('quando a requisição é feita com sucesso', () => {
    it('deve retornar um status 200', async () => {
      const team = {
        id: 1,
        teamName: "Avaí/Kindermann"
      }
      sinon.stub(Team, 'findByPk').resolves(team as Team);
      const httpRequest = await chai.request(app).get('/teams/1');
      expect(httpRequest.status).to.equal(200);
    });

    it('deve retornar o time encontrado', async () => {
      const team = {
        id: 1,
        teamName: "Avaí/Kindermann"
      }
      sinon.stub(Team, 'findByPk').resolves(team as Team);
      const httpRequest = await chai.request(app).get('/teams/1');
      expect(httpRequest.body).to.deep.equal(team);
      expect(httpRequest.body).to.have.all.keys('id', 'teamName')
    });
  });
});