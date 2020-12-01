//cerates a new express router object
const router = require('express').Router();
const {getBooks, getBook, getReview, postBook, postReview} = require("../controllers/bookController.js");
const {reviewValidators} = require('../validators/reviewValidators.js');
const {bookValidators} = require('../validators/bookValidators.js');

//router defines / or /id as a part of the endpoint
router
.get('/', getBooks)
.get('/:id', getBook)
.get('/:id/reviews', getReview) //user can not access Reviews without first accessing the book, otherwise the user'll not know t which book the review is related
.post('/', bookValidators, postBook)
.post('/:id', reviewValidators, postReview);

module.exports = router;