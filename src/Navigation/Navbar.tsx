import React from 'react';
import {
    Navbar,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './navbar.css';

type NavbarProps = {
    token: string;
    clearToken: () => void;
};

type NavbarVars = {
    isOpen: boolean;
};

class Navigation extends React.Component<NavbarProps, NavbarVars> {
    constructor(props: NavbarProps) {
        super(props);
        // Initial state based on screen size
        this.state = {
            isOpen: false, // Navbar starts closed by default
        };
    }

    // Toggle navbar open/close
    toggle = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen,
        }));
    };

    // Close the navbar on mobile screens when a link is clicked
    handleNavClick = () => {
        if (window.innerWidth <= 768) {
            this.setState({ isOpen: false });
        }
    };

    render() {
        return (
            <Navbar light expand="md" className="navbar">
                <NavbarToggler onClick={this.toggle} className="navbar-toggle">
                    <span className="navbar-toggler-icon"></span>
                </NavbarToggler>

                <Collapse isOpen={this.state.isOpen} navbar className="navlinks">
                    <Nav navbar>
                        <NavItem>
                            <Link to='/' className='navbarButton' onClick={this.handleNavClick}>Home</Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/savedgamesmine' className='navbarButton' onClick={this.handleNavClick}>My Saved Games</Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/reviewmine' className='navbarButton' onClick={this.handleNavClick}>My Reviews</Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/reviewall' className='navbarButton' onClick={this.handleNavClick}>Review All</Link>
                        </NavItem>
                    </Nav>
                    <div className="logout-container">
                        <Button onClick={() => {
                            this.props.clearToken();
                            this.handleNavClick();  // Ensure navbar closes on logout
                        }} className="navbar-btn">
                            Logout
                        </Button>
                    </div>
                </Collapse>
            </Navbar>
        );
    }
}

export default Navigation;
