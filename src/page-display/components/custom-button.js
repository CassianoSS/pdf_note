import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const Styles = styled(Button)`

  
`;

const CustomButton = (variant, onclick, props) => (
  <Styles>    
      {props.children}    
  </Styles>
)

export default CustomButton;