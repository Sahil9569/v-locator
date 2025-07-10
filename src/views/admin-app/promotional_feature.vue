<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import vImageIcon from '@/assets/images/locator/v-icon.jpg';

import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL;

const itemsPerPage = 10;
const currentPage = ref(1);
const dessertsCat = ref([]);
const new_loader = ref(true);

const categoryModal = ref(false);
interface ImageFile {
    url: string;
    file: File;
}

const editedIndexCat = ref(-1);
const editedItemCat = ref({
    adverTitle: '',
    adverImage: null,
    rolestatus: '',
    showstatus: '',
    descrption: '',
    website_url: '',
    startDate: '',
    endDate: ''
});

const defaultItemCat = ref({
    adverTitle: '',
    adverImage: null,
    rolestatus: '',
    showstatus: '',
    descrption: '',
    website_url: '',
    startDate: '',
    endDate: ''
});

const search = ref('');
const validCat = ref('');
const formTitleCat = computed(() => {
    return editedIndexCat.value === -1 ? 'Add Promotion' : 'Edit Promotion';
});

const filteredListCat = computed(() => {
    return dessertsCat.value.filter((user: any) => {
        return user.adverTitle.toLowerCase().includes(search.value.toLowerCase());
    });
});

const paginatedItemsCat = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredListCat.value.slice(start, end);
});

function editItemCat(item: any) {
    editedIndexCat.value = dessertsCat.value.indexOf(item);
    // console.log('check the edit data comes -----',item.id)
    editedItemCat.value = Object.assign({}, item);
    categoryModal.value = true;
}
function deleteItemCat(item: any) {
    const index = dessertsCat.value.indexOf(item);
    delete_promotion(item.id);
}

function closeCat() {
    categoryModal.value = false;
    setTimeout(() => {
        editedItemCat.value = Object.assign({}, defaultItemCat.value);
        editedIndexCat.value = -1;
    }, 300);
}

function saveCat(index: number) {
    if (editedIndexCat.value > -1) {
        edit_promotion(editedItemCat.value.id)
    } else {
        add_promotion();
    }
    closeCat();
    if (currentImage.value.length > 3) {
        currentImage.value[3] = '';
        console.log('check the image -------', currentImage.value[3]);
    }
}
const currentImage = ref<string[]>([vImageIcon]);

const uploadError = ref(null);
const imagename = ref('');
const handleImageUpload = (event: any, index: any) => {
    const input = event.target;
    if (input.files && input.files[0]) {
        // currentImage.value = input.files[0];
        const file = input.files[0];
        imagename.value = file.name;
        const fileSizeMB = file.size / 1024 / 1024; // Size in MB

        if (fileSizeMB > 1) {
            uploadError.value = 'File size is too large. Maximum size is 1 MB.';
        } else {
            uploadError.value = null;
            currentImage.value = file;
            console.log(`File accepted: ${file.name}, ${fileSizeMB.toFixed(2)} MB`);
        }
    }
};

onMounted(() => {
    get_promotion();
});

const add_promotion = async () => {
    try {
        const token_user = localStorage.getItem('authToken');
        const formdata = new FormData();
        formdata.append('token', token_user);
        formdata.append('title', editedItemCat.value.adverTitle);
        formdata.append('descrption', editedItemCat.value.descrption);
        formdata.append('website_url', editedItemCat.value.website_url);
        formdata.append('start_date', editedItemCat.value.startDate);
        formdata.append('end_date', editedItemCat.value.endDate);

        if (currentImage) {
            formdata.append('image', currentImage.value);
        }
        const response = await axios.post('api/v_super/add_promotion/', formdata);
        if (response.data.status === 'add_promotion') {
            get_promotion();
        }
    } catch (error) {
        console.error('API error:', error);
    }
};
const edit_promotion = async (event_id:any) => {
    try {
        const token_user = localStorage.getItem('authToken');
        const formdata = new FormData();
        formdata.append('token', token_user);
        formdata.append('event_id',event_id);
        formdata.append('title', editedItemCat.value.adverTitle);
        formdata.append('descrption', editedItemCat.value.descrption);
        formdata.append('website_url', editedItemCat.value.website_url);
        formdata.append('start_date', editedItemCat.value.startDate);
        formdata.append('end_date', editedItemCat.value.endDate);
        if (currentImage) {
            formdata.append('image', currentImage.value);
        }
        const response = await axios.post('api/v_super/edit_promotion/', formdata);
        if (response.data.status === 'edit_promotion') {
            get_promotion();
        }
    } catch (error) {
        console.error('API error:', error);
    }
};

const get_promotion = async () => {
    new_loader.value = true;
    try {
        const token_user = localStorage.getItem('authToken');
        const formdata = {
            token: token_user,
            'get_promotion':'get_promotion'
        };
        const response = await axios.post('api/v_super/get_promotion/', formdata);
        if (response.data.status === true) {
            const data = response.data.get_promotion;
            console.log('check here form data in get_promotion ---------------------', data);
            new_loader.value = false;

            const updatedData = data
            .map((item: any) => ({
                id: item.id,
                adverTitle: item.title,
                descrption: item.descrption,
                website_url: item.website_url,
                rolestatus: item.is_active,
                showstatus: item.discount_listing,
                adverImage: item.image,
                startDate: item.start_date,
                endDate: item.end_date,
            }))
            .sort((a, b) => b.id - a.id);// Sorting in ascending order

            dessertsCat.value = updatedData;
            console.log('sffffffffffff', dessertsCat.value);
        }
    } catch (error) {
        new_loader.value = false;
        console.error('API error:', error);
    }
};

const updateRoleStatus = async (advert_id: any) => {
    try {
        const token_user = localStorage.getItem('authToken');
        const formdata = {
            token: token_user,
            advert_id: advert_id.id,
            advert_rolestatus: advert_id.rolestatus,
            'Promotional_Event':'Promotional_Event',
        };
        const response = await axios.post('api/v_super/updateRoleStatus/', formdata);
        if (response.data.status === 'updateRoleStatus') {
            get_promotion();
        }
    } catch (error) {
        console.error('API error:', error);
    }
};

const delete_promotion = async (advert_id: any) => {
    try {
        const token_user = localStorage.getItem('authToken');
        const formdata = {
            token: token_user,
            advert_id: advert_id
        };
        const response = await axios.post('api/v_super/delete_promotion/', formdata);
        if (response.data.status === 'delete_promotion') {
            get_promotion();
        }
    } catch (error) {
        console.error('API error:', error);
    }
};

const updateShowStatus = async (promo: any) => {
    console.log('advert_id',promo.id)
    console.log('advert_id',promo.showstatus)
    try {
        const token_user = localStorage.getItem('authToken');
        const formdata = {
            token: token_user,
            advert_id: promo.id,
            advert_rolestatus: promo.showstatus,
            'Showstatus':'showstatus',
        };
        const response = await axios.post('api/v_super/updateShowStatus/', formdata);
        console.log('check the updateShowStatus data',response)
        if (response.data.status === 'updateShowStatus') {
            get_promotion();
        }
    } catch (error) {
        console.error('API error:', error);
    }
};
</script>
<template>
    <v-row>
        <v-col cols="12" lg="5" md="4">
            <v-text-field density="compact" v-model="search" label="Search Promotion" hide-details
                variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="12" lg="7" md="8" class="text-right">
            <v-dialog v-model="categoryModal" max-width="700" persistent>
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props" flat class="ml-auto">
                        <v-icon class="mr-2">mdi-plus</v-icon>Add Promotion
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title class="pa-4 bg-primary">
                        <span class="title text-white">{{ formTitleCat }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-form ref="form" v-model="validCat" lazy-validation @submit.prevent="submit_add_cat">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field variant="outlined" hide-details v-model="editedItemCat.adverTitle"
                                        label="Promotion Title"></v-text-field>
                                </v-col>

                                <v-col cols="6">
                                    <v-text-field
                                        variant="outlined"
                                        type="date"
                                        label="Start Date"
                                        hide-details
                                        class="dateFullWdth"
                                        v-model="editedItemCat.startDate"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        variant="outlined"
                                        type="date"
                                        label="End Date"
                                        hide-details
                                        class="dateFullWdth"
                                        v-model="editedItemCat.endDate"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea v-model="editedItemCat.descrption" label="Description"
                                        variant="outlined" hide-details auto-grow rows="3" class="custom-textarea" />
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="editedItemCat.website_url" label="Website URL"
                                        variant="outlined" type="url" placeholder="Enter website URL" hide-details
                                        class="custom-url-field" />
                                </v-col>

                                <v-col cols="12">
                                    <div class="">
                                        <label for="logoImageLbl0" class="imageUploadRestu">
                                            <span class="text-primary text-subtitle-1">Upload Your Promotion
                                                Image</span>
                                            <input type="file" id="logoImageLbl0" class="d-none"
                                                @change="handleImageUpload($event, 0)" accept="image/*" />
                                        </label>
                                        <p v-if="uploadError" class="error">{{ uploadError }}</p>
                                        <p v-if="imagename ">{{ imagename }}</p>

                                        <p v-if="editedItemCat.adverImage && imagename.length == 0">{{ editedItemCat.adverImage }}</p>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                
                    <v-card-actions class="pa-4">
                        <v-spacer></v-spacer>
                        <v-btn color="error" @click="closeCat">Cancel</v-btn>
                        <v-btn color="primary" :disabled="
                                editedItemCat.adverTitle == '' ||
                                editedItemCat.descrption == '' ||
                                editedItemCat.startDate == '' ||
                                editedItemCat.endDate == '' ||
                                currentImage[0] == ''
                            " variant="flat" @click="saveCat">Save </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
    <div class="position-relative">
        <div class="logoLoader tableLoader bg-Whitecustom" v-if="new_loader == true">
            <div class="LogoVInnerImg">
                <img src="@/assets/images/locator/v-icon.png" alt="logo-loader" />
                <p class="">Please Wait...</p>
            </div>
        </div>
        <v-table :items="paginatedItemsCat" :currentPage="currentPage" :pageSize="5" class="mt-5">
            <thead>
                <tr>
                    <th class="text-subtitle-1 font-weight-semibold">Image</th>
                    <th class="text-subtitle-1 font-weight-semibold">Title</th>
                    <th class="text-subtitle-1 font-weight-semibold">Start Date</th>
                    <th class="text-subtitle-1 font-weight-semibold">End Date</th>
                    <th class="text-subtitle-1 font-weight-semibold">Description</th>
                    <th class="text-subtitle-1 font-weight-semibold">Website Url</th>
                    <th class="text-subtitle-1 font-weight-semibold">Promotion Listings</th>
                    <th class="text-subtitle-1 font-weight-semibold">Active Promotions</th>
                    <th class="text-subtitle-1 font-weight-semibold">Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="item in filteredListCat" :key="item.id">
                    <td class="text-subtitle-1 py-2">
                        <div v-if="item.adverImage">
                            <img :src="`${BASE_URL}${item.adverImage}`" class="imageCustomTable img-fluid" />
                        </div>
                        <div v-else>
                            <img :src="vImageIcon" class="imageCustomTable img-fluid" />
                        </div>
                    </td>
                    <td class="text-subtitle-1">{{ item.adverTitle }}</td>
                    <td class="text-subtitle-1">{{ item.startDate }}</td>
                    <td class="text-subtitle-1">{{ item.endDate }}</td>
                    <td class="text-subtitle-1">{{ item.descrption.length > 50 ? item.descrption.slice(0, 50) + '...' : item.descrption }}</td>
                    <td class="text-subtitle-1" :title="item.website_url">
                        <a
                            :href="item.website_url"
                            class="text-blue-600 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                            :title="item.website_url"
                            style="white-space: pre-wrap;"
                        >
                            {{
                            item.website_url.length > 40
                                ? item.website_url.slice(0, 20) + '\n' + item.website_url.slice(20, 40) + '...'
                                : item.website_url
                            }}
                        </a>
                    </td>
                    <td>
                        <v-switch color="primary" :model-value="item.showstatus" @change="updateShowStatus(item)" hide-details></v-switch>
                    </td>
                    <td>
                        <v-switch color="primary" :model-value="item.rolestatus" @change="updateRoleStatus(item)"
                            hide-details></v-switch>
                    </td>
                    <td>
                        <div class="d-flex align-center">
                            <v-tooltip text="Edit">
                                <template v-slot:activator="{ props }">
                                    <v-btn icon flat @click="editItemCat(item)" v-bind="props">
                                        <PencilIcon stroke-width="1.5" size="20" class="text-primary" />
                                    </v-btn>
                                </template>
                            </v-tooltip>
                            <v-tooltip text="Delete">
                                <template v-slot:activator="{ props }">
                                    <v-btn icon flat @click="deleteItemCat(item)" v-bind="props">
                                        <TrashIcon stroke-width="1.5" size="20" class="text-error" />
                                    </v-btn>
                                </template>
                            </v-tooltip>
                        </div>
                    </td>
                </tr>
            </tbody>
        </v-table>
    </div>
    <v-pagination color="primary" v-model="currentPage" :length="Math.ceil(filteredListCat.length / itemsPerPage)"
        rounded="circle"></v-pagination>
</template>
<style>
.dateFullWdth input[type='date'] {
    display: block;
}
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
.error {
    color: red;
}
.text-subtitle-1 {
    white-space: pre-wrap;
}
</style>