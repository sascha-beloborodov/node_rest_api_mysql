const User = require('./../models').User;
const validator = require('validator');

// this is so they can send in 3 options uniqueKey, email, or phone and it will work
const getUniqueKeyFromBody = (body) => {
    return body.email || null;
}
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;

const createUser = async (userInfo) => {
    let uniqueKey, authInfo, err;
    authInfo = {};
    authInfo.status = 'create';
    uniqueKey = getUniqueKeyFromBody(userInfo);
    if (!uniqueKey) {
        TE('An email was not entered.');
    }
    if (!validator.isEmail(uniqueKey)) {
        TE('A valid email was not entered.');
    }
    authInfo.method = 'email';
    userInfo.email = uniqueKey;
    [err, user] = await to(User.create(userInfo));
    if (err) {
        TE('user already exists with that email');
    }
    return user;    
}
module.exports.createUser = createUser;

const authUser = async (userInfo) => { //returns token
    let uniqueKey;
    let authInfo = {};
    authInfo.status = 'login';
    uniqueKey = getUniqueKeyFromBody(userInfo);

    if (!uniqueKey) {
        TE('Please enter an email to login');
    }
    if (!userInfo.password) {
        TE('Please enter a password to login');
    }

    let user;
    if (validator.isEmail(uniqueKey)) {
        authInfo.method = 'email';

        [err, user] = await to(User.findOne({
            where: {
                email: uniqueKey
            }
        }));
        // console.log(err, user, uniqueKey);
        if (err) TE(err.message);

    } else {
        TE('A valid email was not entered');
    }

    if (!user) TE('Not registered');

    [err, user] = await to(user.comparePassword(userInfo.password));

    if (err) TE(err.message);

    return user;

}
module.exports.authUser = authUser;