const router = require("express").Router();
const Card = require('../models/Card');
const verify = require("./verifyToken");
const User = require('../models/User');

router.post('/save',verify,async(req,res)=>{
   
    const newCard = new Card({
          name:req.body.name,
          user:req.user._id,
        });
        newCard.save()
        .then(() => res.json(newCard))
        .catch(err => res.status(400).json('Error: ' + err));

  });
  router.get('/getCards',verify,async(req,res)=>{
   Card.find({user: req.user._id})
   .then(cards => res.json(cards))
      .catch(err => res.status(400).json('Error: ' + err));

  });
  router.delete('/delete/:id',verify,(req, res) => {
    Card.findByIdAndDelete(req.params.id)
      .then(() => res.json('Card deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });  
  router.put('/update/:id',verify,(req, res) => {
    Card.findById(req.params.id)
      .then(card => {
        card.name = req.body.name;
        card.user = req.user._id;

        card.save()
          .then(() => res.json(card))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  module.exports = router;