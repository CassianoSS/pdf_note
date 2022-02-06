import { Dropdown, DropdownButton } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const CustomDropdown = styled(Dropdown)`
  margin-left: 0.5rem;
  /* border-radius: 1rem; */
`;

function DropdownTypes({ selectedType, setTypeLabel, types, text }) {
  const [show, setShow] = useState(true);
  return (
    <>
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
      {!!text && (
        <input
          placeholder="New File Type"
          onChange={(e) => setTypeLabel(e.target.value)}
          // onClick={(e) => e.preventDefault()}
          style={{ background: "#bdbdbd" }}
        />
      )}
    </>
  );
}

export default DropdownTypes;
