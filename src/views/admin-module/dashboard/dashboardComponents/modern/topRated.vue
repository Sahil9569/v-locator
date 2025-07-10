<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useContactStore } from '@/stores/apps/contact';

import axios from 'axios'; // Make sure to install Axios in your project
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL
const store = useContactStore();
const new_loader = ref(false);
onMounted(() => {
    store.fetchContacts();
});
const getContacts: any = computed(() => {
    return store.contacts;
});

const topRatedRestaurant = ref([
    // {   
    //     id: 1,
    //     restaurantName: 'Bistro Captain',
    //     customerName: 'Jesus T. Hodgdon',
    //     phone: '757-575-5031',
    //     email: 'jesushodgdon1@dayrep.com',
    //     joiningDate: '20-07-2021',
    //     packageName:'V Locator +',
    // },

])

const search = ref('');

const desserts = ref(topRatedRestaurant);

//Methods
const filteredList = computed(() => {
    return desserts.value.filter((user: any) => {
        return user.restaurantName.toLowerCase().includes(search.value.toLowerCase());
    });
});

const recentTransaction = ref('')
onMounted(() => {
    alltopratedrest()
});

const alltopratedrest = async () => {
    new_loader.value = true;
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post('api/kitchen/alltopratedrest/',{'token':token});
        console.log('all to rated hotel aagye ---', response.data);
        const incoming_data = response.data; 
        new_loader.value = false;

        if (incoming_data) {
            console.log('yes m in the condition------',incoming_data)
            //     console.log('response is coming ---', incoming_data);
            const updatedData = incoming_data.status.map((item:any, index:any) => {
                return {
                    Sr_No: `#${index + 1}`,
                    restaurantName: item.name,
                    customerName : `${item.user?.first_name || 'N/A'} ${item.user?.last_name || 'N/A'}`, 
                    phone: item.phone,
                    email: item.user.email,
                    joiningDate: item.user.date_joined,
                    packageName: item.package || 'N/A',

                };
            });
            topRatedRestaurant.value = updatedData;
        }else{
            new_loader.value = false;
            console.log("First Error")
        }
    } catch (error) {
        new_loader.value = false;
        console.error('API error:', error);
        
    }
}




</script>
<template>
    <v-card elevation="10">
        <v-card-item>
            
            <v-row>
                <v-col cols="12" lg="8" md="6">
                    <h4 class="text-h5 mb-2">Top Rated Restaurant</h4>
                </v-col>
                <v-col cols="12" lg="4" md="6">
                    <v-text-field density="compact" v-model="search" label="Search Restaurant Name" hide-details variant="outlined"></v-text-field>
                </v-col>
            </v-row>
            <div class="p-relative">
                <div class="logoLoader tableLoader reset-position" v-if="new_loader === true">
                    <div class="LogoVInnerImg">
                        <img src="@/assets/images/locator/v-icon.png" alt="logo-loader"/>
                        <p class="">Please Wait...</p>
                    </div>
                </div>
                <div v-else>
                    <v-table  class="mt-5">
                        <thead>
                            <tr>
                                <th class="text-subtitle-1 font-weight-bold">Sr No</th>
                                <th class="text-subtitle-1 font-weight-bold">Restaurant Name</th>
                                <!-- <th class="text-subtitle-1 font-weight-bold">Customer Name</th> -->
                                <th class="text-subtitle-1 font-weight-bold">Phone</th>
                                <th class="text-subtitle-1 font-weight-bold">Email</th>
                                <th class="text-subtitle-1 font-weight-bold">Join Date</th>
                                <!-- <th class="text-subtitle-1 font-weight-bold">Package Name</th> -->
                            </tr>
                        </thead>
                    
                            <tbody>
                                <tr v-for="item in filteredList" :key="item">
                                    <td class="text-subtitle-1">{{ item.Sr_No }}</td>
                                    <td>
                                        <div class="d-flex py-4">
                                            <div class="">
                                                <!-- <h4 class="text-h6 font-weight-semibold">{{ item.userinfo }}</h4> -->
                                                <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.restaurantName }}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <!-- <td>
                                        <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.customerName }}</span>
                                    </td> -->
                                    <td>
                                        <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.phone }}</span>
                                    </td>
                                    <td>
                                        <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.email }}</span>
                                    </td>
                                    <td>
                                        <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.joiningDate }}</span>
                                    </td>
                                    <!-- <td>
                                        <v-chip 
                                        :color="(item.packageName=='V Locator +'?'primary':(item.packageName === 'Premium A'?'error':(item.packageName === 'Premium B'? 'warning':(item.packageName === 'Premium C'? 'success': 'secoundary'))))"
                                        size="small">{{ item.packageName }}</v-chip>
                                    </td> -->
                                </tr>
                            </tbody>
                        
                    </v-table>
                </div>
            </div>
        </v-card-item>
    </v-card>

</template>
<style scoped>
.reset-position {
    position: relative !important;
}
</style>
