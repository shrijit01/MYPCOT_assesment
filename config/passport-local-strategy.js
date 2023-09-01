/* REQUIRED PASSPORT */
const   passport = require('passport');

/* REQUIRED PASSPORT LOCAL STRATEGY */
const LocalStrategy = require('passport-local').Strategy;

/* REQUIRE USER FOR USING THERE DETAIL */
const User = require('../models/user');

/* USING THE LOCAL STRATEGY TO AUTHENTICATE USER USING PASSPORT */
passport.use(new LocalStrategy({// TELLING PASSPORT TO USE LOCAL STRATEGY
        usernameField:'email'//USER NAME FIELD
    },
    async function(email,password,done){
        /* FIND THE USER AND ESTABLISH A IDENTITY */
        const foundUser = await User.findOne({email:email})
            if(!foundUser){
                console.log('Error in finding user');
                return done(Error);
            }
            if(!foundUser || foundUser.password != password){
                console.log('Invalid Username/Password');
                /* THERE IS NO ERROR BUT USER IS NOT FOUND THATS WHY SECOND PARAM IS FALSE */
                return done(null,false)
            }
            return done(null,foundUser);
        
    }
));



/* SERIALIZING THE USER TO DECIDE WHICH KEY IS TO BE KEPT IN THE COOKIE */
passport.serializeUser(function(user,done){//SETTING USER ID TO THE COOKIE AND SERIALIZING THE USER
    done(null,user.id);
});



/* DESERIALIZING THE USER FROM THE KEY IN THE COOKIES */
passport.deserializeUser( async function(id,done){//REMOVING  USER ID FROM THE COOKIE AND DESERIALIZING THE USER
    let foundUserById = await User.findById(id);
        if(!foundUserById){
            console.log('Error in finding user --> passport');
            return done(err);
        }
        return done(null,foundUserById);
});


/* CHECK IF THE USER IS AUTHENTICATED */
passport.checkAuthentication = function(req,res,next){
     /* IF THE USER IS  SIGNES IN PASSED TO THE NEXT FUNCTION */
    if(req.isAuthenticated()){
        res.locals.user = req.user;
        return next();
    }
    /* IF THE USER IS NOT SIGNES IN */
    return res.redirect('users/sign-in');
}



passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //  REQ.USER ISCONTAIN THE CURRENT SESSION COOKIE USER INFORMATION AND WE ARE SENDING IT LOCAL
        // FOR THE VIEWS 
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;