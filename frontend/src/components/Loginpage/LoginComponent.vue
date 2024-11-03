<template>
<section class="login-component">
    <form @submit.prevent="loginUser">
        <ul>
            <li>
                <label for="login-component-username">Username: </label>
                <input type="text" name="login-component-username" id="login-component-username" v-model="loginCredentials.username" required>
            </li>
            <li>
                <label for="login-component-password">Password: </label>
                <input type="password" name="login-component-password" id="login-component-password" v-model="loginCredentials.password" required>
            </li>
            <li>
                <button type="submit">Login</button>
            </li>
        </ul>
    </form>
    <section class="output">
        {{ output }}
    </section>
</section>
</template>


<script setup>
import axios from 'axios';
import { ref, reactive } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = useUserStore();
const output = ref(null);
const loginCredentials = reactive({
    username: "",
    password: ""
});

const loginUser = async () => {
    try {
        let userData;
        const response = await axios.post("/api/account/login", {
            username: loginCredentials.username,
            password: loginCredentials.password
        });

        userData = response.data.user_information;
        user.userInformation.username = userData.account_username;
        user.userInformation.number = userData.account_number;
        user.userInformation.identity = userData.account_identity;

        output.value = null;

        router.push({ name: 'account'} );
    } catch (err) {
        console.error('an error occured during the process of logging in the user');
        console.error(err);
        output.value = err.response.data.message;
    }
};



</script>