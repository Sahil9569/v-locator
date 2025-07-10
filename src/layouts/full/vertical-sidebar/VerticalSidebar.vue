<script setup lang="ts">
import { ref, shallowRef, onMounted, computed } from 'vue';
import { useCustomizerStore } from '@/stores/customizer';
import sidebarItems from './sidebarItem';
import sidebarItemsAdmin from './sidebarItem-admin';
import sidebarItemsAdminApp from './sidebarItem-adminApp';

import type { menu } from './sidebarItem-admin';
import sidebarItemsKitchen from './sidebarItem-kitchenManger';

import HorizontalCustomer from '../horizontal-sidebar/horizontalCustomer';
import HorizontalService from '../horizontal-sidebar/horizontalServiceStaff';

import NavGroup from './NavGroup/index.vue';
import NavItem from './NavItem/index.vue';
import NavCollapse from './NavCollapse/NavCollapse.vue';
import Profile from './profile/Profile.vue';
// import Logo from '../logo/Logo.vue';
import RtlLogo from '../logo/RtlLogo.vue';
import axios from 'axios';
import { useRouter } from "vue-router";
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL

const customizer = useCustomizerStore();
const logoUrl = ref('');
const sidebarMenu = shallowRef(sidebarItems);
const sidebarMenuAdmin = shallowRef(sidebarItemsAdmin);
const sidebarMenuAdminApp = shallowRef(sidebarItemsAdminApp);
const sidebarMenuKitchen = shallowRef(sidebarItemsKitchen);
const sidebarMenuCustomer = shallowRef(HorizontalCustomer);
const sidebarMenuService = shallowRef(HorizontalService);
const menuItems = ref<menu[]>([])

const user = ref(localStorage.getItem('role'))
const loading = ref(false);
// const user = ref()

onMounted(() => {
  getLogo();
  // Initialize menuItems based on the initial value of user
  if (user.value === 'admin') {
    menuItems.value = sidebarMenuAdmin.value;
  } else if (user.value === 'kitchenManager') {
    menuItems.value = sidebarMenuKitchen.value;
  }
  else if (user.value === 'admin_app'){
    menuItems.value = sidebarMenuAdminApp.value;
  }
  else if (user.value === 'res_manager') {
    menuItems.value = sidebarMenu.value;
  }
  // else if (user.value === 'customer') {
  //   menuItems.value = sidebarMenuCustomer.value;
  // }
  // else if (user.value === 'serviceStaff') {
  //   menuItems.value = sidebarMenuService.value;
  // }
   else {
    // menuItems.value = sidebarMenu.value;
    return null;
  }
});
const getLogo = async () => {
    console.log("Order LIST API CALL")
    try {
        const token = localStorage.getItem('res_token');
        const formData = {
            token:token,
        };
        const response = await axios.post('api/get_logo/',formData);
        logoUrl.value = response.data
    } catch (error) {
        console.error('API error:', error);
        
    }
}
const scrollbarClass = computed(() => {
    return user.value === 'admin' || user.value === 'admin_app' ? 'adminBody' : '';
  });
const superAdmin = () => {

    loading.value = true
    router.push('/restaurant_list_app').then(() => {
        // Set the new value for 'role' in localStorage
        var newValue = 'admin_app';
        localStorage.setItem('role', newValue);
        window.location.reload();
    }).catch(error => {
      console.error("Error navigating to /restaurant_list_app:", error);
    });
}
window.addEventListener('load', () => {
  loading.value = false;
});
const backToAdmin = () => {
  loading.value = true
  router.push('/adminDashboard').then(() => {
    // Set the new value for 'role' in localStorage
    var adminBack = 'admin';
    localStorage.setItem('role', adminBack);
    window.location.reload();
  }).catch(error => {
    console.error("Error navigating to /restaurant_list_app:", error);
  });
}


</script>

<template>
  <div v-if="loading" class="p-relative">
      <div  class="loader-container">
          <!-- <div class="loader"></div> -->
      </div>
  </div>
    <v-navigation-drawer
        left
        v-model="customizer.Sidebar_drawer"
        elevation="0"
        rail-width="75"
        mobile-breakpoint="960"
        app
        class="leftSidebar"
        :rail="customizer.mini_sidebar"
        expand-on-hover width="270"
    >
        <!---Logo part -->
        <v-locale-provider  v-if="customizer.setRTLLayout"  rtl >
        <div class="pa-5">
            <RtlLogo />
        </div>
        </v-locale-provider>

        <v-locale-provider  v-else>
        <div class="pa-5">
          <img :src='logoUrl' alt="Logo Vlocator" class="logoStyleHeader" v-if="logoUrl"/>
          <img src='@/assets/images/locator/logo-light.png' alt="Logo Vlocator" class="logoStyleHeader"   v-else/>
        </div>
        <!-- <div class="pa-5" v-else>
          <img src='@/assets/images/locator/logo-light.png' alt="Logo Vlocator" class="logoStyleHeader"/>
        </div> -->
        </v-locale-provider>
        
        
        <!-- ---------------------------------------------- -->
        <!---Navigation -->
        <!-- ---------------------------------------------- -->
        <perfect-scrollbar class="scrollnavbar" :class="scrollbarClass">
            <v-list class="pa-6" >
                <!---Menu Loop -->
                <template v-for="(item, i) in menuItems">
                    <!---Item Sub Header -->
                    <NavGroup :item="item" v-if="item.header" :key="item.title" />
                    <!---If Has Child -->
                    <NavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
                    <!---Single Item-->
                    <NavItem :item="item" v-else class="leftPadding" />
                    <!---End Single Item-->
                </template>
            </v-list>
            <div class="pa-6 userbottom">
              
                <Profile />
            </div>
        </perfect-scrollbar>
    </v-navigation-drawer>
</template>
<style lang="scss">
// .loader {
//     border: 8px solid #f3f3f3;
//     border-top: 8px solid #40bf0f;
//     border-radius: 50%;
//     width: 50px;
//     height: 50px;
//     animation: spin 1s linear infinite;
// }

// @keyframes spin {
//     0% {
//         transform: rotate(0deg);
//     }
//     100% {
//         transform: rotate(360deg);
//     }
// }

.loader-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999999;
    bottom: 0;
    right:0;
}
</style>