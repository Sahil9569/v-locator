<script setup lang="ts">
import { ref, computed, reactive,onMounted,onBeforeMount,watch } from 'vue';
import { useContactStore } from '@/stores/apps/contact';
import axios from 'axios';
import { useRouter } from "vue-router";
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL
// import staffManagement from '@/_mockApis/apps/staffManagement';
const tab = ref(null);
const store = useContactStore();
const token = localStorage.getItem('res_token')
const itemsPerPage = 10;
const currentPage = ref(1);
const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);

const phone = ref<string>('');

// const phoneNumberRule = computed(() => {
//   if (editedItem.value.phone.length !== 10) {

//     return 'Phone number must have exactly 10 digits';
//   }
//   return true; // Return true for a valid phone number.
// });



onBeforeMount(async () => {
    await fetchStaffList();
    getCountry();

});
// onMounted(() => {
// });
const errormsg = ref('');
const getContacts: any = computed(() => {
    return store.contacts;
});
const showLoader = ref(false);
const allStaff = ref([]);
const valid = ref(true);
const dialog = ref(false);
const dialogm = ref(false);
const search = ref('');
const Role = ref(['Manager','Chef', 'Service Staff']);
const select = ref('');
const city1 = ref('');
const state1 = ref('');
const country = ref(['USA']);
const city2 = ref([]);
const state2 = ref([]);
const state3 = ref([]);
const desserts = ref([]);
const selectItems = ref(['All Role', 'Manager','Chef', 'Service Staff']);
const selectModalitm = ref('All Role');
const editedIndex = ref(-1);
const editedItem = ref({
    id: '',
    avatar: '1.jpg',
    firstName: '',
    lastName: '',
    phone: '',
    Role: [],
    Email: '',
    rolestatus: '',
    address1 : '',
    address2 : '',
    tips: '',
    totalOrder: '',
    city: [],
    state: [],
    country:[],
});
const defaultItem = ref({
    id: '',
    avatar: '1.jpg',
    firstName: '',
    lastName: '',
    phone: '',
    Role: [],
    Email: '',
    tips: '',
    totalOrder: '',
    rolestatus: '',
    address1 : '',
    address2 : '',
    city: [],
    state: [],
    country:[],
});
const new_loader = ref(false);
const phoneLengthRule= ref([
        (value) => !!value || 'Phone number is required',
        (value) => (value && value.length <= 10) || 'Phone number must have a maximum length of 10 digits',
]);




const filteredList = computed(() => {
    if (!desserts.value) return [];

    let filteredData = desserts.value; // Clone the array to avoid modifying the original

    if (search.value) {
        filteredData = filteredData.filter((item:any) => {
            const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
            return fullName.includes(search.value.toLowerCase());
        });
    }

    // if (search.value) {
    //     filteredData = filteredData.filter((item: any) => {
    //         const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
    //         const searchValue = search.value.toLowerCase();
    //         return fullName.includes(searchValue) || item.firstName.toLowerCase().includes(searchValue) || item.lastName.toLowerCase().includes(searchValue);
    //     });
    // }


    if (selectModalitm.value !== 'All Role') {
        filteredData = filteredData.filter((item) => {
            return item.Role === selectModalitm.value;
        });
    }

    return filteredData;
});

const paginatedList = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredList.value.slice(start, end);
});




function editItem(item: any) {
    editedIndex.value = desserts.value.indexOf(item);
    editedItem.value = Object.assign({}, item);
    dialog.value = true;
}

function deleteItem(item: any) {
    const index = desserts.value.indexOf(item);
    console.log("INDEX",item.id)
    // confirm('Are you sure you want to delete this item?') && desserts.value.splice(index, 1);
    submitDeleteForm(item.id);
    fetchStaffList();
}

function close() {
    dialog.value = false;
    setTimeout(() => {
        editedItem.value = Object.assign({}, defaultItem.value);
        editedIndex.value = -1;
    }, 300);
}
async function save() {
    if (editedIndex.value > -1) {
        Object.assign(desserts.value[editedIndex.value], editedItem.value);
        submitEditForm(); // Assuming submitEditForm is asynchronous

    } else {
        try {
            await submitForm();
            fetchStaffList();
            
        } catch (error) {
            console.error("Error:", error);  
        }
    }
    
}

//Computed Property
const formTitle = computed(() => {
    return editedIndex.value === -1 ? ' Add Staff' : 'Edit Staff'; 
});

const submitDeleteForm = async (index:any) => {
    console.log("STAFF Delete API CALL")
  try {
    console.log("INSIDE TRY",index)
    const token = localStorage.getItem('authToken');
    const formdata = {
        token:token,
        staff_id:index,
    }
    console.log(formdata);
    const response = await axios.post('api/staff/delete_staff/',formdata);
      console.log('Staff API response:', response.data);
        if (response.data) {
            fetchStaffList()
        }else{
            console.log("First Error")
        }
    } catch (error) {
        console.error('API error:', error);
        
    }
}
const submitEditForm = async () => {
    showLoader.value = true;
    console.log("STAFF Edit API CALL")
    try {
        console.log("INSIDE TRY",valid.value)
        const token = localStorage.getItem('authToken');
        const formdata = {
            token:token,
            staff_id:editedItem.value.id,
            first_name:editedItem.value.firstName,
            last_name:editedItem.value.lastName,
            phone:editedItem.value.phone,
            email:editedItem.value.Email,
            add1:editedItem.value.address1,
            add2:editedItem.value.address2,
            city:editedItem.value.city,
            state:editedItem.value.state,
            country:editedItem.value.country,
            role:editedItem.value.Role,
        }
        const response = await axios.post('api/staff/update_staff/',formdata);
        showLoader.value = false;
        console.log('Staff API response:', response.data);
        if (response.data) {
            close();
        }else{
            console.log("First Error")
        }
    } catch (error) {
        showLoader.value = false;
        console.error('API error:', error);
        
    }
}
const submitForm = async () => {
    // if (validateForm()===true) {
    //     // Perform form submission logic here
    //     console.log("Form submitted with data:", formData.value);
    //     // You can add your form submission logic here
        showLoader.value = true;
        try {
            console.log("INSIDE TRY",valid.value)
            const token = localStorage.getItem('authToken');
            const formdata = {
                token:token,
                first_name:editedItem.value.firstName,
                last_name:editedItem.value.lastName,
                phone:editedItem.value.phone,
                email:editedItem.value.Email,
                add1:editedItem.value.address1,
                add2:editedItem.value.address2,
                city: city1.value,
                state: state1.value,
                country: select.value,
                role:editedItem.value.Role,
            }
            console.log('ooo my god form data',formdata)
            const response = await axios.post('api/staff/add_staff/',formdata);
            showLoader.value = false;
            console.log('Staff API response:', response.data);
            close();
            if (response.data) {
                console.log("First Data pass")
            }else{
                console.log("First Error")
            }
        } catch (error) {
            showLoader.value = false;

            console.error('API error:', error);
            close();
            if (error.response && error.response.data) {
            errormsg.value = error.response.data.error;
            setTimeout(() => {
                errormsg.value = ''
            }, 5000);
        }
        }
    // }else{
    //     console.log("Second Error")
    // }
}
const fetchStaffList = async () => {
    console.log("STAFF LIST API CALL")
    new_loader.value = true;
    try {
        console.log("INSIDE TRY",valid.value)
        const token = localStorage.getItem('authToken');
        const response = await axios.post('api/staff/all_staff/',{'token':token});
        console.log('Staff API response:', response.data);
        if (response.data) {
            new_loader.value = false;
            const updatedData = response.data.map((item:any,index:any) => ({
                    sname: `${index + 1}`,
                    id: `${item.id}`,
                    firstName: item.first_name,
                    lastName: item.last_name,
                    phone: item.phone,
                    Role: item.role,
                    Email: item.user.email,
                    rolestatus: 'primary', // Assuming this value will always be 'primary'
                    address1: item.add1,
                    address2: item.add2,
                    city: item.city,
                    state: item.state,
                    country: item.country,
                }));
                // Update the desserts ref with the new mapped data
                desserts.value = updatedData;
        }else{
            new_loader.value = false;
            console.log("First Error")
        }
    } catch (error) {
        new_loader.value = false;
        console.error('API error:', error);
    }
}
const getCountry = async () => {
  try {
      const response = await axios.post('api/get_country/');
      // Handle the API response (optional)
      console.log('API COUNTTRY response:', response.data);
      state2.value = response.data;
      console.log('APIPIPI----',response.data.cities);
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
        };
    console.log("YE JA RAHA HAI ", formData);
    const response = await axios.post('api/get_cities_by_state/',formData);
    // Handle the API response (optional)
    console.log('API COUNTTRY XXXXXXXXXX:', response.data);
    city2.value = response.data;
    console.log('APIPIPI',city2.value);
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

// const formData = ref({
//     Email: "",
//     phone: "",
//     firstname:"",
//     lastName: "",
//     Role:"", 
//     address1:"",
//     address2:"",
    
// });



// const formErrors = reactive({
//     Email: "",
//     phone: "",
//     firstname:"",
//     lastName: "",
//     Role:"",
//     address1:"",
//     address2:"",
    
// });

// const validateForm = () => {
//     formErrors.firstname = formData.value.firstname ? "" : "FirstName is required.";
//     formErrors.lastName = formData.value.lastName ? "" : "LastName is required.";
//     formErrors.phone = formData.value.phone && formData.value.phone.length >= 9 ? "" : "Invalid Number";

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     formErrors.Email = formData.value.Email && emailRegex.test(formData.value.Email) ? "" : "Invalid email.";
//     formErrors.Role = formData.value.Role ? "" : "Role is required.";
//     formErrors.address1 = formData.value.address1 ? "" : "Address is required.";
//     formErrors.address2 = formData.value.address2 ? "" : "Address is required.";
//     // formErrors.select = formData.value.select ? "" : "Country is required."; 


//     // return !formErrors.name && !formErrors.email && !formErrors.phone && !formErrors.firstname;
//     return !formErrors.firstname && !formErrors.lastName && !formErrors.phone && !formErrors.Email && !formErrors.Role && !formErrors.address1 && !formErrors.address2;
// };


</script>
<style scoped>
    .error-message {
    color: red;
    margin-top: 5px;
    margin-bottom: 10px;
    font-size: medium;
    }
</style>
<template>
    <p class="error-message">{{ errormsg }}</p>
    <v-row class="align-center">
        <v-col cols="12" lg="8">
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field density="compact" v-model="search" label="Search Staff" hide-details variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                        <v-select
                        :items="selectItems"
                        v-model="selectModalitm"
                        label="Select Role"
                        density="compact"
                        placeholder="Select Role"
                        hide-details
                        ></v-select>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12" lg="4"  class="text-right">
            <v-dialog v-model="dialog" max-width="700">
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props" flat class="ml-auto">
                        <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Add Staff
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title class="pa-4 bg-primary">
                        <span class="title text-white">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submitForm">
                            
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        label="First Name"
                                        v-model="editedItem.firstName"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.lastName"
                                        label="Last Name"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        v-model="editedItem.phone"
                                        label="Phone"
                                        type="number"
                                        hide-details="auto"
                                        maxlength="10"
                                        :rules="phoneLengthRule"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="Role"
                                        v-model="editedItem.Role"
                                        label="Role"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details="auto"
                                        v-model="editedItem.Email"
                                        label="Email"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        label="Address 1"
                                        v-model="editedItem.address1"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        :items="country"
                                        item-title="state"
                                        item-value="abbr"
                                        label="Select country"
                                        return-object
                                        hide-details
                                        v-model="select"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        v-model="state1"
                                        :items="state3"
                                        item-title="state"
                                        item-value="abbr"
                                        label="Select State"
                                        return-object
                                        hide-details
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        v-model="city1"
                                        :items="city2"
                                        item-title="city"
                                        item-value="abbr"
                                        label="Select City"
                                        return-object
                                        hide-details
                                    ></v-select>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>

                    <v-card-actions class="pa-4">
                        <v-spacer></v-spacer>
                        <v-btn color="error" @click="close">Cancel</v-btn>
                        <!-- <v-btn
                            color="primary"
                            variant="flat"
                            :disabled="editedItem.firstName === '' || editedItem.lastName === '' || editedItem.phone === '' || editedItem.Role === '' || editedItem.Email === '' || editedItem.address1 === '' || editedItem.select == '' || editedItem.state1 === '' || editedItem.city1 === ''"
                            @click="save"
                            type="submit"
                            >Submit</v-btn> -->
                            <v-btn
                                color="primary"
                                variant="flat"
                                :disabled="editedItem.firstName === '' || editedItem.lastName === '' || editedItem.phone === '' || editedItem.Role === '' || editedItem.Email === '' || editedItem.address1 === '' || editedItem.select == '' || editedItem.state1 === '' || editedItem.city1 === '' || showLoader"
                                @click="save"
                                type="submit">
                                <template v-if="showLoader">
                                    <div class="loaderBn"></div>Submitting
                                </template>
                                <template v-else>
                                    Submit
                                </template>
                            </v-btn>

                            
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
        
    </v-row>
    <div class="p-relative">
        <div class="logoLoader tableLoader" v-if="new_loader == true">
            <div class="LogoVInnerImg">
                <img src="@/assets/images/locator/v-icon.png" alt="logo-loader"/>
                <p class="">Please Wait...</p>
            </div>
        </div>
        <v-table class="mt-5">
            <thead>
                <tr>
                    <th class="text-subtitle-1 font-weight-bold">S no </th>
                    <th class="text-subtitle-1 font-weight-bold">Name</th>
                    <th class="text-subtitle-1 font-weight-bold">Phone</th>
                    <th class="text-subtitle-1 font-weight-bold">Email</th>
                    <th class="text-subtitle-1 font-weight-bold">Role</th>
                    <th class="text-subtitle-1 font-weight-bold">Actions</th>
                </tr>
            </thead>
            <tbody>
                <!-- <template v-if="paginatedList.length > 0"> -->
                    <tr v-for="item in paginatedList" :key="item.id" :currentPage="currentPage" :pageSize="10">
                        <td class="text-subtitle-1">{{ item.sname }}</td>

                        <!-- <td class="text-subtitle-1">{{ item.id }}</td> -->
                        <td>
                            <div class="d-flex py-4">
                                
                                <router-link :to="'/singleProfile/' + token + '/' + item.id" class="text-primary text-decoration-none">
                                    <!-- <h4 class="text-h6 font-weight-semibold">{{ item.userinfo }}</h4> -->
                                    <span class="text-subtitle-1 d-block mt-1 textSecondary text-primary">{{ item.firstName }} {{ item.lastName }}</span>
                                </router-link>
                            </div>
                            
                        </td>
                        <td>
                            <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.phone }}</span>
                        </td>
                        <td>
                            <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.Email }}</span>
                        </td>
                        <td>
                            <v-chip :color="item.Role == 'Manager'? 'primary' : item.Role == 'Service Staff'? 'secondary' : 'warning'" size="small" label>{{ item.Role }}</v-chip>
                        </td>
                        <td>
                            <div class="d-flex align-center">
                                <v-tooltip text="Edit">
                                    <template v-slot:activator="{ props }">
                                        <v-btn icon flat @click="editItem(item)" v-bind="props"
                                            ><PencilIcon stroke-width="1.5" size="20" class="text-primary"
                                        /></v-btn>
                                    </template>
                                </v-tooltip>
                                <v-tooltip text="Delete">
                                    <template v-slot:activator="{ props }">
                                        <v-btn icon flat @click="deleteItem(item)" v-bind="props"
                                            ><TrashIcon stroke-width="1.5" size="20" class="text-error"
                                        /></v-btn>
                                    </template>
                                </v-tooltip>
                            </div>
                        </td>
                    </tr>
                <!-- </template> -->
                <!-- <template v-else>
                    <tr><td colspan="6" align="center" class="text-subtitle-1">No data Found</td></tr>
                </template> -->
            </tbody>
        </v-table>
        <v-pagination v-model="currentPage" :length="Math.ceil(filteredList.length / itemsPerPage)"
                    rounded="circle"></v-pagination>
    </div>

</template>
