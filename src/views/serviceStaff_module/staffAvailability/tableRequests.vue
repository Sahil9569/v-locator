<script setup lang="ts">
import { ref, computed, onMounted ,onBeforeMount } from 'vue';
import axios from 'axios'; // Make sure to install Axios in your project
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL
const dialog = ref(false);
const desserts = ref([]);
const itemList = computed(() => {
    return desserts.value;
});
const states = ref([]);
const selectTable = ref([]);
onMounted(() => {
    fetchtableList();
});
const new_loader = ref(false);

const fetchtableList = async () => {
    new_loader.value = true;
    try {
        const token = localStorage.getItem('res_token');
        const response = await axios.post('api/kitchen/table_requests/',{'token':token});
        // console.log('table list ka data ---', response.data.tables);
        console.log('table list ka data ---', response.data);
        new_loader.value = false;
        desserts.value = response.data
    } catch (error) {
        new_loader.value = false;
        console.error('API error:', error);
    }
}
const acceptReq = async (item:any) => {
    try {
        // const token = localStorage.getItem('res_token');
        const formdata = {
            item:item.id,
            status:'Accepted'
        }
        const response = await axios.post('api/kitchen/requests/',formdata);
        console.log('table list ka data ---', response.data);
        fetchtableList();
    } catch (error) {
        console.error('API error:', error);
    }
}

const rejectReq = async (item:any) => {
    try {
        // const token = localStorage.getItem('res_token');
        const formdata = {
            item:item.id,
            status:'Rejected'
        }
        const response = await axios.post('api/kitchen/requests/',formdata);
        // console.log('table list ka data ---', response.data.tables);
        console.log('table list ka data ---', response.data);
        fetchtableList();
    } catch (error) {
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
                        <h3 class="text-h3 mb-2 textPrimary">Table Requests </h3>
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
            <v-col cols="12" lg="4" md="6" sm="6"  v-for="item in itemList" :key="item">
                <v-card elevation="10">
                    <v-card-item class="pa-4">
                        <v-row class="align-center" >
                            <v-col cols="auto">
                                <img src="@/assets/images/backgrounds/Table-design.png" width="70">
                            </v-col>
                            <v-col cols="col">
                                <h2 class="text-h6 mb-2 text-primary">{{item.table.table}}</h2>
                                <h2 class="text-h6"><UserIcon size="15" class="me-1"/>{{item.staff.first_name}} {{item.staff.last_name}}</h2>
                                <div class="d-flex flex-wrap gap-2 mt-3">
                                    <v-btn @click="acceptReq(item)" color="primary" size="small" variant="flat"><CheckIcon size="16" class="me-1"/>Accept</v-btn>
                                    <v-btn color="error" @click="rejectReq(item)" size="small" variant="flat"><XIcon size="16" class="me-1"/>Reject</v-btn>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>
        <!-- <v-row>
        </v-row> -->
    </div>
    
</template>