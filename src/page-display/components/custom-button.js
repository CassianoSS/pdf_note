import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const Styles = styled(Button)`

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