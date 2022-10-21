/* eslint-disable no-underscore-dangle */
const chai = require('chai');
const chaiHTTP = require('chai-http');
const request = require('supertest');
const { describe, it, beforeEach, after } = require('mocha');

const server = require('../../../index');

chai.should();
const { expect } = chai;
chai.use(chaiHTTP);

describe('User', () => {
  let addUserPayload;
  let addMoneyPayload;
  let userId;

  beforeEach(() => {
    addUserPayload = {
      name: 'test',
      address: 'test, test',
      accountId: '123456789',
      amount: '10000',
      email: 'test@gmail.com',
      password: '123456hello'
    };

    addMoneyPayload = {
      amount: 100
    };
  });

  after(async () => {
    await request(server).delete(`/remove/${userId}`);
  });

  describe('Add user', () => {
    it('Do not add with invalid fields', async () => {
      addUserPayload.password = 12345;
      const res = await request(server).post('/users').send(addUserPayload);
      expect(res.status).to.equal(400);
    });

    it('Add user', async () => {
      const res = await request(server).post('/users').send(addUserPayload);
      userId = res.body._id;
      expect(res.status).to.equal(201);
    });
  });

  describe('Add money', () => {
    it('Do not add with invalid fields', async () => {
      addMoneyPayload.amount = 'one';
      const res = await request(server).post(`/users/addMoney/${userId}`).send(addMoneyPayload);
      expect(res.status).to.equal(400);
    });

    it('Add money', async () => {
      const res = await request(server).post(`/users/addMoney/${userId}`).send(addMoneyPayload);
      expect(res.status).to.equal(200);
    });
  });
});
