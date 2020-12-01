//import modules
const {check} = require('express-validator');
const validator = require('validator');

//checks if the string the user has chosen for avatar is URL or URI
const isAvatarValid = value => {
    if (!validator.isURL(value) && !validator.isDataURI(value)){ 
        return false;
    }else {
        return true;
    }
};

exports.userValidators = [
    //name validator
    //title validator, cannot escape() characters <, >, &, ', " and / since some author names may use it
    check('name')
    .isLength({min: 5})
    .trim()
    .withMessage('The user name must have at least 5 characters.'),
    
    //avatar validator
    //title validator, cannot escape() characters <, >, &, ', " and / since URI addresses use it
    check('avatar')
    .custom(isAvatarValid)
    .trim()
    .withMessage('Please right click an image on the web, select "Copy Image Location / Address / Link", and paste the content in the "avatar" field.')
    
];