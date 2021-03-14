//imports
//when in the client side, use import syntax
import React from 'react';
import axios from 'axios';

class User extends React.Component {
 
    constructor(props) {
        
        super(props);
        
        this.state = {
            
            //stores the name of the new user being added
            newName:'',
            //stores the avatar of the new user being added
            newAvatar:'',
            //stores the messages to be displayed (success and error)
            messages:[],
            //stores the value to be attributed to the 'display' property of the result div
            result:'none'
            
        }
        
        this.handleUserSubmit = this.handleUserSubmit.bind(this); // refers to this of User
        this.handleNameChange = this.handleNameChange.bind(this); // refers to this of User
        this.handleAvatarChange = this.handleAvatarChange.bind(this); // refers to this of User
        this.handleShowUsers = this.handleShowUsers.bind(this); // refers to this of User
    }
 
    //tracks the change in the name field, if the user is interacting with the field, the previous success or validation error message will be deleted
    handleNameChange(event) {
        
        let messagesArray = [];
        
        this.setState({
            
            newName:event.target.value,
            messages:messagesArray
            
        }) 
        
    }
    
    //tracks the change in the avatar field, if the user is interacting with the field, the previous success or validation error message will be deleted
    handleAvatarChange(event) {
        
        let messagesArray = [];
        
        this.setState({
            
            newAvatar:event.target.value,
            messages:messagesArray
            
        })   
        
    }
    
    //function to submit a new user
    handleUserSubmit(event) {
        
        //tell the browser to let the form be handled by our code
        event.preventDefault();
        
        //Submit a new user
        let newUser = {
            
            name: this.state.newName, 
            avatar: this.state.newAvatar
            
        }
        
        //post the new user into the collection
        axios.post('/api/v1/users', newUser)
        //if there is no error
        .then(userSaved => {
            
            //create a new array of messages (success or error) to replace the old one
            let messagesArray = [];
            
            //push the success message into the array
            messagesArray.push('New user submitted successfully.')
            
            //update the states and erase previous information
            this.setState({
                
                newName:'',
                newAvatar:'',
                messages:messagesArray
                
            })
            
            //update allUsers prop in App
            this.props.allUsersUpdate(event);
            
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
    
    //when click the button to show all users, make the result div visible
    handleShowUsers(event) {
        
        event.preventDefault();
        
        this.setState({
            
            result: 'block'
            
        })
        
    }
 
    render() {
        
        //variable that receives the stored value to be attributed to the 'display' property of the list div
        let hidden = {
            
            display: this.state.result
            
        }
        
        //render the user form and the list of users
        //avatar field: onInput was chosen since onChange was not updating the the stated when pasting URLs to add users multiple times in a row
        return <>
            
            <div className='user'>
                <div className='userMain'>
                    <input className='button' type='submit' value='Show all users' onClick={this.handleShowUsers}/>
                    <form onSubmit={this.handleUserSubmit}>
                            <legend>ADD A USER</legend>
                            <label htmlFor='name'>Name:</label>
                            <input type='text' placeholder='Enter your name' id='name' name='name' onChange={this.handleNameChange} />
                            <label htmlFor='avatar'>Avatar:</label>
                            <input type='text' placeholder='Enter the URL to your avatar image' id='avatar' name='avatar' onInput={this.handleAvatarChange}/>
                            <input className='button' type='submit' value='Submit user' />
                            {this.state.messages.map((message, index) => 
                                
                                <>
                                    <div className='message' key={index}>{message}</div>
                                </>
                                
                            )}
                    </form>
                </div>
                
                <div className='userList' style={hidden}>
                    {this.props.allUsers.slice(0).reverse().map((user, index) => 
                        
                        <>
                            <div className='listItem' key={index}>
                                <img className='userImage' src={user.avatar} alt={user.name}/>
                                <h2>{user.name}</h2>
                            </div>
                        </>
                        
                    )}
                </div>
                
            </div>
            
        </>
    }    
    
}

export default User;