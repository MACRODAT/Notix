import React from 'react';
import {Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Login from './login';
import Account from './account';
import Home from './home';
import { routeStyler } from './helpers/routeStyler';
import PrivateRoute from './helpers/privateRoute';
import Register from './register';
import Terms from './terms';





const Routing = (props, state) => (
    
    <>
        <Route exact path="/" render={(props) =>  routeStyler({component : Home, props} )} />
        <Route exact path="/terms" render={(props) =>  routeStyler({component : Terms, props} )} />
        <Route  path="/login" component={Login} />
        {/* <Route  path="/login" render={(props) =>  routeStyler({component : Login, props} )} /> */}
        {/* <Route  path="/signout" render={(props) =>  routeStyler({component : Signout, props} )} /> */}
        {/* <Route path="/todo" component={TODO} /> */}
        <Route  path="/register" render={(props) =>  routeStyler({component : Register, props} )} />
        {/* <Route  path="/registerSuccess" render={(props) =>  routeStyler({component : RegisterSuccess, props} )} /> */}
        {/* <Route  path="/account" render={(props) =>  routeStyler({component : Account, props} )} /> */}
        <PrivateRoute path="/account" component={Account}  />
        {/* <PrivateRoute path="/admin" component={Admin} />
        <PrivateRoute path="/add" component={AddItem}  />
        <PrivateRoute path="/search" component={Search}  />
        <PrivateRoute path="/addedSuccess" component={AddedSuccess}  />
        <RestrictedRoute restricted={true} path="/register" component={Register}  /> */}
    </>

);

export default Routing;