<script setup lang="ts">
import {computed, ref, onMounted} from 'vue';
import { RouterView } from 'vue-router';
// import VerticalSidebarVue from './vertical-sidebar/VerticalSidebar.vue';
// import VerticalHeaderVue from './vertical-header/VerticalHeader.vue';
import HorizontalHeader from './horizontal-header/HorizontalHeader.vue';
import HorizontalSidebar from './horizontal-sidebar/HorizontalSidebar.vue';
import Customizer from './customizer/Customizer.vue';
import { useCustomizerStore } from '../../stores/customizer';
import { useAuthStore } from '../../stores/auth';

const customizer = useCustomizerStore();
const authStore = useAuthStore();
const intervalId = ref(0);

onMounted(()=>{
    setTimeout(()=>{
        customizer.SET_THEME(localStorage.getItem('role') === 'customer' || localStorage.getItem('role') === 'admin_app' ? 'DARK_BLUE_THEME' : 'BLUE_THEME');
    },1000)
})


    // console.log(customizer.actTheme)
//   return localStorage.getItem('role')=='customer'?'DARK_BLUE_THEME':'BLUE_THEME';

// intervalId.value = setInterval(theme_color,1000)
</script>

<template>
    <!-----RTL LAYOUT------->
    <v-locale-provider  v-if="customizer.setRTLLayout"  rtl >
        <v-app
            :theme="customizer.actTheme"
            :class="[
                customizer.actTheme,
                customizer.mini_sidebar ? 'mini-sidebar' : '',
                customizer.setHorizontalLayout ? 'horizontalLayout' : 'verticalLayout',
                customizer.setBorderCard ? 'cardBordered' : ''
            ]"
        >
            <!---Customizer location left side--->
            <v-navigation-drawer app temporary elevation="10" location="left" v-model="customizer.Customizer_drawer" width="320" class="left-customizer">
            <Customizer />
            </v-navigation-drawer>
            <!-- <VerticalSidebarVue v-if="!customizer.setHorizontalLayout" />
            <VerticalHeaderVue v-if="!customizer.setHorizontalLayout" /> -->
            <HorizontalHeader v-if="!customizer.setHorizontalLayout" />
            <HorizontalSidebar v-if="!customizer.setHorizontalLayout" />

            <v-main>
                <v-container fluid class="page-wrapper pb-sm-15 pb-10">
                    <div :class="customizer.boxed ? 'maxWidth' : ''">
                        <RouterView />
                        <!-- <v-btn
                            class="customizer-btn"
                            size="large"
                            icon
                            variant="flat"
                            color="primary"
                            @click.stop="customizer.SET_CUSTOMIZER_DRAWER(!customizer.Customizer_drawer)"
                        >
                            <SettingsIcon />
                        </v-btn> -->
                    </div>
                </v-container>
            </v-main>
        </v-app>
    </v-locale-provider>

     <!-----LTR LAYOUT------->
    <v-locale-provider  v-else> 
        <v-app
            :theme="customizer.actTheme"
            :class="[
                customizer.actTheme,
                customizer.mini_sidebar ? 'mini-sidebar' : '',
                customizer.setHorizontalLayout ? 'horizontalLayout' : 'verticalLayout',
                customizer.setBorderCard ? 'cardBordered' : ''
            ]"
        >
            <!---Customizer location right side--->
            <v-navigation-drawer app temporary elevation="10" location="right" v-model="customizer.Customizer_drawer" width="320">
                <Customizer />
            </v-navigation-drawer>
            <!-- <VerticalSidebarVue v-if="customizer.setHorizontalLayout" />
            <VerticalHeaderVue v-if="customizer.setHorizontalLayout" /> -->
            <HorizontalHeader v-if="!customizer.setHorizontalLayout" />
            <HorizontalSidebar v-if="!customizer.setHorizontalLayout" />

            <v-main>
                <v-container fluid class="page-wrapper pb-sm-15 pb-10">
                    <div :class="customizer.boxed ? 'maxWidth' : ''">
                        <RouterView />
                        <!-- <v-btn
                            class="customizer-btn"
                            size="large"
                            icon
                            variant="flat"
                            color="primary"
                            @click.stop="customizer.SET_CUSTOMIZER_DRAWER(!customizer.Customizer_drawer)"
                        >
                            <SettingsIcon />
                        </v-btn> -->
                    </div>
                </v-container>
                <!-- this is for display the notification -->
                
            </v-main>
        </v-app>
    </v-locale-provider>
</template>
