<template>
  <!-- <TicTacToe /> -->
  <!-- <Learnings /> -->
  <Game2048 />
  <!-- <Animated2048 /> -->
</template>

<script>
// import Learnings from './components/Learnings/Learnings.vue';
// import TicTacToe from './components/games/tic-tac-toe/TicTacToe';
import Game2048 from './components/games/2048/Container.vue';
// import Animated2048 from './components/games/2048 with animations/Game.vue'; 

export default {
  name: "App",
  components:{
    // Learnings,
    // TicTacToe,
    Game2048,
    // Animated2048
  },
  data() {
    return {
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  align-items: center;
}
</style>
