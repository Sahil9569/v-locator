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
const staff_dojojn = ref('')
onMounted(() => {
    store.fetchContacts();
    getData();
});
const new_loader = ref(false);
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
    new_loader.value = true;
    try {
        const token = localStorage.getItem('res_token');
        const formData = {
            token:token,    
        };
        const response = await axios.post('api/order_data/', formData);
        console.log("YE HAI CAT2===========================",response);
        new_loader.value = false;
      
        desserts.value = response.data.staff;
    } catch (error) {
        new_loader.value = false;
        console.error('API error:', error);
        
    }
}

const title = ref('Staff Report');

const breadcrumbs = ref([
    {
        text: 'Staff Report List',
        disabled: true,
        href: '#'
    }
]);
const convertToCSV = (data) => {
  // Define the CSV header with column names
  const csvHeader = ['Id', 'Name', 'Total Served', 'Joined Date'];

  // Initialize an empty array for the CSV data
  const csvData = [csvHeader];

  // Iterate through your data and add each row to the CSV
  for (const item of data) {
    const rowData = [
      item.id,
      item.first_name+' '+item.last_name,
      item.served_orders,
      item.user.date_joined,
    ];

    csvData.push(rowData);
  }

  // Convert the array to a CSV string
  const csvString = csvData.map(row => row.join(',')).join('\n');

  return csvString;
};

const downloadCSV = () => {
  const csvData = convertToCSV(paginatedList.value);
  const blob = new Blob([csvData], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'StaffData.csv';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};
</script>

<template>
    <v-card elevation="0" rounded="md" class="bg-lightsecondary border-0 mb-10">
        <v-card-item class="pt-3 pb-0">
            <v-row class="align-center">
                <v-col cols="12" sm="6" class="pt-sm-10 pt-5">
                    <div class="d-flex">
                        <img src="@/assets/images/backgrounds/growth.png" height="40"
                                alt="icon" class="mt-2"/>
                        <div class="ps-3">
                            <h3 class="text-h3 mb-2 textPrimary">{{ title }}</h3>
                            <v-breadcrumbs :items="breadcrumbs" class="text-h6 font-weight-medium pa-0 ml-n1">
                                <template v-slot:divider>
                                    <div class="d-flex align-center text-h3 mt-n4 textSecondary">.</div>
                                </template>
                                <template v-slot:title="{ item }">
                                    <h6 class="text-medium-emphasis text-subtitle-1 textSecondary">{{ item.title }}</h6>
                                </template>

                            </v-breadcrumbs>
                            <v-btn variant="flat" class="mt-3" size="small" color="primary" @click="downloadCSV">Download CSV</v-btn>
                        </div>
                    </div>
                    <div class="mt-8">
                    </div>

                </v-col>
                <v-col cols="12" sm="6" class="text-sm-right">
                    <div class="mb-n2 ">
                        <img src="@/assets/images/backgrounds/reportt.png" class="" alt="image" width="340" style="margin-bottom:-26px"/>
                    </div>
                </v-col>
            </v-row>
        </v-card-item>
    </v-card>
    <!-- <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb> -->
    <v-card elevation="10">
        
            <v-card-text>
                <v-row>
                    <v-col cols="12" lg="4" md="6">
                        <v-text-field density="compact" v-model="search" label="Search Staff Name" hide-details variant="outlined"></v-text-field>
                    </v-col>
                </v-row>
                <div class="p-relative">
                    <div class="logoLoader tableLoader" v-if="new_loader == true">
                        <div class="LogoVInnerImg">
                            <img src="@/assets/images/locator/v-icon.png" alt="logo-loader"/>
                            <p class="">Please Wait...</p>
                        </div>
                    </div>	
                    <v-table class="mt-5">
                        <thead>
                            <tr>
                                <th class="text-subtitle-1 font-weight-bold">Sr No </th>
                                <th class="text-subtitle-1 font-weight-bold">Name</th>
                                <th class="text-subtitle-1 font-weight-bold">Total Served</th>
                                <th class="text-subtitle-1 font-weight-bold">Join Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in paginatedList" :key="item" :currentPage="currentPage" :pageSize="10">
                                <td class="text-subtitle-1">{{ index+1 }}</td>
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
                </div>
            </v-card-text>
    </v-card>
</template>
