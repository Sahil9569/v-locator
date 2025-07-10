<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from 'vuetify';
import { getPrimary, getSecondary } from '@/utils/UpdateColors';
import { ref } from 'vue';

// common components
// import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import UiChildCard from '@/components/shared/UiChildCard.vue';
// theme breadcrumb
// const page = ref({ title: 'Column Chart' });
// const breadcrumbs = ref([
//     {
//         text: 'Dashboard',
//         disabled: false,
//         href: '#'
//     },
//     {
//         text: 'Column Chart',
//         disabled: true,
//         href: '#'
//     }
// ]);

const theme = useTheme();
const chartOptions = computed(() => {
    return {
        chart: {
            type: 'bar',
            height: 350,
            fontFamily: `inherit`,
            toolbar: {
              show: false,
            },
        },
        colors: [getPrimary.value],
        plotOptions: {
            bar: {
                horizontal: false,
                endingShape: 'rounded',
                columnWidth: '20%'
            }
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },

        xaxis: {
            categories: ['1 Week', '2 Week', '3 Week', '4 Week']
        },
        yaxis: {
          title: {
            text: '$ (thousands)',
          },
        },
        fill: {
            opacity: 1
        },
       
        tooltip: {
            theme: 'dark',
            y: {
              formatter(val:any) {
                return `$ ${val} thousands`;
              },
            },
        },
        grid: {
          show: false,
        },
        legend: {
          show: true,
          position: 'bottom',
          width: '50px',
        },
        responsive: [
            {
                breakpoint: 600,
                options: {
                    yaxis: {
                        show: false
                    }
                }
            }
        ]
    };
});

const columnChart = {
    series: [
        {
            name: 'Desktop',
            data: [44, 55, 57, 56]
        },
    ]
};
</script>

<template>
    <!-- ---------------------------------------------------- -->
    <!-- Column Chart -->
    <!-- ---------------------------------------------------- -->
    <!-- <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb> -->
    <v-row>
        <v-col cols="12">
            <UiParentCard title="Monthly Earning">
                <apexchart type="bar" height="300" :options="chartOptions" :series="columnChart.series"> </apexchart>
            </UiParentCard>
        </v-col>
    </v-row>
</template>
