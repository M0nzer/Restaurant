const express = require('express');
const bodyParser = require('body-parser');
const Leaders = require('../modules/leaders');
//Router Def
const leaderRouter = express.Router();
//MiddileWares
leaderRouter.use(bodyParser.json());
//Router
leaderRouter.route('/');
//Main Routes
//http://localhost:3000/leaders
//Route GET /leaders
leaderRouter.get('/leaders' , (req , res ,next)=>{
    Leaders.find({})
    .then((leaders)=>{
        res.status = 200;
        res.setHeader('Content-Type' , 'appliction/json');
        res.json(leaders);
    } , (err)=>next(err))
    .catch((err)=>next(err));
    });

//Route POST /leaders
leaderRouter.post('/leaders' , (req , res ,next)=>{
    Leaders.create(req.body)
    .then((Leader)=>{
        console.log('You Created : ' , Leader);
        res.status = 200;
        res.setHeader('Content-Type' , 'appliction/json');
        res.json(Leader);
    }, (err)=>next(err))
    .catch((err)=>next(err));
    });

    //Route PUT /leaders
leaderRouter.put('/leaders' , (req , res ,next)=>{
    res.statusCode = 403;
    res.end('Not Supported Here!');
    });

    //Route DELETE /leaders
leaderRouter.delete('/leaders' , (req , res ,next)=>{
    Leaders.remove({})
    .then((resp)=>{
        res.status = 200;
        res.setHeader('Content-type' , 'appliction/json');
        res.json(resp);
    })
    .catch((err)=>next(err));
    });

//Route With Params------------------------------------------------------------------
//http://localhost:3000/leaders/:leaderId

    //Route GET /leaders/:leaderid
leaderRouter.get('/leaders/:leaderid' , (req , res ,next)=>{
    Leaders.findById(req.params.leaderid)
    .then((resp) =>{
        res.status = 200;
        res.setHeader('Content-Type' , 'appliction/json');
        res.json(resp);
    }).catch((err)=>next(err));
    });

//Route POST /leaders/:leaderid
leaderRouter.post('/leaders/:leaderid' , (req , res ,next)=>{
    res.statusCode = 403;
    res.end('Not Supported Here!');
    });

    //Route PUT /;leaders/:leaderid
leaderRouter.put('/leaders/:leaderid' , (req , res ,next)=>{
    Leaders.findByIdAndUpdate(req.params.leaderid , {
        $set : req.body
    } , {new : true})
    .then((leader)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type' , 'aaplication/json');
        res.json(leader);
    }, (err)=>next(err))
    .catch((err) =>next(err));
    });

    //Route DELETE /leaders/:leaderid
leaderRouter.delete('/leaders/:leaderid' , (req , res ,next)=>{
    Leaders.findByIdAndRemove(req.params.leaderid)
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type' , 'aaplication/json');
        res.json(resp);
    }, (err)=>next(err))
    .catch((err) =>next(err));
    });

    module.exports = leaderRouter;