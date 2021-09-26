import React from "react";
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';


const Styles = styled.div`
    font-weight: bold;
    height: auto;
    width: auto;    
    margin: 12px;
    padding: 12px; 
    border: 1px double #6d6d6d;
    border-radius: 5px;
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