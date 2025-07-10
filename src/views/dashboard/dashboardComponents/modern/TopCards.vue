<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
// import { topCardsData } from '@/_mockApis/components/dashboard/modernData';
import axios from 'axios'; // Make sure to install Axios in your project
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL
import card_icon1 from "@/assets/images/svgs/icon-user-male.svg"
import card_icon2 from "@/assets/images/backgrounds/Kitchen.png"
import card_icon3 from "@/assets/images/svgs/icon-mailbox.svg"
import card_icon4 from "@/assets/images/svgs/icon-favorites.svg"
import card_icon5 from "@/assets/images/svgs/icon-speech-bubble.svg"
import card_icon6 from "@/assets/images/svgs/icon-connect.svg"
const res_type = localStorage.getItem('res_type')
const seri_chk = ref('')
const user_token = localStorage.getItem('res_token')
const qrclick = ref('')
const dialogQr = ref(false);
const topCardsData = ref([
    {
        img: card_icon1,
        title: "All Staff",
        number: "0",
        bgcolor: "lightprimary",
        textcolor: "primary",
        cardUrl:"staff",
    },
    {
        img: card_icon2,
        title: "All Kitchen",
        number: "0",
        bgcolor: "lightwarning",
        textcolor: "warning",
        cardUrl:"kitchen",
    },
    {
        img: card_icon5,
        title: "All Customer",
        number: "0",
        bgcolor: "lightsuccess",
        textcolor: "success",
        cardUrl:"restaurantCustomerList",
    },
    {
        img: card_icon4,
        title: "Today Sell",
        number: "0k",
        bgcolor: "lighterror",
        textcolor: "error",
        cardUrl:"dashboards",
    },
    {
        img: card_icon3,
        title: "Today Order",
        number: "0",
        bgcolor: "lightsecondary",
        textcolor: "secondary",
        cardUrl:"pending-order",
    },
    {
        img: card_icon6,
        title: "Total Completed",
        number: "0",
        bgcolor: "lightprimary",
        textcolor: "primary",
        cardUrl:"complete-order",
    }
    // Other card objects...
]);

onMounted(() => {
    
    fetchtopCardsData();
});


const fetchtopCardsData = async () => {
    console.log("Kitchen LIST API CALL");
    try {
        const token = localStorage.getItem('authToken');
        const res = localStorage.getItem('res_token');
        const response = await axios.post('api/kitchen/fetch_data/',{'token':token,'res_token':res});
        console.log('Staff all kitchen API response:', response.data);
        if (topCardsData.value[0] !== undefined) {
            topCardsData.value[0].number = response.data.staff_count.toString();
        }
        if (topCardsData.value[1] !== undefined) {
            topCardsData.value[1].number = response.data.kitchen_count.toString();
        }
        if (topCardsData.value[4] !== undefined) {
            topCardsData.value[4].number = response.data.order_count.toString();
        }
        if (topCardsData.value[2] !== undefined) {
            topCardsData.value[2].number = response.data.customer_count.toString();
        }
        if (topCardsData.value[5] !== undefined) {
            topCardsData.value[5].number = response.data.delivered_count.toString();
        }
        if (topCardsData.value[3] !== undefined) {
            topCardsData.value[3].number = '$' + response.data.today_sales.toString();
        }

        if (response.data.Table_qrcode) {
            qrclick.value = response.data.Table_qrcode[0].qr_base64
        }
        if (response.data.Stripe_check){
            seri_chk.value = response.data.Stripe_check
        }
    } catch (error) {
        console.error('API error:', error);
    }
};
</script>


<template>
    <!-- <v-row>
        <v-col cols="12" lg="2" md="4" sm="4" v-for="card in topCardsData" :key="card.title">
            <router-link :to="'/'+`${card.cardUrl}`+'/' + user_token" :class="'text-decoration-none d-flex align-center justify-center text-center rounded-md pa-6  bg-' + card.bgcolor">
                <div :class="'bg-' + card.bgcolor">
                    <img :src="card.img" alt="icon" />
                    <div :class="'text-subtitle-1 text-capitalize font-weight-bold mt-3 text-' + card.textcolor" v-text="card.title"></div>
                    <h4 :class="'text-h4 mt-1 text-' + card.textcolor" v-text="card.number"></h4>
                </div>
            </router-link>
        </v-col>
    </v-row> -->
    <v-row class="justify-end">
        <v-col cols="auto">
            <RouterLink :to="`/payment-setup/${user_token}`" class="text-decoration-none">
                <v-alert class="my-3"  v-if="seri_chk === 'Stripe_Not_connected'"
                    type="warning" ><span style="color: white;"> Please connect to stripe in order to receive orders.</span>
                </v-alert>
            </RouterLink>
        </v-col>
    </v-row>
  
    <v-row>
        <v-col cols="12" lg="2" md="4" sm="4" v-for="(card, index) in topCardsData" :key="card.title">
            <div v-if="index === 0 && res_type == 'Vendor'">
                <div :class="'text-decoration-none d-flex align-center justify-center text-center rounded-md pa-6 bg-' + card.bgcolor">

                  
                    <v-dialog v-model="dialogQr" max-width="500">
                            <template v-slot:activator="{ props }">
                                <div v-bind="props" flat  >
                                    <img :src="qrclick" style="max-width: 98px; filter: blur(2px);" >
                                    <div :class="'text-subtitle-1 text-capitalize font-weight-bold mt-1 text-' + card.textcolor">Your Qr Code</div>
                                </div>
                            </template>
                            <v-card>
                                <v-card-title class="pa-4 border-bottom border-primary">
                                    <img src="@/assets/images/locator/logo-dark.png" style="width:175px;">
                                </v-card-title>
                                <v-card-text class="text-center">
                                    <img :src="qrclick" style="max-width: 400px;">
                                </v-card-text>

                                <v-card-actions class="pa-4">
                                    <v-spacer></v-spacer>
                                    <v-btn color="error" @click="dialogQr = false">Cancel</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                  
                </div>
            </div>

            <div v-else>
                <router-link :to="'/'+`${card.cardUrl}`+'/' + user_token" :class="'text-decoration-none d-flex align-center justify-center text-center rounded-md pa-6 bg-' + card.bgcolor">

                    
                    <div>
                        <img :src="card.img" alt="Card Image">
                        <div :class="'text-subtitle-1 text-capitalize font-weight-bold mt-3 text-' + card.textcolor">{{ card.title }}</div>
                        <h4 :class="'text-h4 mt-1 text-' + card.textcolor">{{ card.number }}</h4>
                    </div>
                </router-link>
            </div>
        </v-col>
    </v-row>
</template>
