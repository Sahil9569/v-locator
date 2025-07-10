<script setup lang="ts">
import Logo from '@/layouts/full/logo/Logo.vue';
/* Login form */
import LoginForm from '@/components/auth/LoginForm.vue';
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
                    <!-- <h2 class="text-h3 font-weight-bold mb-2">Welcome to <span class="text-primary">V-Locator</span></h2>
                    <div class="text-subtitle-1 mb-6">Please Fill Your Sign In detail</div> -->
                    <LoginForm />
                    <!-- <h6 class=" d-flex align-center mt-6 v-label v-label--clickable text-medium-emphasis">
                        New to V-Locator
                        <v-btn class="pl-0 text-primary text-body-1 opacity-1 pl-2 font-weight-medium" height="auto"
                            to="/auth/register" variant="plain">Create an account</v-btn>
                    </h6> -->
                </div>
            </v-col>
        </v-row>
    </div>
</template>
