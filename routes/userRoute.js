//cerates a new express router object
const router = require('express').Router();
const {getUsers, postUser} = require("../controllers/userController.js");
const {userValidators} = require('../validators/userValidators.js');

//router defines / or /id as a part of the endpoint
router
.get('/', getUsers) //use validator here .get('/', [validator, validator 2 ], getUsers') 
.post('/', userValidators, postUser);

module.exports = router;