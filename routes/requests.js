const router = require('express').Router();
let Request = require('../models/request.model');
const Client = require('../models/user.model').Client;
const Translator= require('../models/user.model').Translator;
// const passport = require("passport");

//show all requests (admin)
router.route('/').get((req, res) => {
  Request.find()
    .then(requests => res.json(requests))
    .catch(err => res.status(400).json('Error: ' + err));
});

//make a request (client)
router.route('/add').post((req, res) => {
  const fromLanguage = req.headers.fromlanguage;
  const toLanguage = req.headers.tolanguage;
  const startDate = new Date(req.headers.startdate);
  const finishDate = new Date(req.headers.finishdate);
  const madeBy = req.headers.madeby;

  const newRequest = new Request({fromLanguage,toLanguage,startDate,finishDate,madeBy});
  newRequest.save()
    .then(() =>  Client.findByIdAndUpdate(req.id, {
        $push:{
          requests: newRequest
        }
      })
    )
    .catch(err => res.status(400).json('Error: ' + err))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.get("/clientRequests/", async (req, res) => {
    try {
      Client.findById(req.id, function(err, foundClient) {
        if (!err){
          if (!foundClient)
            res.status(404).send({
              error: "This profile does not exist"
            });
          else
            res.json({
              msg: "Your profile information",
              data: foundClient.requests
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
      request.fromLanguage = req.body.fromLanguage;
      request.toLanguage = req.body.toLanguage;
      request.date = req.body.date;
      request.duration = req.body.duration;

      request.save()
        .then(() => res.json('Request updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//show my requests (translator) (id for trans)
router.route('/transRequests/').get((req, res) => {
  Translator.findById(req.id).then( translator =>
    (Request.find({assignedTo: translator.username}).then(requests => res.json(requests)).catch(err => res.status(400).json('Error: ' + err))))
    .catch(err => res.status(400).json('Error: ' + err))
});

//show my requests (client) (id for clien)
router.route('/myRequests/').get((req, res) => {
  Client.findOne(req.username)
  .then(client => res.json(client.requests))
  .catch(err => res.status(400).json('Error: ' + err))
});

//delete request
router.route("/delete").post((req,res)=>{
  Request.findByIdAndDelete(req.headers.id)
  .catch(err => res.status(400).json('Error: ' + err))
})

// assign requests (admin) (id for request)
router.route('/assignTranslatorPull/').post((req, res) => {
  Request.findById(req.headers.id).then((request) =>
    Translator.findOneAndUpdate({username: req.headers.username}, {
      $pull:{
        requests: request
      }
  }))
  .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/assignPull/').post((req, res) => {
  Request.findById(req.headers.id).then(request =>
    Client.findOneAndUpdate({username: req.headers.username}, {
    $pull:{
      requests: request
    }
  }))
  .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/assign/').post((req, res) => {
  Request.findByIdAndUpdate(req.headers.id, {assignedTo: req.headers.username},{new: true}).then((request) => 
    Translator.findOneAndUpdate({username: req.headers.username}, {
      $push:{
        requests: request
      }
    })
  )
});
router.route('/assignPush/').post((req, res) => {
  Request.findByIdAndUpdate(req.headers.id, {assignedTo: req.headers.username1},{new: true}).then((request) => 
    Client.findOneAndUpdate({username: req.headers.username}, {
      $push:{
        requests: request
      }
  }))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;