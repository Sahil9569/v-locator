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
const categoryModal = ref(false);
interface ImageFile {
    url: string;
    file: File;
}
const new_loader = ref(true);
const editedIndexCat = ref(-1);
const editedItemCat = ref({
    catName: '',
    catFiles: null
});

onMounted(() => {
    get_category();
});

const defaultItemCat = ref({
    catName: '',
    catFiles: null
});

const search = ref('');
const validCat = ref('');
const formTitleCat = computed(() => {
    return editedIndexCat.value === -1 ? 'Add Category' : 'Edit Category';
});

const filteredListCat = computed(() => {
    return dessertsCat.value.filter((user: any) => {
        return user.catName.toLowerCase().includes(search.value.toLowerCase());
    });
});

const paginatedItemsCat = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredListCat.value.slice(start, end);
});

function editItemCat(item: any) {
    editedIndexCat.value = dessertsCat.value.indexOf(item);
    editedItemCat.value = Object.assign({}, item);
    categoryModal.value = true;
}
function deleteItemCat(item: any) {
    delete_category(item.id);
    const index = dessertsCat.value.indexOf(item);
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
        Object.assign(dessertsCat.value[editedIndexCat.value], editedItemCat.value);
        edit_category(editedItemCat.value);
    } else {
        add_category();
        dessertsCat.value.push(editedItemCat.value);
    }

    closeCat();
    if (currentImage.value.length > 3) {
        currentImage.value[3] = '';
    }
}
const myerrors = ref('');
const showSuccessMessage            = ref(false);
const showErrorMessage              = ref(false);
// const currentImage = ref<string[]>([vImageIcon]); // Default image URL

// const handleImageUpload = (event: any, index: any) => {
//     const input = event.target;
//     if (input.files && input.files[0]) {
//         const reader = new FileReader();
//         reader.onload = () => {
//             if (typeof reader.result === 'string') {
//                 switch (index) {
//                     case 0:
//                         currentImage.value[index] = reader.result; // Update currentImage with uploaded image
//                         break;
//                     default:
//                         break;
//                 }
//             }
//         };
//         reader.readAsDataURL(input.files[0]);
//     }
// };
const uploadError = ref(null);
const imagename = ref('');
const currentImage = ref<string[]>([]);
const handleImageUpload = (event: any, index: any) => {
    const input = event.target;
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const fileSizeMB = file.size / 1024 / 1024; // Size in MB

        if (fileSizeMB > 5) {
            uploadError.value = 'File size is too large. Maximum size is 5 MB.';
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const width = img.width;
                const height = img.height;
                if (width !== 150 || height !== 150) {
                    uploadError.value = 'Image dimensions must be 150x150 pixels.';
                } else {
                    uploadError.value = null;
                    currentImage.value = file;
                    imagename.value = file.name
                    console.log(`File accepted: ${file.name}, ${fileSizeMB.toFixed(2)} MB, ${width}x${height}`);
                    // Add your upload logic here
                }
            };
            if (e.target && e.target.result) {
                img.src = e.target.result;
            }
        };
    }
};

const add_category = async () => {
    try {
        const token_user = localStorage.getItem('authToken');
        const formData = new FormData();
        formData.append('token', token_user);
        formData.append('cat_name', editedItemCat.value.catName);

        if (currentImage) {
            formData.append('image', currentImage.value);
        }
        const response = await axios.post('api/v_super/add_category/', formData);
        if (response.data.status === 'add_category') {
            console.log('New kaam aaya h --- :', response.data.add_cat);
            showSuccessMessage.value = true
            myerrors.value = `New Category ${response.data.add_cat} has been Created Successfully.`;
            setTimeout(() => {  showSuccessMessage.value = false  }, 3000);
            get_category();
        }
    } catch (error) {
        console.error('Invalid response');
    }
};

const edit_category = async (cat_id: any) => {
    try {
        const token_user = localStorage.getItem('authToken');
        const formData = new FormData();
        formData.append('token', token_user);
        formData.append('cat_name', editedItemCat.value.catName);
        formData.append('cat_id', cat_id.id);

        if (currentImage) {
            formData.append('image', currentImage.value);
        }
        const response = await axios.post('api/v_super/edit_category/', formData);
        if (response.data.status === 'edit_category') {
            get_category();
        }
    } catch (error) {
        console.error('Invalid response');
    }
};

const get_category = async () => {
    new_loader.value = true;
    try {
        const token_user = localStorage.getItem('authToken');
        const res_id = window.location.href.split('/').pop();
        const formdata = {
            token: token_user,
            res_id: res_id
        };
        const response = await axios.post('api/v_super/get_category/', formdata);
        const get_category = response.data.get_category;
        if (get_category) {
            new_loader.value = false;

            const updatedData = get_category.map((item: any, index: any) => {
                return {
                    id: item.id,
                    Sr_no: `#${index + 1}`,
                    catFiles: item.cate_images,
                    catName: item.name
                };
            });
            dessertsCat.value = updatedData;
        }
    } catch (error) {
        new_loader.value = false;

        console.error('API error:', error);
    }
};

const delete_category = async (event_id: any) => {
    console.log('cjhcke krlo delete krna h kya kuch', event_id);
    try {
        const token_user = localStorage.getItem('authToken');
        const formdata = {
            token: token_user,
            event_id: event_id
        };
        console.log('this is ehy we have here', formdata);
        const response = await axios.post('api/v_super/delete_category/', formdata);
        if (response.data.status === 'delete_category') {
            console.log('New kaam aaya h --- :', response.data.add_cat);
            showErrorMessage.value = true
            myerrors.value = `Category ${response.data.del_cat} Deleted Successfully.`;
            setTimeout(() => {  showErrorMessage.value = false  }, 3000);
            get_category();
        } else {
            console.log('Invalid response');
        }
    } catch (error) {
        console.error('API error:', error);
    }
};
</script>
<template>
    <div class="alertWrap" v-show="showSuccessMessage || showErrorMessage" style="top: 30px">
        <v-alert type="success" v-show="showSuccessMessage" density="" class="mb-4" >
            <div >{{ myerrors }}</div>
            <template v-slot:prepend>
                <v-icon class="text-24">mdi-checkbox-marked-circle-outline</v-icon>
            </template>
        </v-alert>
        <v-alert type="error" v-show="showErrorMessage"
         density="" class="mb-4">
            <div>{{ myerrors }}</div>
            <template v-slot:prepend>
                <v-icon class="text-24">mdi-alert-circle-outline</v-icon>
            </template>
        </v-alert>
    </div>
    <v-row>
        <v-col cols="12" lg="5" md="4">
            <v-text-field density="compact" v-model="search" label="Search Category" hide-details variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="12" lg="7" md="8" class="text-right">
            <v-dialog v-model="categoryModal" max-width="700">
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props" flat class="ml-auto"> <v-icon class="mr-2">mdi-plus</v-icon>Add Category </v-btn>
                </template>
                <v-card>
                    <v-card-title class="pa-4 bg-primary">
                        <span class="title text-white">{{ formTitleCat }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-form ref="form" v-model="validCat" lazy-validation @submit.prevent="submit_add_cat">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItemCat.catName"
                                        label="Category Name"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <div class="">
                                        <label for="logoImageLbl0" class="imageUploadRestu">
                                            <span class="text-primary text-subtitle-1">Upload Your Category Photo</span>
                                            <input
                                                type="file"
                                                id="logoImageLbl0"
                                                class="d-none"
                                                @change="handleImageUpload($event, 0)"
                                                accept="image/*"
                                            />
                                        </label>
                                        <p v-if="uploadError" class="error">{{ uploadError }}</p>
                                        <p v-if="imagename">{{ imagename }}</p>
                                        <!-- <div class="restuImageShowList" v-if="currentImage[0] !== ''">
                                            <img :src="currentImage[0]" alt="Uploaded Image" />
                                        </div> -->
                                     
                                    </div>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>

                    <v-card-actions class="pa-4">
                        <v-spacer></v-spacer>
                        <v-btn color="error" @click="closeCat">Cancel</v-btn>
                        <v-btn color="primary" :disabled="editedItemCat.catName == ''" variant="flat" @click="saveCat">Save</v-btn>
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

        <!-- Use paginatedItemsCat in the table component -->
        <v-table :items="paginatedItemsCat" class="mt-5">
            <thead>
                <tr>
                    <th class="text-subtitle-1 font-weight-semibold">Image</th>
                    <th class="text-subtitle-1 font-weight-semibold">Name</th>
                    <th class="text-subtitle-1 font-weight-semibold">Actions</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="paginatedItemsCat.length > 0">
                    <tr v-for="item in paginatedItemsCat" :key="item.id">
                        <td class="text-subtitle-1 py-2">
                            <template v-if="item.catFiles">
                                <img :src="`${BASE_URL}${item.catFiles}`" class="imageCustomTable img-fluid" />
                            </template>
                            <template v-else>
                                <img :src="vImageIcon" class="imageCustomTable img-fluid" />
                            </template>
                        </td>
                        <td class="text-subtitle-1">{{ item.catName }}</td>
                        <td>
                            <div class="d-flex align-center">
                                <v-tooltip text="Edit">
                                    <template v-slot:activator="{ props }">
                                        <v-btn icon flat @click="editItemCat(item)" v-bind="props">
                                            <PencilIcon stroke-width="1.5" size="20" class="text-primary"/>
                                        </v-btn>
                                    </template>
                                </v-tooltip>
                                <v-tooltip text="Delete">
                                    <template v-slot:activator="{ props }">
                                        <v-btn icon flat @click="deleteItemCat(item)" v-bind="props">
                                            <TrashIcon stroke-width="1.5" size="20" class="text-error"/>
                                        </v-btn>
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

        <!-- Pagination Component -->
        <v-pagination
            color="primary"
            v-model="currentPage"
            :length="Math.ceil(filteredListCat.length / itemsPerPage)"
            rounded="circle"
        ></v-pagination>
    </div>
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
.error {
  color: red;
}
</style>