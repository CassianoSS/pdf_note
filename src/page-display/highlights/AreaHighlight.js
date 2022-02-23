import React, { useEffect, useState } from "react";

function getPosition(canvas) {
  var rect = canvas.getBoundingClientRect();
  var scaleX = canvas.width / rect.width;
  var scaleY = canvas.height / rect.height;

  return { "left": rect.left, "top": rect.top, scaleX, scaleY }
}

export default function AreaHighlight(props) {
  // const [areaMode, setAreaMode] = useState(false);

  const { addHighlight, color, height, pageNumber, width, areaModeClick } = props;

  // Get the ctrl press and set the area mode
  // document.addEventListener('keydown', e => e.ctrlKey ? setAreaMode(!areaMode) : '');
  const refColor = React.useRef(color);
  if (refColor.current != color)
    refColor.current = color;

  useEffect(() => {    
    var canvas = document.getElementById("AreaHighlightCanvas");
    var ctx = canvas.getContext("2d");
    var newColor = refColor.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = newColor;
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.stroke();
  }, [refColor.current]);

  useEffect(() => {
    if (areaModeClick) {
      var canvas = document.getElementById("AreaHighlightCanvas");
      var ctx = canvas.getContext("2d");
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      canvas.onwheel = function (event) {
        event.preventDefault();
      };

      /*var heightRatio = 1.5;
      canvas.height = canvas.width * heightRatio;*/

      var last_mousex = 0;
      var last_mousey = 0;
      var mousex = 0;
      var mousey = 0;
      var mousedown = false;

      // Get mouse down position
      canvas.addEventListener("mousedown", function(e) {
        var pos = getPosition(canvas);
        last_mousex = parseInt((e.clientX - pos.left) / pos.scaleX);
        last_mousey = parseInt((e.clientY - pos.top) / pos.scaleY);
        mousedown = true;
      }, false);

      // Get mouseup and add a new highlight
      canvas.addEventListener("mouseup", function(e) {
        if (mousedown) {
          var pos = getPosition(canvas);
          mousedown = false;
          var lastX = parseInt((last_mousex * pos.scaleX) + pos.left);
          var lastY = parseInt((last_mousey * pos.scaleY) + pos.top);
          var mouseX = parseInt((mousex * pos.scaleX) + pos.left);
          var mouseY = parseInt((mousey * pos.scaleY) + pos.top);
          var position = {
            x: lastX,
            y: lastY,
            right: mouseX,
            bottom: mouseY,
          };
          addHighlight(refColor.current, position, true);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }, false);

      // Get a mousemove
      canvas.addEventListener("mousemove", function(e) {
        var pos = getPosition(canvas);
        mousex = parseInt((e.clientX - pos.left) / pos.scaleX);
        mousey = parseInt((e.clientY - pos.top) / pos.scaleY);
        if (mousedown) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.beginPath();
          var width = mousex - last_mousex;
          var height = mousey - last_mousey;
          ctx.rect(last_mousex, last_mousey, width, height);
          ctx.stroke();
        }
      }, false);
    }
    //ctx.clearRect(0,0,canvas.width,canvas.height);
  }, [areaModeClick, pageNumber]);

  return (
    <canvas
    id="AreaHighlightCanvas"
    className="highlights"
    width={width} 
    height={height}
    style={{
      zIndex: areaModeClick ? 3 : 1,
    }}
  ></canvas>
  );
}