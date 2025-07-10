<script setup lang="ts">
import Logo from '@/layouts/full/logo/Logo.vue';
/* Register form */
import RegisterForm from '@/components/auth/RegisterForm.vue';
</script>

<template>
    <div class="pa-3 v-application v-theme--DARK_BLUE_THEME customDarkClassAdd">
        <v-row class="h-100vh mh-100 auth">
            <v-col cols="12" lg="7" xl="8"
                class="d-lg-flex align-center justify-center authentication position-relative">
                <div class="auth-header pt-lg-6 pt-2 px-sm-6 px-3 pb-lg-6 pb-0">
                    <div class="position-relative">
                        <RouterLink to="/">
                            <img src='@/assets/images/locator/logo-light.png' alt="Logo Vlocator" class="logoStyleHeader"/>
                        </RouterLink>
                    </div>
                </div>
                <div class="login-page_img">
                    <img src="/src/assets/images/backgrounds/login-form-img.png" class="position-relative d-none d-lg-flex"
                        alt="login-background" />
                </div>
            </v-col>
            <RegisterForm />
        </v-row>
    </div>
</template>
