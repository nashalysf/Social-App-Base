const router = require('express').Router();
const reactionsRoutes = require('./reaction-routes');
const thoughtsRoutes = require('./thoughts-routes');
const userRoutes = require ('./user-routes');
const friendsRoutes = require('./friends');


//add prefix /pizzas
router.use('/reactions', reactionsRoutes);
router.use('/thoughts', thoughtsRoutes);
router.use('/', friendsRoutes);
router.use('/users', userRoutes);

module.exports = router;