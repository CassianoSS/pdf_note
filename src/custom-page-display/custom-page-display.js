import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { Container, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNumberDisplay from './components/page-number-display.js'; 
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const CustomPageDisplay = ({ inputPDF }) => {
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

        <Container>

            {/* <Col className="md-auto ">
                <blockquote class="blockquote text-center">
                    <p style={{ color: "black", fontSize: 16 }}>
                        Page {pageNumber || (numPages ? 1 : '--')}/{numPages || '--'}
                    </p>
                </blockquote>
            </Col> */}

            <PageNumberDisplay>
                Page {pageNumber || (numPages ? 1 : '--')}/{numPages || '--'}
            </PageNumberDisplay>



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

            <Col md={{ span: 4, offset: 4 }}>
                <Document
                    file={inputPDF}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page pageNumber={pageNumber} />
                </Document>
            </Col>

        </Container>
    );
}



export default CustomPageDisplay;