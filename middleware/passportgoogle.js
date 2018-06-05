const path = require('path');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models').User;
const configAuth = require(path.join(CONFIG.base_path, 'config/auth.js'));

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
            // pull in our app id and secret from our auth.js file
            clientID: configAuth.googleAuth.clientID,
            clientSecret: configAuth.googleAuth.clientSecret,
            callbackURL: configAuth.googleAuth.callbackURL,
        },
        // facebook will send back the token and profile
        async (token, refreshToken, profile, done) => {
            let user, err;
            [err, user] = await to(User.findOne({
                where: {
                    googleId: profile.id
                }
            }));
            if (err) {
                return done(err, false);
            }
            if (!user) {
                [err, user] = await to(User.create({
                    'googleId': profile.id,
                    'googleToken': token,
                    'googleName': profile.name.givenName + ' ' + profile.name.familyName,
                    'googleEmail': profile.emails && profile.emails.length ? profile.emails[0].value : ''
                }));
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                }
            }
            return done(null, user);
         }));

};