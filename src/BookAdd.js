//imports
//when in the client side, use import syntax
import React from 'react';
import axios from 'axios';

class BookAdd extends React.Component {
    
    constructor(props) {
        
        super(props);
        
        this.state = {
            
            //stores all the users (possible owners)
            owners:[],
            //stores all the books
            books:[],
            //stores new book title
            newTitle:'',
            //stores new book author
            newAuthor:'',
            //stores new book cover
            newCover:'',
            //stores new book owner
            newOwner:'',
            //stores new book availability (trade, borrowing or both)
            newAvailability:'',
            //stores the messages to be displayed (success and error)
            messages:[],
            //stores the value to be attributed to the 'display' property of the recently added book div
            result: 'none',
            //book ID of the most recently added book, to be used on the <a> tag that calls the function to exhibit the information about the chosen book
            bookId:''
            
        }
        
        this.handleBookSubmit = this.handleBookSubmit.bind(this); // refers to this of Book Add
        this.handleChange = this.handleChange.bind(this);
        
    }
    
    componentDidUpdate(prevProps, prevState) {
        
        //check if props users has change
        if(prevProps.allUsers != this.props.allUsers){
            
            this.setState({
                
                owners:this.props.allUsers
                
            }) 
            
        }
        
        //check if props books has change
        if(prevProps.allBooks != this.props.allBooks){
            
            this.setState({
                
                books:this.props.allBooks
                
            }) 
            
        }
        
    }
    
    //tracjs changes in all input fields
    /*from Christopher Davies at Stack Overflow (https://www.pexels.com/photo/books-in-black-wooden-book-shelf-159711)*/
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
            
            //clone the previous list of books
            let updatedList = this.state.books.slice(0);
            
            //push the new book into the list
            updatedList.push(bookSaved.data)
            
            //create a new array of messages (success or error) to replace the old one
            let messagesArray = [];
            
            //push the success message into the array
            messagesArray.push('New book submitted successfully.')
            
            //update the state
            this.setState({
                
                books:updatedList,
                bookId:bookSaved.data._id,
                result: 'block', 
                messages:messagesArray
                
            })
            
            //send most recent list to parent component (update list of books displayed)
            this.props.mostRecentBook(updatedList)
            
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
        return <>        
            
            <div className='book'>
                <form onSubmit={this.handleBookSubmit}>
                        <legend>ADD A BOOK</legend>
                        <label htmlFor='title'>Title:</label>
                        <input type='text' placeholder='Enter book title' id='title' name='newTitle' onChange={this.handleChange}/>
                        <label htmlFor='author'>Author:</label>
                        <input type='text' placeholder='Enter book author' id='author' name='newAuthor' onChange={this.handleChange}/>
                        <label htmlFor='cover'>Cover:</label>
                        <input type='text' placeholder='Paste an URL for the book cover' id='cover' name='newCover' onChange={this.handleChange}/>                        
                        <label htmlFor='owner'>Owner:</label>
                        <select name='newOwner' id='owner' onChange={this.handleChange}>
                            <option hidden>Select an user</option>
                            {this.state.owners.slice(0).reverse().map((owner, index) => 
                                
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
                <div className='listItem' style={hidden}>
                    <fieldset>
                        <legend>Most recent book</legend>
                        <a aria-label={this.state.newTitle} onClick={() => this.props.accessBook(this.state.bookId)}>
                            <img className='cover' src={this.state.newCover} alt={this.state.newTitle}/>
                            <h2>{this.state.newTitle}</h2>
                            <p>{this.state.newAuthor}</p>
                            <p>Owned by: {this.state.newOwner}</p>
                            <p>Available for: {this.state.newAvailability}</p>
                        </a>
                    </fieldset>
                </div>
            </div>
            
        </>
    }
    
}

export default BookAdd;