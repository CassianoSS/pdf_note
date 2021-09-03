import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const Styles = styled.div`
  width: 100vw;
  min-height: 94.25vh;
  max-height: fit-content;


  background-color: #424242;
  
`;

export const Layout = (props) => (
  <Styles>
    <Container>
      {props.children}
    </Container>
  </Styles>
)
