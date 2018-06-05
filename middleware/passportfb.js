const path = require('path');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models').User;
const configAuth = require(path.join(CONFIG.base_path, 'config/auth.js'));

module.exports = (passport) => {
    passport.use(new FacebookStrategy({
            // pull in our app id and secret from our auth.js file
            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL,
            profileFields: configAuth.facebookAuth.profileFields
        },
        // facebook will send back the token and profile
        async (token, refreshToken, profile, done) => {
            let user, err;
            [err, user] = await to(User.findOne({
                where: {
                    fbId: profile.id
                }
            }));
            if (err) {
                return done(err, false);
            }
            if (!user) {
                [err, user] = await to(User.create({
                    'fbId': profile.id,
                    'fbToken': token,
                    'fbName': profile.name.givenName + ' ' + profile.name.familyName,
                    'fbEmail': profile.emails && profile.emails.length ? profile.emails[0].value : '',
                    'firstName': profile.name.givenName || '',
                    'lastName': profile.name.familyName || ''
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