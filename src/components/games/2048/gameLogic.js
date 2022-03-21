import {
  getRandomCoordinates,
  getRandomValueFromArray,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  getPossibleMoves,
  domNodes,
  getNumberBackgroundColor,
  getTextColor,
  setStyleProperties,
  initBoardParams,
  create2dArray
} from "./helpers.js";
import { probableSpawns, arrowKeys } from "./Constants";

export default class Game2048 {
  constructor(props) {
    this.size = props.size;
    this.highScore = props?.initialState?.highScore || 0;
    this.boardRef = props.boardRef;
    this.cellName = props.cellName;
    this.board = props?.initialState?.board || this.newBoard(this.size, true);
    this.hasConflicted = create2dArray(this.size, false);
    this.handleGameOver = props.handleGameOver;
    this.scoreCallback = props.setScore;
    this.boardParams = initBoardParams(this.size);
    this.getStyles = getStyleProps(this.boardParams);
    if (this.isGameOver()) {
      this.handleGameOver();
    }
    this.setScore(props?.initialState?.score || 0)
    setTimeout(this.gameStart, 0);
  }

  gameStart = () => {
    const { cellSpace, containerWidth } = this.boardParams;
    const boardRef = this.boardRef?.current || this.boardRef?.value;
    if(!boardRef) return;
    setStyleProperties(boardRef, {
      width: `${containerWidth}px`,
      height: `${containerWidth}px`,
      padding: `${cellSpace}px`,
    });
    this.updateBoardView();
  };

  reStart = () => {
    this.setScore(0);
    this.gameOver = false;
    this.board = this.newBoard(this.size, true);
    this.hasConflicted = create2dArray(this.size, false);
    this.gameStart();
  };

  get getScore(){
    return this.score
  }

  newBoard = (size, initialMount) => {
    let board = create2dArray(size, 0);
    let axis1 = getRandomCoordinates(size),
      axis2 = getRandomCoordinates(size);
    while (axis1[0] === axis2[0] && axis1[1] === axis2[1]) {
      axis2 = getRandomCoordinates(size);
    }
    board[axis1[0]][axis1[1]] = 2;
    if (initialMount) board[axis2[0]][axis2[1]] = getRandomValueFromArray(probableSpawns);
    return board;
  };

  setScore = (score) => {
    this.score = score;
    if (score > this.highScore) {
      this.highScore = score;
    }
    this.scoreCallback(this.score, this.highScore);
  };

  incrementScore = (newScore) => {
    this.setScore(this.score + newScore);
  };

  userInput = async (key) => {
    const moveCells = (key) => {
      switch (key) {
        case arrowKeys.ArrowRight:
          return moveLeft(this.board, this.hasConflicted, this.showMoveAnimation, this.incrementScore);
        case arrowKeys.ArrowLeft:
          return moveRight(this.board, this.hasConflicted, this.showMoveAnimation, this.incrementScore);
        case arrowKeys.ArrowUp:
          return moveUp(this.board, this.hasConflicted, this.showMoveAnimation, this.incrementScore);
        case arrowKeys.ArrowDown:
          return moveDown(this.board, this.hasConflicted, this.showMoveAnimation, this.incrementScore);
      }
    };
    return moveCells(key);
  };
  isBoardFull = () => {
    return this.board.every((row) => row.every((val) => val));
  };
  spawnNewCell = () => {
    if (this.isBoardFull()) return false;
    let emptyCells = [];
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (!this.board[i][j]) {
          const obj = {
            x: i,
            y: j,
          };
          emptyCells.push(obj);
        }
      }
    }
    let randomSpace = getRandomValueFromArray(emptyCells);
    let x = randomSpace.x;
    let y = randomSpace.y;
    const randNumber = getRandomValueFromArray(probableSpawns);
    this.board[x][y] = randNumber;
    this.showNumber(x, y, randNumber);
    return true;
  };
  isGameOver = () => {
    if (this.isBoardFull() && getPossibleMoves(this.board, this.size).length === 0) {
      this.gameOver = true;
      return true;
    }
    this.gameOver = false;
    return false;
  };
  handlePlayerInput = (key) => {
    this.userInput(key).then((mutated) => {
      if (mutated) {
        setTimeout(this.updateBoardView, 200);
        setTimeout(this.spawnNewCell, 230);
        setTimeout(() => {
          if (this.isGameOver()) {
            this.handleGameOver();
          }
        }, 260);
      }
    });
  };

  showNumber = (i, j, randNumber) => {
    const { cellSideLength, fontSize } = this.boardParams;
    const boardRef = this.boardRef?.current || this.boardRef?.value;
    if(!boardRef) return;
    var numberCell = boardRef.querySelector(`#${this.cellName}-${i}-${j}`);
    setStyleProperties(numberCell, {
      "background-color": getNumberBackgroundColor(randNumber),
      color: getTextColor(randNumber),
      width: `${cellSideLength}px`,
      height: `${cellSideLength}px`,
      top: `${this.getStyles.getPosTop(i)}px`,
      left: `${this.getStyles.getPosLeft(j)}px`,
      "font-size": `${fontSize}px`,
    });
    numberCell.innerText = randNumber;
  };

  updateBoardView = () => {
    const boardRef = this.boardRef?.current || this.boardRef?.value;
    if(!boardRef) return;
    let allCells = boardRef.querySelectorAll(`.${this.cellName}`);
    domNodes(allCells).remove();
    this.reRenderCells();
  };

  showMoveAnimation = (fromx, fromy, tox, toy) => {
    setTimeout(() => {
      const boardRef = this.boardRef?.current || this.boardRef?.value;
      if(!boardRef) return;
      let numberCell = boardRef.querySelector(`#${this.cellName}-${fromx}-${fromy}`);
      if (numberCell) {
        numberCell.style.setProperty("top", `${this.getStyles.getPosTop(tox)}px`);
        numberCell.style.setProperty("left", `${this.getStyles.getPosLeft(toy)}px`);
      }
    }, 0);
  };

  reRenderCells = () => {
    const { cellSideLength, fontSize } = this.boardParams;
    const size = this.board?.length || 0;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const cell = document.createElement("div");
        const boardRef = this.boardRef?.current || this?.boardRef.value;
        if(!boardRef) return;
        boardRef.appendChild(cell);
        cell.classList.add(`${this.cellName}`);
        cell.id = `${this.cellName}-${i}-${j}`;
        if (this.board[i][j] === 0) {
          setStyleProperties(cell, {
            width:`0px`,
            height: `0px`,
            top: `${this.getStyles.getPosTop(i, true)}px`,
            left: `${this.getStyles.getPosLeft(j, true)}px`,
          })
          cell.innerText = "";
        } else {
          setStyleProperties(cell, {
            width: `${cellSideLength}px`,
            height: `${cellSideLength}px`,
            top: `${this.getStyles.getPosTop(i)}px`,
            left: `${this.getStyles.getPosLeft(j)}px`,
            'background-color': getNumberBackgroundColor(this.board[i][j]),
            color: getTextColor(this.board[i][j]),
            'font-size': `${fontSize}px`,
          })
          cell.innerText = this.board[i][j];
        }
        this.hasConflicted[i][j] = false;
      }
    }
  };
}

export const getStyleProps = (params) => {
  const { cellSpace, cellSideLength } = params;
  const getPosTop = (i, isEmptyCell) => {
    return cellSpace + i * (cellSpace + cellSideLength) + (isEmptyCell ? cellSideLength/2 : 0);
  };
  const getPosLeft = (j, isEmptyCell) => {
    return cellSpace + j * (cellSpace + cellSideLength) + (isEmptyCell ? cellSideLength/2 : 0);
  };
  return {
    getPosTop,
    getPosLeft,
  };
};
