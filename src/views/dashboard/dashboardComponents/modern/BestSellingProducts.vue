<script lang="ts" setup>
import type { router } from "@/router";
import { ref } from "vue";
const skill1 = ref(55);
const skill2 = ref(20);
</script>
<template>
    <v-card elevation="10" class="pa-5 py-6 h-100">
        <v-row class="">
            <v-col cols="12" class="py-0">
                <v-card-title class="text-h5 pa-0 mb-3">Quick Links</v-card-title>
            </v-col>
            <v-col cols="12" class="py-0">
                <div>
                    <div class="d-flex justify-start flex-wrap align-center quickLlinkBtn">
                        <div>
                            <RouterLink to="/staff/:ijjhghjg" class="text-decoration-none">
                                <v-btn variant="flat" color="primary">All Staff</v-btn>
                            </RouterLink>
                            <RouterLink to="/order-list/fdgdgd">
                                <v-btn variant="flat" color="primary">All Order</v-btn>
                            </RouterLink>
                            <RouterLink to="/kitchen/fdgdgd">
                                <v-btn variant="flat" color="primary"> Kitchen</v-btn>
                            </RouterLink>
                            <RouterLink to="/table/fdgdgd">
                                <v-btn variant="flat" color="primary">All Table</v-btn>
                            </RouterLink>
                            <RouterLink to="/food/fdgdgd">
                                <v-btn variant="flat" color="primary">All Food</v-btn>
                            </RouterLink>
                            <RouterLink to="/report/fdgdgd">
                                <v-btn variant="flat" color="primary">Report</v-btn>
                            </RouterLink>
                            <RouterLink to="/staffReport/fdgdgd">
                                <v-btn variant="flat" color="primary">Staff Report</v-btn>
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-card> 
</template>