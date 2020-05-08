const router = require("express").Router();
let Coordinate = require('../models/Coordinate');
const Card = require('../models/Card');



router.route('/save').post((req, res) => {
    const lat = req.body.lat;
    const lng = req.body.lng;
    const card = req.body.card_id;
    const newCoordiante = new Coordinate({
        lat,
        lng,
        card
    });
  
    newCoordiante.save()
    .then(() => res.json(newCoordiante))
    .catch(err => res.status(400).json('Error: ' + err));
    console.log(req.body)
  });
  router.get('/getCard/:id',async(req, res) => {
    
    Card.findById(req.params.id)
    .then((card) => res.json(card))
    .catch(err => res.status(400).json('Error: ' + err));
    
  });


  module.exports = router;