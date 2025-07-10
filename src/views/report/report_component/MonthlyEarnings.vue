<script setup lang="ts">
import { computed,ref,onMounted } from 'vue';

import { getPrimary } from '@/utils/UpdateColors';

import axios from 'axios';
import { useRouter } from "vue-router";
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL
const loading = ref(false);
const total = ref('')
onMounted(() => {
    getData();
});
const getData = async () => {
    loading.value = true;

    console.log("Order Items LIST API CALL")
    try {
        const token = localStorage.getItem('res_token');
        const formData = {
            token:token,    
        };
        console.log("YE HAI CAT2",formData);
        const response = await axios.post('api/order_data/', formData);
        total.value = response.data.mtotal
    } catch (error) {
        console.error('API error:', error);
        
    }
    loading.value = false;

}


/* Chart */
const areachartOptions = computed(() => {
    return {
        chart: {
            type: 'area',
            height: 60,
            fontFamily: `inherit`,
            foreColor: '#a1aab2',
            toolbar: {
                show: false
            },
            sparkline: {
                enabled: true
            },
            group: 'sparklines'
        },
        colors: [getPrimary.value],
        stroke: {
            curve: 'smooth',
            width: 2
        },
        fill: {
            type: 'solid',
            opacity: 0.05
        },
        markers: {
            size: 0
        },
        tooltip: {
            theme: 'dark',
            x: {
                show: false
            }
        }
    };
});

const areaChart = {
    series: [
        {
            name: '',
            data: [25, 66, 20, 40, 12, 58, 20]
        }
    ]
};
</script>
<template>
    <v-card elevation="10" class=" mt-6">
        <div v-if="loading === true" class="p-relative">
            <div  class="loader-container">
                <div class="loader"></div>
            </div>
        </div>
        <div v-else>
            <v-card-item class="">
                <div class="d-flex align-center justify-space-between">
                    <v-card-title class="text-h5">Monthly Earnings</v-card-title>
                    <v-avatar class="rounded-md bg-lightprimary text-primary">
                        <img src="@/assets/images/svgs/icon-master-card-2.svg" alt="ico" />
                    </v-avatar>
                </div>
                <div class="mb-sm-16 mb-8 d-flex align-center">
                    <h4 class="text-h4 font-weight-bold">${{total}}</h4>
                    <div class="d-flex align-center">
                    </div>
                </div>
            </v-card-item>
            <div class="pt-2">
                <apexchart type="area" height="60" :options="areachartOptions" :series="areaChart.series"> </apexchart>
            </div>
        </div>
    </v-card>
</template>
<style lang="scss">
.p-relative{
    position: relative;
    min-height: 250px;
}
.loader {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #40bf0f;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.loader-container {
    position: absolute;
    top: 0;
    left: 0;
    bottom:0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}
</style>
