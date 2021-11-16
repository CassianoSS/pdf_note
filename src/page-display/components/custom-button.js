import React from 'react';
import { ToggleButton } from 'react-bootstrap';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const Styles = styled(ToggleButton)`
height: fit-content;
margin: 10px;
padding: 15px; 
border-radius: 10px;

background-color: #424242;
&:focused{
  background-color: #6d6d6d;
}
  
`;

const CustomButton = (props) => (
  <Styles
    variant="secondary"
    onClick={props.onClick}>
    <a> {props.children}</a>
  </Styles>
)

export default CustomButton;