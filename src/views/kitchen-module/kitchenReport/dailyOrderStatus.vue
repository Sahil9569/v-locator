<script setup lang="ts">
import { computed,onMounted,ref } from 'vue';
import { getPrimary, getError, getSecondary } from '@/utils/UpdateColors';
import axios from 'axios'; // Make sure to install Axios in your project
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL


const complete_Order = ref('');
const pending_Order = ref('');
const cancel_Order = ref('');


/* Chart */
const chartOptions = computed(() => {
    return {
        labels: ['Completed Order',  'Pending Order', 'Cancel Order'],
        chart: {
            height: 275,
            type: 'donut',
            foreColor: '#adb0bb',
            fontFamily: `inherit`,
            toolbar: {
                show: false
            }
        },
        colors: [getPrimary.value, getSecondary.value, getError.value],
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
                            // label: '55'
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
const seriescolumnchart = ref();

onMounted(() => {
    ktchen_totalorder()
});

const ktchen_totalorder = async () => {
    try {
        const token = localStorage.getItem('res_token');
        const auth = localStorage.getItem('authToken');
        const response = await axios.post('api/kitchen/ktchen_totalorder/',{'token':token,'auth':auth});
        console.log('response is back of ktchen_totalorder ---', response.data);
        const incoming_data = response.data; 
        if (incoming_data) {
            console.log('response is ktchen_totalorder ---', incoming_data);
            complete_Order.value = incoming_data.complete_Order
            pending_Order.value = incoming_data.pending_Order
            cancel_Order.value = incoming_data.cancel_Order
            seriescolumnchart.value = [incoming_data.complete_Order, incoming_data.pending_Order, incoming_data.cancel_Order];
        }else{
            console.log("First Error")
        }
    } catch (error) {
        console.error('API error:', error);
        
    }
}




</script>
<template>
    <v-card elevation="10" >
        <v-card-item>
            <v-card-title class="text-h5">Total Order</v-card-title>
            <v-card-subtitle class="text-subtitle-1 textSecondary">Every Day</v-card-subtitle>
            <apexchart class="mt-6" type="donut" height="275" :options="chartOptions" :series="seriescolumnchart"> </apexchart>
            <v-row class="mt-5">
                <v-col cols="4" class="d-flex justify-lg-center justify-start">
                    <div class="mt-md-6 mt-3">
                        <!-- <v-avatar class="rounded-md bg-lightprimary text-primary">
                            <GridDotsIcon size="22" />
                        </v-avatar> -->
                        <div class="pl-4 text-center">
                            <h3 class="text-h6 mb-3 text-primary">{{ complete_Order }}</h3>
                            <h6 class="text-subtitle-1 text-primary">Completed Order</h6>
                        </div>
                    </div>
                </v-col>
                <v-col cols="4" class="d-flex justify-lg-center justify-start">
                    <div class="mt-md-6 mt-3">
                        <!-- <v-avatar class="rounded-md bg-lightsecondary text-secondary">
                            <GridDotsIcon size="22" />
                        </v-avatar> -->
                        <div class="pl-4 text-center">
                            <h3 class="text-h6 mb-3 text-secondary">{{ pending_Order }}</h3>
                            <h6 class="text-subtitle-1 text-secondary">Pending Order</h6>
                        </div>
                    </div>
                </v-col>
                <v-col cols="4" class="d-flex justify-lg-center justify-start">
                    <div class="mt-md-6 mt-3">
                        <!-- <v-avatar class="rounded-md bg-lightsecondary text-secondary">
                            <GridDotsIcon size="22" />
                        </v-avatar> -->
                        <div class="pl-4 text-center">
                            <h3 class="text-h6 mb-3 text-error">{{ cancel_Order }}</h3>
                            <h6 class="text-subtitle-1 text-error">Cancel Order</h6>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-card-item>
    </v-card>
</template>
