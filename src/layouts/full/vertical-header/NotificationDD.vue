<script setup lang="ts">
// import {notifications} from '@/_mockApis/headerData';   
import user1 from '@/assets/images/profile/Spoons.png';
import BASE_URL from '@/stores/myVar';
import axios from 'axios';
import { ref, computed, onMounted, onBeforeMount } from 'vue';
// onMounted(() => {
//     Notifi_details();
// });
const token = localStorage.getItem('res_token')
const notifications = ref([]);
const user = ref(localStorage.getItem('role'))
const user_name = user.value
console.log('check the role of faltu',user_name)
const Notifi_details = async () => {
    // try {
        const token = localStorage.getItem('res_token');
        const formData = {
            'token' : token,
        } 
        const response = await axios.post('api/orders/notifi_details/',formData);
        if (response.data) {
            notifications.value = response.data;
        } else {
            console.log("First Error");
    }
}




</script>
<template>
   
    <v-menu :close-on-content-click="true">
   
        <template v-slot:activator="{ props }">
            <templates v-if="user_name === 'customer'">
                
            </templates>
            <templates v-else>
                <v-btn icon variant="text" color="primary" class="custom-hover-primary" v-bind="props" @click="Notifi_details()">
                    <v-badge dot color="primary">
                        <BellRingingIcon stroke-width="1.5" size="22" />
                    </v-badge>
                </v-btn>
            </templates>
        </template>
        <v-sheet rounded="md" width="360" elevation="10">
            <div class="px-8 pb-4 pt-6">
                <div class="d-flex align-center justify-space-between">
                    <h6 class="text-h5">Notifications</h6>
                    <!-- <v-chip color="primary" variant="flat" size="small" class="text-white">5 New</v-chip> -->
                </div>
            </div>
            <perfect-scrollbar style="height: 400px">
                <v-list class="py-0 theme-list" lines="two">
                    <template v-if="notifications.length === 0">
                        <v-list-item class="py-4 px-1 pl-0 pt-6 mb-2 border-bottom">
                            <div><p class="text-subtitle-1 font-weight-regular">No Data Available</p></div>
                        </v-list-item>
                    </template>
                    <template v-else>
                        <v-list-item v-for="item in notifications" :key="item" :value="item" active-color="primary" class="py-4 px-8">
                            <div>
                                <h6 class="text-subtitle-1 font-weight-bold mb-1">{{ item.subject }}</h6>
                            </div>
                            <p class="text-subtitle-1 font-weight-regular textSecondary">{{ item.content }}</p>
                            <template v-slot:prepend>
                                <v-avatar size="48" class="mr-3">
                                    <v-img :src="user1" width="48" :alt="user1" />
                                </v-avatar>
                            </template>
                        </v-list-item>
                    </template>

                    <v-divider></v-divider>
                </v-list>
            </perfect-scrollbar>
            <div class="py-4 px-6 text-center">
                <router-link :to="`/notification/` + token" color="primary" class="text-decoration-none"> 
                    <v-btn color="primary" variant="outlined" block>See all Notifications</v-btn>
                </router-link>
            </div>
        </v-sheet>
    </v-menu>
</template>
