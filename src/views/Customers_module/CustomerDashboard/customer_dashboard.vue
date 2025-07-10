<script setup lang="ts">
import { ref,onMounted } from 'vue';
const tab = ref(null);
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import EditableCustomer from './EditableCustomer.vue';
// theme breadcrumb
import axios from 'axios';
import { useRouter } from "vue-router";
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL
const radioColors = ref('1');
onMounted(() => {
    getOrderDetails();
    tabs.value = localStorage.getItem('table');
});
const errorMsg = ref('');
const Rtoken = ref('');
const tabs = ref('');
const page = ref({ title: 'All Orders' });
const mockProducts = ref([]);
const progressbarMdl =ref('33%')
const progressNewMdl= ref ('66%')
const progressNewMdlmodal= ref ('99%')
const dialogVisible = ref(false);
const customer_name = ref();
// Function to open the dialog
const openDialog = async (id:any) => {
    try {
        const formData = {
            id:id,  
        };
        console.log("YE HAI CAT2",formData);
        const response = await axios.post('api/order_status/', formData);
        console.log("YE HAI RESPONSE",response.data.status)
        if(response.data.status === 'Pending'){
            progressNewMdlmodal.value = '0%'
        }
        else if(response.data.status === 'Confirmed' || response.data.status === 'Out for delivery'){
            progressNewMdlmodal.value = '66%'
        }
        else if(response.data.status === 'Delivered'){
            progressNewMdlmodal.value = '99%'
        }
        else{
            progressNewMdlmodal.value = '99%'
        }
        dialogVisible.value = true;
    } catch (error) {
        console.error('API error:', error);
        
    }
  
};

// Function to close the dialog
const closeDialog = () => {
  dialogVisible.value = false;
};
const breadcrumbs = ref([
    {
        text: 'Order List',
        disabled: true,
        href: '#'
    }
]);
const getOrderDetails = async () => {
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
        console.log("YE HAI ORDER DETAILS SUBMIT DATA",formData);
        const response = await axios.post('api/customers/order_details/', formData);
        const items = response.data.menu;
        console.log("CHK MY BABY&",response.data.menu);
        console.log("CHK MY BABY & user",response.data.customer_name);
        customer_name.value = response.data.customer_name,
        mockProducts.value = items.map((item: any) => ({
            id: item.id,
            status: item.status,
            items: item.total_item_count,
            waiter:`${item.staff ? `${item.staff.first_name || 'N/A'} ${item.staff.last_name || 'N/A'}` : 'N/A'}`,
            total:item.order_total,
            item_data:item.items,
            date:item.created_at
        }));
        console.log(mockProducts.value);
        console.log("YE HAI CAT2",items)
    } catch (error) {
        console.error('API error:', error);
        
    }
}
const deleteOrder = async (id:any) => {
    try {
        const formData = {
            id:id,  
        };
        console.log("YE HAI CAT2",formData);
        const response = await axios.post('api/customers/delete_orders/', formData);
        getOrderDetails();
    } catch (error) {
        console.error('API error:', error);
        if (error.response && error.response.data) {
            localStorage.removeItem('order_id');
            errorMsg.value = error.response.data.error;
            setTimeout(() => {
                errorMsg.value = ''
            }, 5000);
        }
        
    }
}
const editOrder = async (id:any) => {
    const parts = window.location.href.split('/');
    const token = parts[parts.length - 2];
    const table = window.location.href.split('/').pop();
    console.log('check the id come', id);
    localStorage.setItem('order_id', id);
    try {
        const formData = {
            id: id,
        };
        console.log("YE HAI CAT2", formData);
        const response = await axios.post('api/customers/edit_order_details/', formData);
        router.push(`/vlocator/menu/${table}/${response.data}`);
    } catch (error) {
        console.error('API error:', error);
        if (error.response && error.response.data) {
            localStorage.removeItem('order_id');
            errorMsg.value = error.response.data.error;
            setTimeout(() => {
                errorMsg.value = ''
            }, 5000);
        }
    }
}
const removeOrderIdAndNavigate =()=> {
      localStorage.removeItem('order_id');
    }

</script>

<template>
    <main>
        <v-card class="bg-lightprimary elevation-0 rounded-md mb-8">
            <div class="px-8 py-8 py-sm-0">
                <div class="d-block d-sm-flex justify-space-between align-center">
                    <div class="d-sm-left text-center">
                        <h3 class="text-h3 text-start mb-sm-2 mb-5 textPrimary w-100 d-block">Hi {{ customer_name }}</h3>
                        <!-- <p class="d-block  font-weight-regular mt-2 text-center text-sm-left" style="width:100%;"><router-link :to="`/vlocator/menu/${Rtoken}/${tabs}`" class="text-primary">Menu</router-link></p> -->
                        <v-btn variant="flat" @click="removeOrderIdAndNavigate"  :to ="`/vlocator/menu/${Rtoken}/${tabs}`" color="primary"> <ArrowLeftIcon size="15" class="me-1"/>Back to Menu</v-btn>
                    </div>
                    <div class="d-none py-0 d-sm-block overflow-hidden">
                        <div class="mb-n16 mt-3">
                            <img src="@/assets/images/backgrounds/Customerl.png" alt="breadcrumb" width="250" />
                        </div>
                    </div>
                </div>
            </div>
        </v-card>
        
        <p class="text-error" v-if="errorMsg">{{errorMsg}}</p>
            <v-tabs v-model="tab" color="primary">
                <v-tab value="one">Current Order</v-tab>
                <v-tab value="two">My Orders</v-tab>
            </v-tabs>
            <v-divider></v-divider>
        <v-card-text class="pa-0  mt-4 rounded-md">
            <v-col cols="12">
                <div class="">
                    <span class="text-primary text-h5 mb-4 d-block">Order Details</span>    
                </div>
            </v-col>
            <v-window v-model="tab">
                
                <v-window-item value="one">
                    
                    <v-row>
                        <!-- Col-Loop-Start -->
                        <template v-if="mockProducts.length > 0">
                            <v-col cols="12" lg="4" md="6" v-for="product in mockProducts" :key="product.id">
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
                                                            <h3 class="text-h6 mb-1">Order No #{{ product.id }}</h3>
                                                            <router-link @click="removeOrderIdAndNavigate" :to = "`/vlocator/menu/${Rtoken}/${tabs}`" class="text-primary linkMenuView d-flex align-center">View Menu <ArrowRightIcon size="15"/></router-link>
                                                        </div>
                                                    </div>
                                                </v-col>
                                                <v-col cols="auto" class="text-right">
                                                    
                                                        
                                                        <v-chip size="small" color="light" class="mb-1" @click="openDialog(product.id)">
                                                            Status
                                                            <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                                                <g id="SVGRepo_iconCarrier">
                                                                <path d="M7 17L17 7M17 7H8M17 7V16" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                </g>
                                                            </svg>
                                                            </v-chip>
                                                            <!-- <a href="javascript:void(0);" v-bind="props" class="text-primary linkMenuView d-flex align-center">Status <ArrowRightIcon size="15"/></a> -->
                                                        
                                                        <v-dialog width="800" v-model="dialogVisible">
                                                        <template v-if="dialogVisible">
                                                            <v-card>
                                                            <v-card-text>
                                                                <div class="">
                                                                    <h2 class="text-h5 customTextH5 mb-5">Order No #{{ product.id }}</h2>
                                                                    <div class="pt-5">
                                                                        <div class="progress-items-container my-3">
                                                                            <div class="progress-bar-container" id="progress-bar-container" >
                                                                                <div class="progress-bar" id="progress-bar"  :style="{'width': progressNewMdlmodal}"></div>
                                                                                <input hidden v-model="progressNewMdlmodal"/>
                                                                            </div>
                                                                            <div class="progress-item-main active">
                                                                                <div class="progress-item ">
                                                                                    <HourglassHighIcon size="18" class="unActiveIcon"/>
                                                                                    <CheckIcon size="18" class="activeIcon"/>
                                                                                </div>
                                                                                <span class="titleSpanTl mt-2 d-block text-subtitle-1 font-weight-medium">Pending</span>
                                                                            </div>
                                                                            <div class="progress-item-main" :class="progressNewMdlmodal >='33%' ? 'active':''">
                                                                                <div class="progress-item">
                                                                                    <ChecklistIcon size="18" class="unActiveIcon"/>
                                                                                    <CheckIcon size="18" class="activeIcon"/>
                                                                                </div>
                                                                                <span class="titleSpanTl mt-2 d-block text-subtitle-1 font-weight-medium">Confirmed</span>
                                                                            </div>
                                                                            <div class="progress-item-main" :class="progressNewMdlmodal >='66%' ? 'active':''">
                                                                                <div class="progress-item">
                                                                                    <GrillIcon size="18" class="unActiveIcon"/>
                                                                                    <CheckIcon size="18" class="activeIcon"/>
                                                                                </div>
                                                                                <span class="titleSpanTl mt-2 d-block text-subtitle-1 font-weight-medium">Cooking</span>
                                                                            </div>
                                                                            <div class="progress-item-main" :class="progressNewMdlmodal >='99%' ? 'active':''">
                                                                                <div class="progress-item">
                                                                                    <UserCheckIcon size="18" class="unActiveIcon"/>
                                                                                    <CheckIcon size="18" class="activeIcon"/>
                                                                                </div>
                                                                                <span class="titleSpanTl mt-2 d-block text-subtitle-1 font-weight-medium">Delivered</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </v-card-text>

                                                            <v-card-actions>
                                                                <v-spacer></v-spacer>

                                                                <v-btn class="text-error"
                                                                text="Close Dialog"
                                                                @click="closeDialog"
                                                                ></v-btn>
                                                            </v-card-actions>
                                                            </v-card>
                                                        </template>
                                                    </v-dialog>
                                                    <!-- <v-chip size="small" color="light"  class="mb-1">HI {{ product.status}}</v-chip> -->
                                                </v-col>
                                            </v-row>
                                        </div>
                                    </v-card-header>
                                    <v-card-items >
                                        <div class="cardItmsCstm pa-3 pt-5 border-bottom-cstm">
                                            <ul class="listingItemsCstm pb-1 mb-3">
                                                <li v-for="itemData in product.item_data" :key="itemData.id" >
                                                    <span class="imageListCm"><img src="@/assets/images/locator/checked.png"></span>
                                                    <span class="contentListCm">
                                                        <span class="text-medium-emphasis me-1 d-inline-block">{{ itemData.quantity }} x</span> {{itemData.item.dish_name}}
                                                    </span>
                                                </li>
                                            </ul>
                                            <v-row>
                                                <v-col cols="col">
                                                    <p class="text-body-2">{{ product.date }}</p>
                                                </v-col>
                                                <v-col cols="auto">
                                                    <h5 class="text-h6">${{ product.total }}</h5>
                                                </v-col>
                                            </v-row>
                                        </div>
                                    </v-card-items>
                                    <v-card-footer>
                                        <div class="pa-3">
                                            <v-row>
                                                <v-col cols="col">
                                                    <v-btn @click="editOrder(product.id)" size="small" color="secondary" ><EditIcon size="15" class="me-1"/>Edit</v-btn>
                                                </v-col>
                                                <v-col cols="auto">
                                                    <v-btn @click="deleteOrder(product.id)" size="small" color="error"><TrashIcon size="15" class="me-1"/>Delete</v-btn>
                                                </v-col>
                                            </v-row>
                                        </div>
                                    </v-card-footer>
                                </v-card>
                            </v-col> 
                        </template>
                        <template v-else>
                            <v-col cols="12">
                                <p class="text-center text-h6 font-weight-regular">No Current Order Yet</p>
                            </v-col>
                        </template>
                        <!-- Col-Loop-End -->
                    </v-row>
                    <!-- <v-col cols="12">
                        <div class="">
                            <span class="text-primary text-h5">Order Details</span>    
                        </div>
                    </v-col> -->
                    <!-- <v-card variant="outline" class="bg-lightprimary mt-7" v-for="product in mockProducts" :key="product.id">
                        <v-card-text class="pt-0 pa-3">
                            <div class="d-flex align-center gap-2 justify-end actionButtonStyle mb-2 ">
                                <v-tooltip text="Edit">
                                    <template v-slot:activator="{ props }">
                                        <v-btn icon flat size="small" class="mt-n6" v-bind="props"
                                        @click="editOrder(product.id)"><PencilIcon stroke-width="1.5" size="20" class="text-primary"
                                        /></v-btn>
                                    </template>
                                </v-tooltip>
                                <v-tooltip text="Delete">
                                    <template v-slot:activator="{ props }">
                                        <v-btn icon flat size="small" class="mt-n6" v-bind="props"
                                            @click="deleteOrder(product.id)"><TrashIcon stroke-width="1.5" size="20" class="text-error"
                                        /></v-btn>
                                    </template>
                                </v-tooltip>
                            </div>
                            <v-row class="gx-3">
                                <v-col cols="6" lg="3" md="3">
                                    <div class="bg-primary rounded px-4 py-3 text-center">
                                        <span class="  ">Order No : <span class="font-weight-semibold">#{{product.id}}</span></span>    
                                    </div>
                                </v-col>
                                <v-col cols="6" lg="3" md="3">
                                    <div class="bg-primary rounded px-4 py-3 text-center">
                                        <span class="  ">Status : <span class="font-weight-semibold">{{product.status}}</span></span>    
                                    </div>
                                </v-col>
                                <v-col cols="6" lg="3" md="3">
                                    <div class="bg-primary rounded px-4 py-3 text-center">
                                        <span class="">Items : <span class="font-weight-semibold">{{ product.items }}</span></span>    
                                    </div>
                                </v-col>
                                <v-col cols="6" lg="3" md="3">
                                    <div class="bg-primary rounded px-4 py-3 text-center">
                                        <span class="">Waiter : <span class="font-weight-semibold">{{ product.waiter }}</span></span>    
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card> -->
                </v-window-item>

                <v-window-item value="two">
                    <v-card elevation="10">
                        <v-card-text>
                            <EditableCustomer />
                        </v-card-text>
                    </v-card>
                </v-window-item>
            </v-window>
        </v-card-text>
    </main>
    <!-- <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb> -->
   
</template>
<style scoped>
.progress-items-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 96px;
  position: relative;
}

.progress-bar {
  background-color: #40b40f;
  width: 0%;
  height: 2px;
  z-index: -1;
  transition: 400ms all ease;
}

.progress-bar-container {
    content: "";
    position: absolute;
    background-color: #2c3036;
    width: calc(100% - 30px);
    height: 2px;
    z-index: -1;
    left: 10px;
    right: 10px;
    top: calc(50% - 12px);
    transform: translateY(-50%);
}
.progress-item-main {
    text-align: center;
}
.progress-item {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #2c3036;
  /* border: 2px solid #2c3036; */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 300ms all ease;
  position: relative;
  margin:0 auto;
}
.progress-item svg {
    transition: 300ms all ease;
}
.progress-item-main.active .progress-item  {
  /* border-color: #40b40f; */
  transform: scale(1.1);
  background-color: #40b40f;
}
.progress-item-main.active .unActiveIcon,
.activeIcon{
    display: none;
}
.progress-item-main.active .activeIcon,
.unActiveIcon{
    display: inline-block;
}
.progress-item-main.active .progress-item svg {
    color: #fff;
}
.progress-item-main.active .titleSpanTl{
    color: #40b40f;
}
.progress-item p {
  font-size: 24px;
  color: #ffffff;
  font-weight: 600;
  opacity: 0.7;
}

.progress-item .fa-solid {
  font-size: 24px;
  color: #ffffff;
  transition: 400ms all ease;
}

.progress-item.active .fa-solid {
    animation: zoom 1s;
    animation-delay: .3s;
}
@keyframes zoom {
    0%{
      scale: 1;
    }

    50%{
      scale: 1.2;
    }
    
    100% {
      scale: 1;
    }
}
@media (max-width:767px){
    .progress-items-container{
        gap: 70px;
    }
}
@media (max-width:575px){
    .progress-items-container {
        gap: 15px;
    }
    .titleSpanTl.text-subtitle-1 {
        font-size: 0.675rem !important;
    }
    .progress-item {
        width: 27px;
        height: 27px;
    }
    .progress-item svg {
        width: 15px;
        height: 15px;
    }
    .text-h5.customTextH5 {
        font-size: 1rem !important;
    }
}
</style>