import React from "react";
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';


const Styles = styled.div`
    font-weight: bold;
    font-size: 12px;
    max-height: min-content;
    margin: 10px;
    padding: 10px 10px ; 
    border: 1px double #6d6d6d;
    border-radius: 5px;    
    background-color: #424242;
    color:#bbb;
    display: inline-block;



`;

const PageNumberDisplay = (props) => (

    <Styles>
        <p>
            {props.children}
        </p>
    </Styles>
);

export default PageNumberDisplay;