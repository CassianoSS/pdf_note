import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar {
    background-color: #222;
    width: 100vw;
    
  }

  a, .navbar-brand, .navbar-nav .nav-link {
    color: #bbb;
    padding-left: 5%;

    &:hover {
      color: white;
    }
  }
`;

const CustomNavbar = () => (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand href="/">PDF Note</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles >
)

export default CustomNavbar;