<script setup lang="ts">
import { ref, shallowRef, computed, onMounted } from 'vue';
import { HeartIcon, PhotoIcon, PhoneIcon, UserCircleIcon, UsersIcon } from 'vue-tabler-icons';
import profileBg from '@/assets/images/backgrounds/profilebg.jpg';
import UserImage from '@/assets/images/profile/user-1.jpg';

import { useContactStore } from '@/stores/apps/contact';
import staffReport from '@/_mockApis/apps/staffReport';
// import { VTable, VPagination } from '@/_mockApis/apps/contact';
const store = useContactStore();
import axios from 'axios';
import { useRouter } from "vue-router";
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL
const loading = ref(false);


onMounted(() => {
    // store.fetchContacts();
    cusotmerDetails();
    // const t = localStorage.getItem('res_token');
    // if (t !== null) {
    //     pass_token.value = t;
    // }
    // stafforderDetails();
});
// const getContacts: any = computed(() => {
//     return store.contacts;
// });

const search = ref('');
const validForm = ref()
const dialog2 = ref(false)
const itemsPerPage = 10;
const currentPage = ref(1);


const customerTip = ref()
const desserts = ref();

const customer_name = ref('')

const role = ref('Customer')
const pass_token = ref('')
const dialogCustomize = ref(false)
const Phone_number = ref('')
const last_order_id = ref('')
const customerDetail = ref ([
    // {   
    //     id: 1,
    //     orderNumber: '1234',
    //     ItemsTotal: '3',
    //     waiterName: 'N/A',
    //     orderDate: '20-07-2021',
    //     orderStatus: 'Pending',
    //     addonList:['Addon1','Addon2','Addon3','Addon4','Addon5','Addon6','Addon7','Addon8',]
    // }, 
]);




//Methods
const filteredList = computed(() => {
    if (!Array.isArray(customerDetail.value)) return [];
    return customerDetail.value.filter((user: any) => {
        return user.waiterName.toLowerCase().includes(search.value.toLowerCase());
    });
});

const paginatedList = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredList.value.slice(start, end);
});

function deleteItem(item:any) {
    const index = customerDetail.value.indexOf(item);
    console.log("INDEX",item.id)
    // confirm('Are you sure you want to delete this item?') && customerDetail.value.splice(index, 1);
}

const cusotmerDetails = async () => {
    console.log("Order LIST API CALL")
    loading.value = true;
    try {
        const parts = window.location.href.split('/');
        const token = parts[parts.length - 2];
        const cus_id = window.location.href.split('/').pop(); 
        
        const formData = {
            token:token,
            cus_id:cus_id,
        };
        const response = await axios.post('api/staff/customer_details/',formData);
        console.log('cusotmerDetails API response:', response.data);
        if (response.data) {
            const customerna_me = `${response.data[0]?.c_details?.user?.first_name || 'N/A'} ${response.data[0]?.c_details?.user?.last_name || 'N/A'}`
            Phone_number.value = `${response.data[0].c_details?.phone || 'N/A'}`
            last_order_id.value = `${response.data[0].id || 'N/A'}`
            customer_name.value = customerna_me
            // console.log ('check the number',Phone_number)
            const updatedData = response.data.map((item:any, index:any) => {
                const quantityyyy = item.items.reduce((totalQuantity:any, d_d2:any) => {
                    return totalQuantity + d_d2.quantity;
                }, 0)
                
                const foody_image = item.items.map((d_d2:any) => {
                        return d_d2.item.base64_images;
                    });
                const addons_items = item.items.map((d_d2:any) => {
                    return d_d2?.addons[0]?.add_name;
                });

                return {
                    id: item.id,
                    table_no: item.table.id,
                    foody_image:foody_image,
                    quantity: quantityyyy,
                    addons:addons_items,
                    ItemsTotal: `${item.items && item.items.length > 0 ? item.items[0].item.dish_name : 'N/A'}`,
                    orderNumber: index,
                    waiterName: `${item.staff?.first_name || 'N/A'} ${item.staff?.last_name || 'N/A'}`,
                    orderDate: item.created_at,
                    orderStatus: item.status,
                    order_Size: item.items[0].size,
                };
            });
            console.log("after data comes WORLD",updatedData)
            customerDetail.value = updatedData;
        }else{
            console.log("First Error")
        }
    } catch (error) {
        console.error('API error:', error);
        
    }
    loading.value = false;

}  

</script>

<template>
    <v-card elevation="10" class="overflow-hidden">
        <img :src="profileBg" alt="profile" class="w-100" />
        <div>
            <v-row class="mt-1 align-end">
                
                <v-col cols="12" md="4" class="d-flex justify-center order-md-second  mb-2">
                    <div class="text-center top-spacer">
                        <div class="avatar-border">
                            <v-avatar size="100" class="userImage">
                                <img :src="UserImage" width="100" alt="Mathew" />
                            </v-avatar>
                        </div>
                        <h5 class="text-h5 mt-3">{{customer_name}}</h5>
                        <v-chip color="success" size="small">{{role}}</v-chip>
                    </div>
                </v-col>
                <v-col cols="12" md="4" class="order-md-first" >
                    <div class="px-4 py-1">
                        <v-row class="justify-center">
                            <v-col cols="12" class="text-center mb-2">
                                <h4 class="text-h5 mb-2 text-primary"> +1-{{ Phone_number }}</h4>
                                <h6 class="text-subtitle-1 font-weight-regular">Phone Number</h6>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
                <v-col cols="12" md="4" class=" order-md-third" >
                    <div class="px-4 py-1">
                        <v-row class="justify-center">
                            <v-col cols="12" class="text-center mb-2">
                                <h4 class="text-h5 mb-2 text-primary">#{{last_order_id}}</h4>
                                <h6 class="text-subtitle-1 font-weight-regular">Last Order Number</h6>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
            </v-row>
        </div>
    </v-card>
    <div>
        <div v-if="loading" class="loader-container">
            <!-- Your loader implementation here -->
            <div class="loader"></div>
        </div>
        <div v-else>
            <v-row class="mt-6">
                <v-col cols="12">
                    <v-card elevation="10">
                        <v-card-item class="pa-0">
                            <v-row>
                                <v-col cols="12" md="6" lg="4">
                                    <div class="ma-3 mb-0">
                                        <v-text-field density="compact" v-model="search" label="Search Order Number" hide-details variant="outlined"></v-text-field>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-table class="mt-5">
                                <thead>
                                    <tr>
                                        <th class="text-subtitle-1 font-weight-bold">Sr.NO.</th>
                                        <th class="text-subtitle-1 font-weight-bold">Order No</th>
                                        <th class="text-subtitle-1 font-weight-bold">Item</th>
                                        <th class="text-subtitle-1 font-weight-bold">Date</th>
                                        <th class="text-subtitle-1 font-weight-bold">Waiter</th>
                                        <th class="text-subtitle-1 font-weight-bold">Status</th>
                                        <th class="text-subtitle-1 font-weight-bold">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in customerDetail" :key="index" :currentPage="currentPage" :pageSize="10">
                                        <td class="text-subtitle-1">{{ index + 1}}</td>                                
                                        <td class="text-subtitle-1  text-primary">#{{ item.id }}</td>
                                        <td class="text-subtitle-1">{{ item.ItemsTotal }}</td>
                                        <td class="text-subtitle-1">{{ item.orderDate }}</td>
                                        <td class="text-subtitle-1">{{item.waiterName}}</td>
                                        <td class="text-subtitle-1">
                                            <v-chip v-if="item.orderStatus === 'Pending'" class="text-success bg-lightsuccess " size="small"  label>
                                            {{ item.orderStatus }}</v-chip>
                                            <v-chip v-if="item.orderStatus === 'Confirmed'" class=" text-secondary bg-lightsecondary" size="small" label>{{ item.orderStatus }}</v-chip>
                                            <v-chip v-if="item.orderStatus === 'Delivered'" class=" text-warning bg-lightwarning" size="small" label>{{ item.orderStatus }}</v-chip>
                                            <v-chip v-if="item.orderStatus === 'Completed'" class=" text-primary bg-lightprimary" size="small" label>{{ item.orderStatus }}</v-chip>
                                        </td>
                                        <td>
                                            <div class="d-flex align-center">
                                                <v-tooltip text="View">
                                                    <template v-slot:activator="{ props }">
                                                        <v-btn icon flat v-bind="props" @click="item.dialogCustomize = true"
                                                            ><EyeIcon stroke-width="1.5" size="20" class="text-primary"
                                                        /></v-btn>
                                                    </template>
                                                </v-tooltip>
                                                <v-dialog v-model="item.dialogCustomize" scrollable max-width="575">
                                                    <v-card>
                                                        <v-card-text>
                                                            <div class="topCardFood">
                                                                <div class="topTitleCard mb-4">
                                                                    <div class="d-flex justify-space-between">
                                                                        <h2 class="text-h6 font-weight-semibold mb-1">Order #{{ item.id }}</h2>
                                                                        <h2 class="text-h6 font-weight-semibold mb-1">Table no : {{item.table_no}}</h2>
                                                                    </div>
                                                                    <p class="text-subtitle-2">{{ item.orderDate }}</p>
                                                                </div>
                                                            </div>
                                                            <div class="mainFoodRow border-bottom">
                                                                <div class="foodImageCol d-flex align-center justify-center">
                                                                    <template v-if="item.foody_image">
                                                                        <img :src="item.foody_image" alt="Food Image">
                                                                    </template>
                                                                    <template v-else>
                                                                        <img src="../../assets/images/locator/v-icon.png" alt="Food Dummy Image" class="v-locator-static-img">
                                                                    </template>
                                                                </div>
                                                                <div class="foodContentCol">
                                                                    <div class="foodPriceCol">
                                                                        <h3 class="text-h6 mb-2">Food name: {{ item.ItemsTotal }}</h3>
                                                                        <h5 class="text-subtitle-1 font-weight-semibold">QTY: {{ item.quantity }}</h5>
                                                                    </div>
                                                                    <h4 class="text-subtitle-2 mb-2 d-flex">
                                                                        <span class="titleSideCrd font-weight-bold pe-2">Addon:</span> 
                                                                        <span class="contentSideCrd font-weight-medium">
                                                                            <template v-if="item.addons && item.addons.length">
                                                                                <span v-for="(addon, index) in item.addons" :key="index">
                                                                                    {{ item.quantity }} x {{ addon }}
                                                                                    <br v-if="index < item.addons.length - 1" />
                                                                                </span>
                                                                            </template>
                                                                            <template >
                                                                                No Addons
                                                                            </template>
                                                                        </span>
                                                                    </h4>
                                                                    <h4 class="text-subtitle-2  d-flex">
                                                                        <span class="titleSideCrd font-weight-bold pe-2">Size:</span> 
                                                                        <v-chip color="primary" class="v-chip-style-cstm" size="small">Small</v-chip>
                                                                    </h4>
                                                                    
                                                                </div>
                                                            </div>
                                                        </v-card-text>
                                                            <v-card-actions class="justify-end">
                                                                <v-btn color="error" size="small" variant="flat" @click="item.dialogCustomize = false">Close Dialog</v-btn>
                                                            </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <!-- <v-tooltip text="Delete">
                                                    <template v-slot:activator="{ props }">
                                                        <v-btn icon flat @click="deleteItem(item)" v-bind="props"
                                                            ><TrashIcon stroke-width="1.5" size="20" class="text-error"
                                                        /></v-btn>
                                                    </template>
                                                </v-tooltip> -->
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </v-table>
                            <v-pagination v-model="currentPage" :length="Math.ceil(filteredList.length / itemsPerPage)"
                        rounded="circle"></v-pagination>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </div>
    
</template>
<style lang="scss">

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

.avatar-border {
    background-image: linear-gradient(rgb(80, 178, 252), rgb(244, 76, 102));
    border-radius: 50%;
    width: 110px;
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    .userImage {
        border: 4px solid rgb(255, 255, 255);
    }
}

.top-spacer {
    margin-top: -95px;
}

.profiletab .v-slide-group__content {
    justify-content: end;
    .v-btn--variant-text .v-btn__overlay {
        background: transparent;
    }
}

@media (max-width: 1023px) {
    .order-sm-second {
        order: 2;
    }
    .order-sml-first {
        order: 1;
    }
    .order-sm-third {
        order: 3;
    }
    .order-sm-last {
        order: 4;
    }
}

.btn-brand-facebook {
    background-color: rgb(24, 119, 242) !important;
}

.btn-brand-twitter {
    background-color: rgb(29, 161, 242) !important;
}
.btn-brand-dribbble {
    background-color: rgb(234, 76, 137) !important;
}
.btn-brand-youtube {
    background-color: rgb(205, 32, 31) !important;
}
</style>
