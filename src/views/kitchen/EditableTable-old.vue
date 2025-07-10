<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useContactStore } from '@/stores/apps/contact';
import axios from 'axios';
import { RouterLink, useRouter } from "vue-router";
import contacts from '@/_mockApis/apps/contact';
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL
// import { VTable, VPagination } from '@/_mockApis/apps/contact';
const store = useContactStore();
const itemsPerPage = 10;
const currentPage = ref(1);

const showLoader = ref(false)
onMounted(() => {
    fetchManagers();
    fetchChefs();
    fetchKitchenList();
});
const getContacts: any = computed(() => {
    return store.contacts;
});
// const myManagers = ref({});
const token = localStorage.getItem('res_token')
const errormsg = ref('');
const valid = ref(true);
const dialog = ref(false);
const search = ref('');
const category = ref(['Kitchen', 'Bar']);
const manager = ref();
const chef = ref();
const floor = ref(['0','1', '2', '3']);
const new_loader = ref(false);
const resType = localStorage.getItem('res_type');
const desserts = ref();
const editedIndex = ref(-1);
const editedItem = ref({
    Srno:'',
    id: '',
    userinfo: '',
    manager:[],
    Category:[],
    chef:[],
    floor: []
});
const defaultItem = ref({
    Srno:'',
    id: '',
    userinfo: '',
    manager:'Select Manager',
    Category:'Select Category',
    chef:'Select Chef',
    floor: 'Select Floor',
});

//Methods
const filteredList = computed(() => {
    if (!desserts.value) return []; // Check if desserts.value is defined
    return desserts.value.filter((item: any) => {
        return item.userinfo.toLowerCase().includes(search.value.toLowerCase());
    });
});

const paginatedList = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredList.value.slice(start, end);
});



function editItem(item: any) {
    editedIndex.value = desserts.value.indexOf(item);
    // console.log("EDITED ITEM",editedIndex);
    editedItem.value = Object.assign({}, item);
  
    dialog.value = true;
    
}
function deleteItem(item: any) {
    const index = desserts.value.indexOf(item);
    // confirm('Are you sure you want to delete this item?') && desserts.value.splice(index, 1);
    deleteKitchen(item.id);
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
        console.log(desserts.value[editedIndex.value], editedItem.value)
        Object.assign(desserts.value[editedIndex.value], editedItem.value);
        editKitchen();
    } else {
        try {
            // await editKitchen();
            await addKitchen();
            fetchKitchenList();
        } catch (error) {
            console.error("Error:", error);
            // Handle the error if needed
        }
        // desserts.value.push(editedItem.value);
    }
    close();
}

//Computed Property
const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'Add Kitchen' : 'Edit Kitchen';
});

const addKitchen = async () => {
    showLoader.value = true;
    console.log("STAFF API CALL")
    try {
        console.log("INSIDE TRY",valid.value)
        const token = localStorage.getItem('authToken');
        const formdata = {
            token:token,
            name:editedItem.value.userinfo,
            cat:editedItem.value.Category,
            manager:editedItem.value.manager,
            floor:editedItem.value.floor,
        }
        const response = await axios.post('api/kitchen/add_kitchen/',formdata);
        showLoader.value = false;
            if (response.data) {

            }else{
                showLoader.value = false;
                console.log("First Error")
            }
        } catch (error) {
            showLoader.value = false;
            console.error('API error:', error);
            if (error.response && error.response.data) {
                errormsg.value = error.response.data.error;
                setTimeout(() => {
                    errormsg.value = ''
                }, 5000);
        }
    }
}

const fetchManagers = async () => {
    try {
        // Make an API call to fetch the managers' data
        const token = localStorage.getItem('authToken');
        const formdata = {
        token:token
        }
        const response = await axios.post('api/staff/fetch_managers/',formdata);
        // Assuming the response contains an array of managers with IDs and names
        console.log("RESPONSE",response.data);
        manager.value = response.data.map((m:any) => (`${m.id} - ${m.first_name} ${m.last_name}`));
        // myManagers.value = response.data.map((m:any) => ({text: `${m.first_name} ${m.last_name}`,value: m.id }));
        // console.log("HERERERERE",myManagers.value);
      } catch (error) {
        console.error('Error fetching managers:', error);
      }
    }
const fetchChefs = async () => {
    try {
        // Make an API call to fetch the managers' data
        const token = localStorage.getItem('authToken');
        const formdata = {
        token:token
        }
        const response = await axios.post('api/staff/fetch_chef/',formdata);
        // Assuming the response contains an array of managers with IDs and names
        console.log("RESPONSE",response.data);
        chef.value = response.data.map((m:any) => (`${m.id} - ${m.first_name} ${m.last_name}`));
        // myManagers.value = response.data.map((m:any) => ({text: `${m.first_name} ${m.last_name}`,value: m.id }));
        // console.log("HERERERERE",myManagers.value);
      } catch (error) {
        console.error('Error fetching managers:', error);
      }
    }
const fetchKitchenList = async () => {
    new_loader.value = true;
    console.log("Kitchen LIST API CALL")
    try {
        console.log("INSIDE TRY",valid.value)
        const token = localStorage.getItem('authToken');
        const response = await axios.post('api/kitchen/all_kitchen/',{'token':token});
        console.log('Staff all kitchen API responseTESTSTS:', response.data);
        function check_it(item:any){
            try{
                return `${item.manager.id}  - ${item.manager.first_name} ${item.manager.last_name}`
            }
            catch{
                return "N/A"
            }
                
        }
        if (response.data) {
            new_loader.value = false;
            const updatedData = response.data.kitchen.map((item:any,index:any) => ({
                    Srno: `#${index+1}`,
                    id:item.id,
                    userinfo: item.name,
                    usermail: check_it(item.manager),
                    Category: item.category,
                    Floor: item.floor,
                    
                }));
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
const editKitchen = async () => {
    showLoader.value = true;
    console.log("STAFF Edit API CALL")
    try {
        console.log("INSIDE TRY",valid.value)
        const token = localStorage.getItem('authToken');
        const formdata = {
            token:token,
            kit_id:editedItem.value.id,
            name:editedItem.value.userinfo,
            cat:editedItem.value.Category,
            manager: editedItem.value.manager,
            chef: editedItem.value.chef,
            floor: editedItem.value.floor

        }
        console.log("CREATE",formdata)
        const response = await axios.post('api/kitchen/update_kitchen/',formdata);
        showLoader.value = false;
        console.log('Staff API response:', response.data);
        //   router.push('/dashboards');
        if (response.data) {
            // console.log("INSIDE IF")
            // localStorage.setItem('authToken', response.data.access);
            // router.push('/dashboards');
        }else{
            showLoader.value = false;
            console.log("First Error")
        }
    } catch (error) {
        showLoader.value = false;
        console.error('API error:', error);
        
    }
}
const deleteKitchen = async (index:any) => {
    console.log("STAFF Delete API CALL"  , index)
  try {
    console.log("INSIDE TRY",index)
    const token = localStorage.getItem('authToken');
    const formdata = {
        token:token,
        kit_id:index,
    }
    console.log(formdata);
    const response = await axios.post('api/kitchen/delete_kitchen/',formdata);
      console.log('Staff API response:', response.data);
      if (response.data) {
        fetchKitchenList();

      }else{
        console.log("First Error")
      }
  } catch (error) {
    console.error('API error:', error);
    
  }
}

const set_kitchen = (item:any) => {
    console.log('set kicthen k ander hu ',item)
    localStorage.removeItem('kitchen')
    localStorage.setItem('kitchen',item)
}
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
    <v-row>
        <v-col cols="12" lg="4" md="6">
            <v-text-field density="compact" v-model="search" label="Search Kitchen" hide-details variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="12" lg="8" md="6" class="text-right">
            <v-dialog v-model="dialog" max-width="500">
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props" flat class="ml-auto" v-show="resType!='Vendor'">
                        <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Add Kitchen
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
                                        hide-details
                                        v-model="editedItem.userinfo"
                                        label="Name"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="category"
                                        v-model="editedItem.Category"
                                        label="Category"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="manager"
                                        v-model="editedItem.manager"
                                        label="Manager"
                                    ></v-select>
                                </v-col>
                                <!-- <v-col cols="12" sm="6">
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="chef"
                                        v-model="editedItem.chef"
                                        label="Chef"
                                    ></v-select>
                                </v-col> -->
                                
                                <v-col cols="12" sm="6">
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="floor"
                                        v-model="editedItem.floor"
                                        label="Floor"
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
                            :disabled="editedItem.userinfo === '' || editedItem.Category === '' || editedItem.manager === '' || editedItem.floor === ''"
                            variant="flat"
                            @click="save"
                            type="Submit"
                            >
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
                    <th class="text-subtitle-1 font-weight-bold">S No.</th>
                    <th class="text-subtitle-1 font-weight-bold">Name</th>
                    <th class="text-subtitle-1 font-weight-bold" v-if="resType!='Vendor'">Manager Name</th>
                    <th class="text-subtitle-1 font-weight-bold">Category</th>
                    <th class="text-subtitle-1 font-weight-bold" v-if="resType!='Vendor'">Floor</th>
                    <th class="text-subtitle-1 font-weight-bold" v-if="resType!='Vendor'">Actions</th>
                    
                </tr>
            </thead>
            
                <tbody >
                    <tr v-for="item in paginatedList" :key="item.id" :currentPage="currentPage" :pageSize="10">
                        <td class="text-subtitle-1">{{  item.Srno}}</td>
                        
                        <td>
                            <div class="d-flex py-4">
                                <div class="">
                                    <RouterLink @click="set_kitchen(item.id)" :to="'/kitchenSingleDetail/' + token + '/' + item.id">
                                    <!-- <RouterLink :to='/kitchenSingleDetail/{{token}}/{{item.id}}'>  -->
                                        <span class="text-subtitle-1 d-block mt-1 textSecondary text-primary">{{ item.userinfo }}</span>
                                    </RouterLink>
                                </div>
                            </div>
                        </td>
                        <td v-if="resType!='Vendor'">
                            <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.usermail }}</span>
                        </td>
                        <td>
                            <span class="text-subtitle-1">{{ item.Category }}</span>
                        </td>
                        <td  v-if="resType!='Vendor'">
                            <v-chip :color="item.rolestatus" size="small" label>{{ item.Floor }}</v-chip>
                        </td>
                        <td>
                            <div class="d-flex align-center" v-if="resType!='Vendor'">
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
                </tbody>
            
        </v-table>
        <v-pagination v-model="currentPage" :length="Math.ceil(filteredList.length / itemsPerPage)"
            rounded="circle"></v-pagination>
    </div>
</template>

