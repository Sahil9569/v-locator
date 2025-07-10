<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import EditableTableMethod from './EditableOrderList.vue';
// theme breadcrumb
const page = ref({ title: 'Order' });

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
            <EditableTableMethod />
        </v-card-text>
    </v-card>
</template>
