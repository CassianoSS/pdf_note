import { Dropdown, DropdownButton } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Col, Row, Form } from "react-bootstrap";

const CustomDropdown = styled(Dropdown)`
  margin-left: 0.8rem;
  /* border-radius: 1rem; */
`;

function DropdownTypes({ selectedType, setTypeLabel, types, text }) {
  const [show, setShow] = useState(true);
  return (
    <>
      <Row style={{position:""}}>
        <Col md={6} style={{ marginRight: "-1rem" }}>
          <CustomDropdown ml={2}>
            <Dropdown.Toggle
              id="dropdown-button-dark-example1"
              variant="secondary"
              style={{
                borderRadius: "0.7rem",
                backgroundColor: "#9e9e9e",
                border: "none",
              }}
            >
              {text}
            </Dropdown.Toggle>

            <Dropdown.Menu
              variant="dark"
              aria-expanded={show}
              style={{ background: "#6d6d6d" }}
            >
              {types.map((type, index) => (
                <Dropdown.Item
                  key={index}
                  active={selectedType === type}
                  onClick={() => setTypeLabel(type)}
                  style={{ background: "#8e8e8e" }}
                >
                  {type}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </CustomDropdown>
        </Col>
        <Col md={4} style={{ marginLeft: "-3rem" }}>
          {!!text && (
            <>
              {/* <h5>Custom Type</h5> */}
              <Form.Control
                type="text"
                placeholder="New File Type"
                onChange={(e) => setTypeLabel(e.target.value)}
                style={{ background: "#bdbdbd" }}
              />
            </>
          )}
        </Col>
      </Row>
    </>
  );
}

export default DropdownTypes;
