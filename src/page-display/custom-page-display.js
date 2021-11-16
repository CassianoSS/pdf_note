import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { Col, Row, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus, faSearchMinus, faHighlighter, faPencilRuler } from '@fortawesome/free-solid-svg-icons';
// local imports
import ShowHighlights from './highlights/ShowHighlights.js';
import { Layout } from '../core/Layout.js';
import { Highlight } from './highlights/Highlight';
import AreaHighlight from './highlights/AreaHighlight';
import Toolbar from './components/button-toolbar';
import PageDisplay from './components/page-display.js';
import 'bootstrap/dist/css/bootstrap.min.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function CustomPageDisplay({ inputPDF }) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [currentScale, setCurrentScale] = useState(1.0);
    const [isHighlightActive, setisHighlightActive] = useState(false);
    const [isAreaHighlightActive, setisAreaHighlightActive] = useState(false);
    const [pageHeight, setpageHeight] = useState(596);
    const [pageWidth, setpageWidth] = useState(800);
    const [showActiveHighlight, setshowActiveHighlight] = useState(false);
    const [highlights, sethighlights] = useState([{
        id: 111,
        color: 'blue',
        position: {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 0
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
        sethighlights([...highlights, Highlight(pageNumber, rectPosition, 'red')])
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

    // Function to take height and width of page
    function onPageLoad({ height, width }) {
        setpageHeight(height);
        setpageWidth(width);
    }

    function toggleIsHighlightActive() {
        if (isAreaHighlightActive) {
            toggleisAreaHighlightActive();

        }
        setisHighlightActive((isHighlightActive) => !isHighlightActive);

    }

    function toggleisAreaHighlightActive() {
        if (isHighlightActive) {
            toggleIsHighlightActive();

        }
        setisAreaHighlightActive((isAreaHighlightActive) => !isAreaHighlightActive);
    }

    function toggleShowActiveHighlight() {
        setshowActiveHighlight((showActiveHighlight) => !showActiveHighlight)
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
    }, [currentScale])
    return (
        <Layout>
            <Row>
                {/* button toolbar */}
                <Toolbar
                    pageNumber={pageNumber}
                    previousPage={previousPage}
                    numPages={numPages}
                    nextPage={nextPage}
                    zoomIn={zoomIn}
                    zoomOut={zoomOut}
                    isHighlightActive={isHighlightActive}
                    isAreaHighlightActive={isAreaHighlightActive}
                    toggleIsHighlightActive={toggleIsHighlightActive}
                    toggleisAreaHighlightActive={toggleisAreaHighlightActive}
                    toggleShowActiveHighlight={toggleShowActiveHighlight}
                />
            </Row>
            {/* page display */}

            <Row>
                <PageDisplay
                    inputPDF={inputPDF}
                    onDocumentLoadSuccess={onDocumentLoadSuccess}
                    highlights={highlights}
                    pageWidth={pageWidth}
                    pageHeight={pageHeight}
                    showActiveHighlight={showActiveHighlight}
                    pageNumber={pageNumber}
                    currentScale={currentScale}
                    isHighlightActive={isHighlightActive}
                    isAreaHighlightActive={isAreaHighlightActive}
                    onPageLoad={onPageLoad}
                    addHighlight={addHighlight}
                />
            </Row>
        </Layout>
    );
}
export default CustomPageDisplay;