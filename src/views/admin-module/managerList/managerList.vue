<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import EditableManager from './EditableManager.vue';
// theme breadcrumb
const page = ref({ title: 'Restaurants' });

const breadcrumbs = ref([
    {
        text: 'Restaurant',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
    <BaseBreadcrumb :title="page.title" ></BaseBreadcrumb>
    <v-card elevation="10">
        <v-card-text>
            <EditableManager />
        </v-card-text>
    </v-card>
</template>
