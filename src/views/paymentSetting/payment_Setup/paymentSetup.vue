<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import EditableTableSetup from './EditableTableSetup.vue';
// theme breadcrumb
const page = ref({ title: 'Payment Setup' });

const breadcrumbs = ref([
    {
        text: 'Payment Setup',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-card elevation="10">
        <v-card-text>
            <EditableTableSetup />
        </v-card-text>
    </v-card>
</template>
