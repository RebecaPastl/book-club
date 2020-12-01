const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReviewsSchema = new Schema({
    user:{
        type:String, 
        required:[true, 'Please choose a user from the dropdown list.']
    },
    text:{
        type:String, 
        required:[true, 'You need to insert a text for your review.'],
        minlength: [5, 'Your review must have at least 5 characters.'],
        maxlength: [300, 'Your review must have up to 300 characters.']
    }
});

exports.Reviews = mongoose.model("Reviews", ReviewsSchema);
exports.ReviewsSchema = ReviewsSchema;