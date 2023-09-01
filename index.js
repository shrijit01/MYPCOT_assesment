const express = require('express')
const path  = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

const expressLayouts = require('express-ejs-layouts');
var db = require('./config/mongoose');

/************ USED FOR SESSION COOKIE *************/
/* REQUIRED EXPRESS SESSION */
const session = require('express-session');

/* REQUIRED PASSPORT  */
const passport = require('passport');

/* REQUIRED PASSPORT LOCAL STRATEGY */
const passportLocal = require('./config/passport-local-strategy');

/* FOR STORING SESSION COOKIE IF SERVER GOT RESTART SESSION COOKIE WILL NOT LOST  */
const MongoStore = require('connect-mongo');


/* USING COOKIE PARSER TO READ DATA */
app.use(express.urlencoded({
    extended:false
}));

/* USING COOKIE PARSER TO READ DATA */
app.use(express.urlencoded({
    extended:false
})); 

/* SETTING UP THE COOKIE PARSER */
app.use(cookieParser());

/* SETTING UP THE EXPRESS LAYOUT MIDDLEWERE  */
app.use(expressLayouts);
//extract style and script from sub page into the layouts
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);
// *****************************************
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// ****************************************
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


/*MONGOSTORE IS USED TO STORE THE SESSION COOKIE IN DB */
/* SETTING UP THE SESSION COOKIE IN CLIENT BROWSER */
app.use(session({
  name:'mypcot_record',
  /* CHANGE THE SEC BEFORE DEPLOYMENT */
  secret:'blahsomething',
  saveUninitialized:false,//IF USER IS NOT LOGGED IN THAT CASE NO NEED TO STORE SESSION COOKIE 
  resave:false,//IF USER IS LOGGED IN IN THAT CASE WE DONT WANT TO CAHNGE THE SESSION COOKIE AGAIN AND AGAIN
  cookie:{
      maxAge:(100*60*100)
  },
  store :new MongoStore (
      {
          mongoUrl: 'mongodb://localhost/mypcot_Records',
          autoRemove:'disable'

      },(function(err){
          console.log(err || "Connect mongodb setup ok");
      })
  )
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


app.use('/', require('./routes'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;
