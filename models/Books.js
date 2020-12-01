const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BooksSchema = new Schema({
    title:{
        type:String, 
        required:[true, 'You must enter a title for the book.']
    },
    author:{
        type:String,
        required:[true, 'If there is no author, insert "Unknown author".']
    },
    cover:{
        type:String
    },
    owner:{
        type:String, 
        required:[true, 'It is necessary to add an owner to the book.']
    },
    availability:{
        type:String,
        required:[true, 'It is necessary to choose an option from the availability list.']
    },
    review:[{
        //store unique object IDs for documents
        type: Schema.Types.ObjectId,
        //indicates the collection that is referred to
        ref: 'Reviews' 
    }]
    
    
    
});

const Books = mongoose.model("Books", BooksSchema);

module.exports = Books;