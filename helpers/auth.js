const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      passReqToCallback: true,
    },
    (request, accessToken, refreshToken, profile, done) => done(null, profile)
  )
);

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));
