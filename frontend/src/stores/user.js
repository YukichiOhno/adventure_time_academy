import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('logged-in-user-information', () => {
    const userInformation = reactive({
        number: null,
        username: null,
        identity: null
    });

    const resetUserInformation = () => {
        userInformation.number = null;
        userInformation.username = null;
        userInformation.identity = null;
    };

    return { userInformation, resetUserInformation }
}, { persist: { enabled: true}});