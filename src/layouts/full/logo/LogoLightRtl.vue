<script setup lang="ts">
import { RouterLink } from 'vue-router';
import RtlLightlogo from '@/assets/images/locator/logo-light.png';
</script>
<template>
    <div class="logo">
        <RouterLink to="/">
            <img :src="RtlLightlogo" alt="home" />
        </RouterLink>
    </div>
</template>
