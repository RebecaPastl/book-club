//imports
//when in the client side, use import syntax
import React from 'react';

class Header extends React.Component {

    render() {
        
        //render header
        return <>
            
            <header className='header'> 
                <h1>Book Club</h1>
                <p className="artist">Photo by Pixabay on <a href="https://www.pexels.com/photo/books-in-black-wooden-book-shelf-159711/">Pexels</a></p>
                <div className='welcome'>
                    <p>Welcome to the Book Club!</p>
                </div>
            </header> 
            
        </>;
    }

}

export default Header;