require('dotenv').config();

module.exports = {

    'facebookAuth' : {
        'clientID'      : process.env.FB_CLIENT_ID, // your App ID
        'clientSecret'  : process.env.FB_CLIENT_SECRET, // your App Secret
        'callbackURL'   : process.env.FB_CALLBACK_URL,
        'profileURL'    : 'https://graph.facebook.com/me?fields=name,first_name,last_name,email',
        'profileFields' : ['id', 'email', 'name', 'displayName'] // For requesting permissions from Facebook API
    },

    'googleAuth' : {
        'clientID'      : process.env.GOOGLE_CLIENT_ID,
        'clientSecret'  : process.env.GOOGLE_CLIENT_SECRET,
        'callbackURL'   : process.env.GOOGLE_CALLBACK_URL
    }

};