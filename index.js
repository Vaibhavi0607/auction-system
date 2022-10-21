const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const { logger } = require('./src/utils/logger');
require('dotenv/config');
require('./helpers/auth');

const userRoutes = require('./src/app/User/user.router');
const productRoutes = require('./src/app/Product/product.router');
const bidsRoutes = require('./src/app/Bid/bid.router');
const guestRoutes = require('./src/app/Guests/guests.router');

const app = express();

function isLoggedIn(req, res, next) {
  // eslint-disable-next-line no-unused-expressions
  req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

const mongoOptions = { useNewUrlParser: true };

app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/bids', bidsRoutes);
app.use('/guest', guestRoutes);

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure',
  })
);

app.get('/protected', isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

app.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) {
      res.send(err);
    }
    res.redirect('/');
  });
  req.session.destroy();
  res.send('Goodbye!');
});

app.get('/auth/failure', (req, res) => {
  res.send('Failed to authenticate user');
});

mongoose.connect(process.env.MONGOURL, mongoOptions, () => {
  logger.info('Connected to db');
});

module.exports = app.listen(3000, () => {
  logger.info('Listening on port 3000');
});
