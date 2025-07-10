<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import EditablePackages from './EditablePackages.vue';
// theme breadcrumb
const page = ref({ title: 'Packages' });

const breadcrumbs = ref([
    {
        text: 'Packages List',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <EditablePackages />
</template>
