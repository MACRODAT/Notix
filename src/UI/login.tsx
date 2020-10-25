import React, {Component, useState, useEffect} from 'react';
import ReactDOM  from 'react-dom';
import { Link, Redirect } from 'react-router-dom';

import { Form, FormGroup, Label,
    Input, Col, Button,
} from 'reactstrap'; 

import './styles/forms.css';
import { user } from './store/core/core';
import { setLogin } from './store/Actions/actionCreator';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        session : state.user
    }
}

const mapDispatchToProps = dispatch => (
    {
        meSetLogin : (user : user) => dispatch(setLogin(user.userID, user.name, user.password))
    }
)

const Login = ({session, meSetLogin}) => {

    const [identifier, setIdentifier] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [erro, setErro] = useState(''); 
    console.log(session.user.name);
    const [redirect, setRedirect] = useState(''); 

    const redStyle = {
        'color' : 'red'
    }

    useEffect(() => {
      return () => {
        setErro(session.user.name === 'loginError' ? ('Login error.') : (''));
      };
    }, [identifier]);

    useEffect(() => {
      return () => {
        // alert('');
      };
    }, [password])

    const sendData = () =>
    {
        const user_ = {
            userID : '',
            name : identifier,
            password : password,
        }
        // verify login
        meSetLogin(user_);
    }

    if (redirect !== '')
    {
            return <Redirect to={redirect} />;
    }

    if (session !== null && session.isLoggedIn)
    {
        // redirect home ! we are signed in
        setRedirect('/');
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
                            value={identifier.toString()}
                            onChange={(e:any) => setIdentifier(e.target.value)}
                         />
                    </Col>
                </FormGroup>
                <FormGroup row hidden={identifier.length < 3}>
                    <Label size="lg" sm={4} for="password">Pass Phrase</Label>
                    <Col>
                        <Input sm={8} bsSize="lg"  
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="" 
                            value={password.toString()}
                            onChange={(e:any) => setPassword(e.target.value)}
                         />
                    </Col>
                </FormGroup>
                {
                    erro !== '' ? 
                    (
                        <FormGroup>
                            <Label className="error text-danger">Error : { erro }</Label>
                        </FormGroup>
                    )
                    : null
                }
                <Link to='/register' className="fixed-bottom m-2 p-1">No account ? Join us now.</Link> <br />
                <Button size="lg" onClick={sendData}  color="primary">SIGN IN</Button>
            </Form>
            <br />
            <Link to='/' className="biggerText fixed-bottom m-2 my-5  p-1 float-right">[-] Go back home.</Link>
        </div>
    );
}


export default connect(mapStateToProps, mapDispatchToProps) (Login);