import React, { useState, useEffect } from "react";
import CustomButton from "./custom-button";
// import Labels from "./labels-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Button,
  Modal,
  OverlayTrigger,
  Form,
  Tooltip,
} from "react-bootstrap";
import styled from "styled-components";
import DropdownTypes from "./dropdown-types";

const CustomCard = styled(Card)`
  margin: 5rem -2rem;
  background: #cfcfcf;
  height: 15rem;
  /* display: flex; */
`;

const PlusButton = styled.button`
  padding: 0.5rem;
  border-radius: 0.7rem;
  float: right;
  background-color: #9e9e9e;
  border: none;
  &active,
  &focus,
  &:hover {
    background-color: #424242;
  }
`;

const Labels = styled(Button)`
  /* background: ${(props) => (props.isActive ? "#424242" : "#8d8d8d")}; */

  border: none;
  padding: 0.5rem 0.7rem;
  border-radius: 0.7rem;
  margin: 0.3rem;
`;

const CustomModal = styled(Modal)`
  background: #9e9e9e;
`;

function addNewLabel(label, type, labels, changeLabels) {
  const hexNumber = (Math.random() * 0xffffff * 1000000)
    .toString(16)
    .toUpperCase();
  const randomColor = "#" + hexNumber.slice(0, 6);
  const data = { tag: label, color: randomColor, type };

  console.log(label, labels);
  if (Object.keys(labels).includes(label)) {
    alert("This label is already registered!");
    return;
  }
  changeLabels(data);
}

function CardLabels({ labels, setLabel, changeLabels }) {
  const [newLabelModal, setNewLabelModal] = useState(false);
  const [newLabel, setNewLabel] = useState("label");
  const [typeLabel, setTypeLabel] = useState("Geral");
  const [typeLabels, setTypeLabels] = useState([]);
  const [filteredLabels, setFilteredLabels] = useState({});

  useEffect(() => {
    var newFilteredLabels = Object.entries(labels).filter(
      ([key, value]) =>
        value.type === typeLabel ||
        value.type === "Geral" ||
        typeLabel === "Geral"
    );
    setFilteredLabels(Object.fromEntries(newFilteredLabels));
    var newTypesLabels = [...typeLabels];
    Object.values(labels).forEach((element) => {
      if (!newTypesLabels.includes(element.type))
        newTypesLabels.push(element.type);
    });
    setTypeLabels(newTypesLabels);
  }, [labels, typeLabel]);

  return (
    <>
      <Col md={4}>
        <CustomCard>
          <Card.Header as="h3">
            <Row>
              <Col style={{ display: "flex", margin: "auto 0rem" }}>
                Labels
                <DropdownTypes
                  types={typeLabels}
                  setTypeLabel={setTypeLabel}
                  selectedType={typeLabel}
                />
              </Col>
              <Col md={4}>
                <OverlayTrigger
                  overlay={<Tooltip id="tooltip-disabled">Add Label</Tooltip>}
                >
                  <PlusButton onClick={() => setNewLabelModal(true)}>
                    <FontAwesomeIcon icon={faPlus} color="white" size="sm" />
                  </PlusButton>
                </OverlayTrigger>
              </Col>
            </Row>
            <Modal
              show={newLabelModal}
              centered
              size="lg"
              onClose={() => setNewLabelModal(false)}
              onHide={() => setNewLabelModal(false)}
            >
              <Modal.Header style={{ background: "#bdbdbd" }} closeButton>
                <Modal.Title>Add New Label</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ background: "#bdbdbd" }}>
                <Row>
                  <Col md={4}>
                    <h5>Label</h5>
                    <Form.Control
                      type="text"
                      as="input"
                      size="sm"
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      placeholder="Enter label"
                      style={{ background: "#bdbdbd" }}
                    />
                  </Col>
                  <Col>
                    <h5 style={{ marginLeft: "0.9rem" }}>Types</h5>
                    <DropdownTypes
                      types={typeLabels}
                      setTypeLabel={setTypeLabel}
                      selectedType={typeLabel}
                      text="Type of File"
                    />
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer style={{ background: "#bdbdbd" }}>
                <Labels
                  variant="secondary"
                  onClick={() => {
                    setNewLabelModal(false);

                    addNewLabel(newLabel, typeLabel, labels, changeLabels);
                  }}
                >
                  Done
                </Labels>
              </Modal.Footer>
            </Modal>
          </Card.Header>
          <Card.Body>
            {Object.keys(filteredLabels).map((label) => (
              <Labels
                variant="dark"
                style={{ color: labels[label]["color"] }}
                onClick={() => {
                  setLabel(label);
                }}
              >
                {label}
              </Labels>
            ))}
          </Card.Body>
        </CustomCard>
      </Col>
    </>
  );
}

export default CardLabels;
