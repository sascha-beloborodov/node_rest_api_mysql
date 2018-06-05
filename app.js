//instantiate configuration variables
require('./config/config'); 
require('./config/auth'); 
//instantiate global functions
require('./global_functions'); 

console.log('Environment:', CONFIG.app);

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');

const v1 = require('./routes/v1');

const app = express();

app.use(logger('dev'));
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

//Passport
app.use(passport.initialize());

//DATABASE
const models = require('./models');
models.sequelize.authenticate().then(() => {
    console.log('Connected to SQL database:', CONFIG.db_name);
})
    .catch(err => {
        console.error('Unable to connect to SQL database:', CONFIG.db_name, err);
    });

if (CONFIG.app === 'dev') {
    // models.sequelize.sync(); //creates table if they do not already exist
    models.sequelize.sync({ force: true });//deletes all tables then recreates them useful for testing and development purposes
}
// CORS
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});


require('./middleware/passportfb')(passport);
require('./middleware/passportgoogle')(passport);

app.get('/auth/facebook', passport.authenticate('facebook', { 
    scope : ['public_profile', 'email']
}));

// handle the callback after facebook has authenticated the user
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        session: false,
        failureRedirect : '/'
    }), async (req, res, done) => {
        if (!req.user) {
            return ReE(res, 'Cannot authenticate through Facebook');
        }
        return ReS(res, {
            user: req.user.toWeb(),
            token: req.user.getJWT()
        }, 201);
    }
);

app.get('/auth/google', passport.authenticate('google', { 
    scope : ['profile', 'email']
}));

// handle the callback after facebook has authenticated the user
app.get('/auth/google/callback',
    passport.authenticate('google', {
        session: false,
        failureRedirect : '/'
    }), async (req, res, done) => {
        if (!req.user) {
            return ReE(res, 'Cannot authenticate through google');
        }
        return ReS(res, {
            user: req.user.toWeb(),
            token: req.user.getJWT()
        }, 201);
    }
);

app.get('/', function (req, res) {
    res.statusCode = 200; //send the appropriate status code
    res.json({
        status: 'success',
        message: 'Stiqet',
        data: {}
    });
});

app.use('/v1', v1);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // todo logs
    // set locals, only providing error in development
    res.locals.message = err.message;
    const eee = req.app.get('env');
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json( { status: err.status });
    // res.render('error');
});

module.exports = app;