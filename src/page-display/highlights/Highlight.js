import { v1 } from "uuid";

export const Highlight = (pageNumber, getRect, color = "yellow", tag = "") => {
  // Create a newHighlight
  const textSelected = window.getSelection();
  const newHighlight = {
    id: v1(),
    content: {
      // Get the text selected
      text: textSelected.toString(),
      texts: textSelected.toString().split(" "),
    },
    position: [getRect.x, getRect.y, getRect.right, getRect.bottom],
    color,
    pageNumber,
    tag,
    draw: false,
  };
  textSelected.removeAllRanges();
  return newHighlight;
};
