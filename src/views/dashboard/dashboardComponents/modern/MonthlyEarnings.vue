<script setup lang="ts">
import { computed } from 'vue';
import { getSecondary } from '@/utils/UpdateColors';
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
        colors: [getSecondary.value],
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
    <v-card elevation="10" >
        <v-card-item class="pa-5">
            <div class="d-sm-flex align-center justify-space-between">
                <div>
                    <v-card-title class="text-h5">Pending Order</v-card-title>
                    <v-card-subtitle class="text-subtitle-1 textSecondary">All Orders List</v-card-subtitle>
                </div>
            </div>
            <v-row>
                <v-col cols="12" sm="12" class="pt-7">
                    <div class="orderScroll">
                        <div class="px-3 py-2 rounded-md bg-lightwarning">
                            <div class="p-5">
                                <h3 class="text-h6">Name : Sexton</h3>
                                <span class="text-subtitle-1 textSecondary pt-2 d-block">Phone: 8801717426</span>
                                <span class="text-subtitle-1 textSecondary pt-1 d-block">Order No.: (9996)</span>
                                <span class="text-subtitle-1 textSecondary pt-1 d-block">Table No: Table-V3</span>
                                <span class="text-subtitle-1 textSecondary pt-1 d-block">Time : 12:23:00</span>
                            </div>
                        </div>
                        <div class="px-3 py-2 mt-3 rounded-md bg-lightprimary">
                            <div class="p-5">
                                <h3 class="text-h6">Name : Walk</h3>
                                <span class="text-subtitle-1 textSecondary pt-2 d-block">Phone: 8801717426</span>
                                <span class="text-subtitle-1 textSecondary pt-1 d-block">Order No.: (9996)</span>
                                <span class="text-subtitle-1 textSecondary pt-1 d-block">Table No: Table-V3</span>
                                <span class="text-subtitle-1 textSecondary pt-1 d-block">Time : 12:23:00</span>
                            </div>
                        </div>
                        <div class="px-3 py-2 mt-3 rounded-md bg-lighterror">
                            <div class="p-5">
                                <h3 class="text-h6">Name : Walk</h3>
                                <span class="text-subtitle-1 textSecondary pt-2 d-block">Phone: 8801717426</span>
                                <span class="text-subtitle-1 textSecondary pt-1 d-block">Order No.: (9996)</span>
                                <span class="text-subtitle-1 textSecondary pt-1 d-block">Table No: Table-V3</span>
                                <span class="text-subtitle-1 textSecondary pt-1 d-block">Time : 12:23:00</span>
                            </div>
                        </div>
                        <div class="px-3 py-2 mt-3 rounded-md bg-lightsuccess">
                            <div class="p-5">
                                <h3 class="text-h6">Name : Walk</h3>
                                <span class="text-subtitle-1 textSecondary pt-2 d-block">Phone: 8801717426</span>
                                <span class="text-subtitle-1 textSecondary pt-1 d-block">Order No.: (9996)</span>
                                <span class="text-subtitle-1 textSecondary pt-1 d-block">Table No: Table-V3</span>
                                <span class="text-subtitle-1 textSecondary pt-1 d-block">Time : 12:23:00</span>
                            </div>
                        </div>
                        <div class="px-3 py-2 mt-3 rounded-md bg-lightprimary">
                            <div class="p-5">
                                <h3 class="text-h6">Name : Walk</h3>
                                <span class="text-subtitle-1 textSecondary pt-2 d-block">Phone: 8801717426</span>
                                <span class="text-subtitle-1 textSecondary pt-1 d-block">Order No.: (9996)</span>
                                <span class="text-subtitle-1 textSecondary pt-1 d-block">Table No: Table-V3</span>
                                <span class="text-subtitle-1 textSecondary pt-1 d-block">Time : 12:23:00</span>
                            </div>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-card-item>
        <!-- <div class="mt-3 ">
            <apexchart type="area" height="60" :options="areachartOptions" :series="areaChart.series"> </apexchart>
        </div> -->
    </v-card>
</template>
