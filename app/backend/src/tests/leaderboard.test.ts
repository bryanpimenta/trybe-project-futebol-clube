import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { leaderboard_default, leaderboard_home, leaderboard_away } from './mocks/leaderboard.mock';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { teams_leaderboard } from './mocks/teams.mock';
import { matches } from './mocks/matches.mock';

const { expect } = chai;
chai.use(chaiHttp);

describe('Testes para a rota de Leaderboard', function () {
    afterEach(function () {
        sinon.restore();
    });

    describe('GET /leaderboard', function () {
        it('deve retornar a tabela completa', async function () {
            sinon.stub(SequelizeTeam, 'findAll').resolves(SequelizeTeam.bulkBuild(teams_leaderboard));
            sinon.stub(SequelizeMatch, 'findAll').resolves(SequelizeMatch.bulkBuild(matches));
            const { status, body } = await chai.request(app).get('/leaderboard');
            expect(status).to.be.equal(200);
            expect(body).to.deep.equal(leaderboard_default);
        });
    });

    describe('GET /leaderboard/home', function () {
        it('deve retornar a tabela de partidas em casa', async function () {
            sinon.stub(SequelizeTeam, 'findAll').resolves(SequelizeTeam.bulkBuild(teams_leaderboard));
            sinon.stub(SequelizeMatch, 'findAll').resolves(SequelizeMatch.bulkBuild(matches));
            const { status, body } = await chai.request(app).get('/leaderboard/home');
            expect(status).to.be.equal(200);
            expect(body).to.deep.equal(leaderboard_home);
        });
    });

    describe('GET /leaderboard/away', function () {
        it('deve retornar a tabela de partidas fora de casa', async function () {
            sinon.stub(SequelizeTeam, 'findAll').resolves(SequelizeTeam.bulkBuild(teams_leaderboard));
            sinon.stub(SequelizeMatch, 'findAll').resolves(SequelizeMatch.bulkBuild(matches));
            const { status, body } = await chai.request(app).get('/leaderboard/away');
            expect(status).to.be.equal(200);
            expect(body).to.deep.equal(leaderboard_away);
        });
    });
});