import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { Col, Row, Button, ButtonGroup, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNumberDisplay from './page-number-display.js';
import { Layout } from './Layout.js';

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

        <Layout>
            <Row>
                <Col>
                    <ButtonGroup aria-label="Basic example">
                        <PageNumberDisplay>
                            Page {pageNumber || (numPages ? 1 : '--')}/{numPages || '--'}
                        </PageNumberDisplay>
                        <Button
                            variant="secondary"
                            disabled={pageNumber <= 1}
                            onClick={previousPage}>Previous</Button>
                        <Button
                            variant="secondary"
                            disabled={pageNumber >= numPages}
                            onClick={nextPage}>Next</Button>
                    </ButtonGroup>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 4, offset: 3 }}>
                    <Document
                        file={inputPDF}
                        onLoadSuccess={onDocumentLoadSuccess}
                    >
                        <Page pageNumber={pageNumber} />
                    </Document>
                </Col>
            </Row>


        </Layout>
    );
}



export default CustomPageDisplay;