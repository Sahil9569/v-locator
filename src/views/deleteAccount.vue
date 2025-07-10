<script setup lang="ts">
import { ref,computed  } from 'vue';
import Logo from '@/layouts/full/logo/Logo.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL;
const email = ref('')
const otpCode = ref(false);
const otpConfirmation = ref(false);
const otp_value = ref('');
const emailErrors = ref<string[]>([]);
const showOtpButton = ref(false)
const SavemailButton = ref(true)
const errorMessage = ref('')







const emailRules = [
    v => !!v || 'Email or phone is required',
    v => (v && v.length >= 5 ) || 'Must be at least 5 characters long',
];
const isEmailValid = computed(() => {
    const result = emailRules.map(rule => rule(email.value));
    emailErrors.value = result.filter(msg => typeof msg === 'string');
    return emailErrors.value.length === 0;
});

// Validate email input
const validateEmail = () => {
    const result = emailRules.map(rule => rule(email.value));
    emailErrors.value = result.filter(msg => typeof msg === 'string');
};



const Check_phone_or_email = async () => {
    otpCode.value = false
    console.log('yaha aagya hu Check_phone_or_email m ')
    try{
        const token_user = localStorage.getItem('authToken');
        const formData = new FormData();
        formData.append('token',token_user)
        formData.append('email',email.value)
        const response = await axios.post('api/v_super/get_delete_user/',formData)
        console.log('check the email',response)
        if (response.data.status === 'user_get') {
            errorMessage.value = 'Otp Has been Sent to Your Email, please check.';
            otpCode.value = true
            SavemailButton.value = false
            showOtpButton.value = true
            setTimeout(() => {
                errorMessage.value = '';
            }, 3000);
        } else if(response.data.error){
            errorMessage.value = 'Invalid Credentials.';
            setTimeout(() => {
                errorMessage.value = '';
            }, 2000);
        }
    }catch (error){
        console.error('Error occurred:', error);
        errorMessage.value = 'Invalid Credentials.';
        setTimeout(() => {
            errorMessage.value = '';
        }, 2000);

    }
}


const Check_otp = async () => {
    otpCode.value = false
    console.log('yaha aagya hu Check_phone_or_email m ')
    try{
        const token_user = localStorage.getItem('authToken');
        const formData = new FormData();
        formData.append('otp_value',otp_value.value)
        formData.append('email',email.value)
        const response = await axios.post('api/v_super/Check_otp/',formData)
        console.log('check the email',response)
        if (response.data.status === 'app_user_profile') {
            otpCode.value = true
            otpConfirmation.value = true
        } else{
            errorMessage.value = 'Invalid Credentials.';
            setTimeout(() => {
                errorMessage.value = '';
            }, 2000);
        }
    }catch (error){
        errorMessage.value = 'Invalid Credentials.';
        setTimeout(() => {
            errorMessage.value = '';
        }, 2000);
    }
}


const final_user_delete = async () => {
    try{
        
        const formData = new FormData();
        formData.append('email',email.value)
        const response = await axios.post('api/v_super/final_user_delete/',formData)
        console.log('check the email',response)
        if (response.data.status === 'final_user_delete') {
            otpConfirmation.value = false;
            email.value = '';
            otp_value.value = '';
            errorMessage.value = 'User has been deleted.';
            setTimeout(() => {
                window.location.reload();
            }, 1000);
            
        } else{
            errorMessage.value = 'Invalid Credentials.';
            setTimeout(() => {
                errorMessage.value = '';
            }, 2000);
        }
    }catch (error){
        errorMessage.value = 'Invalid Credentials.';
        setTimeout(() => {
            errorMessage.value = '';
        }, 2000);
    }
}
const handleNoClick = () => {
    otpConfirmation.value = false;
    // Reload the current page
    setTimeout(() => {
        window.location.reload();
    }, 0); // Redirect immediately
}




</script>

<template>
    <main>
        <v-container>
            <v-row class="justify-center mt-10">
                <v-col cols="6">
                    <v-card elevation="10" class="overflow-hidden">
                        <v-card-item class="text-center ">
                        <div class="d-flex justify-center mb-7">  <Logo /></div>
                            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
                            <v-text-field
                                variant="outlined"
                                hide-details
                                v-model="email"
                                label="Email or phone"
                                class="mt-2"
                                :rules="emailRules"
                                :error-messages="emailErrors"
                                @input="validateEmail"
                            ></v-text-field>

                            <v-text-field
                                v-if="otpCode == true"  
                                variant="outlined"
                                hide-details
                                v-model="otp_value"
                                label="OTP"
                                class="mt-2"
                            ></v-text-field>

                            <v-btn color="primary" v-if="SavemailButton"  @click="Check_phone_or_email" class="mt-5"
                                :disabled="!isEmailValid">Check email
                            </v-btn>
                            <v-btn color="primary" v-if="showOtpButton" @click="Check_otp" class="mt-5" >Check otp
                            </v-btn>
                            
                            <v-dialog v-model="otpConfirmation" max-width="500">
                                <v-card>
                                    <v-card-text class="mb-8 mt-5">
                                        <h3 class="text-h4 text-center mt-5 mb-5">If you want delete so you can delete</h3>
                                        <div class="d-flex gap-2 justify-center">
                                            <v-btn @click="handleNoClick" color="error">No</v-btn>
                                            <v-btn color="primary" variant="flat" @click="final_user_delete">Yes</v-btn>
                                        </div>
                                        
                                    </v-card-text>
                                </v-card>
                            </v-dialog>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </main>
</template>
<style scoped>
    .error-message {
        color: red;  /* Set the text color to red */
        font-size: 14px;  /* Optional: Adjust font size */
        margin-top: 10px;  /* Optional: Add some space above the error message */
    }
</style>