import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
    
    render() {
        this.props.setrole("logout");
        return (
            <div>
                <Redirect to='/'/>  
            </div>
        );
    }
}

export default Logout;