var express = require('express');
var router = express.Router();

const passport = require('passport');//fetched existing instance
const usersController = require("../controllers/user_controller");

router.get('/sign-in',usersController.signIn);
router.get('/sign-up',usersController.signUp);
router.post('/create',usersController.createUser);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'users/sign-in'}
),usersController.createSession);
router.get('/sign-out',usersController.destroySession);


module.exports = router;