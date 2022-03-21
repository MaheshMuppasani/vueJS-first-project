<template>
  <h1>Volume Tracker (0 - 10)</h1>
  <h3>Current Volume : {{volume}}</h3>
  <div class="counter">
    <button @click="volume -=1">-</button>
    <span>{{volume}}</span>
    <button @click="volume +=1">+</button>
  </div>
  <h3>
    <div>
      <label>Movie Name :</label>
      <input type="text" v-model="movieName" />
    </div>
  </h3>
  <h2>Movie List</h2>
  <h4 v-for="movie in movieList" :key="movie">{{movie}}</h4>
  <h3>
    <button @click="movieList.push('dookudu')">Add Movie</button>
  </h3>
</template>

<script>
export default {
  name: "WatcherExample",
  data() {
    return {
      volume: 8,
      movieName: "",
      movieList: ["athadu", "pokiri"]
    };
  },
  methods: {},
  computed: {},
  watch: {
    volume: {
      handler(currVolume, prevVolume) {
        if (
          currVolume === 8 &&
          (!prevVolume || (prevVolume && currVolume > prevVolume))
        ) {
          alert("High volume exposure may damage hearing!");
        }
      },
      immediate: true
    },
    movieName(newVal) {
      console.log(`calling API with new name: ${newVal}`);
    },
    movieList: {
      handler(curr) {
        console.log("new movie list : ", curr);
      },
      deep: true
    }
  }
};
</script>

<style>
.counter button {
  padding: 5px 10px;
  cursor: pointer;
  user-select: none;
}
.counter button:disabled {
  cursor: default;
}
.counter button {
  margin: 0px 20px;
}
</style>