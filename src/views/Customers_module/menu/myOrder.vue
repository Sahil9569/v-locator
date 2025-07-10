<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useEcomStore } from '@/stores/apps/eCommerce';
import axios from 'axios';
import { useRouter } from "vue-router";
const router = useRouter();
import BASE_URL from '@/stores/myVar';
const radioColors = ref('1');
axios.defaults.baseURL = BASE_URL
const res_token = localStorage.getItem('res_token')
const res_type = localStorage.getItem('res_type')
onMounted(() => {
    getAllItems();
    getAllCoupans();
    var s = localStorage.getItem('staffStatus');
    if(s === 'yes'){
        staff.value = true;
    }
    var c = localStorage.getItem('cust_status');
    if(c==="yes"){
        customer.value=true;
        setCustomer();
    }
    if(customer.value === true) {
        accordianPanel.value = 1;
        accordianPanelOrder.value = 1;
    }
});
const isStripeActivated= ref(false)
const loading = ref(true);
const staff = ref(false);
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
const itemVat = ref(9);
const itemService = ref(5);
const itemPriority = ref(0);
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
const cartItems = ref([]);
const item_coupan = ref(0);
const coupan_name = ref('');
const accordianPanel =ref(0)
const accordianPanelOrder =ref(0)
const showLoader = ref(false)
const resType = ref('other')
const dialogCustomize =ref (false)
// const addonsCheckbox =ref(true)
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
        loading.value = true;
        console.log("YE HAI CATsssssssss2",formData);
        const response = await axios.post('api/customers/all_items/', formData);
        console.log("terko yaha kisne bulaya",response.data.is_stripe_activate);
        if (response.data && response.data.is_stripe_activate.res === "null") {
            console.log("Stripe is not activated!");
            isStripeActivated.value = false;
        } else if(response.data.is_stripe_activate.res) {
            console.log("Stripe is activated!");
            isStripeActivated.value = true;
        }
        if(response.data.res_type === 'Vendor'){
            pay_now.value = true;
            radioColors.value = '2';
            resType.value = "Vendor";
        }
        orderId.value = response.data.menu.id;
        const items = response.data.menu.items;
        mockProducts.value = items.map((item) => {
            let radioGroup3Value = '1';
            if (item.size === 'M') {
                radioGroup3Value = '2';
            } else if (item.size === 'L') {
                radioGroup3Value = '3';
            }
            const addons = item.item.addons;
            const selectedAddons = item.addons;
            console.log('just want to chekc the value of selectedAddons',selectedAddons,"=",addons)
            addons.forEach((addon:any) => {
            selectedAddons.forEach((selectedAddon:any) => {
                if (addon.id === selectedAddon.id) {
                    addon.checked = true;
                }
            });
        });
            // console.log('just want to chekc the value of addonchk',addonchk)
            return {
                id: item.item.id,
                item_id: item.id,
                name: item.item.dish_name,
                image: item.item.base64_images,
                description: item.item.dish_discripiton,
                salePrice: item.total_amount_offer,
                offerPrice: item.total_amount,
                rating: 5,
                categories: [item.item.dish_categories.cat_name],
                qty: item.quantity,
                real_base_price: item.total_amount_offer,
                real_offer_price: item.total_amount,
                dish_price: item.item.dish_price,
                dish_discount: item.item.dish_discount,
                size1: item.item.dish_size,
                dish_price1: item.item.dish_price2,
                dish_discount1: item.item.dish_discount2,
                size2: item.item.dish_size2,
                dish_price2: item.item.dish_price3,
                dish_discount2: item.item.dish_discount3,
                size3: item.item.dish_size3,
                radioGroup3: radioGroup3Value,
                isInCart: true,
                addons: item.item.addons,
                selectedAddons: item.addons,
                // addonchk: addonchk,
                size:item.size,
            };
        });

        console.log(mockProducts.value);
        console.log("YE HAI CAT 2 thisssisiisis",items);
        getTotal();
        loading.value = false;
    } catch (error) {
        console.error('API error:', error);
        
    }
}
const incrementQuantity = (product:any) => {
    console.log("INCREMENT",product)
    product.qty++;
    updatePrices(product);
    getTotal();
    updateqtySelection(product);
};
const myfunc = (product:any) => {
    addToCart(product);
    console.log("STEP IIIII",product)
    product.dialogCustomize = false
    // product.
    // console.log("STEP IIIII")

};
function AddCart(p: number) {
    store.AddToCart(p);
}
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

const decrementQuantity = (product:any) => {
    if (product.qty >= 1) {
        product.qty--;
        console.log("INSIDE DECREMENT",product)
        updatePrices(product);
        getTotal();
        updateqtySelection(product);
    }
};
const updatePrices = (product:any) => {
    // Calculate new prices based on quantity
    let totalAddonPrice = 0;
    for (const addon of product.addons) {
        if(addon.checked === true){
            totalAddonPrice += parseFloat(addon.add_price);
        }
    }
    console.log("THSISIISISISIS",totalAddonPrice)
    console.log("THSISIISISISIS",product.size)
    console.log("THSISIISISISIS1111111",parseInt(product.dish_discount2, 10)* product.qty )
    // console.log("THSISIISISISIS",product.qty*totalAddonPrice)
    console.log("THSISIISISISIS222222",product.qty*totalAddonPrice)
    if(product.size === 'Small' || product.size === 'S'){
        product.real_base_price = (parseFloat(product.dish_price)  * product.qty )+ (product.qty * totalAddonPrice);
        product.real_offer_price = (parseFloat(product.dish_discount) * product.qty )+ (product.qty * totalAddonPrice);
    }else if(product.size === 'Medium' || product.size === 'M'){
        product.real_base_price = (parseFloat(product.dish_price1)  * product.qty )+ (product.qty * totalAddonPrice);
        product.real_offer_price = (parseFloat(product.dish_discount1) * product.qty )+ (product.qty * totalAddonPrice);
    }else{
        product.real_base_price = (parseFloat(product.dish_price2)  * product.qty )+ (product.qty * totalAddonPrice);
        product.real_offer_price = (parseFloat(product.dish_discount2) * product.qty )+ (product.qty * totalAddonPrice);
    }
};
const handleRadioChange = (product:any) => {
    product.size = 'Small'
    updatePrices(product);
    getTotal();
    updateSizeSelection(product);

};
const handleRadioChange1 = (product:any) => {
    product.size = 'Medium'
    updatePrices(product);
    getTotal();
    updateSizeSelection(product);

};
const handleRadioChange2 = (product:any) => {
    product.size = 'Large'
    updatePrices(product);
    getTotal();
    updateSizeSelection(product);

};
const removeFromCart = (product:any) => {
  const index = cartItems.value.findIndex(item => item.id === product.id);
    if (index !== -1) {
        cartItems.value.splice(index, 1);
        product.qty = 1
        addonPrice.value = 0
        updatePrices(product);
    }
    showProductInCart(product);
    if (cartItems.value.length === 0) {
        successsnackbar.value = false; 
    }
};
const hideProductInCart = (product:any) => {
  product.isInCart = true;
};

const showProductInCart = (product:any) => {
  product.isInCart = false; 
};
const getTotal = async () => {
    let totalOfferPrice = 0;
        for (const product of mockProducts.value) {
            totalOfferPrice += parseFloat(product.real_offer_price);
        }
    itemTotal.value = (totalOfferPrice).toFixed(2);
   
    itemVat2.value = (itemTotal.value * itemVat.value)/100;
    console.log("VAT 9 %",itemVat2.value)
    subTotal.value = (
        parseFloat(itemTotal.value) +
        parseFloat(itemVat2.value) +
        parseFloat(itemService.value) +
        parseFloat(itemPriority.value) -
        parseFloat(item_coupan.value)
    ).toFixed(2);
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
            total_sub:subTotal.value,
        };
        console.log("YE HAI CAT2",formData);
        showLoader.value= true;
        const response = await axios.post('api/customers/order_place_final/', formData);
        const items = response.data;
        console.log("YE HAI CAT2",items)
        orderPlaced.value = true;
        showLoader.value= false;
        setTimeout(() => {
            if(staff.value === true){
                router.push(`/orders/${token}`);
            }else{
                router.push(`/vlocator/customerDashboard/${token}`);
            }
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
        localStorage.setItem('table',table);
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
            val:item.amt,
            
        }));
        console.log(coupons.value);
        
    } catch (error) {
        console.error('API error:', error);
        
    }
}
const applyCoupon = (coupon:any) => {
    const couponValue = coupon.val;
    const item = itemTotal.value;
    let discount = 0;
    if (coupon.cop_val.includes('%')) {
        discount = (couponValue / 100) * item;
    } else {
        discount = couponValue;
    }
    console.log('Calculated Discount:', discount);
    item_coupan.value = discount;
    coupan_name.value = coupon.description;
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
        showLoader.value= true;
        const response = await axios.post('api/customers/pay_by_card/', formData);
        const items = response.data;
        console.log("YE HAI CAT2dsfdsfds",items.url)
        // router.push(items.url);
        localStorage.setItem('order_id', items.order.id);
        localStorage.setItem('order_sum', items.order_summ);
        localStorage.setItem('transfer', items.transfer);
        showLoader.value= false;
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
const updateAddonSelection = async (product: any,addon:any) => {
    console.log("PRODUCT DATA",product)
    console.log("ADDON DATA",addon)
    try {
        const formData = {
            pro_id:product.item_id,
            add_id:addon.id,      
        };
        console.log("YE HAI CAT2",formData);
        const response = await axios.post('api/orders/order_update/', formData);
        const items = response.data;
        console.log("YE HAI Set Customer",items)
        const temp = product.real_offer_price
        if(response.data.message === 'Addon removed'){
            product.real_offer_price = parseFloat(temp) - (parseFloat(product.qty) * parseFloat(addon.add_price));
        }else{
            product.real_offer_price = parseFloat(temp) + (parseFloat(product.qty) * parseFloat(addon.add_price));
        }
        getTotal();
    } catch (error) {
        console.error('API error:', error);
        
    }
};
const updateSizeSelection = async (product: any) => {
    console.log("PRODUCT DATA",product)
    try {
        const formData = {
            pro_id:product.item_id,
            size:product.size,
            price:product.real_offer_price,         
        };
        console.log("YE HAI CAT2",formData);
        const response = await axios.post('api/orders/order_item_size_update/', formData);
        const items = response.data;
        console.log("YE HAI Set Customer",items)
    } catch (error) {
        console.error('API error:', error);
        
    }
};
const updateqtySelection = async (product: any) => {
    console.log("PRODUCT DATA API WALAAAAA",product)
    try {
        const formData = {
            pro_id:product.item_id,
            qty:product.qty, 
            price:product.real_offer_price,     
        };
        console.log("YE HAI CAT2",formData);
        const response = await axios.post('api/orders/order_item_qty_update/', formData);
        const items = response.data;
        console.log("YE HAI Set Customer",items)
    } catch (error) {
        console.error('API error:', error);
        
    }
};
</script>
<template>
    <main>
        
        <template v-if="loading" >
            <v-row >
                <!-- Show loading indicator -->
                <v-col cols="12" class="text-center">
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-col>
            </v-row>
        </template>
        <template v-else>
            <template v-if="mockProducts.length >= 1">
                <div class="text-end">
                    <v-btn variant="flat" :to ="`/vlocator/menu/${Rtoken}/${tabs}`" color="primary"><ArrowLeftIcon size="15" class="me-1"/>Back to Menu</v-btn>
                </div>
                <v-card variant="outlined" class="mt-4">
                    <v-card-text class="pa-2 pa-sm-4">
                        <v-expansion-panels v-model="accordianPanel"> 
                            <v-expansion-panel elevation="0">
                                <v-expansion-panel-title  class="text-h6 pa-0 border-0 d-flex justify-space-between font-weight-regular customAccordianTab">
                                    Order List <span class="ms-2 text-primary text-subtitle-1 font-weight-medium" v-if="customer">({{mockProducts.length}} X Items)</span>
                                <template v-slot:actions>
                                    <v-icon color="primary" size="20px" icon="mdi-chevron-down">
                                    </v-icon>
                                </template>
                                </v-expansion-panel-title>
                                    <v-expansion-panel-text class="bodyTextCollapse">
                                        <v-row >
                                            <v-col cols="12" lg="4" md="6" sm="6" class="mt-6" v-for="product in mockProducts" :key="product">
                                                <v-card elevation="10" class="bg-lightsecondary overflow-hidden">
                                                    <div class="mainCardMenuSt pa-2">
                                                        <div class="imageSizeProduct">
                                                            <img alt="product" v-if="product.image" :src="product.image" class="w-100" />
                                                            <img v-else src="@/assets/images/locator/v-icon.png" alt="Dummy Image"  />
                                                        </div>
                                                        <div class="contentSideMenu">
                                                            <v-card-item class="pa-0 ps-3 h-100">

                                                                <h6 class="text-h6 text-capitalize mb-1">{{ product.name }}</h6>
                                                                <v-row class="my-2">
                                                                    <v-col cols="col" class="py-0">
                                                                        <template v-if="product.real_offer_price">
                                                                            <h6 class="text-h6 font-weight-bold text-primary mb-0">${{ product.real_offer_price }}</h6>
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

                                                                <div class="mt-2 d-flex flex-wrap justify-space-between align-center" >
                                                                    <div class="quntityNumber">QTY: {{product.qty}}</div>
                                                                    <div class="">
                                                                        <!-- <template v-if="!product.isInCart"> -->
                                                                            <v-tooltip text="Edit" location="bottom">
                                                                                <template v-slot:activator="{ props }">
                                                                                <v-btn
                                                                                    variant="flat"
                                                                                    v-bind="props"
                                                                                    color="primary"
                                                                                    class="ml-auto"
                                                                                    size="small"
                                                                                    @click="product.dialogCustomize = true"
                                                                                ><EditIcon size="15" class="me-1"/> Edit</v-btn>
                                                                                </template>
                                                                            </v-tooltip>
                                                                            <v-dialog v-model="product.dialogCustomize" transition="dialog-bottom-transition" scrollable max-width="575">
                                                                <v-card>
                                                                    <v-card-title class="pa-0">
                                                                        <div class="imageBannerTop">
                                                                            <!-- <img src="@/assets/images/locator/Easy-Coconut-Rice.jpg" alt=""> -->
                                                                            <img alt="product" v-if="product.image" :src="product.image" class="w-100" />
                                                                            <div v-else class="w-100 d-flex justify-center align-center py-8">
                                                                                <img  src="@/assets/images/locator/v-icon.png" alt="Dummy Image" />
                                                                            </div>
                                                                            <!-- <img alt="product" v-else src="@/assets/images/locator/v-icon.png" class="w-100" /> -->
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
<template v-if="product.size1 || product.size2 || product.size3" >
<v-card elevation="0" class="mb-3 rounded-0"  >
    <v-card-item  class="px-5 py-4">
        <h6 class="text-h5 mb-4">Meal Size</h6>
        <div class="radioSizeGroup">
            <v-radio-group hide-details v-model="product.radioGroup3" inline class="d-flex gap-3">
                <v-radio v-if="product.size1 === 'Small'" :label="`${product.size1}`" color="primary" value="1" @change="handleRadioChange(product)"></v-radio>
                <v-radio v-if="product.size2 === 'Medium'" :label="`${product.size2}`"  color="primary" value="2" @change="handleRadioChange1(product)"></v-radio>
                <v-radio v-if="product.size3 === 'Large'" :label="`${product.size3}`"  color="primary" value="3" @change="handleRadioChange2(product)"></v-radio>
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
                
                <v-col cols="12" class="py-0 border-bottom" v-for="(addon, index) in product.addons" :key="addon">
                <v-checkbox-btn color="primary" hide-details @change="updateAddonSelection(product,addon)" v-model="addon.checked">
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
                                                                            @click="product.dialogCustomize = false"
                                                                            >Update</v-btn
                                                                        >
                                                                    </v-card-actions>
                                                                </v-card>
                                                            </v-dialog>
                                                                    </div>
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
                                    </v-expansion-panel-text>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-card-text>
                </v-card>
                <!-- <v-card variant="outlined" class="mt-4">
                    <v-card-text class="pa-2 pa-sm-4">
                        <h5 class="text-h5 mb-4"></h5>
                        <v-row v-if="mockProducts.length >= 1">
                            <v-col cols="12" lg="4" md="6" sm="6" class="mt-6" v-for="product in mockProducts" :key="product">
                                <v-card elevation="10" class="bg-lightsecondary overflow-hidden">
                                    <div class="mainCardMenuSt pa-2">
                                        <div class="imageSizeProduct">
                                            <img alt="product" :src="product.image" class="w-100" />
                                        </div>
                                        <div class="contentSideMenu">
                                            <v-card-item class="pa-0 ps-3 h-100">
                                                <div class="">
                                                    <h6 class="text-h5 text-capitalize mb-1">{{ product.name }}</h6>
                                                    
                                                    <p class="text-body-2 text-medium-emphasis text-trim-1">{{product.description}}</p>
                                                    <template v-if="product.real_offer_price">
                                                        <h6 class="text-h6 font-weight-bold text-primary mt-2 mb-0">${{ product.real_offer_price }}</h6>
                                                    </template>
                                                    <template v-else>
                                                        <h6 class="text-h6 font-weight-bold text-primary mt-2 mb-0">$0</h6>
                                                    </template>
                                                    <div class="d-flex gap-1 mt-1">
                                                        <i class="mdi mdi-star text-warning line-height-1"></i>
                                                        <i class="mdi mdi-star text-warning line-height-1"></i>
                                                        <i class="mdi mdi-star text-warning line-height-1"></i>
                                                        <i class="mdi mdi-star text-warning line-height-1"></i>
                                                        <i class="mdi mdi-star-outline text-warning line-height-1"></i>
                                                    </div>
                                                </div>
                                                <div class="mt-2 d-flex flex-wrap justify-space-between align-center" >
                                                    <div class="quntityNumber">QTY: 1</div>
                                                    <div class="">
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
                                                    </div>
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
                </v-card> -->
                <div class="mt-5" v-if="coupons.length>0 && !customer">
                    <h2 class="text-h5 mb-2">Promo Code</h2>
                    <div class="d-flex">
                        <v-text-field variant="outlined" color="primary" model-value="View Your Promo Code" density="compact" readonly @focus="dialog2 = true" hide-details></v-text-field>
                        <v-btn color="primary" class="ml-2" variant="outlined"  @click="dialog2 = true">View Promo Code</v-btn>
                    </div>
                    <v-dialog v-model="dialog2" max-width="500">
                        <v-card>
                            <v-card-title class="pa-4 border-bottom">
                                <span class="title">Coupon & Discount</span>
                            </v-card-title>
                            <v-card-text class="py-0">
                                <div v-for="(coupon, index) in coupons" :key="index" class="mainDiscountRow rounded-md bg-lightsecondary mb-2 px-2 justify-space-between align-center  border-bottom">
                                    <v-row align-center>
                                        <v-col cols="12" sm="8" class="py-1 py-sm-3">
                                            <div class="offerContntModal">
                                                <v-chip color="secondary" size="x-small" class="font-weight-medium" label>Offer</v-chip>
                                                <h3 class="text-dark text-h5 my-1">{{ coupon.discount }} </h3>
                                                <p class="text-body-2 line-height-2">{{ coupon.description }}</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" sm="4" class="py-1 py-sm-3">
                                            <div class="butnContentMdl text-sm-right">
                                                <p class="text-h6 line-height-2 mb-2 text-secondary ">{{coupon.cop_val}} Off</p>
                                                <v-btn color="primary"  variant="outlined" @click="applyCoupon(coupon)">Apply</v-btn>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </div>
                            </v-card-text>
                            <v-card-actions class="pa-4">
                                <v-spacer></v-spacer>
                                <v-btn color="error" variant="flat" @click="dialog2 = false">Cancel</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </div>
                <v-card variant="outlined" class="mt-8" v-if="!customer">
                    <v-card-text>
                        <div class="d-flex guranteeContentSt">
                            <img src="@/assets/images/locator/best-seller.png"/>
                            <h2 class="text-h4"><span class="text-primary">100% satisfaction guarantee</span> Place your order with peace of mind</h2>
                        </div>
                    </v-card-text>
                </v-card>
                <v-card variant="outlined" class="mt-6 my-3 pa-0">
                    <v-card-text class="pa-2 pa-sm-4">
                        <v-expansion-panels v-model="accordianPanelOrder"> 
                            <v-expansion-panel elevation="0">
                                <v-expansion-panel-title  class="text-h6 pa-0 border-0 d-flex justify-space-between font-weight-regular customAccordianTab">
                                    Order Summary <span class="ms-2 text-primary text-subtitle-1 font-weight-medium" v-if="customer">(Total: ${{subTotal}})</span>
                                <template v-slot:actions>
                                    <v-icon color="primary" size="20px" icon="mdi-chevron-down">
                                    </v-icon>
                                </template>
                                </v-expansion-panel-title>
                                    <v-expansion-panel-text class="bodyTextCollapse mt-4">
                                        <div class="d-flex align-center justify-space-between border-bottom py-3">
                                            <h6 class="text-h6 font-weight-regular">Sub Total</h6>
                                            <h6 class="font-weight-semibold text-h6">${{itemTotal}}</h6>
                                        </div>

                                        <!-- <div class="d-flex align-center justify-space-between border-bottom py-3">
                                            <h6 class="text-h6 font-weight-regular">Vat 9%</h6>
                                            <h6 class="font-weight-semibold text-h6"> ${{itemVat2}}</h6>
                                        </div> -->

                                        <div class="d-flex align-center justify-space-between border-bottom py-3">
                                            <h6 class="text-h6 font-weight-regular">Coupon & Discount</h6>
                                            <div class="d-flex justify-space-between align-center">
                                                <v-chip v-if="dialog3" color="primary" size="small" class="font-weight-medium" label>Applied</v-chip>
                                                <span v-if="dialog3" class="text-subtitle-1 px-3">{{coupan_name}}</span>
                                                <h6 class="font-weight-semibold text-h6 text-error">-${{item_coupan}}</h6>
                                            </div>
                                        </div>

                                        <div class="d-flex align-start justify-space-between border-bottom py-3">
                                            <v-expansion-panels>
                                                <v-expansion-panel elevation="0">
                                                    <v-expansion-panel-title disable-icon-rotate class="text-h6 pa-0 d-inline-block font-weight-regular customAccordianTab">
                                                        Taxes & Other Fees
                                                    <template v-slot:actions>
                                                        <v-icon color="primary" size="20px" icon="mdi-chevron-down">
                                                        </v-icon>
                                                    </template>
                                                    </v-expansion-panel-title>
                                                        <v-expansion-panel-text class="bodyTextCollapse">
                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                                        </v-expansion-panel-text>
                                                </v-expansion-panel>
                                            </v-expansion-panels>
                                            <h6 class="font-weight-semibold text-h6 pt-1">${{itemService}}.00</h6>
                                        </div>

                                        <div class="d-flex align-center justify-space-between pt-3">
                                            <h6 class="text-h6">Total</h6>
                                            <h6 class="font-weight-semibold text-h5">${{subTotal}}</h6>
                                        </div>
                                    </v-expansion-panel-text>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-card-text>
                </v-card>

                <v-card v-if="customer" variant="outlined" class="mt-6 my-3 pa-0">
                    <v-card-item class="pa-sm-6 pa-2">
                        <h5 class="text-h5 mb-4">Payment Methods</h5>
                        <div class="d-flex gap-sm-3 align-center flex-column flex-sm-row">
                            <v-radio-group v-model="radioColors" inline>
                                <v-radio  key="primary" color="primary" label="Pay Later" value="1" hide-details @change="pay_now = false" class="me-2" v-if="resType !== 'Vendor'"></v-radio>
                                <v-radio key="primary" v-if="isStripeActivated" color="primary" label="Pay Now" value="2" hide-details @change="pay_now = true"></v-radio>
                            </v-radio-group>
                            <v-btn v-if="!pay_now" :disabled="showLoader" color="primary" @click="orderPlacedFinal" variant="flat" size="large" class="mt-2">
                                <template v-if="showLoader===true">
                                    <div class='loaderBn' style="width:20px;height:20px;margin-right:6px;"></div> Placing Order
                                </template>
                                <template v-else>
                                    Pay Now
                                </template>
                            </v-btn>
                            <v-btn v-if="pay_now" color="primary" @click="SubmitCardData" variant="flat" size="large" class="mt-2">
                                <template v-if="showLoader===true">
                                    <div class='loaderBn' style="width:20px;height:20px;margin-right:6px;"></div> Placing Order
                                </template>
                                <template v-else>
                                    Pay Now
                                </template>
                                
                            </v-btn>
                        </div>
                        
                    </v-card-item>
                </v-card>
                <div v-if="customer" class="buttonGroupPay">
                    
                    <v-dialog v-model="orderPlaced" max-width="500" persistent>
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

                <div class="buttonGroupPay">
                    <v-btn v-if="!customer && !staff" color="primary" @click="createcustomer" variant="flat" size="large" class="mt-2">
                            Continue
                    </v-btn>
                    <v-btn v-if="staff" :disabled="showLoader" color="primary" @click="orderPlacedFinal" variant="flat" size="large" class="mt-2">
                        <template v-if="showLoader===true">
                            <div class='loaderBn' style="width:20px;height:20px;margin-right:6px;"></div> Placing Order
                        </template>
                        <template v-else>
                            Place Order
                        </template>
                    </v-btn>
                </div>
            </template>
            <template v-else>
                <v-card elevation="10" class=" mt-6">
                    <v-card-item class="text-center">
                        <img src="@/assets/images/products/empty-shopping-cart.svg" alt="image" width="200" />
                        <h5 class="text-h5 pt-3">Oopps, Your cart is empty!</h5>
                        <h6 class="text-subtitle-1 text-13 my-4 textSecondary">
                        Get back to Menu and get <br> your menu items.
                        </h6>
                        
                        <v-btn :to ="`/vlocator/menu/${Rtoken}/${tabs}`" flat color="primary"><ArrowLeftIcon size="15" class="me-1"/>Back to Menu</v-btn>
                    </v-card-item>
                </v-card>
            </template>
        
            <!-- <div v-else class="d-flex justify-center">
                <CartEmpty />
            </div> -->
        </template>
    </main>
</template>

<style>
.custom-img-box {
    width: 60px;
    height: 60px;
}
</style>
