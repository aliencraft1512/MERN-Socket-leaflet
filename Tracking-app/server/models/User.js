const mongoose = require("mongoose");
require('dotenv').config();
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username : {type : String, required : true, min:6, max:255},
        email : {type : String, required : true, min:6, max:255},
        password : {type : String, required : true, min:6, max:1024},
    },
    {
    timestamps: true,
    });

    userSchema.methods.generateAuthToken = function() { 
        const token = jwt.sign({ _id: this._id}, process.env.TOKEN_SECRET);
        return token;
      }
const User = mongoose.model('User', userSchema);

module.exports = User;