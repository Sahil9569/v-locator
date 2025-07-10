<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useContactStore } from '@/stores/apps/contact';

import singleKitchen from '@/_mockApis/apps/kitchenDetail';
// import { VTable, VPagination } from '@/_mockApis/apps/contact';
const store = useContactStore();
// const checkbox =ref();
// const checkbox2 =ref();
// const checkbox3 =ref();
// const checkbox4 =ref();
// const { steps, currentStep, prevStep, nextStep } = useSteps();

onMounted(() => {
    store.fetchContacts();
});
const getContacts: any = computed(() => {
    return store.contacts;
});


const desserts = ref(singleKitchen);


</script>
<template>
    <v-card elevation="10" class="pa-3 mb-4">
        <v-row>
            <v-col cols="12" xs="12" sm="12" md="6">
                <h2>#0021365</h2>
                <h5>Order Number</h5>
            </v-col>
            <v-col cols="12" xs="12" sm="12" md="6" class="text-md-end">
                <h2>#0021365</h2>
                <h5>Table Number</h5>
            </v-col>
        </v-row>
    </v-card>
    <v-row>
        <v-col cols="12" xs="12" sm="12" md="6" lg="4" v-for="item in desserts" :key="item.id">
            <v-card elevation="10">
                <div class="pt-3">
                    <img :src="item.foodImage" class="topImgCrdStl img-fluid"/>
                </div>
                <div class="pa-3 border-bottom">
                    <v-row>
                        <v-col cols="5">
                            <h5>Kitchen Name :</h5>
                        </v-col>
                        <v-col cols="7" class="text-end">
                            <h5>{{ item.kitchenName }}</h5>
                        </v-col>
                    </v-row>
                </div>
                <div class="pa-3 border-bottom">
                    <v-row>
                        <v-col cols="5">
                            <h5>Food Name :</h5>
                        </v-col>
                        <v-col cols="7" class="text-end">
                            <h5>{{ item.foodName }}</h5>
                        </v-col>
                    </v-row>
                </div>
                <div class="pa-3 border-bottom">
                    <v-row>
                        <v-col cols="5">
                            <h5>Food Category :</h5>
                        </v-col>
                        <v-col cols="7" class="text-end">
                            <h5>{{ item.category }}</h5>
                        </v-col>
                    </v-row>
                </div>
                <div class="pa-3 border-bottom">
                    <v-row>
                        <v-col cols="5">
                            <h5>Quantity :</h5>
                        </v-col>
                        <v-col cols="7" class="text-end">
                            <h5>{{ item.quantity }}</h5>
                        </v-col>
                    </v-row>
                </div>
                <div class="pa-3 border-bottom">
                    <v-row>
                        <v-col cols="5">
                            <h5>Addons :</h5>
                        </v-col>
                        <v-col cols="7"  class="text-end">
                            <h5 class="font-weight-medium text-subtitle-1 text-primary">
                                <span v-for="(itemss, index) in item.addon" :key="index">
                                    {{ itemss }} <span v-if="index != Object.keys(item.addon).length - 1 ">, </span>
                                </span>
                            </h5>
                        </v-col>
                    </v-row>
                </div>
                <!-- <div class="pa-3">
                    <h5 class="mb-3">Food Status</h5>
                    <v-select
                    :items="item.statusLabel"
                    label="Select Status"
                    hide-details
                    ></v-select>
                </div> -->
                <!-- <div class="process-bar-main-ord ">
                    <div class="status-bar" :style="{ height: statusBarWidth }"></div>
                    <div v-for="(step, index) in steps" :key="index" :class="['stepInrCol', { active: index + 1 <= currentStep }]">
                        <span>{{step.icons}}</span>
                    </div>
                </div>
                <div class="btns mainGrpBtnStl">
                    <button class="btn buttonStyleInrGrp" :disabled="currentStep === 1" @click="prevStep">Prev</button>
                    <button class="btn buttonStyleInrGrp" :disabled="currentStep === steps.length" @click="nextStep">Next</button>
                </div> -->
            </v-card>
        </v-col>
    </v-row>
</template>

