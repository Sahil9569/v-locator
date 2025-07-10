<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL;
const new_loader = ref(false);
const foodData = ref([]);
onMounted(() => {
    getData();
});
const getData = async () => {
    new_loader.value = true;
    console.log('Order Items LIST API CALL-----------------', new_loader.value);
    try {
        const token = localStorage.getItem('res_token');
        const formData = {
            token: token
        };
        console.log('YE HAI CAT2', formData, '-------------------', new_loader.value);
        const response = await axios.post('api/admin_order_data/', formData);

        foodData.value = response.data.food;
    } catch (error) {
        console.error('API error:--------------------', error, new_loader.value);
    }
    new_loader.value = false;
};
</script>
<template>
    <v-card elevation="10">
        <div class="p-relative">
            <div>
                <v-card-item>
                    <div class="d-sm-flex align-center justify-space-between">
                        <v-card-title class="text-h5 mb-2">Food Performance</v-card-title>
                    </div>
                    <div class="p-relative">
                        <div class="table-scroll-custom">
                            <v-table class="month-table mt-5 custom-px-0" border="1">
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th class="text-subtitle-1 font-weight-semibold">Name</th>
                                            <th class="text-subtitle-1 font-weight-semibold">Progress</th>
                                            <th class="text-subtitle-1 font-weight-semibold">Status</th>
                                            <th class="text-subtitle-1 font-weight-semibold">Budget</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(foodItem, index) in foodData" :key="index" class="month-item">
                                            <td>
                                                <div class="d-flex align-center">
                                                    <templates v-if="foodItem.base64_images">
                                                        <img :src="foodItem.base64_images" class="imageCustomTable img-fluid" />
                                                    </templates>
                                                    <templates v-else>
                                                        <img src="@/assets/images/locator/v-icon.png" class="imageCustomTable img-fluid" />
                                                    </templates>
                                                    <div class="mx-3">
                                                        <h4 class="text-subtitle-1 text-no-wrap font-weight-bold">
                                                            {{ foodItem.dish_name }}
                                                        </h4>
                                                        <h6 class="text-subtitle-2 text-no-wrap textSecondary mt-1"></h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <h5 class="font-weight-medium text-no-wrap text-body-1 textSecondary">
                                                    {{ foodItem.total_time }}%
                                                </h5>
                                            </td>
                                            <td>
                                                <v-chip
                                                    rounded="md"
                                                    class="ma-2 px-5 chip-label"
                                                    :color="foodItem.statusColor"
                                                    size="small"
                                                    label
                                                    >{{ foodItem.frequency }}</v-chip
                                                >
                                            </td>
                                            <td>
                                                <h4 class="text-body-1">{{ foodItem.average_price }}</h4>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <!-- </div> -->
                                </template>
                            </v-table>
                            <div class="logoLoader tableLoader" v-if="new_loader === true">
                                <div class="LogoVInnerImg">
                                    <img src="@/assets/images/locator/v-icon.png" alt="logo-loader" />
                                    <p class="">Please Wait...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-card-item>
            </div>
        </div>
    </v-card>
</template>

<style lang="scss">
.loader {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #40bf0f;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.loader-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    bottom: 0;
}
.table-scroll-custom {
    height: 500px;
    overflow-y: auto;
}

.table-scroll-custom::-webkit-scrollbar {
    width: 10px;
}

.table-scroll-custom::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 30px;
}
.table-scroll-custom::-webkit-scrollbar-thumb {
    background: #40a30c;
    border-radius: 30px;
}
.tableLoader.logoLoader {
    position: static;
}
</style>
