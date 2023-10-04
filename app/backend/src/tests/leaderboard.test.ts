import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { leaderboard_default } from './mocks/leaderboard.mock';

const { expect } = chai;
chai.use(chaiHttp);

describe('Testes para a rota de teams', function () {
    afterEach(function () {
        sinon.restore();
    });

    describe('GET /leaderboard', function () {
        it('deve retornar a tabela completa', async function () {
            const { status, body } = await chai.request(app).get('/leaderboard');
            expect(status).to.be.equal(200);
            expect(body).to.deep.equal(leaderboard_default);
        });
    });
});