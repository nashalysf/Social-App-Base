const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts
} = require('../../controllers/thoughts-controller');

//GET all and POST at api/pizzas
router
    .route('/')
    .get(getAllThoughts)
    .post(createThoughts);

//GET one, PUT, and DELETE at api/pizzas/:id
router
    .route('/:id')
    .get(getThoughtsById)
    .put(updateThoughts)
    .delete(deleteThoughts);

module.exports = router;