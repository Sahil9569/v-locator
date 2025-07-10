<script setup lang="ts">
import { ref, computed,onMounted,watch} from 'vue';
import axios from 'axios';
import { useRouter } from "vue-router"; // Import the useRouter function from vue-router

const router = useRouter();
import BASE_URL from '@/stores/myVar';

const show2 = ref(false);
// const show3 = ref(true);


axios.defaults.baseURL = BASE_URL
const showErrorMessage = ref('');
const valid = ref(true);
// const show1 = ref(false);
const select = ref('');
const city1 = ref('');
const checked = ref('');
const state1 = ref('');
const location = ref(['USA']);
const city2 = ref([]);
const state2 = ref([]);
const state3 = ref([]);
const password = ref('');
const showLoader = ref(false);
const username = ref('');
const passwordRules = ref([
    (v: string) => !!v || 'Password is required',
    // (v: string) => (v && v.length <= 10) || 'Password must be less than 10 characters'
]);
const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);
const showSuccessMessage = ref(false);
const hideSignup = ref(true);
const add1 = ref('');
const add2 = ref('');
const fname = ref('');
const fnameRules = ref([
    (v: string) => !!v || 'Name is required',
]);
const phone = ref<string>('');
const cityList = ref([]);
const phoneNumberRule = computed(() => {
    if (phone.value.length !== 10) {
    return 'Phone number must have exactly 10 digits';
    }
    return true;
});
onMounted(() => {
    getCountry();
});
const businessModal = ref('')
// const businessOption = ref(['Restaurant', 'Vendor', 'Merchant', 'Ghost Kitchen', 'Grocery store', 'Specialty Food Store']);
const businessOption = ref(['Restaurant', 'Vendor']);
const submitForm = async () => {
  try {
    if (valid.value) {
        // Prepare the data to be sent to the API
        const formData = {
          res_type:businessModal.value,
          res_name: fname.value,
          email: username.value,
          password: password.value,
          phone: phone.value,
          add1: add1.value,
          add2: add2.value,
          city: city1.value,
          state: state1.value,
          country: select.value,
          checked: checked.value,
          // Add other form fields here...
        };
        console.log("Initial DATA SUBMIT successfully1111:",formData);
        showLoader.value = true; 
        const response = await axios.post('api/signup/', formData);
        console.log('API response:', response.data);
        showSuccessMessage.value = true;
        hideSignup.value = false;
        showLoader.value = false;
        setTimeout(() => {
          router.push(`/auth/login`);
        }, 3000);
      }
  } catch (error) {
    if (error.response && error.response.data) {
        console.log('this is respose coming in signup',error.response)
            showErrorMessage.value  = error.response.data.error;
            
            setTimeout(() => {
              showErrorMessage.value = false;
            }, 4000);
        }
    console.error('API error:', error);
    showLoader.value= false
    // setTimeout(() => {
    // showErrorMessage.value = false;
    // }, 4000);
  }
 
};
const getCountry = async () => {
  try {
      const response = await axios.post('api/get_country/');
      // Handle the API response (optional)
      console.log('API COUNTTRY response:', response.data);
      state2.value = response.data;
      console.log('APIPIPI',response.data.cities);
  } catch (error) {
    // Handle any errors that occurred during the API call
    console.error('API error:', error);
  }
 
};
const getCity = async (city:any) => {
    console.log("YAHA PAR",city)
  try {
    const formData = {
        state:city,
        // Add other form fields here...
      };
      console.log("YE JA RAHA HAI ", formData);
      const response = await axios.post('api/get_cities_by_state/',formData);
      // Handle the API response (optional)
      console.log('API COUNTTRY XXXXXXXXXX:', response.data);
      city2.value = response.data;
      console.log('APIPIPI',city.value);
  } catch (error) {
    // Handle any errors that occurred during the API call
    console.error('API error:', error);
  }
 
};
watch(state1, (newValue, oldValue) => {
    if (newValue !== oldValue) {
      // This code will run when the value of select changes.
      console.log('Selected Location:', newValue.state);
      city1.value = ''
      getCity(newValue.state)
      // Call your function here
      // Example: yourFunction(newValue);
    }
  });
  watch(select, (newValue, oldValue) => {
    if (newValue !== oldValue) {
      state3.value = state2.value
    }
  });
</script>
<template>
    <v-col cols="12" lg="5" xl="4" class="d-flex scrollSignUp justify-center">
        <div v-show="hideSignup" class="mt-xl-0 mt-5 widthSizeRegister" >
            <h2 class="text-h3 font-weight-bold mb-2">Welcome to  <span class="text-primary">V-Locator</span></h2>
            <div class="text-subtitle-1 mb-6">Please Fill Your Sign Up Detail</div>
            <p v-show="showErrorMessage" class="text-error">{{ showErrorMessage }}</p>
            
            <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submitForm" class="mt-5 pb-5">
            <div class="">
            <h3 class="text-subtitle-1 font-weight-medium pb-1">Store Name</h3>
            <p class="text-subtitle-2 pb-2 font-weight-light">This is how your store will appear in the app</p>
            <VTextField v-model="fname" class="inputFeildsCstm" :rules="fnameRules" required ></VTextField>

            <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">Business Type</v-label>
            <v-select variant="outlined" class="mb-5 inputFeildsCstm" v-model="businessModal" density="compact" hide-details :items="businessOption" label=""></v-select>
            
               
            <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">Email address</v-label>
            <VTextField
                v-model="username"
                :rules="emailRules"
                class="mb-5 inputFeildsCstm"
                required
                hide-details="auto"
            ></VTextField>
            <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">Password</v-label>
            <!-- <VTextField
                v-model="password"
                :rules="passwordRules"
                required
                type="password"
                hide-details="auto"
                class="mb-5 inputFeildsCstm"
            ></VTextField> -->
            <v-text-field
                v-model="password"
                :rules="passwordRules"
                required
                color="primary"
                variant="outlined"
                :type="show2 ? 'text' : 'password'"
                hide-details="auto"
                class="mb-5 inputFeildsCstm"
                :append-inner-icon="show2 ? 'mdi-eye text-white' : 'mdi-eye-off text-white'"
                @click:append-inner="show2 = !show2"
            >
            </v-text-field>
               
                <v-label class="font-weight-medium mb-2">Phone Number</v-label>
                <!-- <VTextField color="primary" variant="outlined" class="inputFeildsCstm" type="text" placeholder="000 0000 000" v-model="phone" required /> -->
                <v-text-field
                v-model="phone"
                type="number"
                maxlength="10"
                :rules="[phoneNumberRule]"
                class="inputFeildsCstm"
                ></v-text-field>
            
                <v-label class="font-weight-medium mb-2">Store address</v-label>
                <v-textarea
                    auto-grow
                    variant="outlined"
                    placeholder="store address"
                    rows="2"
                    color="primary"
                    row-height="25"
                    shaped
                    class="inputFeildsCstm"
                    v-model="add1"
                ></v-textarea>
        
                <!-- <v-label class="font-weight-medium mb-2">Address-2</v-label>
                <v-textarea
                    auto-grow
                    variant="outlined"
                    placeholder="Address 2"
                    rows="2"
                    color="primary"
                    row-height="25"
                    shaped
                    class="inputFeildsCstm"
                    v-model="add2"
                ></v-textarea> -->

                <v-label class="font-weight-medium mb-2">Country</v-label>
                <v-select
                    v-model="select"
                    :items="location"
                    item-title="state"
                    item-value="abbr"
                    label="Select"
                    return-object
                    single-line
                    variant="outlined"
                    class="inputFeildsCstm"
                ></v-select>

                <v-label class="font-weight-medium mb-2">State</v-label>
                <v-select
                    v-model="state1"
                    :items="state3"
                    item-title="state"
                    item-value="abbr"
                    label="Select"
                    return-object
                    single-line
                    variant="outlined"
                    class="inputFeildsCstm"
                    search-input
                    filter
                ></v-select>
                <v-label class="font-weight-medium mb-2">City</v-label>
                <v-select
                    v-model="city1"
                    :items="city2"
                    item-title="city"
                    item-value="abbr"
                    label="Select"
                    return-object
                    single-line
                    variant="outlined"
                    class="inputFeildsCstm mb-3"
                    search-input
                    filter
                    hide-details
                ></v-select>
                <br>
                <!-- <v-container class="pa-0 pb-3 customCheckBoxSize">
                  <v-checkbox
                    v-model="checked"
                    label="Listing in Application"
                    hide-details
                  ></v-checkbox>
                </v-container> -->
                </div>
                <v-btn size="large" class="mt-2 mb-5" color="primary" block type="submit" flat>
                  <template v-if="showLoader===true">
                      <div class='loaderBn'></div>
                    </template>
                    <template v-else>
                        Sign Up
                    </template>
                </v-btn>
                
            </v-form>
            
            <!-- <h6 class=" d-flex align-center mt-6 v-label v-label--clickable text-medium-emphasis">
                Already have an Account?
                <v-btn variant="plain" to="/auth/login" class="text-primary text-body-1 opacity-1 pl-2">Sign
                    In</v-btn>
            </h6> -->
        </div>
        <div v-show="showSuccessMessage" class="successRegister-popup pt-xl-14" >
            <div class="successRegister text-center">
                <h2 class="text-h1 font-weight-bold mb-2">Welcome to  <span class="text-primary">V-Locator</span></h2>
                <div class="py-10">
                    <img src="/src/assets/images/locator/logo-light.png" class="position-relative w-50"
                        alt="Success-register" />
                </div>
                <div class="congrats">Congratulations, Your Restaurant has been created successfully
                    <span class="text-primary pl-2 d-block pt-3">Redirecting to Login</span>
                </div>

            </div>
        </div>
        
    </v-col>
        
</template>
<style>
.customCheckBoxSize .v-selection-control__wrapper {
    width: 20px;
    margin-right: 10px;
}
.customCheckBoxSize .v-selection-control__wrapper i{
  font-size: 28px;
}
.customCheckBoxSize label.v-label {
    font-size: 15px;
}
</style>