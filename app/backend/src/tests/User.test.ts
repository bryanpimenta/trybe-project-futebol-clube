import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import {
    invalidEmailLoginBody, invalidPasswordLoginBody,
    validLoginBody, wrongPassUser, validUser,
} from './mocks/users.mock';
import JWT from '../util/jwt';
import Validations from '../../src/middlewares/Validations';

import SequelizeUser from '../../src/database/models/SequelizeUser';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /login', function () {
    afterEach(sinon.restore);
    it('não deve logar com dados do body inválidos', async function () {
        const { status, body } = await chai.request(app).post('/login')
            .send({});

        expect(status).to.equal(400);
        expect(body).to.be.deep.equal({ message: 'All fields must be filled' });
    });

    it('não deve logar com uma senha inválida', async function () {
        const { status, body } = await chai.request(app).post('/login')
            .send(invalidPasswordLoginBody);

        expect(status).to.equal(401);
        expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
    });

    it('deve retornar um token quando o login for concluído', async function () {
        sinon.stub(SequelizeUser, 'findOne').resolves(validUser as any);

        const { status, body } = await chai.request(app)
            .post('/login')
            .send(validLoginBody);

        expect(status).to.equal(200);
        expect(body).to.have.key('token');
    });
});