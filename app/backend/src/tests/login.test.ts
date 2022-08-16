import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App, app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';
import LoginServices from '../services/LoginServices';
import MissingParamError from '../utils/errors/missing-param-error';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  beforeEach(() => sinon.restore())

  describe('quando o login não é realizado com sucesso', () => {

    describe('quando o email não é enviado', () => {
      it('deve retornar um status 400', async () => {
        const validLoginBody = { password: 'valid_password' };
        // sinon.stub(LoginServices, 'validateUserLoginData').throws(new MissingParamError('All fields must be filled'))
        const httpResponse = await chai.request(app).post('/login').send(validLoginBody);
        expect(httpResponse.status).to.equal(400);
        expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' })
      });
    });

    describe('quando o password não é enviado', () => {
      it('deve retornar um status 400', async () => {
        const validLoginBody = { email: 'valid_email@mail.com'};
        const httpResponse = await chai.request(app).post('/login').send(validLoginBody);
        expect(httpResponse.status).to.equal(400);
        expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' })
      });
    });

    describe('quando o email é inválido', () => {
      it('deve retornar um status 401', async () => {
        const validLoginBody = { email: 'invalid_email', password: 'valid_password'};
        const httpResponse = await chai.request(app).post('/login').send(validLoginBody);
        expect(httpResponse.status).to.equal(401);
        expect(httpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' })
      });
    });

    describe('se o usuário não é encontrado', () => {
      it('deve retornar um status 401', async () => {
        const validLoginBody = { email: 'valid_email@mail.com', password: 'teste'};
        sinon.stub(User, 'findOne').resolves(null);
        sinon.stub(bcrypt, 'compareSync').returns(false)
        const httpResponse = await chai.request(app).post('/login').send(validLoginBody);
        expect(httpResponse.status).to.equal(401);
        expect(httpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' })
      });
    });

    describe('se a senha é inválida', () => {
      it('deve retornar um status 401', async () => {
        const validLoginBody = { email: 'valid_email@mail.com', password: 'teste'};
        const userMock = {
          id: 1, role: 'admin', username: 'fake_user', email: 'valid_email'
        }
        sinon.stub(User, 'findOne').resolves(userMock as User)
        sinon.stub(bcrypt, 'compareSync').returns(false)
        const httpResponse = await chai.request(app).post('/login').send(validLoginBody);
        expect(httpResponse.status).to.equal(401);
        expect(httpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password'});
      });
    });
  });

  describe('se o login é feito com sucesso', () => {
    it('deve retornar um status 200', async () => {
      const validLoginBody = { email: 'valid_email@email.com', password: 'valid_password'};

      const userMock = {
        id: 1, role: 'admin', username: 'fake_user', email: 'valid_email'
      }

      sinon.stub(User, 'findOne').resolves(userMock as User)
      sinon.stub(bcrypt, 'compareSync').returns(true)
      const httpResponse = await chai.request(app).post('/login').send(validLoginBody);
      expect(httpResponse.status).to.equal(200);
    });

    it('deve retornar um token', async () => {
      const validLoginBody = { email: 'valid_email@email.com', password: 'valid_password'};

      const userMock = {
        id: 1, role: 'admin', username: 'fake_user', email: 'valid_email'
      }
      sinon.stub(User, 'findOne').resolves(userMock as User)
      sinon.stub(bcrypt, 'compareSync').returns(true)
      const httpResponse = await chai.request(app).post('/login').send(validLoginBody);
      expect(httpResponse.body).to.have.key('token')
    });
  });
});