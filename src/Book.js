//imports
//when in the client side, use import syntax
import React from 'react';
import axios from 'axios';
import BookAdd from './BookAdd.js';
import BookUnit from './BookUnit.js';

class Book extends React.Component {
 
    constructor(props) {
        
        super(props);
        
        this.state = {
            
            //stores all the books
            books:[],
            //stores the value to be attributed to the 'display' property of the result div
            result:'none',
            //stores the value to be attributed to the 'display' property of the div that displays the chosen book
            show:'none',
            //stores the listed book the user wants to access
            currentBook:[],
            //stores the reviews of the book the user wants to access
            currentReview:[]
            
        }
        
        this.handleShowBooks = this.handleShowBooks.bind(this); // refers to this of Book
        this.accessBook = this.accessBook.bind(this); // refers to this of Book
        this.mostRecentBook = this.mostRecentBook.bind(this); // refers to this of Book
        
    }
    
    //checks for updates in the props users
    componentDidUpdate(prevProps, prevState) {
        
        //check if props books has change
        if(prevProps.allBooks != this.props.allBooks){
            
            this.setState({
                
                books:this.props.allBooks
                
            }) 
            
        }
        
    }
    
    //when click the button to show all books, make the result div visible
    handleShowBooks(event) {
        
        event.preventDefault();
        
        this.setState({
            
            result: 'block'
            
        })
        
    }
    
    //function to access book when clicking on listed item
    accessBook(id){
        
        //get book by id
        axios.get(`/api/v1/books/${id}`)
        //if there is no error
        .then(book => {
            
            //convert book into an array of information
            let arrayBook = Object.values(book.data[0])
            
            //update states with new current book (chosen book) info and make result visible
            this.setState({
                
                currentBook:arrayBook,
                currentReview:book.data[0].review,
                show:'block'
                
            })
        })
        //get reviews of the chosen book
        .then(() => axios.get(`/api/v1/books/${id}/reviews`))
        //if there is no error
        .then(review =>{
            
            //convert reviews into an array of information
            let arrayReview = Object.values(review.data)
            
            //update states with new current book's reviews
            this.setState({
                
                currentReview:arrayReview,
                
            }) 
            
            
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
        
    }
    
    //get array updated with recently added book from child
    mostRecentBook(updatedArray){
        
        //update state, so list of all books is updated
        this.setState({
            
            books:updatedArray
            
        })
        
    }

    render() {
        
        //variable that receives the stored value to be attributed to the 'display' property of the result div
        let hidden = {
            
            display: this.state.result
            
        }
        
        //variable that receives the stored value to be attributed to the 'display' the recently added book div
        let showBook = {
            
            display: this.state.show
            
        }
        
        let bookAddProps = {
            
            allUsers:this.props.allUsers,
            allBooks:this.props.allBooks,
            accessBook:this.accessBook,
            mostRecentBook:this.mostRecentBook
            
        };
        
        let bookUnitProps = {
            
            allUsers:this.props.allUsers,
            currentBook:this.state.currentBook,
            currentReview:this.state.currentReview
            
        }
        
        
        //render the books form to add books and the recently added book (in another component), the list of books, and information about the chosen book (in another component)
        return <>
            
            <div className='book'>
            
                <div className='bookMain'>
                    <input className='button' type='submit' value='Show all books' onClick={this.handleShowBooks}/>
                    <BookAdd  {...bookAddProps}/>
                </div>
                
                <div className='bookList' style={hidden}>
                    {this.state.books.slice(0).reverse().map((book, index) => 
                        
                        <>
                            <a aria-label={book.title} className='listItem' key={index} onClick={() => this.accessBook(book._id)}>
                                <img className='cover' src={book.cover} alt={book.title}/>
                                <h2>{book.title}</h2>
                                <p>{book.author}</p>
                            </a>
                        </>
                        
                    )}
                </div>
                
            </div>
            <div className='bookUnit' style={showBook}>
                <BookUnit {...bookUnitProps}/>
            </div>
            
        </>
    }    
    
}

export default Book;