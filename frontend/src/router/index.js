import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useUserStore } from '@/stores/user';
import { verifyToken } from '@/assets/misc-scripts/verify-token';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue')
        },
        {
            path: '/contact-us',
            name: 'contact-us',
            component: () => import('../views/ContactView.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue'),
            beforeEnter: async (to, from, next) => {
                const { username, identity, number } = useUserStore().userInformation;

                if (!username && !identity && !number) {
                    next();
                } else {
                    next({ name: 'home' });
                }
            }
        },
        {
            path: '/account',
            name: 'account',
            meta: { requires_authentication: true },
            component: () => import('../views/AccountView.vue')
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    if (to.meta.requires_authentication) {
        try {
            // Call verifyToken to check if the user is authenticated
            const isVerified = await verifyToken();

            if (isVerified) {
                next(); // Token is valid, proceed to the secure route
            } else {
                next({ name: 'login' }); // Token is invalid, redirect to login
            }

        } catch (error) {
            console.error('error verifying token:', error);
            next({ name: 'login' }); // In case of error, redirect to login
        }
    } else {
        next(); // No authentication required, proceed to the route
    }
});

export default router;
