<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useEcomStore } from '@/stores/apps/eCommerce';
import axios from 'axios';
import { useRouter } from "vue-router";
const router = useRouter();
import BASE_URL from '@/stores/myVar';
const radioColors = ref('1');
axios.defaults.baseURL = BASE_URL
onMounted(() => {
    getAllItems();
    getAllCoupans();
    var c = localStorage.getItem('cust_status');
    if(c==="yes"){
        customer.value=true;
        setCustomer();
    }
});

const orderId = ref('');
const textbank = ref('');
const textcno = ref('');
const textdate = ref('');
const textcvv = ref('');
const coupons = ref([]);
const orderPlaced = ref(false)
const pay_now = ref(false)
const customer = ref(false)
const itemTotal = ref(0);
const itemVat = ref(5);
const itemService = ref(5);
const itemPriority = ref(2);
const store = useEcomStore();
const dialog2 = ref(false)
const dialog3 = ref(false)
const dialogTip = ref(false)
const serrating = ref(3);
const foodrating = ref(2);
const resrating = ref(4);
const checkboxDelivery = ref(false);
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
const mockProducts = ref([]);
const radioGroup3 = ref('2');
const itemVat2 = ref(0);
const subTotal = ref(0);
const item_coupan = ref(0);
const getAllItems = async () => {
    console.log("Order Items LIST API CALL")
    try {
        const parts = window.location.href.split('/');
        const token = parts[parts.length - 2];
        const table = window.location.href.split('/').pop();
        const cus_id = localStorage.getItem('order_id');
        const formData = {
            token:token,
            table:table,
            cus_id:cus_id,       
        };
        console.log("YE HAI CATsssssssss2",formData);
        const response = await axios.post('api/customers/all_items/', formData);
        console.log("YAHA PE HAI",response.data.menu.id);
        orderId.value = response.data.menu.id;
        const items = response.data.menu.items;
        console.log("YE HAI CAT2rrrrrrrrrrrrrrrrrrr",items)
        // const totalOfferPrice = items.reduce((total:any, item:any) => total + item.item.dish_discount, 0);
        // itemTotal.value = Number(totalOfferPrice);
        mockProducts.value = items.map((item: any) => ({
            id: item.item.id,
            item_id: item.id,
            name: item.item.dish_name,
            image: item.item.image_url,
            description: item.item.dish_discripiton,
            salePrice: item.item.dish_price,
            offerPrice: item.item.dish_discount,
            rating: 5,
            categories: [item.item.dish_categories.cat_name], // Wrap in an array since you're using includes in getVisibleProduct function
            qty:1,
            real_base_price: item.item.dish_price,
            real_offer_price: item.item.dish_discount,
            // First Size group
            dish_price:item.item.dish_price,
            dish_discount:item.item.dish_discount,
            size:item.item.dish_size,
            // Second Size group
            dish_price1:item.item.dish_price2,
            dish_discount1:item.item.dish_discount2,
            size1:item.item.dish_size2,
            // Third Size group
            dish_price2:item.item.dish_price3,
            dish_discount2:item.item.dish_discount3,
            size2:item.item.dish_size3,
            radioGroup3:'1',
            isInCart:true,
        }));
        console.log(mockProducts.value);
        console.log("YE HAI CAT 2",items);
        getTotal();
    } catch (error) {
        console.error('API error:', error);
        
    }
}
const incrementQuantity = (product:any) => {
    product.qty++;
    updatePrices(product);
    getTotal();

};

const decrementQuantity = (product:any) => {
    if (product.qty > 1) {
        product.qty--;
        console.log("INSIDE DECREMENT")
        updatePrices(product);
        getTotal();
        
    }
};
const updatePrices = (product:any) => {
    // Calculate new prices based on quantity
    console.log("UPDATE CALL",itemTotal.value,'---',product)
    itemTotal.value = (itemTotal.value - product.real_offer_price) + product.offerPrice * product.qty;
    product.real_base_price = product.salePrice * product.qty;
    product.real_offer_price = product.offerPrice * product.qty;
};
const handleRadioChange = (product:any) => {
    // Calculate new prices based on quantity
    product.salePrice = product.dish_price;
    product.offerPrice = product.dish_discount;
    product.qty = 1;
    product.real_base_price= product.dish_price
    product.real_offer_price   = product.dish_discount
    getTotal();

};
const handleRadioChange1 = (product:any) => {
    // Calculate new prices based on quantity
    product.salePrice = product.dish_price1;
    product.offerPrice = product.dish_discount1;
    product.qty = 1;
    product.real_base_price= product.dish_price1
    product.real_offer_price   = product.dish_discount1
    getTotal();

};
const handleRadioChange2 = (product:any) => {
    // Calculate new prices based on quantity
    product.salePrice = product.dish_price2;
    product.offerPrice = product.dish_discount2;
    product.qty = 1;
    product.real_base_price= product.dish_price2
    product.real_offer_price   = product.dish_discount2
    getTotal();

};
const removeFromCart = (product:any) => {
  // ... Your existing removeFromCart logic ...
  // After removing from cart, you might want to show the "Add to Cart" button
  const index = mockProducts.value.findIndex(item => item.id === product.id);
  if (index !== -1) {
    mockProducts.value.splice(index, 1);
    deleteItems(product.item_id);
  }
  
  
};
const deleteItems = async (item:any) => {
    console.log("Order Items LIST API CALL")
    try {
        const formData = {
            item:item  
        };
        console.log("YE HAI CAT2",formData);
        const response = await axios.post('api/customers/delete_cart_items/', formData);
        const items = response.data;
        console.log("YE HAI CAT2",items)
        
    } catch (error) {
        console.error('API error:', error);
        
    }
    getTotal();

}
const getTotal = async () => {
    let totalOfferPrice = 0;
        for (const product of mockProducts.value) {
            totalOfferPrice += Number(product.real_offer_price);
        }
        itemTotal.value = totalOfferPrice;
    console.log("Order Items LIST API CALL")
    itemVat2.value = (itemTotal.value * itemVat.value)/100;
    subTotal.value = itemTotal.value + itemVat2.value + itemService.value + itemPriority.value - item_coupan.value;
}
const orderPlacedFinal = async () => {
    try {
        const parts = window.location.href.split('/');
        const token = parts[parts.length - 2];
        const table = window.location.href.split('/').pop();
        const cus_id = localStorage.getItem('cus_id');
        const formData = {
            token:token,
            table:table,
            cus_id:cus_id, 
            items:mockProducts.value,  
        };
        console.log("YE HAI CAT2",formData);
        const response = await axios.post('api/customers/order_place_final/', formData);
        const items = response.data;
        console.log("YE HAI CAT2",items)
        orderPlaced.value = true;
        setTimeout(() => {
            router.push(`/vlocator/customerDashboard/${token}`);
        }, 3000);
    } catch (error) {
        console.error('API error:', error);
        
    }
    
}
const getAllCoupans = async () => {
    console.log("Order Items LIST API CALL")
    try {
        const parts = window.location.href.split('/');
        const token = parts[parts.length - 2];
        const table = window.location.href.split('/').pop();
        const cus_id = localStorage.getItem('cus_id');
        const formData = {
            url_token:token,
            cust:'cus_id',       
        };
        console.log("YE HAI CAT2",formData);
        const response = await axios.post('api/orders/all_coupans/', formData);
        const items = response.data;
        console.log("YE HAI CAT2dsfdsfds",items)
        coupons.value = items.map((item: any) => ({
            id: item.id,
            discount: item.code,
            description: item.name,
            cop_val:item.credit_type === "Percentage"? `${item.amt}%`:`$${item.amt}`,
            
        }));
        console.log(coupons.value);
        
    } catch (error) {
        console.error('API error:', error);
        
    }
}
const applyCoupon = (coupon:any) => {
  // Calculate the coupon discount based on the cop_val
  const couponValue = parseFloat(coupon.cop_val);
  const item = itemTotal.value; // Replace with your actual item total
  let discount = 0;
  console.log(coupon.cop_val)
  if (coupon.cop_val.includes('%')) {
    discount = (couponValue / 100) * item;
  } else {
    discount = couponValue;
  }

  // Store the calculated discount in item_coupan.value
  // Replace this with your actual state management logic
  // item_coupan.value = discount;
  console.log('Calculated Discount:', discount);
  item_coupan.value = discount;
  getTotal();
  dialog2.value = false;
  dialog3.value = true;
};

const SubmitCardData = async () => {
    console.log("Order Items LIST API CALL")
    try {
        const parts = window.location.href.split('/');
        const token = parts[parts.length - 2];
        const table = window.location.href.split('/').pop();
        const cus_id = localStorage.getItem('cus_id');
        const formData = {
            url_token:token,
            tab:table,
            cust:cus_id, 
            order:orderId.value,
            name:textbank.value,
            card:textcno.value,
            expiry:textdate.value,
            cvv:textcvv.value,
            subTotal:subTotal.value,
            full_url:window.location.href,

        };
        console.log("YE HAI CAT2dsffdg",formData);
        const response = await axios.post('api/customers/pay_by_card/', formData);
        const items = response.data;
        console.log("YE HAI CAT2dsfdsfds",items.url)
        // router.push(items.url);
        localStorage.setItem('order_id', items.order.id);
        localStorage.setItem('order_sum', items.order_summ);
        localStorage.setItem('transfer', items.transfer);
        const cd = window.location.href = items.url;
        console.log("CD",cd)
    } catch (error) {
        console.error('API error:', error);
        
    }
}
const createcustomer = async () => {
    console.log("Create Customer Redirect")
    const parts = window.location.href.split('/');
    const token = parts[parts.length - 2];
    const table = window.location.href.split('/').pop();
    router.push(`/vlocator/${token}/${table}`)
}
const setCustomer = async () => {
    console.log("Create Customer Redirect")
    const parts = window.location.href.split('/');
    const token = parts[parts.length - 2];
    const table = window.location.href.split('/').pop();
    const cus_id = localStorage.getItem('cus_id');
    const order_id = localStorage.getItem('order_id');
    try {
        const formData = {
            url_token:token,
            cus_id:cus_id, 
            order_id:order_id,      
        };
        console.log("YE HAI CAT2",formData);
        const response = await axios.post('api/orders/set_customer/', formData);
        const items = response.data;
        console.log("YE HAI Set Customer",items)
        
    } catch (error) {
        console.error('API error:', error);
        
    }
}
</script>
<template>
    <v-card variant="outlined" class="mt-4">
        <v-card-text class="pa-2 pa-sm-4">
            <h5 class="text-h5 mb-4">Order List</h5>
            <v-row v-if="mockProducts.length >= 1">
                <v-col cols="12" md="4" sm="6" class="mt-6" v-for="product in mockProducts" :key="product.id">
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
                                                                                <v-col cols="5" sm="4" class="d-flex justify-end">$5.00</v-col>
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
        </v-card-text>
    </v-card>

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
                <h6 class="font-weight-semibold text-h6">${{itemTotal}}</h6>
            </div>

            <div class="d-flex align-center justify-space-between border-bottom py-3">
                <h6 class="text-h6 font-weight-regular">Vat 5%</h6>
                <h6 class="font-weight-semibold text-h6"> ${{itemVat2}}</h6>
            </div>

            <!-- <div class="d-flex align-center justify-space-between border-bottom py-3">
                <h6 class="text-h6 font-weight-regular">Coupon & Discount</h6>
                <div class="d-flex justify-space-between align-center">
                    <v-chip v-if="dialog3" color="primary" size="small" class="font-weight-medium" label>Applied</v-chip>
                    <span v-if="dialog3" class="text-subtitle-1 px-3">FAB23</span>
                    <h6 class="font-weight-semibold text-h6 text-error">- ${{item_coupan}}</h6>
                </div>
            </div> -->

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
                <h6 class="font-weight-semibold text-h6 pt-1">${{itemService}}</h6>
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
                <h6 class="font-weight-semibold text-h6">${{itemPriority}}</h6>
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
                <h6 class="font-weight-semibold text-h6">$0.00</h6>
            </div>

            <div class="d-flex align-center justify-space-between pt-3">
                <h6 class="text-h6">Total</h6>
                <h6 class="font-weight-semibold text-h5">${{subTotal}}</h6>
            </div>
        </v-card-item>
    </v-card>
    <div class="buttonGroupPay">
    <v-btn v-if="!customer" color="primary" @click="createcustomer" variant="flat" size="large" class="mt-2">
            Continue
        </v-btn>
    </div>
    <v-card v-if="customer" variant="outlined" class="mt-6 my-3 pa-0">
        <v-card-item class="pa-sm-6 pa-2">
            <h5 class="text-h5 mb-3">Payment Methods</h5>
            <div class="d-flex gap-3 align-center flex-column flex-sm-row">
                <v-radio-group v-model="radioColors" column>
                    <v-radio key="primary" color="primary" label="Pay Later" value="1" hide-details @change="pay_now = false"></v-radio>
                    <v-radio key="primary" color="primary" label="Pay Now" value="2" hide-details @change="pay_now = true"></v-radio>
                </v-radio-group>
            </div>
            <div class="py-5 px-4 border rounded-md mb-6 d-none">
                            <v-radio value="paypal" color="primary" class="label-op-1">
                                <template v-slot:label>
                                    <div class="d-flex align-center w-100">
                                        <div>
                                            <h6 class="text-h6 mb-1">Pay with PayPal</h6>
                                            <span class="d-block text-subtitle-1 text-wrap"
                                                >You will be redirected to PayPal website to complete your purchase securely.</span
                                            >
                                        </div>
                                        <div class="ml-auto flex-shrink-0">
                                            <img src="@/assets/images/svgs/paypal.svg" width="40" alt="img" />
                                        </div>
                                    </div>
                                </template>
                            </v-radio>
                        </div>
            
        </v-card-item>
    </v-card>
    <div v-if="customer" class="buttonGroupPay">
        <v-btn v-if="!pay_now" color="primary" @click="orderPlacedFinal" variant="flat" size="large" class="mt-2">
            Pay Now
        </v-btn>
        <v-btn v-if="pay_now" color="primary" @click="SubmitCardData" variant="flat" size="large" class="mt-2">
            Pay Now
        </v-btn>
        <v-dialog v-model="orderPlaced" max-width="500">
            <v-card>
                <v-card-text class="pb-8">
                    <div class="text-center mb-2">
                        <!-- <svg class="checkmark_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg> -->
                        <img src="@/assets/images/locator/v-icon.png" style="max-width:80px;">
                    </div>
                    <h2 class="text-h5 text-center"><span class="text-h2 text-primary">Congratulations!!!</span><br> You have one order placed</h2>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
    
    <!-- <div v-else class="d-flex justify-center">
        <CartEmpty />
    </div> -->
</template>

<style>
.custom-img-box {
    width: 60px;
    height: 60px;
}
</style>
