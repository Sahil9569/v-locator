<script setup lang="ts">
import axios from 'axios';
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL

import { ref, computed, onMounted  } from 'vue';

// const table_no = '';
const desserts = ref([
    // {
    //     tabel_no:"Chacha Choudry",
    //     contact: 'ghanta Ghar',
    //     totalOrder: '5 Lakh Se upr',
    //     status: 'era',
    // }
]);
const Claim_list = ref([
    // {
    //     name:"Chacha Choudry",
    //     contact: 'ghanta Ghar',
    //     totalOrder: '5 Lakh Se upr',
    //     status: 'era',
    // }
]);

const itemList = computed(() => {
    return desserts.value;
});
const claimList = computed(() => {
    return Claim_list.value;
});

onMounted(() =>{
    fetchtableList();
});


const fetchtableList = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post('api/kitchen/fetch_all_tables/',{'token':token});
        console.log('staff list ka data  ---', response.data.claimed_tables);
        console.log('staff list ka data part 2 ---', response.data.to_be_claimed);
        const claim = response.data.claimed_tables;
        const claim1 = response.data.to_be_claimed;
        if (response.data) {
            const updatedData = claim.map((item: any) => {
                return {
                    id: item.id,
                    table_no: item.table,
                    status: item.status,
                    request:'No'
                };
            });
            desserts.value = updatedData
            const updatedData1 = claim1.map((item: any) => {
                return {
                    table_no1: item.table,
                    status: item.status,
                };
            });
            Claim_list.value = updatedData1
        }else{
            console.log("First Error")
        }
    } catch (error) {
        console.error('API error:', error);
    }
}
const reqToAssign = async (item:any) => {
    try {
        const token = localStorage.getItem('authToken');
        const formdata = {
            token: token,
            table:item.id,
        }
        const response = await axios.post('api/kitchen/request_assign/',formdata);
        item.request = "Yes"
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
                        <h3 class="text-h3 mb-2 textPrimary">Table</h3>
                    </div>
                </div>
                <div class="d-none py-0 d-sm-block overflow-hidden">
                    <div class="mb-n16 mt-3">
                        <img src="@/assets/images/backgrounds/table-banner.png" alt="breadcrumb" width="190" />
                    </div>
                </div>
            </div>
        </div>
    </v-card>


    <v-row>
        <v-col cols="12" class="text-h4 text-primary d-block">Claimed</v-col>
        <v-col cols="6" lg="2" md="3" sm="4"  v-for="item in itemList" :key="item.name">
            <div class="">
                <div class="bg-lightprimary elevation-0 rounded-md pa-5 text-center">
                    <v-chip size="small" color="" class="bg-primary text-white mb-3">{{ item.status }}</v-chip>
                    <img src="@/assets/images/backgrounds/Table-design.png" width="70" class="d-block" style="margin:auto;">
                    <p class="mt-6 mb-1 v-card-subtitle text-subtitle-1 textSecondary">{{ item.table_no }} </p>
                    <v-btn v-if="item.request === 'No'" @click="reqToAssign(item)" size="small" variant="flat" color="primary" class="mt-2 m-100">
                        Request To Assign
                    </v-btn>
                    <v-btn v-else size="small" variant="flat" color="primary" disabled class="mt-2 m-100">
                        Requested
                    </v-btn>
                </div>
            </div>
        </v-col>
    </v-row>
    <v-row class="mt-10">
        <v-col cols="12" class="text-h4 text-warning">To be Claimed</v-col>
        <v-col cols="6" lg="2" md="3" sm="4" v-for="item in claimList" :key="item.name">
            <div class="">
                <div class="bg-lightprimary elevation-0 rounded-md pa-5 text-center">
                    <img src="@/assets/images/backgrounds/Table-design-gray.png" width="70" class="d-block" style="margin:auto;">
                    <p class="mt-6 mb-1 v-card-subtitle text-subtitle-1 textSecondary">{{ item.table_no1 }} </p>
                    <v-btn size="small" color="warning" class="mt-2 m-100">
                        {{ item.status }}
                    </v-btn>
                </div>
            </div>
        </v-col>
    </v-row>
</template>