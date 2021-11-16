import React from 'react';
import { Col } from 'react-bootstrap';
import { Document, Page } from 'react-pdf';
import ShowHighlights from '../highlights/ShowHighlights';
import AreaHighlight from '../highlights/AreaHighlight';

function PageDisplay({
    inputPDF,
    onDocumentLoadSuccess,
    highlights,
    pageWidth,
    pageHeight,
    showActiveHighlight,
    pageNumber,
    currentScale,
    isHighlightActive, 
    isAreaHighlightActive, 
    onPageLoad, 
    addHighlight
}) {
    return (
        <>
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
                            isActive={showActiveHighlight}
                            scale={currentScale}
                        />
                        {
                            (function () {
                                if (!isHighlightActive && !isAreaHighlightActive) {
                                    return (
                                        <>
                                            <Page
                                                className="page"
                                                onLoadSuccess={onPageLoad}
                                                pageNumber={pageNumber}
                                                scale={currentScale} />
                                        </>
                                    );
                                } else if (isHighlightActive && !isAreaHighlightActive) {
                                    return (
                                        <>
                                            <Page
                                                className="page"
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
                                                    className="page"
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
        </>
    );
}

export default PageDisplay;