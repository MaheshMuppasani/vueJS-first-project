<template>
  <div class="Game">
    <div class="board-container">
      <div
        class="board"
        :style="{
          gridTemplateColumns: `repeat(${boardSize}, auto)`,
        }"
      >
        <template v-for="(count, i) in board" :key="i">
          <div v-for="(count, j) in board[i]" :key="j" :style="cellStyles(i,j)" :class="boardClasses(i, j)">{{ board[i][j] }}</div>
        </template>
      </div>
    </div>
    <div class="controls">
      <div class="d-flex">
        <div class="scorecard">
          <label class="m-0 font-weight-bold">SCORE</label>
          <h2 class="m-0 font-weight-bold">{{ score }}</h2>
        </div>
        <div class="scorecard">
          <label class="m-0 font-weight-bold">HIGH SCORE</label>
          <h2 class="m-0 font-weight-bold">{{ highScore }}</h2>
        </div>
      </div>
      <button class="restartBtn btn btn-info mt-2 w-100" @click="handleUserInput('replay')">Restart</button>
      <div class="m-4 m-auto">
        <div class="control-group">
          <button
            v-for="btn in movementBtns"
            :key="btn"
            :class="`arrow-${btn}`"
            @click="handleUserInput(btn)"
            :tabindex="0"
            :ref="`userInput${btn}`"
          >
            <span class="material-icons">arrow_upward</span>
          </button>
          <button class="menu" :tabindex="0" @click="showMenu">
            <span class="material-icons-outlined">home</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <teleport to="#modal-root">
    <Modal v-show="showModal" @close="showModal = false"> Game Over! </Modal>
  </teleport>
</template>

<script>
import { reactive, ref, toRefs, onMounted, onUnmounted, watch } from "vue";
import { create2dArray } from "../tic-tac-toe/utils/array.js";
import { arrowKeys, movementBtns, probableSpawns } from '../2048 with animations/Constants.js';
import { getRandomCoordinates, getRandomValueFromArray, boardUtils, getPossibleMoves, getNumberBackgroundColor, getTextColor } from '../2048 with animations/helpers.js';
import Modal from "../tic-tac-toe/Modal";
import _ from "lodash";

export default {
  name: "Game2048",
  props: ["size"],
  components: {
    Modal,
  },
  emits: ['playOrPauseGame'],
  setup(props, context) {
    const size = ref(props.size || 4);
    const showModal = ref(false);
    const userInputup = ref(null);
    const userInputleft = ref(null);
    const userInputright = ref(null);
    const userInputdown = ref(null);
    const state = reactive(initGame(previousState(size.value)));
    const newSpawnAxis = reactive({
      new_x: null,
      new_y: null,
    });

    function showMenu(){
     context.emit('playOrPauseGame')
    }
    
    function handleKeyStroke(e) {
      e.stopPropagation();
      switch(e.key){
        case 'ArrowLeft': handleUserInput(arrowKeys.ArrowRight); break;
        case 'ArrowRight': handleUserInput(arrowKeys.ArrowLeft); break;
        case 'ArrowUp': handleUserInput(arrowKeys.ArrowUp); break;
        case 'ArrowDown': handleUserInput(arrowKeys.ArrowDown); break;
        default : break;
      }
    }
    
    function setPreviousState(state) {
      localStorage.setItem(`game_2048X${size.value}`, JSON.stringify(state));
    }
    
    function previousState(size) {
      let prevState = localStorage.getItem(`game_2048X${size}`);
      return prevState ? JSON.parse(prevState) : null;
    }

    function saveGame(){
      setPreviousState({
        board: _.cloneDeep(state.board),
        score: state.score,
        highScore: state.highScore,
      });
    }

    window.onbeforeunload = saveGame;

    onMounted(() => {
      document.addEventListener("keyup", handleKeyStroke);
    });
    onUnmounted(() => {
      document.removeEventListener("keyup", handleKeyStroke);
      saveGame();
    });

    function newBoard(size, initialMount) {
      let board = create2dArray(size);
      let axis1 = getRandomCoordinates(size), axis2 = getRandomCoordinates(size);
      while ((axis1[0] === axis2[0] && axis1[1] === axis2[1])) {
        axis2 = getRandomCoordinates(size);
      }
      board[axis1[0]][axis1[1]] = 2;
      if (initialMount) board[axis2[0]][axis2[1]] = getRandomValueFromArray(probableSpawns);
      return board;
    }

    function initGame(previousState) {
      return {
        board: previousState?.board || newBoard(size.value, true),
        score: previousState?.score || 0,
        highScore: previousState?.highScore || 0,
      };
    }

    function setNewSpawnAxis(x, y) {
      newSpawnAxis.new_x = x;
      newSpawnAxis.new_y = y;
    }

    function isBoardFull(board) {
      return board.every((row) => row.every((val) => val));
    }

    function spawnNewCell(board) {
      if (isBoardFull(_.cloneDeep(board))) return false;

      let emptyCells = [];
      for (let i = 0; i < size.value; i++) {
        for (let j = 0; j < size.value; j++) {
          if (!board[i][j]) {
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
      setNewSpawnAxis(x, y);
      board[x][y] = getRandomValueFromArray(probableSpawns);
      return true;
    }

    function incrementScore(newScore){
      state.score += newScore;
    }

    async function handleControl(btn) {
      if (btn === "replay") {
        state.board = newBoard(size.value);
        state.score = 0;
        setPreviousState({
          highScore: state.highScore,
        });
        return false;
      } else {
        const { addTop, addBottom, addLeft, addRight, boardBottomMove, boardLeftMove, boardRightMove, boardTopMove } = boardUtils;
        const addHelper = (board => (mover, handler) => handler(mover(board), incrementScore) )( _.cloneDeep(state.board));
        const moveHelper = (mover, callback) => mover(addHelper(mover, callback));
        const updateBoard = (move) => {
          switch(move){
            case arrowKeys.ArrowRight: return moveHelper(boardLeftMove, addLeft)
            case arrowKeys.ArrowLeft: return moveHelper(boardRightMove, addRight)
            case arrowKeys.ArrowUp: return moveHelper(boardTopMove, addTop);
            case arrowKeys.ArrowDown: return moveHelper(boardBottomMove, addBottom);
          }
        }
        return updateBoard(btn);
      }
    }

    watch(
      () => state.score,
      (newScore) => {
        if (newScore > state.highScore) {
          state.highScore = newScore;
        }
      }
    );
    watch(
      () => props.size,
      function (newSize) {
        // document.documentElement.style.setProperty("--board-size", newSize)
        size.value = newSize;
        const oldState = previousState(size.value);
        state.board = oldState?.board || newBoard(size.value, true);
        state.score = oldState?.score || 0;
        state.highScore = oldState?.highScore || 0;
      }
    );

    function handleUserInput(btn) {
      handleControl(btn)
        .then((newBoard) => {
          let isMutated = true;
          if (newBoard) {
            let oldBoard = _.cloneDeep(state.board);
            if (JSON.stringify(oldBoard) === JSON.stringify(newBoard)) isMutated = false;
            else state.board = newBoard;
          }
          return isMutated;
        })
        .then((isMutated) => {
          if (isMutated) {
            spawnNewCell(state.board);
          }
          let currentBoard = _.cloneDeep(state.board);
          let boardFull = isBoardFull(currentBoard);
          let possibleMoves = getPossibleMoves(currentBoard, size.value);
          if (boardFull && possibleMoves.length === 0) {
            showModal.value = true;
          }
        });
    }
    function cellStyles(i, j){
      const  value = state.board[i][j];
      const cellSize = 100 * (4 / size.value);
      const fontSize = cellSize * 35 / 100;

      return {
        background: value && getNumberBackgroundColor(value),
        color: value && getTextColor(value),
        width: `${cellSize}px`,
        height: `${cellSize}px`,
        fontSize: `${fontSize}px`
      }
    }
    function boardClasses(i, j) {
      return {
        'gameBtn': true,
        'nowCreated': newSpawnAxis.new_x === i && newSpawnAxis.new_y === j && state.board[i][j]
      }
    }
    return {
      ...toRefs(state),
      boardSize: size,
      movementBtns,
      boardClasses,
      cellStyles,
      handleUserInput,
      showModal,
      userInputup,
      userInputleft,
      userInputright,
      userInputdown,
      showMenu
    };
  },
};
</script>

<style>
*,
*::after,
*::before {
  box-sizing: border-box;
}
/* :root{
  --board-size:4;
} */
.Game {
  padding: 1.5rem;
  display: flex;
  width: 100%;
  position: relative;
}
.board-container {
  width: 60%;
  display: flex;
}
.board {
  overflow: hidden;
  display: grid;
  background: rgba(0, 0, 0, 40%);
  padding: 2px;
  border-radius: 7px;
  margin-left: auto;
  position: relative;
}
.scorecard {
  border-radius: 10px;
  background: rgba(0, 0, 0, 20%);
  color: white;
  padding: 10px;
  min-width: 100px;
}
.restartBtn {
  border-radius: 10px;
}
.scorecard + .scorecard {
  margin-left: 20px;
}
.gameBtn {
  /* --cell-size:calc(100 * calc(4 / var(--board-size)) );
  width: calc(var(--cell-size) * 1px);
  height: calc(var(--cell-size) * 1px);
  font-size: calc( var(--cell-size) * 1px * 35 / 100); */
  margin: 2px;
  border-radius: 5px;
  display: grid;
  place-items: center;
  padding: 0;
  cursor: default;
  outline: none !important;
  border: none;
  font-weight: bold;
  line-height: 0;
  background: rgba(255, 255, 255, 25%);
}
.gameBtn.nowCreated {
  animation: newPiece 0.2s linear forwards;
}
@keyframes newPiece {
  0% {
    transform: scaleY(50%);
  }
  100% {
    transform: scaleY(100%);
  }
}
.controls {
  display: flex;
  align-items: center;
  flex-direction: column;
  right: 0;
  margin-left: 30px;
}
.control-group {
  position: relative;
  padding: 5px;
  display: grid;
  grid-template-columns: auto auto;
  overflow: hidden;
  transform: rotate(45deg);
}
.control-group button[class|="arrow"],
.control-group .menu {
  cursor: pointer;
  border: 1px solid grey;
  background: hsl(0, 0%, 91%);
  user-select: none;
  box-shadow: 0 0px 0px 5px #dadada;
}
.control-group .menu {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 50px;
  width: 50px;
  z-index: 2;
  display: grid;
  place-items: center;
  padding: 0px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  border-width: 2px;
  outline: none;
}
.control-group button[class|="arrow"] {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
}
.control-group .menu .material-icons, .control-group .menu .material-icons-outlined {
  transform: rotate(-45deg);
  font-size: 30px;
  color: rgba(0, 0, 0, 60%);
}
.control-group button[class|="arrow"]:hover,
.control-group .menu:hover {
  background: hsl(0, 0%, 88%);
}
.control-group button[class|="arrow"]:active,
.control-group .menu:active {
  background: hsl(171, 94%, 87%);
}
.control-group button[class="arrow-up"] {
  border-top-left-radius: 100% !important;
}
.control-group button[class="arrow-up"] .material-icons {
  transform: rotate(-45deg);
}
.control-group button[class="arrow-left"] {
  border-top-right-radius: 100% !important;
}
.control-group button[class="arrow-left"] .material-icons {
  transform: rotate(45deg);
}
.control-group button[class="arrow-down"] {
  border-bottom-right-radius: 100% !important;
}
.control-group button[class="arrow-down"] .material-icons {
  transform: rotate(135deg);
}
.control-group button[class="arrow-right"] {
  border-bottom-left-radius: 100% !important;
}
.control-group button[class="arrow-right"] .material-icons {
  transform: rotate(-135deg);
}
</style>
