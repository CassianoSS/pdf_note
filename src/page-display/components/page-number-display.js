import React from "react";
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';


const Styles = styled.div`
   
    p{
        font-weight: bold;
        font-size: small;        
        padding: 0px;
        color:#bbb;
        align-self: center;
        display: inline-flex;
        border: 1px double #6d6d6d;
        border-radius: 5px;    
        background-color: #424242;
        margin: 0.78rem 0.3rem;
        padding: 16px 10px ; 
        max-height: min-content;
    }


`;

const PageNumberDisplay = (props) => (

    <Styles>
        <p>
            {props.children}
        </p>
    </Styles>
);

export default PageNumberDisplay;