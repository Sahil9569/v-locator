<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useEcomStore } from '@/stores/apps/eCommerce';
import axios from 'axios';
import { useRouter } from "vue-router";
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL
const panel = ref([0, 1, 2, 3, 4]);
// const priceSort = [
//     {
//         label: '$10 - $50',
//         price: '50'
//     },
//     {
//         label: '$50 - $100',
//         price: '100'
//     },
//     {
//         label: '$100 - $150',
//         price: '151'
//     },
//     {
//         label: '$150 - $200',
//         price: '200'
//     },
//     {
//         label: 'Over $200',
//         price: '250'
//     }
// ];

const store = useEcomStore();

//Reset Filter
store.filterReset();

const selectedGender = ref('');
store.SelectGender(selectedGender);

const selectedCategory = ref('all');
store.SelectCategory(selectedCategory);
const categories = ref([]);

const selectPrice = ref('');
store.SelectPrice(selectPrice);

const selectRating = ref(1);

onMounted(() => {
    store.fetchProducts();
    getAllCat();
});
function changeCategory(category)
{
    store.SelectCategory(category)
}
const getProducts = computed(() => {
    return store.products;
});
const getUniqueData = (data: any, attr: any) => {
    let newVal = data.map((curElem: any) => {
        return curElem[attr];
    });
    if (attr === 'colors') {
        newVal = newVal.flat();
    }

    return (newVal = [...Array.from(new Set(newVal))]);
};

const filterbyColors: any = computed(() => {
    return getUniqueData(getProducts.value, 'colors');
});


const tab5 = ref(null);

//Reset Filter Function
// function filterReset() {
    // store.SelectGender('');
    // store.SelectCategory('all');
    // store.SelectPrice('');
    // store.sortByColor('All');
// }
const getAllCat = async () => {
    console.log("Order LIST API CALL")
    try {
        const parts = window.location.href.split('/');
        const token = parts[parts.length - 2];
        const tab_id = window.location.href.split('/').pop();
        const formData = {
            token:token,
            url_token:tab_id,        
        };
        const response = await axios.post('api/customers/all_cat/',formData);
        console.log('CAT API response----------------------', response.data);
        if (response.data) {
            categories.value = response.data.map((item:any) => ({
                label: item.cat_name,
                value: item.cat_id // Assuming you have a category ID
            }));
        }
    } catch (error) {
        console.error('API error:', error);
        
    }
}


</script>
<template>
    <v-sheet class="py-3">
        <h2 class="text-h5 font-weight-semibold mb-2"> Categories </h2>
        <v-card elevation="0">
            <v-tabs bg-color="" center-active class="tabCustomSlide" >
                <v-tab class="mainLoopbtn">
                    <v-radio label="All" v-model="selectedCategory"  @click="changeCategory('all')" checked class="checkboxStyleCstm" color="light" value="all" hide-details> </v-radio>
                </v-tab>
                <v-tab v-for="category in categories" :key="category.value" class="mainLoopbtn">
                    <v-radio
                        :label="category.label"
                        v-model="selectedCategory"
                        class="checkboxStyleCstm"
                        color="light"
                        :value="category.label"
                        @click="changeCategory(category.label)"
                        hide-details
                    ></v-radio>
                </v-tab>
            </v-tabs>
        </v-card>
    </v-sheet>
</template>
<style lang="scss">
.custom-accordion {
    padding: 18px 2px;
    min-height: 30px !important;
    .v-expansion-panel-title__overlay {
        background-color: transparent;
    }
}
.acco-body {
    .v-expansion-panel-text__wrapper {
        padding: 5px 0;
    }
}
.custom-radio-box {
    .v-selection-control-group {
        flex-wrap: wrap;
    }
}


</style>
