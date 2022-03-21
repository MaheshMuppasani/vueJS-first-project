<template>
  <h3 v-for="name in nameList" :key="name.name">
    <slot :firstName="name.name" :age="name.age">default text</slot>
  </h3>
</template>

<script>
export default {
  name: "SlotPropsExample",
  data() {
    return {
      nameList: [
        { name: "akhil", age: 24 },
        { name: "pavan", age: 24 },
        { name: "ashu", age: 24 }
      ]
    };
  }
};
</script>

<style scoped>
</style>