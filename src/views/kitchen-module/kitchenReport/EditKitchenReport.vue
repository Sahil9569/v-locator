<script setup lang="ts">
import { ref,onMounted} from 'vue';
import dailyOrderStatus from './dailyOrderStatus.vue'
// import { topCardsData, customerReportData } from '@/_mockApis/components/KitchenDashboard/index';
// import customerReport from './customerReport.vue';
import {UsersIcon, UserCheckIcon, UserOffIcon, ThumbUpIcon} from 'vue-tabler-icons';
import { getPrimary, getLightPrimary, getSecondary } from '@/utils/UpdateColors'; 
    


import axios from 'axios'; // Make sure to install Axios in your project
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL

import card_icon1 from "@/assets/images/svgs/icon-user-male.svg"
import card_icon2 from "@/assets/images/backgrounds/Kitchen.png"
import card_icon3 from "@/assets/images/svgs/icon-mailbox.svg"
import card_icon4 from "@/assets/images/svgs/icon-favorites.svg"
import card_icon5 from "@/assets/images/svgs/icon-speech-bubble.svg"
import card_icon6 from "@/assets/images/svgs/icon-connect.svg"

const topCardsData = ref([
    {
        img: card_icon1,
        title: "All Orders",
        number: "0",
        bgcolor: "lightprimary",
        textcolor: "primary"
    },
    {
        img: card_icon2,
        title: "New Order",
        number: "0",
        bgcolor: "lightwarning",
        textcolor: "warning"
    },
    {
        img: card_icon3,
        title: "Confirmed Order",
        number: "0",
        bgcolor: "lightsecondary",
        textcolor: "secondary"
    },
    {
        img: card_icon5,
        title: "Delivered Order",
        number: "0",
        bgcolor: "lightsuccess",
        textcolor: "success"
    },
    {
        img: card_icon6,
        title: "Complete Order",
        number: "0",
        bgcolor: "lightprimary",
        textcolor: "primary"
    }
]);

onMounted(() => {
    ordersup_admincount()
});

const ordersup_admincount = async () => {
    try {
        const token = localStorage.getItem('res_token');
        const authToken = localStorage.getItem('authToken');
        const response = await axios.post('api/kitchen/super_count/',{'token':token,'auth':authToken});
        console.log('response is back of latest order ---', response.data);
        const incoming_data = response.data; 
        if (incoming_data) {
            console.log('response is coming ---', incoming_data);
            if (topCardsData.value[0] !== undefined) {
                topCardsData.value[0].number = response.data.all_order.toString();
            }
            if (topCardsData.value[1] !== undefined) {
                topCardsData.value[1].number = response.data.new_Order.toString();
            }
            if (topCardsData.value[2] !== undefined) {
                topCardsData.value[2].number = response.data.confirm_Order.toString();
            }
            if (topCardsData.value[3] !== undefined) {
                topCardsData.value[3].number = response.data.deliverd_Order.toString();
            }
            if (topCardsData.value[4] !== undefined) {
                topCardsData.value[4].number = response.data.complete_Order.toString();
            }
        }else{
            console.log("First Error")
        }
    } catch (error) {
        console.error('API error:', error);
        
    }
}
    
// const fetchtopCardsData = async () => {
//     try {
//         const token = localStorage.getItem('authToken');
//         const response = await axios.post('api/kitchen/fetch_kitchen_data/',{'token':token});
//         if (topCardsData.value[0] !== undefined) {
//             topCardsData.value[0].number = response.data.all_order.toString();
//         }
//         if (topCardsData.value[1] !== undefined) {
//             topCardsData.value[1].number = response.data.new_order.toString();
//         }
//         if (topCardsData.value[2] !== undefined) {
//             topCardsData.value[2].number = response.data.confirmed_order.toString();
//         }
//         if (topCardsData.value[3] !== undefined) {
//             topCardsData.value[3].number = response.data.complete_order.toString();
//         }
//         if (topCardsData.value[4] !== undefined) {
//             topCardsData.value[4].number = response.data.delivered_order.toString();
//         }
//     } catch (error) {
//         console.error('API error:', error);
//     }
// };
</script>

<template>
    <v-row class="">
        <v-col cols="12" md="6">
            <dailyOrderStatus />
        </v-col>
        <v-col cols="12" md="6">
            <v-row class="">
                <v-col cols="6" v-for="card in topCardsData" :key="card.title">
                    <div :class="'text-decoration-none d-flex align-center justify-center text-center rounded-md pa-6  bg-' + card.bgcolor" >
                        <div :class="'bg-' + card.bgcolor">
                            <ShoppingCartIcon v-if="card.title === 'All Orders'" class="text-primary" stroke-width="1.5" size="32"/>
                            <ShoppingCartPlusIcon v-if="card.title === 'New Order'" class="text-warning" stroke-width="1.5" size="32"/>
                            <CircleCheckIcon v-if="card.title === 'Confirmed Order'" class="text-secondary" stroke-width="1.5" size="32"/>
                            <ToolsKitchenIcon v-if="card.title === 'Cooking Order'" class="text-error" stroke-width="1.5" size="32"/>
                            <TruckLoadingIcon v-if="card.title === 'Delivered Order'" class="text-success  " stroke-width="1.5" size="32"/>
                            <ChecklistIcon v-if="card.title === 'Complete Order'" class="text-primary" stroke-width="1.5" size="32"/>

                            
                            <div :class="'text-subtitle-1 text-capitalize font-weight-bold mt-3 text-' + card.textcolor" v-text="card.title"></div>
                            <h4 :class="'text-h4 mt-1 text-' + card.textcolor" v-text="card.number"></h4>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-col>
        <!-- <v-col cols="12" md="6">
            <v-row class="mt-3">
                <v-col cols="6" v-for="card in customerReportData" :key="card.title">
                    <div
                        :class="'text-decoration-none d-flex align-center justify-center text-center rounded-md pa-6  bg-' + card.bgcolor"
                    >
                        <div :class="'bg-' + card.bgcolor">
                            <UsersIcon v-if="card.title === 'Total Customers'" class="text-primary" stroke-width="1.5" size="32"/>
                            <UserCheckIcon v-if="card.title === 'Active Customers'" class="text-warning" stroke-width="1.5" size="32"/>
                            <UserOffIcon v-if="card.title === 'Drop-Off Customers'" class="text-secondary" stroke-width="1.5" size="32"/>
                            <ThumbUpIcon v-if="card.title === 'Peek Feedback'" class="text-success" stroke-width="1.5" size="32"/>

                            
                            <div :class="'text-subtitle-1 text-capitalize font-weight-bold mt-3 text-' + card.textcolor" v-text="card.title"></div>
                            <h4 :class="'text-h4 mt-1 text-' + card.textcolor" v-text="card.number"></h4>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-col> -->
        <!-- <v-col cols="12" md="6">
            <customerReport/>
        </v-col> -->
    </v-row>
</template>