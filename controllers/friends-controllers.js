const { User, Friends, Reactions } = require('../models');

const friendController = {
    
    // add friend
    addFriend({ params, body }, res) {
        console.log(body);
        Friends.create(body)
          .then(({ _id }) => {
            return Thoughts.findOneAndUpdate(
                { _id: params.thoughtsId },
                { $push: { reactions: _id } },
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
    },
  
    // remove friend
    removeFriend({ params }, res) {
        Friends.findOneAndDelete({ _id: params.reactiontId })
          .then(deletedReaction => {
            if (!deletedReaction) {
              return res.status(404).json({ message: 'No reaction with this id!' });
            }
            return Thoughts.findOneAndUpdate(
              { _id: params.thoughtsId },
              { $pull: { reactions: params.reactionId } },
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
  
  module.exports = friendController;