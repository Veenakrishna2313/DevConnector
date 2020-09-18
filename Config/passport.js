const { ExtractJwt } = require("passport-jwt");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractToken = require("passport-jwt").ExtractToken;
const keys = require("../config/keys");
const passport = require("passport");
const User = require("../models/User");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};
