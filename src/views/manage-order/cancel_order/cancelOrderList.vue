<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import cancelOrderList from './EditablecancelList.vue';
// theme breadcrumb
const page = ref({ title: 'Cancel Order' });

const breadcrumbs = ref([
    {
        text: 'Order List',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-card elevation="10">
        <v-card-text>
            <cancelOrderList />
        </v-card-text>
    </v-card>
</template>
