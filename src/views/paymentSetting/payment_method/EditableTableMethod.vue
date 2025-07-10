<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useContactStore } from '@/stores/apps/contact';

import paymentMethod from '@/_mockApis/apps/paymentSetting/paymentMethod';
// import { VTable, VPagination } from '@/_mockApis/apps/contact';
const store = useContactStore();

onMounted(() => {
    store.fetchContacts();
});
const getContacts: any = computed(() => {
    return store.contacts;
});

const itemsPerPage = 10;
const currentPage = ref(1);

const valid = ref(true);
const dialog = ref(false);
const data = ref(false);
const search = ref('');
const dishCategory = ref(['Indian food', 'Lunch Package', 'Maxican', 'Salad']);
// const kitchenAssign = ref(['Kitchen 1','Kitchen 2','Kitchen 3'])
const desserts = ref(paymentMethod);
const editedIndex = ref(-1);
const editedItem = ref({
    PaymentMethod: '',
    price: '',
    vat:'',
    discount: '',
    dishCategory: '',
    components: '',
    SNo: ''
});
const defaultItem = ref({
    PaymentMethod: '',
    price: '',
    discount: '',
    dishCategory: '',
    components: '',
    SNo: '',
    vat:'',
    rolestatus:''
});

//Methods
const filteredList = computed(() => {
    return desserts.value.filter((user: any) => {
        return user.PaymentMethod.toLowerCase().includes(search.value.toLowerCase());
    });
});

const paginatedList = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredList.value.slice(start, end);
});


</script>
<template>
    <v-row>
        <v-col cols="12" lg="4" md="6">
            <v-text-field density="compact" v-model="search" label="Search" hide-details variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="12" lg="8" md="6" class="text-right">
            <v-dialog v-model="dialog" max-width="500">
                <v-card>
                    <v-card-title class="pa-4 bg-primary">
                        <span class="title text-white">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.PaymentMethod"
                                        label="Dish Name"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="dishCategory"
                                        v-model="editedItem.dishCategory"
                                        label="Dish Category"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
            append-i                    prepend-inner-icon="mdi-map-marker"
                                        v-model="editedItem.price"
                                        label="Price"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.discount"
                                        label="Discount"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.vat"
                                        label="Vat %"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-textarea
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.components"
                                        label="components"
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>

                    <v-card-actions class="pa-4">
                        <v-spacer></v-spacer>
                        <v-btn color="error" @click="close">Cancel</v-btn>
                        <v-btn
                            color="primary"
                            :disabled="editedItem.PaymentMethod == '' || editedItem.price == ''"
                            variant="flat"
                            @click="save"
                            >Save</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
    <v-table class="mt-5">
        <thead>
            <tr>
                <th class="text-subtitle-1 font-weight-semibold">S No</th>
                <th class="text-subtitle-1 font-weight-semibold">Payment Method Name</th>
                <th class="text-subtitle-1 font-weight-semibold">Status</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in paginatedList" :key="item.id" :currentPage="currentPage" :pageSize="10">
                <td class="text-subtitle-1">{{ item.SNo }}</td>
                <td class="text-subtitle-1">{{ item.PaymentMethod }}</td>
                <td>
                    <v-switch
                        color="primary"
                        :model-value="item.status"
                        :class="item.status==true?'text-primary':'text-error'"
                        :label="item.status==true?'Active':'Inactive'"
                        @click="item.status==false?item.status=true:item.status=false"
                        ></v-switch>
                </td>
            </tr>
        </tbody>
    </v-table>
    <v-pagination v-model="currentPage" :length="Math.ceil(filteredList.length / itemsPerPage)"
        rounded="circle"></v-pagination>
</template>
