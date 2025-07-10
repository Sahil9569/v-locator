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

onMounted(() => {
    // store.fetchContacts();
    staffDetails();
    const t = localStorage.getItem('res_token');
    console.log("OOOOO BHAI MARO MUJHE ",t)
    if (t !== null) {
        pass_token.value = t;
    }
    // stafforderDetails();
});
const getContacts: any = computed(() => {
    return store.contacts;
});

const search = ref('');
const validForm = ref()
const dialog2 = ref(false)
const dialogOrder = ref(false)
const customerName = ref()
const customerTip = ref()
const desserts = ref();
const totalOrder = ref('')
const todayOrder = ref('')
const name = ref('')
const email = ref('')
const number = ref('')
const address = ref('')
const role = ref('')
const pass_token = ref('')

//Methods
const filteredList = computed(() => {
    if (!Array.isArray(desserts.value)) return [];
    return desserts.value.filter((user: any) => {
        return user.customer.toLowerCase().includes(search.value.toLowerCase());
    });
});

const tab = ref(null);
const items = shallowRef([
    { tab: 'Profile', icon: UserCircleIcon, href: '/apps/user/profile' },
    { tab: 'Followers', icon: HeartIcon, href: '/apps/user/profile/followers' },
    { tab: 'Friends', icon: UsersIcon, href: '/apps/user/profile/friends' },
    { tab: 'Gallery', icon: PhotoIcon, href: '/apps/user/profile/gallery' }
]);

const staffDetails = async () => {
    console.log("Order LIST API CALL")
    try {
        const parts = window.location.href.split('/');
        const token = parts[parts.length - 2];
        const staff_id = window.location.href.split('/').pop(); 
        
        const formData = {
            token:token,
            staff_id:staff_id,
        };
        const response = await axios.post('api/staff/staff_details/',formData);
        console.log('Coupans API response:', response.data);
        if (response.data) {
            totalOrder.value = response.data.total_ord
            todayOrder.value = response.data.today_ord
            name.value = response.data.staff.user.first_name+' '+response.data.staff.user.last_name
            email.value = response.data.staff.user.email
            role.value = response.data.staff.role
            number.value = response.data.staff.phone
            address.value = response.data.staff.add1+' '+response.data.staff.add2+','+response.data.staff.city+' '+response.data.staff.state+','+response.data.staff.country

            const updatedData = response.data.orders.map((item:any,index:any) => ({   
                id:item.id,
                index:index,
                customer:item.c_details.user.first_name+' '+item.c_details.user.last_name,
                date:item.created_at,
                total:item.order_total
                }));
                // Update the desserts ref with the new mapped data
                desserts.value = updatedData;
                console.log("HEllo WORLD",desserts.value)
        }else{
            console.log("First Error")
        }
    } catch (error) {
        console.error('API error:', error);
        
    }
}  
const allOrder = () => {
    staffDetails();
};
const todayOrderFun = async () => {
    console.log("Order LIST API CALL")
    try {
        const parts = window.location.href.split('/');
        const token = parts[parts.length - 2];
        const staff_id = window.location.href.split('/').pop(); 
        
        const formData = {
            token:token,
            staff_id:staff_id,
            today:'yes',
        };
        const response = await axios.post('api/staff/staff_details/',formData);
        console.log('Coupans API response:', response.data);
        if (response.data) {
            totalOrder.value = response.data.total_ord
            todayOrder.value = response.data.today_ord
            name.value = response.data.staff.user.first_name+' '+response.data.staff.user.last_name
            email.value = response.data.staff.user.email
            role.value = response.data.staff.role
            number.value = response.data.staff.phone
            address.value = response.data.staff.add1+' '+response.data.staff.add2+','+response.data.staff.city+' '+response.data.staff.state+','+response.data.staff.country

            const updatedData = response.data.orders.map((item:any,index:any) => ({   
                id:item.id,
                index:index,
                customer:item.c_details.user.first_name+' '+item.c_details.user.last_name,
                date:item.created_at,
                total:item.order_total
                }));
                // Update the desserts ref with the new mapped data
                desserts.value = updatedData;
                console.log("HEllo WORLD",desserts.value)
        }else{
            console.log("First Error")
        }
    } catch (error) {
        console.error('API error:', error);
        
    }
};
</script>

<template>
    <v-card elevation="10" class="overflow-hidden">
        <img :src="profileBg" alt="profile" class="w-100" />
        <div>
            <v-row class="mt-1 align-end">
                <v-col cols="12" lg="4" sm="12" class="order-sm-second" >
                    <div class="px-4 py-1" v-if="role === 'Service Staff'">
                        <v-row class="justify-center">
                            <v-col cols="6" class="text-center mb-2">
                                <h4 class="text-h5 mb-2 text-primary" @click="todayOrderFun" style="cursor:pointer">{{ todayOrder }}</h4>
                                <h6 class="text-subtitle-1 font-weight-regular">Today Order Served</h6>
                            </v-col>
                            <v-col cols="6" class="text-center mb-2">
                                <h4 class="text-h5 mb-2">$100</h4>
                                <h6 class="text-subtitle-1 font-weight-regular">Today Tip</h6>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
                <v-col cols="12" lg="4" sm="12" class="d-flex justify-center order-sml-first mb-2">
                    <div class="text-center top-spacer">
                        <div class="avatar-border">
                            <v-avatar size="100" class="userImage">
                                <img :src="UserImage" width="100" alt="Mathew" />
                            </v-avatar>
                        </div>
                        <h5 class="text-h5 mt-3">{{name}}</h5>
                        <v-chip color="success" size="small">{{role}}</v-chip>
                    </div>
                </v-col>
                <v-col cols="12" lg="4" sm="12" class=" order-sm-third" >
                    <div class="px-4 py-1" v-if="role === 'Service Staff'">
                        <v-row class="justify-center">
                            <v-col cols="6" class="text-center mb-2">
                                <h4 class="text-h5 mb-2 text-primary" @click="allOrder" style="cursor:pointer">{{totalOrder}}</h4>
                                <h6 class="text-subtitle-1 font-weight-regular">Total Order Served</h6>
                            </v-col>
                            <v-col cols="6" class="text-center mb-2">
                                <h4 class="text-h5 mb-2">$5k</h4>
                                <h6 class="text-subtitle-1 font-weight-regular">Total Tip</h6>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
            </v-row>
        </div>
    </v-card>
    <v-row class="mt-6">
        <v-col cols="12" lg="4">
            <v-card elevation="10" class="h-100 bg-primary">
                <v-card-item class="pa-3 h-100">
                    <div class="d-flex gap-3">
                    <MailIcon size="21" style="min-width:20px;"/>
                    <span class="text-subtitle-1">{{email}}</span>
                </div>
                </v-card-item>
            </v-card>
        </v-col>
        <v-col cols="12" lg="4">
            <v-card elevation="10" class="h-100 bg-primary">
                <v-card-item class="pa-3 h-100">
                    <div class="d-flex gap-3">
                        <PhoneIcon size="21" style="min-width:20px;"/>
                        <span class="text-subtitle-1">{{number}}</span>
                    </div>
                </v-card-item>
            </v-card>
        </v-col>
        <v-col cols="12" lg="4">
            <v-card elevation="10" class="h-100 bg-primary">
                <v-card-item class="pa-3 h-100">
                    <div class="d-flex gap-3">
                        <MapPinIcon size="21" style="min-width:20px;"/>
                        <span class="text-subtitle-1">{{address}}</span>
                    </div>
                </v-card-item>
            </v-card>
            
        </v-col>
    </v-row>
    <v-row class="mt-6">
        <v-col cols="12">
            <v-card variant="outlined">
                <v-card-item class="pa-0">
                    <v-row>
                        <v-col cols="12" md="6">
                            <div class="ma-3 mb-0">
                                <v-text-field density="compact" v-model="search" label="Search" hide-details variant="outlined"></v-text-field>
                            </div>
                        </v-col>
                        <v-col cols="12"  md="6" class="text-md-end">
                            <v-dialog v-model="dialog2" max-width="700">
                                <!-- <template v-slot:activator="{ props }">
                                    <div class="ma-3">
                                        <v-btn color="primary" v-bind="props" flat class="ml-auto">
                                            <v-icon class="mr-2">mdi-plus</v-icon>Add Manual Tip
                                        </v-btn>
                                    </div>
                                </template> -->
                                <v-card>
                                    <!-- <v-card-title class="pa-4 bg-primary">
                                        <span class="title text-white">Add Manual Tip</span>
                                    </v-card-title> -->

                                    <v-card-text >
                                        <v-form ref="form" v-model="validForm" lazy-validation>
                                            <v-row>
                                                <v-col cols="12">
                                                    <v-text-field
                                                        variant="outlined"
                                                        density="compact"
                                                        hide-details
                                                        v-model="customerName"
                                                        label="Customer Name"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12">
                                                    <v-text-field
                                                        variant="outlined"
                                                        density="compact"
                                                        hide-details
                                                        v-model="customerTip"
                                                        prepend-inner-icon="mdi-currency-usd"
                                                        label="Tip Price"
                                                        type="number"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-form>
                                    </v-card-text>

                                    <v-card-actions class="pa-4">
                                        <v-spacer></v-spacer>
                                        <v-btn color="error" @click="dialog2 = false">Cancel</v-btn>
                                        <v-btn
                                            color="primary"
                                            :disabled="customerName == '' || customerTip == ''"
                                            variant="flat"
                                            >Save</v-btn
                                        >
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-col>
                    </v-row>
                    <v-table class="mt-5">
                        <thead>
                            <tr>
                                <th class="text-subtitle-1 font-weight-bold">Sr.NO.</th>
                                <th class="text-subtitle-1 font-weight-bold">Order</th>
                                <th class="text-subtitle-1 font-weight-bold">Customer Name</th>
                                <th class="text-subtitle-1 font-weight-bold">Date</th>
                                <th class="text-subtitle-1 font-weight-bold">Order Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in filteredList" :key="item.id">
                                <td class="text-subtitle-1">{{ item.index + 1 }}</td>                                
                                <td>
                                <RouterLink :to="'/singleOrderDetail/' + pass_token + '/' + item.id">
                                    <div class="d-flex py-4">
                                        <div style="cursor:pointer">
                                            <span class="text-subtitle-1 d-block mt-1 text-primary">#{{ item.id }}</span>
                                        </div>
                                    </div>
                                </RouterLink>
                                </td>
                                <td class="text-subtitle-1">{{ item.customer }}</td>
                                <td>
                                    <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.date }}</span>
                                </td>
                                <td>
                                    <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.total }}</span>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
    
</template>
<style lang="scss">
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
