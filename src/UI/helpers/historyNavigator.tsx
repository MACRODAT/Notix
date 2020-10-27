import { useHistory, Redirect } from "react-router-dom"
import { useState } from "react";
import React from 'react';


class HistoryNavigator extends React.Component
{
    props = {
        goto : '',
    }
    state = {
        // myUrl : '',
    }

    setUrl(newUrl : String)
    {
        history.push(newUrl.toString());
        this.setState({urls : newUrl});
    }
    
    goto()
    {
        return (<Redirect to={this.props.goto} />);
    }

    render()
    {
        if (this.props.goto != '')
        {
            return this.goto();
        }
        return null;
    }
}

const history = Array<string>();

export default HistoryNavigator;