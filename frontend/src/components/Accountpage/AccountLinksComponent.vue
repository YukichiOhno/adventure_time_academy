<template>
<section class="account-links-component">
    <nav>
        <ul>
            <li><RouterLink :to="{ name: 'edit-account' }">Edit Account</RouterLink></li>
        </ul>
    </nav>
</section>
</template>


<script setup>
import { RouterLink } from 'vue-router';
</script>