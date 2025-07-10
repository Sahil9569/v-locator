<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useContactStore } from '@/stores/apps/contact';

import staffReport from '@/_mockApis/apps/staffReport';
import axios from 'axios';
import { useRouter } from "vue-router";
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL
// import { VTable, VPagination } from '@/_mockApis/apps/contact';
const store = useContactStore();

onMounted(() => {
    store.fetchContacts();
    getData();
});
const getContacts: any = computed(() => {
    return store.contacts;
});
const itemsPerPage = 10;
const currentPage = ref(1);

const search = ref('');

const desserts = ref([]);

//Methods
const filteredList = computed(() => {
    return desserts.value.filter((user: any) => {
        return user.first_name.toLowerCase().includes(search.value.toLowerCase());
    });
});

const paginatedList = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredList.value.slice(start, end);
});

const getData = async () => {
    console.log("Order Items LIST API CALL")
    try {
        const token = localStorage.getItem('res_token');
        const formData = {
            token:token,    
        };
        console.log("YE HAI CAT2",formData);
        const response = await axios.post('api/order_data/', formData);
        desserts.value = response.data.staff;
    } catch (error) {
        console.error('API error:', error);
        
    }
}
</script>
<template>
    <v-row>
        <v-col cols="12" lg="4" md="6">
            <v-text-field density="compact" v-model="search" label="Search Staff Name" hide-details variant="outlined"></v-text-field>
        </v-col>
    </v-row>
    <v-table class="mt-5">
        <thead>
            <tr>
                <th class="text-subtitle-1 font-weight-bold">Id </th>
                <th class="text-subtitle-1 font-weight-bold">Name</th>
                <th class="text-subtitle-1 font-weight-bold">Total Served</th>
                <!-- <th class="text-subtitle-1 font-weight-bold">Total Tip</th> -->
                <th class="text-subtitle-1 font-weight-bold">Join Date</th>
                <!-- <th class="text-subtitle-1 font-weight-bold">Status</th> -->
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in paginatedList" :key="item.id" :currentPage="currentPage" :pageSize="10">
                <td class="text-subtitle-1">{{ item.id }}</td>
                <td>
                    <div class="d-flex py-4">
                        <div class="">
                            <!-- <h4 class="text-h6 font-weight-semibold">{{ item.userinfo }}</h4> -->
                            <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.first_name }} {{ item.last_name }}</span>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.served_orders }}</span>
                </td>
                <!-- <td>
                    <span class="text-subtitle-1 d-block mt-1 textSecondary">${{ item.totalTip }}</span>
                </td> -->
                <td>
                    <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.user.date_joined }}</span>
                </td>
                <!-- <td>
                    <v-chip 
                    :color="(item.status=='On Duty'?'primary':(item.status === 'On Leave'?'error':'warning'))"
                    size="small">{{ item.status }}</v-chip>
                </td> -->
            </tr>
        </tbody>
    </v-table>
    <v-pagination v-model="currentPage" :length="Math.ceil(filteredList.length / itemsPerPage)"
        rounded="circle"></v-pagination>
</template>
