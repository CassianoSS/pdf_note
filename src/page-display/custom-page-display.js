import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { Col, Row, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearchPlus,
  faSearchMinus,
  faHighlighter,
  faPencilRuler,
} from "@fortawesome/free-solid-svg-icons";
// local imports
import ShowHighlights from "./highlights/ShowHighlights.js";
import { Layout } from "../core/Layout.js";
import { Highlight } from "./highlights/Highlight";
import AreaHighlight from "./highlights/AreaHighlight";
import Toolbar from "./components/button-toolbar";
import PageDisplay from "./components/page-display.js";
import CardLabels from "./components/card-labels.js";
import "bootstrap/dist/css/bootstrap.min.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function CustomPageDisplay({ inputPDF }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [currentScale, setCurrentScale] = useState(1.0);
  const [isHighlightActive, setisHighlightActive] = useState(true);
  const [isAreaHighlightActive, setisAreaHighlightActive] = useState(false);
  const [pageHeight, setpageHeight] = useState(596);
  const [pageWidth, setpageWidth] = useState(800);
  const [showActiveHighlight, setshowActiveHighlight] = useState(false);
  const [color, setColor] = useState("yellow");
  const [tag, setTag] = useState("");
  const [labels, setLabels] = useState({
    label1: { color: "yellow", type: "Geral" },
  });
  const [highlights, setHighlights] = useState([]);

  function addHighlight(color, rectPosition = {}, area = false) {
    if (!area) {
      // Get a selection
      const textSelected = window.getSelection();
      const getRange = textSelected.getRangeAt(0);
      // Get the text position on screen
      rectPosition = getRange.getBoundingClientRect().toJSON();
      textSelected.removeAllRanges();
    }

    if (checkEquals(rectPosition)) return;

    setHighlights([
      ...highlights,
      Highlight(pageNumber, rectPosition, color, tag),
    ]);
  }

  function checkEquals(rectPosition) {
    const currentPosition = [
      rectPosition.x,
      rectPosition.y,
      rectPosition.right,
      rectPosition.bottom,
    ];

    var positionsList = [];
    highlights.forEach((element) => {
      positionsList.push(element.position);
    });

    for (var i = 0; i < positionsList.length; i++) {
      var element = positionsList[i];
      var score0 = Math.abs(element[0] - currentPosition[0]);
      var score1 = Math.abs(element[1] - currentPosition[1]);
      var score2 = Math.abs(element[2] - currentPosition[2]);
      var score3 = Math.abs(element[3] - currentPosition[3]);
      var avg = (score0 + score1 + score2 + score3) / 4;

      if (avg < 5) return true;
    }

    return false;
  }

  function handleSaveToPC(jsonData) {
    const fileData = JSON.stringify(jsonData);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "filename.json";
    link.href = url;
    link.click();
  }

  function submit() {
    const data = { pages: [] };
    var pageInsert = Array(numPages).fill(-1);
    highlights.forEach((highlight) => {
      var pageNumber = highlight["pageNumber"];
      if (pageInsert[pageNumber - 1] == -1) {
        data["pages"].push({ pageNumber, highlights: [highlight] });
        pageInsert[pageNumber - 1] = data["pages"].length - 1;
      } else {
        var position = pageInsert[pageNumber - 1];
        data["pages"][position]["highlights"].push(highlight);
      }
    });
    console.log(data);
    handleSaveToPC(data);
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  function zoomIn() {
    setCurrentScale((currentScale) => currentScale + 0.25);
  }

  function zoomOut() {
    setCurrentScale((currentScale) => currentScale - 0.25);
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
    setisAreaHighlightActive((isAreaHighlightActive) => !isAreaHighlightActive);
  }

  function toggleShowActiveHighlight() {
    setshowActiveHighlight((showActiveHighlight) => !showActiveHighlight);
  }

  function handleLabel(label) {
    setTag(label);
    setColor(labels[label]["color"]);
  }

  function addNewLabel(newLabel) {
    let l = { ...labels };
    l[newLabel["tag"]] = { color: newLabel["color"], type: newLabel["type"] };
    setLabels(l);
  }

  useEffect(() => {
    if (isAreaHighlightActive && isHighlightActive) {
      setisHighlightActive(false);
      setisAreaHighlightActive(false);
    }
    if (currentScale > 2.5) {
      alert("Cannot Zoom In More");
      setCurrentScale(1.0);
    } else if (currentScale < 0.5) {
      alert("Cannot Zoom Out More");
      setCurrentScale(1.0);
    }
    return () => currentScale;
  }, [currentScale]);

  return (
    <Layout>
      <Row>
        <CardLabels
          labels={labels}
          setLabel={handleLabel}
          changeLabels={addNewLabel}
        />
        <Col md={8}>
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
            submit={submit}
          />

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
            color={color}
          />
        </Col>
      </Row>
    </Layout>
  );
}
export default CustomPageDisplay;
