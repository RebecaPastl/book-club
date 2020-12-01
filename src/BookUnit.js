//imports
//when in the client side, use import syntax
import React from 'react';
import BookReview from './BookReview.js';

//the Book class extends the component class
class BookUnit extends React.Component {

    render() {
        
        let bookReviewProps = {
            
            allUsers:this.props.allUsers,
            currentBook:this.props.currentBook,
            currentReview:this.props.currentReview
            
        }
        
        //render information about the chosen book and reviews (in another component)
        return <>
            
            <img className='cover' src={this.props.currentBook[4]} alt={this.props.currentBook[2]}/>
            <h2>Title: {this.props.currentBook[2]}</h2>
            <h3>Author: {this.props.currentBook[3]}</h3>
            <p>Owner: {this.props.currentBook[5]}</p>
            <p>Availability: {this.props.currentBook[6]}</p>
            <BookReview {...bookReviewProps} />
            
        </>
        
    }    
    
}

export default BookUnit;