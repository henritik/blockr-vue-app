<template>
    <div class="alert info">{{text}}</div>
</template>

<script>
    export default {
        name: "InfoAlert",
        props: {
            text: String
        }
    }
</script>

<style lang="scss" scoped>
.alert {
    padding: 1rem 2rem;
    margin: 1rem 0;
    border-radius: 10px;
    &.info {
        background-color: var(--second-background-color);
        color: var(--button-color);
        font-weight: 600;
    }
}
</style>