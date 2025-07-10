<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue';
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

// import bgIMage from '@/assets/images/locator/Easy-Coconut-Rice.jpg'
const loading = ref(false);
const insta = ref(false)
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
const addonPrice = ref(0);
const selectedSize = ref('S');
const isLoading = ref(true);
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
const Rtoken = ref('');
const Tid = ref('');

onBeforeMount(async () => {
    await getAllMenu();
    chkCartData();  
    var s = localStorage.getItem('staffStatus');
    if (s === 'yes') {
        localStorage.setItem('role', 'serviceStaff');
    } else {
        localStorage.setItem('role', 'customer');
    }
    var a = localStorage.getItem('cus_id');
    if (a === null) {
        insta.value = false;
    } else {
        insta.value = true;
    }
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
        localStorage.setItem('table',tab_id);
        Rtoken.value = token;
        Tid.value = tab_id;
        const formData = {
            token:token,
            url_token:tab_id,        
        };
        console.log("YE HAI CAT111111",formData);
        isLoading.value =true;
        const response = await axios.post('api/customers/all_menu/', formData);
        storeName.value = response.data.res_name;
        console.log("MENU DATA CHK",response.data.menu)
        isLoading.value =false;
        mockProducts.value = response.data.menu.map((item: any) => ({
            id: item.id,
            name: item.dish_name,
            image: item.base64_images,
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
            addons:item.addons,
            dialogCustomize:false,
        }));
        isLoading.value =false;
        console.log("CHEKCH HERERERERE 222222",mockProducts.value);
    } catch (error) {
        console.error('API error:', error);
        
    }
}



const incrementQuantity = (product:any) => {
    console.log("Increment Chal Raha Hai")
    product.qty++;
    updatePrices(product);
};

const decrementQuantity = (product:any) => {
    console.log("Decrement Chal Raha Hai")
    if (product.qty > 1) {
        product.qty--;
        updatePrices(product);
    }
};
const updatePrices = (product:any) => {
    console.log("Update Price Chal Raha Hai")
    let addonsTotal = 0;
    // Loop through addons and calculate total if checked
    for (const addon of product.addons) {
        console.log("JAI HIND",addon)
        if (addon.checked) {
            console.log("JAI VEERU")
            addonsTotal += parseFloat(addon.add_price);
            console.log("FOR LOOP",addonsTotal)

        }
    }
    console.log("YYYEYEYEYEY3",addonsTotal)

    if (selectedSize.value === 'S') {
        // product.real_base_price = ((parseFloat(product.dish_price) * product.qty) + (product.qty * addonPrice.value)).toFixed(2);
        product.real_offer_price = ((parseFloat(product.dish_discount) * product.qty) + (product.qty * addonsTotal)).toFixed(2);
    } else if (selectedSize.value === 'M') {
        // product.real_base_price = ((parseFloat(product.dish_price1) * product.qty) + (product.qty * addonPrice.value)).toFixed(2);
        product.real_offer_price = ((parseFloat(product.dish_discount1) * product.qty) + (product.qty * addonsTotal)).toFixed(2);
    } else {
        // product.real_base_price = ((parseFloat(product.dish_price2) * product.qty) + (product.qty * addonPrice.value)).toFixed(2);
        product.real_offer_price = ((parseFloat(product.dish_discount2) * product.qty) + (product.qty * addonsTotal)).toFixed(2);
    }
    
};

const handleRadioChange = (product:any) => {
    // product.real_offer_price   = product.dish_discount
    selectedSize.value = 'S'
    updatePrices(product);
};
const handleRadioChange1 = (product:any) => {
    // product.real_offer_price   = product.dish_discount1
    console.log("HELLO WORLD",product)
    selectedSize.value = 'M'
    updatePrices(product);
};
const handleRadioChange2 = (product:any) => {
    // product.real_offer_price   = product.dish_discount2
    selectedSize.value = 'L'
    updatePrices(product);
};

const addToCart = (product:any) => {
  if (product && product.addons && Array.isArray(product.addons)) {
    const selectedAddons = product.addons.filter((addon: any) => addon.checked === true);
    const cartItem = {
      id: product.id,
      quantity: product.qty,
      size: product.radioGroup3,
      name: product.name,
      addons: selectedAddons,
      item_total_base:product.real_base_price,
      item_total_offer:product.real_offer_price,
    };
    cartItems.value.push(cartItem);
    successsnackbar.value = true;
    hideProductInCart(product);
    product.isInCart = true;
  } else {
    const cartItem = {
      id: product.id,
      quantity: product.qty,
      size: product.radioGroup3,
      name: product.name,
      addons: [],
    };
    cartItems.value.push(cartItem);
    successsnackbar.value = true;
    hideProductInCart(product);
    product.isInCart = true;
  }
};


const removeFromCart = (product:any) => {
  // ... Your existing removeFromCart logic ...
  // After removing from cart, you might want to show the "Add to Cart" button
  const index = cartItems.value.findIndex(item => item.id === product.id);
  if (index !== -1) {
    cartItems.value.splice(index, 1);
    product.qty = 1
    addonPrice.value = 0
    updatePrices(product);
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

const myfunc = (product:any) => {
    addToCart(product);
    console.log("STEP IIIII",product)
    product.dialogCustomize = false
    // product.
    // console.log("STEP IIIII")

};
const updateAddonSelection = (product:any,addon:any) => {
    console.log("Addon Chal Raha Hai")
    addon.checked = !addon.checked
    updatePrices(product)
};

const addItemsToCart = async () => {
    try {
        const parts = window.location.href.split('/');
        const token = parts[parts.length - 2];
        const tab_id = window.location.href.split('/').pop();
        const cus_id = localStorage.getItem('cus_id');
        const order = localStorage.getItem('order_id');
        const formData = {
            token:token,
            table:tab_id,
            items:cartItems.value,
            cus_id:cus_id,
            order:order,
        };
        loading.value = true;
        console.log("ADDED ITEMS SENDS TO CART",formData);
        const response = await axios.post('api/customers/add_to_cart/', formData);
        console.log("YE HAI RESPONSE",response.data.menu.id);
        localStorage.setItem('order_id',response.data.menu.id)
        // loading.value = false;
        router.push(`/vlocator/myOrder/${token}/${tab_id}`);
    } catch (error) {
        console.error('API error:', error);
        
    }
};
const chkCartData = async () => {
    console.log("HELLO WORLD")
    const storedOrderId = localStorage.getItem('order_id');
    if (storedOrderId) {
        try {
            const formData = {
                ord:storedOrderId,
            };
            const response = await axios.post(`api/customers/get_order/`, formData);
            if (response.data) {
                const order = response.data;
                const cartItemsInOrder = order.items;
                // Iterate through your products and mark items already in the order
                mockProducts.value.forEach((product) => {
                const itemInOrder = cartItemsInOrder.find((item:any) => item.item.id === product.id);
                if (itemInOrder) {
                    product.isInCart = true;
                    product.orderItemId = itemInOrder.id;
                    product.qty = itemInOrder.quantity;
                    product.real_offer_price = itemInOrder.total_amount;
                    successsnackbar.value = true; 
                    const cartItem = {
                        id: product.id,
                        quantity: itemInOrder.quantity,
                        size: itemInOrder.size,
                        name: itemInOrder.item.dish_name,
                        addons: itemInOrder.addons,
                        item_total_base:product.real_base_price,
                        item_total_offer:product.real_offer_price,
                    };
                    cartItems.value.push(cartItem);
                }
                console.log("MOCKPRODUCTS",mockProducts.value)
                });
            }
            else{
                alert("Else Running")
            }
        } catch (error) {
        console.error('API error:', error);
        }
    }
};
</script>

<template>
    <main>
        <div class="">
            <v-card elevation="0" rounded="md" class="bg-lightsecondary  border-0 mb-10">
                <v-card-item class="pt-3 pb-0">
                    <v-row class="align-center">
                        <v-col cols="12" sm="6" class="">
                            <div class="d-flex flex-wrap align-center justify-sm-start justify-center">
                                <!-- <v-avatar size="40"><img src="@/assets/images/profile/user-1.jpg" height="40"
                                        alt="icon" /></v-avatar> -->
                                <h5 class="text-h2 d-block text-center text-sm-left w-100">Welcome to <span class="text-primary">{{storeName}}</span></h5>
                                <v-btn v-if="insta" variant="flat" color="primary" :to="`/vlocator/customerDashboard/${Rtoken}`" class="mt-3">My Orders</v-btn>
                                <p v-else class="d-block  font-weight-regular mt-2 text-center text-sm-left" style="width:100%;">Repeat order / Existing customer ? <router-link :to="`/vlocator/${Rtoken}/${Tid}?condition=repeat`" class="text-primary"> Click Here</router-link></p>
                            </div>

                        </v-col>
                        <v-col cols="12" sm="6" class=" text-sm-right">
                            <div class="mb-n2 d-none py-0 d-sm-inline-block">
                                <img src="@/assets/images/locator/banner-customer.png" class="" alt="image" width="340"/>
                            </div>
                        </v-col>
                    </v-row>
                </v-card-item>
            </v-card>
        </div>
        <div elevation="10" class="inside-left-sidebar overflow-hidden">
            <AppBaseCard>
                
                <template v-slot:leftpart>
                    <ProductFilters />
                </template>
        
                <template v-slot:rightpart>
                        <v-sheet class="pa-4  px-0 mt-5">
                            <v-row>
                                <v-col cols="12" md="8" sm="6">
                                    <h5 class="text-h5  font-weight-semibold">Explore variety of recipes.</h5>
                                </v-col>
                                <v-col cols="12" md="4" sm="6">
                                    <v-sheet >
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
                                </v-col>
                            </v-row>
                            <v-row v-if="isLoading">
                            <!-- Show loading indicator -->
                            <v-col cols="12" class="text-center">
                                <v-progress-circular indeterminate color="primary"></v-progress-circular>
                            </v-col>
                            </v-row>
                            <v-row v-else >
                                <v-col v-if="filteredProducts.length >= 1" cols="12" lg="4" md="6" sm="6" v-for="product in filteredProducts" :key="product.id">
                                    <v-card elevation="10" class="bg-lightsecondary overflow-hidden">
                                        <div class="mainCardMenuSt pa-2">
                                            <div class="imageSizeProduct">
                                                <templates v-if="product.image">
                                                    <img alt="product" :src="product.image" class="w-100" @click="product.dialogCustomize = true" style="cursor:pointer"/>
                                                </templates>
                                                <templates v-else>
                                                    <td class="text-subtitle-1 py-1"><img src="@/assets/images/locator/v-icon.png" class="imageCustomTable img-fluid" /></td>
                                                </templates>
                                            </div>

                                            <div class="contentSideMenu">
                                                <v-card-item class="pa-0 ps-3 h-100">
                                                    <div class="" @click="product.dialogCustomize = true" style="cursor:pointer">
                                                        <h6 class="text-h6 text-capitalize mb-1" >{{ product.name }}</h6>
                                                        <v-row class="my-2">
                                                            <v-col cols="col" class="py-0">
                                                                <template v-if="product.dish_discount">
                                                                    <h6 class="text-h6 font-weight-bold text-primary mb-0">${{ product.dish_discount}}</h6>
                                                                </template>
                                                                <template v-else>
                                                                    <h6 class="text-h6 font-weight-bold text-primary mb-0">$0</h6>
                                                                </template>        
                                                            </v-col>
                                                            <v-col cols="auto" class="py-0">
                                                                <div class="d-flex gap-1 mt-1 text-subtitle-1">
                                                                    <i class="mdi mdi-star text-warning line-height-1"></i>
                                                                    <i class="mdi mdi-star text-warning line-height-1"></i>
                                                                    <i class="mdi mdi-star text-warning line-height-1"></i>
                                                                    <i class="mdi mdi-star text-warning line-height-1"></i>
                                                                    <i class="mdi mdi-star-outline text-warning line-height-1"></i>
                                                                </div>
                                                            </v-col>
                                                        </v-row>
                                                        <p class="text-subtitle-1 text-medium-emphasis">{{product.description.substring(0, 70) + '...'}}</p>
                                                        
                                                    </div>
                                                    
                                                    <div class="d-flex flex-wrap gap-2 mt-3">
                                                            
                                                            <template v-if="!product.isInCart">
                                                                <v-tooltip text="Add to Cart" location="bottom">
                                                                    <template v-slot:activator="{ props }">
                                                                    <v-btn
                                                                        variant="flat"
                                                                        color="primary"
                                                                        size="small"
                                                                        v-bind="props"
                                                                        @click="product.dialogCustomize = true"
                                                                        style="cursor:pointer"
                                                                    >Add to Cart</v-btn>
                                                                    </template>
                                                                </v-tooltip>
                                                            </template>
                                                            <template v-else>
                                                            <v-btn
                                                                    variant="flat"
                                                                    color="error"
                                                                    size="small"
                                                                    class=""
                                                                    @click="removeFromCart(product)"
                                                                >Cancel
                                                            </v-btn>
                                                            </template>
                                                            <v-dialog v-model="product.dialogCustomize" transition="dialog-bottom-transition" scrollable max-width="575">
                                                                <v-card>
                                                                    <v-card-title class="pa-0">
                                                                        <div class="imageBannerTop">
                                                                            <!-- <img src="@/assets/images/locator/Easy-Coconut-Rice.jpg" alt=""> -->
                                                                                <img alt="product" v-if="product.image" :src="product.image" class="w-100"/>
                                                                                <div v-else class="w-100 d-flex justify-center align-center py-8">
                                                                                    <img  src="@/assets/images/locator/v-icon.png" alt="Dummy Image" />
                                                                                </div>

                                                                            <div class="mainTopBnrMenu">
                                                                                <div class="iconSizeMenu bg-primary" @click="product.dialogCustomize = false">
                                                                                    <XIcon size="20"/>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </v-card-title>

                                                                    <v-card-text class="pa-0 bg-lightsecondary">
                                                                        <v-form ref="form">
                                                                            <v-card elevation="0" class="mb-3 rounded-0">
                                                                                <v-card-item class="px-5 py-4">
                                                                                    <h6 class="text-h4 mb-1 text-capitalize">{{ product.name }}</h6>
                                                                                    <p class="text-body-1 text-medium-emphasis mb-3 text-justify">{{product.description}}</p>
                                                                                    <div class="d-flex align-center justify-space-between mt-1 mb-2">
                                                                                            <template v-if="product.real_offer_price">
                                                                                                <h6 class="text-h6 font-weight-bold text-primary">${{ product.real_offer_price }}</h6>
                                                                                            </template>
                                                                                            <div class="d-flex gap-1 mt-1 text-subtitle-1 mb-1">
                                                                                                <i class="mdi mdi-star text-warning line-height-1"></i>
                                                                                                <i class="mdi mdi-star text-warning line-height-1"></i>
                                                                                                <i class="mdi mdi-star text-warning line-height-1"></i>
                                                                                                <i class="mdi mdi-star text-warning line-height-1"></i>
                                                                                                <i class="mdi mdi-star-outline text-warning line-height-1"></i>
                                                                                            </div>
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
                                                                                </v-card-item>
                                                                            </v-card>
                                                                            <template v-if="product.size || product.size1 || product.size2" >
                                                                            <v-card elevation="0" class="mb-3 rounded-0"  >
                                                                                <v-card-item  class="px-5 py-4">
                                                                                    <h6 class="text-h5 mb-4">Meal Size</h6>
                                                                                    <div class="radioSizeGroup">
                                                                                        <v-radio-group hide-details v-model="product.radioGroup3" inline class="d-flex gap-3">
                                                                                            <v-radio v-if="product.size === 'Small' || product.size === 'Medium' || product.size === 'Standard' || product.size === 'Large'" :label="`${product.size}`" color="primary" value="1" @change="handleRadioChange(product)"></v-radio>
                                                                                            <v-radio v-if="product.size1 === 'Medium'" :label="`${product.size1}`"  color="primary" value="2" @change="handleRadioChange1(product)"></v-radio>
                                                                                            <v-radio v-if="product.size2 === 'Large'" :label="`${product.size2}`"  color="primary" value="3" @change="handleRadioChange2(product)"></v-radio>
                                                                                        </v-radio-group>
                                                                                    </div>
                                                                                </v-card-item>
                                                                            </v-card>
                                                                            </template>
                                                                            <template v-if="product.addons.length > 0">
                                                                                <v-card elevation="0" class="mb-3 rounded-0" >
                                                                                    <v-card-item  class="px-5 py-4">
                                                                                        <h6 class="text-h5 mb-4">Addons</h6>
                                                                                        <v-row>
                                                                                            
                                                                                            <v-col cols="12" class="py-0 border-bottom" v-for="(addon, index) in product.addons" :key="addon.id">
                                                                                                <v-checkbox-btn color="primary" hide-details @change="updateAddonSelection(product,addon)">
                                                                                                    <template v-slot:label>
                                                                                                        <v-row>
                                                                                                            <v-col cols="7" sm="8" class="d-block">{{addon.add_name}} </v-col>
                                                                                                            <v-col cols="5" sm="4" class="d-flex justify-end">${{addon.add_price}}</v-col>
                                                                                                        </v-row>
                                                                                                    </template>
                                                                                                </v-checkbox-btn> 
                                                                                            </v-col>
                                                                                            <!-- <template v-else>
                                                                                                <v-col cols="12">
                                                                                                    <p class="text-center">No Addon Selected Yet</p>
                                                                                                </v-col>
                                                                                            </template> -->
                                                                                        </v-row>
                                                                                    </v-card-item>
                                                                                </v-card>
                                                                            </template>
                                                                        </v-form>
                                                                    </v-card-text>

                                                                    <v-card-actions class="pa-4 d-flex justify-center">
                                                                        <v-btn
                                                                            color="primary"
                                                                            variant="flat"
                                                                            @click="myfunc(product)"
                                                                            >Add to cart  <template v-if="product.real_offer_price">${{ product.real_offer_price }}</template>  <template v-else>${{ product.real_base_price }}</template>  </v-btn
                                                                        >
                                                                    </v-card-actions>
                                                                </v-card>
                                                            </v-dialog>
                                                    </div>
                                                </v-card-item>
                                            </div>
                                            
                                        </div>
                                        <v-snackbar variant="flat" :timeout="900000" location="bottom right" color="success" rounded="md" class="alertMessageShwm" v-model="successsnackbar">
                                            <v-row class="align-center">
                                                <v-col cols="8" class="d-flex flex-wrap">
                                                    <span color="dark" class="countLabelDsgn">{{cartItems?.length}}</span> <span class="contentItemsCrt text-subtitle-1 ps-2 font-weight-medium">{{ loading ? 'Please wait...' : 'Added your items' }}</span>
                                                </v-col>
                                                <v-col cols="4" class="text-right">
                                                    <span class="viewCrtBtn">
                                                        <v-btn
                                                        variant="flat"
                                                        color="light"
                                                        class="ml-auto text-success font-weight-semibold"
                                                        size="small"
                                                        @click="addItemsToCart()"
                                                        :disabled="loading">Next
                                                    </v-btn>
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
                                <ProductEmplty v-else />
                            </v-row>
                            
                        </v-sheet>
                </template>
                <!-- -------------------------------------- -->
                <!-- Mobile Sidebar -->
                <!-- -------------------------------------- -->
                <template v-slot:mobileLeftContent> <ProductFilters /> </template>
            </AppBaseCard>
        </div>
    </main>
</template>

<style scoped lang="scss">
@media (max-width: 1279px) {
    .v-card {
        position: unset;
    }
}
</style>
