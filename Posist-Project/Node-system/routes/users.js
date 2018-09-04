const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

// Register
router.get('/register', function(req, res) {
    res.render('register');
});

//Login
router.get('/login', function(req, res) {
    res.render('login');
});

// Register user
router.post('/register', function(req, res) {
    var Date = req.body.date;
	var data = req.body.data;
	var nodeNumber = req.body.nodeNumber;
	var nodeId = req.body.nodeId;
    var childNodeId = req.body.childNodeId;
    var childRefId = req.body.childRefId;
    var genesisrefId = req.body.genesisRefId;
    var password = req.body.password;
    
    // Validation
    req.checkBody('Date', 'Date is required').notEmpty();
    req.checkBody('data', 'data is required').notEmpty();
	req.checkBody('nodeNumber', 'nodeNumber is not valid').isEmail();
	req.checkBody('nodeId', 'nodeId is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('childNodeId', 'childNodId do not match').notEmpty();
    req.checkBody('genesisrefId', 'genesisId is required').notEmpty();
    req.checkBody('childrefId', 'childrefId is required').notEmpty();
    
    var errors = req.validationErrors();

    if(errors) {
        res.render('register', {
			errors: errors
		});
    } else {
        var newUser = new User({
            Date: Date,
            data: data,
            nodeNumber: nodeNumber,
            nodeId: nodeId,
            childNodeId: childNodeId,
            genesisrefId: genesisrefId,
            chilrefId: childrefId,
            password: password
        });

        User.createUser(newUser, function (err, user) {
            if (err) throw err;
            console.log(user);
        });
        req.flash('success_msg', 'You are registered and can now login');
        res.redirect('/users/login');
    }
});

passport.use(new LocalStrategy(
	function (Date, password, done) {
		User.getUserByUsername(username, function (err, user) {
			if (err) throw err;
			if (!user) {
				return done(null, false, { message: 'Unknown User' });
			}

			User.comparePassword(password, user.password, function (err, isMatch) {
				if (err) throw err;
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'Invalid password' });
				}
			});
		});
	}));

    
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function (id, done) {
        User.getUserById(id, function (err, user) {
            done(err, user);
        });
    });   
    
router.post('/login',
	passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }),
	function (req, res) {
		res.redirect('/');
    });
    
router.get('/logout', function (req, res) {
    req.logout();
    
    req.flash('success_msg', 'You are logged out');
    
    res.redirect('/users/login');
});

router.get("/get-data",(req,res)=>{
    User.find({},(err,userSchema)=>{
        if(err){
            res.send(err);
        }else{
            res.send(userSchema);
        }
    })
});

module.exports = router;