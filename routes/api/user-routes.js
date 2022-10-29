const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controllers');
const {
    addFriend,
    removeFriend
} = require('../../controllers/friends-controllers');
//GET all and POST at api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

//GET one, PUT, and DELETE at api/pizzas/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);
//GET friends

router
.route('/:userId/friends/:friendsId')
.post(addFriend)
.delete(removeFriend);

module.exports = router;