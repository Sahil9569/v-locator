<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

/*import tabler icons*/
import { UserCircleIcon,BellIcon,ArticleIcon,LockIcon } from 'vue-tabler-icons';

//components
import AccountTab from '@/components/pages/account-settings/AccountTab.vue';

/*tab*/
const tab = ref(null);

// theme breadcrumb
const page = ref({ title: 'Account Setting' });
const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '#'
    },
    {
        text: 'Account Setting',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <AccountTab/>
</template>
