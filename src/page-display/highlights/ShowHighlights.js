import React, { useEffect } from "react";

function ShowHighlights({ highlights, width, height, pageNumber, isActive }) {
  useEffect(() => {
    // class="react-pdf__Page__canvas"
    var c = document.getElementById("highlightCanvas");
    var ctx = c.getContext("2d");
    // Clear the canvas
    ctx.clearRect(0, 0, c.width, c.height);
    highlights.map((highlight) => (highlight.draw = false));
  }, [pageNumber]);

  useEffect(() => {
    var c = document.getElementById("highlightCanvas");
    var ctx = c.getContext("2d");
    c.onwheel = function (event) {
      event.preventDefault();
    };
    var rect = c.getBoundingClientRect();
    var scaleX = c.width / rect.width;
    var scaleY = c.height / rect.height;

    // Draw all highlights on canvas

    if (isActive) {
      highlights
        .filter(
          (highlight) => highlight.pageNumber === pageNumber && !highlight.draw
        )
        .map((highlight) => {
          highlight.draw = true;
          var position = highlight.position;
          var x1 = (position[0] - rect.left) * scaleX;
          var x2 = (position[2] - rect.left) * scaleX;
          var y1 = (position[1] - rect.top) * scaleY;
          var y2 = (position[3] - rect.top) * scaleY;
          ctx.globalAlpha = 0.4; // Opacity
          ctx.fillStyle = highlight.color; // rectangle color
          ctx.fillRect(x1, y1, x2 - x1, y2 - y1); // fill rectangle
        });
    }
  }, [highlights, pageNumber, isActive]);

  return (
    <canvas
      id="highlightCanvas"
      className="highlights"
      width={width}
      height={height}
    ></canvas>
  );
}

export default ShowHighlights;
