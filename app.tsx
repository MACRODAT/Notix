import React from 'react';

import './UI/styles/app.css';
import * as theming from './UI/theming/theming';

import NavMenuNoLogin from './UI/navs/navMenuNoLogin';
import Routing from './UI/Routes';
import { Redirect, Router, BrowserRouter } from 'react-router-dom';
import HistoryNavigator from './UI/helpers/historyNavigator';
import { ToastHeader } from 'reactstrap';


import * as mappers from './loginUtils';
import {connect } from 'react-redux';
import NavMenuWithLogin from './UI/navs/navMenuWithLogin';

class App extends React.Component {

    state = {
        goto : '',
        activeTheme : '',
        switchToVerticalNav : false,
    }

    props =  {
        loggedIn : null,
        logout : null,
    }

    constructor(props)
    {
        super(props);
        this.goto.bind(this);
    }

    goto(path : String)
    {
        this.setState({goto : path});
    }

    applyTheme(theme)
    {
        if (theme === 'light')
        {
            theming.applyTheme(theming.lightTheme);
        }
        if (theme === 'dark')
        {   
            theming.applyTheme(theming.darkTheme)
        }
        this.setState({activeTheme : theme});
    }

    componentWillMount()
    {
        this.applyTheme('dark');
    }

    switchNav()
    {
        this.setState({ verticalToggle : !this.state.switchToVerticalNav });
    }

    render()
    {
        // 

        return (
                
                    <div className="content">
                        <div className="draggable">
                            {
                            this.props.loggedIn ? 
                                <NavMenuWithLogin   verticalToggle={() => this.switchNav.bind(this)()} 
                                redirecter={(path) => this.goto(path)} 
                                toggleTheme={() => this.applyTheme(this.state.activeTheme === 'dark' ? 'light' : 'dark' )} />
                            :
                                <NavMenuNoLogin   verticalToggle={() => this.switchNav.bind(this)()} 
                                redirecter={(path) => this.goto(path)} 
                                toggleTheme={() => this.applyTheme(this.state.activeTheme === 'dark' ? 'light' : 'dark' )} />
                            }
                            
                        </div>
                        <BrowserRouter>
                            <Routing />
                            <HistoryNavigator goto={
                                            this.state.goto
                                        } />        
                        </BrowserRouter>
                        
                    </div>
        )
    }
}

export default connect(mappers.mapStateToProps, mappers.mapDispatchToProps)(App);