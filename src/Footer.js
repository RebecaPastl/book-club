//imports
//when in the client side, use import syntax
import React from 'react';

class Footer extends React.Component {

    render() {
        
        //render footer
        return <>
            
            <footer className='footer'>
                <p>Copyright&copy; of all the images are from free source websites.</p>
                <p>Disclaimer: this website belongs to a school project and is not for commercial use.</p>
                <a href='mailto:rvieiracosta00@mylangara.ca'>rvieiracosta00@mylangara.ca</a>
            </footer>
            
        </>
        
    }

}

export default Footer;