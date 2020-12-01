//import modules
const {check} = require('express-validator');
const validator = require('validator');

//checks if the string the user has chosen for cover is URL or URI
const isCoverValid = value => {
    if (!validator.isURL(value) && !validator.isDataURI(value)){ 
        return false;
    }else {
        return true;
    }
};

//checks if one of the dropdown list values was chosen 
const isOwnerValid = value => {
    if (value == ''){
        return false;
    } else {
        return true;
    }
};

//checks if an option between 'trading', 'borrowing' or 'both' was chosen from the dropdown list
const isAvailabilityValid = value => {
    if (value != 'trading' && value != 'borrowing' && value != 'Trading or borrowing'){
        return false;
    } else {
        return true;
    }
};


exports.bookValidators = [
    //title validator, cannot escape() characters <, >, &, ', " and / since some book names use it
    check('title')
    .isLength({min: 1})
    .trim()
    .withMessage('You must choose a book title.'),
    
    //author name validator
    //title validator, cannot escape() characters <, >, &, ', " and / since some author names may use it
    check('author')
    .isLength({min: 1})
    .trim()
    .withMessage('If there is no author, insert "Unknown author".'),
    
    //cover validator
    //title validator, cannot escape() characters <, >, &, ', " and / since URI addresses use it
    check('cover')
    .custom(isCoverValid)
    .trim()
    .withMessage('Please right click an image on the web, select "Copy Image Location / Address / Link" , and paste the content in the "cover" field.'),
    
    //owner validator
    check('owner')
    .trim()
    .custom(isOwnerValid)
    .withMessage('Please choose an owner from the dropdown list.'),
    
    //availability validator
    check('availability')
    .custom(isAvailabilityValid)
    .withMessage('Please choose an option from the availability list.')
    
];