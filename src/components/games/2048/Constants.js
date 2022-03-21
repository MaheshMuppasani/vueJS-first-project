export const arrowKeys = {
    ArrowUp: "up",
    ArrowLeft: "left",
    ArrowRight: "right",
    ArrowDown: "down",
  };
export const movementBtns = [arrowKeys.ArrowUp, arrowKeys.ArrowLeft, arrowKeys.ArrowRight, arrowKeys.ArrowDown];

export const probableSpawns = [...new Array(7).fill(2), 4]; // spawn rate of 2 is 7/8 and for 4 its 1/8