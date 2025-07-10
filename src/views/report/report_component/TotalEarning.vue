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
        total.value = response.data.total
    } catch (error) {
        console.error('API error:', error);
        
    }
    loading.value = false;

}
/* Chart */
const chartOptions = computed(() => {
    return {
        chart: {
            type: 'bar',
            height: 25,
            fontFamily: `inherit`,
            toolbar: {
                show: false
            },
            sparkline: {
                enabled: true
            }
        },
        colors: [getPrimary.value],
        grid: {
            show: false
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '100%',
                borderRadius: 3,
                distributed: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 5,
            colors: ['rgba(0,0,0,0.01)']
        },
        xaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            labels: {
                show: false
            }
        },
        yaxis: {
            labels: {
                show: false
            }
        },
        axisBorder: {
            show: false
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            theme: 'dark',
            x: {
                show: false
            }
        },
        responsive: [
            {
                breakpoint: 767,
                options: {
                    chart: { height: 60 },
                    plotOptions: {
                        bar: { columnWidth: "60%" }
                    }
                    
                }
            }
        ],
    };
});
const seriescolumnchart = [
    {
        name: '',
        data: [100, 60, 35, 90, 35, 100]
    }
];
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
                    <img src="@/assets/images/svgs/cart-icon.svg" alt="ico" />
                </v-avatar>
                <div class="my-5 ml-n4">
                    <apexchart class="" type="bar" height="25" :options="chartOptions" :series="seriescolumnchart">
                    </apexchart>
                </div>
                <div>
                    <div class="d-flex">
                        <h4 class="text-h4 ">${{ total }}</h4>
                        <!-- <div class="ml-1">
                            <ArrowUpRightIcon stroke-width="1.5" stroke="#40b40f" size="18" class="text-success" />
                        </div> -->
                    </div>
                    <div class="text-subtitle-1 textPrimary mt-1">Everyday Sales</div>
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
