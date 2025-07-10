<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import { useCustomizerStore } from '../../../stores/customizer';
import { useEcomStore } from '@/stores/apps/eCommerce';
// Icon Imports
import { GridDotsIcon, LanguageIcon, SearchIcon, Menu2Icon, BellRingingIcon, ShoppingCartIcon } from 'vue-tabler-icons';
// import Logo from '../logo/Logo.vue';
// import LogoLight from "../logo/LogoLight.vue";
// import Logo from '../logo/Logo.vue';
import RtlLogo from '../logo/RtlLogo.vue';

// dropdown imports
// import LanguageDD from '../vertical-header/LanguageDD.vue';
import NotificationDD from '../vertical-header/NotificationDD.vue';
import ProfileDD from '../vertical-header/ProfileDD.vue';
import Navigations from '../vertical-header/Navigations.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL;

// import Searchbar from '../vertical-header/Searchbar.vue';
// import RightMobileSidebar from '../vertical-header/RightMobileSidebar.vue';
const logoUrl = ref('');
const customizer = useCustomizerStore();
const showSearch = ref(false);
const drawer = ref(false);
const appsdrawer = ref(false);
const user = ref('');
const priority = ref(customizer.setHorizontalLayout ? 0 : 0);
// user.value = ref(localStorage.getItem('role'))
function searchbox() {
    showSearch.value = !showSearch.value;
}
watch(priority, (newPriority) => {
    // yes, console.log() is a side effect
    priority.value = newPriority;
});

// count items
const store = useEcomStore();
const getCart = computed(() => {
    return store.cart;
});
onMounted(() => {
    getLogo();
});
const getLogo = async () => {
    console.log('Order LIST API CALL');
    try {
        const token = localStorage.getItem('res_token');
        const formData = {
            token: token
        };
        const response = await axios.post('api/get_logo/', formData);
        logoUrl.value = response.data;
    } catch (error) {
        console.error('API error:', error);
    }
};
</script>

<template>
    <v-app-bar elevation="10" :priority="priority" height="70" class="horizontal-header">
        <div :class="customizer.boxed ? 'maxWidth v-toolbar__content' : 'v-toolbar__content px-6'">
            <v-locale-provider v-if="customizer.setRTLLayout" rtl>
                <div class="hidden-md-and-down">
                    <RtlLogo />
                </div>
            </v-locale-provider>
            <v-locale-provider v-else>
                <div class="hidden-md-and-down">
                    <img :src="logoUrl" alt="Logo Vlocator" class="logoStyleHeader" v-if="logoUrl" />
                    <img src="@/assets/images/locator/logo-light.png" alt="Logo Vlocator" class="logoStyleHeader" v-else />
                </div>
            </v-locale-provider>

            <!-- <v-btn v-if="user != 'customer'" class="hidden-lg-and-up ms-3" icon rounded="sm" variant="flat" @click.stop="customizer.SET_SIDEBAR_DRAWER" size="small"> -->
            <v-btn class="hidden-lg-and-up ms-3" icon rounded="sm" variant="flat" @click.stop="customizer.SET_SIDEBAR_DRAWER" size="small">
                <Menu2Icon size="20" stroke-width="1.5" />
            </v-btn>

            <!-- search mobile -->
            <!-- <v-btn class="hidden-lg-and-up ml-3" icon rounded="sm" variant="flat" size="small" @click="searchbox">
                <SearchIcon size="17" stroke-width="1.5" />
            </v-btn> -->

            <!-- <v-sheet v-if="showSearch" class="search-sheet v-col-12">
                <Searchbar :closesearch="searchbox" />
            </v-sheet> -->

            <!-- ------------------------------------------------>
            <!-- Search part -->
            <!-- ------------------------------------------------>
            <!-- <v-sheet class="mx-2 d-none d-lg-block">
                <Searchbar />
            </v-sheet> -->

            <!---/Search part -->

            <!-- ------------------------------------------------>
            <!-- Mega menu -->
            <!-- ------------------------------------------------>
            <!-- <div class="hidden-md-and-down">
                <Navigations />
            </div> -->

            <v-spacer />
            <!-- ---------------------------------------------- -->
            <!---right part -->
            <!-- ---------------------------------------------- -->

            <!-- ---------------------------------------------- -->
            <!-- translate -->
            <!-- ---------------------------------------------- -->
            <!-- <LanguageDD /> -->

            <!-- ---------------------------------------------- -->
            <!-- Notification -->
            <!-- ---------------------------------------------- -->

            <NotificationDD />

            <!-- ---------------------------------------------- -->
            <!-- ShoppingCart -->
            <!-- ---------------------------------------------- -->
            <!-- <v-btn icon variant="text" color="primary" to="/">
                <v-badge color="error" :content="getCart?.length">
                    <ShoppingCartIcon stroke-width="1.5" size="22" />
                </v-badge>
            </v-btn> -->

            <!-- right sidebar -->
            <!-- <v-btn class="hidden-lg-and-up ml-3" icon rounded="sm" @click.stop="appsdrawer = !appsdrawer" variant="flat">
                <GridDotsIcon size="17" stroke-width="1.5" />
            </v-btn> -->

            <!-- ---------------------------------------------- -->
            <!-- User Profile -->
            <!-- ---------------------------------------------- -->
            <div class="ml-3 mr-sm-0 mr-3">
                <ProfileDD />
            </div>
        </div>
    </v-app-bar>

    <!-- <v-navigation-drawer v-model="appsdrawer" location="right" temporary>
        <RightMobileSidebar />
    </v-navigation-drawer> -->
</template>
