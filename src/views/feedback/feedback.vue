<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
// import { StarFilledIcon } from  'vue-tabler-icons';
import { userReview } from '@/_mockApis/landingpage/lpPage';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import axios from 'axios';
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL

const rating = ref(5);
const page = ref({ title: 'Feedback' });
const desserts = ref([]);
const new_loader = ref(false);
onMounted(() => {
    fetchFeedbackList();
});

const breadcrumbs = ref([
    {
        text: 'All Feedback',
        disabled: true,
        href: '#'
    }
]);
const fetchFeedbackList = async () => {
    new_loader.value = true;
    try {
        const token = localStorage.getItem('res_token');
        const formData = {
            'token' : token
        }
        const response = await axios.post('api/orders/feedback/',formData);
        console.log('Feedback API response:', response.data);
        if (response.data) {
            new_loader.value = false;
            const updatedData = response.data.map((item:any,index:any) => ({   
                id:item.id,
                comment:item.comment,
                img:"#",
                title:item.cust.user.first_name+' '+item.cust.user.last_name,
                rating:item.rating,
                }));
                // Update the desserts ref with the new mapped data
                desserts.value = updatedData;
                console.log("HEllo WORLD",desserts.value)
        }else{
            new_loader.value = false;
            console.log("First Error")
        }
    } catch (error) {
        
        console.error('API error:', error);
        
    }
}
</script>
<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <div class="p-relative">
        <div class="logoLoader tableLoader" v-if="new_loader == true">
            <div class="LogoVInnerImg">
                <img src="@/assets/images/locator/v-icon.png" alt="logo-loader"/>
                <p class="">Please Wait...</p>
            </div>
        </div>	
        <div class="pt-sm-16 pt-10">
            <v-container class="maxWidth">
                <v-row class="justify-center">
                    <v-col cols="12" sm="8">
                        <h2 class="sectionTitle text-center font-weight-bold">Don’t just take our words for it, See what Customers like you are saying</h2>
                    </v-col>
                </v-row>
                <div class="mt-10 testimonials testimonials-section-main">
                    <v-row>
                        <v-col cols="12" md="6" v-for="card in desserts" :key="card.img">
                            <div class="mainTopTestimo w-100 ps-3 pe-0">
                                <div class="svgTetsimo">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 21 18" style="enable-background:new 0 0 21 18;" xml:space="preserve"><g transform="translate(-1029.632 -238)">	<path d="M1029.6,238c0.1,0,0.1,0,0.2,0h8.8c0,0.1,0,0.1,0,0.2c0,3,0.1,6.1,0,9.1c-0.1,4.8-4,8.6-8.8,8.7  c-0.1,0-0.1,0-0.2,0v-3c0.3,0,0.6,0,0.9-0.1c2.5-0.4,4.5-2.3,5-4.8c0.1-0.4,0.1-0.7,0.1-1.1h-6L1029.6,238z"></path>	<path d="M1050.6,247.6c-0.1,0.4-0.1,0.7-0.2,1.1c-0.4,2.3-1.7,4.3-3.5,5.6c-1.5,1.1-3.2,1.7-5.1,1.7  c-0.1,0-0.1,0-0.2,0c0,0,0,0,0,0v-3c2,0,3.8-1,4.9-2.6c0.7-1,1.1-2.2,1.1-3.4h-6v-9c0.1,0,0.1,0,0.2,0h8.6c0.1,0,0.1,0,0.2,0  L1050.6,247.6z"></path></g></svg>
                                </div>
                                <div class="ratingTestimo d-flex gap-1">
                                    <!-- <v-rating
                                    v-model="rating"
                                    hover size="small"
                                    density="compact"
                                    color="warning"
                                    class=""
                                    ></v-rating> -->
                                    <i v-if="card.rating >= 1" class="mdi mdi-star text-warning text-h5"></i>
                                    <i v-else class="mdi mdi-star-outline text-warning text-h5"></i>
                                    <i v-if="card.rating >= 2" class="mdi mdi-star text-warning text-h5"></i>
                                    <i v-else class="mdi mdi-star-outline text-warning text-h5"></i>
                                    <i v-if="card.rating >= 3" class="mdi mdi-star text-warning text-h5"></i>
                                    <i v-else class="mdi mdi-star-outline text-warning text-h5"></i>
                                    <i v-if="card.rating >= 4" class="mdi mdi-star text-warning text-h5"></i>
                                    <i v-else class="mdi mdi-star-outline text-warning text-h5"></i>
                                    <i v-if="card.rating >= 5" class="mdi mdi-star text-warning text-h5"></i>
                                    <i v-else class="mdi mdi-star-outline text-warning text-h5"></i>
                                </div>
                            </div>
                            <v-card elevation="10" class="mt-0 mb-4 bg-primary">
                                <div class="pa-6 pb-3 text-left">
                                    <p class="text-15">{{card.comment}}</p>
                                    <div class="text-end mt-3">
                                        <h6 class="text-subtitle-1 font-weight-medium"><i class="mdi mdi-account me-1"></i>{{card.title}}</h6>
                                    </div>
                                </div>    
                            </v-card>
                            
                        </v-col>
                    </v-row>
                </div>
            </v-container>
        </div>
    </div>
   
</template>
