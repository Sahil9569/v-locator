<script setup lang="ts">
// import { ref } from "vue";
import { ref, computed, onMounted ,onBeforeMount } from 'vue';
import axios from 'axios'; // Make sure to install Axios in your project
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL
const dialog = ref(false);
const desserts = ref([]);
const itemList = computed(() => {
    return desserts.value;
});
const showLoader = ref(false);
const new_loader = ref(false);
const states = ref([]);
const selectTable = ref([]);
onMounted(() => {
    fetchServicestaffList();
    fetchtableList();
});



const fetchServicestaffList = async () => {
    new_loader.value = true;
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post('api/kitchen/staff_availability/',{'token':token});
        console.log('staff list ka data  ---', response.data);
        const data_items = response.data;
        if (data_items) {
            new_loader.value = false;
            const updatedData = data_items.map((item: any) => {
            
            return {
                name: `${item.first_name} ${item.last_name}`,
                id:item.id,
                contact: item.phone,
                totalOrder: item.served_orders, // Use the date directly if it's in the desired format
                status:  item.table_names,     
                };
            });

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



const fetchtableList = async () => {
    new_loader.value = true;
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post('api/kitchen/fetch_tablelist/',{'token':token});
        // console.log('table list ka data ---', response.data.tables);
        console.log('table list ka data ---', response.data);
        if (response.data) {
            new_loader.value = false;
            const tableArray = response.data;
            const transformedTableOptions = tableArray.map(tableObject => `${tableObject.table} -- ${tableObject.id}`);
            states.value = transformedTableOptions;
            // states.value = transformedTableOptions.map(option => option.split('--')[0]);
        } else {
            new_loader.value = false;
            console.log("API response error");
        }
    } catch (error) {  
        new_loader.value = false;
        console.error('API error:', error);
    }
}

const saveData = async (tableValue: string, itemId: number , item) => {
    showLoader.value = true;
    try {
        const valuesList = Object.values(tableValue);
        const extractedNumbers = valuesList.map(value => {
            const match = value.match(/(\d+)$/); // Match the last integer number in the string
            return match ? parseInt(match[1]) : null;
        });
        
        const token = localStorage.getItem('authToken');
        const response = await axios.post('api/kitchen/save_tabledata/',{
            'token':token,
            'table_id': extractedNumbers,
            'staff_id':itemId,
        });
        showLoader.value = false;

        if (response.data) {
            fetchtableList();
            fetchServicestaffList();
            item.dialog = false;

        } else {
            showLoader.value = false;
            console.log("API response error");
        }
    } catch (error) {
        showLoader.value = false;
        console.error('API error:', error);
    }
    
}



</script>

<template>
    <v-card class="bg-lightprimary elevation-0 rounded-md mb-8">
        <div class="px-8 py-8 py-sm-0">
            <div class="d-flex justify-space-between">
                <div class="d-flex py-0 align-center">
                    <div>
                        <h3 class="text-h3 mb-2 textPrimary">Staff Availability </h3>
                    </div>
                </div>
                <div class="d-none py-0 d-sm-block overflow-hidden">
                    <div class="mb-n16 mt-3">
                        <img src="@/assets/images/backgrounds/staffavailitiy.png" alt="breadcrumb" width="275" />
                    </div>
                </div>
            </div>
        </div>
    </v-card>
    <div class="p-relative">
        <div class="logoLoader tableLoader" v-if="new_loader == true">
            <div class="LogoVInnerImg">
                <img src="@/assets/images/locator/v-icon.png" alt="logo-loader"/>
                <p class="">Please Wait...</p>
            </div>
        </div>
        <v-row>
            <v-col cols="12" lg="4" md="6" sm="6" v-for="item in itemList" :key="item">
                <div class="bg-primary rounded-md pa-5">
                    <div class="d-flex align-center justify-space-between">
                    <div>
                        <div class="text-h5 mb-2">Name : {{ item.name }}</div>
                        <p class="text-subtitle-1 mb-1 textlight">Contact : {{ item.contact }}</p>
                        <p class="text-subtitle-1 mb-1 textlight">Total Order : {{ item.totalOrder }}</p>
                        <p class="d-flex text-subtitle-1 mb-1 textlight">
                        <span class="me-1 text-no-wrap">Status :</span> <span>{{ item.status }}</span>
                        </p>
                    </div>
                    <div class="bg-lightprimary rounded-pill pa-3">
                        <img src="@/assets/images/backgrounds/staf.png" width="70" class="d-block" style="margin:auto;">
                    </div>
                    </div>
                    <v-btn class="mt-2 text-primary bg-lightprimary elevation-0" size="small" @click="item.dialog = true">
                        Assign Table</v-btn>
                    
                        <v-dialog v-model="item.dialog" class="dialog-mw" max-width="500">
                            <v-card>
                                <v-card-text>
                                    <div class="text-h5 mb-5">Name : {{ item.name }} </div>
                                    <v-select v-model="selectTable" :items="states" label="Select Table" color="primary" class="primary" multiple></v-select>
                                </v-card-text>
                                <v-card-actions>
                                    <!-- <v-btn color="primary" class="bg-primary" size="small" block @click="() => saveData(selectTable, item.id,item)">Save</v-btn> -->
                                    <v-btn
                                        color="primary"
                                        class="bg-primary"
                                        size="small"
                                        block
                                        @click="() => saveData(selectTable, item.id,item)"
                                        :disabled="showLoader">
                                        <template v-if="showLoader">
                                            <div class="loaderBn"></div>Saving
                                        </template>
                                        <template v-else>
                                            Save
                                        </template>
                                    </v-btn>

                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                </div>
            </v-col>
        </v-row>
        <!-- <v-row>
        </v-row> -->
    </div>
</template>