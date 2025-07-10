<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import EditableCouponDiscount from './EditableCouponDiscount.vue';
// theme breadcrumb
const page = ref({ title: 'Coupon & Discount' });

const breadcrumbs = ref([
    {
        text: 'Coupon & Discount List',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-card elevation="10">
        <v-card-text>
            <EditableCouponDiscount />
        </v-card-text>
    </v-card>
</template>
