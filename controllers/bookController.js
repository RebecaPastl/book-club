const Books = require('../models/Books.js');
const {Reviews} = require('../models/Reviews.js');
const {validationResult} = require('express-validator');

exports.postBook = (req, res) => {

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
        
        //create a new book with the info from BookAdd.js
        let newBook = new Books(req.body);
        
        //save new book into the collection
        newBook.save()
        .then(newBookSaved=>{
            
            //return the saved book to BookAdd.js
            res.status(201).send(newBookSaved);
            
        })
        //if threre is a db error, log onto the back end console (users should not see) 
        .catch(error=>console.log(error));
    }
    
};

exports.getBooks = (req, res) => {
    
    //search all books
    Books
    .find({})
    .exec()
    .then(booksList=>{
        
        //send result to component
        res.status(200).send(booksList);
        
    })
    //if threre is a db error, log onto the back end console (users should not see) 
    .catch(error=>console.log(error));
    
};

exports.getBook = (req, res) => {

    //search books with the id sent by the components
    Books
    .find({'_id' : req.params.id})
    .populate('review')
    .exec()
    .then(book => {
        
        //send result to component
        res.status(200).send(book);
        
    })
    //if threre is a db error, log onto the back end console (users should not see) 
    .catch(error =>console.log(error));
    
};

exports.postReview = (req, res) => {
    
    let errorArray = [];
    
    //array of validation errors
    const valError = (validationResult(req)).array();
    
    //if there is any error in the array, display error
    if(valError.length > 0) {
        
        //push only validation error messages into the array of errors
        valError.map(item=>{
            
            errorArray.push(item.msg);
            
        });
        
        //send array of error messages to component
        res.status(400).send(errorArray);
        
        
    }else {
        
        //query the books collection for any book matching id
        Books
        .findOne({'_id':req.body.id})
        .exec()
        .then(book => {
            
            //if a match wasn't found    
            if (book == null) {
                
                //if no book was found, push error message into array
                errorArray.push('No book with that id found.');
                
                //send message to component
                res.status(400).send(errorArray);
                
            } else {    
                
                //create newReview
                const newReview = new Reviews({
                    
                    user: req.body.user,
                    text: req.body.text
                    
                });
                
                //save newReview
                newReview.save((error, result) => {
                    
                    //if threre is a db error, log onto the back end console (users should not see) 
                    if (error) {
                        
                        console.log(error);
                    
                    //if there is no error    
                    } else {
                        
                        //put the _id of newReview in the book
                        book.review.push(newReview._id);
                        
                        //save book
                        book.save(result => {
                            
                            //return review to component
                            res.send(newReview);
                            
                        }); //end of book saving action
                        
                    }
                    
                }); //end of newReview saving action
               
            }
            
        }); //end of search for book execution
        
        
    }
    
    

};

exports.getReview = (req, res) => {

    let errorArray = [];
    
    //search for the book that the user wants to see info about
    Books
    .findOne({'_id':req.params.id})
    .populate('review')
    .exec((error, book) => {
        
        //if a match wasn't found    
        if (book == null) {
            
            //if no book was found, push error message into array
            errorArray.push('No book with that id found.');
            
            //send message to component
            res.status(400).send(errorArray);
            
        //if threre is a db error, log onto the back end console (users should not see)   
        } else if (error) {
            
            console.log(error);
            
        //if there are no errors
        } else {    
            
            //return book to component
            res.send(book.review);
            
        }
        
    });

    
};