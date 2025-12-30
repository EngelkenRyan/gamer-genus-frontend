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

// Define types for props and state
type NavbarProps = {
    token: string;
    clearToken: () => void;
};

// Define types for component state
type NavbarVars = {
    isOpen: boolean;
};

// Navigation component for app navigation
class Navigation extends React.Component<NavbarProps, NavbarVars> {
    constructor(props: NavbarProps) {
        super(props);
        this.state = {
            isOpen: false, 
        };
    }

    // Toggle the navbar for mobile view
    toggle = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen,
        }));
    };

    // Handle navigation link clicks to close navbar on mobile
    handleNavClick = () => {
        if (window.innerWidth <= 768) {
            this.setState({ isOpen: false });
        }
    };

    // Render the Navigation component
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
                            this.handleNavClick(); 
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
