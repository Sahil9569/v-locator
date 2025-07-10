<script setup lang="ts">
import { ref } from "vue";
// import services_staff from '@/_mockApis/apps/services_staff';
import newOrderEditableList from './newOrderEditableList.vue';
const dialog = ref(false);
const table = ref(['Table-No 1', 'Table-No 2', 'Table-No 3']);
const firstname = ref('');
const lastname = ref('');
const phone = ref('');
</script>

<template>
    <v-card class="bg-lightprimary elevation-0 rounded-md mb-8">
        <div class="px-8 py-8 py-sm-0">
            <div class="d-flex justify-space-between">
                <div class="d-flex py-0 align-center">
                    <div>
                        <h3 class="text-h3 mb-2 textPrimary">New Order </h3>
                    </div>
                </div>
                <div class="d-none py-0 d-sm-block overflow-hidden">
                    <div class="mb-n16 mt-3">
                        <img src="@/assets/images/backgrounds/staffavailitiy.png" alt="breadcrumb" width="275" />
                    </div>
                </div>
            </div>
        </div>
    </v-card>


    <v-row>
        <v-col lg="6" md="6" sm="6">
            <v-text-field density="compact" v-model="search" label="Search Your Order" hide-details variant="outlined"></v-text-field>
        </v-col>
        <v-col lg="6" md="6" sm="6">
            <div class="d-flex justify-end">
                <div class=" rounded-md ps-2">
                    <v-btn class="text-primary bg-primary elevation-0">
                        New Order
                        <v-dialog v-model="dialog" activator="parent"  class="dialog-mw" max-width="500">
                            <v-card>
                                <v-card-text>
                                    <div class="text-h5 mb-5 text-primary border-bottom pb-2">Order Details</div>
                                    <div class="">
                                        <div class="">
                                            <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">Table No :</v-label>
                                            <v-select
                                            :items="table"
                                            required
                                            hide-details
                                            class="selectMaxWdth "
                                            density="compact"
                                            ></v-select>
                                        </div>
                                        <div class="mt-2">
                                            <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">First Name :</v-label>
                                            <VTextField
                                                v-model="firstname"
                                                required
                                                hide-details="auto"
                                                type="text"
                                                class="pwdInput inputFeildsCstm">
                                            </VTextField>
                                        </div>
                                        <div class="mt-2">
                                            <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">Last Name :</v-label>
                                            <VTextField
                                                v-model="lastname"
                                                required
                                                hide-details="auto"
                                                type="text"
                                                class="pwdInput inputFeildsCstm">
                                            </VTextField>
                                        </div>
                                        <div class="mt-2">
                                            <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">Phone No :</v-label>
                                            <VTextField
                                                v-model="phone"
                                                required
                                                hide-details="auto"
                                                type="text"
                                                class="pwdInput inputFeildsCstm">
                                            </VTextField>
                                        </div>
                                    </div>
                                </v-card-text>
                                <v-card-actions class="justify-end">
                                    <v-btn color="primary" class="bg-primary w-25 text-right" @click="dialog = false"
                                    >Next</v-btn
                                    >
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-btn>
                </div>
            </div>
        </v-col>
        <v-col>
            <v-card elevation="10">
                <v-card-text>
                    <newOrderEditableList />
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>


</template>