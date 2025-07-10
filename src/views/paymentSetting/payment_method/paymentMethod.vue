<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import EditableTableMethod from './EditableTableMethod.vue';
// theme breadcrumb
const page = ref({ title: 'Payment Method' });

const breadcrumbs = ref([
    {
        text: 'Payment Method List',
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
