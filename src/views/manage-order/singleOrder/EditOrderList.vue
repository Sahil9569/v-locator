<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useContactStore } from '@/stores/apps/contact';
import axios from 'axios';
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL
import singleOrder from '@/_mockApis/apps/manage-order/singleOrder';
// import { VTable, VPagination } from '@/_mockApis/apps/contact';
const store = useContactStore();
// const checkbox =ref();
// const checkbox2 =ref();
// const checkbox3 =ref();
// const checkbox4 =ref();
// const { steps, currentStep, prevStep, nextStep } = useSteps();
const invoice = ref(); 
const status = ref(); 
const billing_date = ref(); 
const mobile_no = ref();
const customer_name = ref();
const subtotal  = ref(); 
const Grand_total  = ref(); 
const loading = ref(false);
onMounted(() => {
    store.fetchContacts();
    fetchOrderList();
});
const getContacts: any = computed(() => {
    return store.contacts;
});

// const valid = ref(true);
// const dialog = ref(false);

const desserts = ref(singleOrder);

const fetchOrderList = async () => {
    console.log("Order LIST API CALL")
    loading.value = true;
    try {
        const token = localStorage.getItem('authToken');
        const order_id = window.location.href.split('/').pop();
        const formData = {
            'token' : token,
            'order_id':order_id,     
        }
        const response = await axios.post('api/orders/single_order_details/',formData);
        const item_data = response.data;
        console.log('data aagya h --',item_data)
        if (response.data) {
            const dateObject = new Date(item_data.updated_at);
            invoice.value = item_data.id;
            status.value = item_data.status;
            billing_date.value = dateObject.toLocaleDateString();
            mobile_no.value = item_data.c_details.phone;
            customer_name.value = `${item_data.c_details?.user?.first_name || 'N/A'} ${item_data.c_details?.user?.last_name || 'N/A'}`; 
            let totalSubtotal = 0;
            
            const itemsWithTotalPrice = item_data.items.map((item:any) => {
                console.log('m yaha hu--------',item_data)
            
                let addonsTotal = 0;
                // Loop through addons and calculate total if checked
                for (const addon of item.addons) {
                    console.log("JAI HIND",addon)
                    console.log("JAI VEERU")
                    addonsTotal += parseFloat(addon.add_price);
                    console.log("FOR LOOP",addonsTotal)
                }
                const d_d = item.item.dish_name
                console.log('ddsasasasasa1',item.total_amount)
               
                totalSubtotal = totalSubtotal + parseFloat(item.total_amount) ; // Accumulate total price
                console.log('ddsasasasasa2',totalSubtotal)

                return {
                    size: item.size,
                    item_data: d_d,
                    Amount: `${item.item.dish_discount || 'N/A'}`,
                    add_price: addonsTotal.toFixed(2),
                    Quantity: item.quantity,
                    total_price: item.total_amount,
                };
            });
            desserts.value = itemsWithTotalPrice;
            subtotal.value = parseFloat(totalSubtotal).toFixed(2);
            const vat = 0.09 * parseFloat(totalSubtotal);
            const grandTotal = parseFloat(totalSubtotal) + 5 + vat;
            Grand_total.value = grandTotal.toFixed(2);
            
        } else {
            console.log("First Error");
    }
    } catch (error) {
        console.error('API error:', error);
        
    }
    loading.value = false;
}


</script>
<template>
    <div>
        <div v-if="loading" class="loader-container">
            <!-- Your loader implementation here -->
            <div class="loader"></div>
        </div>
        <div v-else>
            <v-card elevation="10" class="pa-3 mb-4">
                <v-row class="align-center">
                    <!-- <v-col cols="12" xs="12" sm="12" md="6" class="pa-10 w-25">
                        <img src="/src/assets/images/locator/logo-dark.png" class="w-50" />
                    </v-col> -->
                    <v-col cols="12" md="4" class="">
                        <h1 class="text-h3 mb-3">Invoice</h1>
                        <h5 class="text-subtitle-1 py-1 font-weight-semibold">Invoice Number : {{ invoice }}</h5>
                        <h5 class="text-subtitle-1 py-1 font-weight-semibold">Order Status : {{ status }}</h5>
                        <h5 class="text-subtitle-1 py-1 font-weight-semibold">Billing date : {{ billing_date }}</h5>
                    </v-col>
                    <v-col cols="12" xs="12" sm="12" md="8" class="text-md-end">
                        <h1 class="text-h3 mb-3">Customer Details</h1>
                        <h5 class="text-subtitle-1 py-1 font-weight-semibold">Name : {{customer_name}}</h5>
                        <h5 class="text-subtitle-1 py-1 font-weight-semibold">Mobile : {{ mobile_no }}</h5>
                        <!-- <h5 class="text-subtitle-1 py-2 font-weight-semibold">Address : 98 Green Road, Farmgate, Dhaka-1215.</h5> -->
                    </v-col>
                </v-row>
            </v-card>
            <v-card elevation="10" class="pa-3 mb-4">
                <v-row class="align-center">
                    <v-col>
                    <div class="table-responsive m-b-20">
                        <v-table>
                        <thead>
                            <tr>
                                <th class="text-left font-weight-mediam" colspan="2">Item </th>
                                <!-- <th class="text-left font-weight-mediam">Customer Name</th> -->
                                <th class="text-left font-weight-mediam" >Items</th>
                                <th class="text-left font-weight-mediam">Size </th>
                                <th class="text-left wp_100">Addons</th>
                                <th class="text-left wp_100">Amount</th>
                                <!-- <th class="text-center wp_100">Qty </th> -->
                                <th class="text-right">Total price </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in desserts" :key="item.id" >
                                <td class="text-left text-subtitle-1" colspan="2"> {{ index+1 }} </td>
                                <!-- <td class="text-left"> {{ customer_name }} </td> -->
                                <td class="text-left text-subtitle-1"> {{ item.item_data }} </td>
                                <td class="text-left text-subtitle-1"> 
                                    <template v-if="item.size === 'S'">
                                        <v-chip size="small" color="primary">Small</v-chip>
                                    </template>
                                    <template v-if="item.size === 'M'">
                                        <v-chip size="small" color="primary">Medium</v-chip>
                                    </template>
                                    <template v-if="item.size === 'L'">
                                        <v-chip size="small" color="primary">Large</v-chip>
                                    </template>
                                    
                                </td>
                                <td class="text-left text-subtitle-1" v-if="item.add_price > 0"><strong> $ {{ item.add_price }}</strong> x {{ item.Quantity }}</td>
                                <td class="text-left text-subtitle-1" v-else>No Addons</td>
                                <td class="text-left text-subtitle-1"><strong> $ {{ item.Amount }} </strong> x {{ item.Quantity }}</td>
                                <!-- <td class="text-center  text-subtitle-1">{{ item.Quantity }}</td> -->
                                <td class="text-right text-subtitle-1">${{ item.total_price }}</td>
                            </tr>
                            <tr>
                                <td class="text-right" colspan="6"><strong>Subtotal </strong></td>
                                <td class="text-right"><strong> ${{ subtotal }} </strong></td>
                            </tr>
                            <tr>
                                <td class="text-right" colspan="6"><strong>Service & Others Fees ()</strong></td>
                                <td class="text-right text-error"><strong> $5.00 </strong></td>
                            </tr>
                            <tr>
                                <td class="text-right" colspan="6"><strong>Vat (%)</strong></td>
                                <td class="text-right"><strong> 9% </strong></td>
                            </tr>
                            <tr>
                                <td class="text-right" colspan="6"><strong>Grand total </strong></td>
                                <td class="text-right"><strong> ${{ Grand_total }}</strong></td>
                            </tr>
                        </tbody>

                    </v-table>
                    </div>
                    </v-col>
                </v-row>
        </v-card>
        </div>
    </div>
    
</template>
<style scoped>
.loader-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.loader {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #40bf0f;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
