
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { matches } from './mocks/matches.mock';
/* import { validToken } from './mocks/users.mock';
import JWT from '../util/jwt';
import Validations from '../../src/middlewares/Validations'; */

const { expect } = chai;

chai.use(chaiHttp);

describe('Testes para a rota de matches', function () {

  describe('GET /matches', function () {
    it('deve retornar todas as partidas', async function (done) {
      sinon.stub(SequelizeMatch, 'findAll').resolves(matches as any);
      done();
      const { status, body } = await chai.request(app).get('/matches');
      expect(status).to.be.equal(200);
      expect(body).to.deep.equal(matches);
    });
    afterEach(sinon.restore);
  });
  afterEach(sinon.restore);
});