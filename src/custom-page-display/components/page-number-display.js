import React, { Component } from "react";
import styled from "styled-components";
import { Col, blockquote } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class PageNumberDisplay extends Component {
    render() {
        return (
            <div className={this.props.className}>
                <Col>
                    <blockquote className="blockquote text-center">
                        <p>
                            {this.props.children}
                        </p>
                    </blockquote>
                </Col>
            </div>);

    };
}


const StyledPageNumberDisplay = styled(PageNumberDisplay)`
    color: black; 
    font-size: 30;
    font-weight: bold;    
    padding: 1.5em;
    
`;

export default StyledPageNumberDisplay;