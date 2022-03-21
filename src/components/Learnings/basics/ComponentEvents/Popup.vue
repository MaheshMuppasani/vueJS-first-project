<template>
    <div class="popup">
        <h1>This is a demo Popup</h1>
        <div><label>Name : </label><input type="text" v-model="name" /></div>
        <button @click="$emit('closePopup', name)">Close Popup</button>
    </div>
</template>

<script>
function handleClosePopup(name){
    if(!name) return false;
    return true;
}
    export default {
        name: 'SamplePopUp',
        // emits: ['closePopup'],
        emits: {
            closePopup: handleClosePopup
        },
        // please add one of the syntax for emits property but not both
        data(){
            return{
                name : ''
            }
        }
    }
</script>

<style scoped>
.popup{
    border: 1px solid black;
    margin: 20px;
    padding: 10px;
}
</style>