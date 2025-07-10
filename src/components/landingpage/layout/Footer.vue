<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SocialIcons from '@/components/landingpage/layout/socialIcons.vue';
</script>
<template>
    <section class="footer-section-main bg-dark" style="background-color:#121212;">
        <v-container class="pt-10">
            <v-row class="justify-center">
                <v-col cols="12" md="4" sm="5" lg="2" class="text-center" >
                    <div class="mt-8 mb-4">
                        <img src="@/assets/images/landingpage/favicon.png" alt="favicon" style="max-width:90px;"/>
                        <p class="text-subtitle-1 mt-2 text-13 text-white">
                            All rights reserved by <strong>VLocator</strong>. Designed &amp; Developed by
                            <a href="https://midriffinfosolution.org/"  class="a_link text-primary" target="_blank"><strong>MISPL</strong></a>
                        </p>
                    </div>
                    <div class="footer-social-icons">
                        <SocialIcons />
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>