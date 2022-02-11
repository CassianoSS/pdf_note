import { v1 } from "uuid";

export const Highlight = (pageNumber, getRect, color = "yellow", tag = "") => {
  // Create a newHighlight
  const newHighlight = {
    id: v1(),
    content: {
      // Get the text selected
      text: window.getSelection().toString(),
    },
    position: [getRect.x, getRect.y, getRect.right, getRect.bottom],
    color,
    pageNumber,
    tag,
    draw: false,
  };
  window.getSelection().removeAllRanges();
  return newHighlight;
};
