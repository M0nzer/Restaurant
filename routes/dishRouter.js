const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../modules/dishes');

//Router Def
const dishRouter = express.Router();
//MiddileWares
dishRouter.use(bodyParser.json());
//Router
dishRouter.route('/');
//Main Routes
//http://localhost:3000/deshes
//Route GET /deshes
dishRouter.get('/deshes' , (req , res ,next)=>{
    Dishes.find({})
    .then((dishes)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type' , 'aaplication/json');
        res.json(dishes);
    }, (err)=>next(err))
    .catch((err) =>next(err));
    });

//Route POST /deshes
dishRouter.post('/deshes' , (req , res ,next)=>{
    Dishes.create(req.body)
    .then((dish)=>{
        console.log('dish created:' , dish);
        res.statusCode = 200;
        res.setHeader('Content-Type' , 'aaplication/json');
        res.json(dish);
    }, (err)=>next(err))
    .catch((err) =>next(err));
    });

    //Route PUT /deshes
dishRouter.put('/deshes' , (req , res ,next)=>{
    res.statusCode = 403;
    res.end('Not Supported Here!');
    });

    //Route DELETE /deshes
dishRouter.delete('/deshes' , (req , res ,next)=>{
    Dishes.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type' , 'aaplication/json');
        res.json(resp);
    }, (err)=>next(err))
    .catch((err) =>next(err));
    });

//Route With Params------------------------------------------------------------------
//http://localhost:3000/deshes/deshid

    //Route GET /deshes/:deshid
dishRouter.get('/deshes/:deshid' , (req , res ,next)=>{
    Dishes.findById(req.params.deshid)
    .then((dish)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type' , 'aaplication/json');
        res.json(dish);
    }, (err)=>next(err))
    .catch((err) =>next(err));
    });

//Route POST /deshes/:deshid
dishRouter.post('/deshes/:deshid' , (req , res ,next)=>{
    res.statusCode = 403;
    res.end('Not Supported Here!');
    });

    //Route PUT /deshes/:deshid
dishRouter.put('/deshes/:deshid' , (req , res ,next)=>{
    Dishes.findByIdAndUpdate(req.params.deshid , {
        $set : req.body
    } , {new : true})
    .then((dish)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type' , 'aaplication/json');
        res.json(dish);
    }, (err)=>next(err))
    .catch((err) =>next(err));
    });

    //Route DELETE /deshes/:deshid
dishRouter.delete('/deshes/:deshid' , (req , res ,next)=>{
    Dishes.findByIdAndRemove(req.params.deshid)
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type' , 'aaplication/json');
        res.json(resp);
    }, (err)=>next(err))
    .catch((err) =>next(err));
    });

    module.exports = dishRouter;