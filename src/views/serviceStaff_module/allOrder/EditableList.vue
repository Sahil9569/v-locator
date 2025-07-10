<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useContactStore } from '@/stores/apps/contact';
// import services_staff from '@/_mockApis/apps/services_staff';
const store = useContactStore();
import axios from 'axios';
import BASE_URL from '@/stores/myVar';
import test from 'node:test';
axios.defaults.baseURL = BASE_URL

onMounted(() => {
    store.fetchContacts();
    fetchOrderList();
});
const getContacts: any = computed(() => {
    return store.contacts;
});

const itemsPerPage = 10;
const currentPage = ref(1);
const splitVmodel = ref('')
const qrCodeData = ref<string | undefined>(undefined);
const valid = ref(true);
const dialog = ref(false);
const data = ref(false);
const search = ref('');
const status = ref(['Completed']);
const statusModal = ref('')
const dialogtip = ref(false)
const dialogtippayment = ref(false)
const selectedStatus = ref('Delivered');
const editedIndex = ref(-1);
const shoSuccessMsg = ref(false)
const radioOnline = ref('cashPayment')
const order_total = ref(0)
const isTextFieldDisabled = computed(() => {
    if (radioOnline.value === 'cashPayment') {
    return true; // Disable the text field if radioOnline is 'cashPayment'
    } else if (radioOnline.value === 'splitCash') {
        order_total.value = 0;
    return false; // Enable the text field if radioOnline is 'splitCash'
    } else {
    return true; // You can set a default condition here if needed
    }
});
// const order_total = ref(order_total)

const editedItem = ref({
    invoiceNO: '',
    customer: '',
    amount:'',
    customerType: '',
    table: '',
    orderDate: '',
    order_total:'',
    order_amount:'',
    orderNo:'',
    SNo: ''
});
const defaultItem = ref({
    invoiceNO: '',
    customer: '',
    customerType: '',
    table: '',
    orderDate: '',
    order_total:'',
    order_amount:'',
    SNo: '',
    amount:'',
    orderNo:'',
    rolestatus:''
});


const desserts = ref([]);

//Methods
const filteredList = computed(() => {
    return desserts.value.filter((user: any) => {
        return user.customer.toLowerCase().includes(search.value.toLowerCase());
    });
});


const paginatedList = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredList.value.slice(start, end);
});

const handleStatusChange = async (newStatus:number) => {
    // Do something with the newStatus value
    console.log('Selected Status:', newStatus);
    try {
        console.log("INSIDE TRY",valid.value)
        const token = localStorage.getItem('authToken');
        const formData = {
            'token' : token,
            'order_status': 'Completed',
            'order_id':newStatus,
        }
        const response = await axios.post('api/kitchen/order_Status_Change/',formData);
        console.log('Order API response:', response.data);
        if (response.data) {
            fetchOrderList();
        }else{
            console.log("First Error")
        }
    } catch (error) {
        console.error('API error:', error);
    }
};

const fetchOrderList = async () => {
    console.log("Order LIST API CALL")
    try {
        console.log("INSIDE TRY",valid.value)
        const token = localStorage.getItem('authToken');
        const formData = {
            'token' : token,
            'status': 'Delivered'
        }
        const response = await axios.post('api/orders/all_order/',formData);
        console.log('Order API response:', response.data);
        if (response.data) {
            const updatedData = response.data.data.map((item:any, index:any) => {
                const order_no = item.id
                // const order_no = item.items.reduce((total, orderItem) => {
                //     const order_no = orderItem.id; 
                //     return order_no
                // }, 0);
                return {
                    SNo: `#${index + 1}`,
                    invoiceNO: item.id,
                    customer: `${item.c_details?.user?.first_name || 'N/A'} ${item.c_details?.user?.last_name || 'N/A'}`,  // Access the first_name attribute
                    orderNo:order_no,
                    pay_status:item.pay_status,
                    customerType: item.cust_type,
                    table:  `${item.table?.table || 'N/A'}`,
                    status: item.status,
                    order_total:item.order_total,
                    order_amount:item.order_total,
                };
            });
                desserts.value = updatedData;
        }else{
            console.log("First Error")
        }
    } catch (error) {
        console.error('API error:', error);
    }
}


async function update_pay(oid, item) {
    
    console.log("update_pay _______________", oid, radioOnline.value, splitVmodel.value);
    try {
        const response = await axios.post("api/customers/update_orderpay/", {
            "oid": oid,
            "radioOnline": radioOnline.value,
            "splitVmodel": splitVmodel.value
        });
        console.log("update_pay_response__________________________", response);
        const data_common = response.data;
        if (response.data.status === "ATTEMPTED") {
            console.log("ATTEMPTED TO Lashan__________________");
            // shoSuccessMsg.value = true;
            // console.log(shoSuccessMsg.value)
            setTimeout(() => {
                item.dialogtip=false; // Close dialogtip immediately
                item.dialogtippayment = true; // Set dialogtippayment to true after 2 seconds
                const newQRCodeData = data_common.url; // Assuming 'url' contains the new QR code data
                qrCodeData.value = newQRCodeData;
            }, 1000);
            console.log('first step---',data_common)  
        } else if(response.data.status === "PAID"){
            shoSuccessMsg.value = true;
            setTimeout(() => {
                item.dialogtip=false; // Close dialogtip immediately
                fetchOrderList();
            }, 5000);

        }
    } catch (error) {
        // Handle error if the request fails
        console.error("Error updating payment:", error);
    }
}
</script>
<template>
    <v-row>
        <v-col cols="12" lg="4" md="6">
            <v-text-field density="compact" v-model="search" label="Search Your Order" hide-details variant="outlined"></v-text-field>
        </v-col>
    </v-row>
    <v-table class="mt-5">
        <thead>
            <tr>
                <th class="text-subtitle-1 font-weight-semibold">S No</th>
                <th class="text-subtitle-1 font-weight-semibold">Table</th>
                <th class="text-subtitle-1 font-weight-semibold">Order Id</th>
                <th class="text-subtitle-1 font-weight-semibold">Customer Name</th>
                <th class="text-subtitle-1 font-weight-semibold">Pay Status</th>
                <th class="text-subtitle-1 font-weight-semibold">Order amount</th>
                <th class="text-subtitle-1 font-weight-semibold">Status</th>
                <th class="text-subtitle-1 font-weight-semibold">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in paginatedList" :key="index" :currentPage="currentPage" :pageSize="10">

                <td class="text-subtitle-1">{{ item.SNo }}</td>
                <td>
                    <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.table }}</span>
                </td>
                <td class="text-subtitle-1">{{ item.orderNo }}</td>
                <td>
                    <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.customer }}</span>
                </td>
                
                <td>
                    <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.pay_status }}</span>
                </td>
                <td>
                    <span class="text-subtitle-1 d-block mt-1 textSecondary">${{ item.order_amount }}</span>
                </td>
                <td>
                    <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.status }}</span>
                </td>
                <!-- <td style="width:160px; padding:7px 5px;" class="orderStatusInput">
                    <v-select
                        :items="status"
                        label="Delivered"
                        hide-details
                        class="selectMaxWdth"
                        density="compact"
                    ></v-select>
                </td> -->
                <!-- <td>
                    <div class="d-flex gap-1 align-center">
                        <v-btn color="primary" size="small" class="me-2" flat @click="item.dialog = true">View</v-btn>
                        <v-btn color="primary" size="small" flat @click="handleStatusChange(item.orderNo)">Submit</v-btn>
                    </div>
                </td> -->
                <td>
                <div class="d-flex  align-center gap-2">
                        <v-btn color="primary" :disabled="item.pay_status == 'Pending'" size="small" class="me-2px" flat @click="item.dialog = true">Complete</v-btn>
                        
                        <v-btn color="primary" :disabled="item.pay_status == 'Paid'" size="small" class="me-2px" flat @click="item.dialogtip = true">Payment</v-btn>

                        <!-- <v-btn icon flat @click="item.dialogtip = true" ><QrcodeIcon size="20" class="text-primary"/></v-btn> -->
                    </div>
                    <v-dialog v-model="item.dialog" max-width="400">
                        <v-card>
                            <v-card-title class="pa-4">
                                <span class="title">Order Status</span>
                            </v-card-title>

                            <v-card-text>   
                                    <v-select
                                        :items="status"
                                        v-model="statusModal"
                                        label="Delivered"
                                        hide-details
                                        class="selectMaxWdth"
                                        density="compact"
                                    ></v-select>
                            </v-card-text>

                            <v-card-actions class="pa-4">
                                <v-spacer></v-spacer>
                                
                                <v-btn color="error" @click="item.dialog = false">Cancel</v-btn>
                                <v-btn color="primary" :disabled="statusModal == ''" size="small" class="me-2px" variant="flat" @click="handleStatusChange(item.orderNo)">Submit</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                   
                    <v-dialog v-model="item.dialogtip" max-width="500">
                        <v-card>
                            <v-card-title class="pa-4 border-bottom">
                                <span class="title text-h5 text-primary">Select Payment Option..</span>
                            </v-card-title>

                            <v-card-text>
                                <template v-if="shoSuccessMsg==true">
                                    <div class="mb-5">
                                        <div class="text-center mb-2">
                                            <!-- <svg class="checkmark_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg> -->
                                            <img src="@/assets/images/locator/v-icon.png" style="max-width:80px;">
                                        </div>
                                        <h3 class="text-center"><span class="text-h3 text-primary">Payment Successfully Done. <span class="d-block text-center text-h6">Please Wait...</span></span></h3>
                                    </div>
                                </template>
                                <!-- <img :src="item.tip_qr_code"  class="d-block" style="margin:auto; width:300px;"> -->
                                <template v-if="shoSuccessMsg==false">
                                    <v-radio-group v-model="radioOnline" inline hide-details="auto" class="mb-4">
                                        <v-radio label="Cash Payment" value="cashPayment" color="primary"></v-radio>
                                        <v-radio label="Split Payment" value="splitCash" color="primary"></v-radio>
                                    </v-radio-group>
                                        <div class="mt-0 mb-4" >
                                            <v-label class="font-weight-medium mb-2">Cash</v-label>
                                            <v-text-field color="primary"  variant="outlined" type="number" v-model="splitVmodel" placeholder="Cash" hide-details>
                                                <template v-slot:prepend-inner>
                                                    <CurrencyDollarIcon stroke-width="1.5" size="22" class="text-medium-emphasis mr-3" />
                                                </template>
                                            </v-text-field>
                                        </div>
                                </template>
                                    </v-card-text>
                                <template v-if="shoSuccessMsg==false">
                                    <v-card-actions class="pa-4">
                                        <v-spacer></v-spacer>
                                        
                                        <v-btn color="error bg-lightwarning" @click="item.dialogtip = false">Cancel</v-btn>
                                        <v-btn color="primary" variant="flat" @click="update_pay(item.invoiceNO, item)">Submit</v-btn>
                                    </v-card-actions>
                                </template>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="item.dialogtippayment" max-width="500">
                        <v-card>
                            <v-card-title class="pa-4 border-bottom">
                                <span class="title text-h5 text-primary">Scan below for Payment...</span>
                            </v-card-title>

                            <v-card-text>
                                <img :src="qrCodeData" class="d-block" style="margin:auto; width:300px;">
                                <!-- <v-radio-group v-model="radioOnline" inline hide-details="auto" class="mb-4">
                                    <v-radio label="Cash Payment" value="cashPayment" color="primary"></v-radio>
                                    <v-radio label="Split Payment" value="splitCash" color="primary"></v-radio>
                                </v-radio-group>
                                <div class="mt-0 mb-4" >
                                    <v-label class="font-weight-medium mb-2">Cash</v-label>
                                    <v-text-field color="primary"  variant="outlined" type="text"  v-model="splitVmodel" placeholder="Cash" hide-details>
                                        <template v-slot:prepend-inner>
                                            <CurrencyDollarIcon stroke-width="1.5" size="22" class="text-medium-emphasis mr-3" />
                                        </template>
                                    </v-text-field>
                                </div> -->

                                
                               
                            </v-card-text>

                            <v-card-actions class="pa-4">
                                <v-spacer></v-spacer>
                                <v-btn color="error bg-lightwarning" @click="item.dialogtippayment = false">Cancel</v-btn>
                                <v-btn color="primary" variant="flat" @click="">Submit</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </td>
            </tr>
        </tbody>
    </v-table>
    <v-pagination v-model="currentPage" :length="Math.ceil(filteredList.length / itemsPerPage)"
        rounded="circle"></v-pagination>
</template>
