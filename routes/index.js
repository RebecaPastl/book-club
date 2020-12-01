//cerates a new express router object
const router = require('express').Router();
const bookRoute = require('./bookRoute.js');
const userRoute = require('./userRoute.js');

//using the routes defined in books and users, adding the /books or /users to the endpoint (before the imported routes from bookRoute and userRoute)
router.use('/books', bookRoute);
router.use('/users', userRoute);

module.exports = router;