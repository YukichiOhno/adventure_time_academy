<template>
<header class="header-component">
    <section>
        <img :src="singingPanda" alt="singing pandas in japanese">
    </section>
    <h1>Adventure Time Academy</h1>
    <nav>
        <ul>
            <li><RouterLink :to="{ name: 'home' }">Home</RouterLink></li>
            <li><RouterLink :to="{ name: 'about' }">About</RouterLink></li>
            <li><RouterLink :to="{ name: 'contact-us' }">Contact Us</RouterLink></li>
            <li v-if="loggedIn"><RouterLink :to="{ name: 'account' }">Account</RouterLink></li>
            <li v-else><RouterLink :to="{ name: 'login' }">Login</RouterLink></li>
        </ul>
    </nav>
</header> 
</template>


<script setup>
import { RouterLink } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { ref, computed } from 'vue';

const singingPanda = new URL('@/assets/images/singing-pandas.jpg', import.meta.url).href;
const user = useUserStore();
const loggedIn = computed(() => {
    return user.userInformation.number && user.userInformation.username && user.userInformation.identity 
});


</script>


<style scoped>
/* header flex item */
header {
    /* grid parent */
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas: 
    "one two two"
    "one thr thr";
    align-items: center;
}

/* grid children global styles */
header > * {
    border: 1px solid black;
    align-content: center;
}

/* grid children */
section {
    /* grid child */
    grid-area: one;

}

h1 {
    /* font */
    font-size: 1.5rem;
    text-align: center;
    padding-inline: 10px;

    /* grid child */
    grid-area: two
}

nav {
    /* grid child */
    grid-area: thr
}

/* navigation style */
a {
    display: block;
    border: 1px solid black;
    border-radius: 5px;
    text-align: center;
}

/* link decoration */
a:link {
    text-decoration: none;
}

a:visited {
    color: black;
}

a:focus {
    background-color: rgba(238, 235, 235, 0.623);
}

a:hover {
    background-color: rgba(238, 235, 235, 0.623);
}

a:active {
    background-color: rgba(223, 180, 198, 0.623);
}
/* responsive styles */

/* phone horizontal (480px and up) */
@media (min-width: 480px) {
    header {
        grid-template-columns: repeat(7, 1fr);
        grid-template-areas: 
        "one one two two two two two"
        "one one thr thr thr thr thr";
        align-items: center;
    }

    img {
        /* extrinsic size */
        display: block;
        inline-size: 100px;
        block-size: 100px;
        margin-inline: auto;
    }

}

/* tablet (768px and up) */
@media (min-width: 768px) {
    header {
        grid-template-columns: repeat(9, 1fr);
        grid-template-areas: 
        "one one one two two two thr thr thr"
        "one one one two two two thr thr thr";
        align-items: center;
    }

    header > * {
        min-block-size: 150px;
    }

    a {
        block-size: 37px;
        /* center the text */
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

/* laptop (1024px and up) */
@media (min-width: 1024px) {
    header {
        grid-template-columns: repeat(12, 1fr);
        grid-template-areas: 
        "one one two two two thr thr thr thr thr thr thr"
        "one one two two two thr thr thr thr thr thr thr";
        align-items: center;
    }

    /* navigation ul is a flex parent */

    ul {
        display: flex;
        flex-direction: row;
    }

    ul > li {
        flex-grow: 1;

    }

    a {
        block-size: 148px;
    }

}

</style>