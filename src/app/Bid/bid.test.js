/* eslint-disable no-underscore-dangle */
const chai = require('chai');
const chaiHTTP = require('chai-http');
const request = require('supertest');
const { describe, it, beforeEach, before, after } = require('mocha');

const server = require('../../../index');

chai.should();
const { expect } = chai;
chai.use(chaiHTTP);

describe('Bid', () => {
  let addUserPayload;
  let userId;
  let productId;
  let bidId;
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
      biddingAmount: '3500',
      product: productId
    };
  });

  after(async () => {
    await request(server).delete(`/remove/${userId}`);
    await request(server).delete(`/remove/${productId}`);
    await request(server).delete(`/remove/${bidId}`);
  });

  describe('Bid Product', () => {
    it('Do not bid with invalid fields', async () => {
      bidProductPayload.owner = userId;
      bidProductPayload.biddingAmount = 'ten thousand';
      const res = await request(server).post('/bids/bidproduct').send(bidProductPayload);
      expect(res.status).to.equal(400);
    });

    it('Add bid', async () => {
      const res = await request(server).post('/bids/bidproduct').send(bidProductPayload);
      bidId = res.body._id;
      expect(res.status).to.equal(200);
    });
  });
});
