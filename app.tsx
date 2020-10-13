import React from 'react';

import './UI/styles/app.css';
import * as theming from './UI/theming/theming';

import NavMenuNoLogin from './UI/navs/navMenuNoLogin';

class App extends React.Component {

    state = {
        goto : '',
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
    }

    componentWillMount()
    {
        this.applyTheme('dark');
    }

    render()
    {
        return (
            <div className="content">
                <NavMenuNoLogin redirecter={(path) => this.goto(path)} />
            </div>
        )
    }
}

export default App;