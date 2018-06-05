const express = require('express');
const router = express.Router();

const UserController = require('./../controllers/UserController');
const QuestController = require('./../controllers/QuestController');
const HomeController = require('./../controllers/HomeController');

const custom = require('./../middleware/custom');

const passport = require('passport');
const path = require('path');

require('./../middleware/passport')(passport);

/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({
        status: 'success',
        message: 'Stiqet API',
        data: {
            'version_number': 'v1.0.0'
        }
    });
});

// auth routes

/**
 * @api {post} /auth/register Register new user
 * @apiName Register
 * @apiGroup Auth
 *
 * @apiHeader {String} Content-Type=application/json
 * 
 * @apiParam {Number} email
 * @apiParam {String} password
 * @apiParam {String} password_confirmation
 * 
 * @apiSuccess {String} user
 * @apiSuccess {String} success
 * @apiSuccess {String} token
 */
router.post('/auth/register', UserController.create);

/**
 * @api {post} /auth/login Login
 * @apiName Login
 * @apiGroup Auth
 *
 * @apiHeader {String} Content-Type=application/json
 * 
 * @apiParam {Number} email
 * @apiParam {String} password
 * 
 * @apiSuccess {String} user
 * @apiSuccess {String} success
 * @apiSuccess {String} token
 */
router.post('/auth/login', UserController.login);


// user's routes
router.get('/users/me', passport.authenticate('jwt', {
    session: false
}), UserController.get);

router.put('/users/me', passport.authenticate('jwt', {
    session: false
}), UserController.update);

router.delete('/users/me', passport.authenticate('jwt', {
    session: false
}), UserController.remove);


// quest routes

/**
 * @api {get} /quests Get all quests
 * @apiName AllQuests
 * @apiGroup Quest
 *
 * @apiHeader {String} Content-Type=application/json
 * 
 * @apiParam {Number} limit
 * @apiParam {Number} page
 * 
 * @apiSuccess {String} quests object of created quest
 * @apiSuccess {String} success
 */
router.get('/quests', QuestController.getAll);

/**
 * @api {post} /quests Request of creation quest
 * @apiName CreateQuest
 * @apiGroup Quest
 *
 * @apiHeader {String} Authorization=Bearer_xxx... Token
 * @apiHeader {String} Content-Type=application/json
 * 
 * @apiParam {String} name
 * @apiParam {String} image - todo
 * @apiParam {Number} best
 * @apiParam {Number} accepted
 * @apiParam {Number} active
 * @apiParam {Number} minPlayers
 * @apiParam {Number} maxPlayers
 * @apiParam {Number} minAge
 * @apiParam {Number} duration
 * @apiParam {Number} complexity
 * @apiParam {Number} raiting
 * @apiParam {String} description
 * @apiParam {Float} latitude
 * @apiParam {Float} longitude
 * @apiParam {String} city
 * @apiParam {String} address
 * @apiParam {String} phone
 * @apiParam {String} subway
 * @apiParam {String} howToFind
 * @apiParam {Number} typeId
 * @apiParam {String} location=en
 * 
 * @apiSuccess {String} quest object of created quest
 * @apiSuccess {String} success
 */
router.post('/quests', passport.authenticate('jwt', {
    session: false
}), QuestController.create);

router.get('/quests/:questId', passport.authenticate('jwt', {
    session: false
}), custom.quest, QuestController.get);

/**
 * @api {put} /quests/:questId Update quest
 * @apiName UpdateQuest
 * @apiGroup Quest
 *
 * @apiHeader {String} Authorization=Bearer_xxx... Token
 * @apiHeader {String} Content-Type=application/json
 * 
 * @apiParam {String} name
 * @apiParam {String} image - todo
 * @apiParam {Number} best
 * @apiParam {Number} accepted
 * @apiParam {Number} active
 * @apiParam {Number} minPlayers
 * @apiParam {Number} maxPlayers
 * @apiParam {Number} minAge
 * @apiParam {Number} duration
 * @apiParam {Number} complexity
 * @apiParam {Number} raiting
 * @apiParam {String} description
 * @apiParam {Float} latitude
 * @apiParam {Float} longitude
 * @apiParam {String} city
 * @apiParam {String} address
 * @apiParam {String} phone
 * @apiParam {String} subway
 * @apiParam {String} howToFind
 * @apiParam {Number} typeId
 * @apiParam {String} location=en
 * 
 * @apiSuccess {String} quest object of updated quest
 * @apiSuccess {String} success
 */
router.put('/quests/:questId', passport.authenticate('jwt', {
    session: false
}), custom.quest, QuestController.update);

router.delete('/quests/:questId', passport.authenticate('jwt', {
    session: false
}), custom.quest, QuestController.remove);


// router.post('/companies', passport.authenticate('jwt', {
//     session: false
// }), CompanyController.create);

// router.get('/companies', passport.authenticate('jwt', {
//     session: false
// }), CompanyController.getAll);

// router.get('/companies/:company_id', passport.authenticate('jwt', {
//     session: false
// }), custom.company, CompanyController.get);

// router.put('/companies/:company_id', passport.authenticate('jwt', {
//     session: false
// }), custom.company, CompanyController.update);

// router.delete('/companies/:company_id', passport.authenticate('jwt', {
//     session: false
// }), custom.company, CompanyController.remove);

router.get('/dash', passport.authenticate('jwt', {
    session: false
}), HomeController.Dashboard);


//********* API DOCUMENTATION **********
router.use('/docs/api.json', express.static(path.join(__dirname, '/../apidoc/api_data.json')));
router.use('/docs', express.static(path.join(__dirname, '/../apidoc')));

module.exports = router;
