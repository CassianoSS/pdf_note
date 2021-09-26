import React from 'react';
import { Alert } from 'react-bootstrap';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const Styles = styled(Alert)`

margin: 12px;
padding: 12px; 
background-color: #424242;
border: 1px double #6d6d6d;
text-align: center;
color:#bbb;

`;

const CustomStatusDisplay = (props) => (
  <Styles
    variant="secondary"
    // onClick={props.onClick}
    >
    <p> {props.children}</p>
  </Styles>
)

export default CustomStatusDisplay;