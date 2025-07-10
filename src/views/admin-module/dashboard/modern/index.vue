<script setup lang="ts">
/*Call Components*/
import { ref , computed, onMounted} from 'vue';
import Topcards from "../dashboardComponents/modern/TopCards.vue";
import ApexColumnChart from "../dashboardComponents/modern/ApexColumnChart.vue";
// import YearlySales from "../dashboardComponents/modern/YearlySales.vue";
import UserReview from '@/components/landingpage/section/userReview.vue';
import RecentTransactions from "../dashboardComponents/modern/RecentTransactions.vue";
import topRatedRestaurant from "../dashboardComponents/modern/topRated.vue";
import axios from 'axios'; // Make sure to install Axios in your project
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL
/*--Top cards--*/
import card_icon1 from "@/assets/images/svgs/icon-user-male.svg"
import card_icon2 from "@/assets/images/backgrounds/Kitchen.png"
import card_icon3 from "@/assets/images/svgs/icon-mailbox.svg"

const topCardsData = ref([
    {
        img: card_icon2,
        title: "Total Restaurant",
        number: "0",
        bgcolor: "lightwarning",
        textcolor: "warning"
        
    },
    {
        img: card_icon3,
        title: "Total Earning",
        number: "$0",
        bgcolor: "lightprimary",
        textcolor: "primary"
    },
    {
        img: card_icon1,
        title: "Popular Package",
        number: "Vlocator +",
        bgcolor: "lightsecondary",
        textcolor: "secondary"
    },
])

onMounted(() => {
    alladmindashboarddetails()
});

const alladmindashboarddetails = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post('api/kitchen/alladmindashboarddetails/',{'token':token});

        const incoming_data = response.data.status; 
        console.log('check data aara h ya nahi ---',response.data)
        if (incoming_data) {
            const data = response.data.status;
          
            
            if (topCardsData.value[0] !== undefined) {
                topCardsData.value[0].number = response.data.status.toString();
            }
            if (topCardsData.value[1] !== undefined) {
                topCardsData.value[1].number = '$' + response.data.dashboard_details.toString();
            }
            // if (topCardsData.value[2] !== undefined) {
            //     topCardsData.value[2].number = response.data.status.toString();
            // }
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
        <!-- Top cards -->
        
        <v-col cols="12">
            <v-row>
                <v-col cols="12" md="4" v-for="card in topCardsData" :key="card.title">
                    <div :class="'text-decoration-none d-flex align-center justify-center text-center rounded-md pa-6  bg-' + card.bgcolor">
                        <div :class="'bg-' + card.bgcolor">
                            <img :src="card.img" alt="icon" />
                            <div :class="'text-subtitle-1 text-capitalize font-weight-bold mt-3 text-' + card.textcolor" v-text="card.title"></div>
                            <h4 :class="'text-h4 mt-1 text-' + card.textcolor" v-text="card.number"></h4>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-col> 
         <v-col cols="12">
           <v-row class="mt-2">
            <v-col cols="12">
                <ApexColumnChart/>
            </v-col>
            <v-col cols="12">
                <v-row>
                    <v-col cols="12" md="12">
                        <RecentTransactions/>
                    </v-col>    
                    <v-col cols="12" md="6">
                        <YearlySales/>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12">
                <topRatedRestaurant/>
            </v-col>
            <!-- <v-col cols="12" class="mainUserCstn">
                <UserReview />
            </v-col> -->
            
           </v-row>
        </v-col>    
    </v-row>
</template>