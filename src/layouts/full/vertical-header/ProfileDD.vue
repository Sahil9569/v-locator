<script setup lang="ts">
import {ref, onMounted} from 'vue';
import { MailIcon } from 'vue-tabler-icons';
import { profileDD } from '@/_mockApis/headerData';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
import { useRouter } from "vue-router";
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL

const logoUrl = ref('');
const firstName = ref('');
const lastName = ref('');
const authStore = useAuthStore();
const personName = ref('Admin')
const user = ref(localStorage.getItem('role'))
const tt =ref(localStorage.getItem('res_token'))
const resType = localStorage.getItem('res_type');

// const user = ref()
const user_name = user.value
onMounted(() => {
getLogo();
        // Initialize menuItems based on the initial value of user
        if (user.value === 'admin') {
            personName.value = 'Admin';
        } else if (user.value === 'kitchenManager') {
            personName.value = 'Kitchen Manager';
        }
        else if (user.value === 'res_manager') {
            personName.value = 'Restaurant Manager';
        } else {
            personName.value = 'Vegan Food';
        }

});

const getLogo = async () => {
    console.log("Order LIST API CALL")
    try {
        const token = localStorage.getItem('authToken');
        const formData = {
            token:token,
        };
        const response = await axios.post('api/get_userlogo/',formData);
        console.log(response.data)
        logoUrl.value = response.data.img;
        firstName.value = response.data.user.first_name;
        lastName.value = response.data.user.last_name;
    } catch (error) {
        console.error('API error:', error);
        
    }
}



</script>

<template>
    <!-- ---------------------------------------------- -->
    <!-- notifications DD -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false">
        <!-- <template v-slot:activator="{ props }" v-if="user_name === 'customer'">
            <v-btn class="custom-hover-primary" variant="text" v-bind="props" icon>
                <v-avatar size="35">
                    <img :src="logoUrl" width="35" alt="Julia" v-if="logoUrl"/>
                    <img src="@/assets/images/profile/user-1.jpg" width="35" alt="Julia" v-else/>
                </v-avatar>
            </v-btn>
        </template> -->
        <template v-slot:activator="{ props }">
            <template v-if="user_name === 'customer'">
               
            </template>
            <template v-else>
                <v-btn class="custom-hover-primary" variant="text" v-bind="props" icon>
                    <v-avatar size="35">
                        <img :src="logoUrl" width="35" alt="Julia" v-if="logoUrl"/>
                        <img src="@/assets/images/profile/user-1.jpg" width="35" alt="Julia" v-else/>
                    </v-avatar>
                </v-btn>
            </template>
        </template>
        <template v-if="user_name === 'customer'">
        </template>
        <template v-else>
            <v-sheet rounded="md" width="360" elevation="10">
                <div class="px-8 pt-6">
                    <h6 class="text-h5 font-weight-medium">User Profile</h6>
                    <template v-if="user ==='res_manager'">
                        <router-link :to="`/restaurant-setting/${tt}`" class="text-decoration-none d-flex align-center mt-4 pb-6">
                            <v-avatar size="80">
                                <img :src="logoUrl" width="80" v-if="logoUrl" />
                                <img src="@/assets/images/profile/user-1.jpg" width="80" v-else />

                                
                            </v-avatar>
                            <div class="ml-3">
                                <h6 class="text-h6 mb-n1 text-capitalize text-primary">{{firstName}} {{lastName}}</h6>
                                <template v-if="resType ==='Restaurant'">
                                    <span class="text-subtitle-1 font-weight-regular d-inline-block textSecondary mt-2">{{personName}}</span>
                                </template>
                                <template v-else>
                                    <span class="text-subtitle-1 font-weight-regular d-inline-block textSecondary mt-2">Vendor</span>
                                </template>
                            </div>
                        </router-link>
                    </template>
                    <template v-else-if="user==='kitchenManager'">
                        <router-link :to="`/kitchen_setting/${tt}`" class="text-decoration-none d-flex align-center mt-4 pb-6">
                            <v-avatar size="80">
                                <img :src="logoUrl" width="80" v-if="logoUrl" />
                                <img src="@/assets/images/profile/user-1.jpg" width="80" v-else />

                                
                            </v-avatar>
                            <div class="ml-3">
                                <h6 class="text-h6 mb-n1 text-capitalize text-primary">{{firstName}} {{lastName}}</h6>
                                <span class="text-subtitle-1 font-weight-regular d-inline-block textSecondary mt-2">{{personName}}</span>
                            </div>
                        </router-link>
                    </template>
                    
                    <template v-else>
                        <router-link :to="`/profile_setting/${tt}`" v-if="user_name === 'customer'" class="text-decoration-none">
                        </router-link>
                        <router-link :to="`/profile_setting/${tt}`" v-else class="text-decoration-none d-flex align-center mt-4 pb-6">
                            <v-avatar size="80">
                                <img :src="logoUrl" width="80" v-if="logoUrl" />
                                <img src="@/assets/images/profile/user-1.jpg" width="80" v-else />

                                
                            </v-avatar>
                            <div class="ml-3">
                                <h6 class="text-h6 mb-n1 text-capitalize text-primary">{{firstName}} {{lastName}}</h6>
                                
                                <span class="text-subtitle-1 font-weight-regular d-inline-block textSecondary mt-2">{{personName}}</span>
                            </div>
                        </router-link>
                    </template>
                    <v-divider></v-divider>
                </div>
                <div class="pt-4 pb-6 px-8 text-center">
                    <v-btn color="primary" variant="outlined" block @click="authStore.logout()">Logout</v-btn>
                </div>
            </v-sheet>
        </template>
    </v-menu>
</template>
