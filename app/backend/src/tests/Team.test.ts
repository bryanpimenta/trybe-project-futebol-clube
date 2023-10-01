
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { teams, team } from './mocks/teams.mock';

const { expect } = chai;

chai.use(chaiHttp);

describe('Testes para a rota de teams', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('GET /teams', function () {
    it('deve retornar todos os times', async function () {
      sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);
      const { status, body } = await chai.request(app).get('/teams');
      expect(status).to.be.equal(200);
      expect(body).to.deep.equal(teams);
    });

    it('deve retornar o time por seu id', async function () {
      sinon.stub(SequelizeTeam, 'findOne').resolves(team as any);
      const { status, body } = await chai.request(app).get('/teams/5');
      expect(status).to.equal(200);
      expect(body).to.deep.equal(team);
    });

    it('deve retornar que o time não foi encontrado ', async function () {
      sinon.stub(SequelizeTeam, 'findOne').resolves(null);
      const { status, body } = await chai.request(app).get('/teams/999');
      expect(status).to.equal(404);
      expect(body.message).to.equal('Team 999 not found');
    });
  });
});