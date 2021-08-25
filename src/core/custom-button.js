import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const Styles = styled.div`

  
`;

const CustomButton = (props) => (
  <Styles>
    <Button>
      {props.children}
    </Button>
  </Styles>
)

export default CustomButton;