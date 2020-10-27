import React, {Component, CSSProperties, Fragment} from 'react';
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

export default class NavMenuWithLogin extends Component<props, state>{

    
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

    menus : {[title : string] : string} = {
        'ACCOUNT' : '/account',
        'TODO' : '/todo',
        'DOCS' : '/docs',
        'SIGNOUT' : '/signout', 
    }
    
    getMenus()
    {
        return (
                <Fragment>
                    {
                        Object.keys(this.menus).map(key =>
                        {
                            // iterate over menus and set up navs
                            return (
                                <NavItem>
                                    <NavLink className="darkTheme noDrag" style={{  ...noWrap }} onClick={() => {
                                                            this.toggleNavbar();
                                                            this.props.redirecter(key);
                                                        }}>{key}</NavLink>
                                </NavItem>
                            )
                        })
                    }
                </Fragment>

        );
       
    }

    render()
    {

        return (

            
            <Navbar  color="dark" light expand="md">
                    <NavbarBrand className="darkTheme noDrag" href="/">SERVICE</NavbarBrand>
                    <NavbarToggler className="noDrag" onClick={this.toggleNavbar}></NavbarToggler>
                    <Collapse className="" isOpen={!this.state.collapsed}  navbar>
                        <Nav className="mr-auto darkTheme"  navbar>  
                            {
                                this.getMenus()
                            }
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