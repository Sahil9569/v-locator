
<script setup lang="ts">
// assets
import imageEmpty from '@/assets/images/locator/empty.png';
</script>

<template>
    <v-row class="justify-center mt-10">
        <v-col class="text-center" lg="7">
            <v-img :src="imageEmpty" alt="cover" class="imageEmpty"/>
            <h1 class="text-h1 mt-6 mb-2">No Items Found</h1>
            <p>Try checking your spelling or use more general terms</p>
        </v-col>
    </v-row>
</template>
