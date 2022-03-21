<template>
    <div class="customInput">
        <input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    </div>
</template>

<script>
    export default {
        name: 'Input',
        props:{
            modelValue: String
        }
    }
</script>

<style scoped>
input[type="text"]{
    padding: 10px;
    margin: 10px 0;
}
</style>