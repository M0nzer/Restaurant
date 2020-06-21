var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var User = require('../modules/user');
var authenticate = require('../authenticate');
var router = express.Router();

router.use(bodyParser.json());


//Route GET /users
router.get('/', authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next)=> {
  User.find({}).then((users) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(users);
  },(err) => next(err))
  .catch((err) => next(err));
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
      if(req.body.firstname)
      user.firstname = req.body.firstname;
      if (req.body.lastname)
      user.lastname = req.body.lastname;
      user.save((err , user) =>{
        if (err){
          res.statusCode = 500;
          res.setHeader('Content-Type' , 'application/json');
          res.json({err : err});
          return ;
        }
        passport.authenticate('local')(req , res ,()=>{
          res.statusCode = 200;
          res.setHeader('Content-Type' , 'application/json');
          res.json({success : true ,status : 'Registration Successful!'});
      });
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
router.get('/logout' , (req , res , next)=>{
  if (req.session){
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    return next(err);
  }
});

module.exports = router;
