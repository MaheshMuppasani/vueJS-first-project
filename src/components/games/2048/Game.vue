<template>
  <div class="Game">
    <div class="navBack">
      <button @click="showMenu"><span class="material-icons">chevron_left</span></button>
    </div>
    <div class="board-container">
      <div class="board" style="display: block; position: relative" ref="boardRef">
        <template v-for="(row, i) in template" :key="i">
          <div v-for="(val, j) in template[i]" :key="i + j" class="gridItem" :style="getStyles(i, j)"></div>
        </template>
      </div>
    </div>
    <div class="controls">
      <button class="restartBtn btn btn-info w-100" @click="handleUserInput('reStart')">Restart</button>
      <div class="d-flex mt-3">
        <div class="scorecard">
          <label class="m-0 font-weight-bold">SCORE</label>
          <h2 class="m-0 font-weight-bold">{{ score }}</h2>
        </div>
        <div class="scorecard">
          <label class="m-0 font-weight-bold">HIGH SCORE</label>
          <h2 class="m-0 font-weight-bold">{{ highScore }}</h2>
        </div>
      </div>
      <div class="control-btn-grp m-4 m-auto">
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
</template>

<script>
import { reactive, toRefs, ref, onMounted, onUnmounted, watch } from "vue";
import { initBoardParams, create2dArray } from "./helpers";
import { arrowKeys, movementBtns } from "./Constants.js";
import Game2048, { getStyleProps } from "./gameLogic.js";

export default {
  name: "2048Animated",
  props: ["size"],
  emits: ["playOrPauseGame"],
  setup(props, context) {
    const boardRef = ref(null);
    const score = ref(0);
    const highScore = ref(0);
    const defaultSize = 4;
    const boardSize = ref(props.size || defaultSize);
    const board = reactive(initBoard(boardSize.value));
    const state = reactive({
      game: new Game2048(game2048Props(boardSize.value)),
    });
    function game2048Props(size){
      const initialState = previousState(size); // initialState of board, score and highScore
      const props = {
        size,
        boardRef,
        cellName: 'number-cell', // class selector for number cells to apply your styles
        setScore,
        handleGameOver
      };
      if(initialState){
        props.initialState = initialState;
      }
      // if no initialState given new board will be rendered.
      return props;
    }
    function previousState(size) {
      let prevState = localStorage.getItem(`game_2048X${size}`);
      return prevState ? JSON.parse(prevState) : null;
    }
    function setPreviousState(state) {
      localStorage.setItem(`game_2048X${boardSize.value}`, JSON.stringify(state));
    }
    function saveGame(){
      setPreviousState({
        board: state.game.board,
        score: state.game.score,
        highScore: state.game.highScore,
      });
    }

    window.onbeforeunload = saveGame;
    function initBoard(size){
      return {
        params: initBoardParams(size),
        template: create2dArray(size)
      }
    }
    function getAxis(i, j) {
      const boardStyles = getStyleProps(board.params);
      return {
        top: `${boardStyles.getPosTop(i)}px`,
        left: `${boardStyles.getPosLeft(j)}px`,
      };
    }
    function showMenu() {
      context.emit("playOrPauseGame");
    }
    function setScore(newScore, newHighScore=0) {
      score.value = newScore;
      highScore.value = newHighScore;
    }
    function handleKeyStroke(e) {
      e.stopPropagation();
      switch (e.key) {
        case "ArrowLeft":
          state.game.handlePlayerInput(arrowKeys.ArrowRight);
          break;
        case "ArrowRight":
          state.game.handlePlayerInput(arrowKeys.ArrowLeft);
          break;
        case "ArrowUp":
          state.game.handlePlayerInput(arrowKeys.ArrowUp);
          break;
        case "ArrowDown":
          state.game.handlePlayerInput(arrowKeys.ArrowDown);
          break;
        default:
          break;
      }
    }
    function handleUserInput(key) {
      if (key === "reStart") {
        setPreviousState({
          highScore: state.game.highScore,
        });
        return state.game.reStart();
      }
      state.game.handlePlayerInput(key);
    }
    onMounted(() => {
      let touchStartX = 0;
      let touchStartY = 0;

      const threshold = 30; // min distance of a swipe in px

      const handleTouchStart = (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      };

      const handleTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;

        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
          if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
              state.game.handlePlayerInput(arrowKeys.ArrowLeft);
            } else {
              state.game.handlePlayerInput(arrowKeys.ArrowRight);
            }
          }
        } else {
          if (Math.abs(diffY) > threshold) {
            if (diffY > 0) {
              state.game.handlePlayerInput(arrowKeys.ArrowDown);
            } else {
              state.game.handlePlayerInput(arrowKeys.ArrowUp);
            }
          }
        }
      };

      document.addEventListener('touchstart', handleTouchStart);
      document.addEventListener('touchend', handleTouchEnd);

      onUnmounted(() => {
        document.removeEventListener('touchstart', handleTouchStart);
          document.removeEventListener('touchend', handleTouchEnd);
      });
    });
    onMounted(() => {
      document.addEventListener("keyup", handleKeyStroke);
    });
    onUnmounted(() => {
      document.removeEventListener("keyup", handleKeyStroke);
      saveGame();
    });
    function handleGameOver() {
      alert("GAME OVER!");
    }

    watch(
      () => props.size,
      function (newSize) {
        saveGame();
        boardSize.value = newSize;
        const newBoard = initBoard(newSize);
        board.params = newBoard.params;
        board.template = newBoard.template;
        score.value = 0;
        state.game = new Game2048(game2048Props(newSize));
      }
    );

    function getStyles(i, j) {
      const { cellSideLength } = board.params;
      const commonStyles = {
        width: `${cellSideLength}px`,
        height: `${cellSideLength}px`,
      };
      return {
        ...getAxis(i, j),
        ...commonStyles,
      };
    }

    return {
      ...toRefs(state.game),
      ...toRefs(board),
      score,
      highScore,
      getStyles,
      movementBtns,
      handleUserInput,
      showMenu,
      getAxis,
    };
  },
};
</script>

<style>
.gridItem {
  position: absolute;
  background: rgba(255, 255, 255, 25%);
  border-radius: 6px;
  display: grid;
  place-items: center;
}
.Game {
  padding: 1.5rem;
  display: flex;
  width: 100%;
  position: relative;
  gap: 3rem;
  justify-content: center;
}
.board-container {
  /* width: 60%; */
  display: flex;
}
.controls {
  display: flex;
  align-items: center;
  flex-direction: column;
  right: 0;
}
.board {
  position: relative;
  background: rgba(0, 0, 0, 40%);
  border-radius: 6px;
  overflow: hidden;
  /* margin-left: auto; */
}
.scorecard {
  border-radius: 10px;
  background: rgba(0, 0, 0, 20%);
  color: white;
  padding: 10px;
  min-width: 100px;
}
.scorecard + .scorecard {
  margin-left: 20px;
}
.restartBtn {
  border-radius: 10px;
}
.board .number-cell {
  position: absolute;
  border-radius: 6px;
  display: grid;
  place-items: center;
  transition: all 0.2s ease-out;
  font-weight: bold;
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
.control-group .menu .material-icons,
.control-group .menu .material-icons-outlined {
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
.navBack{
  position: absolute;
  top: 1.5rem;
  left: 2rem;
  display: none;
}
.navBack button{
  background: rgba(0, 0, 0, 18%);
  display: flex;
  align-items: center;
  outline: none;
  border: none;
  color: #fff;
  font-weight: bold;
  border-radius: 5px;
  padding: 0.3rem 0.5rem;
}
@media screen and (max-width: 1024px){
  .Game{
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    top: -5%;
  }
  .board-container{
    order: 2;
  }
  .controls{
    order: 1;
  }
  .control-btn-grp{
    display: none;
  }
  .navBack{
    display: block;
  }
}
</style>
