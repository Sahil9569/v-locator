<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useContactStore } from '@/stores/apps/contact';
import services_staff from '@/_mockApis/apps/services_staff';
const store = useContactStore();
import axios from 'axios';
import BASE_URL from '@/stores/myVar';
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


const valid = ref(true);
const dialog = ref(false);
const data = ref(false);
const search = ref('');
const status = ref(['Serve', 'Complete']);
const desserts = ref(services_staff);
const editedIndex = ref(-1);
const editedItem = ref({
    invoiceNO: '',
    customer: '',
    amount:'',
    customerType: '',
    table: '',
    orderDate: '',
    orderNo:'',
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
    orderNo:'',
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
            const updatedData = response.data.map((item:any, index:any) => {
                const amountInfo = item.items.reduce((total, orderItem) => {
                    const itemTotal = orderItem.quantity * orderItem.item.dish_price;
                    return total + itemTotal;
                }, 0);
                return {
                    SNo: `#${index + 1}`,
                    invoiceNO: item.id,
                    customer: `${item.c_details.user.first_name || 'N/A'} ${item.c_details.user.last_name || 'N/A'}`,  // Access the first_name attribute
                    customerType: item.cust_type,
                    table:  item.table.table,
                    waiter: `${item.staff.first_name || 'N/A'} ${item.staff.last_name || 'N/A'}`,
                    orderDate: item.created_at,
                    amount: amountInfo,
                    rolestatus:'N/A',
                    vat:'N/A',
                    status: item.status,
                };
            });
                // Update the desserts ref with the new mapped data
                desserts.value = updatedData;
        }else{
            console.log("First Error")
        }
    } catch (error) {
        console.error('API error:', error);
        
    }
}
</script>
<template>
    <v-row>
        
    </v-row>
    <v-table class="mt-5">
        <thead>
            <tr>
                <th class="text-subtitle-1 font-weight-semibold">S No</th>
                <th class="text-subtitle-1 font-weight-semibold">Table</th>
                <th class="text-subtitle-1 font-weight-semibold">Order Id</th>
                <th class="text-subtitle-1 font-weight-semibold">Customer Name</th>
                <th class="text-subtitle-1 font-weight-semibold">Status</th>
                <th class="text-subtitle-1 font-weight-semibold">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in paginatedList" :key="item.id" :currentPage="currentPage" :pageSize="10">

                <td class="text-subtitle-1">{{ item.SNo }}</td>
                <td>
                    <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.table }}</span>
                </td>
                <td class="text-subtitle-1">{{ item.orderNo }}</td>
                <td>
                    <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.customer }}</span>
                </td>
                <td style="width:160px;padding:7px 5px;" class="orderStatusInput">
                    <v-select
                    :items="status"
                    label="Status"
                    hide-details
                    class="selectMaxWdth"
                    density="compact"
                    ></v-select>
                </td>
                <td>
                    <div class="d-flex align-center">
                        <v-btn icon flat @click="item.dialog = true" ><EyeIcon size="20" class="text-primary"/></v-btn>
                    </div>
                    <v-dialog v-model="item.dialog" max-width="800">
                        <v-card>
                            <v-card-title class="pa-4">
                                <span class="title">Details</span>
                            </v-card-title>

                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" md="6" lg="6" class="mt-6">
                                        <v-card variant="outlined" class="rounded">
                                            <div class="mainCardMenuSt">
                                                <div class="radioSizeGroup">
                                                    <v-chip class="mr-2 text-secondary bg-lightsecondary" size="small" label>Small</v-chip>
                                                </div>
                                                <div class="imageSizeProduct">
                                                    <router-link :to="`/ecommerce/product/detail/23`">
                                                        <img alt="product" src="@/assets/images/locator/food-menus/Thai-Salad.webp" class="w-100" />
                                                    </router-link>
                                                </div>
                                                <div class="contentSideMenu">
                                                    <v-card-item class="pt-3 pb-3 px-2 px-md-4">
                                                        <h6 class="text-h6 mb-1">Thai Salad</h6>
                                                        <div class="d-flex align-center justify-space-between mt-1 mb-2">
                                                            <div class="d-flex align-center gap-2">
                                                                <h6 class="text-subtitle-1 font-weight-bold">$180</h6>
                                                                <p class="text-decoration-line-through text-subtitle-2 text-error text-medium-emphasis">$220</p>
                                                            </div>
                                                        </div>
                                                        <div class="toggleButtonQty">
                                                            <span class="text-subtitle-1">Qty : 2</span>
                                                        </div>
                                                        <div class="">
                                                            <v-btn
                                                                variant="flat"
                                                                color="primary"
                                                                class="me-2 mt-2"
                                                                size="small"
                                                                > Kitchen-V1</v-btn>
                                                        </div>
                                                    </v-card-item>
                                                </div>
                                            </div>
                                        </v-card>
                                    </v-col>

                                    <v-col cols="12" md="6" lg="6" class="mt-6">
                                        <v-card variant="outlined" class="rounded">
                                            <div class="mainCardMenuSt">
                                                <div class="radioSizeGroup">
                                                    <v-chip class="mr-2 text-success bg-lightsuccess" size="small" label>Large</v-chip>
                                                </div>
                                                <div class="imageSizeProduct">
                                                    <router-link :to="`/ecommerce/product/detail/23`">
                                                        <img alt="product" src="@/assets/images/locator/food-menus/Thai-Salad.webp" class="w-100" />
                                                    </router-link>
                                                </div>
                                                <div class="contentSideMenu">
                                                    <v-card-item class="pt-3 pb-3 px-2 px-md-4">
                                                        <h6 class="text-h6 mb-1">Thai Salad</h6>
                                                        <div class="d-flex align-center justify-space-between mt-1 mb-2">
                                                            <div class="d-flex align-center gap-2">
                                                                <h6 class="text-subtitle-1 font-weight-bold">$180</h6>
                                                                <p class="text-decoration-line-through text-subtitle-2 text-error text-medium-emphasis">$220</p>
                                                            </div>
                                                        </div>
                                                        <div class="toggleButtonQty">
                                                            <span class="text-subtitle-1">Qty : 2</span>
                                                        </div>
                                                        <div class="">
                                                            <v-btn
                                                                variant="flat"
                                                                color="primary"
                                                                class="me-2 mt-2"
                                                                size="small"
                                                                > Kitchen-V1</v-btn>
                                                        </div>
                                                    </v-card-item>
                                                </div>
                                            </div>
                                        </v-card>
                                    </v-col>

                                    <v-col cols="12" md="6" lg="6" class="mt-6">
                                        <v-card variant="outlined" class="rounded">
                                            <div class="mainCardMenuSt">
                                                <div class="radioSizeGroup">
                                                    <v-chip class="mr-2 text-success bg-lightsuccess" size="small" label>Medium</v-chip>
                                                </div>
                                                <div class="imageSizeProduct">
                                                    <router-link :to="`/ecommerce/product/detail/23`">
                                                        <img alt="product" src="@/assets/images/locator/food-menus/Thai-Salad.webp" class="w-100" />
                                                    </router-link>
                                                </div>
                                                <div class="contentSideMenu">
                                                    <v-card-item class="pt-3 pb-3 px-2 px-md-4">
                                                        <h6 class="text-h6 mb-1">Thai Salad</h6>
                                                        <div class="d-flex align-center justify-space-between mt-1 mb-2">
                                                            <div class="d-flex align-center gap-2">
                                                                <h6 class="text-subtitle-1 font-weight-bold">$180</h6>
                                                                <p class="text-decoration-line-through text-subtitle-2 text-error text-medium-emphasis">$220</p>
                                                            </div>
                                                        </div>
                                                        <div class="toggleButtonQty">
                                                            <span class="text-subtitle-1">Qty : 2</span>
                                                        </div>
                                                        <div class="">
                                                            <v-btn
                                                                variant="flat"
                                                                color="primary"
                                                                class="me-2 mt-2"
                                                                size="small"
                                                                > Kitchen-V1</v-btn>
                                                        </div>
                                                    </v-card-item>
                                                </div>
                                            </div>
                                        </v-card>
                                    </v-col>

                                    <v-col cols="12" md="6" lg="6" class="mt-6">
                                        <v-card variant="outlined" class="rounded">
                                            <div class="mainCardMenuSt">
                                                <div class="radioSizeGroup">
                                                    <v-chip class="mr-2 text-success bg-lightsuccess" size="small" label>Large</v-chip>
                                                </div>
                                                <div class="imageSizeProduct">
                                                    <router-link :to="`/ecommerce/product/detail/23`">
                                                        <img alt="product" src="@/assets/images/locator/food-menus/Thai-Salad.webp" class="w-100" />
                                                    </router-link>
                                                </div>
                                                <div class="contentSideMenu">
                                                    <v-card-item class="pt-3 pb-3 px-2 px-md-4">
                                                        <h6 class="text-h6 mb-1">Thai Salad</h6>
                                                        <div class="d-flex align-center justify-space-between mt-1 mb-2">
                                                            <div class="d-flex align-center gap-2">
                                                                <h6 class="text-subtitle-1 font-weight-bold">$180</h6>
                                                                <p class="text-decoration-line-through text-subtitle-2 text-error text-medium-emphasis">$220</p>
                                                            </div>
                                                        </div>
                                                        <div class="toggleButtonQty">
                                                            <span class="text-subtitle-1">Qty : 2</span>
                                                        </div>
                                                        <div class="">
                                                            <v-btn
                                                                variant="flat"
                                                                color="primary"
                                                                class="me-2 mt-2"
                                                                size="small"
                                                                > Kitchen-V1</v-btn>
                                                        </div>
                                                    </v-card-item>
                                                </div>
                                            </div>
                                        </v-card>
                                    </v-col>
                                    
                                </v-row>
                            </v-card-text>

                            <v-card-actions class="pa-4">
                                <v-spacer></v-spacer>
                                <v-btn color="error bg-lightwarning" @click="item.dialog = false">Cancel</v-btn>
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
