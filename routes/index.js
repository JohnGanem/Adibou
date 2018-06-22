var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {'title': 'Accueil'});
});

router.get('/sign-up', function (req, res, next) {
    res.render('sign-up', {'title': 'Inscription'});
});

router.get('/log-in', function (req, res, next) {
    res.render('log-in', {'title': 'Connexion'});
});

router.get('/recyclage', function (req, res, next) {
    res.render('recyclage', {'title': 'Recyclage'});
});


//POST route for updating data
router.post('/', function (req, res, next) {
    if (req.body.email && req.body.username && req.body.password && req.body.passwordConf) {
        // confirm that user typed same password twice
        if (req.body.password !== req.body.passwordConf) {
            var err = new Error('Passwords do not match.');
            err.status = 400;
            res.send("passwords dont match");
            return next(err);
        }
        
        var userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }

        User.create(userData, function (error, user) {
            if (error) {
                return next(error);
            } else {
                req.session.userId = user._id;
                return res.redirect('/user');
            }
        });

    } else if (req.body.logemail && req.body.logpassword) {
        User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
            if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.redirect('/user');
            }
        });
    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
})

// GET route after registering
router.get('/user', function (req, res, next) {
    User.findById(req.session.userId)
            .exec(function (error, user) {
                if (error) {
                    return next(error);
                } else {
                    if (user === null) {
                        var err = new Error('Not authorized! Go back!');
                        err.status = 400;
                        return next(err);
                    } else {
                        return next();                    }
                }
            });
});
router.get('/user', function (req, res, next) {
    User.findById(req.session.userId)
        .exec(function (error, user) {
    res.render('user', {'title': 'Home', 'name': user.username});
        });
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

module.exports = router;
