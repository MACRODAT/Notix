import React, {Component} from 'react';
import ReactDOM  from 'react-dom';

import { Form, FormGroup, Label,
    Input, Col, Button,
} from 'reactstrap'; 

import axios from 'axios';

import globals from './helpers/globals';
import { Route, Redirect, Link } from 'react-router-dom';
import './styles/forms.css';

export default class Register extends Component {

    state = {
        identifier : String,
        password : String,
        email : String,
        goto : String,
        userNameTaken : false,
    }

    redStyle = {
        'color' : 'red'
    }    

    componentWillMount()
    {
        this.setState({identifier : ''});
        this.setState({password : ''});
        this.setState({email : ''});
        this.setState({userNameTaken : false});
        this.setState({goto : ''});

        this.onIDChange.bind(this);
        this.onPASSChange.bind(this);
        this.validatePass.bind(this);
        this.onEmailChange.bind(this);
    }

    onIDChange(e:any)
    {
        var v = String("");
        v = e.target.value;
        v = v.toUpperCase();
        
        var user = {
            name : v
        }     

        axios.post(globals.baseURL + '/' + globals.userURL + '/isUsernameTaken', user).then ( res => {
            if (res.status == 200)
            {   
                // redirect to register successfull page
                this.setState(  { userNameTaken : res.data.exist })
            }
        });
        
        this.setState({ identifier : v});
    }
    
    onPASSChange(e:any)
    {
        var v = String("");
        v = e.target.value;
        v = v.toUpperCase(); 
        
        this.setState({ password : v});
    }

    validatePass() :  {result : boolean, reason : string}
    {
        // check pass phrase 
        // 
        if (this.state.password.length < 8)
        {
            return {
                result : false,
                reason : 'Length must be at least 8 characters.'
            };
        }

        var spaceRegex = /\s+/;
        if (spaceRegex.test(this.state.password.toString()))
        {
            return {
                result : false,
                reason : 'White space and tabulations are not allowed.'
            };
        }

        var passRegex = /^(?=.*\W)(?=.*\d)[a-zA-Z\d\W]{8,}$/;

        if (!passRegex.test(this.state.password.toString()))
        {
            return {
                result : false,
                reason : 'There should be at least one special character.'
            };
        }

        return {result : true, reason : ''};
    }

    validateEmail() : {result : boolean , reason : string}
    {
        // check email
        var emailRegex = /^[a-zA-Z0-9]{3,}@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}$/;
        if (! emailRegex.test(this.state.email.toString()))
        {
            return {
                result : false,
                reason : 'Invalid email. Valid format : SOMEONE@PLACE.COM'
            }
        }
        return {
            result : true,
            reason : ''
        };
    }


    onEmailChange(e:any)
    {
        var v = String("");
        v = e.target.value;
        this.setState({ email : v});
    }

    sendData()
    {
        // some checks TODO

        const HEADERS = {
            'Content-Type' : 'application/json'
        }
        const user = {
            name : this.state.identifier,
            password : this.state.password,
            email : this.state.email,
            account_created : '',
            picture : '',
        }
        axios.post(globals.baseURL + '/' + globals.userURL + '/register', user).then ( res => {
            console.log(res.status);
            if (res.status == 200)
            {   
                // redirect to register successfull page
                this.setState(  { goto :  'registerSuccess' })
            }
        });
    }

    render()
    {
        if (this.state.goto.toString() != '')
        {  
            return <Redirect to={this.state.goto.toString()} />
        }

        return (
            <div className="keepSmall">
                <Form>
                    <FormGroup row>
                        <Label size="lg" xs={12} sm={12} for="ide"><b>Identifier</b></Label>
                        <Col>
                            <Input xs={12} sm={12} bsSize="lg"  
                                type="text" 
                                name="ide" 
                                id="ide" 
                                placeholder="ID" 
                                value={this.state.identifier.toString()}
                                onChange={(e:any) => this.onIDChange(e)}
                             />
                        </Col>
                        {
                            this.state.userNameTaken === true ? 
                            <Label style={this.redStyle} size="lg" xs={12} sm={12} for="ide"><b>Username is taken.</b></Label>
                            :
                            null
                        }
                    </FormGroup>
                    <FormGroup row hidden={this.state.identifier.length < 3 || this.state.userNameTaken}>
                        <Label size="lg" sm={12} for="password">Pass Phrase</Label>
                        <Col>
                            <Input sm={8} bsSize="lg"  
                                type="password" 
                                name="password" 
                                id="password" 
                                placeholder="" 
                                value={this.state.password.toString()}
                                onChange={(e:any) => this.onPASSChange(e)}
                             />
                        </Col>
                        <Label style={this.redStyle} size="lg" sm={12} for="">{this.validatePass()['reason']}</Label>
                    </FormGroup>
                    <FormGroup row hidden={!this.validatePass()['result']}>
                        <Label size="lg" sm={4} for="email">Email</Label>
                        <Col>
                            <Input sm={8} bsSize="lg"
                                type="text"
                                name="email"
                                id="email"
                                placeholder="@E"
                                value={this.state.email.toString()}
                                onChange={(e : any) => this.onEmailChange(e)}
                            />

                        </Col>
                        <Label style={this.redStyle} size="lg" sm={12} for="">{this.validateEmail()['reason']}</Label>
                    </FormGroup>
                    <div  className="row">
                        <Button size="lg" 
                            className="col-12"
                            onClick={this.sendData.bind(this)} hidden={!this.validateEmail()['result']} color="primary">Register</Button>
                    </div>
                    <div className="row fixed-bottom w-50 m-auto align-center">
                        <hr className="row col-12 bg-secondary" />
                        <div className="row">
                            <Label className="col-12 text-secondary text-center">
                                By clicking on "Register", you acknowledge having read and accepted our <Link to="/terms">Conditions and terms of usage.</Link>
                            </Label>
                        </div>
                    </div>
                </Form>
                
            </div>
        );
    }
}