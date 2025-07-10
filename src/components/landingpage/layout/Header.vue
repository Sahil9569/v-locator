<script lang="ts">
import { ref, watch } from 'vue';
import { useCustomizerStore } from '@/stores/customizer';
import Logo from '@/layouts/full/logo/Logo.vue';
import RtlLogo from '@/layouts/full/logo/RtlLogo.vue';
import Navigations from '@/components/landingpage/layout/Navigation.vue';
/*Mobile Sidebar*/
import MobileSidebar from '@/components/landingpage/layout/MobileSidebar.vue';
/*import tabler icons*/
import SocialIcons from '@/components/landingpage/layout/socialIcons.vue';

import { Menu2Icon } from 'vue-tabler-icons';
// const appsdrawer = ref(false);
// const customizer = useCustomizerStore();

export default{

    data() {
        return {
        limitPosition: 500,
        scrolled: false,
        lastPosition: 0,
        appsdrawer: false,
        customizer : useCustomizerStore
        };
    },
    components:{
        Logo,
        RtlLogo,
        Navigations,
        MobileSidebar,
        SocialIcons,
        Menu2Icon
    },
    methods: {
        handleScroll() {
        if (this.lastPosition < window.scrollY && this.limitPosition < window.scrollY) {
            this.scrolled = true;
            // move up!
        } 
        
        if (this.lastPosition > window.scrollY) {
            this.scrolled = false;
            // move down
        }
        
        this.lastPosition = window.scrollY;
        // this.scrolled = window.scrollY > 250;
        }
    },
    created() {
        window.addEventListener("scroll", this.handleScroll);
    },
    destroyed() {
        window.removeEventListener("scroll", this.handleScroll);
    }

}


</script>
<template>
    <div>
        <div :class="{'headroom--unpinned': scrolled}" class="headroomHeader"  v-on="handleScroll"> 
            <v-app-bar height="36" class="lp-header bg-darkTheme top_header_section" flat>
                <v-container class="maxWidth">
                    <div class="d-flex align-center" style="justify-content: space-between;">
                        <div class="topContentHead">
                            <h2>Welcome To V Locator</h2>
                        </div>
                        <div class="headerSocialIcn">
                            <SocialIcons />
                        </div>
                    </div>
                </v-container>
            </v-app-bar>
            <!-- -----------------------------------------------
                    Start Header
                    ----------------------------------------------- -->
            <v-app-bar height="70" class="lp-header bg-darkTheme header-bottom-section" flat>
                <v-container class="maxWidth py-sm-4 py-0">
                    <v-toolbar class="d-flex align-center bg-darkTheme">
                        <!-- Logo -->
                        <div class="logo">
                            <RouterLink to="/">
                                <img src='@/assets/images/locator/logo-light.png' alt="Logo Vlocator" class="logoStyleHeader"/>
                            </RouterLink>
                        </div>
                        
                        <!-- Desktop view Navigation -->
                        <div class="navigation  ml-auto d-lg-flex d-none">
                            <Navigations />
                        </div>
                        <v-btn variant="text" class="hidden-lg-and-up text-white ml-auto" icon @click.stop="appsdrawer = !appsdrawer">
                            <Menu2Icon size="22" stroke-width="1.5" />
                        </v-btn>
                    </v-toolbar>
                </v-container>
            </v-app-bar>
            <!-- -----------------------------------------------
                    End Header
                    ----------------------------------------------- -->
        </div>

        <!----sidebar menu drawer start----->
        <v-navigation-drawer class="lp-drawer bg-darkTheme" v-model="appsdrawer" location="left" temporary>
            <MobileSidebar />
        </v-navigation-drawer>
    </div>
</template>
