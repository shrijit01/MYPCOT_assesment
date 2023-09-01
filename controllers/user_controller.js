const User = require('../models/user');
// const { isAuthenticated } = require('./auth.controller')
/* THIS CONTROLLER WILL HANDLE SIGN IN PAGE */
module.exports.signIn = async function(req,res){
    return res.render("signin",{
        title:"Sign In"
    });
}


module.exports.signUp = async function(req,res){
    return res.render("signup",{
        title:"Sign Up"
    });
}


module.exports.createUser = async function(req, res) {
    try {
        let user = await User.findOne({
            email: req.body.email
        });

        if (!user) {
            let createdUser = await User.create(req.body);
            console.log('createdUser', createdUser);
            return res.redirect('/users/sign-in');
        } else {
            // User with the same email already exists
            return res.status(400).send('User Already Exists'); // Send a 400 status code
        }
    } catch (error) {
        console.error(error, 'error in creating user');

        // Handle specific error cases
        if (error.name === 'ValidationError') {
            // Handle validation error (e.g., required fields missing)
            return res.status(400).send('Validation error: ' + error.message);
        } else {
            // Handle other unexpected errors
            return res.status(500).send('Internal server error');
        }
    }
};


module.exports.createSession = async function(req, res) {
    try {
        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            // User not found
            return res.status(400).send('User not found');
        }

        // Comparing the provided password with the stored password
        if (req.body.password !== user.password) {
            // Incorrect password
            return res.status(400).send('Incorrect password');
        }

        // Successfully authenticated, create session or token
        req.session.user = user; 
        
        return res.redirect('/');
    } catch (error) {
        console.error(error, 'error in creating session');

        // Handle other unexpected errors
        return res.status(500).send('Internal server error');
    }
};


module.exports.destroySession = function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
}