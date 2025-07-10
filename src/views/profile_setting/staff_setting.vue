<script setup lang="ts">
import { onMounted, ref,watch } from 'vue';

/*Location Select*/
// const location = ref(['United States', 'United Kingdom', 'India', 'Russia']);

/*Currency Select*/
// const Currencyselect = ref('US Dollar ($)');
// const Currency = ref(['US Dollar ($)','United Kingdom (Pound)', 'India (INR)', 'Russia (Ruble)',]);
/*import tabler icons*/
import { UserCircleIcon,BellIcon,ArticleIcon,LockIcon } from 'vue-tabler-icons';
import axios from 'axios';
import { useRouter } from "vue-router";
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL

const tab = ref(null);

// theme breadcrumb
const page = ref({ title: 'Account Setting' });
const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '#'
    },
    {
        text: 'Account Setting',
        disabled: true,
        href: '#'
    }
]);

/*change password*/
const currenypwd = ref('');
const newpwd = ref('');
const confirmpwd = ref('');

/*personal detail*/
// const fullName = ref('uijni iujk');
const resName = ref('');
const profileIMage = ref();
const profileIMage1 = ref();
const temporaryImage =ref ()
const restaurantModel = ref(null);
const restaurantItems = ref(['F','L','P']);

const show2 = ref(false);
const show3 = ref(false);
const passwordRules = ref([
    (v: string) => !!v || 'Current Password is required',
    // (v: string) => (v && v.length <= 10) || 'Password must be less than 10 characters'
]);
const passwordRules2 = ref([
    (v: string) => !!v || 'New Password is required',
    // (v: string) => (v && v.length <= 10) || 'Password must be less than 10 characters'
]);

const imagePreviewUrl = ref(null);
const imagePreviewUrl1 = ref(null);
const fName = ref('');
const lName = ref('');
const email = ref('');
const phone = ref('');
const address = ref('');

const select = ref('');
const city1 = ref('');
const state1 = ref('');
const location = ref(['USA']);
const city2 = ref([]);
const state2 = ref([]);
const state3 = ref([]);
onMounted(() => {
    getAccountDetails();
    getCountry();
});
const previewImage = (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreviewUrl.value = e.target.result;
      try {
        const token = localStorage.getItem('authToken');
        const formdata = {
            token: token,
            img:imagePreviewUrl.value, // Declare a temporary variable to store the converted image,
        };
        console.log("FORMADATA UPDATE",formdata);
        const response = axios.post('api/update_profile_img/', formdata);

        console.log('Update Category API response:', response.data);
        window.location.reload();
    } catch (error) {
        console.error('API error:', error);
        // Handle the error gracefully
    }
    };
    reader.readAsDataURL(file);
  } else {
    imagePreviewUrl.value = null;
  }
};

const getAccountDetails = async () => {
    console.log("Order LIST API CALL")
    try {
        const token = localStorage.getItem('authToken');
        const urlToken = window.location.href.split('/').pop();
        const formData = {
            token:token,
            url_token:urlToken,  
            status:'other',      
        };
        const response = await axios.post('api/profile_details/',formData);
        console.log('acccccc API response:', response.data.pro_img);
        imagePreviewUrl.value = response.data.pro_img;
        fName.value = response.data.staff.first_name;
        lName.value = response.data.staff.last_name;
        email.value = response.data.staff.user.email;
        phone.value = response.data.staff.phone;
        address.value = response.data.staff.add1;
        select.value = response.data.staff.country;
        state1.value = response.data.staff.state;
        city1.value = response.data.staff.city;
    } catch (error) {
        console.error('API error:', error);
        
    }
}

const saveRes = async () => {
    console.log("Order LIST API CALL")
    try {
        const token = localStorage.getItem('res_token');
        const formData = {
            token:token,
            name:resName.value,
            type:restaurantModel.value,
        };
        const response = await axios.post('api/res_details_update/',formData);
        window.location.reload();
    } catch (error) {
        console.error('API error:', error);
        
    }
}
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

const saveprofile = async () => {
    console.log("Order LIST API CALL")
    try {
        const token = localStorage.getItem('res_token');
        const formData = {
            token:token,
            fName:fName.value,
            lName:lName.value,
            email:email.value,
            phone:phone.value,
            address:address.value,
            select:select.value,
            state:state1.value,
            city:city1.value,
            auth:localStorage.getItem('authToken'),
            status:"other",
        };
        const response = await axios.post('api/res_profile_update/',formData);
        window.location.reload();
    } catch (error) {
        console.error('API error:', error);
        
    }
}
const changePassword = async () => {
    console.log("Order LIST API CALL")
    try {
        const token = localStorage.getItem('res_token');
        const auth = localStorage.getItem('authToken');
        const formData = {
            token:token,
            current:currenypwd.value,
            new:newpwd.value,
            status:'other',
            auth:auth,
        };
        const response = await axios.post('api/change_password/',formData);
        window.location.reload();
    } catch (error) {
        console.error('API error:', error);
        
    }
}
</script>

<template>
    <v-row class="justify-center">
        <!--Account Settings tabs-->
        <v-col cols="12" md="12">
            <v-card elevation="10" class=" " rounded="md">
                <v-tabs v-model="tab" bg-color="transparent" min-height="70" height="70" color="primary">
                    <v-tab value="Account" class="text-medium-emphasis"><UserCircleIcon class="mr-2" size="20"/> Account</v-tab>
                    <!-- <v-tab value="Notification"  class="text-medium-emphasis"><BellIcon class="mr-2" size="20"/>Notification</v-tab> -->
                    <!-- <v-tab value="Bills"  class="text-medium-emphasis"><ArticleIcon class="mr-2" size="20"/>Bills</v-tab> -->
                    <!-- <v-tab value="Security"  class="text-medium-emphasis"><LockIcon class="mr-2" size="20"/>Security</v-tab> -->
                </v-tabs>
                <v-divider></v-divider>
                <v-card-text class="pa-sm-6 pa-3 pb-sm-6 pb-6">
                    <v-window v-model="tab">
                        <v-window-item value="Account">
                            <v-card elevation="10" >
                                <v-row class="ma-sm-n2 ma-n1">
                                    <v-col cols="12" md="6">
                                        <v-card elevation="10" class="h-100">
                                            <v-card-item>
                                                <h5 class="text-h5">Upload Profile Logo</h5>
                                                <div class="text-subtitle-1 text-medium-emphasis mt-2">Change your Profile logo picture from here</div>
                                                <div class="text-center mt-6 mb-6">
                                                    <v-avatar size="120" v-if="imagePreviewUrl">
                                                            <img :src="imagePreviewUrl" alt="Image Preview" />
                                                    </v-avatar>
                                                    <v-avatar size="120" v-else>
                                                        <img src="@/assets/images/profile/user-1.jpg" height="120" alt="image" />
                                                    </v-avatar>
                                                </div>
                                                <div class="d-flex justify-center">
                                                    <label for="fileUploadPro" class="bg-primary px-4 py-2 rounded-md mx-2 text-subtitle-1" style="cursor: pointer;"> Upload Profile Image
                                                        <v-file-input
                                                                v-model="profileIMage"
                                                                color="deep-purple-accent-4"
                                                                label="Upload Image"
                                                                hide-details
                                                                id="fileUploadPro"
                                                                accept="image/jpeg, image/jpg"
                                                                placeholder="Select your files"
                                                                prepend-inner-icon="mdi-camera"
                                                                variant="outlined"
                                                                class="inputFileUploadCstm d-none"
                                                                type="file"
                                                                @change="previewImage"
                                                                ></v-file-input>
                                                    </label>
                                                </div>
                                                <div class="text-subtitle-1 text-medium-emphasis text-center my-sm-8 my-6">JPEG/JPG ONLY </div>
                                            </v-card-item>
                                        </v-card>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-card elevation="10" class="h-100">
                                            <v-card-item>
                                                <h5 class="text-h5">Change Password</h5>
                                                <div class="text-subtitle-1 text-medium-emphasis mt-2">To change your password please confirm here</div>
                                                <div class="mt-5">
                                                    <v-label class="mb-2 font-weight-medium">Current Password</v-label>
                                                    <v-text-field
                                                        v-model="currenypwd"
                                                        :rules="passwordRules"
                                                        required
                                                        color="primary"
                                                        variant="outlined"
                                                        :type="show2 ? 'text' : 'password'"
                                                        hide-details="auto"
                                                        class="mb-5 inputFeildsCstm"
                                                        :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                                        @click:append-inner="show2 = !show2"
                                                    >
                                                    </v-text-field>
                                                    <!-- <v-text-field
                                                        color="primary"
                                                        variant="outlined"
                                                        type="password"
                                                        v-model="currenypwd"
                                                    /> -->
                                                </div>
                                                <div class="mt-3">
                                                    <v-label class="mb-2 font-weight-medium">New Password</v-label>
                                                    <v-text-field
                                                        v-model="newpwd"
                                                        :rules="passwordRules2"
                                                        required
                                                        color="primary"
                                                        variant="outlined"
                                                        :type="show3 ? 'text' : 'password'"
                                                        hide-details="auto"
                                                        class="mb-5 inputFeildsCstm"
                                                        :append-inner-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                                                        @click:append-inner="show3 = !show3"
                                                    >
                                                    </v-text-field>
                                                    <!-- <v-text-field
                                                        color="primary"
                                                        variant="outlined"
                                                        type="password"
                                                        v-model="newpwd"
                                                    /> -->
                                                    <!-- <v-label class="mb-2 font-weight-medium">Confirm Password</v-label>
                                                    <v-text-field
                                                        color="primary"
                                                        variant="outlined"
                                                        type="password"
                                                        v-model="confirmpwd"
                                                        hide-details
                                                    /> -->
                                                </div>
                                                <div class="d-flex justify-end mt-5">
                                                    <v-btn  color="primary" @click="changePassword" class="" flat>Save</v-btn>
                                                </div>
                                            </v-card-item>
                                        </v-card>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-card elevation="10" >
                                            <v-card-item>
                                                <h5 class="text-h5">Personal Details</h5>
                                                <div class="text-subtitle-1 text-medium-emphasis mt-2">To change your personal detail , edit and save from here</div>
                                                <div class="mt-5">
                                                    <v-row>
                                                        <v-col cols="12" lg="6">
                                                            <v-label class="mb-2 font-weight-medium">First Name</v-label>
                                                                <v-text-field
                                                                    color="primary"
                                                                    variant="outlined"
                                                                    type="text"
                                                                    v-model="fName"
                                                                    hide-details
                                                                />
                                                        </v-col>
                                                        <v-col cols="12" lg="6">
                                                            <v-label class="mb-2 font-weight-medium">Last Name</v-label>
                                                                <v-text-field
                                                                    color="primary"
                                                                    variant="outlined"
                                                                    type="text"
                                                                    v-model="lName"
                                                                    hide-details
                                                                />
                                                        </v-col>
                                                        <!-- <v-col cols="12" md="6">        
                                                                <v-label class="mb-2 font-weight-medium">Location</v-label>
                                                                <v-select
                                                                    v-model="select"
                                                                    :items="location"
                                                                    item-title="state"
                                                                    item-value="abbr"
                                                                    label="Select"
                                                                    return-object
                                                                    single-line
                                                                    variant="outlined"
                                                                    hide-details
                                                                ></v-select>
                                                        </v-col> -->
                                                        <!-- <v-col cols="12" md="6">        
                                                                <v-label class="mb-2 font-weight-medium">Currency</v-label>
                                                                <v-select
                                                                    v-model="Currencyselect"
                                                                    :items="Currency"
                                                                    item-title="state"
                                                                    item-value="abbr"
                                                                    label="Select"
                                                                    return-object
                                                                    single-line
                                                                    variant="outlined"
                                                                    hide-details
                                                                ></v-select>
                                                        </v-col> -->
                                                        <v-col cols="12" lg="6">        
                                                                <v-label class="mb-2 font-weight-medium">Email</v-label>
                                                                <v-text-field
                                                                    color="primary"
                                                                    variant="outlined"
                                                                    type="email"
                                                                    v-model="email"
                                                                    hide-details
                                                                ></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" lg="6">        
                                                                <v-label class="mb-2 font-weight-medium">Phone</v-label>
                                                                <v-text-field
                                                                    color="primary"
                                                                    variant="outlined"
                                                                    type="text"
                                                                    v-model="phone"
                                                                    hide-details
                                                                ></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12">        
                                                                <v-label class="mb-2 font-weight-medium">Address</v-label>
                                                                <v-text-field
                                                                    color="primary"
                                                                    variant="outlined"
                                                                    type="text"
                                                                    v-model="address"
                                                                    hide-details
                                                                ></v-text-field>
                                                        </v-col>
                                                        <v-col cols="4">        
                                                            <v-label class="mb-2 font-weight-medium">Country</v-label>
                                                                <v-select
                                                                v-model="select"
                                                                :items="location"
                                                                item-title="state"
                                                                item-value="abbr"
                                                                label="Select"
                                                                return-object
                                                                single-line
                                                                variant="outlined"
                                                                hide-details
                                                            ></v-select>
                                                    </v-col>
                                                    <v-col cols="4">        
                                                            <v-label class="mb-2 font-weight-medium">State</v-label>
                                                                <v-select
                                                                v-model="state1"
                                                                :items="state3"
                                                                item-title="state"
                                                                item-value="abbr"
                                                                label="Select"
                                                                return-object
                                                                single-line
                                                                variant="outlined"
                                                                hide-details
                                                            ></v-select>
                                                    </v-col>
                                                    <v-col cols="4">        
                                                            <v-label class="mb-2 font-weight-medium">City</v-label>
                                                                <v-select
                                                                v-model="city1"
                                                                :items="city2"
                                                                item-title="city"
                                                                item-value="abbr"
                                                                label="Select"
                                                                return-object
                                                                single-line
                                                                variant="outlined"
                                                                hide-details
                                                            ></v-select>
                                                    </v-col>
                                                    </v-row>
                                                </div>
                                                <div class="d-flex justify-end mt-5">
                                                    <v-btn  color="primary" @click="saveprofile" class="" flat>Save</v-btn>
                                                </div>
                                            </v-card-item>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-window-item>
                        <!-- <v-window-item value="Notification">
                            <NotificationTab/>
                        </v-window-item> -->
                        <!-- <v-window-item value="Bills">
                            <BillsTab/>
                        </v-window-item> -->
                        <!-- <v-window-item value="Security">
                            <SecurityTab/>
                        </v-window-item> -->
                    </v-window>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    
</template>
