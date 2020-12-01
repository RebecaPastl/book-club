const Users = require('../models/Users.js');
const {validationResult} = require('express-validator');


exports.postUser = (req, res)=>{
    
    
    let errorArray = [];
    
    //array of validation errors
    const valError = (validationResult(req)).array();
    
    //if there is any error in the array, display error
    if(valError.length > 0) {
        
        valError.map(item=>{
            
            errorArray.push(item.msg);
            
        });
        
        res.status(400).send(errorArray);
        
    //if there are no errors
    }else {
        
        //create a new book with the info from User.js
        let newUser = new Users(req.body);
        
        //save new user into the collection
        newUser.save()
        .then(newUserSaved=>{
            
            //return the saved book to User.js
            res.status(201).send(newUserSaved);
            
        })
        //if threre is a db error, log onto the back end console (users should not see)
        .catch(error=>console.log(error));
    }
};

exports.getUsers = (req, res) => {

    //search all users
    Users
    .find({})
    .exec()
    .then(usersList=>{
        
        //send result to component
        res.status(200).send(usersList);
        
    })
    //if threre is a db error, log onto the back end console (users should not see) 
    .catch(error=>console.log(error));
    
};