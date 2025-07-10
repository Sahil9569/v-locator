<script setup lang="ts">
import { ref, computed, onMounted, onBeforeMount } from 'vue';
import { useContactStore } from '@/stores/apps/contact';
import axios from 'axios';
import { useRouter } from "vue-router";
const router = useRouter();
import BASE_URL from '@/stores/myVar';
import { checkTokenAndShow404 } from '@/utility';

axios.defaults.baseURL = BASE_URL
const store = useContactStore();

onBeforeMount(() => {
    // new_loader.value = false; 
    checkTokenAndShow404();
});

const new_loader = ref(false);
onMounted(() => {
    fetchOrderList();
});
const getContacts: any = computed(() => {
    return store.contacts;
});

const itemsPerPage = 10;
const currentPage = ref(1);
const valid = ref(true);
const dialog = ref(false);
const data = ref(false);
const search = ref('');
const table = ref(['Indian food', 'Lunch Package', 'Maxican', 'Salad']);
const orderStatus = ref(['Served','Pending', 'complete']);
const payment = ref(['payment Recived by Card','payment Recived by Cash', 'payment Recived by External UPI']);
const desserts = ref();
const editedIndex = ref(-1);
const resToken = localStorage.getItem('res_token')
const editedItem = ref({
    invoiceNO: '',
    customer: '',
    customerType:'',
    amount:'',
    waiter: '',
    table: '',
    orderDate: '',
    SNo: ''
});
const defaultItem = ref({
    invoiceNO: '',
    customer: '',
    customerType:'',
    waiter: '',
    table: '',
    orderDate: '',
    SNo: '',
    amount:'',
    rolestatus:''
});

const filteredList = computed(() => {
    if (!desserts.value) return [];
    return desserts.value.filter((item: any) => {
        return item.customer.toLowerCase().includes(search.value.toLowerCase());
    });
});

const paginatedList = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredList.value.slice(start, end);
});

const pageCount = computed(() => {
    return Math.ceil(filteredList.value.length) 
});

const fetchOrderList = async () => {
    console.log("Order LIST API CALL")
    new_loader.value = true;
    console.log('its just for checking in api-----',new_loader.value)

    try {
        console.log("INSIDE TRY",valid.value)
        const token = localStorage.getItem('authToken');
        const formData = {
            'token' : token,  
        }
        const response = await axios.post('api/orders/all_order/',formData);
        console.log('Order API response:', response.data);
        if (response.data) {
            new_loader.value = false;
            console.log('its just for checking in  if condi-----',new_loader.value)

            const updatedData = response.data.data.map((item:any, index:any) => {
                return {
                    SNo: `#${index + 1}`,
                    invoiceNO: item.id,
                    customer: `${item.c_details?.user?.first_name || 'N/A'} ${item.c_details?.user?.last_name || 'N/A'}`,
                    customerType: item.cust_type,
                    table:  item.table?.table,
                    waiter: `${item.staff?.first_name || 'N/A'} ${item.staff?.last_name || 'N/A'}`,
                    orderDate: item.created_at,
                    amount: item.order_total,
                    rolestatus:'N/A',
                    vat:'N/A',
                    status:item.status,
                };
            });
            desserts.value = updatedData;
        } else {
            new_loader.value = false;
            console.log('its just for checking in else condi-----',new_loader.value)
            console.log("First Error");
    }
    } catch (error) {
        new_loader.value = false;
        console.error('API error:', error);
        
    }
}
</script>
<template>
    <v-row>    
        <v-col cols="12" lg="4" md="6">
            <v-text-field density="compact" v-model="search" label="Search Your Order" hide-details variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="12" lg="8" md="6" class="text-right">
            <v-dialog v-model="dialog" max-width="500">
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
                                        v-model="editedItem.invoiceNO"
                                        label="Dish Name"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="table"
                                        v-model="editedItem.table"
                                        label="Dish Category"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        append-i                    prepend-inner-icon="mdi-map-marker"
                                        v-model="editedItem.customer"
                                        label="customer"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.waiter"
                                        label="waiter"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.amount"
                                        label="amount %"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-textarea
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.orderDate"
                                        label="Order date"
                                    ></v-textarea>
                                </v-col>
                                <v-col cols="12">
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="orderStatus"
                                        v-model="editedItem.orderStatus"
                                        label="Order Status"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12">
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="payment"
                                        v-model="editedItem.payment"
                                        label="Payment"
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
                            :disabled="editedItem.invoiceNO == '' || editedItem.customer == ''"
                            variant="flat"
                            @click="save"
                            >Save</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
    <div class="p-relative">
        <div class="logoLoader tableLoader" v-if="new_loader == true">
            <div class="LogoVInnerImg">
                <img src="@/assets/images/locator/v-icon.png" alt="logo-loader"/>
                <p>Please Wait...</p>
            </div>
        </div>
        <v-table :items="filteredList"  class="mt-5">
            <thead>
                <tr>
                    <th class="text-subtitle-1 font-weight-semibold">S No</th>
                    <th class="text-subtitle-1 font-weight-semibold">Invoice No</th>
                    <th class="text-subtitle-1 font-weight-semibold">Customer Name</th>
                    <th class="text-subtitle-1 font-weight-semibold">Customer Type</th>
                    <th class="text-subtitle-1 font-weight-semibold">Waiter</th>
                    <th class="text-subtitle-1 font-weight-semibold">Table</th>
                    <th class="text-subtitle-1 font-weight-semibold">Status</th>
                    <th class="text-subtitle-1 font-weight-semibold">Order date</th>
                    <th class="text-subtitle-1 font-weight-semibold">Amount</th>
                    <th class="text-subtitle-1 font-weight-semibold">Actions</th>
                </tr>
            </thead>
            <tbody >
                <tr v-for="item in paginatedList" :key="item.id" :currentPage="currentPage" :pageSize="10">
                    <td class="text-subtitle-1">{{ item.SNo }}</td>
                    <td class="text-subtitle-1">{{ item.invoiceNO }}</td>
                    <td>
                        <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.customer }}</span>
                    </td>
                    <td>
                        <v-chip v-if="item.customerType === 'Dinein'" color="primary" size="small" label>{{ item.customerType }}</v-chip>
                        <v-chip v-if="item.customerType === 'Pickup'" color="secondary" size="small" label>{{ item.customerType }}</v-chip>
                    </td>
                    <td>
                        <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.waiter }}</span>
                    </td>
                    <td>
                        <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.table }}</span>
                    </td>
                    <td>
                        <v-chip v-if="item.status === 'Pending'" color="primary" size="small" label>{{ item.status }}</v-chip>
                        <v-chip v-if="item.status === 'Confirmed'" color="secondary" size="small" label>{{ item.status }}</v-chip>
                        <v-chip v-if="item.status === 'Canceled'" color="error" size="small" label>{{ item.status }}</v-chip>
                        <v-chip v-if="item.status === 'Out for delivery'" color="warning" size="small" label>{{ item.status }}</v-chip>
                        <v-chip v-if="item.status === 'Delivered'" color="success"  size="small" label>{{ item.status }}</v-chip>
                        <v-chip v-if="item.status === 'Completed'" color="success"  size="small" label>{{ item.status }}</v-chip>
                    </td>
                    <td>
                        <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.orderDate }}</span>
                    </td>
                    <td>
                        <span class="text-subtitle-1 d-block mt-1 textSecondary">${{ item.amount }}</span>
                    </td>
                    <td>
                        <div class="d-flex align-center">
                            <router-link :to="'/singleOrderDetail/' + resToken + '/' + item.invoiceNO"  color="primary"> 
                                <v-btn icon flat ><EyeIcon size="20" class="text-primary"
                                    /></v-btn>
                            </router-link>
                        </div>
                    </td>
                </tr>
                
                       
            </tbody>
        </v-table>
        <v-pagination v-model="currentPage" :length="Math.ceil(filteredList.length / itemsPerPage)"
            rounded="circle"></v-pagination>
    </div>
</template>