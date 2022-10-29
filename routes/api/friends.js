const router = require('express').Router();

const {
    addFriend,
    removeFriend
} = require('../../controllers/friends-controllers');

//friends
router
.route('/users/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend);

module.exports = router;