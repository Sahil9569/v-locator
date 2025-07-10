<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import { useCustomizerStore } from '../../../stores/customizer';
import { useEcomStore } from '@/stores/apps/eCommerce';
import { GridDotsIcon, PlusIcon, LanguageIcon, SearchIcon, Menu2Icon, BellRingingIcon, ShoppingCartIcon } from 'vue-tabler-icons';
// import LanguageDD from './LanguageDD.vue';
import NotificationDD from './NotificationDD.vue';
import ProfileDD from './ProfileDD.vue';
import Searchbar from './Searchbar.vue';
import RightMobileSidebar from './RightMobileSidebar.vue';
import Navigations from './Navigations.vue';
import imageTrail from '@/assets/images/locator/trailEnd.png';

const customizer = useCustomizerStore();
const showSearch = ref(false);
const appsdrawer = ref(false);
const priority = ref(customizer.setHorizontalLayout ? 0 : 0);
const packagesButtonClicked = ref(false);
const link = localStorage.getItem('res_token');
function searchbox() {
    showSearch.value = !showSearch.value;
}

const check_role = localStorage.getItem('role');
onMounted(() => {
    packagesButtonClicked.value = true;
});
watch(priority, (newPriority) => {
    priority.value = newPriority;
});

// count items
const store = useEcomStore();
const getCart = computed(() => {
    return store.cart;
});
</script>

<template>
    <v-app-bar elevation="0" :priority="priority" height="70" class="">
        <v-btn
            class="hidden-md-and-down"
            icon
            color="primary"
            variant="text"
            @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)"
        >
            <Menu2Icon size="20" stroke-width="1.5" />
        </v-btn>

        <v-btn class="hidden-lg-and-up" icon variant="flat" @click.stop="customizer.SET_SIDEBAR_DRAWER" size="small">
            <Menu2Icon size="20" stroke-width="1.5" />
        </v-btn>

        <v-sheet>
            <Searchbar />
        </v-sheet>
        <v-spacer />

        <v-menu :close-on-content-click="true">
            <template v-if="check_role === 'Admin' || check_role != 'admin_app'" v-slot:activator="{ props }">
                <v-btn variant="flat" color="primary" class="text-white" v-bind="props">
                    <PlusIcon size="16" class="me-1" />Buy Package
                </v-btn>
            </template>
            <template v-else v-slot:activator="{ props }">
                <v-btn v-if="check_role != 'admin_app'" variant="flat" color="primary" class="text-white" v-bind="props">
                    <PlusIcon size="16" class="me-1" />Buy Package
                </v-btn>
            </template>

            <div class="mainBuubleIcon">
                <v-sheet rounded="md" width="360" elevation="10">
                    <perfect-scrollbar style="height: 200px">
                        <v-list class="py-0 theme-list" lines="two">
                            <v-list-item active-color="primary" class="py-4 px-8">
                                <img :src="imageTrail" alt="trailEnd" class="mx-auto mb-4 d-block" style="max-width: 80px" />
                                <p class="text-center text-h5 font-weight-medium textSecondary">
                                    Hi,Your Trial Period Ended Soon
                                    <router-link :to="'/packages/' + link" class="text-primary">Click </router-link>Here To Buy A Package.
                                </p>
                            </v-list-item>
                            <v-divider></v-divider>
                        </v-list>
                    </perfect-scrollbar>
                </v-sheet>
            </div>
        </v-menu>

        <!-- ---------------------------------------------- -->
        <!-- Notification -->
        <!-- ---------------------------------------------- -->
        <NotificationDD v-if="check_role != 'admin_app'" />

        <!-- right sidebar -->
        <!-- <v-btn
            variant="text"
            color="primary"
            class="hidden-lg-and-up"
            icon
            @click.stop="appsdrawer = !appsdrawer"
        >
            <GridDotsIcon size="17" stroke-width="1.5" />
        </v-btn> -->

        <!-- ---------------------------------------------- -->
        <!-- User Profile -->
        <!-- ---------------------------------------------- -->
        <div class="ml-2">
            <ProfileDD />
        </div>
    </v-app-bar>

    <!-- ---------------------------------------------- -->
    <!-- Right Sidebar -->
    <!-- ---------------------------------------------- -->
    <v-navigation-drawer v-model="appsdrawer" location="right" temporary>
        <RightMobileSidebar />
    </v-navigation-drawer>
</template>


