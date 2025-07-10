<script setup lang="ts">
import { ref, watch, nextTick  } from 'vue';
// import { useAuthStore } from '@/stores/auth';
import { Form } from 'vee-validate';
import axios from 'axios';
import { CurrencyDollarIcon } from 'vue-tabler-icons';
import { useRouter } from "vue-router";
const price = ref('');

const isHidden = ref(false)
const serrating = ref(3);
const foodrating = ref(2);
const resrating = ref(4);
</script>

<template>
    <div class="pa-3 v-application v-theme--DARK_BLUE_THEME customDarkClassAdd v-layout v-layout--full-height v-locale--is-ltr">
        <div v-if="!isHidden" class="widthWelcome pa-8 ">
            <v-row class="mt-6">
                    <v-col cols="12" sm="6">
                <h2 class="text-h3 font-weight-bold mb-2">Dashboard<span class="text-primary"> </span></h2>
                    </v-col>
                    <v-col cols="12" sm="6" class="text-end">
                        <v-btn size="mediam" color="primary" >My Order</v-btn>
                    </v-col>
                </v-row>
            <div class="">
            </div>
            <div class="mt-5">
                <h4 class="text-subtitle-1 font-weight-medium text-lightText mb-4"><span class="text-light font-weight-light">Service Staff : </span>Honey</h4>
                <div class="mb-4">
                    <v-label class="font-weight-medium mb-2 d-block">Tip Price</v-label>
                    <v-text-field color="primary" variant="outlined" type="text" class="text-white inputFeildsCstm" placeholder="Price" hide-details>
                        <template v-slot:prepend-inner>
                            <CurrencyDollarIcon stroke-width="1.5" size="22" class="text-white text-medium-emphasis mr-3" />
                        </template>
                    </v-text-field>
                </div>
                <div>
                    <v-row>
                        <v-col cols="12" class="py-2 mt-4">
                            <div class="d-flex align-center justify-space-between pa-3 bg-lightsecondary md-rounded">
                                <h2 class="text-subtitle-1 mr-3"> Food</h2>
                                <v-rating v-model="foodrating" density="compact" color="warning"></v-rating>
                            </div>
                        </v-col>
                        <v-col cols="12" class="py-2">
                            <div class="d-flex align-center justify-space-between pa-3 bg-lightsecondary md-rounded">
                                <h2 class="text-subtitle-1 mr-3"> Services</h2>
                                <v-rating v-model="serrating" density="compact" color="warning"></v-rating>
                            </div>
                        </v-col>
                        
                        <v-col cols="12" class="py-2">
                            <div class="d-flex align-center justify-space-between pa-3 bg-lightsecondary md-rounded">
                                <h2 class="text-subtitle-1 mr-3"> Restaurant</h2>
                                <v-rating v-model="resrating" density="compact" color="warning"></v-rating>
                            </div>
                        </v-col>
                    </v-row>

                </div>
                <v-row class="mt-6">
                    <v-col cols="12" sm="6">
                        <v-btn size="large" color="primary" block type="button" flat>Submit</v-btn>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-btn size="large" color="light" block variant="tonal">Skip</v-btn>
                    </v-col>
                </v-row>
            </div>
        </div>
    </div>
</template>
