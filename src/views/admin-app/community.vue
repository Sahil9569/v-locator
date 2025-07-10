<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import vImageIcon from '@/assets/images/locator/v-icon.jpg';

import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL;

import user1 from '@/assets/images/profile/user-1.jpg';

const valid = ref(true);
const dialog = ref(false);
const new_loader = ref(false);

const search = ref('');
const rolesbg = ref(['Kitchen', 'Bar']);
const itemsPerPage = 10;
const currentPage = ref(1);

const desserts = ref([]);
const editedIndex = ref(-1);
const editedItem = ref({
    id: '',
    avatar: '1.jpg',
    userinfo: '',
    title: '',
    description: '',
    date: '',
    topicsModel: '',
    categoryModel: ''
});
const defaultItem = ref({
    id: '',
    avatar: '1.jpg',
    userinfo: '',
    title: '',
    description: '',
    date: '',
    topicsModel: '',
    categoryModel: ''
});

//Methods
const filteredList = computed(() => {
    return desserts.value.filter((user: any) => {
        const content = user.title ? user.title.toLowerCase() : undefined;
        return content && content.includes(search.value.toLowerCase());
    });
});

const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredList.value.slice(start, end);
});
function editItem(item: any) {
    editedIndex.value = desserts.value.indexOf(item);
    editedItem.value = Object.assign({}, item);
    dialog.value = true;
}
const currentDelete = ref(null);
function deleteItem(item: any) {
    currentDelete.value = item.id;
    const index = desserts.value.indexOf(item);
    delete_post(item.id);
    // if (index !== -1) {
    //     reasonModal.value[index] = true;
    // }
}
const reasonModal = ref(false);
const validReason = ref();
const reasionType = ref('');

function close() {
    dialog.value = false;
    setTimeout(() => {
        editedItem.value = Object.assign({}, defaultItem.value);
        editedIndex.value = -1;
    }, 300);
}
function save() {
    if (editedIndex.value > -1) {
        Object.assign(desserts.value[editedIndex.value], editedItem.value);
    } else {
        desserts.value.push(editedItem.value);
    }
    close();
}

//Computed Property
const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'New Community' : 'Edit Community';
});

const currentImage = ref<string[]>([vImageIcon]); // Default image URL

const handleImageUpload = (event: any, index: any) => {
    const input = event.target;
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                switch (index) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        currentImage.value[index] = reader.result; // Update currentImage with uploaded image
                        break;
                    default:
                        break;
                }
            }
        };
        reader.readAsDataURL(input.files[0]);
    }
};

onMounted(() => {
    get_post();
});

const get_post = async () => {
    new_loader.value = true;
    try {
        const token_user = localStorage.getItem('authToken');
        const formdata = {
            token: token_user
        };
        const response = await axios.post('api/v_super/get_post/', formdata);
        console.log('check the response------------', response.data);
        if (response.data.status === 'get_post') {
            new_loader.value = false;
            desserts.value = response.data.get_post;
        } else {
            console.log('Invalid data');
        }
    } catch (error) {
        new_loader.value = false;
        console.error(error);
    }
};

const delete_post = async (post_id: any) => {
    console.log('check the valuye', post_id);
    try {
        const token_user = localStorage.getItem('authToken');
        const formdata = {
            token: token_user,
            post_id: post_id
        };
        const response = await axios.post('api/v_super/delete_post/', formdata);
        console.log('check the response', response.data);
        if (response.data.status === 'delete_post') {
            console.log('check the response', response.data.get_post);
            get_post();
        } else {
            console.log('Invalid data');
        }
    } catch (error) {
        console.error(error);
    }
};
</script>
<template>
    <v-row>
        <v-col cols="12" lg="4" md="6">
            <v-text-field density="compact" v-model="search" label="Search Community" hide-details variant="outlined"></v-text-field>
        </v-col>
        <!-- <v-col cols="12" lg="8" md="6" class="text-right">
            <v-dialog v-model="dialog" max-width="760">
               
                <v-card>
                    <v-card-title class="pa-4 bg-primary">
                        <span class="title text-white">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-text-field variant="outlined" hide-details v-model="editedItem.id" label="S No"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.userinfo"
                                        label="Kitchen Name"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.title"
                                        label="User Name"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-label>Topics</v-label>
                                    <v-combobox v-model="editedItem.topicsModel" class="chipTheme" hide-details multiple chips></v-combobox>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="rolesbg"
                                        v-model="editedItem.date"
                                        label="Category"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <div class="">
                                        <label for="logoImageLbl0" class="imageUploadRestu">
                                            <span class="text-primary text-subtitle-1">Upload Your Food Photo</span>
                                            <input
                                                type="file"
                                                id="logoImageLbl0"
                                                class="d-none"
                                                @change="handleImageUpload($event, 0)"
                                                accept="image/*"
                                            />
                                        </label>
                                        <div class="restuImageShowList" v-if="currentImage.length > 0">
                                            <img :src="currentImage[0]" alt="Uploaded Image" />
                                        </div>
                                    </div>
                                </v-col>
                               
                            </v-row>
                        </v-form>
                    </v-card-text>

                    <v-card-actions class="pa-4">
                        <v-spacer></v-spacer>
                        <v-btn color="error" @click="close">Cancel</v-btn>
                        <v-btn color="primary" :disabled="editedItem.userinfo == ''" variant="flat" @click="save">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col> -->
    </v-row>
    <v-dialog v-model="reasonModal" max-width="760">
        <v-card>
            <v-card-title class="pa-4 bg-primary">
                <span class="title text-white">Reason for remove post</span>
            </v-card-title>

            <v-card-text>
                <v-form ref="form" v-model="validReason" lazy-validation>
                    <v-row>
                        <v-col cols="12">
                            <v-label>Reason {{ currentDelete }}</v-label>
                            <v-textarea outlined name="Note" rows="5" v-model="reasionType"></v-textarea>
                            <!-- <v-text-field variant="outlined" hide-details v-model="editedItem.id" label="S No"></v-text-field> -->
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>

            <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn color="error" @click="reasonModal = false">Cancel</v-btn>
                <v-btn color="primary" :disabled="reasionType == ''" variant="flat" @click="deleteItem()">Submit</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <div class="position-relative">
        <div class="logoLoader tableLoader bg-Whitecustom" v-if="new_loader == true">
            <div class="LogoVInnerImg">
                <img src="@/assets/images/locator/v-icon.png" alt="logo-loader" />
                <p class="">Please Wait...</p>
            </div>
        </div>
        <v-table :items="paginatedItems" :headers="headers" class="mt-5">
            <thead>
                <tr>
                    <th class="text-subtitle-1 font-weight-semibold">ID</th>
                    <th class="text-subtitle-1 font-weight-semibold">Post Info</th>
                    <th class="text-subtitle-1 font-weight-semibold">Title</th>
                    <!-- <th class="text-subtitle-1 font-weight-semibold">Description</th> -->
                    <th class="text-subtitle-1 font-weight-semibold">Category</th>
                    <!-- <th class="text-subtitle-1 font-weight-semibold">Topics</th> -->
                    <th class="text-subtitle-1 font-weight-semibold">Actions</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="filteredList.length > 0">
                    <tr v-for="(item, index) in paginatedItems" :key="item.id">
                        <td class="text-subtitle-1">#{{ index + 1 }}</td>
                        <td>
                            <div class="d-flex align-center py-4">
                                <div v-if="item.post_img == ''">
                                    <v-img :src="vImageIcon" width="45px" class="img-fluid" style="border-radius: 8px"></v-img>
                                </div>
                                <div v-else>
                                    <v-img :src="BASE_URL + item.post_img[0].images" width="45px" class="img-fluid" style="border-radius: 8px"></v-img>
                                </div>

                                <div class="ms-1" style="min-width: 150px; max-width: 250px">
                                    <!-- <router-link :to="`/single-community/${item.id}`" class="text-primary"
                                        ><h4 class="text-h6 font-weight-semibold">{{ item.content }}</h4></router-link
                                    > -->
                                    <router-link :to="`/single-community/${item.id}`" class="text-primary">
                                        <h4 class="text-h6 font-weight-semibold">{{ item.content.slice(0, 18) }}{{ item.content.length > 30 ? '...' : '' }}</h4>
                                    </router-link>
                                    <span class="text-subtitle-1 d-block mt-1 textSecondary">
                                        {{ new Date(item.created_at).toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }) }}
                                        </span>


                                    <!-- <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.created_at }}</span> -->
                                </div>
                            </div>
                        </td>
                        <td>
                            <h4 class="text-subtitle-1 font-weight-semibold">{{ item.title }}</h4>
                        </td>
                        <!-- <td>
                    <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.description }}</span>
                </td> -->
                        <!-- <td class="text-subtitle-1">{{ item.phone }}</td> -->

                        <td>
                            <div class="d-flex flex-wrap gap-2" >
                                <v-chip color="primary" size="small">
                                    {{ item.post_category && item.post_category.name ? item.post_category.name : 'N/A' }}
                                </v-chip>
                            </div>
                        </td>
                        <!-- <td>
                            <div class="d-flex flex-wrap gap-2">
                                <v-chip color="primary" size="small" v-for="topics in item.post_topics" :key="topics">
                                    {{ topics.name }}
                                </v-chip>
                            </div>
                        </td> -->
                        <td>
                            <div class="d-flex align-center">
                                <!-- <v-tooltip text="Edit">
                            <template v-slot:activator="{ props }">
                                <v-btn icon flat @click="editItem(item)" v-bind="props"
                                    ><PencilIcon stroke-width="1.5" size="20" class="text-primary"
                                /></v-btn>
                            </template>
                        </v-tooltip> -->
                                <v-tooltip text="Delete">
                                    <template v-slot:activator="{ props }">
                                        <v-btn icon flat @click="deleteItem(item)" v-bind="props"
                                            ><TrashIcon stroke-width="1.5" size="20" class="text-error"
                                        /></v-btn>
                                    </template>
                                </v-tooltip>
                            </div>
                        </td>
                    </tr>
                </template>
                <template v-else>
                    <td colspan="6">
                        <p class="text-center mt-6 mb-3">No Data Yet</p>
                    </td>
                </template>
            </tbody>
        </v-table>
    </div>
    <v-pagination
        color="primary"
        v-model="currentPage"
        :length="Math.ceil(filteredList.length / itemsPerPage)"
        rounded="circle"
    ></v-pagination>
</template>
<style>
.restuImageShowList img[src^='/src'] {
    display: none;
}
.restuImageShowList img {
    display: flex;
}

.bg-Whitecustom {
    background: #fff !important;
}
.bg-Whitecustom img {
    width: 300px;
}
</style>