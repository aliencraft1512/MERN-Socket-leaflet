const router = require("express").Router();
const User = require('../models/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require("./verifyToken");

router.route('/register').post(async(req,res)=>{
  
  const {error} = registerValidation(req.body);
  if(error) res.send(error.details[0].message);

  const emailExist = await User.findOne({email: req.body.email});
  if(emailExist) return res.status(400).send("Email already exists")

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password,salt);

  const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword
      });
    newUser.save()
    .then(() => res.json(newUser))
    .catch(err => res.status(400).json('Error: ' + err));
    
});

router.route('/login').post(async(req,res)=>{
  
  const {error} = loginValidation(req.body);
  if(error) res.send(error.details[0].message);

  const userExist = await User.findOne({email: req.body.email});
  if(!userExist) return res.status(400).send("Email is wrong")

  const validPass = await bcrypt.compare(req.body.password, userExist.password);
  if(!validPass) return res.status(400).send("Invalid password");

  const token = userExist.generateAuthToken();
  res.header('x-auth-token',token).send({token});  
})

router.get('/me', verify, async (req, res) => {
  const userData = await User.findById(req.user._id).select('-password');
  res.send(userData);
});



module.exports = router;