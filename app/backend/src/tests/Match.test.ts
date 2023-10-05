import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import {
  matches,
  matches_no_progress,
  matches_in_progress,
  update_match,
  create_match,
  invalid_create_match,
  inexistent_team_match,
} from './mocks/matches.mock';
import { validToken } from './mocks/users.mock';
import JWT from '../util/jwt';
import Validations from '../../src/middlewares/Validations';
import SequelizeTeam from '../../src/database/models/SequelizeTeam';
import { teams } from './mocks/teams.mock';

const { expect } = chai;
chai.use(chaiHttp);

describe('Testes para a rota de matches', function () {
  describe('GET /matches', function () {
    afterEach(sinon.restore);
    it('deve retornar todas as partidas', async function () {
      sinon.stub(SequelizeMatch, 'findAll').resolves(SequelizeMatch.bulkBuild(matches));
      const { status, body } = await chai.request(app).get('/matches');
      expect(status).to.be.equal(200);
      expect(body).to.deep.equal(matches);
    });

    it('deve retornar todas as partidas em andamento', async function () {
      sinon.stub(SequelizeMatch, 'findAll').resolves(SequelizeMatch.bulkBuild(matches_in_progress));
      const { status, body } = await chai.request(app)
        .get('/matches')
        .query({ inProgress: true });
      expect(status).to.be.equal(200);
      expect(body).to.deep.equal(matches_in_progress);
    });
    it('deve retornar todas as partidas ', async function () {
      sinon.stub(SequelizeMatch, 'findAll').resolves(SequelizeMatch.bulkBuild(matches_no_progress));
      const { status, body } = await chai.request(app)
        .get('/matches')
        .query({ inProgress: false });
      expect(status).to.be.equal(200);
      expect(body).to.deep.equal(matches_no_progress);
    });
  });

  describe('PATCH /matches/:id/finish', function () {
    afterEach(sinon.restore);
    it('deve finalizar uma partida', async function () {
      sinon.stub(JWT, 'verify').resolves();
      sinon.stub(Validations, 'validateToken').returns(Promise.resolve());
      sinon.stub(SequelizeMatch, 'update').resolves([0]);

      const { status, body } = await chai.request(app)
        .patch('/matches/1/finish')
        .set('authorization', `Bearer ${validToken}`);

      expect(status).to.be.equal(200);
      expect(body).to.deep.equal({ message: "Finished" });
    });
  });

  describe('PATCH /matches/:id', function () {
    afterEach(sinon.restore);
    it('deve atualizar as informações de uma partida', async function () {
      sinon.stub(JWT, 'verify').resolves();
      sinon.stub(Validations, 'validateToken').returns(Promise.resolve());
      sinon.stub(SequelizeMatch, 'update').resolves([1]);

      const { status, body } = await chai.request(app)
        .patch('/matches/1')
        .set('authorization', `Bearer ${validToken}`)
        .send(update_match);

      expect(status).to.be.equal(200);
      expect(body).to.deep.equal({ message: "Updated" });
    });
  });

  describe('POST /matches', function () {
    afterEach(sinon.restore);
    it('deve criar uma nova partida com sucesso', async function () {
      sinon.stub(JWT, 'verify').resolves();
      sinon.stub(Validations, 'validateToken').returns(Promise.resolve());
      sinon.stub(SequelizeTeam, 'findByPk')
        .onFirstCall().resolves(SequelizeTeam.build(teams[0]))
        .onSecondCall().resolves(SequelizeTeam.build(teams[1]));

      sinon.stub(SequelizeMatch, 'create').resolves(SequelizeMatch.build({ id: 1, ...create_match, inProgress: true }));

      const { status, body } = await chai.request(app)
        .post('/matches')
        .set('authorization', `Bearer ${validToken}`)
        .send(create_match);

      expect(status).to.be.equal(201);
      expect(body).to.be.deep.equal({ id: 1, ...create_match, inProgress: true });
    });

    it('deve falhar ao tentar criar partida entre times iguais', async function () {
      sinon.stub(JWT, 'verify').resolves();
      sinon.stub(Validations, 'validateToken').returns(Promise.resolve());

      const { status, body } = await chai.request(app)
        .post('/matches')
        .set('authorization', `Bearer ${validToken}`)
        .send(invalid_create_match);

      expect(status).to.be.equal(422);
      expect(body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
    });

    it('deve falhar ao tentar criar partida entre times que não existe', async function () {
      sinon.stub(JWT, 'verify').resolves();
      sinon.stub(Validations, 'validateToken').returns(Promise.resolve());
      sinon.stub(SequelizeTeam, 'findByPk')
        .onFirstCall().resolves(SequelizeTeam.build(teams[0]))
        .onSecondCall().resolves(null);

      const { status, body } = await chai.request(app)
        .post('/matches')
        .set('authorization', `Bearer ${validToken}`)
        .send(inexistent_team_match);

      expect(status).to.be.equal(404);
      expect(body).to.be.deep.equal({ message: 'There is no team with such id!' });
    });
  });
});