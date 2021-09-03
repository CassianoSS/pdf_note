import React from "react";
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';


const Styles = styled.div`
    font-weight: bold;
    height: 40px;
    width: 90px;
    margin: 5px 5px 5px 5px;
    padding: 5px 5px 5px 5px; 
    border: 1px double black;
    font-size: 1.1rem;
    background-color: #424242;
    color:#bbb;

`;

const PageNumberDisplay = (props) => (

    <Styles>
        <p>
            {props.children}
        </p>
    </Styles>
);

export default PageNumberDisplay;