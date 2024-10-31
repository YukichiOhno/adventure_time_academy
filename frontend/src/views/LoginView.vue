<template>
<main class="login-view">
    <h1>Login</h1>
    <LoginComponent />
    <GuideSignUpComponent />
</main>
</template>

<script setup>
import LoginComponent from '@/components/Loginpage/LoginComponent.vue';
import GuideSignUpComponent from '@/components/Loginpage/GuideSignUpComponent.vue';
</script>


<style scoped>
main > section {
    margin-block-end: 15px;
    border: 1px solid black;
}

main > section:last-of-type {
    margin-block-end: 0px;
}
</style>