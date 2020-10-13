import React from 'react';

import './styles/app.css';
import * as theming from './theming/theming';

import NavMenuNoLogin from './navs/navMenuNoLogin';

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