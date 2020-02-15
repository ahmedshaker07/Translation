const router = require('express').Router();
let Request = require('../models/request.model');

//show all requests (admin)
router.route('/').get((req, res) => {
  Request.find()
    .then(requests => res.json(requests))
    .catch(err => res.status(400).json('Error: ' + err));
});

//show my requests (translator)
router.route('/transRequests').get((req, res) => {
  Request.find({assignedTo:'mohamedahmed'})
    .then(requests => res.json(requests))
    .catch(err => res.status(400).json('Error: ' + err));
});

//make a request (client)
router.route('/add').post((req, res) => {

  const owner = req.body.owner;
  const fromLanguage = req.body.fromLanguage;
  const toLanguage = req.body.toLanguage;

  const newRequest = new Request({owner,fromLanguage,toLanguage});

  newRequest.save()
    .then(() => res.json('Request added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//show my requests (client)
router.route('/myRequests').get((req, res) => {
  Request.find({owner:'ahmedhossam'})
    .then(requests => res.json(requests))
    .catch(err => res.status(400).json('Error: ' + err));
});

//delete a request (client and admin)
router.route('/:id').delete((req, res) => {
  Request.findByIdAndDelete(req.params.id)
    .then(() => res.json('Request Canceled'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//modify a request (client)
router.route('/update/:id').post((req, res) => {
  Request.findById(req.params.id)
    .then(request => {
      request.owner = req.body.owner;
      request.fromLanguage = req.body.fromLanguage;
      request.toLanguage = req.body.toLanguage;

      request.save()
        .then(() => res.json('Request updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;