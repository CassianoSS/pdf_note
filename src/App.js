import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import samplePDF from './sample.pdf';
import { pdfjs } from 'react-pdf';
import { Container, Col, Row, Button, blockquote } from 'react-bootstrap';
import CustomNavbar from './custom-navbar/custom-navbar.js';
import 'bootstrap/dist/css/bootstrap.min.css';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;



export default function Test() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }
  return (
    <>
      <CustomNavbar />
      <Container>
        <Row>

          <Col className="md-auto ">
            <blockquote class="blockquote text-center">
              <p style={{ color: "#FFFF", fontSize: 16 }}>
                Page {pageNumber || (numPages ? 1 : '--')}/{numPages || '--'}
              </p>

            </blockquote>
          </Col>

          <Col className="md-auto ">
            <Button
              className="btn btn-lg"
              variant="secondary"
              type="Button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
            >
              Previous
            </Button>
            <Button
              className="btn btn-lg"
              variant="secondary"
              type="Button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
            >
              Next
            </Button>
          </Col>
        </Row>
        <Col md={{ span: 4, offset: 4 }}>
          <Document
            file={samplePDF}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        </Col>

      </Container>

    </>
  );
}






