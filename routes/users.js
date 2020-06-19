var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var User = require('../modules/user');
var authenticate = require('../authenticate');
var router = express.Router();

router.use(bodyParser.json());


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Route POST /signup
router.post('/signup' , (req ,res ,next)=>{
  User.register(new User({username : req.body.username}),
   req.body.password, (err , user) =>{
    if (err){
      res.statusCode = 500;
      res.setHeader('Content-Type' , 'application/json');
      res.json({err : err});
    }else{
          passport.authenticate('local')(req , res ,()=>{
            res.statusCode = 200;
            res.setHeader('Content-Type' , 'application/json');
            res.json({success : true ,status : 'Registration Successful!'});
        });
      }
  });
});

//Route POST /login
router.post('/login',passport.authenticate('local') ,(req ,res ,next) =>{
var Token = authenticate.getToken({_id : req.user._id})

  res.statusCode = 200;
  res.setHeader('Content-Type' , 'application/json');
  res.json({success : true,Token : Token ,status : 'Login Successful!'});
});

//Route GET /logout
router.get('/logout' , (req , res)=>{
  if (req.session){
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

module.exports = router;
