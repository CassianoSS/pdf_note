import React, { useState, useEffect } from "react";
import CustomButton from "./custom-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Button,
  Modal,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import styled from "styled-components";
import DropdownTypes from "./dropdown-types";

const CustomCard = styled(Card)`
  margin: 5rem -2rem;
  background: #9e9e9e;
  display: flex;
`;

const PlusButton = styled(CustomButton)`
  position: absolute;
  right: 0;
  padding: 0;
`;

const CustomModal = styled(Modal)`
  background: #9e9e9e;
`;

function addNewLabel({ label, type, labels, changeLabels }) {
  const hexNumber = (Math.random() * 0xffffff * 1000000)
    .toString(16)
    .toUpperCase();
  const randomColor = "#" + hexNumber.slice(0, 6);
  const data = { tag: label, color: randomColor, type };

  if (labels) {
    if (Object.keys(labels).includes(label)) {
      alert("This label is already registered!");
      return;
    } else changeLabels(data);
  }
}

function CardLabels({ labels, setLabel, changeLabels }) {
  const [newLabelModal, setNewLabelModal] = useState(false);
  const [newLabel, setNewLabel] = useState("");
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
          <Row>
            <Col>
              <Card.Header as="h5">Labels</Card.Header>
              <DropdownTypes
                types={typeLabels}
                setTypeLabel={setTypeLabel}
                selectedType={typeLabel}
              />
            </Col>
            <Col>
              <OverlayTrigger
                overlay={<Tooltip id="tooltip-disabled">Add Label</Tooltip>}
              >
                <PlusButton
                  onClick={() => setNewLabelModal(true)}

                  // style={{ pointerEvents: "none" }}
                >
                  <FontAwesomeIcon icon={faPlus} color="white" />
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
            <Modal.Header style={{background: "#757575"}} closeButton>
              <Modal.Title>Add New Label</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{background: "#757575"}}>
              <Row> 
                <Col>
                  <h5>Label</h5>
                  <input
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    placeholder="Enter label"
                    style={{background: "#bdbdbd"}}
                  />
                </Col>
                <Col>
                  <DropdownTypes
                    types={typeLabels}
                    setTypeLabel={setTypeLabel}
                    selectedType={typeLabel}
                    text="Type of File"
                  />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer style={{background: "#757575"}}>
              <CustomButton
                onClick={() => {
                  setNewLabelModal(false);
                  addNewLabel(newLabel, typeLabel, labels, changeLabels);
                }}
              >
                Save
              </CustomButton>
            </Modal.Footer>
          </Modal>
          <Card.Body>
            {Object.keys(filteredLabels).map((label) => (
              <Button onClick={() => setLabel(label)}>{label}</Button>
            ))}
          </Card.Body>
        </CustomCard>
      </Col>
    </>
  );
}

export default CardLabels;
