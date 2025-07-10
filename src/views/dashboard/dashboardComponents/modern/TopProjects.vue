<script setup lang="ts">
const page = ref({ title: 'Fixed Header Table' });
import axios from 'axios';
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL 
const tableFixedHeaderData = ref();
const tableFixedHeaderDataone = ref();
// const showLoader =ref(false);
const new_loader = ref(false);
import { ref, computed, onMounted } from 'vue';
// import img2 from '@/assets/images/profile/user-2.jpg';
// const tableFixedHeaderData = [
   
// ];
// const tableFixedHeaderDataone = [
//     {
        
//         name: 'Barbdfdsffsdfara',
//         handle: '@steele',
//         status: 'Table-V1',
//         statusoffline:true,
//         statuscolor: '',
//         email: '987654321',
//         time : '12:37:00',
//         teams: [
//             {
//                 status: '99',
//                 statuscolor: 'lightsecondary'
//             }
//         ]
//     },
// ];
const user_token = localStorage.getItem('res_token')
onMounted(() => {
    fetchOrderList();
    fetchOrderListtwo();
});

const fetchOrderList = async () => {
    console.log("Order LIST API CALL")
    new_loader.value = true;
    try {
        const token = localStorage.getItem('authToken');
        const formData = {
            'token' : token,
            'status': 'Pending'
        }
        const response = await axios.post('api/orders/all_order/',formData);
        console.log('pending order coming response:', response.data);
        // showLoader.value = true;
        if (response.data) {
            new_loader.value = false;
            const updatedData = response.data.data.map((order:any) => {
                // if (updatedData.length <= 1){
                //     showLoader.value = false;
                // }
                return {
                    name: `${order.c_details?.user?.first_name || 'N/A'} ${order.c_details?.user?.last_name || 'N/A'}`,
                    Table_no: order.table?.table || 'N/A', 
                    phone: order.user?.username  || 'N/A', 
                    time: order.created_at, 
                    orderstatus:order.status,
                    teams: [
                        {
                            status: order.id, // Assuming 'status' property exists in API response
                            statuscolor: 'lightsecondary'
                        }
                    ]
                };
            });
            tableFixedHeaderData.value = updatedData;
        } else {
            new_loader.value = false;
            // showLoader.value = false;
            console.log("No orders found");
        }
    } catch (error) {
        new_loader.value = false;
        // showLoader.value = false;
        console.error('API error:', error);
    }
}


const fetchOrderListtwo = async () => {
    console.log("Order LIST API CALL")
    new_loader.value = true;
    try {
        const token = localStorage.getItem('authToken');
        const formData = {
            'token' : token,
            'status': 'Dashboard'
        }
        const response = await axios.post('api/orders/all_order/',formData);
        // console.log('pending order coming response:', response.data);
        if (response.data.data) {
            new_loader.value = false;
            const updatedData = response.data.data.map((order:any) => {
                return {
                    name: `${order.c_details?.user?.first_name || 'N/A'} ${order.c_details?.user?.last_name || 'N/A'}`,
                    Table_no: order.table?.table || 'N/A',
                    phone: order.user?.username || 'N/A',
                    time: order.created_at, 
                    orderstatus:order.status,
                    teams: [
                        {
                            status: order.id, // Assuming 'status' property exists in API response
                            statuscolor: 'lightsecondary'
                        }
                    ]
                };
            });
            tableFixedHeaderDataone.value = updatedData;
        } else {
            new_loader.value = false;
            console.log("No orders found");
        }
    } catch (error) {
        new_loader.value = false;
        console.error('API error:', error);
    }
}
</script>

<template>
   
    <v-row>
        <v-col cols="12" lg="6" class="">
            <v-card class="p-0" elevation="10">
                <div class="tableCstmhead">
                    <v-row>
                        <v-col cols="col">
                            <div>
                                <v-card-title class="text-h5 pb-0 pt-0">Pending Order</v-card-title>
                                <v-card-subtitle class="text-subtitle-1 textSecondary pb-1">Orders List</v-card-subtitle>
                            </div>
                        </v-col>
                        <v-col cols="col-auto pr-7">
                            <div class="d-flex gap-3 justify-end align-center flex-column flex-wrap flex-xl-nowrap flex-sm-row fill-height"> 
                                <router-link :to="'/pending-order/' + user_token">
                                    <v-btn color="primary" variant="outlined">View All</v-btn>
                                </router-link>
                            </div>
                        </v-col>
                    </v-row>
                </div>
                <div class="p-relative">
                    <div class="logoLoader tableLoader" v-if="new_loader == true">
                        <div class="LogoVInnerImg">
                            <img src="@/assets/images/locator/v-icon.png" alt="logo-loader"/>
                            <p class="">Please Wait...</p>
                        </div>
                    </div>	
                    <v-table class="month-table tableCustomDesign p-0 mt-3" fixed-header height="400px">
                        <thead>
                            <tr>
                                <th class="text-h6">Details</th>
                                <th class="text-h6">Table No.</th>
                                <!-- <th class="text-h6">Phone No.</th> -->
                                <th class="text-h6">Order No.</th>
                                <th class="text-h6">Status.</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- <v-btn size="large"  class="mt-8" color="primary" block type="submit" flat>
                                <template v-if="showLoader===true">
                                    <div class='loaderBn'></div>
                                </template>
                                <template v-else>
                                    Next
                                </template>
                            </v-btn> -->
                            <!-- <div>
                                <div size="large" class="mt-8" color="primary" block type="submit" flat>
                                    No Data Found !!!
                                </div>
                                <div v-if="showLoader" class='loaderBn'></div>
                            </div> -->

                            <tr v-for="item in tableFixedHeaderData" :key="item.name" class="month-item">
                                <td>
                                    <span class="nameTble"><strong>{{ item.name }}</strong></span>
                                    <span class="phnTble">{{ item.phone }}</span>
                                    <span class="timeTble">{{ item.time }}</span>
                                            <!-- <div class="text-subtitle-1 text-medium-emphasis">{{ item.handle }}</div> -->
                                </td>
                                <td>
                                    <div class="text-subtitle-1 text-medium-emphasis">{{ item.Table_no }}</div>
                                </td>
                                <td>
                                    <div class="d-flex align-center">
                                        <div class="d-flex">
                                            <v-chip
                                                v-for="team in item.teams"
                                                :key="team.status"
                                                rounded="lg"
                                                :class="'font-weight-bold px-2 mr-2 bg-' + team.statuscolor"
                                                size="small"
                                            >
                                                {{ team.status }}
                                            </v-chip>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="nameTble"><strong>{{ item.orderstatus }}</strong></span>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </div>
            </v-card>
        </v-col>
        <v-col cols="12" lg="6" class="">
            <v-card class="p-0" elevation="10">
                <div class="tableCstmhead">
                    <v-row>
                        <v-col cols="col">
                            <div>
                                <v-card-title class="text-h5 pb-0 pt-0">All Order</v-card-title>
                                <v-card-subtitle class="text-subtitle-1 textSecondary pb-1">All Orders List</v-card-subtitle>
                            </div>
                        </v-col>
                        <v-col cols="col-auto pr-7">
                            <div class="d-flex gap-3 justify-end align-center flex-column flex-wrap flex-xl-nowrap flex-sm-row fill-height"> 
                                <router-link :to="'/order-list/' + user_token">
                                    <v-btn color="primary" variant="outlined">View All</v-btn>
                                </router-link>
                            </div>
                        </v-col>
                    </v-row>
                </div>
                <div class="p-relative">
                    <div class="logoLoader tableLoader" v-if="new_loader == true">
                        <div class="LogoVInnerImg">
                            <img src="@/assets/images/locator/v-icon.png" alt="logo-loader"/>
                            <p class="">Please Wait...</p>
                        </div>
                    </div>	
                    <v-table class="month-table tableCustomDesign p-0 mt-3" fixed-header height="400px">
                        <thead>
                            <tr>
                                <th class="text-h6">Details</th>
                                <th class="text-h6">Table No.</th>
                                <!-- <th class="text-h6">Phone No.</th> -->
                                <th class="text-h6">Order No.</th>
                                <th class="text-h6">Status.</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in tableFixedHeaderDataone" :key="item.name" class="month-item">
                                <td>
                                    <span class="nameTble"><strong>{{ item.name }}</strong></span>
                                    <span class="phnTble">{{ item.phone }}</span>
                                    <span class="timeTble">{{ item.time }}</span>
                                            <!-- <div class="text-subtitle-1 text-medium-emphasis">{{ item.handle }}</div> -->
                                </td>
                                <td>
                                    <div class="text-subtitle-1 text-medium-emphasis">{{ item.Table_no }}</div>
                                </td>
                                
                                <td>
                                    <div class="d-flex align-center">
                                        <div class="d-flex">
                                            <v-chip
                                                v-for="team in item.teams"
                                                :key="team.status"
                                                rounded="lg"
                                                :class="'font-weight-bold px-2 mr-2 bg-' + team.statuscolor"
                                                size="small" >{{ team.status }} </v-chip>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="nameTble"><strong>{{ item.orderstatus }}</strong></span>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </div>
            </v-card>
        </v-col>


       

    </v-row>
</template>
