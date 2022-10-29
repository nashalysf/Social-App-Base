const { Reaction, Thoughts } = require('../models');

const reactionController = {
    getAllReaction(req, res) {
        Reaction.find({})
          .then(dbThoughtsData => res.json(dbThoughtsData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },
    // add reaction 
    addReaction({ params, body }, res) {
        console.log(body);
        Reaction.create(body)
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
  
    // remove reaction
    removeReaction({ params }, res) {
        Reaction.findOneAndDelete({ _id: params.reactiontId })
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
  
  module.exports = reactionController;