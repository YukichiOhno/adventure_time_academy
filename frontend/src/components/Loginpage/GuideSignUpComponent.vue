<template>
<section class="guide-sign-up-component">
    <h2>Sign up</h2>
    <form @submit.prevent="signUpGuide">
        <h3>Account Information</h3>
        <ul id="guide-sign-up-account-information">
            <li>
                <label for="guide-sign-up-username">username: </label>
                <input type="text" name="guide-sign-up-username" id="guide-sign-up-username" v-model="guideSignUpInformation.account.username" required>
            </li>
            <li>
                <label for="guide-sign-up-password">password: </label>
                <input type="password" name="guide-sign-up-password" id="guide-sign-up-password" v-model="guideSignUpInformation.account.password" required>
            </li>
            <li>
                <label for="guide-sign-up-password-confirm">confirm password: </label>
                <input type="password" name="guide-sign-up-password-confirm" id="guide-sign-up-password-confirm" v-model="confirmPassword" required>
            </li>
        </ul>

        <h3>Guide Information</h3>
        <ul>
            <li>
                <label for="guide-sign-up-first-name">first name: </label>
                <input type="text" name="guide-sign-up-first-name" id="guide-sign-up-first-name" v-model="guideSignUpInformation.guide.first_name" required>
            </li>
            <li>
                <label for="guide-sign-up-last-name">last name: </label>
                <input type="text" name="guide-sign-up-last-name" id="guide-sign-up-last-name" v-model="guideSignUpInformation.guide.last_name" required>
            </li>
            <li>
                <label for="guide-sign-up-initial">initial: </label>
                <input type="text" name="guide-sign-up-initial" id="guide-sign-up-initial" v-model="guideSignUpInformation.guide.initial" maxlength="1">
            </li>
            <li>
                <label for="guide-sign-up-phone-number">phone number: </label>
                <input type="number" name="guide-sign-up-phone-number" id="guide-sign-up-phone-number" v-model="guideSignUpInformation.guide.phone_number" required maxlength="10">
            </li>
            <li>
                <label for="guide-sign-up-email">email: </label>
                <input type="email" name="guide-sign-up-email" id="guide-sign-up-email" v-model="guideSignUpInformation.guide.email" required>
            </li>
            <li>
                <label for="guide-sign-up-address">address: </label>
                <input type="text" name="guide-sign-up-address" id="guide-sign-up-address" v-model="guideSignUpInformation.guide.address" required>
            </li>
            <li>
                <label for="guide-sign-up-city">city: </label>
                <input type="text" name="guide-sign-up-city" id="guide-sign-up-city" v-model="guideSignUpInformation.guide.city" required>
            </li>
            <li>
                <label for="guide-sign-up-state">state: </label>
                <select name="guide-sign-up-state" id="guide-sign-up-state" v-model="guideSignUpInformation.guide.state">
                    <option v-for="(state, index) in usStates" :key="index" :value="state.abbr">
                        {{ state.name }}
                    </option>
                </select>
            </li>
            <li>
                <label for="guide-sign-up-zip">zip: </label>
                <input type="number" name="guide-sign-up-zip" id="guide-sign-up-zip" v-model="guideSignUpInformation.guide.zip" required maxlength="5">
            </li>
        </ul>
        <button type="submit">Sign up</button>
    </form>
    <section class="output">
        <p>{{ output }}</p>
    </section>
</section>
</template>


<script setup>
import axios from 'axios';
import { ref, reactive } from 'vue';
import { usStates } from '@/assets/misc-scripts/us-states';
import { useRouter } from 'vue-router';

const router = useRouter();
const output = ref(null);
const confirmPassword = ref("");
const guideSignUpInformation = reactive({
    account: 
        {
            username: "",
            password: ""
        },

    guide: 
        {
            first_name: "",
            last_name: "",
            initial: null,
            phone_number: "",
            email: "",
            address: "",
            city: "",
            state: "FL",
            zip: ""
        }
});

const signUpGuide = async () => {
    if (guideSignUpInformation.account.password !== confirmPassword.value) {
        output.value = "passwords must match"
    } else {
        try {
            const response = await axios.post('/api/account/sign-up/guide', {
                account: 
                    {
                        username: guideSignUpInformation.account.username,
                        password: guideSignUpInformation.account.password
                    },
                guide:
                    {
                        first_name: guideSignUpInformation.guide.first_name,
                        last_name: guideSignUpInformation.guide.last_name,
                        initial: guideSignUpInformation.guide.initial,
                        phone_number: guideSignUpInformation.guide.phone_number,
                        email: guideSignUpInformation.guide.email,
                        address: guideSignUpInformation.guide.address,
                        city: guideSignUpInformation.guide.city,
                        state: guideSignUpInformation.guide.state,
                        zip: guideSignUpInformation.guide.zip
                    }
            });

            console.log(response.data.message);
            output.value = null;
            
            // reset form
            guideSignUpInformation.account.username = "";
            guideSignUpInformation.account.password = "";
            guideSignUpInformation.guide.first_name = "";
            guideSignUpInformation.guide.last_name = "";
            guideSignUpInformation.guide.initial = null;
            guideSignUpInformation.guide.phone_number = "";
            guideSignUpInformation.guide.email = "";
            guideSignUpInformation.guide.address = "";
            guideSignUpInformation.guide.city = "";
            guideSignUpInformation.guide.state = "FL";
            guideSignUpInformation.guide.zip = "";
            confirmPassword.value = "";

            // redirect back to login
            router.push({ name: 'login'});
        } catch (err) {
            console.error('an error took place during guide sign up');
            console.error(err);
            
            if (err.status === 500) {
                output.value = err.response.data.error.sqlMessage;
            } else {
                output.value = err.response.data.message;
            }
        }
    }
}

</script>