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
  let bidProductPayload;

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
    const productRes = await request(server).get('/bids');
    productId = productRes.body[0]._id;
  });
  beforeEach(() => {
    bidProductPayload = {
      bidder: userId,
      biddingAmount: '10000',
      product: productId
    };
  });

  describe('Bid Product', () => {
    it('Do not bid with invalid fields', done => {
      bidProductPayload.owner = userId;
      bidProductPayload.biddingAmount = 'ten thousand';
      request(server)
        .post('/bids/bidproduct')
        .send(bidProductPayload)
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
    it('Add product', async () => {
      const res = await request(server).post('/bids/bidproduct').send(bidProductPayload);
      productId = res.body._id;
      expect(res.status).to.equal(200);
    });
  });
});
