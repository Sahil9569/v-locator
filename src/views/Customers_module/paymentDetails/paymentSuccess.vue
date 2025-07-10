<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useEcomStore } from '@/stores/apps/eCommerce';
import axios from 'axios';
import { useRouter } from "vue-router";
const router = useRouter();
import BASE_URL from '@/stores/myVar';
const radioColors = ref('1');
axios.defaults.baseURL = BASE_URL
// const oid_tip = ref('')

var url = new URL(window.location.href.replace("#/", ""))
const urlSearchParams = url.searchParams;

onMounted(() => {
    if (urlSearchParams.get("type")=="tip"){  changeTipPayStatus(); console.log("triggered tippay_________") }
    if (urlSearchParams.get("type")=="ord"){  changeOrdPayStatus(); console.log("triggered order___________") }
    if (urlSearchParams.get("type")=="pck"){ changePckPayStatus();  console.log("triggered package_________") }
});

const changeTipPayStatus = async () => {
    console.log("special_tip_________________")
    try {
        const parts = window.location.href.split('/');
        const token = parts[parts.length - 2];
        const table = window.location.href.split('/').pop();
        // const cus_id = localStorage.getItem('cus_id');
        // const order_id = localStorage.getItem('order_id');
        const formData = {
            token:token,
            table:table?.split('?')[0],
            rid:urlSearchParams.get("rid"),
            // odr_id:order_id,
        };
        console.log("captured data___________",formData);
        const response = await axios.post('api/customers/update_tip/', formData);
        if (response.data.status == "PAID")
        { console.log("response______________________",response.data); }
        else
        { console.log("response______________________FAILED TO UPDATE"); }
        setTimeout(() => {
            router.push(`/vlocator/customerDashboard/${token}`)
        }, 3000);
    } catch (error) {
        console.error('API error:', error);
        
    }
}
const changeOrdPayStatus = async () => {
    console.log("Order Items LIST API CALL")
    try {
        const parts = window.location.href.split('/');
        const token = parts[parts.length - 2];
        const table = window.location.href.split('/').pop();
        const cus_id = localStorage.getItem('cus_id');
        const order_id = localStorage.getItem('order_id');
        const formData = {
            token:token,
            table:table?.split('?')[0],
            rid:urlSearchParams.get("rid"),
            rcid:urlSearchParams.get("rcid"),
            cus_id:cus_id,
            odr_id:order_id,
        };
        console.log("YE HAI CATsssssssss2___",formData);
        const response = await axios.post('api/customers/order_place_final2/', formData);
        console.log("YAHA PE HAI",response.data);
        setTimeout(() => {
            router.push(`/vlocator/customerDashboard/${token}`)
        }, 3000);
       
        
    } catch (error) {
        console.error('API error:', error);
        
    }
}

const changePckPayStatus = async () => {
    console.log("package_pay_________________")
    try {
        const parts = window.location.href.split('/');
        const token = parts[parts.length - 2];
        const table = window.location.href.split('/').pop();
        // const cus_id = localStorage.getItem('cus_id');
        // const order_id = localStorage.getItem('order_id');
        const formData = {
            token:token,
            table:table?.split('?')[0],
            rid:urlSearchParams.get("rid"),
            // odr_id:order_id,
        };
        console.log("captured data___________",formData);
        const response = await axios.post('api/update_pck/', formData);
        if (response.data.status == "PURCHASED")
            { console.log("response______________________",response.data); }
        else
            { console.log("response______________________FAILED TO UPDATE"); }
        setTimeout(() => {
            router.push(`/packages/${token}`)
        }, 3000);
    } catch (error) {
        console.error('API error:', error);
        
    }
}

</script>

<template>
    <v-row class="justify-center">
        <v-col lg="5" md="6" sm="12" >
            <div class="d-flex align-center justify-center success_popupDesign">
                <v-card>
                    <v-card-text class="pb-8">
                        <div class="text-center mb-2">
                            <!-- <svg class="checkmark_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg> -->
                            <img src="@/assets/images/locator/v-icon.png" style="max-width:80px;">
                        </div>
                    <h2 class="text-h2 text-primary text-center">Payment Successful</h2>
                    <h6 class="text-h6 text-center custom-font-size">We have received the payment for your order <br> Thank You</h6>
                </v-card-text>
                </v-card>
            </div>
        </v-col>
    </v-row>
</template>
<style>
@media screen and (max-width:767px){
    .custom-font-size{
        font-size: 12px !important;
       }
}
</style>