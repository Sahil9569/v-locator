<script setup lang="ts">
// import {notifications} from '@/_mockApis/headerData';   
import user1 from '@/assets/images/profile/Spoons.png';
import BASE_URL from '@/stores/myVar';
import axios from 'axios';
axios.defaults.baseURL = BASE_URL
import { ref, computed, onMounted, onBeforeMount } from 'vue';
onMounted(() => {
    All_notifi_details();
});

const notifica = ref([]);

const All_notifi_details = async () => {
    // try {
        console.log('yes i m notifications')
        const token = localStorage.getItem('res_token');
        const formData = {
            'token' : token,
        } 
        console.log('this is form data ',formData)
        const response = await axios.post('api/orders/all_notifi_details/',formData);
        console.log('Notifiactions API response:', response.data);
        if (response.data) {
            console.log('this is in if condition')
            notifica.value = response.data;
            console.log('check the value',notifica.value)
        } else {
            console.log("First Error");
    }
    // } catch (error) {
    //     console.log('this is in catch')
    //     console.error('API error:', error);
        
    
}

</script>
<template class="p-0">
        <v-sheet rounded="md" width="360" elevation="0" class="w-100 pa-0">
            <template v-if="notifica.length === 0">
                <v-list-item class="py-4 px-8 pl-0 pt-0 mb-2 border-bottom">
                    <div><p class="text-subtitle-1 font-weight-regular">No Data Available</p></div>
                </v-list-item>
            </template>
            <template v-else>
                <v-list-item v-for="item in notifica" :key="item" :value="item" active-color="primary" class="py-4 px-8 pl-0 pt-0 mb-2 border-bottom">
                    <div><h6 class="text-subtitle-1 font-weight-bold mb-1">{{ item.subject }}</h6></div>
                    <p class="text-subtitle-1 font-weight-regular textSecondary">{{ item.content }}</p>
                    <p class="text-subtitle-1 font-weight-regular textSecondary" style="font-size: 12px !important;">{{ item.created_at }}</p>
                    <template v-slot:prepend>
                        <v-avatar size="48" class="mr-3">
                            <v-img :src="user1" width="48" :alt="user1" />
                        </v-avatar>
                    </template>
                </v-list-item>
            </template>
        </v-sheet>
</template>
