<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useContactStore } from '@/stores/apps/contact';
import { useNoteStore } from '@/stores/apps/notes';
import axios from 'axios'; 
import BASE_URL from '@/stores/myVar';
import socket from '@/stores/websocket';
axios.defaults.baseURL = BASE_URL
const checkboxClick = ref();
const storeNote = useNoteStore();
const store = useContactStore();
const new_loader = ref(false);

const res_token = localStorage.getItem('res_token');
const res_type = localStorage.getItem('res_type');
onMounted(() => {
    KitchenorderList();  
    (storeNote.fetchNotes());
    socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        if(data.type === 'pendingOrderUpdate'){
                console.log("OOOOOO BHAI MARO MUJHE");
                const order = data.orders; // Assuming data.orders is the single order object
                KitchenorderList();
        }
    });
});

const getContacts: any = computed(() => {
    return store.contacts;
});

const tab = ref(null);  
const search = ref('');
const needType = ref('Pending');
const selectedStatus = ref('Pending');
const itemsPerPage = ref(5)
const page = ref(1);
// const status = ref(['Confirmed','Out for delivery'])
const desserts = ref([]);
const dialog = ref(false)
const status = ref({
      'Pending': ['Confirmed'],
      'Confirmed': ['Out for delivery'],
      'Out for delivery': ['Delivered'],
      'Delivered': ['Completed']
    });
const pageCount = computed(() => {
    return Math.ceil(filteredList.value.length / itemsPerPage.value) 
});
const filteredStatusOptions = computed(() => {
      // Get the available options based on the selected status
    //   const selectedStatus = 'Pending'; // You need to replace this with your actual selected status
      const options = status.value[selectedStatus.value];
      
      // If options are available, return them; otherwise, return an empty array
      return options || [];
    });
const filteredList = computed(() => {
    return desserts.value.filter((orderNum: any) => {
        return orderNum.orderStatus.toLowerCase().includes(search.value.toLowerCase());
    });
});

const KitchenorderList = async () => {
    new_loader.value = true;
    try { 
        const token = localStorage.getItem('authToken');
        const res_token = localStorage.getItem('res_token')
        const Id = window.location.href.split('/').pop();  
        const response = await axios.post('api/kitchen/kitchen_order_list/',{'token':token,'res_token':res_token ,'kitchen_id':Id});
        new_loader.value = false;

        if (response.data.orders) {
            const updatedData = response.data.orders.map((itemData: any) => {
            const loopstart = itemData.items.map((Items: any) => Items.quantity);
            const loopstart1 = loopstart.length > 0 ? loopstart.join(', ') : '0';
            selectedStatus.value = itemData.status
            return {
                orderStatus: itemData.status,
                orderNum:itemData.id,
                tableNum:itemData.table?.table,
                date:itemData.created_at,
                quantity:loopstart1,
                foodFilterItem: itemData.items.map((foodItem:any) => {
                    if(foodItem){
                        console.log('fsdfdsfdsfsdfddsf ')
                        const kitchenIdString = localStorage.getItem('kitchen');
                        const kitchenId = parseInt(kitchenIdString);
                        console.log('fsdfdsfdsfsdfddsf ',kitchenId)
                        if(foodItem.item.dish_kitchen.id === kitchenId){
                            const addons_data = foodItem.addons.map((foodyddon:any) =>{
                                return foodyddon.add_name;
                            });
                            return {
                                id:foodItem.id,
                                foodImage: foodItem.item.base64_images, 
                                foodName: foodItem.item.dish_name, // Append the addon data to foodName
                                quantity: foodItem.quantity,
                                addon: addons_data ? addons_data : 'No Addons',  // just print name here
                            }; 
                        }else{
                            return undefined;
                        }
                    }}),
                };
            });
            console.log('updated data:', updatedData);
            desserts.value = updatedData;
           
        }else{
            new_loader.value = false;
            console.log("First Error")
        }
    }  catch (error) {
        new_loader.value = false;
        console.error('API error:',     error);
    }
}

const saveOrder = async (item:any) => {
    try {
        const token = localStorage.getItem('authToken');
        const orderId = item.orderNum;
        const newStatus = selectedStatus.value;
        const kitchen_Id = window.location.href.split('/').pop(); 
        console.log('check the data',orderId , '----',newStatus)
        const response = await axios.post('api/kitchen/change_order_status/', {
          'token':token,  
          'orderId': orderId,
          'newStatus': newStatus, 
          'kitchen_id':kitchen_Id,
        });
        if (response.data) {
            console.log('check the data came ===----',response.data)
            item.orderStatus = newStatus; 
            item.dialog = false;
        } else {
          console.log("Error changing order status");
        }
    } catch (error) {
    console.error('API error:', error);
    }
};


</script>
<template>
    <div class="">
        <v-card elevation="10" class="" rounded="md">
            <v-tabs v-model="tab" bg-color="transparent" min-height="70" height="70" color="primary">
                <v-tab value="Pending" color="primary" class="" @click="needType='Pending'">
                    <div class="ring-container">
                        <div class="ringring"></div><div class="circle-animation"></div>
                    </div>
                    <ShoppingCartPlusIcon class="mr-2" size="20"/>
                    New Order
                </v-tab>
                <v-tab value="Confirmed" color="secondary"  class="" @click="needType='Confirmed'"><CircleCheckIcon class="mr-2" size="20" />Confirmed</v-tab>
                <v-tab value="Out for delivery" color="warning" class="" @click="needType='Out for delivery'"><ToolsKitchenIcon class="mr-2" size="20"/>Ready</v-tab>
                <v-tab value="Delivered" color="error" class="" @click="needType='Delivered'"><ToolsKitchenIcon class="mr-2" size="20"/>Delivered</v-tab>
                <v-tab v-if="res_type == 'Vendor'" value="Completed" color="success" class="" @click="needType='Completed'"><ToolsKitchenIcon class="mr-2" size="20"/>Completed</v-tab>
                <!-- <v-tab value="Delivered" color="success" class="" @click="needType='Delivered'"><TruckLoadingIcon class="mr-2" size="20"/>Delivered</v-tab> -->
            </v-tabs>
            <div>
                <div class="logoLoader tableLoader" v-if="new_loader === true">
                    <div class="LogoVInnerImg">
                        <img src="@/assets/images/locator/v-icon.png" alt="logo-loader"/>
                        <p class="">Please Wait...</p>
                    </div>
                </div>
                <v-card-text class="pa-sm-6 pa-3 pb-sm-6 pb-6">
                    <v-window v-model="tab">
                        <template v-for="data in ['Pending', 'Confirmed', 'Out for delivery', 'Delivered','Completed']" :key="data">
                            <v-window-item :value="data">
                                <v-row class="py-4 px-2">
                                    <template v-if="filteredList.length > 0">
                                        <template v-for="item in filteredList" :key="item.id">
                                            <v-col cols="12" lg="3" md="4" sm="6" v-if="item.orderStatus==data && item.foodFilterItem">
                                                <div class="linkClickCard" @click="item.dialog = true">
                                                    <v-card elevation="10" >
                                                        <v-chip v-if="item.orderStatus === 'Pending'" class="sizeStatusStyle text-primary bg-lightprimary" size="small"  label>
                                                            {{ item.orderStatus }}
                                                        </v-chip>
                                                        <v-chip v-if="item.orderStatus === 'Confirmed'" class="sizeStatusStyle text-secondary bg-lightsecondary" size="small" label>{{ item.orderStatus }}</v-chip>
                                                        <v-chip v-if="item.orderStatus === 'Out for delivery'" class="sizeStatusStyle text-warning bg-lightwarning" size="small" label>{{ item.orderStatus }}</v-chip>
                                                        <v-chip v-if="item.orderStatus === 'Delivered'" class="sizeStatusStyle text-error bg-lighterror" size="small" label>{{ item.orderStatus }}</v-chip>
                                                        <v-chip v-if="item.orderStatus === 'Completed'" class="sizeStatusStyle text-success bg-lightsuccess" size="small" label>{{ item.orderStatus }}</v-chip>
                                                        <v-card-text class="pa-3 pt-4" :class="item.orderStatus === 'Pending' ? 'animatedGardientColor': 'bg-white'">
                                                            <div class="contentCardOrder">
                                                                <div class="">
                                                                    <h2 class="font-weight-semibold mb-2">Order {{ item.orderNum }}</h2>
                                                                    <h3 class="font-weight-semibold mb-2">Table {{ item.tableNum }}</h3>
                                                                    <h3 class="font-weight-semibold mb-2">QTY. {{ item.quantity }}</h3>
                                                                </div>
                                                                <p>{{ item.date }}</p>
                                                            </div>
                                                        </v-card-text>
                                                    </v-card>
                                                    <v-dialog v-model="item.dialog" max-width="600">
                                                        <v-card>
                                                            <v-card-text>
                                                                <div class="topCardFood">
                                                                    <div class="topTitleCard mb-4">
                                                                        <div class="d-flex justify-space-between">
                                                                            <h2 class="text-h6 font-weight-semibold mb-1">Order {{ item.orderNum }}</h2>
                                                                            <h2 class="text-h6 font-weight-semibold mb-1">Table {{ item.tableNum }}</h2>
                                                                        </div>
                                                                        <p class="text-subtitle-2">{{ item.date }} {{ item.time }}</p>
                                                                    </div>
                                                                </div>
                                                                <div class="mainFoodRow" v-for="foodItem in item.foodFilterItem" :key="foodItem">
                                                                    <template v-if="foodItem">
                                                                        <div class="foodImageCol d-flex align-center justify-center">
                                                                            <template v-if="foodItem.foodImage">
                                                                                <img :src="foodItem.foodImage" alt="Food Image">
                                                                            </template>
                                                                            <template v-else>
                                                                                <img src="../../assets/images/locator/v-icon.png" alt="Food Dummy Image" class="v-locator-static-img">
                                                                            </template>
                                                                        </div>
                                                                        <div class="foodContentCol">
                                                                            <div class="foodPriceCol">
                                                                                <h3 class="text-h6 mb-2">{{foodItem.foodName}}</h3>
                                                                                <h5 class="text-subtitle-1 font-weight-semibold">QTY: {{foodItem.quantity}}</h5>
                                                                            </div>
                                                                            <h4 class="text-subtitle-2 mb-2 d-flex">
                                                                                <span class="titleSideCrd font-weight-bold pe-2">Addon:</span> 
                                                                                <span class="contentSideCrd font-weight-medium">
                                                                                    <template v-if="foodItem.addon && foodItem.addon.length">
                                                                                        <span v-for="(addon, index) in foodItem.addon" :key="index">
                                                                                            {{ item.quantity }} x {{ addon }}
                                                                                            <br v-if="index < foodItem.addon.length - 1" />
                                                                                        </span>
                                                                                    </template>
                                                                                    <template v-else>
                                                                                        No Addons
                                                                                    </template>
                                                                                </span>
                                                                            </h4>
                                                                            <h4 class="text-subtitle-2  d-flex">
                                                                                <span class="titleSideCrd font-weight-bold pe-2">Size:</span> 
                                                                                <v-chip color="primary" class="v-chip-style-cstm" size="small">Small</v-chip>
                                                                            </h4>
                                                                            
                                                                        </div>
                                                                    </template>
                                                                </div>
                                                                <template v-if="item.orderStatus === 'Delivered'">
                                                                    <h4 class="text-subtitle-2 mt-2 d-flex align-center">
                                                                        <span class="titleSideCrd text-h6 font-weight-medium pe-2">Payment Status:</span> 
                                                                        <v-row>
                                                                            <v-col cols="auto">
                                                                                <v-checkbox label="Done" v-model="checkboxClick" color="primary" value="done" hide-details> </v-checkbox>
                                                                            </v-col>
                                                                        </v-row>
                                                                    </h4>
                                                                </template>
                                                                <template v-if="item.orderStatus != 'Completed'">
                                                                    <v-select
                                                                        variant="outlined"
                                                                        hide-details
                                                                        :disabled="!checkboxClick && (item.orderStatus !== 'Pending' && selectedStatus !== 'Confirmed' && item.orderStatus !== 'Confirmed' && selectedStatus !== 'Out for delivery' && item.orderStatusChange !== 'Delivered' && selectedStatus == 'Delivered')"
                                                                        :items="filteredStatusOptions"
                                                                        v-model="selectedStatus"
                                                                        label="Status"
                                                                        class="mt-4"
                                                                    
                                                                    ></v-select>
                                                                </template>
                                                            </v-card-text>
                                                            <v-card-actions class="justify-end">
                                                                <v-btn color="primary" size="small" variant="flat" @click="saveOrder(item)">Save</v-btn>
                                                                <v-btn color="error" size="small" variant="flat" @click="item.dialog = false">Close Dialog</v-btn>
                                                            </v-card-actions>
                                                        </v-card>
                                                    </v-dialog>
                                                </div>
                                            </v-col>
                                        </template>
                                    </template>
                                    <template v-else>
                                        <v-col cols="12">
                                        <p class="text-center">No Order Yet</p>
                                        </v-col>
                                    </template>
                                </v-row>
                            </v-window-item>
                            
                            <v-window-item value="completed">
                                completed
                            </v-window-item>
                        </template>
                    </v-window>
                </v-card-text>
            </div>
        </v-card>
    </div>
</template>
