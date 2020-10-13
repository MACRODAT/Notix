import React, {Component} from 'react';
import ReactDOM from 'react-dom';


import 'bootstrap/dist/css/bootstrap.min.css';

import { 
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from 'reactstrap';

import '../styles/navMenu.css';


interface props {
    redirecter : (s : String) => void
}

interface state {
    name : '',
    password : '',
    redirect : string,
    collapsed : boolean,
}

export default class NavMenuNoLogin extends Component<props, state>{

    
    // setCollapsed =  (v : boolean) => {this.collapsed = v }/

    toggleNavbar = () => this.setState( { collapsed :  !this.state.collapsed } );

    componentWillMount()
    {
        this.toggleNavbar.bind(this);

        this.setState({ redirect : ''});
        this.setState({ collapsed : true});
    }

    render()
    {

        return (

            
            <Navbar color="dark" light expand="md">
                    <NavbarBrand className="darkTheme" href="/">SERVICE</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar}></NavbarToggler>
                    <Collapse isOpen={!this.state.collapsed}  navbar>
                        <Nav className="mr-auto darkTheme" navbar>  
                            <NavItem>
                                <NavLink className="darkTheme" onClick={() => {
                                                        this.toggleNavbar();
                                                        this.props.redirecter("/login");
                                                    }}>SIGN IN</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="darkTheme" onClick={() =>{
                                                        this.toggleNavbar();
                                                        this.props.redirecter("/register")
                                                    }}>REGISTER</NavLink>
                            </NavItem>
                            <NavItem> 
                                <NavLink className="darkTheme" onClick={() => {
                                                        this.toggleNavbar();
                                                        this.props.redirecter("/about") 
                                                    }} >ABOUT</NavLink>
                            </NavItem>
                            <NavItem> 
                                <NavLink className="darkTheme" onClick={() => {
                                                        this.toggleNavbar();
                                                        this.props.redirecter("/todo") 
                                                    }} >TODOs</NavLink>
                            </NavItem>
                        </Nav>
                        <NavbarText  style={{color: 'white'}} >@2020 UND SERVICES AND TECHNOLOGIES</NavbarText>
                    </Collapse>
            </Navbar>
        );
    }

}