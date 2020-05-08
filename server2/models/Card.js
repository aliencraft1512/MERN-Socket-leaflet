const mongoose = require("mongoose");
require('dotenv').config();
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const cardSchema = new Schema(
    {
        name : {type : String, required : true, min:6, max:255},
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
          }
    },
    {
    timestamps: true,
    });

   
const Card = mongoose.model('Card', cardSchema);

module.exports = Card;