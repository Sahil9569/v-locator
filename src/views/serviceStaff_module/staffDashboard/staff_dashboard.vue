<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
// import { ref } from "vue";
// const rating2 = ref(2.5);
import {staffCurrentOrders, } from '@/_mockApis/components/services_staffDashboard/basicTables';
import customerReport from './customerReport.vue';
const dialog = ref(false);

import axios from 'axios'; 
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL
const total_order = ref(0);
const search = ref('');
const status = ref(['Delivered']);
const desserts = ref([]);
const selectedStatus= ref();

const orderCurrentData = computed(() => {
    return desserts.value.filter((user: any) => {
        return user.Customer_name.toLowerCase().includes(search.value.toLowerCase());
    });
});

onMounted(() => {
    fetchorderList(); 
    fetchordercount();
    // orderStatusChange();
});

const fetchorderList = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post('api/kitchen/services_staff_details/', {'token': token});
        const current_order = response.data;
        console.log('data ----------------------- ', current_order)
        if (response.data) {
            const orderItems = response.data.map((item:any) => {
                const datetimeString = item.updated_at;
                const order_Date = datetimeString ? new Date(datetimeString).toISOString().split("T")[0] : "N/A";

                return {
                    order_status: item.status,
                    Customer_name: `${item.c_details.user.first_name} ${item.c_details.user.last_name}`,
                    order_number: item.id,
                    // order_status : item.status,
                    table_number: item.table.table,
                    order_Date: order_Date,
                };
            });
            desserts.value = orderItems
        } else {
            console.log("First Error");
        }
    } catch (error) {
        console.error('API error:', error);
    }
}


const orderStatusChange = async (selectedStatus:any,orderNumber:any) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post('api/kitchen/order_Status_Change/', {
            'token': token,
            'order_status':selectedStatus,
            'order_id':orderNumber
        });
        if (response.data.status == "data_changed"){
            fetchorderList(); 
        } else {
            console.log("First Error");
        }
    } catch (error) {
        console.error('API error:', error);
    }
}




const fetchordercount = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post('api/kitchen/fetch_order_count/', {'token': token});
        total_order.value = response.data; 
    } catch (error) {
        console.error('API error:', error);
    }
}

</script>

<template>

<v-card class="bg-lightprimary elevation-0 rounded-md mb-8">
        <div class="px-4 py-4 py-sm-0">
            <div class="d-flex justify-space-between">
                <div class="d-flex py-0 align-center">
                    <div>
                        <h3 class="text-h4 mb-2 textPrimary">Services Staff</h3>
                    </div>
                </div>
                <div class="d-none py-0 d-sm-block overflow-hidden">
                    <div class="mb-n16 mt-3">
                        <img src="@/assets/images/backgrounds/services-staff.png" alt="breadcrumb" width="190" />
                    </div>
                </div>
            </div>
        </div>
    </v-card>

<v-row>
    <v-col cols="12" md="4" sm="6">
        <div class="text-decoration-none d-flex align-center justify-center text-center rounded-md pa-6 bg-lightprimary">
            <div class="bg-lightprimary">
                <img src="@/assets/images/svgs/icon-mailbox.svg" alt="icon"/>
                <div class="text-subtitle-1 text-capitalize font-weight-bold mt-3 text-primary">Total Order</div>
                <h4 class="text-h4 mt-1 text-primary">{{ total_order }}</h4>
            </div>
        </div>
    </v-col>
    <v-col cols="12" md="4" sm="6">
        <div class="text-decoration-none d-flex align-center justify-center text-center rounded-md pa-6 bg-lightwarning">
            <div class="bg-lightwarning">
                <img src="@/assets/images/svgs/icon-mailbox.svg" alt="icon"/>
                <div class="text-subtitle-1 text-capitalize font-weight-bold mt-3 text-warning">Total Earning</div>
                <h4 class="text-h4 mt-1 text-warning">0</h4>
            </div>
        </div>
    </v-col>
    <v-col cols="12" md="4" sm="6">
        <div class="text-decoration-none d-flex position-relative align-center justify-center text-center rounded-md pa-6 bg-lightsuccess">
            <div class="bg-lightsuccess">
                <img src="@/assets/images/svgs/icon-speech-bubble.svg" alt="icon"/>
                <div class="text-subtitle-1 text-capitalize font-weight-bold mt-3 text-success">Total Tips</div>
                <h4 class="text-h4 mt-1 text-success">$0</h4>
            </div>
            <!-- <div class="tableTips">
                <v-btn color="success" class="mt-2 elevation-0" size="small">
                    View All Tip
                    <v-dialog v-model="dialog" activator="parent"  class="dialog-mw" max-width="400">
                        <v-card>
                            <h4 class="border-bottom pa-3">All Table Tip</h4>
                            <v-card-text>
                                <div class="border-bottom py-2">
                                    <v-row>
                                        <v-col cols="6">
                                            <h5 class="text-h6">Table No: 1</h5>
                                        </v-col>
                                        <v-col cols="6" class="text-end">
                                            <p class="text-h6">$16</p>
                                        </v-col>
                                    </v-row>
                                </div>
                                <div class="border-bottom py-2">
                                    <v-row>
                                        <v-col cols="6">
                                            <h5 class="text-h6">Table No: 2</h5>
                                        </v-col>
                                        <v-col cols="6" class="text-end">
                                            <p class="text-h6">$11</p>
                                        </v-col>
                                    </v-row>
                                </div>
                                <div class="border-bottom py-2">
                                    <v-row>
                                        <v-col cols="6">
                                            <h5 class="text-h6">Table No: 6</h5>
                                        </v-col>
                                        <v-col cols="6" class="text-end">
                                            <p class="text-h6">$15</p>
                                        </v-col>
                                    </v-row>
                                </div>
                                <div class="border-bottom py-2">
                                    <v-row>
                                        <v-col cols="6">
                                            <h5 class="text-h6">Table No: 8</h5>
                                        </v-col>
                                        <v-col cols="6" class="text-end">
                                            <p class="text-h6">$9</p>
                                        </v-col>
                                    </v-row>
                                </div>
                                <div class="border-bottom py-2">
                                    <v-row>
                                        <v-col cols="6">
                                            <h5 class="text-h6">Table No: 10</h5>
                                        </v-col>
                                        <v-col cols="6" class="text-end">
                                            <p class="text-h6">$10</p>
                                        </v-col>
                                    </v-row>
                                </div>
                            </v-card-text>
                            <v-card-actions class="justify-end">
                                <v-btn color="error" @click="dialog = false"
                                >Cancel</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
            </v-btn>
            </div> -->
        </div>
    </v-col>
</v-row>

<v-card variant="outline" class="bg- mt-8">
    <v-card-text>
        <v-row class="justify-center align-center mb-3">
            <v-col cols="6">
                <div class="">
                    <span class="text-light text-h5">Current Order</span>    
                </div>
            </v-col>
            <v-col cols="6" class="text-right">
                <!-- <RouterLink to="/orders" class="bg-primary text-white text-decoration-none text-body-1 opacity-1 font-weight-medium pa-2 rounded">View Order</RouterLink> -->

                <!-- <v-btn color="bg-lightprimary" class="mt-2 text-primary  elevation-0" size="small">View Order</v-btn> -->
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="4" class=" pa-2 mb-2 rounded-md" v-for="orderItems in orderCurrentData" :key="orderItems.id">

            <v-row >
                <v-col cols="12">
                    <v-card class="bg-lightprimary custom-shadow" rounded="md">
                        <v-card-item>

                            <h2 class="mb-3">
                                <p>
                                    <span class="">Table No : <span class="font-weight-semibold">{{ orderItems.table_number }}</span></span> 
                                </p>
                            </h2>

                            <p>
                                <span class="">Customer Name : <span class="font-weight-semibold">{{ orderItems.Customer_name}}</span></span>
                            </p>
                            <p>
                                <span class="">Order No : <span class="font-weight-semibold">{{orderItems.order_number}}</span></span>
                            </p>
                            <p>
                                <span class="">Order Status : <span class="font-weight-semibold">{{orderItems.order_status}}</span></span>  
                            </p>
                        <p class="mb-4">
                            <span class="">Date : <span class="font-weight-semibold">{{ orderItems.order_Date }}</span></span> 
                        </p>
                        <div class="bg-lightprimary rounded py-2 text-center">
                            <v-select
                            :items="status"
                            label="Status"
                            hide-details
                            class="selectMaxWdth"
                            density="compact"
                            v-model="selectedStatus"
                            :disabled="orderItems.order_status !== 'Out for delivery'"
                            ></v-select>
                        </div>
                        <div class="d-flex justify-end">
                            <v-btn color="white" variant="flat" size="large" class="text-primary bg-primary w-100" @click="() => orderStatusChange(selectedStatus,orderItems.order_number)" :disabled="orderItems.order_status !== 'Out for delivery'">Submit</v-btn>
                        </div>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>

            <!-- <v-row no-gutters class="align-center" >
                <v-col cols="12" lg="2" md="6" class="pa-2">
                    <div class="bg-lightsecondary rounded pa-2 text-center">
                        <span class="">Customer Name : <span class="d-block font-weight-semibold">{{ orderItems.Customer_name}}</span></span>    
                    </div>
                </v-col>
                <v-col cols="12" lg="2" md="6" class="pa-2">
                    <div class="bg-lightsecondary rounded pa-2 text-center">
                        <span class="">Order No : <span class="d-block font-weight-semibold">{{orderItems.order_number}}</span></span>    
                    </div>
                </v-col>
                <v-col cols="12" lg="2" md="6" class="pa-2">
                    <div class="bg-lightsecondary rounded pa-2 text-center">
                        <span class="">Order Status : <span class="d-block font-weight-semibold">{{orderItems.order_status}}</span></span>    
                    </div>
                </v-col>
                <v-col cols="12" lg="2" md="6" class="pa-2">
                    <div class="bg-lightsecondary rounded pa-2 text-center">
                        <span class="">Table No : <span class="d-block font-weight-semibold">{{ orderItems.table_number }}</span></span>    
                    </div>
                </v-col>
                <v-col cols="12" lg="2" md="6" class="pa-2">
                    <div class="bg-lightsecondary rounded pa-2 text-center">
                        <span class="">Date : <span class="d-block font-weight-semibold">{{ orderItems.order_Date }}</span></span>    
                    </div>
                </v-col>
                <v-col cols="12" lg="2" md="6" class="pa-2">
                    <div class="bg-lightprimary rounded px-2 py-2 text-center">
                        <v-select
                        :items="status"
                        label="Status"
                        hide-details
                        class="selectMaxWdth"
                        density="compact"
                        v-model="selectedStatus"
                        :disabled="orderItems.order_status !== 'Out for delivery'"
                        ></v-select>
                        </div>
                </v-col>
                
                <v-col cols="12" lg="2" md="6" class="pa-2" >
                    <v-btn color="white" variant="flat" size="large" class="text-primary w-100" @click="() => orderStatusChange(selectedStatus,orderItems.order_number)" :disabled="orderItems.order_status !== 'Out for delivery'">Submit</v-btn>
                </v-col>
            </v-row> -->
        </v-col>
        </v-row>
        
    </v-card-text>
</v-card>


<!-- <v-row>
    <v-col cols="12" md="6">
        <customerReport/>
    </v-col>
</v-row> -->
    




</template>