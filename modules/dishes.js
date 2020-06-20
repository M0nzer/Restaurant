const mongoose = require('mongoose');


const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const commentSchema = new Schema({
    rating : {
        type : Number,
        min : 1,
        max : 5,
        required : true
    },
    comment: {
        type : String,
        required : true
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
},{
    timestamps : true
});

const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default:false      
    },
    comments:[commentSchema]
}, {
    timestamps: true
});

var Dishes = mongoose.model('Dish' , dishSchema);

module.exports = Dishes;



/*
npm WARN deprecated bson@1.0.9: Fixed a critical issue with BSON serialization documented in CVE-2019-2391, see https://bit.ly/2KcpXdo for more details
npm WARN mongoose-currency@0.2.0 requires a peer of mongoose@~> 4.x but none is installed. You must install peer dependencies yourself.

+ mongoose-currency@0.2.0
+ mongoose@5.1.7
added 19 packages from 15 contributors and audited 120 packages in 45.613s
found 6 vulnerabilities "(3 low, 1 moderate, 1 high, 1 critical)" /////IF YOU SEEN THIS *PLEASE* TELL ME WHAT,S WRONG IN THE COMMENT
run `npm audit fix` to fix them, or `npm audit` for details 
*/