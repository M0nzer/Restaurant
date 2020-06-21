const express = require('express');
const bodyParser = require('body-parser');
const Promotions = require('../modules/promotions');
var authenticate = require('../authenticate');
//Router Def
const promoRouter = express.Router();
//MiddileWares
promoRouter.use(bodyParser.json());
//Router
promoRouter.route('/');
//Main Routes
//http://localhost:3000/promotions
//Route GET /promotions
promoRouter.get('/promotions' , (req , res ,next)=>{
Promotions.find({})
.then((promotions)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type' , 'application/json');
    res.json(promotions);
}, (err)=>next(err))
.catch((err) =>next(err));
    });

//Route POST /promotions
promoRouter.post('/promotions',authenticate.verifyUser, authenticate.verifyAdmin , (req , res ,next)=>{
    Promotions.create(req.body)
    .then((Promo)=>{
        console.log('You Created:' , Promo);
        res.statusCode = 200;
        res.setHeader('Content-Type' , 'aaplication/json');
        res.json(Promo);
    }, (err)=>next(err))
    .catch((err) =>next(err));
    });

    //Route PUT /promotions
promoRouter.put('/promotions',authenticate.verifyUser, authenticate.verifyAdmin , (req , res ,next)=>{
    res.statusCode = 403;
    res.end('Not Supported Here!');
    });

    //Route DELETE /promotions
promoRouter.delete('/promotions',authenticate.verifyUser , authenticate.verifyAdmin, (req , res ,next)=>{
    Promotions.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type' , 'aaplication/json');
        res.json(resp);
    }, (err)=>next(err))
    .catch((err) =>next(err));
    });

//Route With Params------------------------------------------------------------------
//http://localhost:3000/promotions/:promoid

    //Route GET /promotions/:promoid
promoRouter.get('/promotions/:promoid' , (req , res ,next)=>{
    Promotions.findById(req.params.promoid)
    .then((resp) =>{
        res.status = 200;
        res.setHeader('Content-Type' , 'appliction/json');
        res.json(resp);
    }).catch((err)=>next(err));
    });

//Route POST /promotions/:promoid
promoRouter.post('/promotions/:promoid',authenticate.verifyUser, authenticate.verifyAdmin , (req , res ,next)=>{
    res.statusCode = 403;
    res.end('Not Supported Here!');
    });

    //Route PUT /promotions/:promoid
promoRouter.put('/promotions/:promoid',authenticate.verifyUser, authenticate.verifyAdmin , (req , res ,next)=>{
    Promotions.findByIdAndUpdate(req.params.promoid , {
        $set : req.body
    } , {new : true})
    .then((promo)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'aaplication/json');
        res.json(promo);
    }, (err)=>next(err))
    .catch((err) =>next(err));
    });

    //Route DELETE /promotions/:promoid
promoRouter.delete('/promotions/:promoid', authenticate.verifyAdmin, (req , res ,next)=>{
    Promotions.findByIdAndRemove(req.params.promoid)
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type' , 'aaplication/json');
        res.json(resp);
    }, (err)=>next(err))
    .catch((err) =>next(err));
    });

    module.exports = promoRouter;