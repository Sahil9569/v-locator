<script setup lang="ts">
import { computed,onMounted,ref } from 'vue';
import { getPrimary, getError, getSecondary } from '@/utils/UpdateColors';
import axios from 'axios';
import { useRouter } from "vue-router";
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL
const new_loader = ref(false);
const loading = ref(false);
const pending1 = ref('')
const completed1 = ref('')
const seriescolumnchart = ref([]);
onMounted(() => {
    getData();
});
const getData = async () => {
    loading.value = true;
    
    new_loader.value = true;
    console.log("Order Items LIST API CALL")
    try {
        const token = localStorage.getItem('res_token');
        const formData = {
            token:token,    
        };
        console.log("YE HAI CAT2",formData);
        const response = await axios.post('api/admin_order_data/', formData);
        const { pending, completed } = response.data;
        new_loader.value = false; // Extract pending and completed values
        const pendingInt = parseInt(pending, 10);
        const completedInt = parseInt(completed, 10);
        // Update the seriescolumnchart array
        seriescolumnchart.value[1] = pendingInt;
        seriescolumnchart.value[0] = completedInt;
        pending1.value = pending
        completed1.value = completed
    } catch (error) {
        new_loader.value = false;
        console.error('API error:', error);
        
    }
    loading.value = false;

}

/* Chart */
const chartOptions = computed(() => {
    return {
        labels: ['Completed Order',  'Pending Order'],
        chart: {
            height: 275,
            type: 'donut',
            foreColor: '#adb0bb',
            fontFamily: `inherit`,
            toolbar: {
                show: false
            }
        },
        colors: [getPrimary.value, getSecondary.value],
        plotOptions: {
            pie: {
                donut: {
                    size: '89%',
                    background: 'transparent',

                    labels: {
                        show: true,
                        name: {
                            show: true,
                            offsetY: 7
                        },
                        value: {
                            show: false
                        },
                        total: {
                            show: true,
                            fontSize: '20px',
                            fontWeight: '600',
                            label: 'Orders'
                        }
                    }
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: false
        },
        legend: {
            show: false
        },
        tooltip: {
            theme: 'dark',
            fillSeriesColor: false,
            x: {
                format: 'dd/MM/yy HH:mm'
            }
        }
    };
});

</script>
<template>
    <v-card elevation="10" >
        <v-card-item>
            <v-card-title class="text-h5">Total Order</v-card-title>
            <v-card-subtitle class="text-subtitle-1 textSecondary">Every Day</v-card-subtitle>

            
            <div class="p-relative">
                <div v-if="loading === true" class="p-relative">
                    <div  class="loader-container">
                        <div class="loader"></div>
                    </div>
                </div>
                <div v-else>
                    <apexchart class="mt-6" type="donut" height="275" :options="chartOptions" :series="seriescolumnchart"> </apexchart>
                    <v-row class="mt-5">
                        <v-col cols="6" class="d-flex justify-lg-center justify-start">
                            <div class="mt-md-6 mt-3">
                            
                                <div class="pl-4 text-center">
                                    <h3 class="text-h6 mb-3 text-primary">{{completed1}}</h3>
                                    <h6 class="text-subtitle-1 text-primary">Completed Order</h6>
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="6" class="d-flex justify-lg-center justify-start">
                            <div class="mt-md-6 mt-3">
                                
                                <div class="pl-4 text-center">
                                    <h3 class="text-h6 mb-3 text-secondary">{{pending1}}</h3>
                                    <h6 class="text-subtitle-1 text-secondary">Pending Order</h6>
                                </div>
                            </div>
                        </v-col>
                    
                    </v-row>
                </div>
            </div>
        </v-card-item>
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
    margin-top: 0px !important;
    top: 0px;
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
