const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const coordinateSchema = new Schema(
    {
        lat : {type : String, required : true},
        lng : {type : String, required : true},
        card: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Card' 
          }
    },
    {
    timestamps: true,
    });
const Coordinate = mongoose.model('Coordinate', coordinateSchema);

module.exports = Coordinate;