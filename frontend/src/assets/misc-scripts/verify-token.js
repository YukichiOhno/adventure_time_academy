// check cookies
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

// function to verify the token
export const verifyToken = async () => {
  const router = useRouter();
  const userStore = useUserStore();

    try {
        const response = await axios.get('http://localhost:5000/api/account/verify-token');

        // token is valid, return success message or true
         return response.data.message;
         
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // unauthorized - token is missing or invalid, handle logout
            logoutUser(router, userStore);

        } else {
            console.error('error verifying token:', error);
        }
    
        return null; // token is invalid or an error occurred
    }
};

// Function to handle user logout
const logoutUser = (router, userStore) => {
    userStore.resetUserInformation(); // reset user state in the Pinia store
    router.push({ name: 'login' }); // redirect to the login page
};