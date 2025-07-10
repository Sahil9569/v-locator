<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import EditableNotification from './EditableNotification.vue';
// theme breadcrumb
const page = ref({ title: ' All Notification' });

const breadcrumbs = ref([
    {
        text: 'See All Notification',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-card elevation="10">
        <v-card-text>
            <EditableNotification />
        </v-card-text>
    </v-card>
</template>
