<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { Form } from 'vee-validate';
import axios from 'axios';
import { useRouter } from "vue-router";
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
    logoutMessage();
});
function logoutMessage() {
    var log = sessionStorage.getItem('logout')
    if(log){
        showErrorMessage1.value = true;
    }
}
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

function validate(values: any, { setErrors }: any) {
    const authStore = useAuthStore();
    return authStore.login(username.value, password.value).catch((error) => setErrors({ apiError: error }));
}
const showErrorMessage = ref(false);

const loginUser = async () => {
    showLoader.value = true;
    console.log("LOGIN API CALL")
    try {
        console.log("INSIDE TRY",valid.value)
        if (valid.value) {
            console.log("INSIDE IF")
        const formData = {
            email: username.value,
            password: password.value,
            rememberDevice: checkbox.value,
        };

        const response = await axios.post('api/login/', formData);
        console.log('Login API response:', response.data);
        //   router.push('/dashboards');
        if (response.data) {
            // redirect to previous url or default to home page
            // router.push(this.returnUrl || '/dashboards');
            showLoader.value = false;
            console.log("INSIDE IF")
            localStorage.setItem('authToken', response.data.access);
            localStorage.setItem('oi_td', response.data.oi_td);
            // await new Promise(resolve => setTimeout(resolve, 100)); // Ensure storage update
            localStorage.setItem('user_id', response.data.user_data.id);
            localStorage.setItem('role', response.data.role);
            localStorage.setItem('res_token', response.data.res_token);
            localStorage.setItem('res_type', response.data.res_type);
            sessionStorage.removeItem('logout')

            if(response.data.role === 'admin'){
                router.push(`/adminDashboard`);
            }
            else if(response.data.role === 'admin_app'){
                localStorage.setItem('role', 'admin_app');
                router.push(`/admin_otp_login`);
                
            }
            
            else if(response.data.role === 'new_admin_app'){
                localStorage.setItem('role', 'admin_app');
                router.push(`/restaurant_list_app`);
            }
            else if(response.data.role=="serviceStaff"){
                router.push(`/staffDashboard/${response.data.res_token}`);
            }
            else{
                router.push(`/dashboards/${response.data.res_token}`);
            }
            
            }else{
                showErrorMessage.value = true;
                showLoader.value = false;
                // Hide the error message after 5 seconds
                setTimeout(() => {
                showErrorMessage.value = false;
                }, 5000);
            }
        }
    } catch (error) {
        console.error('API error:', error);
        showErrorMessage.value = true;
        showLoader.value = false;
        // Hide the error message after 5 seconds
        setTimeout(() => {
            showErrorMessage.value = false;
        }, 5000);
    }
}
</script>

<template>
    <main>
            <v-row class="">
                <!-- <v-col cols="12" lg="12" xl="4" class="d-flex align-center scrollSignUp "> -->
                <v-col cols="12" lg="12"  class="12121212 ">
                    <div class="mt-xl-0 mt-5 widthSizeRegister">
                        <h2 class="text-h3 font-weight-bold mb-2">Welcome to <span class="text-primary">V-Locator</span></h2>
                        <div class="text-subtitle-1 mb-6">Please Fill Your Sign In detail</div>
                    </div>
                    <div v-show="showErrorMessage1" class="bg-lightwarning rounded-md pa-3 w-100">
                            <div class="text-subtitle-1 text-capitalize font-weight-bold text-warning ">You have been logged out due to inactivity. Please sign in again.</div>
                        </div>
                </v-col>
            </v-row>
            <p v-show="showErrorMessage" class="text-error">* Incorrect Email & Password</p>
            <Form @submit="loginUser" v-slot="{ errors, isSubmitting }" class="mt-5">
                <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">E-mail</v-label>
                <VTextField 
                v-model="username" 
                :rules="emailRules" 
                type="email"
                class="mb-8 inputFeildsCstm" 
                required 
                hide-details="auto"
                ></VTextField>

                <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">Password</v-label>
                <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    required
                    color="primary"
                    variant="outlined"
                    :type="passwordEye ? 'text' : 'password'"
                    hide-details="auto"
                    class="pwdInput inputFeildsCstm"
                    :append-inner-icon="passwordEye ? 'mdi-eye-off text-white' : 'mdi-eye text-white'"
                    @click:append-inner="passwordEye = !passwordEye"
                ></v-text-field>

                <div class="d-flex flex-wrap align-center my-3 ml-n2">
                    <v-checkbox v-model="checkbox" :rules="[(v:any) => !!v || 'You must agree to continue!']" required hide-details color="primary">
                        <template v-slot:label >Remember this device</template>
                    </v-checkbox>
                    <div class="ml-sm-auto">
                        <RouterLink :to="`/auth/forgot-password/` + token" class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium ps-2">Forgot Password ?</RouterLink>
                    </div>
                </div>
                <v-btn size="large" class="mt-2" color="primary" block type="submit" flat>
                    <template v-if="showLoader===true">
                      <div class='loaderBn'></div>
                    </template>
                    <template v-else>
                        Sign In
                    </template>
                </v-btn>
                <!-- <v-btn size="large" class="mt-2" color="primary" block type="submit" flat>Sign In</v-btn> -->
                <div v-if="errors.apiError" class="mt-2">
                    <v-alert color="error">{{ errors.apiError }}</v-alert>
                </div>
            </Form>
            <div class="text-center mt-4">
                <router-link to="/" class="text-h5  d-inline-block text-primary">Create an account</router-link>
            </div>
            <h4 class="text-h6 font-weight-medium mt-1 text-center text-white">New to V-Locator</h4>
            <!-- <h6 class="d-flex align-center mt-6 v-label v-label--clickable text-medium-emphasis">
                New to V-Locator
                <v-btn class="pl-0 text-primary text-body-1 opacity-1 pl-2 font-weight-medium" height="auto"
                     variant="plain"></v-btn>
            </h6> -->
    </main>


</template>
