<script setup lang="ts">
import { RouterLink } from 'vue-router';
import RtlDarklogo from '@/assets/images/locator/logo-dark.png';
</script>
<template>
    <div class="logo">
        <RouterLink to="/">
            <img :src="RtlDarklogo" alt="home" />
        </RouterLink>
    </div>
</template>
