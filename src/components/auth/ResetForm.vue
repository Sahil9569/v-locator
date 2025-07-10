<script setup lang="ts">
import { ref } from 'vue';
// import { useAuthStore } from '@/stores/auth';
// import Logo from '@/layouts/full/logo/Logo.vue';

import { useRouter } from "vue-router";
const router = useRouter();
import BASE_URL from '@/stores/myVar';
import axios from 'axios';
axios.defaults.baseURL = BASE_URL

const user_token = sessionStorage.getItem('token');
const valid = ref(true);
const showLoader = ref(false);
const showLoader1 = ref(false);
const showLoader2 = ref(false);
const show = ref(true);
const email = ref('');
const otp = ref('');
const password_one = ref('');
const password_two = ref('');
const newpass = ref('');
const cnewpass = ref('');
const text_email = ref(false);
const passwordRules = ref([
    (v: string) => !!v || 'Password is required',
    (v: string) => (v && v.length <= 10) || 'Password must be less than 10 characters'
]);
const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);

// function validate(values: any, { setErrors }: any) {
    //     const authStore = useAuthStore();
    //     return authStore.login(username.value, otp.value).catch((error) => setErrors({ apiError: error }));
    // }
    
const emaildisabled = ref(false);
const showErrorMessage = ref(false);
const emailSent = ref(false);
const forotp = ref(false);
const newpassword = ref(false);
const passbtn = ref(true);



const forgotpassword = async () => {
    showLoader.value = true;
    console.log("forgota API CALL")
    console.log('check token is coming or not',user_token )
    try {
        console.log("INSIDE TRY",valid.value)
        if (valid.value) {
            console.log("INSIDE IF")
        const formData = {
            email: email.value,
            token: user_token,
        };
        const response = await axios.post('api/forgot-password/', formData);
        console.log('Login API response:', response.data);
        //   router.push('/dashboards');
        if (response.data.status === "email sent") {
            showLoader.value = false;
            emailSent.value = false;
            text_email.value = true;
            forotp.value = true;
            passbtn.value = false;
            emaildisabled.value = true;
            console.log("INSIDE IF")
            setTimeout(() => {
                text_email.value = false;
            }, 4000);
            // router.push('/dashboards');
        }else{
            showLoader.value = false;
            showErrorMessage.value = true;
            setTimeout(() => {
                showErrorMessage.value = false;
            }, 5000);
        }
        }
    } catch (error) {
        console.error('API error:', error);
        showErrorMessage.value = true;
        setTimeout(() => {
            showErrorMessage.value = false;
        }, 5000);
    }
}
const verifyOTP = async () => {
    console.log("otp API CALL")
    try {
        showLoader1.value = true;
        console.log("INSIDE TRY",valid.value)
        if (valid.value) {
            console.log("INSIDE IF")
        const formData = {
            email: email.value,
            otp: otp.value,
        };
        console.log('form-data ',formData)
        const response = await axios.post('api/verify-otp/', formData);
        console.log('otp API response:', response.data);
        //   router.push('/dashboards');
        if (response.data.status === "otp matched") {
            showLoader1.value = false;
            passbtn.value = false;
            forotp.value = false;
            newpassword.value = true;
            newpass.value = true;
            cnewpass.value = true;
            emaildisabled.value = true;
            console.log("INSIDE IF",emaildisabled.value)
            
            // router.push('/dashboards');
        }else{
            showLoader1.value = false;
            showErrorMessage.value = true;
            setTimeout(() => {
                showErrorMessage.value = false;
            }, 5000);
        }
        }
    } catch (error) {
        console.error('API error:', error);
        showErrorMessage.value = true;
        setTimeout(() => {
            showErrorMessage.value = false;
        }, 5000);
    }
};
const changepassword = async () => {
    console.log("change API CALL")
    showLoader2.value = true;
    try {
        console.log("INSIDE TRY",valid.value)
        if (valid.value) {
            console.log("INSIDE IF of change api")
        const formData = {
            email: email.value,
            new_password: password_one.value,
            cnew_pass: password_two.value,
        };
        console.log('form-data aagya yar yaha ',formData)
        const response = await axios.post('api/password-change/', formData);
        console.log('change API response:', response.data);
        //   router.push('/dashboards');
        if (response.data.status === "Password Updates Sucessfully") {
            showLoader2.value = false;
            passbtn.value = false;
            forotp.value = false;
            emaildisabled.value = true;
            newpassword.value = true;
            const token = sessionStorage.getItem('token');
            const logoutURL = `/auth/login`;
            router.push(logoutURL);
            // router.push('/auth/login/');
            console.log("INSIDE IF status 200")
        }else{
            showLoader2.value = false;
            showErrorMessage.value = true;
            setTimeout(() => {
                showErrorMessage.value = false;
            }, 5000);
        }
        }
    } catch (error) {
        console.error('API error:', error);
        showErrorMessage.value = true;
        setTimeout(() => {
            showErrorMessage.value = false;
        }, 5000);
    }
};
</script>

<template>
    <v-form ref="form" v-model="valid" lazy-validation action="/dashboards/analytical" class="mt-sm-5">
        <p v-show="text_email" class="text-h5 font-weight-medium pb-4 text-primary">Email Has Been Sent !! Please Check </p>
        <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Email Address</v-label>
        <VTextField v-model="email" :rules="emailRules" required v-show="!emailSent" :disabled="emaildisabled" class="text-white"></VTextField>


        <!-- Show the OTP input field only if the email is sent -->
        <v-label v-show="forotp" class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">OTP</v-label>
        <VTextField v-show="forotp" v-model="otp" required  class="text-white"></VTextField>

        <v-label  v-show="newpass" class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">New Password</v-label>
        <VTextField v-show="newpass" v-model="password_one" required  class="text-white"></VTextField>

        <v-label  v-show="cnewpass" class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Confirm New Password</v-label>
        <VTextField v-show="cnewpass" required  v-model="password_two" class="text-white"></VTextField>
    

        <!-- Show the "Forgot Password" button or the "Verify OTP" button based on emailSent -->
        <v-btn class="mt-3" size="large" v-show="passbtn"     color="primary" block @click="forgotpassword()">
            <template v-if="showLoader===true">
                <div class='loaderBn'></div>
            </template>
            <template v-else>
                Forgot Password
            </template>
            
        </v-btn>
        <v-btn class="mt-3" size="large" v-show="forotp"      color="primary" block @click="verifyOTP()">
            <template v-if="showLoader1===true">
                <div class='loaderBn'></div>
            </template>
            <template v-else>
                Verify OTP
            </template>
            
        </v-btn>
        <v-btn class="mt-3" size="large" v-show="newpassword" color="primary" block @click="changepassword()">
            <template v-if="showLoader2===true">
                <div class='loaderBn'></div>
            </template>
            <template v-else>
                Save
            </template>
            
        </v-btn>
        <!-- <v-btn size="large" color="lightprimary" to="/auth/login" block class="mt-5 text-primary" flat>Back to Login</v-btn> -->

    </v-form>
</template>
