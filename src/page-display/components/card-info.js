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
  Dropdown,
} from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import { Highlight } from "../highlights/Highlight";

const CustomCard = styled(Card)`
  margin: 6rem -2rem;
  background: #cfcfcf;
  height: 25rem;
  max-height: 250px;
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

  console.log(data);

  return (
    <>
      <CustomCard>
        <Card.Header as="h3">Info</Card.Header>
        <Card.Body>
          <p>
            {data.map((highlight, index) => {
              return (
                <>
                  <Row style={{ alignItems: "end" }}>
                    <Col>
                      <OverlayTrigger
                        overlay={<Tooltip id="tooltip-disabled">Info</Tooltip>}
                      >
                        <HighlightButton
                          variant="dark"
                          key={index}
                          style={{ color: highlight.color }}
                          onClick={() => {
                            setModal(true);
                            setHighlightSelected(highlight);
                          }}
                        >
                          {highlight.id}
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
          </p>
        </Card.Body>
      </CustomCard>

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
              {/* {console.log(highlightSelected["content"]["text"])} */}
              <h5>Text:</h5>

              <Form.Control
                value={highlightSelected["content"]["text"]}
                onChange={(e) => setNewText(e.target.value)}
                disabled
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
    </>
  );
}

export default CardInfo;
