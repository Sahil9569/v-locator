<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import EditOrderList from './EditOrderList.vue';
// theme breadcrumb
const page = ref({ title: 'Order Detail' });

const breadcrumbs = ref([
    {
        text: 'Detail',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <EditOrderList/>
</template>
