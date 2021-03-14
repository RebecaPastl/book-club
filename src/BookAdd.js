//imports
//when in the client side, use import syntax
import React from 'react';
import axios from 'axios';

class BookAdd extends React.Component {
    
    constructor(props) {
        
        super(props);
        
        this.state = {
            
            //stores new book title
            newTitle:undefined,
            //stores new book author
            newAuthor:undefined,
            //stores new book cover
            newCover:undefined,
            //stores new book owner
            newOwner:undefined,
            //stores new book availability (trade, borrowing or both)
            newAvailability:undefined,
            //stores the messages to be displayed (success and error)
            messages:[],
            //stores the value to be attributed to the 'display' property of the recently added book div
            result: 'none',
            
        }
        
        this.handleBookSubmit = this.handleBookSubmit.bind(this); // refers to this of Book Add
        this.handleChange = this.handleChange.bind(this); // refers to this of Book Add
        
    }
    
    //tracjs changes in all input fields
    /*from Christopher Davies at Stack Overflow (https://stackoverflow.com/questions/21029999/react-js-identifying-different-inputs-with-one-onchange-handler)*/
    handleChange(event){
        
        let messagesArray = [];
        
        this.setState({
            
            [event.target.name] : event.target.value,
            result: 'none',
            messages:messagesArray
            
        }) 
        
    }
    
    //function to submit a new book
    handleBookSubmit(event) {
        
        //tell the browser to let the form be handled by our code
        event.preventDefault();
        
        //Submit a new Book
        let newBook = {
            
            title: this.state.newTitle,
            author: this.state.newAuthor,
            cover: this.state.newCover,
            owner: this.state.newOwner, 
            availability: this.state.newAvailability,
            review:[]
            
        }
        
        //post the new book into the collection
        axios.post('/api/v1/books', newBook)
        //if there is no error
        .then(bookSaved => {
            
            //create a new array of messages (success or error) to replace the old one
            let messagesArray = [];
            
            //push the success message into the array
            messagesArray.push('New book submitted successfully.')
            
            //update the state
            this.setState({
                
                newTitle:'',
                newAuthor:'',
                newCover:'',
                newOwner:'',
                newAvailability:'',
                result: 'block', 
                messages:messagesArray
                
            })
            
            //update list of books
            this.props.allBooksUpdate()
            
        })
        //if there are errors
        .catch(error => { 
            
            //create an array with error messages
            let errorArray = error.response.data;
            
            //update state
            this.setState({
                
                messages:errorArray
                
            })
            
        });
        
        //erase the content of the input fields
        event.target.reset();
        
    }

    render() {
        
        //variable that receives the stored value to be attributed to the 'display' property of the list div
        let hidden = {
            
            display: this.state.result
            
        }
        
        //render the add book form and the most recent book
        //cover field: onInput was chosen since onChange was not updating the the stated when pasting URLs to add books multiple times in a row
        return <>        
            
            <div className='book'>
                <form onSubmit={this.handleBookSubmit}>
                        <legend>ADD A BOOK</legend>
                        <label htmlFor='title'>Title:</label>
                        <input type='text' placeholder='Enter book title' id='title' name='newTitle' onChange={this.handleChange}/>
                        <label htmlFor='author'>Author:</label>
                        <input type='text' placeholder='Enter book author' id='author' name='newAuthor' onChange={this.handleChange}/>
                        <label htmlFor='cover'>Cover:</label>
                        <input type='text' placeholder='Paste an URL for the book cover' id='cover' name='newCover' onInput={this.handleChange}/>                        
                        <label htmlFor='owner'>Owner:</label>
                        <select name='newOwner' id='owner' onChange={this.handleChange}>
                            <option hidden>Select an user</option>
                            {this.props.allUsers.slice(0).reverse().map((owner, index) => 
                                
                                <>
                                  <option key={index} value={owner.name}>{owner.name}</option>
                                </>
                                
                            )}
                        </select>
                        <label htmlFor='availability'>Availability:</label>
                        <select name='newAvailability' id='availability' onChange={this.handleChange}>
                            <option hidden>The book for:</option>
                            <option value='trading'>Trading</option>
                            <option value='borrowing'>Borrowing</option>
                            <option value='trading or borrowing'>Both</option>
                        </select>
                        <input className='button' type='submit' value='Submit Book' />
                        {this.state.messages.map((message, index) => 
                            
                            <>
                                <div className='message' key={index}>{message}</div>
                            </>
                            
                        )}
                </form>
            </div>
            
        </>
    }
    
}

export default BookAdd;