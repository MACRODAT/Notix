import React, { useContext, useState } from 'react';


import { Redirect } from 'react-router-dom';
import { user } from './store/core/core';
import { logout } from './store/Actions/actionCreator';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = dispatch => (
    {
        logout : () => dispatch(logout())
    }
)


const Signout = ({logout}) => {
    // sign out of form
    const [goto, setGoto] = useState('');

    logout();

    setTimeout(() => 
    {
        setGoto('/');
    }, 1500)

    if (goto === '') 

        return (

            <h1>
                SIGN OUT IN PROGRESS...
            </h1>
        )
    else
        return <Redirect to="/" />
}

export default connect(mapStateToProps, mapDispatchToProps)(Signout);