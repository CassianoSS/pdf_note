import React from 'react';
import CustomButton from './custom-button';
import PageNumberDisplay from './page-number-display';
import CustomStatusDisplay from './status-display';
import { Col, Row, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus, faSearchMinus, faHighlighter, faPencilRuler } from '@fortawesome/free-solid-svg-icons';

const Styles = styled(ButtonToolbar)`
    align-content: center;
    /* display: inline; */

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
    toggleShowActiveHighlight
}) {
    return (
        <>
            <Styles>
                <ButtonGroup className="me-2 justify-content-between" aria-label="First group">
                    <CustomButton
                        disabled={pageNumber <= 1}
                        onClick={previousPage}>
                        Previous
                    </CustomButton>
                    <CustomButton
                        disabled={pageNumber >= numPages}
                        onClick={nextPage}>
                        Next
                    </CustomButton>
                </ButtonGroup>
                <ButtonGroup className="me-2" aria-label="Second group">
                    <CustomButton
                        onClick={zoomOut}
                    >

                        <FontAwesomeIcon
                            icon={faSearchMinus}
                            color="white"
                        />
                    </CustomButton>
                    <CustomButton
                        onClick={zoomIn}
                    >
                        <FontAwesomeIcon
                            icon={faSearchPlus}
                            color="white"
                        />
                    </CustomButton>
                </ButtonGroup>
                <ButtonGroup>
                    <CustomButton
                        onClick={toggleIsHighlightActive}
                    >
                        <FontAwesomeIcon
                            icon={faHighlighter}
                            color="white"
                        />
                    </CustomButton>
                    <CustomButton
                        onClick={toggleisAreaHighlightActive}
                    >
                        <FontAwesomeIcon
                            icon={faPencilRuler}
                            color="white"
                        />
                    </CustomButton>
                    <CustomButton
                        onClick={toggleShowActiveHighlight}
                    >
                        Show highlights
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
                                        <PageNumberDisplay>
                                            Nothing
                                        </PageNumberDisplay>
                                    </>
                                );
                            }
                            else if (isHighlightActive && !isAreaHighlightActive) {
                                return (
                                    <>
                                        <PageNumberDisplay>
                                            Highlight is active
                                        </PageNumberDisplay>
                                    </>
                                );
                            }
                            else if (!isHighlightActive && isAreaHighlightActive) {
                                return (
                                    <>
                                        <PageNumberDisplay>
                                            Area Highlight is active
                                        </PageNumberDisplay>
                                    </>
                                );
                            }
                        })()
                    }
                </Col>
            </Styles>
        </>
    );
}

export default Toolbar;