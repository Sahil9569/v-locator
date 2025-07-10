<script setup lang="ts">
import { computed,ref,onMounted } from 'vue';

import { getSecondary } from '@/utils/UpdateColors';
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
        total.value = response.data.wtotal
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
            height: 25,
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
        colors: [getSecondary.value],
        stroke: {
            curve: 'straight',
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
            data: [0,10,10,10,35,45,30,30,30,50,52,30,25,45,50,80,60,65]
        }
    ]
};
</script>
<template>
    <v-card elevation="10">
        <div v-if="loading === true" class="p-relative">
            <div  class="loader-container">
                <div class="loader"></div>
            </div>
        </div>
        <div v-else> 
            <v-card-item>
                <v-avatar class="rounded-md bg-lightprimary text-primary">
                    <img src="@/assets/images/svgs/icon-bars.svg" alt="icon" />
                </v-avatar>
                <div class="my-5">
                    <apexchart type="area" height="25" :options="areachartOptions" :series="areaChart.series"> </apexchart>
                </div>
                <div>
                    <div class="d-flex">
                        <h4 class="text-h4 ">${{total}}</h4>
                        <!-- <div class="ml-1">
                            <ArrowUpRightIcon stroke-width="1.5" stroke="#40b40f" size="18" class="text-success" />
                        </div> -->
                    </div>
                    <div class="text-subtitle-1 textPrimary mt-1">Weekly Earnings</div>
                </div>

            </v-card-item>
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
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.loader-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}
</style>
