<template>
  <div>
    <button @click="showModal = true" :disabled="showModal">Open Popup</button>
    <Popup v-show="showModal" @closePopup="closePopup" />
  </div>
</template>

<script>
import Popup from "./Popup";

function closePopup(data) {
  console.log(data); // data from event emitter
  this.showModal = false;
}
export default {
  name: "PopupHolder",
  components: {
    Popup
  },
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    closePopup
  }
};
</script>

<style scoped>
</style>