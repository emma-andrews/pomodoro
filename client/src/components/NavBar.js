import React, { setGlobal, useGlobal } from 'reactn';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import paths from '../RouterPaths';

const cookies = new Cookies();

const NavBar = (props) => {
  const [currentUser] = useGlobal('currentUser');

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#81c3d7' /* COLOR NAVBAR */,
        textShadow: '1rem #000',
      }}
    >
      <Container>
        <Navbar bg='clear' expand='lg'>
          <Navbar.Brand href='/'>Pomodoro</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link style={{ margin: '0 0', padding: '0 0' }}>
                <NavLink
                  exact
                  to={paths.homePage}
                  className='nav-link'
                  activeClassName='active'
                >
                  Home
                </NavLink>
              </Nav.Link>
              <Nav.Link style={{ margin: '0 0', padding: '0 0' }}>
                <NavLink
                  exact
                  to={paths.settingsPage}
                  className='nav-link'
                  activeClassName='active'
                >
                  Settings
                </NavLink>
              </Nav.Link>
              <Nav.Link style={{ margin: '0 0', padding: '0 0' }}>
                <NavLink
                  exact
                  to={paths.accountPage}
                  className='nav-link'
                  activeClassName='active'
                >
                  Account
                </NavLink>
              </Nav.Link>

              {currentUser && currentUser !== null ? (
                <Nav.Link style={{ margin: '0 0', padding: '0 0' }}>
                  <NavLink
                    exact
                    to={paths.welcomePage}
                    className='nav-link'
                    onClick={() => {
                      cookies.remove('authCookie');
                      setGlobal({
                        currentUser: null,
                      });
                    }}
                  >
                    Logout
                  </NavLink>
                </Nav.Link>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
};

export default NavBar;
