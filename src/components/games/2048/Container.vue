<template>
    <div class="gameContainer">
        <keep-alive>
            <component :is="GameOrMenu" :size="size" @playOrPauseGame="handlePlayOrPause" />
        </keep-alive>
    </div>
</template>

<script>
import Game from './Game.vue';
import Menu from './menu.vue';
import { ref } from 'vue';
    export default {
        name:'Container2048',
        components: {
            Game,
            Menu
        },
        setup(){
            const size = ref(4);
            const GameOrMenu = ref('Menu');
            
            function handlePlayOrPause(val){
                if(val){
                    size.value = val;
                    GameOrMenu.value = 'Game';
                    return;
                }
                GameOrMenu.value = 'Menu';
            }
            return {
                size,
                GameOrMenu,
                handlePlayOrPause
            }
        }
    }
</script>

<style scoped>
.gameContainer {
  height: 100vh;
  position: relative;
  width: 100%;
  display: grid;
  place-items: center;
  background: linear-gradient(160deg, rgba(101, 248, 133, 0.685), rgba(39, 221, 245, 0.74));
}
</style>