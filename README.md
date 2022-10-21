
# Online Auction System

This project is a node.js based implementation of Auction system. This repository contains backend code for auction system where user can create their account with which they can do following things:

1. Add product to which other users can bid
2. User can themself bid for a particular product



## Features

- Create User
- Add/Remove product
- Add money
- Start bid or a product
- Bid for product
- Guest view : To view completed bids


## Frameworks

**Server:** Node, Express, Passport


## Setup

- To start with project you need to install npm

```bash
  npm i
```

- You will need postman to run APIs
- Add .env file in root directory with following:

```bash
   MONGOURL=YOUR_MONGO_URL
   GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENTID
   GOOGLE_SECRET_ID=YOUR_GOOGLE_SECRETID
````

## Code examples

- Authentication
User can register to auction system and later use information to login

- User
User registers with minimum money and can add later too.
User can view products and can check if products are open to bid.
User can add product and begin bid for that product.
User can view bids on particular product.

- Guest
Guest can only view all the products whose bidding process is completed.



