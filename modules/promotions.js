const mongoose = require('mongoose');

const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const promoSchema = new Schema({
 name : {
     type : String,
     required : true
 },
  image : {
      type : String,
      required : true
  },
   label : {
       type : String,
       default : ""
   },
   price :{
       type : Currency,
       required : true
   },
   description : {
       type : String,
       required : true
   },
   featured : {
       type : Boolean,
       default : false
   }
});

const Promotions = mongoose.model('Promo' , promoSchema);

module.exports = Promotions;


/*
{
      "name": "Weekend Grand Buffet",
      "image": "images/buffet.png",
      "label": "New",
      "price": "19.99",
      "description": "Featuring . . .",
      "featured": false
}
*/