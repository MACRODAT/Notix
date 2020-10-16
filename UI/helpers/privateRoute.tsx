import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import {routeStyler} from './routeStyler';

class NoLogin extends React.Component
{
    render()
    {
        return (<>
                    <h1>No login !</h1>
                    <h4>Please Sign in in order to access this page.</h4>  
                </>  
        );
    }
} 

function isLoggedIn(){
    return false;
}

function PrivateRoute({component : Component  , ...rest})
{
    return (
        
             <Route {...rest} render={  
                        (props) => (
                            
                                    isLoggedIn() ? 
                                    routeStyler({component : Component  , props : {}})
                                    : 
                                    routeStyler({component : NoLogin  , props : {}})
                                    
                        )
                    }
             />
            
    );
}

export default PrivateRoute;