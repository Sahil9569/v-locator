<script setup lang="ts">
import { ref, computed, onMounted, onBeforeMount } from 'vue';
import { useContactStore } from '@/stores/apps/contact';
import { checkTokenAndShow404 } from '@/utility'; 
import couponDiscount from '@/_mockApis/apps/couponDiscount';
import axios from 'axios';
import { useRouter } from "vue-router";
import contacts from '@/_mockApis/apps/contact';
const router = useRouter();
import BASE_URL from '@/stores/myVar';
const showLoader = ref(false);
const new_loader = ref(false);
axios.defaults.baseURL = BASE_URL

const store = useContactStore();
onBeforeMount(() => {
  checkTokenAndShow404();
});
onMounted(() => {
    store.fetchContacts();
    getAllCoupans();
});
const getContacts: any = computed(() => {
    return store.contacts;
});

const valid = ref(true);
const dialog = ref(false);
const search = ref('');
const itemsPerPage = ref(5)
const page = ref(1)
const status = ref(['Active', 'Expired']);
const status1 = ref(['Amount', 'Percentage']);



const desserts = ref();
const editedIndex = ref(-1);
const editedItem = ref({
    id:'',
    couponName: '',
    code: '',
    creditType:[],
    amount: '',    
    startDate: '',
    lastDate: '',
    components: '',
    status:[],
});
const defaultItem = ref({
    id:'',
    couponName: '',
    code: '',
    creditType:[],
    amount: '',
    startDate: '',
    lastDate: '',
    components: '',
    rolestatus:'',
    status:[],
});


//Methods
const pageCount = computed(() => {
    return Math.ceil(filteredList.value.length / itemsPerPage.value) 
});

const filteredList = computed(() => {
    if (!desserts.value) return [];
    return desserts.value.filter((item: any) => {
        return item.couponName.toLowerCase().includes(search.value.toLowerCase());
    });
});

function editItem(item: any) {
    editedIndex.value = desserts.value.indexOf(item);
    editedItem.value = Object.assign({}, item);
    dialog.value = true;
}
function deleteItem(item: any) {
    const index = desserts.value.indexOf(item);
    // confirm('Are you sure you want to delete this item?') && desserts.value.splice(index, 1);
    deleteCoupan(item.id);
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
        editCoupan();
    } else {
        desserts.value.push(editedItem.value);
        addCoupans();
    }
    close();
}

//Computed Property
const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'Add Coupon' : 'Edit Coupon';
});

const getAllCoupans = async () => {
    new_loader.value = true;
    console.log("Order LIST API CALL")
    try {
        console.log("INSIDE TRY",valid.value)
        const token = localStorage.getItem('authToken');
        const urlToken = window.location.href.split('/').pop();
        const formData = {
            token:token,
            url_token:urlToken,        
        };
        const response = await axios.post('api/orders/all_coupans/',formData);
        console.log('Coupans API response:', response.data);
        if (response.data) {
            new_loader.value = false;
            const updatedData = response.data.map((item:any,index:any) => ({   
                    id:item.id,
                    couponName:item.name,
                    code:item.code,
                    creditType:item.credit_type,
                    amount: item.credit_type === "Percentage" ? `${item.amt} %` : `$ ${item.amt}`,
                    startDate:item.start_date,
                    lastDate:item.end_date,
                    status:item.status
                    
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
const addCoupans = async () => {
    showLoader.value = true;
    console.log("Coupan API CALL")
    try {
        console.log("INSIDE TRY",valid.value)
        const token = localStorage.getItem('authToken');
        const urlToken = window.location.href.split('/').pop();
        const formdata = {
            token:token,
            url_token:urlToken,
            name:editedItem.value.couponName,
            code:editedItem.value.code,
            credit_type:editedItem.value.creditType,
            status:editedItem.value.status,
            amt:editedItem.value.amount,
            start_date:editedItem.value.startDate,
            end_date:editedItem.value.lastDate,

        }
        console.log("TESTSTS",formdata)
        const response = await axios.post('api/orders/add_coupans/',formdata);
        showLoader.value = false;
        console.log('Kitchen API response:', response.data);
    } catch (error) {
        showLoader.value = false;
        console.error('API error:', error);
        
    }
}
const editCoupan = async () => {
    console.log("STAFF Edit API CALL")
    showLoader.value = true;

    try {
        console.log("INSIDE TRY",valid.value)
        const token = localStorage.getItem('authToken');
        const urlToken = window.location.href.split('/').pop();
        const formdata = {
            token:token,
            url_token:urlToken,
            cop_id:editedItem.value.id,
            name:editedItem.value.couponName,
            code:editedItem.value.code,
            credit_type:editedItem.value.creditType,
            status:editedItem.value.status,
            amt:editedItem.value.amount,
            start_date:editedItem.value.startDate,
            end_date:editedItem.value.lastDate,
        }
        console.log("CREATE",formdata)
        const response = await axios.post('api/orders/edit_coupan/',formdata);
        showLoader.value = false;
        console.log('EDIt Coupan API response:', response.data);
        if (response.data) {
            
        }else{
            showLoader.value = false;
            console.log("First Error")
        }
    } catch (error) {
        showLoader.value = false;
        console.error('API error:', error);
        
    }
}
const deleteCoupan = async (index:any) => {
    console.log("STAFF Delete API CALL")
  try {
    console.log("INSIDE TRY",index)
    const token = localStorage.getItem('authToken');
    const urlToken = window.location.href.split('/').pop();
    const formdata = {
        token:token,
        url_token:urlToken,
        cop_id:index,
    }
    console.log(formdata);
    const response = await axios.post('api/orders/delete_coupan/',formdata);
      console.log('Staff API response:', response.data);
      if (response.data) {
      }else{
        console.log("First Error")
      }
  } catch (error) {
    console.error('API error:', error);
    
  }
}
</script>
<template>
    <v-row>
        <v-col cols="12" lg="4" md="6">
            <v-text-field density="compact" v-model="search" label="Search Coupon Name" hide-details variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="12" lg="8" md="6" class="text-right">
            <v-dialog v-model="dialog" max-width="700">
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props" flat class="ml-auto">
                        <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Add Coupon
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
                                        density="compact"
                                        v-model="editedItem.couponName"
                                        label="Coupon Name*"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        density="compact"
                                        v-model="editedItem.code"
                                        label="Coupon Code*"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field 
                                        variant="outlined"  
                                        v-model="editedItem.startDate" 
                                        hide-details 
                                        type="date" 
                                        label="Start Date*">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field variant="outlined"  v-model="editedItem.lastDate" hide-details type="date" label="End Date*"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="status1"
                                        v-model="editedItem.creditType"
                                        label="Credit Type*"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.amount"
                                        type="number"
                                        label="Credit"
                                        placeholder="Number only*"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="status"
                                        v-model="editedItem.status"
                                        label="Status*"
                                    ></v-select>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>

                    <v-card-actions class="pa-4">
                        <v-spacer></v-spacer>
                        <v-btn color="error" @click="close">Cancel</v-btn>
                        <v-btn color="primary"
                            :disabled="editedItem.couponName == '' || editedItem.code == '' || editedItem.startDate == '' || editedItem.lastDate == '' || editedItem.creditType == '' || editedItem.amount == '' || editedItem.status == ''"
                            variant="flat"
                            @click="save"
                            type="Submit">
                            <template v-if="showLoader">
                                <div class="loaderBn"></div> Submitting
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
        <v-table v-model:page="page" :items="filteredList" :items-per-page="itemsPerPage" class="mt-5">
            <thead>
                <tr>
                    <th class="text-subtitle-1 font-weight-semibold">Name</th>
                    <th class="text-subtitle-1 font-weight-semibold">Code</th>
                    <th class="text-subtitle-1 font-weight-semibold">Amount</th>
                    <th class="text-subtitle-1 font-weight-semibold">Date</th>
                    <th class="text-subtitle-1 font-weight-semibold">Status</th>
                    <th class="text-subtitle-1 font-weight-semibold">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in filteredList" :key="item.id">
                    <td>
                        <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.couponName }}</span>
                    </td>
                    <td>
                        <v-chip  size="small" label><span class="font-weight-semibold">{{ item.code }}</span></v-chip>
                    </td>
                    <td>
                        <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.amount }}</span>
                    </td>
                    <td>
                        <span class="text-subtitle-1 d-block mt-1 textSecondary"><span class="font-weight-semibold">Start Date:</span> {{ item.startDate }}</span>
                        <span class="text-subtitle-1 d-block mt-1 textSecondary"><span class="font-weight-semibold">End Date:</span> {{ item.lastDate }}</span>
                    </td>
                    <td>
                        <v-chip v-if="item.status === 'Active'" color="primary"   size="small" label>{{ item.status }}</v-chip>
                        <v-chip v-if="item.status === 'Experied'" color="error"  size="small" label>{{ item.status }}</v-chip>
                        <v-chip v-if="item.status === 'Draft'" color="warning"  size="small" label>{{ item.status }}</v-chip>
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
            </tbody>
        </v-table>
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
</template>
