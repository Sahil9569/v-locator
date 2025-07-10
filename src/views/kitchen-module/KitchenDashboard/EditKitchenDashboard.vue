<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useContactStore } from '@/stores/apps/contact';
import { useNoteStore } from '@/stores/apps/notes';
import { colorVariation } from '@/_mockApis/apps/notes/index';
import kitchenOrder from '@/_mockApis/apps/kitchenOrder';
// import { topCardsData } from '@/_mockApis/components/KitchenDashboard/index';
import { getPrimary, getLightPrimary, getSecondary } from '@/utils/UpdateColors';
import {ShoppingCartPlusIcon, ShoppingCartIcon, CircleCheckIcon, ToolsKitchenIcon, TruckLoadingIcon, ChecklistIcon} from 'vue-tabler-icons';``
import axios from 'axios'; // Make sure to install Axios in your project
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL

const storeNote = useNoteStore();
const store = useContactStore();
const statusesToShow = ref(['Confirmed','Cooking','Delivered',"Out for delivery",'Pending','Canceled'])
const statusesOrder = ref('Pending')
// const item = ref({ dialog: false, orderStatus: 'Pending'});

const topCardsData= ref([
    {
        // img: card_icon1,
        title: "All Orders",
        number: "0",
        bgcolor: "lightprimary",
        textcolor: "primary"
    },
    {
        // img: card_icon2,
        title: "Pending",
        number: "0",
        bgcolor: "lightwarning",
        textcolor: "warning"
    },
    {
        // img: card_icon3,
        title: "Confirmed Order",
        number: "0",
        bgcolor: "lightsecondary",
        textcolor: "secondary"
    },
    {
        // img: card_icon5,
        title: "Delivered Order",
        number: "0",
        bgcolor: "lightsuccess",
        textcolor: "success"
    },
    {
        // img: card_icon6,
        title: "Complete Order",
        number: "0",
        bgcolor: "lightprimary",
        textcolor: "primary"
    },
    // {
    //     // img: card_icon4,
    //     title: "Cooking Order",
    //     number: "12",
    //     bgcolor: "lighterror",
    //     textcolor: "error"
    // },
])

onMounted(() => {
    (store.fetchContacts()),(storeNote.fetchNotes());
    fetchtopCardsData();
    fetchorderList();
    latestorderList();
});

const getContacts: any = computed(() => {
    return store.contacts;
});
const search = ref('');
const itemsPerPage = ref(5)
const page = ref(1);
const status = ref(['Confirmed'])
const desserts = ref([]);

const pageCount = computed(() => {
    return Math.ceil(filteredList.value.length / itemsPerPage.value) 
});
const ordersArray = ref([]);
// Create a computed property that depends on the reactive data source
const newOrderFilter = computed(() => {
  return ordersArray.value;
});



const filteredList = computed(() => {
    return desserts.value.filter((item: any) => statusesToShow.value.includes(item.orderStatus));
});

// const dialog = ref(false)
// const newOrderFilter = computed(() => {
//     return desserts.value.filter((item: any) => statusesOrder.value.includes(item.orderStatus));
// });


const chartOptions = computed(() => {
    return {
        chart: {
            height: 275,
            type: 'bar',
            fontFamily: `inherit`,
            foreColor: '#adb0bb',
            toolbar: {
                show: false
            }
        },
        colors: [getLightPrimary.value, getLightPrimary.value, getPrimary.value, getLightPrimary.value, getLightPrimary.value, getLightPrimary.value],
        plotOptions: {
            bar: {
                columnWidth: '45%',
                distributed: true,
                borderRadius:4, 
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        grid: {
            yaxis: {
                lines: {
                    show: false
                }
            }
        },
        xaxis: {
            categories: [['Apr'], ['May'], ['June'], ['July'], ['Aug'], ['Sept']],
            axisBorder: {
                show: false
            }
        },
        yaxis: {
            labels: {
                show: false
            }    
        },
        tooltip: {
            theme: 'dark',
            x: {
                format: 'dd/MM/yy HH:mm'
            }
        }
    };
});
const Chart = {
    series: [
        {
            name: '',
            data: [20, 15, 30, 25, 10, 15]
        }
    ]
};

const areachartOptions = computed(() => {
    return {
        chart: {
            type: 'area',
            height: 60,
            fontFamily: `inherit`,
            foreColor: '#a1aab2',
            toolbar: {
                show: false
            },
            sparkline: {
                enabled: true
            },
            group: 'sparklines'
        },
        colors: [getPrimary.value],
        stroke: {
            curve: 'smooth',
            width: 2
        },
        fill: {
            type: 'solid',
            opacity: 0.05
        },
        markers: {
            size: 0
        },
        tooltip: {
            theme: 'dark',
            x: {
                show: false
            }
        }
    };
});

const areaChart = {
    series: [
        {
            name: '',
            data: [25, 66, 20, 40, 12, 58, 20]
        }
    ]
};
const fetchtopCardsData = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post('api/kitchen/fetch_kitchen_data/',{'token':token});
        console.log('aadfghjgdsdsf',response.data)
        if (topCardsData.value[0] !== undefined) {
            topCardsData.value[0].number = response.data.all_order.toString();
        }
        if (topCardsData.value[1] !== undefined) {
            topCardsData.value[1].number = response.data.new_order.toString();
        }
        if (topCardsData.value[2] !== undefined) {
            topCardsData.value[2].number = response.data.confirmed_order.toString();
        }
        if (topCardsData.value[3] !== undefined) {
            topCardsData.value[3].number = response.data.delivered_order.toString();
        }
        if (topCardsData.value[4] !== undefined) {
            topCardsData.value[4].number = response.data.complete_order.toString();
        }
    } catch (error) {
        console.error('API error:', error);
    }
};

const fetchorderList = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post('api/kitchen/all_kitchenfood_detais/',{'token':token});
        console.log('response is back fetchorderList ---', response.data);
        const item = response.data;
        if (response.data) {
            const updatedData = response.data.map((item: any) => {
            const dishNamesArray = item.items.map((relatedItem: any) => relatedItem.item.dish_name);
            const foodName = dishNamesArray.join(', ');
            return {
                orderNumber: item.id,
                tableNum: item.table.table,
                date: item.created_at, 
                orderStatus: item.status,
                foodName: `${foodName || 'N/A'}`, 
                };
            });

            console.log('updated data:', updatedData);
            desserts.value = updatedData;
        }else{
            console.log("First Error")
        }
    } catch (error) {
        console.error('API error:', error);
    }
}

const latestorderList = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const res_token = localStorage.getItem('res_token')
        const response = await axios.post('api/kitchen/latest_kitchenfood_details/',{'token':token,'res_token':res_token});
        console.log('response is back of latest order ---', response.data);
        if (response.data) {
            
            const updatedData = response.data.map((item: any) => {
                return {
                    orderNum: item.id,
                    tableNum: item.table.table,
                    itemsNum: item.id,
                    date: item.created_at, 
                    orderStatus: item.status,
                    // dialog:false,
                };
            });
            ordersArray.value = updatedData;
        }else{
            console.log("First Error")
        }
    } catch (error) {
        console.error('API error:', error);
        
    }
}

const saveOrder = async (item:any) => {
    try {
        const token = localStorage.getItem('authToken');
        const orderId = item.orderNum;
        const newStatus = item.orderStatusitems;
        const kitchen_Id = window.location.href.split('/').pop(); 
        console.log('check the data',orderId , '----',newStatus,'-----',kitchen_Id)
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
            fetchorderList();
            latestorderList();
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
    
        <v-row class="mb-4 justify-space-evenly">
            <v-col cols="12" lg="2" md="4" sm="4" v-for="card in topCardsData" :key="card.title">
                <div
                    :class="'text-decoration-none d-flex align-center justify-center text-center rounded-md pa-6  bg-' + card.bgcolor"
                >
                    <div :class="'bg-' + card.bgcolor">
                        <ShoppingCartIcon v-if="card.title === 'All Orders'" class="text-primary" stroke-width="1.5" size="32"/>
                        <ShoppingCartPlusIcon v-if="card.title === 'Pending'" class="text-warning" stroke-width="1.5" size="32"/>
                        <CircleCheckIcon v-if="card.title === 'Confirmed Order'" class="text-secondary" stroke-width="1.5" size="32"/>
                        <!-- <ToolsKitchenIcon v-if="card.title === 'Cooking Order'" class="text-error" stroke-width="1.5" size="32"/> -->
                        <TruckLoadingIcon v-if="card.title === 'Delivered Order'" class="text-success  " stroke-width="1.5" size="32"/>
                        <ChecklistIcon v-if="card.title === 'Complete Order'" class="text-primary" stroke-width="1.5" size="32"/>

                        
                        <div :class="'text-subtitle-1 text-capitalize font-weight-bold mt-3 text-' + card.textcolor" v-text="card.title"></div>
                        <h4 :class="'text-h4 mt-1 text-' + card.textcolor" v-text="card.number"></h4>
                    </div>
                </div>
            </v-col>
        </v-row>
        <v-card elevation="10" class="my-8">
            <v-card-item class="pa-3">
                <v-card-title class="text-h5 mb-3">Latest New Orders</v-card-title>
                <v-row class="py-4 px-2">
                    <template v-for="item in newOrderFilter" :key="item.id">
                        <v-col cols="12" lg="3" md="4" sm="6">
                            <div class="linkClickCard" @click="item.dialog = true">
                                <v-card elevation="10" >
                                    <v-chip v-if="item.orderStatus === 'Pending'" class="sizeStatusStyle text-primary bg-lightprimary" size="small"  label>
                                        {{ item.orderStatus }}
                                    </v-chip>
                                    <v-card-text class="pa-3 pt-4" :class="item.orderStatus === 'Pending' ? 'animatedGardientColor': 'bg-white'">
                                        <div class="contentCardOrder">
                                            <div class="">
                                                <h2 class="font-weight-semibold mb-2">Order {{ item.orderNum }}</h2>
                                                <h3 class="font-weight-semibold mb-2">Table {{ item.tableNum }}</h3>
                                                <h3 class="font-weight-semibold mb-2">Items {{ item.itemsNum }}</h3>
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
                                                    <p class="text-subtitle-2">{{ item.date }}</p>
                                                </div>
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
                                                            {{ foodItem.addon.join(', ') }}
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
                                                v-model="item.orderStatusitems"
                                                label="Pending"
                                                class="mt-4"
                                                :value="null"
                                            ></v-select>
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
                </v-row>
            </v-card-item>
        </v-card>

        <v-card elevation="10" >
            <v-card-item class="pa-3">
                <div class="px-3">
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-card-title class="text-h5">Today's Orders</v-card-title>
                        </v-col>
                    </v-row>
                </div>
                <v-table class="mt-5">
                    <thead>
                        <tr>
                            <!-- <th class="text-subtitle-1 font-weight-semibold">S No</th> -->
                            <th class="text-subtitle-1 font-weight-semibold">Item Name</th>
                            <th class="text-subtitle-1 font-weight-semibold">Order No</th>
                            <th class="text-subtitle-1 font-weight-semibold">Table No</th>
                            <th class="text-subtitle-1 font-weight-semibold">Order date</th>
                            <th class="text-subtitle-1 font-weight-semibold">Status</th>
                            <!-- <th class="text-subtitle-1 font-weight-semibold">Actions</th> -->
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in filteredList" :key="item.id">
                            <!-- <td class="text-subtitle-1"><v-img :src="item.SNo" width="45px" class="rounded-circle img-fluid"></v-img></td> -->
                            <!-- <td class="text-subtitle-1">{{ item.id }}</td> -->
                            <td class="text-subtitle-1">{{ item.foodName }}</td>
                            <td class="text-subtitle-1">{{ item.orderNumber }}</td>
                            <td class="text-subtitle-1">{{ item.tableNum }}</td>
                            <td class="text-subtitle-1">{{ item.date }} </td>
                            <td>
                                <v-chip v-if="item.orderStatus === 'Pending'" color="primary" size="small"  label><div class="ring-container">
                                <div class="ringring"></div><div class="circle-animation"></div></div> {{ item.orderStatus }}
                                </v-chip>
                                <v-chip v-if="item.orderStatus === 'Confirmed'" color="secondary" size="small" label>{{ item.orderStatus }}</v-chip>
                                <v-chip v-if="item.orderStatus === 'Cooking'" color="warning"  size="small" label>{{ item.orderStatus }}</v-chip>
                                <v-chip v-if="item.orderStatus === 'Delivered'" color="success" size="small" label>{{ item.orderStatus }}</v-chip>
                                <v-chip v-if="item.orderStatus === 'Out for delivery'" color="info" size="small" label>{{ item.orderStatus }}</v-chip>
                                <!-- <v-chip v-if="item.orderStatus === 'Pending'" color="accent" size="small" label>{{ item.orderStatus }}</v-chip> -->
                                <v-chip v-if="item.orderStatus === 'Canceled'" color="error" size="small" label>{{ item.orderStatus }}</v-chip>
                            </td>
                            <!-- <td><v-btn icon flat ><EyeIcon size="20" class="text-primary"/></v-btn></td> -->
                        </tr>
                    </tbody>
                </v-table>
            </v-card-item>
        </v-card>

        <!-- <v-row class="mt-2">
            <v-col cols="12" lg="6" md="6" class="my-4">
                <v-card elevation="10" >
                    <v-card-item>
                        <v-card-title class="text-h5">Monthly Total Orders</v-card-title>
                        <v-card-subtitle class="text-subtitle-1 textSecondary">Every month</v-card-subtitle>
                        <apexchart type="bar" height="275" :options="chartOptions" :series="Chart.series"> </apexchart>
                        <v-row>
                            <v-col cols="6" sm="6" class="d-flex">
                                <div class="d-flex align-center mt-md-6 mt-3">
                                    <v-avatar class="rounded-md bg-lightprimary text-primary">
                                        <GridDotsIcon size="22" />
                                    </v-avatar>
                                    <div class="pl-4">
                                        <h6 class="text-subtitle-1 textSecondary mb-1">Monthly Earnings</h6>
                                        <h3 class="text-h6">$36,358</h3>
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-item>
                </v-card>
            </v-col>
            <v-col cols="12" lg="6" md="6" class="mt-4">
                <v-row>
                    <v-col cols="12">
                        <v-card elevation="10" >
                            <v-card-item>
                                <div class="d-flex align-center justify-space-between">
                                    <v-card-title class="text-h5">Today Earnings</v-card-title>
                                    <v-btn size="large" icon variant="flat" class="bg-primary">
                                        <v-avatar size="large" class="text-white">
                                            <CurrencyDollarIcon size="22" />
                                        </v-avatar>
                                    </v-btn>
                                </div>
                                <v-row>
                                    <v-col cols="12">
                                        <div class="mt-2">
                                            <h3 class="text-h3">$3000</h3>
                                             <div class="mt-2 d-flex gap-2 align-center">
                                                <v-avatar class="bg-lighterror text-accent" size="25">
                                                    <ArrowDownRightIcon size="20" />
                                                </v-avatar>
                                                <span class="text-subtitle-1 font-weight-bold">+9%</span>
                                                <span class="text-subtitle-1 textSecondary ">last year</span>
                                            </div>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-card-item>
                            <div class="mt-3 ">
                                <apexchart type="area" height="60" :options="areachartOptions" :series="areaChart.series"> </apexchart>
                            </div>
                        </v-card>
                    </v-col>
                    <v-col cols="12">
                        <v-card elevation="10" >
                            <v-card-item>
                                <div class="d-flex align-center justify-space-between">
                                    <v-card-title class="text-h5">Today Orders</v-card-title>
                                    <v-btn size="large" icon variant="flat" class="bg-primary">
                                        <v-avatar size="large" class="text-white">
                                            <CurrencyDollarIcon size="22" />
                                        </v-avatar>
                                    </v-btn>
                                </div>
                                <v-row>
                                    <v-col cols="12">
                                        <div class="mt-2">
                                            <h3 class="text-h3">70</h3>
                                             <div class="mt-2 d-flex gap-2 align-center">
                                                <v-avatar class="bg-lighterror text-accent" size="25">
                                                    <ArrowDownRightIcon size="20" />
                                                </v-avatar>
                                                <span class="text-subtitle-1 font-weight-bold">+9%</span>
                                                <span class="text-subtitle-1 textSecondary ">last year</span>
                                            </div>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-card-item>
                            <div class="mt-3 ">
                                <apexchart type="area" height="60" :options="areachartOptions" :series="areaChart.series"> </apexchart>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row> -->
    </div>
</template>
