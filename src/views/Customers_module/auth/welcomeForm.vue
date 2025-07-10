<script setup lang="ts">
import { ref, watch, nextTick,onMounted  } from 'vue';
// import { useAuthStore } from '@/stores/auth';
import { Form } from 'vee-validate';
import axios from 'axios';
import { useRouter } from "vue-router";
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL

const hideSignup = ref(true);
const fname = ref('');
const lname = ref('');
const phone = ref('');
const cus_id = ref('');
const otpt = ref('');
const otpValue = ref('');
const ordertype = ref('Select order')
const orderOption = ref(['Dinein', 'Pickup']);
const urlToken = ref('');
const tab_id = ref('');
const cont = ref('');
const tabs =ref(false);
const showLoader =ref(false);
onMounted(() => {
    const parts = window.location.href.split("/");
    console.log("PARTS",parts);
    const tab_id = window.location.href.split('/').pop();
    cont.value = tab_id.split("?").pop()
    if(cont.value == "condition=repeat"){
        tabs.value = true;
    }
});

const formData = {
        firstname: fname.value,
        lastname: lname.value,
        phoneno: phone.value,
}

const otpDigits = ref(['', '', '', '']);

const handleInput = (index:any, event:any) => {
  if (index < otpDigits.value.length - 1 && event.target.value !== '') {
    setTimeout(() => {
      event.target.nextElementSibling.focus();
    }, 0);
  }
};

watch(otpDigits, (newOtp) => {
    otpValue.value = newOtp.join('');
    // You can emit the OTP value to the parent component or perform any other action here
    console.log('OTP Value:', otpValue);
});
const isHidden = ref(false)


const addCustomer = async () => {
    console.log("Coupan API CALL")
    
  try {
    const parts = window.location.href.split("/");
    const urlToken = parts[parts.length - 2];
    const tab_id = window.location.href.split('/').pop();
    const formdata = {
        url_token:urlToken,
        tab_id:tab_id,
        first_name:fname.value,
        last_name:lname.value,
        phone:phone.value,
        order_type:ordertype.value,
    }
    showLoader.value = true;
    const response = await axios.post('api/customers/add_customer/',formdata);
      console.log('Customer API response:', response.data);
      cus_id.value = response.data.id;
      otpt.value = response.data.otp;
      isHidden.value = true;
      localStorage.setItem('cus_id',response.data.id);
      localStorage.setItem('role','customer');
      showLoader.value = false;
  } catch (error) {
    console.error('API error:', error);
    
  }
}
const addCustomer1 = async () => {
    console.log("Coupan API CALL")
    
  try {
    const parts = window.location.href.split("/");
    const urlToken = parts[parts.length - 2];
    const tab_id = window.location.href.split('/').pop();
    const test = tab_id.split("?").pop();
    var tab_new = ''
    if(test){
        tab_new = tab_id.split("?")[tab_id.split("?").length - 2];
    }
    else{
        tab_new = tab_id
    }
    const formdata = {
        url_token:urlToken,
        tab_id:tab_new,
        phone:phone.value,
        order_type:orderOption.value,
        test:"Yes",
    }
    console.log("TESTSTS",formdata)
    showLoader.value = true;
    const response = await axios.post('api/customers/add_customer/',formdata);
      console.log('Customer API response:', response.data);
      cus_id.value = response.data.id;
      otpt.value = response.data.otp;
      isHidden.value = true;
      tabs.value = false;
      localStorage.setItem('cus_id',response.data.id);
      localStorage.setItem('role','customer');
      showLoader.value = false;
  } catch (error) {
    console.error('API error:', error);
    
  }
}
const otpCheck = async () => {
    console.log("Coupan API CALL")
    const parts = window.location.href.split("/");
    const urlToken = parts[parts.length - 2];
    const tab_id = window.location.href.split('/').pop();
    const test = tab_id.split("?").pop();
    console.log("HELLO NSAA",test);
    var tab_new = ''
    if(test === "condition=repeat"){
        console.log("IFFFFF")
        tab_new = tab_id.split("?")[tab_id.split("?").length - 2];
    }
    else{
        tab_new = tab_id
    }
    try {
        const parts = window.location.href.split("/");
        const urlToken = parts[parts.length - 2];
        const tab_id = window.location.href.split('/').pop();
        const formdata = {
            url_token:urlToken,
            tab_id:tab_new,
            cus_id:cus_id.value,
            otp:otpDigits.value,
        }
        console.log("TESTSTS",formdata)
        showLoader.value = true;
        const response = await axios.post('api/customers/chk_otp/',formdata);
        console.log('Customer API response:', response.data);
        localStorage.setItem('cust_status',"yes");
        showLoader.value = false;
        if(cont.value === 'condition=repeat'){
            router.push(`/vlocator/customerDashboard/${urlToken}`);
        }
        else{
            router.push(`/vlocator/myOrder/${urlToken}/${tab_id}`);
        }
        console.log(router)
    } catch (error) {
        console.error('API error:', error);
        
    }
}

const enforceTenDigits = (value: string) => {
    // phone.value = phone.value.replace(/\D/g, '');
    // Remove non-digit characters and format the phone number as (XXX) XXX-XXXX
    phone.value = phone.value.replace(/\D/g, '')
    .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');

};

</script>

<template>
    <div class="pa-3 v-application v-theme--DARK_BLUE_THEME customDarkClassAdd v-layout v-layout--full-height v-locale--is-ltr">
        <div v-if="tabs" class="widthWelcome pa-8 ">
            <div class="text-center">
                <h2 class="text-h3 font-weight-bold mb-2">Welcome to <span class="text-primary">Restaurant</span></h2>
                <div class="text-subtitle-1 mb-6">Please Fill In Detail</div>
            </div>
            <Form @submit="addCustomer1" v-slot="{ errors, isSubmitting }" class="mt-5">

                <!-- <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">First Name</v-label>
                <VTextField v-model="fname" class="inputFeildsCstm"  required ></VTextField>

                <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">Last Name</v-label>
                <VTextField v-model="lname" class="inputFeildsCstm"  required ></VTextField> -->

                <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">Phone no</v-label>
                <VTextField v-model="phone" class="inputFeildsCstm" @input="enforceTenDigits" maxlength="10" required ></VTextField>

                <!-- <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">Order type</v-label>
                <v-select variant="outlined" class="mb-5 inputFeildsCstm" v-model="ordertype" density="compact" hide-details :items="orderOption"  label=""></v-select> -->
            

                <v-btn size="large"  class="mt-8" color="primary" block type="submit" flat>
                    <template v-if="showLoader===true">
                        <div class='loaderBn'></div>
                    </template>
                    <template v-else>
                        Next
                    </template>
                </v-btn>
            </Form>
        </div>
        <div v-if="!isHidden && !tabs" class="widthWelcome pa-8 ">
            <div class="text-center">
                <h2 class="text-h3 font-weight-bold mb-2">Welcome to <span class="text-primary">Restaurant</span></h2>
                <div class="text-subtitle-1 mb-6">Please Fill In Detail</div>
            </div>
            <Form @submit="addCustomer" v-slot="{ errors, isSubmitting }" class="mt-5">

                <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">First Name</v-label>
                <VTextField v-model="fname" class="inputFeildsCstm"  required ></VTextField>

                <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">Last Name</v-label>
                <VTextField v-model="lname" class="inputFeildsCstm"  required ></VTextField>

                <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText" >Phone no</v-label>
                <VTextField v-model="phone" class="inputFeildsCstm" required  @input="enforceTenDigits"
      maxlength="10" ></VTextField>

                <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">Order type</v-label>
                <v-select variant="outlined" class="mb-5 inputFeildsCstm" v-model="ordertype" density="compact" hide-details :items="orderOption"  label=""></v-select>
            

                <v-btn size="large"  class="mt-8" color="primary" block type="submit" flat>
                    <template v-if="showLoader===true">
                        <div class='loaderBn'></div>
                    </template>
                    <template v-else>
                        Next
                    </template>
                </v-btn>
            </Form>
        </div>


        <!-- //otp screen -->

        <div v-if="isHidden" class="widthWelcome pa-8">
            <div class="text-center">
                <h2 class="text-h3 font-weight-bold mb-2">Verify Your  <span class="text-primary"> OTP</span></h2>
                <div class="text-subtitle-1 mb-6">We Sent a Verification code to Mobile Enter the code below boxes</div>
            </div>
            <div class="text-center">
                <img src="/src/assets/images/backgrounds/send-otp.png" class="w-50"
                    alt="login-background" />
            </div>
            <Form @submit="otpCheck" v-slot="{ errors, isSubmitting }" class="mt-5 text-center">

                <div class="text-subtitle-1 mb-6">Your OTP : {{otpt}}</div>


                <input
                    v-for="(digit, index) in otpDigits"
                    :key="index"
                    v-model="otpDigits[index]"
                    maxlength="1"
                    class="otp-digit"
                    @input="handleInput(index, $event)"
                    />

                <v-btn size="large" class="mt-8" color="primary" block type="submit" flat>
                    <template v-if="showLoader===true">
                        <div class='loaderBn'></div>
                    </template>
                    <template v-else>
                        Verify
                    </template>
                </v-btn>
            </Form>
        </div>
    </div>
</template>
