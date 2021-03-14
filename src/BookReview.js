//imports
//when in the client side, use import syntax
import React from 'react';
import axios from 'axios';

class BookReview extends React.Component {
 
    constructor(props) {
        
        super(props);
        
        this.state = {
            
            //stores the text of the new review being added
            reviewText:undefined,
            //stores the user of the new review being added
            reviewUser:undefined,
            //stores all the reviews of the current book (chosen book)
            allReviews:[],
            //stores the messages to be displayed (success and error)
            messages:[]
            
        }
        
        this.handleReviewChange = this.handleReviewChange.bind(this); // refers to this of Review
        this.handleUserChange = this.handleUserChange.bind(this); // refers to this of Review
        this.reviewSubmit = this.reviewSubmit.bind(this); // refers to this of Review
        
    }
    
    //checks for updates in the props users
    componentDidUpdate(prevProps, prevState) {
        
        //check if props reviews has changed
        if(prevProps.currentReview != this.props.currentReview){
            
            this.setState({
                
                allReviews: this.props.currentReview,
                
                
            }) 
            
        }
    }
 
    //handle change in the textarea content
    handleReviewChange(event) {
        
        let messagesArray = [];
        
        this.setState({
            
            reviewText:event.target.value,
            messages: messagesArray
            
        }) 
        
    }
    
    //handle change in the dropdown content
    handleUserChange(event) {
        
        let messagesArray = [];
        
        this.setState({
            
            reviewUser:event.target.value,
            messages: messagesArray
            
        }) 
        
    }
    
    //function to submit a new review
    reviewSubmit(event) {
        
        //tell the browser to let the form be handled by our code
        event.preventDefault();
        
        //create a new review
        let newReview = {
            
            id: this.props.currentBook[1],
            text: this.state.reviewText, 
            user: this.state.reviewUser
            
        }
        
        //access chosen book, crate a new review
        axios.post(`api/v1/books/${this.props.currentBook[1]}`, newReview)
        //if there is no error
        .then(reviewSaved => {
            
            //clone the previous list of reviews
            let updatedList = this.state.allReviews.slice();
            
            //push the new review into the list
            updatedList.push(reviewSaved.data)
            
            //create a new array of messages (success or error) to replace the old one
            let messagesArray = [];
            
            //push the success message into the array
            messagesArray.push('New review submitted successfully.')
            
            //update the states
            this.setState({
                
                allReviews:updatedList,
                reviewText:'',
                reviewUser:'',
                messages:messagesArray
                
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
        
        //erase the content of the input fields
        event.target.reset();
        
    }
 
    //render selected book's review from and list of reviews
    render() {
        
        return <>
            
            <div className='review'>
                <h2>Reviews</h2>
                <form onSubmit={this.reviewSubmit}>
                        <legend>ADD A REVIEW</legend>
                        <textarea className='reviewText' onChange={this.handleReviewChange} name='text'></textarea>
                        <div className='reviewFloat'>
                            <select className='reviewUser' onChange={this.handleUserChange}>
                                <option hidden>Select an user</option>
                                {this.props.allUsers.slice(0).reverse().map((user, index) => 
                                
                                    <>
                                      <option key={index}>{user.name}</option>
                                    </>
                                
                                )}
                            </select>
                            <input className='button' type='submit' value='Submit review' />
                        </div>
                </form>
                {this.state.messages.map((message, index) => 
                
                <>
                    <div className='message' key={index}>{message}</div>
                </>
                
                )}
                <ul>
                    {this.state.allReviews.slice(0).reverse().map((review,index) => 
                        
                        <>
                            <li key={index}>{review.text}<p>{review.user}</p></li>
                        </>
                        
                    )}
                </ul>
            </div>
            
        </>
    }    
    
}

export default BookReview;