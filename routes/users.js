const router = require('express').Router();
let User = require('../models/user.model');

//get all users
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
}); 

//get all translators
router.route('/translators').get((req, res) => {
  User.find({type:'translator'})
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
}); 

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const type = req.body.type;

  const newUser = new User({username,password,type});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;