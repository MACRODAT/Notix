import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {
    Form, FormGroup, Label, Input, Container, Row, Col, Button, Alert, Media, Spinner
    } from 'reactstrap';
import { Redirect } from 'react-router-dom';

export default class RegisterSuccess extends Component {
    
    state = {
        goto : String,
    }

    props = {
    }

    timerDifference()
    {
        // redirect home !
        this.setState({goto : '/'})
    }

    componentWillMount()
    {
        setTimeout(this.timerDifference.bind(this), 1500);
        this.setState({goto : ''})
    }

    render()
    {
        if (this.state.goto.toString() != '')
        {  
            return <Redirect to={this.state.goto.toString()} />
        }
        
        return (
            <Container>
                <Row>
                    <div className="display-4">Database update operation successful </div>
                </Row>
                <br />
                <Row>
                    <Alert color="success">
                        <Spinner color="success" />
                        The requested transaction has been performed
                        successfuly, in a few moments you will be redirected
                        home.
                    </Alert>
                </Row>
                
            </Container>
        );
    }
}