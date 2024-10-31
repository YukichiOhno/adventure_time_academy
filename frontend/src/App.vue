<template>
    <HeaderComponent/>
    <RouterView />
    <FooterComponent/>
</template>


<script setup>
import { RouterView } from 'vue-router';
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import { useRoute } from 'vue-router';
import { ref, watchEffect  } from 'vue';

// Import the current route
const route = useRoute();
const isHomeView = ref(false);

// Use watchEffect to reactively update isHomeView based on the current route
watchEffect(() => {
  isHomeView.value = route.name === 'home' || 'login';
});
</script>


<style>

</style>