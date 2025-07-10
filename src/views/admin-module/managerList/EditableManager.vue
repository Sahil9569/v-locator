<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useContactStore } from '@/stores/apps/contact';

const store = useContactStore();
import axios from 'axios';
import { useRouter } from "vue-router";
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL
onMounted(() => {
    store.fetchContacts();
    all_Restaurant();
});
const getContacts: any = computed(() => {
    return store.contacts;
});
const new_loader = ref(false);

const itemsPerPage = 10;
const currentPage = ref(1);
// const email = ref('');
const valid = ref(true);
const dialog = ref(false);
const search = ref('');
// const itemsPerPage = ref(10)
const page = ref(1)
const filterOption = ref(['Basic', 'Premium A', 'Premium B', 'Premium C', 'V Locator +']);
const packageName = ref(['Restaurant', 'Vendor', 'Merchant', 'Ghost Kitchen', 'Grocery store', 'Specialty Food Store']);

const countryName = ref(['India', 'United Kingdom', 'Srilanka']);
const city = ref(['Chandigarh', 'Mubai', 'Delhi']);
const state = ref(['Rajasthan', 'Punjab', 'Harayana']);
const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);
const desserts = ref();
const filterModal = ref('Select Filter Package')
const valueStatus = ref(false)
const editedIndex = ref(-1);

const editedItem = ref({
    id:'',
    restaurantName: '',
    firstName: '',
    lastName: '',
    phone:'',
    email: '',
    joiningDate: '',
    bussinessType: '',
    status:'',
    address:'',
    city:'',
    state:'',
    country:'',
    packageName:'',
});

const defaultItem = ref({
    id:'',
    restaurantName: '',
    firstName: '',
    lastName: '',
    phone:'',
    email: '',
    joiningDate: '',
    bussinessType: '',
    status:'',
    address:'',
    city:'',
    state:'',
    country:'',
    packageName:'',
});
const phone = ref<string>('');
const phoneNumberRule = computed(() => {
if (phone.value.length !== 10) {
    return 'Phone number must have exactly 10 digits';
    }
    return true;
});


const pageCount = computed(() => {
    return Math.ceil(filteredList.value.length / itemsPerPage.value) 
});


const filteredList = computed(() => {
    if (!Array.isArray(desserts.value)) return [];
    return desserts.value.filter((user: any) => {
        return user.restaurantName.toLowerCase().includes(search.value.toLowerCase());
    });
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
    deleteRes(item.id);
}

function close() {
    dialog.value = false;
    setTimeout(() => {
        editedItem.value = Object.assign({}, defaultItem.value);
        editedIndex.value = -1;
    }, 300);
}
function save() {
    if (editedIndex.value > -1) {
        Object.assign(desserts.value[editedIndex.value], editedItem.value);
        editRes();
    } else {
        // desserts.value.push(editedItem.value);
        addRes();
    }
    close();
}

//Computed Property
const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'Add Restaurant' : 'Edit Restaurant';
});
const all_Restaurant = async () => {
    new_loader.value = true;
    console.log("Order LIST API CALL")
    try {
        console.log("INSIDE TRY",valid.value)
        const response = await axios.get('api/vlocator_admin/all_res/');
        new_loader.value = false;
        console.log('Coupans API response:', response.data);
        if (response.data) {
            const updatedData = response.data.map((item:any,index:any) => ({   
                id:item.id,
                restaurantName:item.name,
                firstName:item.user.first_name,
                lastName:item.user.last_name,
                phone:item.phone,
                email:item.user.email,
                joiningDate:item.user.date_joined,
                bussinessType:item.business_type,
                status:item.status === "true",
                address:item.add1,
                city:item.city,
                state:item.state,
                country:item.country,
                packageName:item.package_name,
                }));
                // Update the desserts ref with the new mapped data
                desserts.value = updatedData;
                console.log("HEllo WORLD",desserts.value)
        }else{
            new_loader.value = false;
            console.log("First Error")
        }
    } catch (error) {
        new_loader.value = false;
        console.error('API error:', error);
        
    }
}

const addRes = async () => {
    console.log("Coupan API CALL")
    
    try {
        const token = localStorage.getItem('authToken');
        const urlToken = window.location.href.split('/').pop();
        const formdata = {
            name:editedItem.value.restaurantName,
            f_name:editedItem.value.firstName,
            l_name:editedItem.value.lastName,
            email:editedItem.value.email,
            phone:editedItem.value.phone,
            add:editedItem.value.address,
            city:editedItem.value.city,
            state:editedItem.value.state,
            country:editedItem.value.country,
            bussinessType:editedItem.value.bussinessType,
            
        }
        console.log("TESTSTS",formdata)
        const response = await axios.post('api/vlocator_admin/add_res/',formdata);
        console.log('Customer API response:', response.data);
        const newItem = {
                id:response.data.id,
                restaurantName:response.data.name,
                firstName:response.data.user.first_name,
                lastName:response.data.user.last_name,
                phone:response.data.phone,
                email:response.data.user.email,
                joiningDate:response.data.user.date_joined,
                bussinessType:response.data.business_type,
                status:response.data.status === "true",
                address:response.data.add1,
                city:response.data.city,
                state:response.data.state,
                country:response.data.country,
                packageName:response.data.package,
            };
            console.log(newItem)
            desserts.value.push(newItem);
    } catch (error) {
        console.error('API error:', error);
        
    }
}
const editRes = async () => {
    console.log("Coupan API CALL")
    
  try {
    const token = localStorage.getItem('authToken');
    const urlToken = window.location.href.split('/').pop();
    const formdata = {
        res_id:editedItem.value.id,
        name:editedItem.value.restaurantName,
        f_name:editedItem.value.firstName,
        l_name:editedItem.value.lastName,
        email:editedItem.value.email,
        phone:editedItem.value.phone,
        add:editedItem.value.address,
        city:editedItem.value.city,
        state:editedItem.value.state,
        country:editedItem.value.country,
        bussinessType:editedItem.value.bussinessType,
        
    }
    console.log("TESTSTS",formdata)
    const response = await axios.post('api/vlocator_admin/edit_res/',formdata);
      console.log('Customer API response:', response.data);
      const index = desserts.value.findIndex(item => item.id === id);
        if (index !== -1) {
            console.log('Update Category API response If part')
            desserts.value[index].restaurantName=response.data.name;
            desserts.value[index].firstName=response.data.user.first_name;
            desserts.value[index].lastName=response.data.user.last_name;
            desserts.value[index].phone=response.data.phone;
            desserts.value[index].email=response.data.user.email;
            desserts.value[index].joiningDate=response.data.user.date_joined;
            desserts.value[index].bussinessType=response.data.business_type;
            desserts.value[index].status=response.data.status === "true";
            desserts.value[index].address=response.data.add1;
            desserts.value[index].city=response.data.city;
            desserts.value[index].state=response.data.state;
            desserts.value[index].country=response.data.country;
            desserts.value[index].packageName=response.data.package;
        }
        editedIndex.value=-1
  } catch (error) {
    console.error('API error:', error);
    
  }
}
const deleteRes = async (index:any) => {
    console.log("STAFF Delete API CALL")
  try {
    console.log("INSIDE TRY",index)
    const formdata = {
        res_id:index,
    }
    console.log(formdata);
    const response = await axios.post('api/vlocator_admin/delete_res/',formdata);
      console.log('Staff API response:', response.data);
      if (response.data) {
      }else{
        console.log("First Error")
      }
  } catch (error) {
    console.error('API error:', error);
    
  }
}
const toggleStatus = async (item:any) => {
  try {
    const response = await axios.post('api/vlocator_admin/toggle_status/', { id: item.id });
    console.log('Toggle Status API response:', response.data);

    if (response.data) {
      all_Restaurant();
    } else {
      console.error('Toggle Status API request failed');
    }
  } catch (error) {
    console.error('API error:', error);
  }
};
</script>
<template>
    <v-row>
        <v-col cols="12" lg="4" md="6">
            <v-text-field density="compact" v-model="search" label="Search Restaurant Name" hide-details variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="12" lg="3" md="6">
            <v-select variant="outlined" v-model="filterModal" density="compact" hide-details :items="filterOption"  label="Filter Packages"></v-select>
        </v-col>
        <v-col cols="12" lg="5" md="12" class="text-right">
            <v-dialog v-model="dialog" max-width="700">
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props" flat class="ml-auto">
                        <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Add Restaurant
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title class="pa-4 bg-primary">
                        <span class="title text-white">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details="auto"
                                        v-model="editedItem.restaurantName"
                                        label="Store Name"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        variant="outlined"
                                        hide-details="auto"
                                        :items="packageName"
                                        v-model="editedItem.bussinessType"
                                        label="Business Type"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details="auto"
                                        required
                                        :rules="emailRules"
                                        v-model="editedItem.email"
                                        label="Email address"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details="auto"
                                        v-model="editedItem.firstName"
                                        label="First Name"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details="auto"
                                        v-model="editedItem.lastName"
                                        label="Last Name"
                                    ></v-text-field>
                                </v-col>
                                
                                <v-col cols="12" sm="6" class="">
                                    <v-text-field
                                        variant="outlined"
                                        v-model="editedItem.phone"
                                        label="Phone"
                                        type="text"
                                        maxlength="10"
                                        hide-details="auto"
                                        :rules="[phoneNumberRule]"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.address"
                                        label="Address"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="countryName"
                                        v-model="editedItem.country"
                                        label="Country"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="state"
                                        v-model="editedItem.state"
                                        label="State"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="city"
                                        v-model="editedItem.city"
                                        label="City"
                                    ></v-select>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>

                    <v-card-actions class="pa-4">
                        <v-spacer></v-spacer>
                        <v-btn color="error" @click="close">Cancel</v-btn>
                        <v-btn
                            color="primary"
                            :disabled="editedItem.restaurantName == '' || editedItem.firstName == ''"
                            variant="flat"
                            @click="save"
                            >Save</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
    <div class="p-relative">
        <div class="logoLoader tableLoader reset-position" v-if="new_loader === true">
            <div class="LogoVInnerImg">
                <img src="@/assets/images/locator/v-icon.png" alt="logo-loader"/>
                <p class="">Please Wait...</p>
            </div>
        </div>
        <div v-else>
            <v-table v-model:page="page" :items="filteredList" :items-per-page="itemsPerPage" class="mt-5">
                <thead>
                    <tr>
                        <th class="text-subtitle-1 font-weight-bold">Id </th>
                        <th class="text-subtitle-1 font-weight-bold">Restaurant Name</th>
                        <!-- <th class="text-subtitle-1 font-weight-bold">Customer Name</th> -->
                        <th class="text-subtitle-1 font-weight-bold">Email</th>
                        <th class="text-subtitle-1 font-weight-bold">Package Name</th>
                        <th class="text-subtitle-1 font-weight-bold">Status</th>
                        <th class="text-subtitle-1 font-weight-bold">Action</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(item, index) in paginatedList" :key="item.id" :currentPage="currentPage" :pageSize="10">
                        <template v-if="index<page*10">
                            
                            <template v-if="page>1?(index>=(page-1)*10):true">
                                <td class="text-subtitle-1">{{index+1 }}</td>
                                <td>
                                    <div class="d-flex py-4">
                                        <div class="">
                                            <!-- <h4 class="text-h6 font-weight-semibold">{{ item.userinfo }}</h4> -->
                                            <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.restaurantName }}</span>
                                        </div>
                                    </div>
                                </td>
                                <!-- <td>
                                    <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.firstName }} {{ item.lastName}}</span>
                                </td>
                                -->
                                <td>
                                    <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.email }}</span>
                                </td>

                                <td>
                                    <v-chip 
                                    :color="(item.packageName =='V Locator +'?'primary':(item.packageName === 'Premium A'?'error':(item.packageName === 'Premium B'? 'warning':(item.packageName === 'Premium C'? 'success': 'secoundary'))))"
                                    size="small">{{ item.packageName || 'Basic' }}</v-chip>
                                </td>
                                
                                <td>
                                    <v-switch
                                        color="primary"
                                        :model-value="item.status"
                                        :class="item.status == true ? 'text-primary' : 'text-error'"
                                        :label="item.status == true ? 'Active' : 'Inactive'"
                                        @click="toggleStatus(item)"
                                    ></v-switch>
                                    <!-- <v-switch
                                        :color="item.status === true? 'primary':'error'"
                                        :model-value="item.status"
                                        :label="item.status === true? 'Block':'Unblock'"
                                        @click="item.status === true? '':'' "
                                    ></v-switch> -->
                                </td>
                                <td>
                                    <div class="d-flex align-center">
                                        <v-tooltip text="Edit">
                                            <template v-slot:activator="{ props }">
                                                <router-link :to="`/singleManager/${item.id}`" color="secondary">
                                                <v-btn icon flat>
                                                    <EyeIcon size="20" class="text-secondary" />
                                                </v-btn>
                                                </router-link>

                                            </template>
                                        </v-tooltip>
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
                            </template>
                        </template>
                    </tr>
                </tbody>
            </v-table>
            <v-pagination v-model="currentPage" :length="Math.ceil(filteredList.length / itemsPerPage)"
        rounded="circle"></v-pagination>
        </div>
    </div>
    
</template>
