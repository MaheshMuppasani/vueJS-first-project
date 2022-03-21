<template>
    <div>
        <h2>user in DeeplyNestedComponent : {{loggedUserName}}</h2>
    </div>
    <!-- this component injects props from a provider component -->
</template>

<script>
    export default {
        name: 'DeeplyNestedComponent',
        inject:['loggedUserName']
    }
</script>

<style scoped>

</style>