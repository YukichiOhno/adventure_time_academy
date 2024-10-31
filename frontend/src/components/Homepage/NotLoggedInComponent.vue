<template>
<section class="not-logged-in-component">
    <section>
        <img :src="singingPanda" alt="japanese pandas singing">
    </section>
    <section>
        <h2>Welcome</h2>
        <p>Sample text. Click to select the Text Element. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
        <RouterLink :to="{ name: 'login'}">Login</RouterLink>
    </section>
    <section>
        <ul>
            <li v-for="information in informationList" :key="information.heading">
                <h2>0{{ information.heading }}</h2>
                <p>{{ information.paragraph }}</p>
            </li>
        </ul>
    </section>
</section>
</template>


<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';

const singingPanda = new URL('@/assets/images/singing-pandas.jpg', import.meta.url).href;
const informationList = ref([
    {
        heading: 1,
        paragraph: 'baby care solutions'
    },
    {
        heading: 2,
        paragraph: 'child care professionals'
    },
    {
        heading: 3,
        paragraph: 'we give children a big boost on learning'
    },
    {
        heading: 4,
        paragraph: 'for children 5 months to 6 years of age'
    },
]);
</script>


<style scoped>
</style>