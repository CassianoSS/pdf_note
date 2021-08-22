import React, { Component } from "react";
import styled from "styled-components";
import { Container, Navbar } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

class CustomNavbar extends Component {

    render() {
        return(
            <Navbar className={ this.props.className }>
            <Container>
              <Navbar.Brand>
                PDF-Project
              </Navbar.Brand>
            </Container>
          </Navbar>
        );
    }
}

const StyledCustomNavbar = styled(CustomNavbar)`
    background-color: darkslategrey;
`;

export default StyledCustomNavbar;