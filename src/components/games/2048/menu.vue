<template>
  <div class="menu2048">
    <div class="gameHeader">
      <button v-show="selectedBoard.id > 0">
        <span class="material-icons" @click="selectBoard(0, selectedBoard.id)">chevron_left</span>
      </button>
      <h3 class="m-0 mx-auto">{{ selectedBoard.name }} ({{ selectedBoard.size }}x{{ selectedBoard.size }})</h3>
      <button v-show="selectedBoard.id < 5">
        <span class="material-icons" @click="selectBoard(1, selectedBoard.id)">chevron_right</span>
      </button>
    </div>
    <button class="w-100 my-2" @click="playGame">play</button>
    <button class="w-100 my-2">theme</button>
    <button class="w-100 my-2">rate me</button>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  name: "Menu_2048",
  emits: ["playOrPauseGame"],
  setup(props, context) {
    // console.log(props);
    const boardTypes = [
      {
        id: 0,
        name: "Tiny",
        size: 3,
      },
      {
        id: 1,
        name: "Classic",
        size: 4,
      },
      {
        id: 2,
        name: "Big",
        size: 5,
      },
      {
        id: 3,
        name: "Bigger",
        size: 6,
      },
      {
        id: 4,
        name: "Huge",
        size: 7,
      },
      {
        id: 5,
        name: "Huger",
        size: 8,
      },
    ];
    const state = reactive({
      selectedBoard: {
        id: 1,
        name: "Classic",
        size: 4,
      },
    });

    function selectBoard(isRight, current) {
      if (isRight) {
        state.selectedBoard = boardTypes[current + 1];
        return;
      }
      state.selectedBoard = boardTypes[current - 1];
    }

    function playGame() {
      context.emit("playOrPauseGame", state.selectedBoard.size);
    }
    return {
      ...toRefs(state),
      playGame,
      boardTypes,
      selectBoard,
    };
  },
};
</script>

<style scoped>
.menu2048 {
  padding: 20px;
  border-radius: 10px;
  color: white;
  background: linear-gradient(150deg, hsl(143, 92%, 35%), hsl(202, 100%, 35%));
}
.menu2048 button {
  text-transform: uppercase;
  padding: 15px 10px;
  text-align: center;
  border-radius: 10px;
  outline: none;
  border: none;
  color: white;
  font-weight: bold;
  letter-spacing: 1px;
  background: rgba(0, 0, 0, 18%);
}
.menu2048 button:hover {
  background: rgba(0, 0, 0, 23%);
}
.menu2048 button:active {
  background: rgba(0, 0, 0, 28%);
}
.gameHeader {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.gameHeader button {
  border-radius: 50%;
  padding: 5px;
  display: grid;
  place-items: center;
}
</style>
