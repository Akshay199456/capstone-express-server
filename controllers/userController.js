const express = require('express');
const router  = express.Router();

const User = require("../models/user");

// USER INDEX
router.get('/', (req, res) => {
  User.find({}, (err, allUsers) => {
    if (err) res.json(err);
    res.json(allUsers);
  });
});

// Find user/users by username
router.get('/findUser/:name', (req, res) => {
  console.log('Username to be searched: ', req.params.name);
  User.find({username: req.params.name}, (err, foundUser) => {
    if (err) {
      res.status(400).json(err);
    }

    else{
      console.log("User found: ", foundUser);
      res.status(200).json({
        success: 'Users found!',
        user: foundUser
      });
    }
  });
});

//Find user by id
router.get('/show/:id', async (req, res) => {
  console.log('User with id: ', req.params.id);
  try{
    const foundUser = await User.findById(req.params.id);
    res.status(200).json({
      success: 'User found with the id',
      user: foundUser 
    });
  }

  catch(err){
    res.status(400).json({
      error: err
    });
  }
});




// USER UPDATE
router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedUser) => {
    if (err) res.json(err);
    res.json(updatedUser);
  });
});

// USER DESTROY
router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
    console.log("Deleted user: ", deletedUser);
    if (err) {
      res.status(400).json(err);
    }
    else{
      res.status(200).json({
        success: 'User was removed',
        user: deletedUser
      }
      );
    }
  });
});







module.exports = router; 