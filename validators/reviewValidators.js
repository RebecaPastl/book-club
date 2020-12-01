//import modules
const {check} = require('express-validator');

//checks if one of the dropdown list values was chosen 
const isUserValid = value => {
    if (value == ''){
        return false;
    } else {
        return true;
    }
};


exports.reviewValidators = [
    //text validator
    //title validator, cannot escape() characters <, >, &, ', " and / since some may be used on text
    check('text')
    .isLength({min: 5, max: 300})
    .trim()
    .withMessage('Your review must have between 5 and 300 characters.'),
    
    //user validator
    check('user')
    .custom(isUserValid)
    .withMessage('Please choose a user from the dropdown list.')
    
];