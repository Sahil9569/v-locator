<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import EditKitchenDetail from './EditKitchenDetail.vue';
// theme breadcrumb
const page = ref({ title: 'Kitchen Detail' });

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
    <EditKitchenDetail />
</template>
