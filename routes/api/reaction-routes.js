const router = require('express').Router();
const { 
    addReaction, 
    removeReaction, 
    getAllReaction 
} = require('../../controllers/reactions-controller');

    // /api/reaction/:thoughtId
router
.route('/')
.get(getAllReaction)

router
.route('/:thoughtsId')
.post(addReaction);

router
.route('/:thoughtsId/:reactionId')
.delete(removeReaction);

module.exports = router;