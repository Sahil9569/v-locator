<script setup lang="ts">
import { ref, computed, onMounted,nextTick } from 'vue';
import { useContactStore } from '@/stores/apps/contact';
import { useEcomStore } from '@/stores/apps/eCommerce';
import axios from 'axios';
import { useRouter } from "vue-router";
const router = useRouter();
import BASE_URL from '@/stores/myVar';
const radioColors = ref('1');
axios.defaults.baseURL = BASE_URL
import paymentMethod from '@/_mockApis/apps/paymentSetting/paymentSetup';
// import { VTable, VPagination } from '@/_mockApis/apps/contact';
const store = useContactStore();

const new_loader = ref(false);

onMounted(() => {
    store.fetchContacts();
    getStripeStatus_and_payments();
});
const getContacts: any = computed(() => {
    return store.contacts;
});
const link = 'https://connect.stripe.com/oauth/v2/authorize?response_type=code&client_id=ca_OVtfl7zi7Ms7ty6UUg4ROb699ZaxnDRT&scope=read_write&redirect_uri=YOUR_DYNAMIC_REDIRECT_URL'
const valid = ref(true);
const dialog = ref(false);
const search = ref('');
// const email = ref(['Indian food', 'Lunch Package', 'Maxican', 'Salad']);
// const kitchenAssign = ref(['Kitchen 1','Kitchen 2','Kitchen 3'])
const desserts = ref(paymentMethod);
const check_status = ref(false);
const stripe_link = ref("#")
const editedIndex = ref(-1);
const editedItem = ref({
    PaymentMethod: '',
    price: '',
    vat:'',
    discount: '',
    email: '',
    MarchantID: '',
    currency: '',
    mode: '',
    SNo: ''
});
const defaultItem = ref({
    PaymentMethod: '',
    price: '',
    discount: '',
    email: '',
    MarchantID: '',
    currency: '',
    mode: '',
    SNo: '',
    vat:'',
    rolestatus:''
});




export type Products = {
    // sno: string | number | undefined;
    id: string | number | undefined;
    paymeth: string;
    // cemail?: string;
    cname?: string;
    status?: string;
    amount?: number;
    created?:string;
    type?: string;
    txnid?: string;
};
const mockProducts = ref([]);
//Methods
const filteredList = computed(() => {
    // return desserts.value.filter((user: any) => {
    //     return user.PaymentMethod.toLowerCase().includes(search.value.toLowerCase());
    // });
    // return getVisibleProduct(mockProducts.value, selected.value, searchValue, store.category);
    return getVisibleProduct(mockProducts.value);
});
const getVisibleProduct = (
    products: Products | any
    //, sortBy: string, search: string | any, category: string | unknown,
) => {
    // if (category !== 'all') {
    //     products = products.filter((product: Products | any) => {
    //         return product.categories.includes(category);
    //     });
    // }

    // if (search) {
    //     products = products.filter((product: Products) => {
    //         return product.name.toLowerCase().includes(search.value.toLowerCase());
    //     });
    // }
    console.log("products________________________", products)
    return products;
};
const getStripeStatus_and_payments = async () => {
    new_loader.value = true;
    try {
        const token = window.location.href.split('/').pop();
        const cus_id = localStorage.getItem('cus_id');
        const formData = {
            token:token,      
        };
        console.log("YE HAI CATsssssssss2",formData);
        const response = await axios.post('api/check_stripe_and_payments/', formData);
        new_loader.value = false;
        if (response.data.status == "EXISTS"){
            check_status.value = response.data.verified;
            console.log("response______________ ",response.data.verified);

            mockProducts.value = response.data.rlog.map((item: any) => ({
                refid       :   item.id,
                paymeth     :   "Stripe",
                // cemail      :   item.cust.user.email,
                cname       :   item.cust.user.first_name + item.cust.user.last_name,
                status      :   item.status,
                amount      :   '$'+item.amount,
                created     :   item.created,
                type        :   item.type,
                txnid       :   item.strp_id,
            }));
        }
    } catch (error) {
        new_loader.value = false;
    }
    // console.log('yaha pta chalegi teri asliyat',check_status.value)
}
const createStipe = async () => {
    console.log("Order Items LIST API CALL")
    try {
        const token = window.location.href.split('/').pop();
        const cus_id = localStorage.getItem('cus_id');
        const formData = {
            token:token,      
        };
        console.log("CREATE STRIPE",formData);
        const response = await axios.post('api/create_strip/', formData);
        console.log("YAHA PE HAI",response.data);
        window.location.href = response.data.url;
    } catch (error) {
        console.error('API error:', error);
        
        
    }
}

</script>
<template>
    <v-row>
        <v-col cols="12" lg="4" md="6">
            <div class="d-flex justify-space-between align-center">
                <v-text-field density="compact" v-model="search" label="Search" hide-details variant="outlined" class="w-50"></v-text-field>
            </div>
        </v-col>
        <v-col cols="12" lg="8" md="12" class="text-right" v-if="check_status">
            <v-btn href="#" color="primary" size="default" disabled>Stripe Connected</v-btn>
        </v-col>
        <v-col cols="12" lg="8" md="12" class="text-right" v-else>
            <v-btn  @click="createStipe" color="primary" size="default">Connect with Stripe</v-btn>
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
                                        v-model="editedItem.PaymentMethod"
                                        label="Dish Name"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="email"
                                        v-model="editedItem.email"
                                        label="Dish Category"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
            append-i                    prepend-inner-icon="mdi-map-marker"
                                        v-model="editedItem.price"
                                        label="Price"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.discount"
                                        label="Discount"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.vat"
                                        label="Vat %"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-textarea
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.MarchantID"
                                        label="MarchantID">
                                    </v-textarea>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>

                    <v-card-actions class="pa-4">
                        <v-spacer></v-spacer>
                        <v-btn color="error" @click="close">Cancel</v-btn>
                        <v-btn
                            color="primary"
                            :disabled="editedItem.PaymentMethod == '' || editedItem.price == ''"
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
                <p class="">Please Wait...</p>
            </div>
        </div>
        <v-table class="mt-5">
            <thead>
                <tr>
                    <th class="text-subtitle-1 font-weight-semibold">Ref ID</th>
                    <th class="text-subtitle-1 font-weight-semibold">Payment Method</th>
                    <th class="text-subtitle-1 font-weight-semibold">Customer Name</th>
                    <th class="text-subtitle-1 font-weight-semibold">Status</th>
                    <th class="text-subtitle-1 font-weight-semibold">Amount</th>
                    <th class="text-subtitle-1 font-weight-semibold">Created</th>
                    <th class="text-subtitle-1 font-weight-semibold">Type</th>
                    <th class="text-subtitle-1 font-weight-semibold">Txn ID</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in filteredList" :key="item.id">
                    <td class="text-subtitle-1">{{ item.refid }}</td>
                    <td><span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.paymeth }}</span></td>
                    <td><span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.cname }}</span></td>
                    <td><span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.status }}</span></td>
                    <td><span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.amount }}</span></td>
                    <td><span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.created }}</span></td>
                    <td><span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.type }}</span></td>
                    <td><span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.txnid }}</span></td>
                </tr>
            </tbody>
        </v-table>
        <v-pagination v-model="currentPage" :length="Math.ceil(filteredList.length / itemsPerPage)"
            rounded="circle"></v-pagination>
    </div>
</template>
<style>
.v-selection-control .v-label.v-label--clickable{
    white-space:nowrap;
}
</style>