<script setup lang="ts">
import axios from 'axios';
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL
import { useRouter } from "vue-router";
const router = useRouter();
import { ref, computed, onMounted  } from 'vue';

const tab = ref(null);
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import EditableList from './EditableList.vue';
// theme breadcrumb
const page = ref({ title: 'All Orders' });
const dialog = ref(false);
const selectedTable = ref('---Select---')
const firstname = ref()
const lastname = ref()
const table = ref(['---Select---']);
const breadcrumbs = ref([
    {
        text: 'Order List',
        disabled: true,
        href: '#'
    }
]);

const phone = ref<string>('');
onMounted(() =>{
    fetchtableList();
});


const fetchtableList = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post('api/kitchen/fetch_all_tables/',{'token':token});
        console.log('staff list ka data  ---', response.data.claimed_tables);
        console.log('staff list ka data part 2 ---', response.data.to_be_claimed);
        const claim = response.data.claimed_tables;
        console.log(claim,"TBALE KA DATAA")
        const tableNumbers = claim.map(item => `${item.id}-${item.table}`);
        table.value = table.value.concat(tableNumbers);
    } catch (error) {
        console.error('API error:', error);
    }
}
const submitForm = async () => {
  try {
    // Prepare your data object based on form inputs
    dialog.value = false;
    const urlToken = window.location.href.split('/').pop();
    const formdata = {
        url_token:urlToken,
        tab_id:selectedTable.value,
        first_name:firstname.value,
        last_name:lastname.value,
        phone:phone.value,
    };
    const response = await axios.post('api/staff/create_customer/',formdata);
    if (response) {
      selectedTable.value = '---Select---';
      firstname.value = '';
      lastname.value = '';
      phone.value = '';
      console.log("sdfhjdsjfkhdbsfjkhdsbfjsdk",response.data.tab);
      localStorage.setItem('staffStatus','yes');
      localStorage.setItem('cus_id',response.data.customers.id);
      router.push(`/vlocator/menu/${urlToken}/${response.data.tab}`)
    } 
  } catch (error) {
    console.error('API error:', error);
  }
};
</script>

<template>
    <v-card class="bg-lightsecondary elevation-0 rounded-md mb-8">
        <div class="px-8 py-8 py-sm-0">
            <div class="d-flex justify-space-between">
                <div class="d-flex py-0 align-center">
                    <div>
                        <h3 class="text-h3 mb-2 textPrimary">All Orders</h3>
                    </div>
                </div>
                <div class="d-none py-0 d-sm-block overflow-hidden">
                    <div class="mb-n16 mt-3">
                        <img src="@/assets/images/backgrounds/order-img.png" alt="breadcrumb" width="300" />
                    </div>
                </div>
            </div>
        </div>
    </v-card>


    <v-row>
        <v-col>
            <v-tabs v-model="tab" color="primary" >
                <v-tab value="one" >Current Order</v-tab>
                <v-tab value="two" >All Order</v-tab>
            </v-tabs>
        </v-col>
        <v-col class="text-end">
            <v-card-actions class="justify-end">
                <v-btn class="text-primary bg-primary elevation-0 px-5">
                    New Order
                    <v-dialog v-model="dialog" activator="parent"  class="dialog-mw" max-width="500">
                        <v-card>
                            <v-form @submit.prevent="submitForm">
                            <v-card-text>
                                <div class="text-h5 mb-5 text-primary border-bottom pb-2">Order Details</div>
                                <div class="">
                                    <div class="">
                                        <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">Table No :</v-label>
                                        <v-select
                                        :items="table"
                                        v-model="selectedTable"
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
                                            type="number"
                                            :rules="[phoneNumberRule]"
                                            class="pwdInput inputFeildsCstm">
                                        </VTextField>
                                    </div>
                                </div>
                            </v-card-text>
                            <v-card-actions class="justify-end">
                                <v-btn color="primary" class="bg-primary w-25 text-right" @click="submitForm"
                                >Submit</v-btn
                                >
                            </v-card-actions>
                            </v-form>
                        </v-card>
                    </v-dialog>
                </v-btn>
            </v-card-actions>
        </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-card-text class="bg-grey100 mt-4 rounded-md">
        <v-window v-model="tab">
            <v-window-item value="one">
                <v-card elevation="10">
                    <v-card-text>
                        <EditableList />
                    </v-card-text>
                </v-card>
            </v-window-item>
            <v-window-item value="two">
                <v-card elevation="10">
                    <v-card-text>
                        <EditableList />
                    </v-card-text>
                </v-card>
            </v-window-item>
        </v-window>
    </v-card-text>

    <!-- <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb> -->
   
</template>
