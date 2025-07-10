<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue';
    import { useContactStore } from '@/stores/apps/contact';
    // import { useNoteStore } from '@/stores/apps/notes';
    // import { colorVariation } from '@/_mockApis/apps/notes/index';
    import kitchenOrder from '@/_mockApis/apps/kitchenOrder/index';
    // import { topCardsData } from '@/_mockApis/components/KitchenDashboard/index';
    // import { getPrimary, getLightPrimary } from '@/utils/UpdateColors';
    // import { getPrimary, getLightPrimary, getSecondary } from '@/utils/UpdateColors';
    import {ShoppingCartPlusIcon, ShoppingCartIcon, CircleCheckIcon, ToolsKitchenIcon, TruckLoadingIcon, ChecklistIcon} from 'vue-tabler-icons';
    
    // import { VTable, VPagination } from '@/_mockApis/apps/contact';
    // const title = ref('');
    // const color = ref('primary');
    // const storeNote = useNoteStore();
    const store = useContactStore();
    // const checkIcon = ref(false)
    onMounted(() => {
        (store.fetchContacts())
        // (storeNote.fetchNotes());
    });
    
    const getContacts: any = computed(() => {
        return store.contacts;
    });
    const tab = ref(null);  
    // const getNote = computed(() => {
    //     return storeNote.notes;
    // });
    
    // function colorset(btcolor: any) {
    //     return (color.value = btcolor);
    // }
    // const getId = getNote.value.length;
    // function addNote() {
    //     return (
    //         getNote.value.push({ id: getId + 1, title: title.value, color: color.value, datef: new Date() }),
    //         (dialog.value = false),
    //         (title.value = '')
    //     );
    // }
    
    // const valid = ref(true);
    
    const search = ref('');
    const needType = ref('New Order');
    const itemsPerPage = ref(5)
    const page = ref(1);
    // const orderStatus = ref('Select Status')
    const status = ref(['New Order','Confirmed','Cooking','Delivered'])
    // const cstmStatus =ref()
    // const values = ref('foo');
    // const dishCategory = ref(['Indian food', 'Lunch Package', 'Maxican', 'Salad']);
    // const kitchenAssign = ref(['Kitchen 1','Kitchen 2','Kitchen 3'])
    const desserts = ref(kitchenOrder);
    //Methods
    const pageCount = computed(() => {
        return Math.ceil(filteredList.value.length / itemsPerPage.value) 
    });

    // const hasNewOrderStatus = computed(() => {
    //     return filteredList.value.some(item => item.status === 'New Order'); 
    // });
    
    const dialog = ref(false)
    
    const filteredList = computed(() => {
        return desserts.value.filter((user: any) => {
            return user.name.toLowerCase().includes(search.value.toLowerCase());
        });
    });
    
    
    </script>
    <template>
        <div class="">
            <v-card elevation="10" class=" " rounded="md">
                <v-tabs v-model="tab" bg-color="transparent" min-height="70" height="70" color="primary">
                    <v-tab value="New Order" color="primary" class="" @click="needType='New Order'">
                        <div class="ring-container">
                            <div class="ringring"></div><div class="circle-animation"></div>
                        </div>
                        <ShoppingCartPlusIcon class="mr-2" size="20"/>
                        New Order
                    </v-tab>
                    <v-tab value="Confirmed" color="secondary"  class="" @click="needType='Confirmed'"><CircleCheckIcon class="mr-2" size="20" />Confirmed</v-tab>
                    <v-tab value="Cooking" color="warning" class="" @click="needType='Cooking'"><ToolsKitchenIcon class="mr-2" size="20"/>Cooking</v-tab>
                    <v-tab value="Delivered" color="success" class="" @click="needType='Delivered'"><TruckLoadingIcon class="mr-2" size="20"/>Delivered</v-tab>
                </v-tabs>
                <v-divider></v-divider>
                <v-card-text class="pa-sm-6 pa-3 pb-sm-6 pb-6">
                    <v-window v-model="tab">
                        <template v-for="data in ['New Order', 'Confirmed', 'Cooking', 'Delivered']" :key="data">
                            <v-window-item :value="data">
                                <v-row class="py-4 px-2">
                                    <template v-for="item in filteredList" :key="item.id">
                                        <v-col cols="12" lg="3" md="4" sm="6" v-if="item.orderStatus==data">
                                            <div class="linkClickCard" @click="item.dialog = true">
                                                <v-card elevation="10" >
                                                    <v-chip v-if="item.orderStatus === 'New Order'" class="sizeStatusStyle text-primary bg-lightprimary" size="small"  label>
                                                        {{ item.orderStatus }}
                                                    </v-chip>
                                                    <v-chip v-if="item.orderStatus === 'Confirmed'" class="sizeStatusStyle text-secondary bg-lightsecondary" size="small" label>{{ item.orderStatus }}</v-chip>
                                                    <v-chip v-if="item.orderStatus === 'Cooking'" class="sizeStatusStyle text-warning bg-lightwarning" size="small" label>{{ item.orderStatus }}</v-chip>
                                                    <v-chip v-if="item.orderStatus === 'Delivered'" class="sizeStatusStyle text-success bg-lightsuccess" size="small" label>{{ item.orderStatus }}</v-chip>
                                                    <v-card-text class="pa-3 pt-4" :class="item.orderStatus === 'New Order' ? 'animatedGardientColor': 'bg-white'">
                                                        <div class="contentCardOrder">
                                                            <div class="">
                                                                <h2 class="font-weight-semibold mb-2">Order {{ item.orderNum }}</h2>
                                                                <h3 class="font-weight-semibold mb-2">Table {{ item.tableNum }}</h3>
                                                                <h3 class="font-weight-semibold mb-2">Items {{ item.tableNum }}</h3>
                                                            </div>
                                                            <p>{{ item.date }} {{ item.time }}</p>
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
                                                                <!-- <div class="topButtonView">
                                                                    <router-link to="/kitchenDetail" color="primary"> 
                                                                        <v-btn size="small" color="primary" flat>
                                                                            View
                                                                        </v-btn>
                                                                    </router-link>
                                                                </div> -->
                                                            </div>
                                                            <div class="mainFoodRow border-bottom" v-for="foodItem in item.foodFilterItem" :key="foodItem.id">
                                                                <div class="foodImageCol">
                                                                    <img :src="foodItem.foodImage" alt="Food Image">
                                                                </div>
                                                                <div class="foodContentCol">
                                                                    <div class="foodPriceCol">
                                                                        <h3 class="text-h6 mb-2">{{foodItem.foodName}}</h3>
                                                                        <h5 class="text-subtitle-1 font-weight-semibold">QTY: {{foodItem.quantity}}</h5>
                                                                    </div>
                                                                    <h4 class="text-subtitle-2 mb-2 d-flex">
                                                                        <span class="titleSideCrd font-weight-bold pe-2">Addon:</span> 
                                                                        <span class="contentSideCrd font-weight-medium">
                                                                            {{foodItem.addon}}
                                                                        </span>
                                                                    </h4>
                                                                    <h4 class="text-subtitle-2  d-flex">
                                                                        <span class="titleSideCrd font-weight-bold pe-2">Size:</span> 
                                                                        <v-chip color="primary" class="v-chip-style-cstm" size="small">Small</v-chip>
                                                                    </h4>
                                                                </div>
                                                            </div>
                                                            <v-select
                                                                variant="outlined"
                                                                hide-details
                                                                :items="status"
                                                                v-model="item.orderStatus"
                                                                label="Status Change"
                                                                class="mt-4"
                                                            ></v-select>
                                                            <!-- <div class="bottomFoodStyle">
                                                                <div class="foodStatus">
                                                                    <template v-if="item.orderStatus === 'New Order'">
                                                                        <v-btn  icon color="primary" size="small" flat>
                                                                            <CheckIcon stroke-width="1.5" />
                                                                        </v-btn>
                                                                        <v-btn  icon color="error" size="small" class="ms-2" flat>
                                                                            <XIcon  stroke-width="1.5"  />
                                                                        </v-btn>
                                                                    </template>
                                                                
                                                                    <v-chip v-if="item.orderStatus === 'Confirmed'" color="secondary" @click="item.dialog = true" size="small" class="sizeStatus" label>{{ item.orderStatus }}</v-chip>
                                                                    <v-chip v-if="item.orderStatus === 'Cooking'" color="warning" @click="item.dialog = true" size="small" class="sizeStatus" label>{{ item.orderStatus }}</v-chip>
                                                                    <v-chip v-if="item.orderStatus === 'Delivered'" color="success" @click="item.dialog = true" size="small" class="sizeStatus" label>{{ item.orderStatus }}</v-chip>
                            
                                                                    
                                                                </div>
                                                                <div class="totalPriceFood text-right">
                                                                    <p class="text-subtitle-1 mb-1">X {{item.totalItems}} Items</p>
                                                                    <h6 class="text-h6">${{item.grandPrice}}</h6>
                                                                </div>
                                                            </div> -->
                                                        </v-card-text>
                                                        <v-card-actions class="justify-end">
                                                            <v-btn color="primary" size="small" variant="flat" @click="item.dialog = false">Save</v-btn>
                                                            <v-btn color="error" size="small" variant="flat" @click="item.dialog = false">Close Dialog</v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                            </div>
                                        </v-col>
                                    </template>
                                </v-row>
                            </v-window-item>
                        </template>
                        <!-- <v-window-item value="Bills">
                            <BillsTab/>
                        </v-window-item> -->
                        <!-- <v-window-item value="Security">
                            <SecurityTab/>
                        </v-window-item> -->
                    </v-window>
                </v-card-text>
            </v-card>
        </div>
    </template>