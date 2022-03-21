<template>
    <div>
        <h2 v-bind="$attrs">Article {{title}} with likes {{likes}}</h2>
    </div>
    <!-- this component covers prop types and non-prop attrs binding -->
</template>

<script>
    export default {
        name:'Article',
        props:{
            title: {
                type: String,
                required: true,
                default: 'Sample Article'
            },
            likes:Number,
        },
        inheritAttrs: false
    }
</script>

<style scoped>

</style>