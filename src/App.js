import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import samplePDF from './sample.pdf';
import { pdfjs } from 'react-pdf';
import { Container, Col, Navbar } from 'react-bootstrap';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;



export default function Test() {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            PDF-Project
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container fluid className="bg-dark">
        <Col md={{ span: 4, offset: 4 }}>
          <Document
            file={samplePDF}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(
              new Array(numPages),
              (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                />
              ),
            )}
          </Document>


        </Col>
      </Container>
    </>
  );
}






