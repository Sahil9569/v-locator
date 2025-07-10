<script setup lang="ts">
import { ref, computed, onMounted,onBeforeMount } from 'vue';
import { useContactStore } from '@/stores/apps/contact';
import table1 from '@/assets/images/locator/table1.png';
import table2 from '@/assets/images/locator/table2.png';
import table3 from '@/assets/images/locator/table3.png';
import table4 from '@/assets/images/locator/table4.png';
import table5 from '@/assets/images/locator/table5.png';
import table6 from '@/assets/images/locator/table6.png';
import table7 from '@/assets/images/locator/table7.png';
import table8 from '@/assets/images/locator/table8.png';
import tableList from '@/_mockApis/apps/table';
import axios from 'axios';
import { useRouter } from "vue-router";
import contacts from '@/_mockApis/apps/contact';
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL
const MY_URL = `http://127.0.0.1:8000`
// const MY_URL = `http://74.208.172.211`
const new_loader = ref(false);
const store = useContactStore();
const showLoader = ref(false);
onBeforeMount(() => {
    // store.fetchContacts();
    fetchTableList();
});
const getContacts: any = computed(() => {
    return store.contacts;
});
const itemsPerPage = 10;
const currentPage = ref(1);
const errormsg = ref('');
const valid = ref(true);
const dialog = ref(false);
const dialogQr = ref(false);
const search = ref('');
const side = ref(['VIP Block', 'Family Corner', 'Pool Side']);
const desserts = ref();
const editedIndex = ref(-1);
const editedItem = ref({
    serial: '',
    id:'',
    avatar: '1.jpg',
    tableName: '',
    qrclick:'',
    Capacity: '',
    Role: '',
    side: [],
    rolestatus: ''
});
const defaultItem = ref({
    serial: '',
    id:'',
    avatar: '1.jpg',
    tableName: '',
    Capacity: '',
    Role: '',
    side: '',
    rolestatus: ''
});
//Methods
const filteredList = computed(() => {
    if (!desserts.value) return [];
    
    return desserts.value.filter((item:any) => {
        console.log("THIS IS ITEM TESTING",item);
        return item.tableName.toLowerCase().includes(search.value.toLowerCase());
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
async function deleteItem(item: any) {
    const index = desserts.value.indexOf(item);
    // confirm('Are you sure you want to delete this item?') && desserts.value.splice(index, 1);
    deleteTable(item.id);
    await fetchTableList();
}

function close() {
    dialog.value = false;
    setTimeout(() => {
        editedItem.value = Object.assign({}, defaultItem.value);
        editedIndex.value = -1;
    }, 300);
}
// function closeQr() {
//     dialogQr.value = false;
// }
async function save() {
    if (editedIndex.value > -1) {
        editTable();
        Object.assign(desserts.value[editedIndex.value], editedItem.value);
    } else {
        try {
            await addTable();
            fetchTableList();
        } catch (error) {
            console.error("Error:", error);
            // Handle the error if needed
        }
    }
    close();
}
const addTable = async () => {
    console.log("STAFF API CALL")
    showLoader.value = true; 
    try {
        console.log("INSIDE TRY",valid.value)
        const token = localStorage.getItem('authToken');
        const formdata = {
            token:token,
            table:editedItem.value.tableName,
            capacity:editedItem.value.Capacity,
            side:editedItem.value.side,

        }
        console.log("TESTSTS",formdata)
        const response = await axios.post('api/table/add_table/',formdata);
        showLoader.value = false; 
        console.log('Table API response:', response.data);
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

const fetchTableList = async () => {
    new_loader.value = true;
    console.log("Kitchen LIST API CALL")
    try {
        console.log("INSIDE TRY",valid.value)
        const token = localStorage.getItem('authToken');
        const response = await axios.post('api/table/all_table/',{'token':token});
        console.log('table list aagyi h kya ', response.data);
        if (response.data) {
            new_loader.value = false;
            const updatedData = response.data.map((item:any , index:any) => ({
                    serial:`#${index+1}`,
                    id:`#${item.id}`,
                    tableName:item.table,
                    Capacity:item.capacity,
                    side:item.side,  
                    qrclick: item.qr_base64,         
                }));
                // console.log('fdsfdsfdsfdsfdsf',updatedData)
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
const editTable = async () => {
    console.log("STAFF Edit API CALL")
  try {
    console.log("INSIDE TRY",valid.value)
    const token = localStorage.getItem('authToken');
    const formdata = {
        token:token,
        table_id:editedItem.value.id,
        table:editedItem.value.tableName,
        capacity:editedItem.value.Capacity,
        side:editedItem.value.side,

    }
    console.log("CREATE",formdata)
    const response = await axios.post('api/table/update_table/',formdata);
      console.log('Staff API response:', response.data);
  } catch (error) {
    console.error('API error:', error);
    
  }
}

const deleteTable = async (index:any) => {
    console.log("STAFF Delete API CALL")
  try {
    console.log("INSIDE TRY",index)
    const token = localStorage.getItem('authToken');
    const formdata = {
        token:token,
        table_id:index,
    }
    console.log(formdata);
    const response = await axios.post('api/table/delete_table/',formdata);
      console.log('Table API response:', response.data);
  } catch (error) {
    console.error('API error:', error);
    
  }
}
const printqr = async (index:any) => {
  try {
    const token = localStorage.getItem('res_token');
    const formdata = {
      token: token,
    };

    const response = await axios.post('api/table/print_qr/', formdata, {
      responseType: 'blob', // Specify the response type as 'blob' to handle binary data
    });

    // Create a Blob object with the binary data from the response
    const blob = new Blob([response.data], { type: 'application/pdf' });

    // Create a URL for the Blob object
    const url = window.URL.createObjectURL(blob);

    // Create an anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qr_codes.pdf'; // Set the desired filename

    // Simulate a click on the anchor element to trigger the download
    a.click();

    // Clean up the Blob and URL objects
    window.URL.revokeObjectURL(url);

    console.log('Table API response:', response.data);
  } catch (error) {
    console.error('API error:', error);
  }
};
//Computed Property
const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'Add Table' : 'Edit Table';
});

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
            <v-text-field density="compact" v-model="search" label="Search Table" hide-details variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="12" lg="8" md="6" class="text-right">
            <v-dialog v-model="dialog" max-width="500">
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props" flat class="ml-auto">
                        <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Add Table
                    </v-btn>
                    <v-btn color="primary" flat class="ml-3" @click="printqr">
                        <v-icon class="mr-2">mdi-download</v-icon>Download QR's PDF
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
                                        v-model="editedItem.tableName"
                                        label="Name"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        type="number"
                                        v-model="editedItem.Capacity"
                                        label="Capacity"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="side"
                                        v-model="editedItem.side"
                                        label="Side"
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
                            :disabled="editedItem.tableName == '' || editedItem.Capacity == '' || editedItem.side == ''"
                            variant="flat"
                            @click="save"
                            type="Submit">
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
                    <th class="text-subtitle-1 font-weight-bold">S No </th>
                    <th class="text-subtitle-1 font-weight-bold">Table Name / No.</th>
                    <th class="text-subtitle-1 font-weight-bold">Qr Code</th>
                    <th class="text-subtitle-1 font-weight-bold">Capacity  </th>
                    <th class="text-subtitle-1 font-weight-bold">Position </th>
                    <th class="text-subtitle-1 font-weight-bold">Sitting </th>
                    <th class="text-subtitle-1 font-weight-bold">Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="item in paginatedList" :key="item.id" :currentPage="currentPage" :pageSize="10">
                    <td class="text-subtitle-1">{{ item.serial }}</td>
                    <td>
                        <div class="d-flex py-4">
                            <div class="">
                                <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.tableName }}</span>
                            </div>
                        </div>
                    </td>
                    <td class="pt-2 pb-1">
                        <v-dialog v-model="item.dialogQr" max-width="500">
                            <template v-slot:activator="{ props }">
                                <div v-bind="props" flat  >
                                    <img :src="item.qrclick" style="max-width: 40px;cursor: pointer;" alt="Qr Code" />
                                </div>
                            </template>
                            <v-card>
                                <v-card-title class="pa-4 border-bottom border-primary">
                                    <img src="@/assets/images/locator/logo-dark.png" style="width:175px;">
                                </v-card-title>
                                <v-card-text class="text-center">
                                    <img :src="item.qrclick" style="max-width: 400px;">
                                </v-card-text>

                                <v-card-actions class="pa-4">
                                    <v-spacer></v-spacer>
                                    <v-btn color="error" @click="item.dialogQr = false">Cancel</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </td>
                    <td>
                        <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.Capacity }}</span>
                    </td>
                    <td>
                        <v-chip v-if="item.side === 'Family Corner'" color="error" size="small" label>{{ item.side }}</v-chip>
                        <v-chip v-if="item.side === 'Pool Side'" color="primary" size="small" label>{{ item.side }}</v-chip>
                        <v-chip v-if="item.side === 'VIP Block'" color="secondary" size="small" label>{{ item.side }}</v-chip>
                    </td>
                    <td>
                        <template v-if="item.Capacity == '1'"><img :src="table1" alt="table" style="max-width:16px;"></template>
                        <template v-if="item.Capacity == '2'"><img :src="table2" alt="table" style="max-width:20px;"></template>
                        <template v-if="item.Capacity == '3'"><img :src="table3" alt="table" style="max-width:24px;"></template>
                        <template v-if="item.Capacity == '4'"><img :src="table4" alt="table" style="max-width:24px;"></template>
                        <template v-if="item.Capacity == '5'"><img :src="table5" alt="table" style="max-width:24px;"></template>
                        <template v-if="item.Capacity == '6'"><img :src="table6" alt="table" style="max-width:24px;"></template>
                        <template v-if="item.Capacity == '7'"><img :src="table7" alt="table" style="max-width:24px;"></template>
                        <template v-if="item.Capacity == '8'"><img :src="table8" alt="table" style="max-width:24px;"></template>                    
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
        <v-pagination v-model="currentPage" :length="Math.ceil(filteredList.length / itemsPerPage)"
            rounded="circle"></v-pagination>
    </div>
</template>
