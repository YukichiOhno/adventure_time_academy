<template>
<main class="account-view">
    <h1>Account Page</h1>
    <button @click="logoutUser">Logout</button>
</main>
</template>


<script setup>
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const user = useUserStore();

const logoutUser = async () => {
    try {
        await axios.post('http://localhost:5000/api/account/logout');
        user.resetUserInformation();
        router.push({ name: 'home' });

    } catch (err) {
        console.error('something occured during the log out process');
        console.error(err);
    }
}
</script>