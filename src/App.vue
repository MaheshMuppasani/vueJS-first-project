<template>
  <Game2048 />
</template>

<script>
import Game2048 from './components/games/2048/Container.vue';

export default {
  name: "App",
  components:{
    Game2048,
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
