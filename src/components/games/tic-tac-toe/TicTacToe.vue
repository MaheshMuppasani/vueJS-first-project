<template>
  <div class="p-4 d-flex">
    <div class="board" :style="boardStyles">
      <template v-for="(count, i) in board" :key="i">
        <button v-for="(count, j) in board[i]" :key="j" @click="handleClick(i,j)" :class="getClasses(i, j)">{{ board[i][j] }}</button>
      </template>
    </div>
    <div class="game-info ml-2">
        <div><button @click="resetGame">Restart</button></div>
        <div v-if="gameDraw"><h4>Game Draw!</h4></div>
        <div v-else-if="gameOver"><h4>Winner : {{player}}</h4></div>
        <div v-else><h4>{{player}}'s Turn</h4></div>
        <div>
          <h5>Moves:</h5>
          <button class="historyButton" v-for="(moveCount, move) in history" :key="move" @click="handleHistory(move)">Move {{ move }}</button>
        </div>
    </div>
  </div>
  <teleport to="#modal-root">
        <Modal v-show="showModal" @close="showModal = false">
          Player {{ player }} Won!
        </Modal>
      </teleport>
</template>

<script>
import { ref, reactive, toRefs, watch } from 'vue';
import { create2dArray } from './utils/array.js';
import { isGameOver, GameMove } from './utils/TicTacToeUtils';
import Modal from './Modal';
import _ from 'lodash';
export default {
  name: 'TicTacToe',
  components:{
      Modal
  },
  props:['size'],
  setup(props) {
    const size = props.size || 3, player1 = 'O', player2 = 'X';
    const showModal = ref(false), historyTrack = ref(0), onHistoryTravel = ref(false);

    function toggleTurn(currentPlayer){
      return currentPlayer === player1 ? player2 : player1;
    }
    
    const state = reactive({
        board: create2dArray(size),
        gameOver: false,
        gameReset: true,
        gameDraw: false,
        history: [],
        player: player1,
      });

    function resetGame(){
      state.board = create2dArray(size);
      state.gameOver = false;
      state.gameReset = true;
      state.gameDraw = false;
      state.history = [];
      state.player = player1;
    }

    function handleClick(x, y){
        if(state.gameOver || state.gameDraw || state.board[x][y]) return;
        if(state.gameReset) state.gameReset = false;
        if(onHistoryTravel.value) {
          onHistoryTravel.value = false;
          state.history.splice(historyTrack.value + 1, state.history.length)
        }
        state.board[x][y] = state.player;
    }

    function handleHistory(index){
      if(!onHistoryTravel.value) onHistoryTravel.value = true;
      historyTrack.value = index;
      state.board = _.cloneDeep(state.history[index].board);
      state.player = state.history[index].gameOver ? state.history[index].playedBy : toggleTurn(state.history[index].playedBy);
      state.gameOver = state.history[index].gameOver;
      state.gameDraw = state.history[index].gameDraw;
    }

    watch(() => _.cloneDeep(state.board), function(newVal){
      if(state.gameOver || state.gameReset || onHistoryTravel.value) return;

      state.gameOver = isGameOver(state.board);
      state.gameDraw = !state.gameOver && newVal.every(row => row.every(val => val));
      state.history.push(new GameMove(newVal, state));

      if(state.gameOver && !state.gameDraw){
          showModal.value = true;
          return;
      }
      state.player = toggleTurn(state.player);
    }, {deep : true})

    function getClasses(i, j){
      return [
                'gameBtn', 
                i===0 && 'border-top-0',
                j===0 && 'border-left-0',
                i===size-1 && 'border-bottom-0',
                j===size-1 && 'border-right-0',
                !state.gameOver && !state.board[i][j] && `${state.player}`
              ];
    }

    return {
      ...toRefs(state),
      showModal,
      resetGame,
      handleClick,
      handleHistory,
      getClasses,
      boardStyles: {
        gridTemplateColumns: `repeat(${size}, auto)`,
      },
    };
  },
};
</script>

<style scoped>
*,*::after,*::before{
  box-sizing: border-box;
}
.board{
  overflow: hidden;
  display: grid;
}
.border-top-0{
  border-top: none;
}
.border-left-0{
  border-left: none;
}
.border-right-0{
  border-right: none;
}
.border-bottom-0{
  border-bottom: none;
}
.gameBtn {
  position: relative;
  padding: 0;
  cursor: default;
  min-width: 100px;
  min-height: 100px;
  outline: none !important;
  border: 1px solid grey;
  color: black;
  font-weight: bold;
  font-size: 80px;
  line-height: 0;
}
.gameBtn.X,.gameBtn.O{
  cursor: pointer;
}
.gameBtn.X:hover::before{
  position: absolute;
  content: 'X';
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  color: lightgray;
  z-index: 1;
}
.gameBtn.O:hover::before{
  position: absolute;
  content: 'O';
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  color: rgb(184, 184, 184);
  z-index: 1;
}
</style>
