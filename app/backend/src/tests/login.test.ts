import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App, app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  beforeEach(() => sinon.restore())

  describe('quando o login não é realizado com sucesso', () => {
    describe('se o usuário não é encontrado', () => {
      it('deve retornar um status 401', async () => {
        sinon.stub(User, 'findOne').resolves(null)
        sinon.stub(bcrypt, 'compareSync').returns(false)
        const httpResponse = await chai.request(app).post('/login').send();
        expect(httpResponse.status).to.equal(401);
        expect(httpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' })
      });
    });

    describe('se a senha é inválida', () => {
      it('deve retornar um status 401', async () => {
        const userMock = {
          id: 1, role: 'admin', username: 'fake_user', email: 'valid_email'
        }
        sinon.stub(User, 'findOne').resolves(userMock as User)
        sinon.stub(bcrypt, 'compareSync').returns(false)
        const httpResponse = await chai.request(app).post('/login').send();
        expect(httpResponse.status).to.equal(401);
        expect(httpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password'});
      });
    });
  });

  describe('se o login é feito com sucesso', () => {
    it('deve retornar um status 200', async () => {
      const userMock = {
        id: 1, role: 'admin', username: 'fake_user', email: 'valid_email'
      }

      sinon.stub(User, 'findOne').resolves(userMock as User)
      sinon.stub(bcrypt, 'compareSync').returns(true)
      const httpResponse = await chai.request(app).post('/login').send();
      expect(httpResponse.status).to.equal(200);
    });

    it('deve retornar um token', async () => {
      const userMock = {
        id: 1, role: 'admin', username: 'fake_user', email: 'valid_email'
      }
      sinon.stub(User, 'findOne').resolves(userMock as User)
      sinon.stub(bcrypt, 'compareSync').returns(true)
      const httpResponse = await chai.request(app).post('/login').send();
      expect(httpResponse.body).to.have.key('token')
    });
  });
});