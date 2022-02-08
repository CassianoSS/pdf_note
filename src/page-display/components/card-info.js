import React, { useState, useEffect } from "react";
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

const CustomCard = styled(Card)`
  margin: 6rem -2rem;
  background: #cfcfcf;
  height: 25rem;
  /* display: flex; */
`;

function CardInfo({ data }) {
  console.log(data);
  return (
    <>
      <CustomCard>
        <Card.Header as="h3">Info</Card.Header>
        <Card.Body>
          
        </Card.Body>
      </CustomCard>
    </>
  );
}

export default CardInfo;
