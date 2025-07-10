<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import EditableTableList from './EditableTableList.vue';
// theme breadcrumb
const page = ref({ title: 'Table' });

const breadcrumbs = ref([
    {
        text: 'Table List',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-card elevation="10">
        <v-card-text>
            <EditableTableList />
        </v-card-text>
    </v-card>
</template>
