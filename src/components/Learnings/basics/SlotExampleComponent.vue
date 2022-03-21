<template>
    <div class="card">
        <div class="card-header">
            <slot name="header"></slot>
        </div>
        <div class="card-content">
            <slot></slot>
        </div>
        <div class="card-footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SlotExample'
    }
</script>

<style scoped>
.card{
    padding: 10px;
    box-shadow: 1px 2px 5px 2px rgba(0, 0, 0, 20%);
    width: 200px;
    margin: 10px;
}
</style>