<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import completeorderList from './EditablecompleteList.vue';
// theme breadcrumb
const page = ref({ title: 'Complete Order' });

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
            <completeorderList />
        </v-card-text>
    </v-card>
</template>
