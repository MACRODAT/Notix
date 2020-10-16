import React, {Component} from 'react';
import ReactDOM  from 'react-dom';
import { Link, Redirect } from 'react-router-dom';

import { Form, FormGroup, Label,
    Input, Col, Button,
} from 'reactstrap'; 

import axios, { AxiosResponse } from 'axios';
import globals from './helpers/globals';
import './styles/forms.css';

class Login extends React.Component {

    
    state = {
        identifier : '',
        password : '',
        erro : '',
        redirect : '',
    }

    redStyle = {
        'color' : 'red'
    }

    token = this.context;

    componentWillMount()
    {
        this.setState({identifier : ''});
        this.setState({password : ''});
        this.setState({erro : 'Uniquex'});
        this.setState({redirect : ''});
        // this.setState({ setAuthTokens : false});

        this.onIDChange.bind(this);
        this.onPASSChange.bind(this);

        this.sendData.bind(this);
        console.log(this.token);
        // this.context = useContext(AuthContext);
        // this.setAuthTokens = this.context.setAuthTokens;
    }

    onIDChange(e:any)
    {
        var v = String("");
        v = e.target.value;
        v = v.toUpperCase(); 
        
        this.setState({ identifier : v});
    }
    
    onPASSChange(e:any)
    {
        var v = String("");
        v = e.target.value;
        v = v.toUpperCase(); 
        
        this.setState({ password : v});
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
            
        }
        let self = this;
        axios.post(globals.baseURL + '/' + globals.userURL + '/login', user).then (function( res : AxiosResponse) {
            console.log(res.status);
            
            self.setState({ erro : "NO USERNAME / PASSWORD MATCH."});
            if (res.status == 200)
            {   
                // redirect to register successfull page
                var token = {
                    name : res.data.name,
                    expiresIn : res.data.expiresIn,
                    dateCreated : Date.now(),
                }
                console.log(self.token);
                self.context.setAuthTokens(token);
                // redirect home !
                self.setState({redirect : '/'})
            }
            if (res.status == 430)
            {   
                // redirect to register successfull page
                self.setState({ erro : "NO USERNAME / PASSWORD MATCH."});
            }
        }.bind(this) ).catch(error => {
            console.log(error);
            this.setState({ erro : "NO USERNAME / PASSWORD MATCH."});
            if (error.status == 430)
            {   
                // redirect to register successfull page
                this.setState({ erro : "NO USERNAME / PASSWORD MATCH."});
            }
        });
    }

    render()
    {
        if (this.state.redirect != '')
        {
            return <Redirect to={this.state.redirect} />;
        }

        return (
            <div className="keepSmall">
                <Form>
                    <FormGroup row>
                        <Label size="lg" xs={12} sm={4} for="ide"><b>Identifier</b></Label>
                        <Col>
                            <Input xs={12} sm={8} bsSize="lg"  
                                type="text" 
                                name="ide"
                                id="ide"
                                placeholder="ID"
                                value={this.state.identifier.toString()}
                                onChange={(e:any) => this.onIDChange(e)}
                             />
                        </Col>
                    </FormGroup>
                    <FormGroup row hidden={this.state.identifier.length < 3}>
                        <Label size="lg" sm={4} for="password">Pass Phrase</Label>
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
                    </FormGroup>
                    <FormGroup>
                        <Label className="error">Error : { this.state.erro }</Label>
                    </FormGroup>
                    <Link to='/register' className="fixed-bottom m-2 p-1">No account ? Join us now.</Link> <br />
                    <Button size="lg" onClick={this.sendData.bind(this)}  color="primary">SIGN IN</Button>
                </Form>
                <br />
                <Link to='/' className="biggerText fixed-bottom m-2 my-5  p-1 float-right">[-] Go back home.</Link>
            </div>
        );
    }
}


export default Login;