import React from "react";
import { Col } from "react-bootstrap";
import { Document, Page } from "react-pdf";
import ShowHighlights from "../highlights/ShowHighlights";
import AreaHighlight from "../highlights/AreaHighlight";
import styled from "styled-components";

const ScrollableDocument = styled.div`
  position: relative;
  // height: 630px;
  // overflow: auto; /* Show scrollbars */
`;

function PageDisplay({
  inputPDF,
  onDocumentLoadSuccess,
  highlights,
  pageWidth,
  pageHeight,
  // showActiveHighlight,
  pageNumber,
  // currentScale,
  isHighlightActive,
  isAreaHighlightActive,
  onPageLoad,
  addHighlight,
  color,
}) {
  
  return (
    <>
      <center>
        {/* <Col> */}
        <ScrollableDocument>
          <Document
            file={inputPDF}
            onLoadSuccess={onDocumentLoadSuccess}
            style={{
              display: "inline",
              textAlign: "center",
              alignItems: "center",
            }}

          >
            <ShowHighlights
              highlights={highlights}
              width={pageWidth}
              height={pageHeight}
              pageNumber={pageNumber}
              isActive={isHighlightActive}
              
            />
            <AreaHighlight
              width={pageWidth}
              height={pageHeight}
              addHighlight={addHighlight}
              pageNumber={pageNumber}
              color={color}
              areaModeClick={isAreaHighlightActive}
            />

            <center>
              {/* Component to take a pdf page */}
              <Page
                
                pageNumber={pageNumber}
                onMouseUp={(event) =>
                  window.getSelection().toString() !== ""
                    ? addHighlight(color)
                    : null
                }
                onLoadSuccess={onPageLoad}
              />
            </center>
          </Document>
        </ScrollableDocument>
        {/* </Col> */}
      </center>
    </>
  );
}

export default PageDisplay;
