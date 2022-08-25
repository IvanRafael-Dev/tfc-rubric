import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App, app } from '../app';
import Server, { PORT } from '../server'

chai.use(chaiHttp);

// const { expect } = chai;

describe('Testes do APP', () => {
  beforeEach(() => sinon.restore())
  describe('Testa rota default do projeto', () => {
    it('deve retornar um status 200', async () => {
      const httpResponse = await chai.request(app).get('/');
      chai.expect(httpResponse.status).to.equal(200)
    });

    it('deve retonar mensagem "ok"', async () => {
      const httpResponse = await chai.request(app).get('/');
      chai.expect(httpResponse.body).to.deep.equal({ ok: true })
    });
  });

  describe('App chama método start', () => {
    it('Cobertura do método start', async () => {
      const appStart = new App();
    });
  });

  describe('Server chama método start', () => {
    it('Cobertura do método start', async () => {
      const appStart = new Server();
    });
  });

  describe('Erros não tratados', () => {
    it('devem ser captados pelo middleware de erro com status 500', async () => {
      const httpResponse = await chai.request(app).get('/internal-error');
      chai.expect(httpResponse.status).to.equal(500);
    });
  });
});
