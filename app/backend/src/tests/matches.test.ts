import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';

import * as mock from './mocks'
import Match from '../database/models/Match';
import * as jwt from 'jsonwebtoken'

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /matches', () => {
  beforeEach(() => sinon.restore())
  describe('quando a requisição é feita com sucesso', () => {
    it('deve retornar um status 200 com um array de partidas', async () => {
      sinon.stub(Match, 'findAll').resolves(mock.matches as unknown as Match[]);
      const httpResponse = await chai.request(app).get('/matches');
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal(mock.matches)
    });
  });

  // é possível acessar o banco real no teste de integração?
  // describe('quando é informada uma "querystring"', () => {
  //   describe('caso a querystring for false', () => {
  //     it('deve retornar apenas as partidas em andamento', async () => {
  //       const httpResponse = await chai.request(app).get('/matches?inProgress=false')
  //       httpResponse.body.forEach((match: Match) => {
  //         expect(match.inProgress).to.be.false
  //       })        
  //     });
  //   });
  // });

  describe('quando é informada uma "querystring"', () => {
    describe('caso a querystring for false', () => {
      it('deve retornar apenas as partidas em andamento', async () => {
        sinon.stub(Match, 'findAll').resolves(mock.matchInProgressFalse as unknown as Match[]);
        const httpResponse = await chai.request(app).get('/matches?inProgress=false')
        httpResponse.body.forEach((match: Match) => 
          expect(match.inProgress).to.be.false)
      });
    });

    describe('caso a querystring for true', () => {
      it('deve retornar apenas as partidas em andamento', async () => {
        sinon.stub(Match, 'findAll').resolves(mock.matchInProgressTrue as unknown as Match[]);
        const httpResponse = await chai.request(app).get('/matches?inProgress=true')
        httpResponse.body.forEach((match: Match) => 
          expect(match.inProgress).to.be.true)
      });
    });
  });
});

describe('POST /matches', () => {
  beforeEach(() => sinon.restore())
  describe('quando a requisição é feita com sucesso', () => {
    it('deve retornar um status 201 com a partida criada', async () => {

      sinon.stub(jwt, 'verify').callsFake(() => mock.userMock)
      sinon.stub(Match, 'create').resolves(mock.newMatch as Match);
      // const httpResponse = await chai
      //   .request(app)
      //   .post('/matches')
      //   .set('authorization', 'token')
      // expect(httpResponse.status).to.equal(200)
    });
  });
});