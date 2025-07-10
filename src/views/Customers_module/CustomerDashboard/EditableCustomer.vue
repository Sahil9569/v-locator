<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useContactStore } from '@/stores/apps/contact';
// import Customer_dash from '@/_mockApis/apps/Customer_dash';
const store = useContactStore();
import axios from 'axios';
import BASE_URL from '@/stores/myVar';
// import { rawListeners } from 'process';
axios.defaults.baseURL = BASE_URL

onMounted(() => {
    getCustomerDetails();
    tabs.value = localStorage.getItem('table');
});
const getContacts: any = computed(() => {
    return store.contacts;
});

const valid = ref(true);
const dialog = ref(false);
const rating = ref(0);
const comment = ref('');
const dialogRating = ref(false);
const data = ref(false);
const search = ref('');
const status = ref(['Serve', 'Complete']);
const desserts = ref();
const editedIndex = ref(-1);
const Rtoken = ref('');
const tabs = ref('');
const editedItem = ref({
    id:'',
    waiter: '',
    total:'',
    SNo: '',
    status:'',
    rate:'',
});
const defaultItem = ref({
    id:'',
    waiter: '',
    SNo: '',
    total:'',
    status:'',
    rate:'',
});

const filteredList = computed(() => {
    if (!desserts.value) return []; 
    return desserts.value.filter((item: any) => {
        return item.waiter.toLowerCase().includes(search.value.toLowerCase());
    });
});

const getCustomerDetails = async () => {
    console.log("Order Items LIST API CALL")
    try {
        const parts = window.location.href.split('/');
        const token = parts[parts.length - 2];
        const table = window.location.href.split('/').pop();
        const cus_id = localStorage.getItem('cus_id');
        Rtoken.value = table;
        const formData = {
            token:table,
            table:table,
            cus_id:cus_id,       
        };
        const response = await axios.post('api/customers/customer_details/', formData);
        const item = response.data.menu;
        const amountInfo = item.reduce((total, orderItem) => {
                const itemsTotal = orderItem.items.reduce((subtotal, item) => {
                    const itemTotal = item.total_amount;
                    return  itemTotal;
                }, 0);
                return itemsTotal * orderItem.total_item_count;
            }, 0);
        if (response.data) {
            console.log('ye data piche se aara h ', response.data.menu)
            const updatedData = response.data.menu.map((item:any,index:any) => ({   
                waiter: `${item.staff ? `${item.staff.first_name || 'N/A'} ${item.staff.last_name || 'N/A'}` : 'N/A'}`,
                total: item.order_total,
                date:item.created_at,
                SNo: index+1,
                status: item.status,
                id:item.id,
                rate:item.feedback_rating_count,
                items:item.items,
                feedback:item.feedback,
                }));
                desserts.value = updatedData;
                console.log("HEllo WORLD",desserts.value)
        }else{
            console.log("First Error")
        }
    } catch (error) {
        console.error('API error:', error);
    }
}
const submitFeedback = async (item:any) => {
    console.log("Order Items LIST API CALL",item.id)
    try {
        const cus_id = localStorage.getItem('cus_id');
        const ord_id = item.id;
        const res = localStorage.getItem('res_token');
        const formData = {
            token:res,
            ord_id:ord_id,
            cus_id:cus_id,   
            rate:rating.value,
            comment:comment.value,    
        };
        console.log("YE HAI Feedback",formData);
        const response = await axios.post('api/customers/submit_feedback/', formData);
        if(response){
            rating.value = 0;
            comment.value = '';
            getCustomerDetails();
            item.dialogRating = false;
        }else{
            console.error('Response error:');
        }
    } catch (error) {
        console.error('API error:', error);
    }
}
const repeatOrder = async (item:any) => {
    console.log("Order Items Repet API CALL",item.id)
    try {
        const formData = {
            ord_id:item.id,
        };
        console.log("YE HAI Feedback",formData);
        const response = await axios.post('api/customers/repeat_order/', formData);
        window.location.reload();
    } catch (error) {
        console.error('API error:', error);
    }
}
const removeOrderIdAndNavigate1 =()=> {
      localStorage.removeItem('order_id');
    }
</script>
<template>
<main>
    <template v-if="filteredList > 0">
        <v-row>
            
            <v-col cols="12" lg="4" md="6">
                <v-text-field density="compact" v-model="search" label="Search Your Order" hide-details variant="outlined"></v-text-field>
            </v-col>
        </v-row>
    </template>
    <v-row>
        <template v-if="filteredList.length >= 0">
            <!-- Col-Loop-Start -->
            <v-col cols="12" lg="4" md="6" v-for="item in filteredList" :key="item.id">
                <v-card elevation="10" class="bg-lightsecondary">
                    <v-card-header>
                        <div  class="headrCardCstm border-bottom-cstm pa-3">
                            <v-row class="align-center">
                                <v-col cols="col">
                                    <div class="mainHistoryOrdr">
                                        <div class="orderImageHistry">
                                            <img src="@/assets/images/locator/v-icon.png">
                                        </div>
                                        <div class="contentHistory">
                                            <h3 class="text-h6">Order No #{{ item.id }}</h3>
                                            <p></p>
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="auto" class="text-right">
                                    <v-chip size="small" color="light"  class="mb-1">{{ item.status}}</v-chip>
                                    <router-link @click="removeOrderIdAndNavigate1" :to = "`/vlocator/menu/${Rtoken}/${tabs}`" class="text-primary linkMenuView d-flex align-center">View Menu <ArrowRightIcon size="15"/></router-link>
                                </v-col>
                            </v-row>
                        </div>
                    </v-card-header>
                    <v-card-items >
                        <div class="cardItmsCstm pa-3 pt-5 border-bottom-cstm">
                            <ul class="listingItemsCstm pb-1 mb-3">
                                <li v-for="itemData in item.items" :key="itemData.id" >
                                    <span class="imageListCm"><img src="@/assets/images/locator/checked.png"></span>
                                    <span class="contentListCm">
                                        <span class="text-medium-emphasis me-1 d-inline-block">{{ itemData.quantity }} x</span> {{itemData.item.dish_name}}
                                    </span>
                                </li>
                            </ul>
                            <v-row>
                                <v-col cols="col">
                                    <p class="text-body-2">{{ item.date }}</p>
                                </v-col>
                                <v-col cols="auto">
                                    <h5 class="text-h6">${{ item.total }}</h5>
                                </v-col>
                            </v-row>
                        </div>
                    </v-card-items>
                <v-card-footer>
                    <div class="pa-3">
                            <v-row>
                                <v-col cols="col">
                                    <div class="d-flex" v-if="item.feedback === 0">
                                        <h3 class="text-h6 me-1 font-weight-medium">Rate</h3>
                                        <div class="d-flex gap-1" @click="item.dialogRating = true"> 
                                            <i class="mdi mdi-star-outline text-light line-height-1 text-h6"></i>
                                            <i class="mdi mdi-star-outline text-light line-height-1 text-h6"></i>
                                            <i class="mdi mdi-star-outline text-light line-height-1 text-h6"></i>
                                            <i class="mdi mdi-star-outline text-light line-height-1 text-h6"></i>
                                            <i class="mdi mdi-star-outline text-light line-height-1 text-h6"></i>
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="auto">
                                    <v-btn size="small" color="secondary"  @click="repeatOrder(item)"><i class="mdi mdi-refresh text-h6 me-1"></i>Reorder</v-btn>
                                </v-col>
                            </v-row>
                        </div>
                    </v-card-footer>
                </v-card>
                <v-dialog v-model="item.dialogRating" max-width="600">
                            <v-card>
                                <v-card-title class="pa-4">
                                    <span class="title">Feedback</span>
                                </v-card-title>

                            <v-card-text class="pa-4">
                                <v-row>
                                    <v-col cols="12" class="">
                                        <v-label class="font-weight-medium mb-2 d-block">Rating</v-label>
                                        <v-rating
                                        v-model="rating"
                                        hover size="large"
                                        density="compact"
                                        color="warning"
                                        class=""
                                        ></v-rating>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-label class="font-weight-medium mb-2">Comment</v-label>
                                        <v-textarea
                                            v-model="comment"
                                            auto-grow
                                            variant="outlined"
                                            placeholder="Comment"
                                            rows="5"
                                            color="primary"
                                            row-height="25"
                                            shaped
                                            hide-details
                                        ></v-textarea>
                                    </v-col>
                                </v-row>        
                            </v-card-text>

                                <v-card-actions class="pa-4">
                                    <v-spacer></v-spacer>
                                        <v-btn color="error" @click="item.dialogRating = false" flat>cancel</v-btn>
                                        <v-btn class="bg-primary" @click="submitFeedback(item)">Submit</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
            </v-col> 
            <!-- Col-Loop-End -->
        </template>
        <template v-else>
            <v-col cols="12">
                <p class="text-center text-h6 font-weight-regular">No Order Yet</p>
            </v-col>
        </template>
    </v-row>
    <!-- <v-table class="mt-5">
        <thead>
            <tr>
                <th class="text-subtitle-1 font-weight-semibold">S No</th>
                <th class="text-subtitle-1 font-weight-semibold">Order No</th>
                <th class="text-subtitle-1 font-weight-semibold">Date</th>
                <th class="text-subtitle-1 font-weight-semibold">Total</th>
                <th class="text-subtitle-1 font-weight-semibold">Status</th>
                <th class="text-subtitle-1 font-weight-semibold">Rating</th>
                <th class="text-subtitle-1 font-weight-semibold">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in filteredList" :key="item.id">

                <td class="text-subtitle-1">{{ item.SNo }}</td>
                <td>
                    <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.id }}</span>
                </td>
                <td>
                    <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.date }}</span>
                </td>
                <td class="text-subtitle-1">{{ item.total }}</td>
                <td class="text-subtitle-1">
                    <v-chip class="text-primary bg-lightprimary" size="small" label>{{ item.status }}</v-chip>
                </td>
                <td>
                    <template v-if="item.rate > 0"> 
                        <div class="d-flex gap-1">
                            <i v-if="item.rate >= 1" class="mdi mdi-star text-warning text-h6"></i>
                            <i v-else class="mdi mdi-star-outline text-warning text-h6"></i>
                            <i v-if="item.rate >= 2" class="mdi mdi-star text-warning text-h6"></i>
                            <i v-else class="mdi mdi-star-outline text-warning text-h6"></i>
                            <i v-if="item.rate >= 3" class="mdi mdi-star text-warning text-h6"></i>
                            <i v-else class="mdi mdi-star-outline text-warning text-h6"></i>
                            <i v-if="item.rate >= 4" class="mdi mdi-star text-warning text-h6"></i>
                            <i v-else class="mdi mdi-star-outline text-warning text-h6"></i>
                            <i v-if="item.rate >= 5" class="mdi mdi-star text-warning text-h6"></i>
                            <i v-else class="mdi mdi-star-outline text-warning text-h6"></i>
                        </div>
                    </template>
                    <template v-else>
                            <div class="d-flex gap-1" @click="item.dialogRating = true"> 
                            <i class="mdi mdi-star-outline text-warning text-h6"></i>
                            <i class="mdi mdi-star-outline text-warning text-h6"></i>
                            <i class="mdi mdi-star-outline text-warning text-h6"></i>
                            <i class="mdi mdi-star-outline text-warning text-h6"></i>
                            <i class="mdi mdi-star-outline text-warning text-h6"></i>
                        </div>
                    </template>
                    
                </td>
                <td>
                    <div class="d-flex align-center gap-2">
                        <v-btn color="primary" size="small" flat @click="repeatOrder(item)" >Repeat Order</v-btn>
                    </div>
                </td>
            </tr>
        </tbody>
    </v-table>
    <v-pagination
      v-model="currentPage"
      :total="totalPages"
      @input="paginateTable"
    ></v-pagination> -->
</main>

</template>
