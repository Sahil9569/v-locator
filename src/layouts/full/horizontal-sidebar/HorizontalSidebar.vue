<script setup lang="ts">
import { ref, shallowRef, onMounted } from 'vue';
import { useDisplay } from 'vuetify';
import { useCustomizerStore } from '@/stores/customizer';
import HorizontalCustomer from './horizontalCustomer';
import type {menu} from './horizontalCustomer';
import HorizontalService from './horizontalServiceStaff';
import NavItem from './NavItem/Index.vue';
import NavCollapse from './NavCollapse/Index.vue';
import VerticalSidebar from '../vertical-sidebar/VerticalSidebar.vue';

const customizer = useCustomizerStore();
const sidebarMenuCustomer = shallowRef(HorizontalCustomer);
const sidebarMenuService = shallowRef(HorizontalService);
const { mdAndUp } = useDisplay();

const menuItems = ref<menu[]>([])

const user = ref(localStorage.getItem('role'))
onMounted(() => {
  // Initialize menuItems based on the initial value of user
  if (user.value === 'customer') {
    menuItems.value = sidebarMenuCustomer.value;
  } else if (user.value === 'serviceStaff') {
    menuItems.value = sidebarMenuService.value;
  }
  else {
    // menuItems.value = sidebarMenu.value;
    return null;
  }
});


// const user = ref()



// function subIsActive(input: any) {
//     const paths = Array.isArray(input) ? input : [input];
//     return paths.some((path) => {
//         return; //$route.path.indexOf(path) === 0; // current path starts with this path string
//     });
// }
</script>

<template>
    <template v-if="mdAndUp">
        <div class="horizontalMenu  border-bottom">
            <div :class="customizer.boxed ? 'maxWidth' : 'px-6'">
                <ul class="gap-1 horizontal-navbar mx-0">
                    <!---Menu Loop -->
                    <li v-for="(item, i) in menuItems" :key="i" class="navItem">
                        <!---If Has Child -->
                        <NavCollapse :item="item" :level="0" v-if="item.children" />
                        <!---Single Item-->
                        <NavItem :item="item" v-else />
                        <!---End Single Item-->
                    </li>
                </ul>
            </div>    
        </div>
    </template>
    <template v-else>
      <div class="mobile-menu">
          <VerticalSidebar />
      </div>
    </template>
</template>
<style lang="scss"></style>
