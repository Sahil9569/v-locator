<script setup lang="ts">
import axios from 'axios';
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL

import { ref, computed, onMounted  } from 'vue';
const new_loader = ref(false);
const desserts = ref([]);
const Claim_list = ref([]);


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
    new_loader.value = true;
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post('api/table/fetch_all_restables/',{'token':token});
        console.log('staff list ka data  ---', response.data); 
        if (response.data) {
            new_loader.value = false;
            // const updatedData = response.data.Table_data.map((item: any) => {
            //     const matchingOrderData = response.data.order_data.find((or_data: any) => or_data.table && or_data.table.id === item.id);

            //     console.log('ooo this is the data ',matchingOrderData)
            //     const table_name = matchingOrderData ? matchingOrderData.table.table : 'No Order';
            //     const order_no = matchingOrderData ? matchingOrderData.id : 'No Order';
            //     const paystatus = matchingOrderData ? matchingOrderData.pay_status : 'No Data';
            //     const paymode = matchingOrderData ? matchingOrderData.pay_mode : 'No Data';
            //     const Assign_staff = matchingOrderData ? `${matchingOrderData.staff?.first_name} ${matchingOrderData.staff?.last_name}`: 'No Data';
            //     const orderkastatus = matchingOrderData ? matchingOrderData.status : 'No Data';
            //     const totalitems = matchingOrderData ? matchingOrderData.items.length : 'No Data';

            //     return {
            //         id: item.id,
            //         table_no: item.table,
            //         status: item.status,
            //         request:'No',
            //         table_name:table_name,
            //         order_no: order_no,
            //         paystatus : paystatus,
            //         paymode:paymode,
            //         Assign_staff:Assign_staff,
            //         orderkastatus:orderkastatus,
            //         totalitems:totalitems,

            //     };
            //     });
            desserts.value = response.data.Table_data

            const updatedDataagain = response.data.claim_data.map((item: any) => {
                const matchingOrderData = response.data.order_data.find((or_data: any) => or_data.table && or_data.table.id === item.id);

                console.log('ooo this is the data ',matchingOrderData)
                const table_name = matchingOrderData ? matchingOrderData.table.table : 'No Order';
                console.log('yaha se check krna h ',table_name)
                const order_no = matchingOrderData ? matchingOrderData.id : 'No Order';
                const paystatus = matchingOrderData ? matchingOrderData.pay_status : 'No Data';
                const paymode = matchingOrderData ? matchingOrderData.pay_mode : 'No Data';
                const Assign_staff = matchingOrderData ? `${matchingOrderData.staff?.first_name} ${matchingOrderData.staff?.last_name}`: 'No Data';
                const orderkastatus = matchingOrderData ? matchingOrderData.status : 'No Data';
                const totalitems = matchingOrderData ? matchingOrderData.items.length : 'No Data';

                return {
                    id: item.id,
                    table_no: item.table,
                    status: item.status,
                    request:'No',
                    table_name:table_name,
                    order_no: order_no,
                    paystatus : paystatus,
                    paymode:paymode,
                    Assign_staff:Assign_staff,
                    orderkastatus:orderkastatus,
                    totalitems:totalitems,

                };
                });
                Claim_list.value = updatedDataagain
                console.log("THIS IS SERIOUS",claimList)
        }else{
            new_loader.value = false;
            console.log("First Error")
        }
    } catch (error) {
        new_loader.value = false;
        console.error('API error:', error);
    }
}
// const fetchtableorderList = async () => {
//     try {
//         const token = localStorage.getItem('authToken');
//         const response = await axios.post('api/table/fetch_all_restablesorders/',{'token':token});
//         console.log('all orders list ka data  ---', response.data); 
//         if (response.data) {
//             // const updatedData = response.data.map((item: any) => {
//                 // return {
//                 //     id: item.id,
//                 //     table_no: item.table,
//                 //     status: item.status,
//                 //     request:'No'
//                 // };
//             // });
//             // desserts.value = updatedData
//         }else{
//             console.log("First Error")
//         }
//     } catch (error) {
//         console.error('API error:', error);
//     }
// }
// const reqToAssign = async (item:any) => {
//     try {
//         const token = localStorage.getItem('authToken');
//         const formdata = {
//             token: token,
//             table:item.id,
//         }
//         alert(item.id);
//         const response = await axios.post('api/kitchen/request_assign/',formdata);
//         item.request = "Yes"
//     } catch (error) {
//         console.error('API error:', error);
//     }
// }
</script>

<template>
    <v-card class="bg-lightprimary elevation-0 rounded-md mb-8">
        <div class="px-8 py-8 py-sm-0">
            <div class="d-flex justify-space-between">
                <div class="d-flex py-0 align-center">
                    <div>
                        <h3 class="text-h3 mb-2 textPrimary">All Table Availability</h3>
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
    <div class="p-relative">
        <div class="logoLoader tableLoader" v-if="new_loader == true">
            <div class="LogoVInnerImg">
                <img src="@/assets/images/locator/v-icon.png" alt="logo-loader"/>
                <p class="">Please Wait...</p>
            </div>
        </div>
        <v-row>
            <v-col cols="12" class="text-h4 text-primary d-block">Vacant</v-col>
            <v-col cols="6" md="4" sm="6" v-for="item in itemList" :key="item.id ">
                <div class="">
                    <div class="bg-lightprimary elevation-0 rounded-md pa-5">
                        <div class="d-flex align-center justify-space-between">
                            <div>
                                <div class="text-h5 mb-2">Table Name : {{ item.table }}</div>
                                
                                <p class="d-flex text-subtitle-1 mb-1 textlight">
                                <span class="me-1 text-no-wrap">Status :</span> <span class="text-primary font-weight-medium">{{ item.status }}</span>
                                </p>
                            </div>
                            <div class="bg-lightprimary rounded-pill pa-3">
                                <img src="@/assets/images/backgrounds/Table-design.png" width="70" class="d-block" style="margin:auto;">
                            </div>
                        </div> 
                    </div>
                </div>
            </v-col>
        </v-row>
        <v-row class="mt-10">
            <v-col cols="12" class="text-h4 text-warning">Booked</v-col>
            <v-col cols="6" md="4" sm="6" v-for="item in claimList" :key="item.id ">
                <div class="">
                    <div class="bg-lightprimary elevation-0 rounded-md pa-5">
                        <div class="d-flex align-center justify-space-between">
                            <div>
                                <div class="text-h5 mb-2">Table Name : {{ item.table_name }}</div>
                                <p class="text-subtitle-1 mb-1 textlight" v-if="item.order_no !== 'No Data'">Order No : {{ item.order_no }}</p>
                                <p class="text-subtitle-1 mb-1 textlight" v-if="item.totalitems !== 'No Data'">Total items : {{ item.totalitems }}</p>
                                <p class="text-subtitle-1 mb-1 textlight" v-if="item.paystatus !== 'No Data'">Payment Status : {{ item.paystatus }}</p>
                                <p class="text-subtitle-1 mb-1 textlight" v-if="item.paymode !== 'No Data'">Payment Mode : {{ item.paymode }}</p>
                                <p class="text-subtitle-1 mb-1 textlight" v-if="item.Assign_staff !== 'No Data'">Assigned Staff : {{ item.Assign_staff }}</p>
                                <p class="text-subtitle-1 mb-1 textlight" v-if="item.orderkastatus !== 'No Data'">Order Status : {{ item.orderkastatus }}</p>
                                <p class="d-flex text-subtitle-1 mb-1 textlight">
                                <span class="me-1 text-no-wrap">Status :</span> <span class="text-warning font-weight-medium" v-if="item.status !== 'No Data'">{{ item.status }}</span>
                                </p>
                            </div>
                            <div class="bg-lightprimary rounded-pill pa-3">
                                <img src="@/assets/images/backgrounds/Table-design-gray.png" width="70" class="d-block" style="margin:auto;">
                            </div>
                        </div>

                    </div>
                </div>
            </v-col>
        </v-row>
    </div>


    <!-- <v-row>
        <v-col cols="6" md="4" sm="6"  v-for="item in itemList" :key="item.id ">
            <template v-if="item.status === 'Vacant'">
                <div class="bg-lightprimary rounded-md pa-5">
                    <div class="d-flex align-center justify-space-between">
                        <div>
                            <div class="text-h5 mb-2">Table Name : {{ item.table_name }}</div>
                            <p class="text-subtitle-1 mb-1 textlight" v-if="item.order_no !== 'No Data'">Order No : {{ item.order_no }}</p>
                            <p class="text-subtitle-1 mb-1 textlight" v-if="item.totalitems !== 'No Data'">Total items : {{ item.totalitems }}</p>
                            <p class="text-subtitle-1 mb-1 textlight" v-if="item.paystatus !== 'No Data'">Pay Status : {{ item.paystatus }}</p>
                            <p class="text-subtitle-1 mb-1 textlight" v-if="item.paymode !== 'No Data'">Pay Mode : {{ item.paymode }}</p>
                            <p class="text-subtitle-1 mb-1 textlight" v-if="item.Assign_staff !== 'No Data'">Assigned Staff : {{ item.Assign_staff }}</p>
                            <p class="text-subtitle-1 mb-1 textlight" v-if="item.orderkastatus !== 'No Data'">Order Status : {{ item.orderkastatus }}</p>
                            <p class="d-flex text-subtitle-1 mb-1 textlight">
                            <span class="me-1 text-no-wrap">Status :</span> <span class="text-primary font-weight-medium">{{ item.status }}</span>
                            </p>
                        </div>
                        <div class="bg-lightprimary rounded-pill pa-3">
                            <img src="@/assets/images/backgrounds/Table-design.png" width="70" class="d-block" style="margin:auto;">
                        </div>
                    </div>
                </div>
            </template>
            <template v-else="item.status === 'Booked'">
                <div class="bg-lightwarning rounded-md pa-5">
                    <div class="d-flex align-center justify-space-between">
                        <div>
                            <div class="text-h5 mb-2">Table Name : {{ item.table_name }}</div>
                            <p class="text-subtitle-1 mb-1 textlight" v-if="item.order_no !== 'No Data'">Order No : {{ item.order_no }}</p>
                            <p class="text-subtitle-1 mb-1 textlight" v-if="item.totalitems !== 'No Data'">Total items : {{ item.totalitems }}</p>
                            <p class="text-subtitle-1 mb-1 textlight" v-if="item.paystatus !== 'No Data'">Pay Status : {{ item.paystatus }}</p>
                            <p class="text-subtitle-1 mb-1 textlight" v-if="item.paymode !== 'No Data'">Pay Mode : {{ item.paymode }}</p>
                            <p class="text-subtitle-1 mb-1 textlight" v-if="item.Assign_staff !== 'No Data'">Assigned Staff : {{ item.Assign_staff }}</p>
                            <p class="text-subtitle-1 mb-1 textlight" v-if="item.orderkastatus !== 'No Data'">Order Status : {{ item.orderkastatus }}</p>
                            <p class="d-flex text-subtitle-1 mb-1 textlight">
                            <span class="me-1 text-no-wrap">Status :</span> <span class="text-warning font-weight-medium" v-if="item.status !== 'No Data'">{{ item.status }}</span>
                            </p>
                        </div>
                        <div class="bg-lightprimary rounded-pill pa-3">
                            <img src="@/assets/images/backgrounds/Table-design-gray.png" width="70" class="d-block" style="margin:auto;">
                        </div>
                    </div>
                </div>
            </template>
        </v-col>
    </v-row> -->
    <!-- <v-row class="mt-10">
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
    </v-row> -->
</template>
