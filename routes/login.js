const router = require('express').Router();
const User = require('../models/user.model').User;
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
// const passport = require("passport");
// require("../passport")(passport);
const tokenKey = process.env.secretOrKey;

router.post("/", async (req, res) => {
  try {
    const user = await User.find({
      username: req.body.username
    });
    User.findById(user, function(err, foundUser) {
      if (!err)
        if (!foundUser)
          res.status(404).json({
            error: "Invalid username"
          });
        else if (bcrypt.compareSync(req.body.password, foundUser.password))
          res.json({
            data: {
              token: `Bearer ${jwt.sign({ _id: foundUser._id }, tokenKey, {
                expiresIn: "6h"
              })}`,
              user: foundUser
            }
          });
        else
          res.status(400).send({
            error: "Wrong password"
          });
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
});

 module.exports = router;


 