const { User, Friends, Thoughts, Reaction } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
          .then(dbUsersData => res.json(dbUsersData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },
  
      getUserById({ params }, res) {
        User.findOne({ _id: params.id })
          .then(dbUserData => {
            // If no Thoughts is found, send 404
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },
      createUser({ body }, res) {
        User.create(body)
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.status(400).json(err));
      },

  //PUT by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbUserData => {
          if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
          }
          res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

//DELETE by id
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
          if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
          }
          res.json(true); //or `true` bc theres no doc remainig
      })
      .catch(err => res.status(400).json(err));
  },
  removeThoughts({ params }, res) {
    User.deleteMany({ _id: params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thoughts with this user' });
        }
        return User.findOneAndUpdate(
          { _id: params.thoughtsId },
          { $pull: { thougths: params.thoughtId } },
          { new: true }
        );
      })
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No thoughts found with this id!' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => res.json(err));
  }
  
  };
  
  module.exports = userController;