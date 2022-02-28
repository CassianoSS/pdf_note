import React, { useState, useEffect } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const CustomCard = styled(Card)`
  margin: 6rem -2rem;
  background: #cfcfcf;
  height: 25rem;
  max-height: 40rem;
  overflow-y: auto;
`;

const HighlightButton = styled(Button)`
  margin-top: 1rem;
  width: 20rem;
`;

const DeleteButton = styled(Button)`
  float: right;
  padding: 1rem 1rem;
  margin-top: 1rem;
`;

function CardInfo({ data, setData }) {
  const [modal, setModal] = useState(false);
  const [highlightSelected, setHighlightSelected] = useState({
    content: {},
    position: [],
  });
  const [newText, setNewText] = useState("");
  const [updateText, setUpdateText] = useState(false);
  const [indexHighlight, setIndexHighlight] = useState(0);

  function updateHighlight(field, newData, index) {
    const listHighlights = [...data];
    if (field === "text") {
      listHighlights[index]["content"]["text"] = newData;
    } else {
      listHighlights[index][field] = newData;
    }
    setData(listHighlights);
  }

  console.log(data);

  return (
    <>
      <CustomCard>
        <Card.Header as="h3">Info</Card.Header>
        <Card.Body>
          {data.map((highlight, index) => {
            return (
              <>
                <Row style={{ alignItems: "end" }}>
                  <Col>
                    <OverlayTrigger
                      overlay={
                        <Tooltip id="tooltip-disabled">Click For Info</Tooltip>
                      }
                    >
                      <HighlightButton
                        variant="dark"
                        key={index}
                        style={{ color: highlight.color }}
                        onClick={() => {
                          setIndexHighlight(index);
                          setHighlightSelected(highlight);
                          setModal(true);
                        }}
                      >
                        <strong>ID: {highlight.id}</strong>
                      </HighlightButton>
                    </OverlayTrigger>
                  </Col>
                  <Col>
                    <DeleteButton
                      variant="dark"
                      onClick={() =>
                        setData(data.filter((el) => highlight.id !== el.id))
                      }
                    >
                      <FontAwesomeIcon icon={faTrash} color="white" size="lg" />
                    </DeleteButton>
                  </Col>
                </Row>
              </>
            );
          })}
        </Card.Body>
        <Modal
          show={modal}
          centered
          size="lg"
          onClose={() => setModal(false)}
          onHide={() => setModal(false)}
        >
          <Modal.Header closeButton>
            <h3>ID: {highlightSelected["id"]}</h3>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <h5>Text:</h5>

                <Form.Control
                  as="textarea"
                  value={highlightSelected["content"]["text"]}
                  onChange={(e) =>
                    updateHighlight("text", e.target.value, indexHighlight)
                  }
                />

                <h5>Color:</h5>
                <Form.Control
                  value={highlightSelected["color"]}
                  //onChange={e => setNewLabel(e.target.value)}
                  disabled
                />
                <h5>Page Number:</h5>
                <Form.Control
                  value={highlightSelected["pageNumber"]}
                  disabled
                  //onChange={e => setNewLabel(e.target.value)}
                />
              </Col>
              <Col>
                <h5>Position:</h5>
                {highlightSelected["position"].map((pos) => (
                  <>
                    <Form.Control value={pos} disabled />
                    <br />
                  </>
                ))}
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </CustomCard>
    </>
  );
}

export default CardInfo;
