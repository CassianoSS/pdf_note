import React from "react";
import styled from "styled-components";


const Styles = styled.button`
  background: ${(props) => (props.isActive ? "#424242" : "#8d8d8d")};
  border: none;
  padding: 0.5rem 0.7rem;
  border-radius: 0.7rem;
  margin: 0.3rem;
  color: white;
`;

const Labels = (props) => (
  <Styles onClick={props.onClick}>
    <a> {props.children}</a>
  </Styles>
);

export default Labels;
