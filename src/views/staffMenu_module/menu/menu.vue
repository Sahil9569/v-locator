<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import AppBaseCard from './AppBaseCard.vue';
//Types
import type { Products } from '@/types/apps/EcommerceType';
// import ProductItemVue from './ProductItem.vue';
import { useEcomStore } from '@/stores/apps/eCommerce';
import { orderBy, filter, includes } from 'lodash';

import ProductEmplty from './ProductEmplty.vue';
import ProductFilters from './ProductFilters.vue';
import axios from 'axios';
import { useRouter } from "vue-router";
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL

const qty = ref(1)
const dialog = ref(false)
const checkbox = ref(false)
const checkbox1 = ref(false)
const checkbox2 = ref(false)
const checkbox3 = ref(false)
const checkbox4 = ref(false)
const checkbox5 = ref(false)
const checkbox6 = ref(false)
const checkbox7 = ref(false)
const checkbox8 = ref(false)
const cartItems = ref([]);
const radioGroup3 = ref('2');

const getCart = computed(() => {
    return store.cart;
});
const successsnackbar = ref(false);
// ecommmerce
const store = useEcomStore();
const storeName = ref('');
const message = ref('');
const mockProducts = ref([]);
const socket = new WebSocket('ws://localhost:8000/ws/some_path/');


onMounted(() => {
    store.fetchProducts();
    getAllMenu();
    socket.addEventListener('open', (event:any) => {
    console.log('WebSocket is now OPEN. readyState:', event.target.readyState);
    // You can also use event.target here instead of socket
    localStorage.setItem('role','serviceStaff');
});
});

const getProducts = computed(() => {
  return mockProducts;
});

const selected = ref();
const searchValue = ref('');



const getVisibleProduct = (
    products: Products | any,
    sortBy: string,
    search: string | any,
    category: string | unknown,
) => {
    if (category !== 'all') {
        products = products.filter((product: Products | any) => {
            return product.categories.includes(category);
        });
    }

    if (search) {
        products = products.filter((product: Products) => {
            return product.name.toLowerCase().includes(search.value.toLowerCase());
        });
    }
    return products;
};

const filteredProducts = computed(() => {
    return getVisibleProduct(mockProducts.value, selected.value, searchValue, store.category);
});
const toggleSide = ref(false);

function AddCart(p: number) {
    store.AddToCart(p);
}
const getAllMenu = async () => {
    console.log("Order LIST API CALL")
    try {
        const parts = window.location.href.split('/');
        const token = parts[parts.length - 2];
        const tab_id = window.location.href.split('/').pop();
        const formData = {
            token:token,
            url_token:tab_id,        
        };
        console.log("YE HAI CAT",formData);
        const response = await axios.post('api/customers/all_menu/', formData);
        storeName.value = response.data.res_name;
        mockProducts.value = response.data.menu.map((item: any) => ({
            id: item.id,
            name: item.dish_name,
            image: item.image_url,
            description: item.dish_discripiton,
            salePrice: item.dish_price,
            offerPrice: item.dish_discount,
            rating: 5,
            categories: [item.dish_categories.cat_name], // Wrap in an array since you're using includes in getVisibleProduct function
            qty:1,
            real_base_price: item.dish_price,
            real_offer_price: item.dish_discount,
            // First Size group
            dish_price:item.dish_price,
            dish_discount:item.dish_discount,
            size:item.dish_size,
            // Second Size group
            dish_price1:item.dish_price2,
            dish_discount1:item.dish_discount2,
            size1:item.dish_size2,
            // Third Size group
            dish_price2:item.dish_price3,
            dish_discount2:item.dish_discount3,
            size2:item.dish_size3,
            radioGroup3:'1',
            isInCart:false,
        }));
        console.log(mockProducts.value);
    } catch (error) {
        console.error('API error:', error);
        
    }
}
const incrementQuantity = (product:any) => {
    product.qty++;
    updatePrices(product);
};

const decrementQuantity = (product:any) => {
    if (product.qty > 1) {
        product.qty--;
        updatePrices(product);
    }
};
const updatePrices = (product:any) => {
    // Calculate new prices based on quantity
    product.real_base_price = product.real_base_price * product.qty;
    product.real_offer_price = product.real_offer_price * product.qty;
};
const handleRadioChange = (product:any) => {
    // Calculate new prices based on quantity
    product.salePrice = product.dish_price;
    product.offerPrice = product.dish_discount;
    product.qty = 1;
    product.real_base_price= product.dish_price
    product.real_offer_price   = product.dish_discount
};
const handleRadioChange1 = (product:any) => {
    // Calculate new prices based on quantity
    product.salePrice = product.dish_price1;
    product.offerPrice = product.dish_discount1;
    product.qty = 1;
    product.real_base_price= product.dish_price1
    product.real_offer_price   = product.dish_discount1
};
const handleRadioChange2 = (product:any) => {
    // Calculate new prices based on quantity
    product.salePrice = product.dish_price2;
    product.offerPrice = product.dish_discount2;
    product.qty = 1;
    product.real_base_price= product.dish_price2
    product.real_offer_price   = product.dish_discount2
};

const addToCart = (product:any) => {
  const cartItem = {
    id: product.id,
    quantity: product.qty,
    size: product.radioGroup3, // You may need to adjust this based on your data structure
    name: product.name,
  };
  console.log('hello aagya baba ji ka thullu',cartItem)
  cartItems.value.push(cartItem);
  successsnackbar.value = true;
  console.log(cartItems.value,"HEHEHEHEHEHEHEH");
  hideProductInCart(product);
  product.isInCart = true;
};

const removeFromCart = (product:any) => {
  // ... Your existing removeFromCart logic ...
  // After removing from cart, you might want to show the "Add to Cart" button
  const index = cartItems.value.findIndex(item => item.id === product.id);
  if (index !== -1) {
    cartItems.value.splice(index, 1);
  }
  showProductInCart(product);
  if (cartItems.value.length === 0) {
    successsnackbar.value = false; // Set successsnackbar to false when cart is empty
  }
};

const hideProductInCart = (product:any) => {
  product.isInCart = true;
};

const showProductInCart = (product:any) => {
  product.isInCart = false;
};
const addItemsToCart = async () => {
    try {
        const parts = window.location.href.split('/');
        const token = parts[parts.length - 2];
        const tab_id = window.location.href.split('/').pop();
        const cus_id = localStorage.getItem('cus_id');
        const formData = {
            token:token,
            table:tab_id,
            items:cartItems.value,
            cus_id:cus_id,
        };
        console.log("YE HAI CAT",formData);
        const response = await axios.post('api/customers/add_to_cart/', formData);
        console.log("YE HAI MENU CAT",response.data.menu.id);
        localStorage.setItem('order_id',response.data.menu.id)
        router.push(`/vlocator/myOrder/${token}/${tab_id}`);
    } catch (error) {
        console.error('API error:', error);
        
    }
};
</script>

<template>
    <div class="">
        <v-card elevation="0" rounded="md" class="bg-lightsecondary  border-0 mb-10">
            <v-card-item class="pt-3 pb-0">
                <v-row class="align-center">
                    <v-col cols="12" sm="6" class="">
                        <div class="d-flex align-center justify-sm-start justify-center">
                            <!-- <v-avatar size="40"><img src="@/assets/images/profile/user-1.jpg" height="40"
                                    alt="icon" /></v-avatar> -->
                            <h5 class="text-h2 ml-4">Welcome to<br> Staff Menu</h5>
                        </div>
                    </v-col>
                    <v-col cols="12" sm="6" class="text-sm-right">
                        <div class="mb-n2 ">
                            <img src="@/assets/images/locator/banner-customer.png" class="" alt="image" width="340" />
                        </div>
                    </v-col>
                </v-row>
            </v-card-item>
        </v-card>
    </div>
    <v-card elevation="10" class="inside-left-sidebar overflow-hidden">
        <AppBaseCard>
            <!-- -------------------------------------- -->
            <!-- Left Sidebar -->
            <!-- -------------------------------------- -->
            <template v-slot:leftpart>
                <ProductFilters />
            </template>
            <!-- -------------------------------------- -->
            <!-- Right Side Content Part -->
            <!-- -------------------------------------- -->
            <template v-slot:rightpart>
                <perfect-scrollbar>
                    <v-sheet class="pa-4">
                        <div class="d-flex gap-2 align-center mb-4 justify-space-between">
                            <h5 class="text-h5 d-none d-lg-flex font-weight-semibold">Explore variety of recipes.</h5>
                            <v-sheet  width="300">
                                <v-text-field
                                    variant="outlined"
                                    v-model="searchValue"
                                    prepend-inner-icon="mdi-magnify"
                                    placeholder="Search Food"
                                    hide-details
                                    density="compact"
                                    color="primary"
                                ></v-text-field>
                            </v-sheet>
                        </div>
                        <v-row v-if="filteredProducts.length >= 1">
                            <v-col cols="12" md="4" sm="6" class="mt-6" v-for="product in filteredProducts" :key="product.id">
                                <v-card variant="outlined" class="rounded">
                                    <div class="mainCardMenuSt">
                                        <div class="radioSizeGroup">
                                            <v-radio-group hide-details v-model="product.radioGroup3" inline class="d-flex gap-3 justify-center">
                                                <v-radio v-if="product.size === 'Small' || product.size === 'Standard'" label="S" color="primary" value="1" @change="handleRadioChange(product)"></v-radio>
                                                <v-radio v-if="product.size1 === 'Medium'" label="M" color="primary" value="2" @change="handleRadioChange1(product)"></v-radio>
                                                <v-radio v-if="product.size2 === 'Large'" label="L" color="primary" value="3" @change="handleRadioChange2(product)"></v-radio>
                                            </v-radio-group>
                                        </div>
                                        <div class="imageSizeProduct">
                                            <router-link :to="`/ecommerce/product/detail/${product.id}`">
                                                <img alt="product" :src="product.image" class="w-100" />
                                            </router-link>
                                        </div>
                                        <div class="contentSideMenu">
                                            <v-card-item class="pt-3 pb-3">
                                                <h6 class="text-h6 mb-1">{{ product.name }}</h6>

                                                <div class="d-flex align-center justify-space-between mt-1 mb-2">
                                                    <div class="d-flex align-center gap-2">
                                                        <h6 class="text-subtitle-1 font-weight-bold">${{ product.real_offer_price }}</h6>
                                                        <p class="text-decoration-line-through text-subtitle-2 text-error text-medium-emphasis">${{ product.real_base_price }}</p>
                                                    </div>
                                                    <!-- <v-rating color="warning" half-increments size="small" v-model="rate" density="compact"> </v-rating> -->
                                                </div>
                                                <div class="toggleButtonQty">
                                                    <v-btn-toggle>
                                                        <v-btn size="x-small" color="error" class="btnStyleQty" :disabled="product.qty < 2" @click="decrementQuantity(product)">
                                                            <MinusIcon size="14" />
                                                        </v-btn>

                                                        <v-btn size="x-small">
                                                            {{ product.qty }}
                                                        </v-btn>

                                                        <v-btn size="x-small" color="primary" class="btnStyleQty" @click="incrementQuantity(product)">
                                                            <PlusIcon size="14" />
                                                        </v-btn>
                                                    </v-btn-toggle>

                                                </div>
                                                <div class="mt-2">
                                                    <template v-if="!product.isInCart">
                                                        <v-tooltip text="Add to Cart" location="bottom">
                                                            <template v-slot:activator="{ props }">
                                                            <v-btn
                                                                variant="flat"
                                                                v-bind="props"
                                                                color="primary"
                                                                class="ml-auto"
                                                                size="small"
                                                                @click="addToCart(product)"
                                                            ><BasketIcon size="18" class="me-1"/> Add To Cart</v-btn>
                                                            </template>
                                                        </v-tooltip>
                                                        </template>
                                                        <template v-else>
                                                        <v-btn
                                                            variant="flat"
                                                            color="error"
                                                            size="small"
                                                            @click="removeFromCart(product)"
                                                        >Remove</v-btn>
                                                        </template>
                                                    <v-btn
                                                        variant="flat"
                                                        color="secondary"
                                                        class="ml-2"
                                                        size="small"
                                                        @click="product.dialog = true"
                                                        > Addon</v-btn>
                                                        <v-dialog v-model="product.dialog" max-width="500">
                                                            <!-- <template v-slot:activator="{ props }">
                                                                <v-btn color="primary" v-bind="props" flat class="ml-auto">
                                                                    <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Add Food
                                                                </v-btn>
                                                            </template> -->
                                                            <v-card>
                                                                <v-card-title class="pa-4">
                                                                    <span class="title">Addons</span>
                                                                </v-card-title>

                                                                <v-card-text>
                                                                    <v-form ref="form">
                                                                        <v-row>
                                                                            <v-col cols="12" class="py-0 border-bottom">
                                                                                <v-checkbox-btn color="primary"  hide-details v-model="checkbox">
                                                                                    <template v-slot:label>
                                                                                        <v-row>
                                                                                            <v-col cols="7" sm="8" class="d-block">Vegan Cheese</v-col>
                                                                                            <v-col cols="5" sm="4" class="d-flex justify-end">$5</v-col>
                                                                                        </v-row>
                                                                                    </template>
                                                                                </v-checkbox-btn> 
                                                                            </v-col>
                                                                            <v-col cols="12" class="py-0 border-bottom">
                                                                                <v-checkbox-btn color="primary"  hide-details v-model="checkbox1">
                                                                                    <template v-slot:label>
                                                                                        <v-row>
                                                                                            <v-col cols="7" sm="8" class="d-block">Onion</v-col>
                                                                                            <v-col cols="5" sm="4" class="d-flex justify-end">$2</v-col>
                                                                                        </v-row>
                                                                                    </template>
                                                                                </v-checkbox-btn> 
                                                                            </v-col>
                                                                            <v-col cols="12" class="py-0 border-bottom">
                                                                                <v-checkbox-btn color="primary"  hide-details v-model="checkbox2">
                                                                                     <template v-slot:label>
                                                                                        <v-row>
                                                                                            <v-col cols="7" sm="8" class="d-block">Carrot</v-col>
                                                                                            <v-col cols="5" sm="4" class="d-flex justify-end">$3</v-col>
                                                                                        </v-row>
                                                                                    </template>
                                                                                </v-checkbox-btn> 
                                                                            </v-col>
                                                                            <v-col cols="12" class="py-0 border-bottom">
                                                                                <v-checkbox-btn color="primary"  hide-details v-model="checkbox3">
                                                                                     <template v-slot:label>
                                                                                        <v-row>
                                                                                            <v-col cols="7" sm="8" class="d-block">Tomato</v-col>
                                                                                            <v-col cols="5" sm="4" class="d-flex justify-end">$4</v-col>
                                                                                        </v-row>
                                                                                    </template>
                                                                                </v-checkbox-btn> 
                                                                            </v-col>
                                                                            <v-col cols="12" class="py-0 border-bottom">
                                                                                <v-checkbox-btn color="primary" hide-details v-model="checkbox4">
                                                                                     <template v-slot:label>
                                                                                        <v-row>
                                                                                            <v-col cols="7" sm="8" class="d-block">Veggie burger</v-col>
                                                                                            <v-col cols="5" sm="4" class="d-flex justify-end">$4</v-col>
                                                                                        </v-row>
                                                                                    </template>
                                                                                </v-checkbox-btn> 
                                                                            </v-col>
                                                                            <v-col cols="12" class="py-0 border-bottom">
                                                                                <v-checkbox-btn color="primary"  hide-details v-model="checkbox5">
                                                                                     <template v-slot:label>
                                                                                        <v-row>
                                                                                            <v-col cols="7" sm="8" class="d-block">Sprouts</v-col>
                                                                                            <v-col cols="5" sm="4" class="d-flex justify-end">$1</v-col>
                                                                                        </v-row>
                                                                                    </template>
                                                                                </v-checkbox-btn> 
                                                                            </v-col>
                                                                            <v-col cols="12" class="py-0 border-bottom">
                                                                                <v-checkbox-btn color="primary" hide-details v-model="checkbox6">
                                                                                     <template v-slot:label>
                                                                                        <v-row>
                                                                                            <v-col cols="7" sm="8" class="d-block">Mushroom</v-col>
                                                                                            <v-col cols="5" sm="4" class="d-flex justify-end">$3</v-col>
                                                                                        </v-row>
                                                                                    </template>
                                                                                </v-checkbox-btn> 
                                                                            </v-col>
                                                                            <v-col cols="12" class="py-0 border-bottom">
                                                                                <v-checkbox-btn color="primary"  hide-details v-model="checkbox7">
                                                                                     <template v-slot:label>
                                                                                        <v-row>
                                                                                            <v-col cols="7" sm="8" class="d-block">Spicy vegan mayo</v-col>
                                                                                            <v-col cols="5" sm="4" class="d-flex justify-end">$6</v-col>
                                                                                        </v-row>
                                                                                    </template>
                                                                                </v-checkbox-btn> 
                                                                            </v-col>
                                                                            <v-col cols="12" class="py-0 border-bottom">
                                                                                <v-checkbox-btn color="primary"  hide-details v-model="checkbox8">
                                                                                     <template v-slot:label>
                                                                                        <v-row>
                                                                                            <v-col cols="7" sm="8" class="d-block">Pickle</v-col>
                                                                                            <v-col cols="5" sm="4" class="d-flex justify-end">$1</v-col>
                                                                                        </v-row>
                                                                                    </template>
                                                                                </v-checkbox-btn> 
                                                                            </v-col>
                                                                        </v-row>
                                                                    </v-form>
                                                                </v-card-text>

                                                                <v-card-actions class="pa-4">
                                                                    <v-spacer></v-spacer>
                                                                    <v-btn color="error" @click="product.dialog = false">Cancel</v-btn>
                                                                    <v-btn
                                                                        color="primary"
                                                                        variant="flat"
                                                                        @click="product.dialog = false"
                                                                        >Add</v-btn
                                                                    >
                                                                </v-card-actions>
                                                            </v-card>
                                                        </v-dialog>
                                                </div>
                                            </v-card-item>
                                        </div>
                                    </div>
                                    <v-snackbar variant="flat" :timeout="90000" location="bottom right" color="success" rounded="md" class="" v-model="successsnackbar">
                                        <v-row class="align-center">
                                            <v-col cols="8" class="d-flex flex-wrap">
                                                <span color="dark" class="countLabelDsgn">{{cartItems?.length}}</span> <span class="contentItemsCrt font-weight-medium">Added your items </span>
                                            </v-col>
                                            <v-col cols="4">
                                                <span class="viewCrtBtn">
                                                    <v-btn
                                                    variant="flat"
                                                    color="light"
                                                    class="ml-auto text-success font-weight-semibold"
                                                    size="small"
                                                    @click="addItemsToCart()">Next</v-btn>
                                                </span>
                                            </v-col>
                                        </v-row>
                                        <template v-slot:actions>
                                            <v-btn
                                            color="blue"
                                            variant="text"
                                            class="buttonCloseBadge"
                                            @click="successsnackbar = false"
                                            >
                                            <i class="mdi mdi-close"></i>
                                            </v-btn>
                                        </template>
                                    </v-snackbar>
                                </v-card>
                            </v-col>
                        </v-row>
                        <ProductEmplty v-else />
                    </v-sheet>
                </perfect-scrollbar>
            </template>
            <!-- -------------------------------------- -->
            <!-- Mobile Sidebar -->
            <!-- -------------------------------------- -->
            <template v-slot:mobileLeftContent> <ProductFilters /> </template>
        </AppBaseCard>
    </v-card>
</template>

<style scoped lang="scss">
@media (max-width: 1279px) {
    .v-card {
        position: unset;
    }
}
</style>
