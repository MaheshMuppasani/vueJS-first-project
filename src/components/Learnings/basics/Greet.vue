<template>
    <div>
        <h2>Hello {{ name }} {{age}}</h2>
    </div>
</template>

<script>
    export default {
        name: 'Greet',
        props: ['name', 'age'],
    }
</script>

<style scoped>

</style>