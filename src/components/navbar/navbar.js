import React from 'react';
// NavLink is native to react dom and we're renamming it as RRNavLink
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import './navbar.scss';

class navbar extends React.Component {
  state = {
    isOpen: false,
  };

  render() {
    const { isAuthed, logoutClickEvent } = this.props;
    const buildNavbar = () => {
      if (isAuthed) {
        return (
          <Nav className='ml-auto' navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to='/friends'><i className="fas fa-user-friends fa-2x"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/articles'><i className="fas fa-newspaper fa-2x"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/events'><i className="fas fa-calendar-alt fa-2x"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/messages'><i className="fas fa-comments fa-2x"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/weather'><i className="fas fa-sun fa-2x"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={logoutClickEvent}><i className="fas fa-sign-out-alt fa-2x"></i></NavLink>
            </NavItem>
          </Nav>
        );
      }
      return <Nav className='ml-auto' navbar />;
    };

    return (
      <div className="my-navbar">
      <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">React Nutshell</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {buildNavbar()}
          </Collapse>
        </Navbar>

      </div>
    );
  }
}

export default navbar;
