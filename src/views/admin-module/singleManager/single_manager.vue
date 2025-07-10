<script setup lang="ts">
import { ref, shallowRef, computed, onMounted } from 'vue';
import { HeartIcon, PhotoIcon, PhoneIcon, UserCircleIcon, UsersIcon } from 'vue-tabler-icons';
import profileBg from '@/assets/images/backgrounds/profilebg.jpg';
import UserImage from '@/assets/images/profile/user-1.jpg';
import {pricing} from '@/_mockApis/components/pages/pricingData';
import { useContactStore } from '@/stores/apps/contact';
import singleManagerList from '@/_mockApis/apps/singleManagerList';
// import { VTable, VPagination } from '@/_mockApis/apps/contact';
const model = ref(true);
const isdefault = ref(true);

const store = useContactStore();
import axios from 'axios';
import { useRouter } from "vue-router";
const router = useRouter();
import BASE_URL from '@/stores/myVar';
import { date } from 'yup';
import EmailCompose from '@/components/apps/email/EmailCompose.vue';
axios.defaults.baseURL = BASE_URL
const priceVar = ref(pricing)
const res_name = ref('');
const dateVar = ref('');
const status = ref('');
const resType = ref('');
const email = ref('');
const id = ref('');
const address = ref('');
// const pricing = ref(pricing);
onMounted(() => {
    store.fetchContacts();
    resDetails();
});
const getContacts: any = computed(() => {
    return store.contacts;
});

// const search = ref('');
// const validForm = ref()
// const dialog2 = ref(false)
// const customerName = ref()
// const customerTip = ref()
const desserts = ref(singleManagerList);

//Methods
const filteredList = computed(() => {
    return desserts.value
});

const tab = ref(null);
const items = shallowRef([
    { tab: 'Profile', icon: UserCircleIcon, href: '/apps/user/profile' },
    { tab: 'Followers', icon: HeartIcon, href: '/apps/user/profile/followers' },
    { tab: 'Friends', icon: UsersIcon, href: '/apps/user/profile/friends' },
    { tab: 'Gallery', icon: PhotoIcon, href: '/apps/user/profile/gallery' }
]);


const model3 = ref(true);
// switch color data
const switchColor = ref(['primary']);
const resDetails = async () => {
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split('/');
    const valueFromUrl = urlParts[urlParts.length - 1];
    try {
        const response = await axios.post('api/vlocator_admin/res_details/', { id: valueFromUrl });
        console.log('Res Details API response:', response.data.user);
        res_name.value = response.data.name;
        dateVar.value = response.data.user.date_joined;
        status.value = response.data.status;
        if(response.data.status == 'true'){
            status.value = "Active";
        }
        if(response.data.status == 'false'){
            status.value = "Inactive";
        }
        resType.value = response.data.phone
        id.value = response.data.id 
        email.value = response.data.user.email
        address.value = response.data.user.add1+','+response.data.user.add2+','+response.data.city+','+response.data.state+','+response.data.country
    } catch (error) {
        console.error('API error:', error);
    }
};
</script>

<template>
    <v-card elevation="10" class="overflow-hidden">
        <img :src="profileBg" alt="profile" class="w-100" />
        <div>
            <v-row class="mt-1 align-end">
                <v-col cols="12" lg="4" sm="12" class="order-sm-second">
                    <div class="px-4 py-1">
                        <v-row class="justify-center">
                            <v-col cols="6" class="text-center mb-2">
                                <h4 class="text-h5 mb-2">{{id}}</h4>
                                <h6 class="text-subtitle-1 font-weight-regular">Restaurant ID</h6>
                            </v-col>
                            <v-col cols="6" class="text-center mb-2">
                                <h4 class="text-h5 mb-2">{{resType}}</h4>
                                <h6 class="text-subtitle-1 font-weight-regular">Phone</h6>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
                <v-col cols="12" lg="4" sm="12" class="d-flex justify-center order-sml-first mb-2">
                    <div class="text-center top-spacer">
                        <div class="avatar-border">
                            <v-avatar size="100" class="userImage">
                                <img :src="UserImage" width="100" alt="Mathew" />
                            </v-avatar>
                        </div>
                        <h5 class="text-h5 mt-3 mb-2">{{res_name}}</h5>
                        <!-- <v-chip color="success" size="small">Restaurant Manager</v-chip> -->
                    </div>
                </v-col>
                <v-col cols="12" lg="4" sm="12" class=" order-sm-third">
                    <div class="px-4 py-1">
                        <v-row class="justify-center align-end">
                            <v-col cols="6" class="text-center mb-2">
                                <h4 class="text-h5 mb-2">{{dateVar}}</h4>
                                <h6 class="text-subtitle-1 font-weight-regular">Joining Date</h6>
                            </v-col>
                            <v-col cols="6" class="text-center mb-2">
                                <h4 class="text-h5 mb-2">{{status}}</h4>
                                <h6 class="text-subtitle-1 font-weight-regular">Status</h6>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
            </v-row>
        </div>
    </v-card>
    
    <v-row class="mt-6">
        <v-col cols="12" lg="4">
            <v-row>
                <v-col cols="12">
                    <v-card variant="outlined">
                        <v-card-item>
                            <h4 class="text-h5 mb-8">Introduction</h4>
                            <!-- <div class="d-flex gap-3 mb-5">
                                <BriefcaseIcon size="21" />
                                <span class="text-subtitle-1">Sir, P P Institute Of Science</span>
                            </div> -->
                            <div class="d-flex gap-3 mb-5">
                                <MailIcon size="21" />
                                <span class="text-subtitle-1">{{email}}</span>
                            </div>
                            <!-- <div class="d-flex gap-3 mb-5">
                                <PhoneIcon size="21" />
                                <span class="text-subtitle-1">9856892563</span>
                            </div> -->
                            <div class="d-flex gap-3 mb-5">
                                <MapPinIcon size="21" />
                                <span class="text-subtitle-1">{{address}}</span>
                            </div>
                        </v-card-item>
                    </v-card>
                </v-col>
                <v-col cols="12" class="carousel__slide--active">
                    <template v-for="card in priceVar" :key="card.caption">
                        <v-card elevation="10" class="pricingCardCol cmmnCardPrice h-100 rounded-md pa-sm-8 pa-4" v-if="card.caption === 'Premium A'">
                            <div class="colUpperCntPrc" >
                                <div class="d-flex justify-space-between">
                                    <h4 class="text-body-2 text-medium-emphasis contentSizeLarge contentColorPrce text-uppercase mb-6" v-text="card.caption"></h4>
                                    <v-chip v-if="card.tagtext" size="small" class="mt-sm-n4 font-weight-bold" color="warning">POPULAR</v-chip>
                                </div>
                                <div class="mb-0 pl-0 pt-5 ">
                                    <v-list-item class="px-0" v-for="desc in card.list" :key="desc.listtitle">
                                        <v-list-item-title
                                            class="text-body-1 d-flex listCardMainInnr font-weight-medium text-medium-emphasis">
                                            <component :is="desc.icon" :class="'text-' + desc.iconcolor" stroke-width="2" size="18" class="mr-4" />
                                            <span class="titleCrdPrc contentColorPrce">{{ desc.listtitle }}</span>
                                        </v-list-item-title>
                                    </v-list-item>
                                </div>
                            </div>
                            <div class="colLowerCntPrc">
                                <v-btn disabled="" color="primary" size="large" class="mt-6 buttonColorPrce" flat block>Active</v-btn>
                            </div>
                        </v-card>
                    </template>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12" lg="8">
            <v-card variant="outlined">
                <v-card-item class="pa-0">
                    <v-table class="mt-5">
                        <thead>
                            <tr>
                                <th class="text-subtitle-1 font-weight-bold">Id </th>
                                <th class="text-subtitle-1 font-weight-bold">Packages Name</th>
                                <th class="text-subtitle-1 font-weight-bold">Amount </th>
                                <th class="text-subtitle-1 font-weight-bold">Date</th>
                                <th class="text-subtitle-1 font-weight-bold">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in filteredList" :key="item.id">
                                <td class="text-subtitle-1">{{ item.id }}</td>
                                <td>
                                    <v-chip 
                                        :color="(item.packages=='V Locator +'?'primary':(item.packages === 'Premium A'?'error':(item.packages === 'Premium B'? 'warning':(item.packages === 'Premium C'? 'success': 'secoundary'))))"
                                        size="small">{{ item.packages }}</v-chip>
                                </td>
                                <td>
                                    <span class="text-subtitle-1 d-block mt-1 textSecondary">${{ item.amount }}</span>
                                </td>
                                <td>
                                    <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.Date }}</span>
                                </td>
                                <td>
                                    <v-tooltip text="Delete">
                                    <template v-slot:activator="{ props }">
                                        <v-btn icon flat @click="deleteItem(item)" v-bind="props"
                                            ><TrashIcon stroke-width="1.5" size="20" class="text-error"
                                        /></v-btn>
                                    </template>
                                </v-tooltip>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
</template>
<style lang="scss">
.avatar-border {
    background-image: linear-gradient(rgb(64 181 15), rgb(165 254 126));
    border-radius: 50%;
    width: 110px;
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    .userImage {
        border: 4px solid rgb(255, 255, 255);
    }
}

.top-spacer {
    margin-top: -95px;
}

.profiletab .v-slide-group__content {
    justify-content: end;
    .v-btn--variant-text .v-btn__overlay {
        background: transparent;
    }
}

@media (max-width: 1023px) {
    .order-sm-second {
        order: 2;
    }
    .order-sml-first {
        order: 1;
    }
    .order-sm-third {
        order: 3;
    }
    .order-sm-last {
        order: 4;
    }
}

.btn-brand-facebook {
    background-color: rgb(24, 119, 242) !important;
}

.btn-brand-twitter {
    background-color: rgb(29, 161, 242) !important;
}
.btn-brand-dribbble {
    background-color: rgb(234, 76, 137) !important;
}
.btn-brand-youtube {
    background-color: rgb(205, 32, 31) !important;
}
</style>
