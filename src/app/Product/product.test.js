/* eslint-disable no-underscore-dangle */
const chai = require('chai');
const chaiHTTP = require('chai-http');
const request = require('supertest');
const { describe, it, beforeEach, before } = require('mocha');

const server = require('../../../index');

chai.should();
const { expect } = chai;
chai.use(chaiHTTP);

describe('Product', () => {
  let addUserPayload;
  let userId;
  let productId;
  let addProductPayload;

  before(async () => {
    addUserPayload = {
      name: 'test',
      address: 'test, test',
      accountId: '123456789',
      amount: '10000',
      email: 'test@gmail.com',
      password: '123456hello'
    };
    const res = await request(server).post('/users').send(addUserPayload);
    userId = res.body._id;
  });
  beforeEach(() => {
    addProductPayload = {
      productName: 'test',
      productDescription: 'test, test',
      minBidAmount: '100',
      biddingWindow: '5',
      owner: userId
    };
  });

  describe('Add Product', () => {
    it('Do not add with invalid fields', done => {
      addProductPayload.owner = userId;
      addProductPayload.minBidAmount = 'one hundred';
      request(server)
        .post('/products')
        .send(addProductPayload)
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
    it('Add product', async () => {
      const res = await request(server).post('/products').send(addProductPayload);
      productId = res.body._id;
      expect(res.status).to.equal(200);
    });
  });

  describe('Start Bid', () => {
    it('Do not start with invalid fields', async () => {
      const userIdTest = '2fsga573e45h';
      const res = await request(server).get(`/products/startbid/user/${userIdTest}/product/${productId}`).send(addProductPayload);
      expect(res.status).to.equal(400);
    });
    it('start bid', async () => {
      const res = await request(server).get(`/products/startbid/user/${userId}/product/${productId}`).send(addProductPayload);
      expect(res.status).to.equal(200);
    });
  });
});
