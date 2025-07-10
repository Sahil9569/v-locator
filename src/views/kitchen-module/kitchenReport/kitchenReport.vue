<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import kitchenReport from './EditKitchenReport.vue';
// theme breadcrumb
const page = ref({ title: 'Kitchen Report' });

const breadcrumbs = ref([
    {
        text: 'Report',
        disabled: true,
        href: '#'
    }
]);



</script>

<template>
    <v-card elevation="0" rounded="md" class="bg-lightsecondary border-0 mb-10">
        <v-card-item class="pt-3 pb-0">
            <v-row class="align-center">
                <v-col cols="12" sm="6" class="pt-sm-10 pt-5">
                    <div class="d-flex align-center">
                        <img src="@/assets/images/backgrounds/growth.png" height="40"
                                alt="icon" />
                        <div class="ps-3">
                            <h3 class="text-h3 mb-2 textPrimary">{{ page.title }}</h3>
                            <v-breadcrumbs :items="breadcrumbs" class="text-h6 font-weight-medium pa-0 ml-n1">
                                <template v-slot:divider>
                                    <div class="d-flex align-center text-h3 mt-n4 textSecondary"></div>
                                </template>
                                <template v-slot:title="{ item }">
                                    <h6 class="text-medium-emphasis text-subtitle-1 textSecondary">{{ item.title }}</h6>
                                </template>
                            </v-breadcrumbs>
                        </div>
                    </div>
                    <div class="mt-8">
                    </div>

                </v-col>
                <v-col cols="12" sm="6" class="text-sm-right">
                    <div class="mb-n2 ">
                        <img src="@/assets/images/backgrounds/reportt.png" class="" alt="image" width="340" style="margin-bottom:-26px"/>
                    </div>
                </v-col>
            </v-row>
        </v-card-item>
    </v-card>
    <kitchenReport />
</template>
