<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import EditKitchenOrder from './EditKitchenOrder.vue';
// theme breadcrumb
const page = ref({ title: 'Kitchen Orders' });

const breadcrumbs = ref([
    {
        text: 'Orders',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <EditKitchenOrder />
</template>
