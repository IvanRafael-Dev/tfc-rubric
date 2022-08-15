import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App, app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
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

  describe('Chama método start', () => {
    it('Cobertura do método start', async () => {
      const appStart = new App()
      expect(appStart.start(8080))
    })
  })

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
