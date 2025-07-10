<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useContactStore } from '@/stores/apps/contact';
import {PencilIcon, TrashIcon} from 'vue-tabler-icons';
import cancel_order from '@/_mockApis/apps/manage-order/cancel_order';
const store = useContactStore();
import axios from 'axios';
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL
const token = localStorage.getItem('res_token') 
const new_loader = ref(false);

onMounted(() => {
    // store.fetchContacts();
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
const desserts = ref(cancel_order);
const editedIndex = ref(-1);
const editedItem = ref({
    invoiceNO: '',
    customer: '',
    amount:'',
    customerType: '',
    table: '',
    orderDate: '',
    SNo: ''
});
const defaultItem = ref({
    invoiceNO: '',
    customer: '',
    customerType: '',
    table: '',
    orderDate: '',
    SNo: '',
    amount:'',
    rolestatus:''
});

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
const fetchOrderList = async () => {
    console.log("Order LIST API CALL")
    new_loader.value = true;
    try {
        console.log("INSIDE TRY",valid.value)
        const token = localStorage.getItem('authToken');
        const formData = {
            'token' : token,
            'status': 'Canceled'
        }
        const response = await axios.post('api/orders/all_order/',formData);
        console.log('Order API response:', response.data);
        if (response.data) {
            new_loader.value = false;

            const updatedData = response.data.data.map((item:any, index:any) => {
                // const amountInfo = item.items.reduce((total, orderItem) => {
                //     const itemTotal = orderItem.quantity * orderItem.item.dish_price;
                //     return total + itemTotal;
                // }, 0);
                // const orderDate = new Date(item.created_at).toLocaleString();

                return {
                    SNo: `#${index + 1}`,
                    invoiceNO: item.id,
                    customer: `${item.c_details?.user?.first_name || 'N/A'} ${item.c_details?.user?.last_name || 'N/A'}`,  // Access the first_name attribute
                    customerType: item.cust_type,
                    table:  item.table?.table,
                    waiter: `${item.staff ? `${item.staff.first_name || 'N/A'} ${item.staff.last_name || 'N/A'}` : 'N/A'}`,
                    orderDate: item.created_at,
                    amount: item.order_total,
                    rolestatus:'N/A',
                    vat:'N/A',
                    status: item.status,
                };
            });
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
</script>
<template>
    <v-row>
        <v-col cols="12" lg="4" md="6">
            <v-text-field density="compact" v-model="search" label="Search Your Order" hide-details variant="outlined"></v-text-field>
        </v-col>
    </v-row>
    <div class="p-relative">
        <div class="logoLoader tableLoader" v-if="new_loader == true">
            <div class="LogoVInnerImg">
                <img src="@/assets/images/locator/v-icon.png" alt="logo-loader"/>
                <p>Please Wait...</p>
            </div>
        </div>
        <v-table class="mt-5">
            <thead>
                <tr>
                    <th class="text-subtitle-1 font-weight-semibold">S No</th>
                    <th class="text-subtitle-1 font-weight-semibold">Order Id</th>
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
            <tbody>
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
                        <v-chip v-if="item.status === 'Canceled'" color="error"  size="small" label>{{ item.status }}</v-chip>

                    </td>
                    <td>
                        <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.orderDate }}</span>
                    </td>
                    <td>
                        <span class="text-subtitle-1 d-block mt-1 textSecondary">${{ item.amount }}</span>
                    </td>
                    <td>
                        <div class="d-flex align-center">
                            <router-link :to="'/singleOrderDetail/' + token + '/' + item.invoiceNO"  color="primary"> 
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
