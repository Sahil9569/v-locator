<script setup lang="ts">
    import { ref, onMounted, watch } from 'vue';
    import { useAuthStore } from '@/stores/auth';
    import { Form } from 'vee-validate';
    import axios from 'axios';
    import { useRouter } from "vue-router";
    const authStore = useAuthStore();
    const router = useRouter();
    import ResetPassword from '@/components/auth/ResetForm.vue';
    import BASE_URL from '@/stores/myVar';
    axios.defaults.baseURL = BASE_URL
    const token = sessionStorage.getItem('token');
    const showErrorMessage1 = ref(false);
    /*Social icons*/
    // import google from '@/assets/images/svgs/google-icon.svg';
    // import facebook from '@/assets/images/svgs/facebook-icon.svg';
    onMounted(() => {
        var token = window.location.href.split('/').pop();
        sessionStorage.setItem('token', token);
        setTimeout(() => {
            showAlert.value = false; // Set showAlert to false after 4 seconds
        }, 4000);
        // logoutMessage()
    });
    // function logoutMessage() {
    //     var log = sessionStorage.getItem('logout')
    //     if (log) {
    //         showErrorMessage1.value = true;
    //     }
    // 


    const passwordSentMessage = ref('We’ve sent your password to your email.');
    const showAlert = ref(true);
    const showLoader = ref(false);
    const checkbox = ref(false);
    const valid = ref(true);
    const show1 = ref(false);
    const passwordEye = ref(false);
    const password = ref('');
    const username = ref('');
    const passwordRules = ref([
        (v: string) => !!v || 'Password is required',
        // (v: string) => (v && v.length <= 10) || 'Password must be less than 10 characters'
    ]);
    const emailRules = ref([
        (v: string) => !!v || 'E-mail is required',
        (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        (v: string) => !/[A-Z]/.test(v) || 'E-mail must not contain uppercase letters',
    ]);

    const validate = async () => {
    try {
        await authStore.login(username.value, ''); // Call login with username
    } catch (error) {
        console.error('Login error:', error);
    }
    };

    // Handle input changes and limit to 6 digits
    const handleInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;

    // Only allow digits and limit the length to 6
    if (/^\d*$/.test(value) && value.length <= 6) {
        username.value = value; // Update the value if it's valid
    } else {
        // If the input is invalid, revert to the previous valid state
        username.value = username.value.slice(0, 6); // Keep it at max 6 digits
    }

    validate(); // Call the validate function
    };

    // function validate(values: any, { setErrors }: any) {
    //     const authStore = useAuthStore();
    //     return authStore.login(username.value).catch((error) => setErrors({ apiError: error }));
    // }
    const showErrorMessage = ref(false);

    const Userotp = async () => {
        showLoader.value = true;
        console.log("LOGIN API CALL Userotp ______")
        try {
            if (valid.value) {
                const formData = {
                    oi_td       :   localStorage.getItem('oi_td'),
                    admin_otp   :   username.value,
                };

                const response = await axios.post('api/v_super/admin_otp/', formData);
                console.log('Login API response_________:', response.data);
                if (response.data) {
                    localStorage.removeItem('oi_td');
                    localStorage.setItem('authToken', response.data.access);
                    router.push(`/restaurant_list_app`);
                } else {
                    showErrorMessage.value = true;
                    showLoader.value = false;
                    setTimeout(() => {
                        showErrorMessage.value = false;
                    }, 4000);
                }
            }
        } catch (error) {
            console.error('API error:', error);
            showErrorMessage.value = true;
            showLoader.value = false;
            setTimeout(() => {
                showErrorMessage.value = false;
            }, 4000);
        }
    }
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
                    <v-row class="">
            
                            <v-col cols="12" lg="12" class="12121212 ">
                                <div class="mt-xl-0 mt-5 widthSizeRegister">
                                    <h2 class="text-h3 font-weight-bold mb-2">Welcome to <span class="text-primary">V-Locator</span>
                                    </h2>
                                    <div class="text-subtitle-1 mb-6">Please Fill Your Otp Here</div>
                                </div>
                                <v-alert
                                v-if="showAlert"
                                border="left"
                                color="success"
                                class="text-dark"
                                >
                                {{passwordSentMessage}}
                                </v-alert>
                                
                                
                            </v-col>
                        </v-row>
                        <p v-show="showErrorMessage" class="text-error">* Incorrect OTP</p>
                        <Form @submit="Userotp" v-slot="{ errors, isSubmitting }" class="mt-5">
                            <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">OTP <span class="required">*</span></v-label>
                            <VTextField v-model="username" :maxlength="6" type="number" @input="handleInput " class="mb-8 inputFeildsCstm" placeholder="Otp length must be 6 number" required hide-details="auto">
                            </VTextField>

                            <v-btn size="large" class="mt-2" color="primary" block type="submit" flat>
                                <template v-if="showLoader===true">
                                    <div class='loaderBn'></div>
                                </template>
                                <template v-else>
                                    Save
                                </template>
                            </v-btn>
                            <!-- <v-btn size="large" class="mt-2" color="primary" block type="submit" flat>Sign In</v-btn> -->
                            <div v-if="errors.apiError" class="mt-2">
                                <v-alert color="error">{{ errors.apiError }}</v-alert>
                            </div>
                        </Form>
                </div>
            </v-col>
        </v-row>
    </div>

        



</template>

<style>
.text-dark .v-alert__content {
    color: #000;
}
.required {
  color: red; /* Style the asterisk */
  margin-left: 4px; /* Optional spacing */
}
</style>