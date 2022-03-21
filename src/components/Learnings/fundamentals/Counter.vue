<template>
    <div class="counter">
        <button @click="handleCounterClick(1, $event), sideFunc($event)" :disabled="disableDecrement">-</button>
        <span>{{count}}</span>
        <button @click="[handleCounterClick(2, $event), sideFunc($event)]" :disabled="disableIncrement">+</button>
    </div>
</template>

<script>

let count = 0;

function sideFunc(e) {
    console.log(e);
}

function handleCounterClick(type) {
    if(type===1){
        this.count = this.count - 1;
    }
    else{
        this.count = this.count + 1;
    }
    this.disableIncrement = this.count >= 10 ? true : false;
    this.disableDecrement = this.count > 0 ? false : true;
}

export default {
    name: 'Counter',
    data() {
        return {
            count: count,
            disableDecrement: true,
            disableIncrement: false,
        }
    },
    methods:{
        handleCounterClick,
        sideFunc
    }
}
</script>

<style>
.counter button{
    padding: 5px 10px;
    cursor: pointer;
    user-select: none;
}
.counter button:disabled{
    cursor: default;
}
.counter button{
    margin: 0px 20px;
}
</style>