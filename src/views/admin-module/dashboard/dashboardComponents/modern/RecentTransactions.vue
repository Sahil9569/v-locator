<script setup lang="ts">
import { ref ,computed,onMounted} from 'vue';
import { CircleIcon } from 'vue-tabler-icons';
// import { recentTransaction } from '@/_mockApis/components/dashboard/ecommerceData';
import axios from 'axios'; // Make sure to install Axios in your project
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL

// const recentTransaction = [
//     {
//         title:'09:30 am',
//         subtitle:'Payment received from John Doe of $385.90',
//         textcolor:'primary',
//         boldtext:false,
//         line:true,
//         link:'',
//         url:''
//     },
// ]
const recentTransaction = ref('')
onMounted(() => {
    alltransactions()
});

const alltransactions = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post('api/kitchen/alltransactions/',{'token':token});
        console.log('response is back of latest order ---', response.data);
        const incoming_data = response.data.latest_transactions; 
        if (incoming_data) {
            console.log('response is coming ---', incoming_data);
            const updatedData = incoming_data.map((item:any, index:any) => {
                return {
                    SNo: `#${index + 1}`,
                    title: item.created,
                    subtitle : `Payment received from ${item.latest_transaction?.cust?.user?.first_name} of $${item.latest_transaction?.amount}`, 
                    customerType: item.cust_type,
                };
            });
            recentTransaction.value = updatedData;
        }else{
            console.log("First Error")
        }
    } catch (error) {
        console.error('API error:', error);
        
    }
}





</script>
<template>
    <v-card elevation="10" >
        <v-card-item>
            <v-card-title class="text-h5">Recent Transactions</v-card-title>
            <div class="recent-transaction mt-10 px-3">
                <div v-for="list in recentTransaction" :key="list.title">
                    <v-row class="d-flex mb-4">
                        <!-- <v-col cols="4" lg="3" md="auto" sm="auto" class="px-0 pt-0 pb-1 d-flex align-start">
                            <h6 class="text-body-1 textSecondary text-no-wrap">{{ list.title }}</h6>
                        </v-col> -->
                        <v-col cols="" sm="1" class="px-0 text-center pt-0 pb-1">
                            <CircleIcon size="13" :class="'text-' + list.textcolor" />
                            <div v-if="list.line" class="line mx-auto bg-grey100"></div>
                        </v-col>
                        <v-col cols="7" sm="8" class="pt-0 pb-1">
                            <h6 v-if="list.boldtext" class="text-body-1 font-weight-bold">{{ list.subtitle }}</h6>
                            <h6 v-else class="text-body-1 textSecondary">{{ list.subtitle }}</h6>
                            <div class="mt-n1">
                                <RouterLink :to="list.url" class="text-body-1 text-primary text-decoration-none" v-if="list.link">{{
                                    list.link
                                }}</RouterLink>
                            </div>
                        </v-col>
                    </v-row>
                </div>
            </div>
        </v-card-item>
    </v-card>
</template>
