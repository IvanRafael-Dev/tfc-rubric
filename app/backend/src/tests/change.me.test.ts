import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App, app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do APP', () => {
  beforeEach(() => sinon.restore())
  describe('Testa rota default do projeto', () => {
    it('deve retornar um status 200', async () => {
      const httpResponse = await chai.request(app).get('/');
      expect(httpResponse.status).to.equal(200)
    });

    it('deve retonar mensagem "ok"', async () => {
      const httpResponse = await chai.request(app).get('/');
      expect(httpResponse.body).to.deep.equal({ ok: true })
    });
  });

  describe('App chama método start', () => {
    it('Cobertura do método start', async () => {
      const appStart = new App();
      expect(appStart.start(8080))
    });
  });

  describe('Erros não tratados', () => {
    it('devem ser captados pelo middleware de erro com status 500', async () => {
      const httpResponse = await chai.request(app).get('/internal-error');
      expect(httpResponse.status).to.equal(500);
    });
  });
  

  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
});
