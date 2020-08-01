const router = require('express').Router();
const User = require('../models/user.model').User;
const Admin = require('../models/user.model').Admin;
const Client = require('../models/user.model').Client;
const Translator = require('../models/user.model').Translator;
const bcrypt = require('bcrypt');
// const passport = require("passport");

//registering as an admin
router.route('/admin/register').post(
  async (req, res) => {
    try{
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const username = req.body.username;
      const password = hashedPassword;
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const newAdmin= new Admin({
          username,
          password,
          firstName,
          lastName
      });
      newAdmin.save()
      .then(()=> res.json('Admin created'))
      .catch(err => res.status(400).json('error:' + err));
    }
    catch{
      res.status(500).send()
    }
  }
);

//registering as a client
router.route('/client/register').post(
  async (req, res) => {
    try{
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const username = req.body.username;
      const password = hashedPassword;
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const newClient= new Client({
          username,
          password,
          firstName,
          lastName
      });
      newClient.save()
      .then(()=> res.json('Client created'))
      .catch(err => res.status(400).json('error:' + err));
    }
    catch{
      res.status(500).send()
    }
  }
);

//registering as a translator
router.route('/translator/register').post(
  async (req, res) => {
    try{
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const username = req.body.username;
      const password = hashedPassword;
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const newTranslator= new Translator({
          username,
          password,
          firstName,
          lastName
      });
      newTranslator.save()
      .then(()=> res.json('Translator created'))
      .catch(err => res.status(400).json('error:' + err));
    }
    catch{
      res.status(500).send()
    }
  }
);

//view my profile by my id
router.get("/",
// passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      User.findById(req.id, function(err, foundUser) {
        if (!err){
          if (!foundUser)
            res.status(404).send({
              error: "This profile does not exist"
            });
          else
            res.json({
              msg: "Your profile information",
              data: foundUser
            });
        }
        else
          res.json({
            error: err.message
          });
      });
    } catch (error) {
      res.json({
        error: error.message
      });
    }
  }
);
//get all users
router.route('/show-all').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// show all translators
router.route('/translators').get((req, res) => {
  Translator.find()
    .then(translators => res.json(translators))
    .catch(err => res.status(400).json('Error: ' + err));
});

//updating translators blocked dates
router.route('/blockedDates/').post((req, res) => {
  var x = req.headers.array.split(',')
  if(req.headers.array.length===0)
    x=[]
  Translator.findByIdAndUpdate(req.id, {blockedDates: x}).then(() => res.json("translator blocked dates updated"))
  .catch(err => res.status(400).json('Error: ' + err));
});

//updating translators holidays
router.route('/blockedDays/').post((req, res) => {
  var x = req.headers.array.split(',')
  if(req.headers.array.length===0)
    x=[]
  Translator.findByIdAndUpdate(req.id, {blockedDays: x}).then(() => res.json("translator blocked days updated"))
  .catch(err => res.status(400).json('Error: ' + err));
});

//show my holidays
router.route('/getTranslator/').get((req, res) => {
  Translator.findById(req.id).then(translator => res.json(translator))
  .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/setLanguages/').post((req, res) => {
  var x = req.headers.array.split(',')
  if(req.headers.array.length===0)
    x=[]
  Translator.findByIdAndUpdate(req.id, {languages: x}).then(() => res.json("translator languages updated"))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;