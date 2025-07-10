<script>
import { ref, computed,onMounted } from 'vue';
import {pricing} from '@/_mockApis/components/pages/pricingData';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
import {PencilIcon,TrashIcon} from 'vue-tabler-icons';
import { createRouterMatcher } from 'vue-router';
import axios from 'axios';
import { useRouter } from "vue-router";
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL
const new_loader = ref(false);


export default {
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
    createRouterMatcher 
},
//   mounted()
//   {
    
//     this.pricing=pricing
//     console.log(this.pricing)
//     // all_packages()
//   },
  setup() {
    const currentSlide = ref(2);
    const pricing = ref(0);
    const dialog =ref(false)
    const items = ref([1]);
    const itemsValue = ref([]);
    const slideTo = (val) => {
      currentSlide.value = val;
      
    };

    const adminUser = ref(false)
    const all_packages = async () => {
        new_loader.value = true;
        try {
            const auth = localStorage.getItem('authToken');
            const res = localStorage.getItem('res_token');
            const formData = {
                token:res,
                auth:auth
            };
            const response = await axios.post('api/vlocator_admin/all_packages/',formData);
            console.log("MY WORLD", response.data.package);
            new_loader.value = false;
            pricing.value = response.data.package;
            if(response.data.restaurant === 'Basic'){           
                currentSlide.value = 0
            }
            if(response.data.restaurant === 'Premium A'){           
                currentSlide.value = 1
            }
            if(response.data.restaurant === 'V Locator +'){           
                currentSlide.value = 2
            }
        } catch (error) {
            new_loader.value = false;
            console.error('API error:', error);
        }
    };
    onMounted(all_packages);
    return {
      currentSlide,
      slideTo,
      pricing,
      adminUser,
      dialog,
      formTitle,
      items,
      itemsValue
    };
  },
  data: () => ({
    settings: {
      itemsToShow: 1,
      snapAlign: 'center',
    },
    breakpoints: {
      769: {
        itemsToShow: 2,
        snapAlign: 'center',
      },
      1024: {
        itemsToShow: 3,
        snapAlign: 'center',
      }
    },
  }),
  methods:{
    addItem()
    {
        const newItem = `Item ${this.items.length + 1}`;
        this.items.push(newItem);
    },
    removeItem(item) {
        const index = this.items.indexOf(item);
        this.items.splice(index, 1);
        this.itemsValue.splice(index, 1);
    },
    editPackage(caption)
    {
        const item = this.pricing.filter((priceItem)=>{
            return priceItem.caption==caption
        })
        this.dialog = true
        this.packageName = item[0].caption
        this.packagePrice = item[0].price
        this.items = item[0].list
        for(var i=0; i<item[0].list.length;i++)
        {
            this.itemsValue[i]= item[0].list[i].listtitle
        }
        console.log(item[0].caption)
    },
    // async all_packages()
    // {
    //     try {
    //         const response = await axios.post('api/vlocator_admin/all_packages');
    //         const router = useRouter();
    //         console.log("MY WORLD",response.data)

    //     } catch (error) {
    //         console.error('API error:', error);
            
    //     }
    // },
    async submitFeedback(id)
    {
        try {
            const res = localStorage.getItem('res_token');
            const formData = {
                token:res,
                pac_id:id, 
                location:window.location.href,  
            };
            console.log("YE HAI Package Feedback",formData);
            const response = await axios.post('api/packages/', formData);
            const router = useRouter();
            console.log(response)
            const cd = window.location.href = response.data;
            // router.push(response.data)

        } catch (error) {
            console.error('API error:', error);
            
        }
    }
  }
}

//Computed Property
const formTitle = computed(() => {
    return pricing.value === -1 ? 'Add Pricing' : 'Edit Pricing';
});


</script>
<template>
    <div class="p-relative">
        <div class="logoLoader tableLoader" v-if="new_loader == true">
            <div class="LogoVInnerImg">
                <img src="@/assets/images/locator/v-icon.png" alt="logo-loader"/>
                <p class="">Please Wait...</p>
            </div>
        </div>
        <v-row>
            <v-col cols="12"  class="text-right">
                <v-dialog v-if="$route.name === 'packages'" v-model="dialog" max-width="700">
                    <!-- <template v-slot:activator="{ props }">
                        <v-btn color="primary" v-bind="props" flat class="ml-auto">
                            <v-icon class="mr-2">mdi-plus</v-icon>Add Package
                        </v-btn>
                    </template> -->
                    <v-card>
                        <v-card-title class="pa-4 bg-primary">
                            <span class="title text-white">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text class="pa-0">
                            <v-form ref="form" v-model="validAddons" class="addonFormStyle" lazy-validation>
                                <v-row class="align-center">
                                    <v-col cols="12" lg="6">
                                        <v-text-field
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            v-model="packageName"
                                            label="Package Name"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" lg="6">
                                        <v-text-field
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            type="number"
                                            v-model="packagePrice"
                                            prepend-inner-icon="mdi-currency-usd"
                                            label="Package Price"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row class="align-center mt-0"  v-for="(item, index) in items" :key="index">
                                    <v-col cols="12"  :md="index!=0? '10' : '12'">
                                        <v-text-field
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            v-model="itemsValue[index]"
                                            label="Item Name"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" v-if="index!=0">
                                        <v-btn color="error" size="small"  @click="removeItem(item)">Remove</v-btn>
                                    </v-col>
                                </v-row>
                                <div class="text-end mt-4">
                                    <v-btn color="primary" variant="flat" @click="addItem">Add Item</v-btn>
                                </div>
                                <v-row>
                                    <v-col cols="12" lg="12" class="mt-2">
                                        <v-text-field
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            v-model="packageName"
                                            label="Button Label"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-card-text>

                        <v-card-actions class="pa-4">
                            <v-spacer></v-spacer>
                            <v-btn color="error" @click="dialog = false">Cancel</v-btn>
                            <v-btn
                                color="primary"
                                variant="flat"
                                @click="save"
                                >Save</v-btn
                            >
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
    
        <v-row class="d-flex justify-center mt-10">
            <v-col cols="12">
                <!-- <div class="">
                    <button @click="next">Next</button>
                        <input type="number" min="0" max="9" v-model="currentSlide" />
                    <button @click="prev">Prev</button>
                    <Navigation />  
                </div> -->
                <Carousel
                    id="thumbnails"
                    :transition="300"
                    :wrap-around="true"
                    v-model="currentSlide"
                    ref="carousel"
                    v-bind="settings" 
                    :breakpoints="breakpoints"
                >
                    <Slide v-for="(card, index) in pricing" :key="card.id">
                        <div class="carousel__item" >
                            <v-card elevation="10" class="h-100 topcardPriceCol cmmnCardPrice rounded-md pa-sm-8 pa-4">
                                <template v-if="$route.name === 'packages'">
                                    <div class="">
                                        <v-row class="">
                                            <v-col cols="6" class="text-start pa-0">
                                                <v-btn icon flat>
                                                    <TrashIcon stroke-width="1.5" size="20" class="text-error"/>
                                                </v-btn>
                                            </v-col>
                                            <v-col cols="6" class="text-end pa-0">
                                                <v-btn icon flat>
                                                    <PencilIcon stroke-width="1.5" size="20" class="text-primary" @click="editPackage(card.caption)"/>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </div>
                                </template>
                                <h4 class="text-body-2 text-medium-emphasis contentColorPrce text-uppercase mb-6" >{{card.name}}</h4>
                                <div  class="d-flex align-center justify-center mt-4">
                                    <sup class="text-h6 mt-n3 pr-2 contentColorPrce">$</sup>
                                    <h2 class="display-1 contentColorPrce">{{ card.price }}</h2>
                                    <!-- <span v-if="priceplan" class="text-medium-emphasis font-weight-medium mt-4 ml-2">/yr</span> -->
                                    <span class="text-medium-emphasis font-weight-medium mt-4 ml-2 contentColorPrce">/mo</span>
                                </div>
                            </v-card>
                        </div>
                    <!-- <div class="carousel__item" @click="slideTo(slide - 1)"></div> -->
                    </Slide>
                </Carousel>
            </v-col>
            <v-col cols="12">
                <Carousel id="gallery" v-bind="settings"  :breakpoints="breakpoints"  :transition="300" :wrap-around="true" v-model="currentSlide">
                    <Slide  v-for="card in pricing" :key="card.caption">
                        <div class="carousel__item">
                            <v-card elevation="10" class="pricingCardCol cmmnCardPrice h-100 rounded-md pa-sm-8 pa-4">
                                
                                    <div class="colUpperCntPrc">
                                        <div class="d-flex justify-space-between">
                                            <h4 class="text-body-2 text-medium-emphasis contentSizeLarge contentColorPrce text-uppercase mb-6">{{card.name}}</h4>
                                            <v-chip v-if="card.name === 'V Locator +'" size="small" class="mt-sm-n4 font-weight-bold" color="warning">POPULAR</v-chip>
                                        </div>
                                        <div class="mb-0 pl-0 pt-5" v-if="card.name === 'V Locator +'">
                                            <v-list-item class="px-0">
                                                <v-list-item-title
                                                    class="text-body-1 d-flex listCardMainInnr font-weight-medium text-medium-emphasis"
                                                >
                                                <CheckIcon size="18" class="text-primary mr-4"/>
                                                    <span class="titleCrdPrc contentColorPrce">Unlimited Staff</span>
                                                </v-list-item-title>
                                            </v-list-item>
                                            <v-list-item class="px-0">
                                                <v-list-item-title
                                                    class="text-body-1 d-flex listCardMainInnr font-weight-medium text-medium-emphasis"
                                                >
                                                <CheckIcon size="18" class="text-primary mr-4"/>
                                                    <span class="titleCrdPrc contentColorPrce">Unlimited Kitchen</span>
                                                </v-list-item-title>
                                            </v-list-item>
                                            <v-list-item class="px-0">
                                                <v-list-item-title
                                                    class="text-body-1 d-flex listCardMainInnr font-weight-medium text-medium-emphasis"
                                                >
                                                <CheckIcon size="18" class="text-primary mr-4"/>
                                                    <span class="titleCrdPrc contentColorPrce">Unlimited Table</span>
                                                </v-list-item-title>
                                            </v-list-item>
                                            <v-list-item class="px-0">
                                                <v-list-item-title
                                                    class="text-body-1 d-flex listCardMainInnr font-weight-medium text-medium-emphasis"
                                                >
                                                <CheckIcon size="18" class="text-primary mr-4"/>
                                                    <span class="titleCrdPrc contentColorPrce">Unlimited Food</span>
                                                </v-list-item-title>
                                            </v-list-item>
                                        </div>
                                        <div class="mb-0 pl-0 pt-5" v-if="card.name === 'Basic'">
                                            <v-list-item class="px-0">
                                                <v-list-item-title
                                                    class="text-body-1 d-flex listCardMainInnr font-weight-medium text-medium-emphasis"
                                                >
                                                <CheckIcon size="18" class="text-primary mr-4"/>
                                                    <span class="titleCrdPrc contentColorPrce">1 Staff / Role</span>
                                                </v-list-item-title>
                                            </v-list-item>
                                            <v-list-item class="px-0">
                                                <v-list-item-title
                                                    class="text-body-1 d-flex listCardMainInnr font-weight-medium text-medium-emphasis"
                                                >
                                                <CheckIcon size="18" class="text-primary mr-4"/>
                                                    <span class="titleCrdPrc contentColorPrce">1 Kitchen</span>
                                                </v-list-item-title>
                                            </v-list-item>
                                            <v-list-item class="px-0">
                                                <v-list-item-title
                                                    class="text-body-1 d-flex listCardMainInnr font-weight-medium text-medium-emphasis"
                                                >
                                                <CheckIcon size="18" class="text-primary mr-4"/>
                                                    <span class="titleCrdPrc contentColorPrce">5 Table</span>
                                                </v-list-item-title>
                                            </v-list-item>
                                            <v-list-item class="px-0">
                                                <v-list-item-title
                                                    class="text-body-1 d-flex listCardMainInnr font-weight-medium text-medium-emphasis"
                                                >
                                                <CheckIcon size="18" class="text-primary mr-4"/>
                                                    <span class="titleCrdPrc contentColorPrce">10 Food Items</span>
                                                </v-list-item-title>
                                            </v-list-item>
                                        </div>
                                        <div class="mb-0 pl-0 pt-5" v-if="card.name === 'Premium A'">
                                            <v-list-item class="px-0">
                                                <v-list-item-title
                                                    class="text-body-1 d-flex listCardMainInnr font-weight-medium text-medium-emphasis"
                                                >
                                                <CheckIcon size="18" class="text-primary mr-4"/>
                                                    <span class="titleCrdPrc contentColorPrce">2 Staff / Role</span>
                                                </v-list-item-title>
                                            </v-list-item>
                                            <v-list-item class="px-0">
                                                <v-list-item-title
                                                    class="text-body-1 d-flex listCardMainInnr font-weight-medium text-medium-emphasis"
                                                >
                                                <CheckIcon size="18" class="text-primary mr-4"/>
                                                    <span class="titleCrdPrc contentColorPrce">2 Kitchen</span>
                                                </v-list-item-title>
                                            </v-list-item>
                                            <v-list-item class="px-0">
                                                <v-list-item-title
                                                    class="text-body-1 d-flex listCardMainInnr font-weight-medium text-medium-emphasis"
                                                >
                                                <CheckIcon size="18" class="text-primary mr-4"/>
                                                    <span class="titleCrdPrc contentColorPrce">15 Table</span>
                                                </v-list-item-title>
                                            </v-list-item>
                                            <v-list-item class="px-0">
                                                <v-list-item-title
                                                    class="text-body-1 d-flex listCardMainInnr font-weight-medium text-medium-emphasis"
                                                >
                                                <CheckIcon size="18" class="text-primary mr-4"/>
                                                    <span class="titleCrdPrc contentColorPrce">20 Food Items</span>
                                                </v-list-item-title>
                                            </v-list-item>
                                        </div>
                                    </div>
                                    <div class="colLowerCntPrc">
                                        <template v-if="adminUser === false">
                                                <v-btn  v-if="card.active == 'yes'" disabled="" color="primary" size="large" class="mt-6 buttonColorPrce" flat block>Active</v-btn>
                                                <v-btn  v-else  color="primary" size="large" class="mt-6 buttonColorPrce" flat block  @click="submitFeedback(card.id)">{{ card.name }}</v-btn>
                                        </template>
                                        <template v-else>
                                            <v-btn  v-if="card.active == 'yes'" disabled="" color="primary" size="large" class="mt-6 buttonColorPrce" flat block>{{ card.name }}</v-btn>
                                            <v-btn  v-else color="primary" size="large" class="mt-6 buttonColorPrce buttonBottmStyle" flat block>{{ card.name }}</v-btn>
                                        </template>
                                    </div>
                                
                            </v-card>
                        </div>
                    </Slide>
                </Carousel>
            </v-col>
        </v-row>   
    </div>

</template>
<style scoped>
.carousel__slide {
  padding: 5px 0px 5px 20px;
}

.carousel__viewport {
  perspective: 2000px;
    padding: 40px 0;
}
.carousel__track {
  transform-style: preserve-3d;
}
.carousel__slide--sliding {
  transition: 0.5s;
}
.carousel__slide {
  opacity: 0.9;
  transform:  scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform:  scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform:  scale(1.02);
}
.carousel__item {
    width: 100%;
}
.pricingCardCol{
    min-height: 460px;
    width:100%;
}
</style>