import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { Col, Row, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus, faSearchMinus, faPenFancy, faBookOpen, faHighlighter, faBookDead, faBookmark, faPenSquare, faPencilAlt, faPencilRuler } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNumberDisplay from './components/page-number-display';
import { Layout } from '../core/layout.js';
import CustomButton from './components/custom-button';
import { faSquarespace } from '@fortawesome/free-brands-svg-icons';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const CustomPageDisplay = ({ inputPDF }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [currentScale, setCurrentScale] = useState(1.0);
    const [isHighlightActive, setisHighlightActive] = useState(true);


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

    function zoomIn() {
        setCurrentScale(currentScale => currentScale + 0.25);
    }

    function zoomOut() {
        setCurrentScale(currentScale => currentScale - 0.25);
    }

    function toggleHighlight() {
        setisHighlightActive((isHighlightActive) => !isHighlightActive);
    }

    useEffect(() => {
        if (currentScale > 2.5) {
            alert("Cannot Zoom In More");
            setCurrentScale(1.0);
        }
        else if (currentScale < 0.5) {
            alert("Cannot Zoom Out More");
            setCurrentScale(1.0);
        }

        return () => currentScale;

    }, [currentScale])


    return (
        <Layout>
            <Row>

                <ButtonToolbar aria="Toolbar with button groups">
                    <ButtonGroup className="me-2" aria-label="First group">
                        <Button
                            variant="secondary"
                            disabled={pageNumber <= 1}
                            onClick={previousPage}>
                            Previous
                        </Button>
                        <Button variant="secondary"
                            disabled={pageNumber >= numPages}
                            onClick={nextPage}>
                            Next
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup className="me-2" aria-label="Second group">
                        <Button
                            variant="outline-dark"
                            onClick={zoomOut}
                        >

                            <FontAwesomeIcon
                                icon={faSearchMinus}
                                color="white"
                            />
                        </Button>
                        <Button
                            variant="outline-dark"
                            onClick={zoomIn}
                        >
                            <FontAwesomeIcon
                                icon={faSearchPlus}
                                color="white"
                            />
                        </Button>
                        <PageNumberDisplay>
                            Page {pageNumber || (numPages ? 1 : '--')}/{numPages || '--'}
                        </PageNumberDisplay>
                        <CustomButton
                            onClick={toggleHighlight}
                            variant="outline-secondary">
                            <FontAwesomeIcon
                                icon={faHighlighter}
                                color="white"
                            />
                        </CustomButton>
                        <CustomButton
                            onClick={toggleHighlight}
                            variant="outline-secondary">
                            <FontAwesomeIcon
                                icon={faPencilRuler}
                                color="white"
                            />
                        </CustomButton>
                    </ButtonGroup>
                </ButtonToolbar>

            </Row>
            <Row>
                <center>
                    <Col>
                        <Document
                            file={inputPDF}
                            onLoadSuccess={onDocumentLoadSuccess}
                        >
                            {isHighlightActive ? (<Page pageNumber={pageNumber} scale={currentScale} />) : (<h1>click the button</h1>)}

                        </Document>
                    </Col>
                </center>
            </Row>


        </Layout>
    );
}



export default CustomPageDisplay;