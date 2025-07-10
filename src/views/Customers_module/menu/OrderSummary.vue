<script setup lang="ts">
import { computed, onMounted, onUpdated, reactive, ref } from 'vue';
import { useEcomStore } from '@/stores/apps/eCommerce';
import { CurrencyDollarIcon } from 'vue-tabler-icons';

const store = useEcomStore();
const dialog = ref(false)
const dialogTip = ref(false)
const serrating = ref(3);
const foodrating = ref(2);
const resrating = ref(4);
const checkboxDelivery = ref(false);
onMounted(() => {
    store.getsubTotal();
    store.getTotal();
    store.getDiscount();
});

</script>
<template>
    <div class="mt-5">
        <h2 class="text-h5 mb-2">Promo Code</h2>
        <div class="d-flex">
            <v-text-field variant="outlined" color="primary" model-value="View Your Promo Code" density="compact" readonly @focus="dialog = true" hide-details></v-text-field>
            <v-btn color="primary" class="ml-2" variant="outlined"  @click="dialog = true">View Promo Code</v-btn>
        </div>
        <v-dialog v-model="dialog" max-width="500">
            <v-card>
                <v-card-title class="pa-4 border-bottom">
                    <span class="title">Coupon & Discount</span>
                </v-card-title>
                <v-card-text class="pt-0">
                    <div class="mainDiscountRow border-bottom">
                        <div class="offerContntModal">
                            <v-chip color="secondary" size="x-small" class="font-weight-medium" label>Offer</v-chip>
                            <h3 class="text-dark text-h5 my-1">30% Off</h3>
                            <p class="text-body-2 line-height-2">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, ... Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                        </div>
                        <div class="butnContentMdl">
                            <v-btn color="primary" size="small" variant="outlined" @click="dialog = false">Apply</v-btn>
                        </div>
                    </div>
                    <div class="mainDiscountRow border-bottom">
                        <div class="offerContntModal">
                            <v-chip color="secondary" size="x-small" class="font-weight-medium" label>Sale</v-chip>
                            <h3 class="text-dark text-h5 my-1">Buy 1 & Get 1 Free</h3>
                            <p class="text-body-2 line-height-2">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, ... Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                        </div>
                        <div class="butnContentMdl">
                            <v-btn color="primary" size="small" variant="outlined" @click="dialog = false">Apply</v-btn>
                        </div>
                    </div>
                </v-card-text>
                <v-card-actions class="pa-4">
                    <v-spacer></v-spacer>
                    <v-btn color="error" variant="flat" @click="dialog = false">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
    <v-card variant="outlined" class="mt-8">
        <v-card-text>
            <div class="d-flex guranteeContentSt">
                <img src="@/assets/images/locator/best-seller.png"/>
                <h2 class="text-h4"><span class="text-primary">100% satisfaction guarantee</span> Place your order with peace of mind</h2>
            </div>
        </v-card-text>
    </v-card>
    <v-card variant="outlined" class="mt-6 my-3 pa-0">
        <v-card-item class="pa-sm-6 pa-2">
            <h5 class="text-h5 mb-3">Order Summery</h5>

            <div class="d-flex align-center justify-space-between border-bottom py-3">
                <h6 class="text-h6 font-weight-regular">Sub Total</h6>
                <h6 class="font-weight-semibold text-h6">${{subTotal}}</h6>
            </div>

            <div class="d-flex align-center justify-space-between border-bottom py-3">
                <h6 class="text-h6 font-weight-regular">Vat 5%</h6>
                <h6 class="font-weight-semibold text-h6"> $4.22</h6>
            </div>

            <div class="d-flex align-center justify-space-between border-bottom py-3">
                <h6 class="text-h6 font-weight-regular">Coupon & Discount</h6>
                <h6 class="font-weight-semibold text-h6 text-error">- $10.33</h6>
            </div>

            <div class="d-flex align-start justify-space-between border-bottom py-3">
                <v-expansion-panels>
                    <v-expansion-panel elevation="0">
                        <v-expansion-panel-title disable-icon-rotate class="text-h6 pa-0 d-inline-block font-weight-regular customAccordianTab">
                            Service Fee
                        <template v-slot:actions>
                            <v-icon color="primary" size="20px" icon="mdi-chevron-down">
                            </v-icon>
                        </template>
                        </v-expansion-panel-title>
                            <v-expansion-panel-text class="bodyTextCollapse">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </v-expansion-panel-text>
                        <v-divider></v-divider>
                    </v-expansion-panel>
                </v-expansion-panels>
                <h6 class="font-weight-semibold text-h6 pt-1">$5.00</h6>
            </div>

            <div class="d-flex align-center justify-space-between border-bottom py-3">
                <v-expansion-panels>
                    <v-expansion-panel elevation="0">
                        <v-expansion-panel-title disable-icon-rotate class="text-h6 pa-0 d-inline-block font-weight-regular customAccordianTab">
                            Prioroty Fee
                        <template v-slot:actions>
                            <v-icon color="primary" size="20px" icon="mdi-chevron-down">
                            </v-icon>
                        </template>
                        </v-expansion-panel-title>
                            <v-expansion-panel-text class="bodyTextCollapse">
                                This fee covers the additional cost of prioritizing your order.
                            </v-expansion-panel-text>
                        <v-divider></v-divider>
                    </v-expansion-panel>
                </v-expansion-panels>
                <h6 class="font-weight-semibold text-h6">$2.00</h6>
            </div>
            <div class="d-flex align-center justify-space-between border-bottom py-3">
                <div class="">
                        <v-checkbox-btn color="primary"  hide-details v-model="checkboxDelivery">
                            <template v-slot:label>
                                <div class="d-flex">
                                    <h6 class="text-h6 font-weight-regular">Delivery Tip</h6>
                                    <v-btn color="primary" class="ml-2" size="x-small" @click="dialogTip = true" variant="outlined">Change</v-btn>
                                </div>
                            </template>
                        </v-checkbox-btn>
                    <p class="text-subtitle-2 mt-2">Want to recognize your delivery person's efforts? Consider a larger tip as a thank you -100% of the tip goes to them.</p>
                    <v-dialog v-model="dialogTip" max-width="600">
                        <div class="pa-md-12 pa-4 v-application v-theme--DARK_BLUE_THEME customDarkClassAdd v-layout v-layout--full-height v-locale--is-ltr">
                            <div class="widthWelcome pa-4">
                                <div class="text-center">
                                    <h2 class="text-h3 font-weight-bold mb-2">Tips <span class="text-primary"> </span></h2>
                                    <div class="text-subtitle-1 mb-6">Are you happy &#128522; with our service ?</div>
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
                                            <v-btn size="large" color="light" @click="dialogTip = false" block variant="tonal">Skip</v-btn>
                                        </v-col>
                                    </v-row>
                                </div>
                            </div>
                        </div>
                    </v-dialog>
                </div>
                <h6 class="font-weight-semibold text-h6">$2.00</h6>
            </div>

            <div class="d-flex align-center justify-space-between pt-3">
                <h6 class="text-h6">Total</h6>
                <h6 class="font-weight-semibold text-h5">$139.11</h6>
            </div>
        </v-card-item>
    </v-card>
    <div class="buttonGroupPay">
        <v-btn color="primary" variant="flat" size="large" class="mt-2">
            Pay by QR
        </v-btn>
        <v-btn color="primary" variant="outlined" size="large" class="mt-2">
            Pay by Cash
        </v-btn>
    </div>
</template>
