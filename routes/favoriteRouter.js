const favRouter = require('express').Router();
var Favorites = require('../modules/favorite');
var authenticate = require('../authenticate');
const bodyParser = require('body-parser');
favRouter.route('/');

//MiddileWares
favRouter.use(bodyParser.json());

//Route GET /favorite
//Desc: Get The User Favorite Document
favRouter.get('/favorite', authenticate.verifyUser , (req , res , next) =>{
  Favorites.findOne({ user: req.user._id })
  .populate("user dishes")
  .then(
    favorites => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(favorites);
    },
    err => next(err)
  )
  .catch(err => next(err));
});

//Route POST /favorite
//Desc: Post a favorite,s dishes
favRouter.post('/favorite' , authenticate.verifyUser , (req , res ,next) =>{
  Favorites.findOne({ user: req.user._id })
  .then((favorite) => {
    if (favorite) {
      req.body.map(favoriteDish => {
        if (favorite.dishes.indexOf(favoriteDish._id) == -1) {
          favorite.dishes.push({ _id: favoriteDish._id });
        }
      });
      favorite.save()
      .then((updatedFavorite) => {
        Favorites.findById(updatedFavorite._id)
          .populate("user dishes")
          .then((updatedFavorite) => {
              res.status = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(updatedFavorite);
            },
            err => next(err)
          )
          .catch(err => next(err));
      });
    } else if (!favorite) {
      let newFavorite = new Object({
        user: req.user._id
      });
      req.body.map(favoriteDish => {
        if (favorite.dishes.indexOf(favoriteDish._id) == -1) {
          newFavorite.dishes.push({ _id: favoriteDish._id });
        }
      });
      favorite.save()
      .then((newFavorite) => {
        Favorites.findById(newFavorite._id)
          .populate("user dishes")
          .then((newFavorite) => {
              res.status = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(newFavorite);
            },(err) => next(err))
          .catch(err => next(err));
      });
    }
  });
    });


    //Route DELETE /favorite
    //Desc : Delete All The Documents
    favRouter.delete('/favorite' , authenticate.verifyUser , (req,res,next)=>{
      Favorites.findOne({ user: req.user._id })
      .then((favorite) => {
        if (favorite) {
          favorite.dishes = [];
          favorite.save()
          .then((updatedFavorite) => {
                res.status = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(updatedFavorite);
              },(err) => next(err))
            .catch((err) => next(err));
        } else if (!favorite) {
          const err = new Error("there is no dishes in your list");
          err.status = 403;
          return next(err);
        }
      });
    });

    //Route GET 
    favRouter.get('/favorite/:dishid' , authenticate.verifyUser , (req,res,next)=>{
        Favorite.findOne({ user: req.user._id })
        .then((favorite) => {
    if (!favorite) {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              return res.json({favorites: favorite });
    } else {
        if (favorite.dishes.indexOf(req.params.dishId) < 0) {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                return res.json({favorites: favorite });
        } else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
        return res.json({favorites: favorite });
        }
    }
          },(err) => next(err))
        .catch((err) => next(err));
    });
    //Route POST 
    favRouter.post('/favorite/:dishid' , authenticate.verifyUser , (req,res,next)=>{
      Favorites.findOne({ user: req.user._id })
      .then((favorite) => {
        if (favorite) {
          if (favorite.dishes.indexOf(req.params.dishId) == -1) {
            favorite.dishes.push({ _id: req.params.dishId });
            favorite.save()
            .then((updatedFavorite) => {
              Favorites.findById(updatedFavorite._id)
                .populate("user dishes")
                .then((updatedFavorite) => {
                    res.status = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(updatedFavorite);
                  },(err) => next(err))
                  .catch((err) => next(err));
            });
          } else {
            const err = new Error("This dish is already added to your favorite list");
            err.status = 403;
            return next(err);
          }
        } else if (!favorite) {
          let newFavorite = new Object({
            user: req.user._id,
            dishes: [{ _id: req.params.dishId }]
          });
          Favorites.create(newFavorite)
          .then((newFavorite) => {
            Favorites.findById(newFavorite._id)
              .populate("user dishes")
              .then((newFavorite) => {
                  res.status = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json(newFavorite);
                },(err) => next(err))
              .catch((err) => next(err));
          });
        }
      });
    });


       //Route DELETE 
    favRouter.delete('/favorite/:dishid' , authenticate.verifyUser , (req,res,next)=>{
      Favorites.findOne({ user: req.user._id })
      .then((favorite) => {
        let index = favorite.dishes.indexOf(req.params.dishId);
        if (index != -1) {
          favorite.dishes.splice(index, 1);
          favorite.save()
          .then((updatedFavorite) => {
            Favorites.findById(updatedFavorite._id)
              .populate("user dishes")
              .then((updatedFavorite) => {
                  res.status = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json(updatedFavorite);
                },(err) => next(err))
                .catch((err) => next(err));
          });
        } else {
          const err = new Error("Selected dish is not your favorite dish, request aborted");
          err.status = 403;
          return next(err);
        }
      });
    });
module.exports = favRouter;