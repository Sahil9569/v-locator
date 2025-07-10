<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
// import { userReview } from '@/_mockApis/landingpage/lpPage';
import {testimonialSettings,testimonialBreakpoints} from '@/_mockApis/landingpage/curoselData';
const rating = ref(5);

import review1 from '@/assets/images/profile/user-1.jpg';
import review2 from '@/assets/images/profile/user-2.jpg';
import review3 from '@/assets/images/profile/user-3.jpg';
import axios from 'axios';
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL


const userReview = ref([
    {
        img: review3,
        title: 'Eminson Mendoza',
        subtitle: 'Features avaibility',
        review: 'This template is great, UI-rich and up-to-date. Although it is pretty much complete, I suggest to improve a bit of documentation. Thanks & Highly recomended!'
    },
    {
        img: review1,
        title: 'Jenny Wilson',
        subtitle: 'Features avaibility',
        review: 'The dashboard template from adminmart has helped me provide a clean and sleek look to my dashboard and made it look exactly the way I wanted it to, mainly without having.'
    },
   
]);

onMounted(() => {
    fetchallFeedbackList();
});

const fetchallFeedbackList = async () => {
    try {
        const token = localStorage.getItem('res_token');
        const formData = {
            'token' : token
        }
        const response = await axios.post('api/orders/all_feedback/',formData);
        console.log('Feedback API response:', response.data);
        if (response.data) {
            const updatedData = response.data.map((item:any,index:any) => ({   
                id:item.id,
                comment:item.comment,
                img:"#",
                title:item.cust.user.first_name+' '+item.cust.user.last_name,
                rating:item.rating,}));
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



</script>
<template>
    <!-- <section class="light-bg-section py-12">
        <v-container class="maxWidth">
            <v-row class="align-center">
                <v-col cols="12" lg="6">
                    <img src="@/assets/images/locator/maggi.png" alt="baner" style="max-width:100%" class="">
                </v-col>
                <v-col cols="12" lg="6">
                    <h2 class="sectionTitle font-weight-bold mb-5">Our <span class="text-primary">Mission</span></h2>
                    <p>Our mission is to make the vegan lifestyle more accessible for our community while increasing value for the everyday business. By educating and enlightening our community we aim to reduce the stigma associated with veganism.</p>
                </v-col>
            </v-row>
        </v-container>
    </section> -->
    <div class="pt-sm-16 pt-10">
        <v-container class="maxWidth">
            <v-row class="justify-center">
                <v-col cols="12" sm="8">
                    <h2 class="sectionTitle text-center font-weight-bold">Don’t just take our words for it, See what Customers like you are saying</h2>
                </v-col>
            </v-row>
            <div class="mt-10 testimonials testimonials-section-main">
                <carousel :settings="testimonialSettings" :breakpoints="testimonialBreakpoints" class="overflow-hidden">
                    <slide v-for="card in userReview" :key="card.img">
                        <div class="mainTopTestimo w-100">
                            <div class="svgTetsimo">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 21 18" style="enable-background:new 0 0 21 18;" xml:space="preserve"><g transform="translate(-1029.632 -238)">	<path d="M1029.6,238c0.1,0,0.1,0,0.2,0h8.8c0,0.1,0,0.1,0,0.2c0,3,0.1,6.1,0,9.1c-0.1,4.8-4,8.6-8.8,8.7  c-0.1,0-0.1,0-0.2,0v-3c0.3,0,0.6,0,0.9-0.1c2.5-0.4,4.5-2.3,5-4.8c0.1-0.4,0.1-0.7,0.1-1.1h-6L1029.6,238z"></path>	<path d="M1050.6,247.6c-0.1,0.4-0.1,0.7-0.2,1.1c-0.4,2.3-1.7,4.3-3.5,5.6c-1.5,1.1-3.2,1.7-5.1,1.7  c-0.1,0-0.1,0-0.2,0c0,0,0,0,0,0v-3c2,0,3.8-1,4.9-2.6c0.7-1,1.1-2.2,1.1-3.4h-6v-9c0.1,0,0.1,0,0.2,0h8.6c0.1,0,0.1,0,0.2,0  L1050.6,247.6z"></path></g></svg>
                            </div>
                            <div class="ratingTestimo">
                                <v-rating
                                v-model="rating"
                                hover size="small"
                                density="compact"
                                color="warning"
                                class=""
                                ></v-rating>
                            </div>
                        </div>
                        <v-card elevation="10" class="mt-0 ma-4 bg-primary">
                            <div class="pa-6 pt-10 pb-14 text-left">
                                <p class="text-15">{{card.review}}</p>
                            </div>    
                        </v-card>
                        <div class="d-flex gap-2 align-end ps-8 spacingTopTestimon">
                            <v-avatar size="80">
                                <img :src="card.img" :alt="card.img" width="80" />
                            </v-avatar>
                            <div >
                                <h6 class="text-h6 pb-3 text-primary">{{card.title}}</h6>
                            </div>   
                        </div>    
                    </slide>
                    <template #addons>
                        <pagination class="mt-6" />
                    </template>
                 </carousel> 
            </div>
        </v-container>
    </div>
</template>
