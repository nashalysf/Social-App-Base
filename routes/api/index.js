const router = require('express').Router();
const thoughtsRoutes = require('./thoughts-routes');

//add prefix /pizzas
router.use('/thoughts', thoughtsRoutes);

module.exports = router;