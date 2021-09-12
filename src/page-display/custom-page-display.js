import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { Col, Row, Button, ButtonGroup, ButtonToolbar, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus, faSearchMinus, faHighlighter, faPencilRuler } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNumberDisplay from './components/page-number-display';
import ShowHighlights from './highlights/ShowHighlights.js';
import { Layout } from '../core/layout.js';
import CustomButton from './components/custom-button';
import { Highlight } from './highlights/Highlight';
import AreaHighlight from './highlights/AreaHighlight';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const CustomPageDisplay = ({ inputPDF }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [currentScale, setCurrentScale] = useState(1.0);
    const [isHighlightActive, setisHighlightActive] = useState(false);
    const [isAreaHighlightActive, setisAreaHighlightActive] = useState(false);
    const [pageHeight, setpageHeight] = useState(596);
    const [pageWidth, setpageWidth] = useState(842)
    const [highlights, sethighlights] = useState([{
        id: 111,
        color: 'blue',
        position: {
            x1: 0,
            x2: 30,
            y1: 0,
            y2: 30
        }
    }]);

    function addHighlight(rectPosition = {}, area = false) {
        if (!area) {
            // Get a selection
            const textSelected = window.getSelection();
            const getRange = textSelected.getRangeAt(0);
            // Get the text position on screen 
            rectPosition = getRange.getBoundingClientRect().toJSON();
        }
        sethighlights({ highlights: [...highlights, Highlight(pageNumber, rectPosition)] })
    }


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

    function toggleAreaHighlight() {
        if(isHighlightActive){
            toggleHighlight();
        }
        setisAreaHighlightActive((isAreaHighlightActive) => !isAreaHighlightActive);
    }

    // Function to take height and width of page
    function onPageLoad({ height, width }) {
        setpageHeight(height);
        setpageWidth(width);
    }

    useEffect(() => {
        if (isAreaHighlightActive && isHighlightActive) {
            setisHighlightActive(false);
            setisAreaHighlightActive(false);
        }
        if (currentScale > 2.5) {
            alert("Cannot Zoom In More");
            setCurrentScale(1.0);
        }
        else if (currentScale < 0.5) {
            alert("Cannot Zoom Out More");
            setCurrentScale(1.0);
        }

        return () => currentScale;

    }, [currentScale, isHighlightActive])


    return (
        <Layout>
            <Row>

                <ButtonToolbar aria="Toolbar with button groups">
                    <ButtonGroup className="me-2 justify-content-between" aria-label="First group">
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
                        <CustomButton
                            onClick={toggleHighlight}
                            variant="outline-secondary">
                            <FontAwesomeIcon
                                icon={faHighlighter}
                                color="white"
                            />
                        </CustomButton>
                        <CustomButton
                            onClick={toggleAreaHighlight}
                            variant="outline-secondary">
                            <FontAwesomeIcon
                                icon={faPencilRuler}
                                color="white"
                            />
                        </CustomButton>
                        

                    </ButtonGroup>
                    <PageNumberDisplay>
                            Page {pageNumber || (numPages ? 1 : '--')}/{numPages || '--'}
                        </PageNumberDisplay>
                    <Col md={2}>
                        {
                            (function () {
                                if (!isHighlightActive && !isAreaHighlightActive) {
                                    return (
                                        <>
                                            <Alert variant="secondary">
                                                Nothing is happening
                                            </Alert>
                                        </>
                                    );
                                }
                                else if (isHighlightActive && !isAreaHighlightActive) {
                                    return (
                                        <>
                                            <Alert variant="secondary">
                                                Highlight is active
                                            </Alert>
                                        </>
                                    );
                                }
                                else if (!isHighlightActive && isAreaHighlightActive) {
                                    return (
                                        <>
                                            <Alert variant="secondary">
                                                Area Highlight is active
                                            </Alert>
                                        </>
                                    );
                                }
                            })()


                        }
                    </Col>

                </ButtonToolbar>


            </Row>
            <Row>
                <center>
                    <Col>
                        <Document
                            file={inputPDF}
                            onLoadSuccess={onDocumentLoadSuccess}
                        >
                            <ShowHighlights
                                highlights={highlights}
                                width={pageWidth}
                                height={pageHeight}
                                pageNumber={pageNumber}
                            />

                            {(function () {
                                if (!isHighlightActive && !isAreaHighlightActive) {
                                    return (
                                        <>
                                            <Page
                                                onLoadSuccess={onPageLoad}
                                                pageNumber={pageNumber}
                                                scale={currentScale} />

                                        </>
                                    );
                                } else if (isHighlightActive && !isAreaHighlightActive) {
                                    return (
                                        <>
                                            <Page
                                                onLoadSuccess={onPageLoad}
                                                pageNumber={pageNumber}
                                                scale={currentScale}
                                                onMouseUp={event => window.getSelection().toString() !== '' ? addHighlight() : null}
                                            />

                                        </>
                                    );
                                } else if (!isHighlightActive && isAreaHighlightActive) {
                                    return (
                                        <>
                                            <>
                                                <AreaHighlight
                                                    width={pageWidth}
                                                    height={pageHeight}
                                                    addHighlight={addHighlight}
                                                    pageNumber={pageNumber}
                                                    areaModeClick={isAreaHighlightActive} />
                                            </>
                                            <>
                                                <Page
                                                    onLoadSuccess={onPageLoad}
                                                    pageNumber={pageNumber}
                                                    scale={currentScale} />
                                            </>

                                        </>
                                    );
                                }
                            })()
                            }

                        </Document>
                    </Col>
                </center>
            </Row>


        </Layout>
    );
}



export default CustomPageDisplay;