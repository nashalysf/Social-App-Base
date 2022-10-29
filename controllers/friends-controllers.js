const { User, Friends, Reactions } = require('../models');

const friendController = {
    
    // add friend
    addFriend({ params, body }, res) {
        console.log(params);
        User.findByIdAndUpdate ( params.userId , {$push: { friends: params.friendId }})
          .then(dbuserData => {
            if (!dbuserData) {
              res.status(404).json({ message: 'No users found with this id!' });
              return;
            }
            res.json(dbuserData);
          })
          .catch(err => res.json(err));
    },
  
    // remove friend
    removeFriend({ params }, res) {
        Friends.findOneAndDelete({ _id: params.friendId })
          .then(deletedFriend => {
            if (!deletedFriend) {
              return res.status(404).json({ message: 'No friend with this id!' });
            }
            return User.findOneAndUpdate(
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