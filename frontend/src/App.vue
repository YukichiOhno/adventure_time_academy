<template>
    <HeaderComponent />
    <RouterView />
    <FooterComponent />
</template>


<script setup>
import { RouterView } from 'vue-router';
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
</script>


<style>
header, footer {
    flex-shrink: 0;
}

header ul {
    display: flex;
    flex-direction: row;
    justify-content: center;
    column-gap: 20px;
}

main {
    flex-grow: 1;
}
</style>