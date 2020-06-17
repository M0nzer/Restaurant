const express = require('express');
const bodyParser = require('body-parser');

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
//Routes With Comments---------------------------------------------------------

//http://localhost:3000/deshes/:deshid/comments
//Route GET /deshes/:deshid/comments
dishRouter.get('/deshes/:deshid/comments' , (req , res ,next)=>{
    Dishes.findById(req.params.deshid)
    .then((dish)=>{
        if (dish != null){
            res.statusCode = 200;
            res.setHeader('Content-Type' , 'aaplication/json');
            res.json(dish.comments);
        }else{
            err = new Error('Dish :' + req.params.deshid + 'Not Found!');
            err.status = 404;
            return next(err);
        }
    }, (err)=>next(err))
    .catch((err) =>next(err));
    });

//Route POST /deshes/:deshid/comments
dishRouter.post('/deshes/:deshid/comments' , (req , res ,next)=>{
    Dishes.findById(req.params.deshid)
    .then((dish) => {
        if (dish != null) {
            dish.comments.push(req.body);
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);                
            }, (err) => next(err));
        }
        else {
            err = new Error('Dish ' + req.params.deshid + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
    });

    //Route PUT /deshes/:deshid/comments
dishRouter.put('/deshes/:deshid/comments' , (req , res ,next)=>{
    res.statusCode = 403;
    res.end('Not Supported Here!');
    });

    //Route DELETE /deshes/:deshid/comments
dishRouter.delete('/deshes/:deshid/comments' , (req , res ,next)=>{
    Dishes.findById(req.params.deshid)
    .then((dish)=>{
        if (dish != null){
            for (var i = (dish.comments.length -1) ; i >=0 ; i--){
                dish.comments.id(dish.comments[i]._id).remove();
            }
                dish.save()
            .then((dish)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type' , 'application/json');
                res.json(dish);
            }, (err)=>next(err));
        }else{
            err = new Error('Dish :' + req.params.deshid + 'Not Found!');
            err.status = 404;
            return next(err);
        }
    }, (err)=>next(err))
    .catch((err) =>next(err));
    });

//Route With Params------------------------------------------------------------------
//http://localhost:3000/deshes/:deshid/comments/:commentid

    //Route GET /deshes/:deshid/comments/:commentid
dishRouter.get('/deshes/:deshid/comments/:commentid' , (req , res ,next)=>{
    Dishes.findById(req.params.deshid)
    .then((dish)=>{
        if (dish != null && dish.comments.id(req.params.commentid) != null){
            res.statusCode = 200;
            res.setHeader('Content-Type' , 'application/json');
            res.json(dish.comments.id(req.params.commentid));
        }else if (dish == null){
            err = new Error('Dish :' + req.params.deshid + 'Not Found!');
            err.status = 404;
            return next(err);
        }else{
            err = new Error('Comment:' + req.params.commentid + 'Not Found!');
            err.status = 404;
            return next(err);
        }
    }, (err)=>next(err))
    .catch((err) =>next(err));
    });

//Route POST /deshes/:deshid/comments/:commentid
dishRouter.post('/deshes/:deshid/comments/:commentid' , (req , res ,next)=>{
    res.statusCode = 403;
    res.end('Not Supported Here!');
    });

    //Route PUT /deshes/:deshid/comments/:commentid
dishRouter.put('/deshes/:deshid/comments/:commentid' , (req , res ,next)=>{
    Dishes.findById(req.params.deshid)
    .then((dish)=>{
        if (dish != null && dish.comments.id(req.params.commentid) != null){
            if (req.body.rating){
                dish.comments.id(req.params.commentid).rating = req.body.rating;
            }
            if (req.body.comment){
                dish.comments.id(req.params.commentid).comment = req.body.comment;
            }
            dish.save()
            .then((dish)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type' , 'application/json');
                res.json(dish);
            }, (err)=>next(err));
        }else if (dish == null){
            err = new Error('Dish :' + req.params.deshid + 'Not Found!');
            err.status = 404;
            return next(err);
        }else{
            err = new Error('Comment:' + req.params.commentid + 'Not Found!');
            err.status = 404;
            return next(err);
        }
    }, (err)=>next(err))
    .catch((err) =>next(err));
    });

    //Route DELETE /deshes/:deshid/comments/:commentid
dishRouter.delete('/deshes/:deshid/comments/:commentid' , (req , res ,next)=>{
    Dishes.findById(req.params.deshid)
    .then((dish)=>{
        if (dish != null && dish.comments.id(req.params.commentid) != null){
                dish.comments.id(req.params.commentid).remove();
                dish.save()
            .then((dish)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type' , 'application/json');
                res.json(dish);
            }, (err)=>next(err));
        }else if (dish == null){
            err = new Error('Dish :' + req.params.deshid + 'Not Found!');
            err.status = 404;
            return next(err);
        }else{
            err = new Error('Comment:' + req.params.commentid + 'Not Found!');
            err.status = 404;
            return next(err);
        }
    }, (err)=>next(err))
    .catch((err) =>next(err));
    });


    module.exports = dishRouter;