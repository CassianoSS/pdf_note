import { Dropdown, DropdownButton } from "react-bootstrap";
import React, { useState, useEffect } from "react";

function DropdownTypes({ selectedType, setTypeLabel, types, text }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <Dropdown ml={2}>
        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
          {text}
        </Dropdown.Toggle>

        <Dropdown.Menu variant="dark">
          {types.map((type, index) => (
            <Dropdown.Item
              key={index}
              active={selectedType === type}
              onClick={() => setTypeLabel(type)}
            >
              {type}
            </Dropdown.Item>
          ))}
          {!!text && (
            <Dropdown.Item onClick={() => setShow(true)}>
              <input
                placeholder="New File Type"
                onChange={(e) => setTypeLabel(e.target.value)}
                onClick={(e) => e.preventDefault()}
                style={{background: "#bdbdbd"}}
              />
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default DropdownTypes;