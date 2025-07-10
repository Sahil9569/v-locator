<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useContactStore } from '@/stores/apps/contact';
import Customer_dash from '@/_mockApis/apps/Customer_dash';
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


const valid = ref(true);
const dialog = ref(false);
const data = ref(false);
const search = ref('');
const desserts = ref(Customer_dash);
const editedIndex = ref(-1);
const editedItem = ref({
    invoiceNO: '',
    customer: '',
    amount:'',
    customerType: '',
    table: '',
    orderDate: '',
    orderNo:'',
    SNo: '',
    status: ''
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
    rolestatus:'',
    status: ''
});

//Methods
const filteredList = computed(() => {
    return desserts.value.filter((user: any) => {
        return user.customer.toLowerCase().includes(search.value.toLowerCase());
    });
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
                const amountInfo = item.items.reduce((total:any, orderItem:any) => {
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
        <v-col cols="12" lg="4" md="6">
            <v-text-field density="compact" v-model="search" label="Search Your Order" hide-details variant="outlined"></v-text-field>
        </v-col>
    </v-row>
    <v-table class="mt-5">
        <thead>
            <tr>
                <th class="text-subtitle-1 font-weight-semibold">S No</th>
                <th class="text-subtitle-1 font-weight-semibold">Waiter</th>
                <th class="text-subtitle-1 font-weight-semibold">Total</th>
                <th class="text-subtitle-1 font-weight-semibold">Status</th>
                <th class="text-subtitle-1 font-weight-semibold">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in filteredList" :key="item.id">

                <td class="text-subtitle-1">{{ item.SNo }}</td>
                <td>
                    <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.customer }}</span>
                </td>
                <td class="text-subtitle-1">{{ item.orderNo }}</td>
                <td class="text-subtitle-1">
                    <v-chip class="text-primary bg-lightprimary" size="small" label>{{ item.status }}</v-chip>
                </td>
                <td>
                    <div class="d-flex align-center">
                        <v-btn icon flat @click="item.dialog = true" ><EyeIcon size="20" class="text-primary"/></v-btn>
                    </div>
                    <v-dialog v-model="item.dialog" max-width="800">
                        <v-card>
                            <v-card-title class="pa-4">
                                <span class="title">Single Order</span>
                            </v-card-title>

                            <v-card-text class="pb-20">
                                <v-row>
                                    <v-col cols="12" md="6" lg="6" class="">
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
                                                        <div class="d-flex align-center mt-3">
                                                            <v-chip class="mr-2 text-primary bg-primary" size="small" label>Kitchen-v1</v-chip>
                                                        </div>
                                                    </v-card-item>
                                                </div>
                                            </div>
                                        </v-card>
                                    </v-col>

                                    <v-col cols="12" md="6" lg="6" class="">
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
                                                        <div class="d-flex align-center mt-3">
                                                            <v-chip class="mr-2 text-primary bg-primary" size="small" label>Kitchen-v1</v-chip>
                                                        </div>
                                                    </v-card-item>
                                                </div>
                                            </div>
                                        </v-card>
                                    </v-col>

                                    <v-col cols="12" md="6" lg="6" class="">
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
                                                        <div class="d-flex align-center mt-3">
                                                            <v-chip class="mr-2 text-primary bg-primary" size="small" label>Kitchen-v1</v-chip>
                                                        </div>
                                                    </v-card-item>
                                                </div>
                                            </div>
                                        </v-card>
                                    </v-col>

                                    <v-col cols="12" md="6" lg="6" class="">
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
                                                        <div class="d-flex align-center mt-3">
                                                            <v-chip class="mr-2 text-primary bg-primary" size="small" label>Kitchen-v1</v-chip>
                                                            
                                                        </div>
                                                    </v-card-item>
                                                </div>
                                            </div>
                                        </v-card>
                                    </v-col>
                                    
                                </v-row>
                                                
                            </v-card-text>

                            <v-card-actions class="pa-4 position-fixed" style="bottom: 0;left: 0;right: 0;background-color: #fff;">
                                <v-spacer></v-spacer>
                                <div class="d-flex w-100 justify-space-between align-center">
                                    <div class="">
                                        <h6 class="text-subtitle-2 d-block">Tips : $2</h6>
                                        <h3 class="h6">Sub Total : $320</h3>
                                    </div>
                                    
                                    <v-btn color="error bg-lightwarning" @click="item.dialog = false">Cancel</v-btn>
                                </div>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </td>
            </tr>
        </tbody>
    </v-table>
    <v-pagination
      v-model="currentPage"
      :total="totalPages"
      @input="paginateTable"
    ></v-pagination>
</template>
