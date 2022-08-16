import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';


import JWT from '../utils/jwtUtils/JWT';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /login/validate', () => {
  beforeEach(() => sinon.restore())
  describe('quando o token é válido', () => {
    it('deve retornar a função do usuário e um status 200', async () => {
      const payload = {
        role: 'admin'
      };
      sinon.stub(JWT.prototype, 'verify').returns(payload)
      const httpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', 'valid_token');
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal(payload)
    })
  })
})