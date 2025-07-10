<script setup lang="ts">
import Logo from '@/layouts/full/logo/Logo.vue';
/* Reset form */
import ResetPassword from '@/components/auth/ResetForm.vue';
</script>

<template>
    <div class="pa-3 v-application v-theme--DARK_BLUE_THEME customDarkClassAdd v-layout v-layout--full-height v-locale--is-ltr">
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
            <v-col cols="12" lg="5" xl="4" class="d-flex align-center justify-center scrollSignUp ">
                <div class="mt-xl-0 mt-5 widthSizeRegister">
                    <h4 class="text--darken-2 text-h6 font-weight-medium mb-2">Forgot your password?</h4>
                    <h2 class="text-h3 font-weight-bold mb-2">Welcome to <span class="text-primary">V-Locator</span></h2>
                    <p class="text-subtitle-1 pt-2 py-4 text-10">
                        Please enter the email address associated with your account and We will email you a link to reset your password.
                    </p>
                    <ResetPassword />
                </div>
            </v-col>
        </v-row>
    </div>
</template>
