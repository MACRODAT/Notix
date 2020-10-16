import React, {Component, CSSProperties} from 'react';
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
    NavbarText,
    ButtonToggle,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu
} from 'reactstrap';

import '../styles/navMenu.css';

interface props {
    redirecter : (s : String) => void,
    toggleTheme : () => void,
    verticalToggle : () => void,
}

interface state {
    name : '',
    password : '',
    redirect : string,
    collapsed : boolean,
}

export const noWrap =  {
    overflow: 'hidden', 
    textOverflow: 'ellipsis', 
    whiteSpace : "nowrap" ,
} as React.CSSProperties

export default class NavMenuNoLogin extends Component<props, state>{

    
    // setCollapsed =  (v : boolean) => {this.collapsed = v }/

    toggleNavbar = () => {
        this.setState( { collapsed :  !this.state.collapsed } );
        this.props.verticalToggle();
    }

    componentWillMount()
    {
        this.toggleNavbar.bind(this);

        this.setState({ redirect : ''});
        this.setState({ collapsed : true});
    }

    render()
    {

        return (

            
            <Navbar  color="dark" light expand="md">
                    <NavbarBrand className="darkTheme noDrag" href="/">SERVICE</NavbarBrand>
                    <NavbarToggler className="noDrag" onClick={this.toggleNavbar}></NavbarToggler>
                    <Collapse className="" isOpen={!this.state.collapsed}  navbar>
                        <Nav className="mr-auto darkTheme"  navbar>  
                            <NavItem>
                                <NavLink className="darkTheme noDrag" style={{  ...noWrap }} onClick={() => {
                                                        this.toggleNavbar();
                                                        this.props.redirecter("/login");
                                                    }}>SIGN IN</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="darkTheme noDrag" style={{  ...noWrap }} onClick={() =>{
                                                        this.toggleNavbar();
                                                        this.props.redirecter("/register")
                                                    }}>REGISTER</NavLink>
                            </NavItem>
                            <NavItem> 
                                <NavLink className="darkTheme noDrag" onClick={() => {
                                                        this.toggleNavbar();
                                                        this.props.redirecter("/about") 
                                                    }} >ABOUT</NavLink>
                            </NavItem>
                            <NavItem> 
                                <NavLink className="darkTheme noDrag" onClick={() => {
                                                        this.toggleNavbar();
                                                        this.props.redirecter("/todo") 
                                                    }} >TODOs</NavLink>
                            </NavItem>
                        </Nav>
                        <UncontrolledDropdown className="noDrag" setActiveFromChild>
                            <DropdownToggle tag="a" className="nav-link noLinkStyle" caret>
                                Theme
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem tag="a" onClick={() => this.props.toggleTheme()} active>Switch Theme</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>

                        <NavbarText  style={{ color: 'grey', ...noWrap }} >@2020 UND SERVICES AND TECHNOLOGIES</NavbarText>
                    </Collapse>
            </Navbar>
        );
    }

}