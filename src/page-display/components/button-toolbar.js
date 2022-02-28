import React from "react";
import CustomButton from "./custom-button";
import PageNumberDisplay from "./page-number-display";
import CustomStatusDisplay from "./status-display";
import {
  OverlayTrigger,
  Tooltip,
  ButtonGroup,
  ButtonToolbar,
} from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearchPlus,
  faSearchMinus,
  faHighlighter,
  faPencilRuler,
} from "@fortawesome/free-solid-svg-icons";

const Styles = styled(ButtonToolbar)`
  align-content: center;
  /* display: inline; */
`;

const IconButton = styled.button`
  height: fit-content;
  margin: 10px;
  padding: 15px;
  border-radius: 10px;
  border: none;
  background-color: ${(props) => (props.isActive ? "#373737" : "#6d6d6d")};
  color: "white";
`;

function Toolbar({
  pageNumber,
  previousPage,
  numPages,
  nextPage,
  zoomIn,
  zoomOut,
  isHighlightActive,
  isAreaHighlightActive,
  toggleIsHighlightActive,
  toggleisAreaHighlightActive,
  toggleShowActiveHighlight,
  submit,
}) {
  return (
    <>
      <Styles>
        <ButtonGroup
          className="me-2 justify-content-between"
          aria-label="First group"
        >
          <CustomButton disabled={pageNumber <= 1} onClick={previousPage}>
            Previous
          </CustomButton>
          <CustomButton disabled={pageNumber >= numPages} onClick={nextPage}>
            Next
          </CustomButton>
        </ButtonGroup>
        <ButtonGroup className="me-2" aria-label="Second group">
        </ButtonGroup>
        <ButtonGroup>
          <OverlayTrigger
            overlay={<Tooltip id="tooltip-disabled">Highlight</Tooltip>}
          >
            <IconButton
              isActive={isHighlightActive}
              onClick={toggleIsHighlightActive}
            >
              <FontAwesomeIcon icon={faHighlighter} color="white" />
            </IconButton>
          </OverlayTrigger>

          <OverlayTrigger
            overlay={<Tooltip id="tooltip-disabled">Area Highlight</Tooltip>}
          >
            <IconButton
              isActive={isAreaHighlightActive}
              onClick={toggleisAreaHighlightActive}
            >
              <FontAwesomeIcon icon={faPencilRuler} color="white" />
            </IconButton>
          </OverlayTrigger>
        </ButtonGroup>
        <PageNumberDisplay>
          Page {pageNumber || (numPages ? 1 : "--")}/{numPages || "--"}
        </PageNumberDisplay>
        <ButtonGroup>
          <CustomButton primary onClick={() => submit()}>
            Save
          </CustomButton>
        </ButtonGroup>
      </Styles>
    </>
  );
}

export default Toolbar;
