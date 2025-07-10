<script setup lang="ts">
import { ref } from 'vue';
import { computed } from 'vue';
import { getPrimary, getSecondary } from '@/utils/UpdateColors';

const select = ref('March 2023');
const items = ref(['March 2023', 'April 2023', 'May 2023']);

/* Chart */
const chartOptions = computed(() => {
    return {
        chart: {
            height: 375,
            type: 'bar',
            fontFamily: `inherit`,
            foreColor: '#adb0bb',
            stacked: true
        },
        colors: [getPrimary.value, getSecondary.value],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '60%',
                columnWidth: '18%',
                borderRadius: [6],
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all'
            }
        },

        stroke: {
            show: false
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false
                }
            }
        },
        yaxis: {
            min: -5,
            max: 5,
            tickAmount: 4
        },
        xaxis: {
            categories: ['16/08', '17/08', '18/08', '19/08', '20/08', '21/08'],
            axisBorder: {
                show: false
            }
        },
        tooltip: {
            theme: 'dark',
            x: {
                format: 'dd/MM/yy HH:mm'
            }
        },
        responsive: [
            {
                breakpoint: 991,
                options: {
                    xaxis: {
                        labels: {
                            rotate: -45
                        },
                        categories: ['16/08', '17/08', '18/08', '19/08', '20/08', '21/08', '22/08']
                    }
                }
            }
        ]
    };
});
const lineChart = {
    series: [
        {
            name: 'Eanings this month',
            data: [1.5, 2.7, 2.2, 3.6, 1.5, 1.0]
        },
        {
            name: 'Expense this month',
            data: [-1.5, -1.1, -2.5, -1.5, -0.6, -1.8]
        }
    ]
};
</script>
<template>
    <v-card elevation="10" >
        <v-card-item class="pa-5">
            <div class="d-sm-flex align-center justify-space-between">
                <div>
                    <v-card-title class="text-h5">Latest Order</v-card-title>
                    <v-card-subtitle class="text-subtitle-1 textSecondary">All Orders List</v-card-subtitle>
                </div>
                <!-- <div class="my-sm-0 my-2">
                    <v-select v-model="select" :items="items" variant="outlined" density="compact" hide-details></v-select>
                </div> -->
            </div>

            <v-row>
                <!-- <v-col cols="12" sm="8" class="pt-7">
                    <apexchart type="bar" height="375" :options="chartOptions" :series="lineChart.series"> </apexchart>
                </v-col> -->
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
                    <!-- <div class="mt-sm-10 mb-sm-10 mt-10 mb-0">
                        <div class="d-flex align-baseline">
                            <v-icon icon="mdi mdi-checkbox-blank-circle" size="10" color="primary"></v-icon>
                            <div class="pl-4">
                                <h6 class="text-subtitle-1 textSecondary">Earnings this month</h6>
                                <h5 class="text-h5 mt-1">$48,820</h5>
                            </div>
                        </div>
                        <div class="d-flex mt-8 align-baseline">
                            <v-icon icon="mdi mdi-checkbox-blank-circle" size="10" color="secondary"></v-icon>
                            <div class="pl-4">
                                <h6 class="text-subtitle-1 textSecondary">Expense this month</h6>
                                <h5 class="text-h5 mt-1">$26,498</h5>
                            </div>
                        </div>
                        <v-btn color="primary" class="mt-10" variant="flat" block>View Full Report</v-btn>
                    </div> -->
                </v-col>
            </v-row>
        </v-card-item>
    </v-card>
</template>
