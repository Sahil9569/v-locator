<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();
import BASE_URL from '@/stores/myVar';
// import { isValid } from 'date-fns';
// import { isValid } from 'date-fns';
axios.defaults.baseURL = BASE_URL;

function toTitleCase(str: any) {
    return str
        .toLowerCase()
        .split(' ')
        .filter((word: any) => word.length > 0)
        .map((word: any) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
}

const imageUpload = ref(false);
const productShowGallery = ref(false);
interface ImageFile {
    url: string;
    file: File;
}

// const uploadedImages = ref<ImageFile[]>([]);
const uploadedImages = ref<Array<{ url: string; file: File }>>([]);
const productImages = ref<ImageFile[]>([]);

// const uploadImage = (e: Event, type: string) => {
//     const selectedFiles = (e.target as HTMLInputElement).files;
//     if (selectedFiles) {
//         for (let i = 0; i < selectedFiles.length; i++) {
//             const reader = new FileReader();
//             reader.onload = () => {
//                 uploadedImages.value.push({ url: reader.result as string, file: selectedFiles[i] });
//             };
//             reader.readAsDataURL(selectedFiles[i]);
//         }
//         console.log('check the data ----------- ',uploadedImages.value)
//         upload_image(uploadedImages.value)
//     }
// };
// const uploadImage = (e: Event, type: string) => {
//     const selectedFiles = (e.target as HTMLInputElement).files;

//     if (selectedFiles) {
//         for (let i = 0; i < selectedFiles.length; i++) {
//             const reader = new FileReader();
//             reader.onload = () => {
//                 uploadedImages.value.push({
//                     url: reader.result as string,
//                     file: selectedFiles[i]
//                 });
//             };
//             reader.readAsDataURL(selectedFiles[i]);
//         }
//     }
// };

const uploadImage = (e: Event, type: String) => {
    const selectedFiles = (e.target as HTMLInputElement).files;

    if (selectedFiles) {
        for (let i = 0; i < selectedFiles.length; i++) {
            const reader = new FileReader();
            reader.onload = () => {
                uploadedImages.value.push({
                    url: reader.result as string,
                    file: selectedFiles[i]
                });
            };
            reader.readAsDataURL(selectedFiles[i]);
        }
    }
};
const handleDrop = (e) => {
    e.preventDefault();
    const dataTransfer = e.dataTransfer;
    const selectedFiles = dataTransfer.files;

    if (selectedFiles) {
        for (let i = 0; i < selectedFiles.length; i++) {
            const reader = new FileReader();
            reader.onload = () => {
                uploadedImages.value.push({
                    url: reader.result,
                    file: selectedFiles[i]
                });
            };
            reader.readAsDataURL(selectedFiles[i]);
        }
    }
};

// Optional: Add drag over class for visual feedback
const dropZone = document.getElementById('drop-zone');

if (dropZone) {
    dropZone.addEventListener('dragover', (event) => {
        event.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', handleDrop);
}
const removeImage = (index: number) => {
    uploadedImages.value.splice(index, 1);
};
const removeImageMain = (index: number) => {
    console.log('check images id is coming or not', index);
    delete_image(index);
    productImages.value.splice(index, 1);
};

const cancelUpload = () => {
    uploadedImages.value = [];
    imageUpload.value = false;
};
const photoAddedFuc = () => {
    productImages.value.push(...uploadedImages.value);
    upload_image(productImages.value);
    uploadedImages.value = [];
    imageUpload.value = false;
    productShowGallery.value = true;
};

const tabListing = ref(null);

// const rating = ref(4);
// const rating2 = ref(4);

const stepsmodal = ref(false);

const desserts = ref([]);
const editedIndex = ref(-1);
const editedItem = ref({
    title: '',
    description: ''
});
const defaultItem = ref({
    title: '',
    description: ''
});
const formModal = ref('');
//Methods
const filteredList = computed(() => {
    return desserts.value;
});

function editItem(item: any) {
    editedIndex.value = desserts.value.indexOf(item);
    editedItem.value = Object.assign({}, item);
    stepsmodal.value = true;
}
function deleteItem(item: any) {
    const index = desserts.value.indexOf(item);
    delete_instruction(item.id);
}

function close() {
    stepsmodal.value = false;
    setTimeout(() => {
        editedItem.value = Object.assign({}, defaultItem.value);
        editedIndex.value = -1;
    }, 300);
}
function save() {
    if (editedIndex.value > -1) {
        Object.assign(desserts.value[editedIndex.value], editedItem.value);
        edit_instructions(editedItem);
    } else {
        add_instruction(editedItem);
        desserts.value.push(editedItem.value);
    }
    close();
}

//Computed Property
const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'Add Step' : 'Edit Step';
});
const videoUrlModel = ref('');
const items = ref<string[]>([]);
const items2 = ref<string[]>([]);
const appendItem = (itemsArray: any) => {
    const newItem = itemsArray.length + 1;
    add_videos(videoUrlModel.value);
    itemsArray.push(videoUrlModel.value);
    videoUrlModel.value = '';
};

const deleteRow = (index: number, itemsArray: any) => {
    delete_ingredients(itemsArray);
    itemsArray.splice(index, 1);
};
const delete_Vdo = (index: number, itemsArray: any) => {
    delete_videos(itemsArray);
    itemsArray.splice(index, 0);
};

const ingredientsModel = ref('');
const addIngredients = (itemsArray: any) => {
    add_ingredients();
    const newItem = itemsArray.length + 1;
    itemsArray.push(newItem);
    ingredientsModel.value = '';
};

onMounted(() => {
    single_recipe_details();
    get_ingredients();
    get_instruction();
    get_videos();
    get_images();
});

const recipe_name = ref('');
const difficulty_level = ref('');
const insta_liink = ref('');
const cook_time = ref('');
const prep_time = ref('');
const categories = ref('');
const description = ref('');

const add_ingredients = async () => {
    try {
        const token_user = localStorage.getItem('authToken');
        const res_id = window.location.href.split('/').pop();
        const newItem = ingredientsModel.value;
        const formdata = {
            token: token_user,
            newItem: newItem,
            res_id: res_id
        };

        const response = await axios.post('api/v_super/add_ingredients/', formdata);
        const single_details = response.data;
        if (single_details) {
            get_ingredients();
        } else {
            console.log('First Error');
        }
    } catch (error) {
        console.error('API error:', error);
    }
};

const get_ingredients = async () => {
    try {
        const token_user = localStorage.getItem('authToken');
        const res_id = window.location.href.split('/').pop();
        const formdata = {
            token: token_user,
            res_id: res_id
        };
        const response = await axios.post('api/v_super/get_ingredients/', formdata);
        const ingredientList = response.data.get_ingre;
        const updatedData = ingredientList.map((item: any, index: any) => {
            return {
                id: item.id,
                name: item.name
            };
        });
        items.value = updatedData;
    } catch (error) {
        console.error('API error:', error);
    }
};

const delete_ingredients = async (id: any) => {
    try {
        const token_user = localStorage.getItem('authToken');
        const res_id = window.location.href.split('/').pop();
        const formdata = {
            token: token_user,
            res_id: res_id,
            ingr_id: id
        };
        const response = await axios.post('api/v_super/delete_ingredients/', formdata);
        if (response.data.status === 'delete_ingredients') {
            get_ingredients();
        } else {
            console.log('Invalid response');
        }
    } catch (error) {
        console.error('API error:', error);
    }
};

const get_instruction = async () => {
    try {
        const token_user = localStorage.getItem('authToken');
        const res_id = window.location.href.split('/').pop();
        const formdata = {
            token: token_user,
            res_id: res_id
        };
        const response = await axios.post('api/v_super/get_instruction/', formdata);
        const ingredientList = response.data.get_instruct;
        const updatedData = ingredientList.map((item: any, index: any) => {
            return {
                id: item.id,
                title: item.title,
                description: item.description
            };
        });
        desserts.value = updatedData;
    } catch (error) {
        console.error('API error:', error);
    }
};

const add_instruction = async (editedItem: any) => {
    try {
        const token_user = localStorage.getItem('authToken');
        const res_id = window.location.href.split('/').pop();
        const formdata = {
            token: token_user,
            res_id: res_id,
            title: editedItem.value.title,
            description: editedItem.value.description
        };
        const response = await axios.post('api/v_super/add_instruction/', formdata);
        const single_details = response.data;
        if (single_details.status === 'add_instruction') {
            get_instruction();
        } else {
            console.log('First Error');
        }
    } catch (error) {
        console.error('API error:', error);
    }
};


const delete_instruction = async (id: any) => {
    try {
        const token_user = localStorage.getItem('authToken');
        const res_id = window.location.href.split('/').pop();
        const formdata = {
            token: token_user,
            res_id: res_id,
            instruct_id: id
        };
        const response = await axios.post('api/v_super/delete_instruction/', formdata);
        if (response.data.status === 'delete_instruction') {
            get_instruction();
        } else {
            console.log('Invalid response');
        }
    } catch (error) {
        console.error('API error:', error);
    }
};

const edit_instructions = async (editedItem: any) => {
    try {
        const token_user = localStorage.getItem('authToken');
        const res_id = window.location.href.split('/').pop();
        const formdata = {
            token: token_user,
            instruct_id: editedItem.value.id,
            res_id: res_id,
            title: editedItem.value.title,
            description: editedItem.value.description
        };
        const response = await axios.post('api/v_super/edit_instructions/', formdata);
        if (response.data.status === 'edit_instruction') {
            get_instruction();
        } else {
            console.log('First Error');
        }
    } catch (error) {
        console.error('API error:', error);
    }
};

const add_videos = async (url: any) => {
    try {
        const token_user = localStorage.getItem('authToken');
        const res_id = window.location.href.split('/').pop();

        const formdata = {
            token: token_user,
            res_id: res_id,
            video_url: url
        };
        const response = await axios.post('api/v_super/add_videos/', formdata);
        const single_details = response.data;
        if (single_details.status === 'add_videos') {
            get_videos();
        } else {
            console.log('First Error');
        }
    } catch (error) {
        console.error('API error:', error);
    }
};

const get_videos = async () => {
    try {
        const token_user = localStorage.getItem('authToken');
        const res_id = window.location.href.split('/').pop();
        const formdata = {
            token: token_user,
            res_id: res_id
        };
        const response = await axios.post('api/v_super/get_videos/', formdata);
        const get_videos = response.data.video_url;

        const updatedData = get_videos.map((item: any, index: any) => {
            return {
                id: item.id,
                video_url: item.video_url
            };
        });
        items2.value = updatedData;
    } catch (error) {
        console.error('API error:', error);
    }
};

const delete_videos = async (video_id: any) => {
    console.log('cjhcke krlo delete krna h kya kuch', video_id);
    try {
        const token_user = localStorage.getItem('authToken');
        const res_id = window.location.href.split('/').pop();
        const formdata = {
            token: token_user,
            res_id: res_id,
            video_id: video_id
        };
        console.log('this is ehy we have here', formdata);
        const response = await axios.post('api/v_super/delete_videos/', formdata);
        if (response.data.status === 'delete_videos') {
            get_videos();
        } else {
            console.log('Invalid response');
        }
    } catch (error) {
        console.error('API error:', error);
    }
};

const upload_image = async (uploadedImages: any) => {
    const token_user = localStorage.getItem('authToken');
    const res_id = window.location.href.split('/').pop();
    const formData = new FormData();
    formData.append('token', token_user);
    formData.append('res_id', res_id);
    if (uploadedImages) {
        uploadedImages.forEach((image: any) => {
            formData.append('images', image.file);
        });
    }
    try {
        const response = await axios.post('api/v_super/upload_image/', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        if (response.data.status === 'upload_image') {
            get_images();
        }
    } catch (error) {
        console.error('Error uploading images:', error);
    }
};

const get_images = async () => {
    try {
        const token_user = localStorage.getItem('authToken');
        const res_id = window.location.href.split('/').pop();
        const formdata = {
            token: token_user,
            res_id: res_id
        };
        const response = await axios.post('api/v_super/get_images/', formdata);
        const get_images = response.data.get_images;
        console.log('here is an images', get_images);
        const updatedData = get_images.map((item: any, index: any) => {
            return {
                id: item.id,
                file: `${BASE_URL}${item.recipe_images}`
            };
        });
        productImages.value = updatedData;
        console.log('check the data here--', productImages.value);
    } catch (error) {
        console.error('API error:', error);
    }
};

const delete_image = async (image_id: any) => {
    console.log('cjhcke krlo delete krna h kya kuch', image_id);
    try {
        const token_user = localStorage.getItem('authToken');
        const res_id = window.location.href.split('/').pop();
        const formdata = {
            token: token_user,
            res_id: res_id,
            image_id: image_id
        };
        console.log('this is ehy we have here', formdata);
        const response = await axios.post('api/v_super/delete_image/', formdata);
        if (response.data.status === 'delete_image') {
            get_images();
        } else {
            console.log('Invalid response');
        }
    } catch (error) {
        console.error('API error:', error);
    }
};

const single_recipe_details = async () => {
    try {
        const token_user = localStorage.getItem('authToken');
        const res_id = window.location.href.split('/').pop();
        const formdata = {
            token: token_user,
            res_id: res_id
        };

        const response = await axios.post('api/v_super/single_recipe_details/', formdata);
        const single_details = response.data;
        console.log('data aaya ya nahi yaha -------------', single_details);
        if (single_details.status === 'single_recipe_details') {
            recipe_name.value = single_details.single_recipe_details.recipe_name;
            insta_liink.value = single_details.single_recipe_details.insta_link;
            difficulty_level.value = toTitleCase(single_details.single_recipe_details.difficulty_level);
            cook_time.value = single_details.single_recipe_details.cook_time;
            prep_time.value = single_details.single_recipe_details.prep_time;
            categories.value = single_details.single_recipe_details.category;
            description.value = single_details.single_recipe_details.description;
        } else {
            console.log('First Error');
        }
    } catch (error) {
        console.error('API error:', error);
    }
};

// const disabledModel = ref(true)
// const validateWebsite = () => {
//     const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;
//     disabledModel.value = !urlPattern.test(videoUrlModel.value) || videoUrlModel.value.trim() === '';
// };
// watch(videoUrlModel, validateWebsite);
</script>

<template>
    <!-- <ProfileBanner /> -->
    <v-row class="mt-4">
        <v-col cols="12" lg="4" md="4">
            <v-row>
                <v-col cols="12">
                    <v-card variant="outlined" class="bg-primary">
                        <v-card-item class="pa-0">
                            <!-- <div class="imageGroupMain businessGroup withoutRadius">
                                <label for="logoImageLbl0" class="labelStImgPro">
                                    <PencilIcon size="22" color="primary" class="text-primary"/>
                                    <input type="file" id="logoImageLbl0" class="d-none" @change="handleImageUpload($event, 0)" accept="image/*">
                                </label>
                                <div class="imageSizeMain restaurantImagePro">
                                    <img :src="currentImage[0]" alt="Uploaded Image">
                                </div>
                            </div> -->
                            <div class="pa-4">
                                <h4 class="text-h4 mb-3 d-flex">
                                    <ChefHatIcon size="22" class="me-2 mt-1" />
                                    <span>{{ recipe_name }}</span>
                                </h4>
                                <p class="m-0 text-subtitle-1 lh-md">
                                    {{ description }}
                                </p>
                                <div class="mt-3">
                                    <div class="border-bottom-white py-3">
                                        <h5 class="mb-2">Difficulty Level:</h5>
                                        <p class="text-h4">{{ difficulty_level }}</p>
                                    </div>
                                    <div class="border-bottom-white py-3">
                                        <h5 class="mb-2">Categories:</h5>
                                        <div class="d-flex flex-wrap">
                                            <v-chip
                                                v-for="(category, index) in categories"
                                                :key="index"
                                                color="white"
                                                size="small"
                                                class="ma-1"
                                            >
                                                {{ category.name }}
                                            </v-chip>
                                        </div>
                                    </div>
                                    <div class="border-bottom-white py-3" v-if="insta_liink">
                                        <h5 class="mb-2">Instagram Link:</h5>
                                        <!-- <p class="text-h4">{{ insta_liink }}</p> -->
                                        <p class="text-h4">
                                            <a :href="insta_liink" target="_blank" class="small-font" rel="noopener noreferrer">{{ insta_liink }}</a>
                                        </p>
                                    </div>
                                    <div class="py-3">
                                        <h5 class="mb-2">Timing:</h5>
                                        <v-row class="mt-2">
                                            <v-col cols="6">
                                                <div class="text-center" style="border-right: 1px solid #bfe5b0">
                                                    <ClockIcon size="24" />
                                                    <span class="d-block text-center text-subtitle-1 font-weight-semibold">Prep Time</span>
                                                    <h3>{{ prep_time }}</h3>
                                                </div>
                                            </v-col>
                                            <v-col cols="6">
                                                <div class="text-center">
                                                    <ClockIcon size="24" />
                                                    <span class="d-block text-center text-subtitle-1 font-weight-semibold">Cook Time</span>
                                                    <h3>{{ cook_time }}</h3>
                                                </div>
                                            </v-col>
                                        </v-row>
                                    </div>
                                </div>
                            </div>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12" lg="8" md="8">
            <v-tabs
                v-model="tabListing"
                bg-color="primary"
                next-icon="mdi-arrow-right-bold-box-outline"
                prev-icon="mdi-arrow-left-bold-box-outline"
                show-arrows
            >
                <v-tab value="1"> Ingredients </v-tab>
                <v-tab value="2"> Steps </v-tab>
                <v-tab value="3"> Videos </v-tab>
                <v-tab value="4"> Images </v-tab>
                <v-tab value="5"> Reviews </v-tab>
            </v-tabs>
            <v-card-text class="bg-grey100 mt-4 rounded-md">
                <v-window v-model="tabListing">
                    <v-window-item value="1">
                        <v-card class="" elevation="10">
                            <v-card-item>
                                <ul class="d-flex flex-wrap mb-3 listingIngrednt" v-if="items.length > 0">
                                    <li
                                        class="text-subtitle-1 py-2 border-bottom d-flex justify-content-between w-100"
                                        v-for="(item, index) in items"
                                        :key="index"
                                    >
                                        <v-row class="ma-0 pa-0">
                                            <v-col cols="col" class="pa-0">
                                                {{ item.name }}
                                            </v-col>
                                            <v-col cols="auto" class="pa-0 ps-2">
                                                <TrashIcon size="18" class="text-error ms-1" @click="deleteRow(index, item.id)" />
                                            </v-col>
                                        </v-row>
                                    </li>
                                    <!-- <div class="">
                                        <div class="d-flex align-center">
                                            <VTextField
                                                hide-details="auto"
                                                density="compact"
                                                class="my-1"
                                                required
                                                placeholder="Ingredients"
                                            ></VTextField>
                                            
                                        </div>
                                    </div> -->
                                </ul>
                                <div class="mainIngredntStyle">
                                    <div class="inputSizeCustomIn">
                                        <VTextField
                                            hide-details="auto"
                                            density="compact"
                                            class="mb-1"
                                            required
                                            v-model="ingredientsModel"
                                            placeholder="Ingredients"
                                        ></VTextField>
                                    </div>
                                    <div class="text-end buttonIngrdients">
                                        <v-btn color="primary" @click="addIngredients(items)"
                                            ><PlusIcon size="16" class="me-1" /> Add Ingredients</v-btn
                                        >
                                    </div>
                                </div>
                            </v-card-item>
                        </v-card>
                    </v-window-item>
                    <v-window-item value="2">
                        <v-card class="" elevation="10">
                            <v-card-item>
                                <v-dialog v-model="stepsmodal" max-width="500">
                                    <template v-slot:activator="{ props }">
                                        <div class="text-end">
                                            <v-btn color="primary" v-bind="props" flat class="ml-auto">
                                                <v-icon class="mr-2">mdi-plus</v-icon>Add Step
                                            </v-btn>
                                        </div>
                                    </template>
                                    <v-card>
                                        <v-card-title class="pa-4 bg-primary">
                                            <span class="title text-white">{{ formTitle }}</span>
                                        </v-card-title>

                                        <v-card-text>
                                            <v-form ref="form" v-model="formModal" lazy-validation @submit.prevent="submit_res_Form">
                                                <v-row>
                                                    <v-col cols="12">
                                                        <v-text-field
                                                            variant="outlined"
                                                            hide-details
                                                            v-model="editedItem.title"
                                                            label="Title"
                                                        ></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12">
                                                        <v-row>
                                                            <v-col cols="12">
                                                                <v-textarea
                                                                    variant="outlined"
                                                                    hide-details
                                                                    v-model="editedItem.description"
                                                                    label="Description"
                                                                    rows="5"
                                                                    class="resize-none"
                                                                ></v-textarea>
                                                            </v-col>
                                                        </v-row>
                                                    </v-col>
                                                </v-row>
                                            </v-form>
                                        </v-card-text>

                                        <v-card-actions class="pa-4">
                                            <v-spacer></v-spacer>
                                            <v-btn color="error" @click="stepsmodal = false">Cancel</v-btn>
                                            <v-btn
                                                color="primary"
                                                :disabled="editedItem.title == '' || editedItem.description == ''"
                                                variant="flat"
                                                @click="save"
                                                >Save</v-btn
                                            >
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                                <v-table class="mt-5">
                                    <thead>
                                        <tr>
                                            <th class="text-subtitle-1 font-weight-semibold">Title</th>
                                            <th class="text-subtitle-1 font-weight-semibold">Description</th>
                                            <th class="text-subtitle-1 font-weight-semibold">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item in filteredList" :key="item.id">
                                            <td class="text-subtitle-1 font-weight-semibold py-2" style="min-width: 110px">
                                                {{ item.title }}
                                            </td>
                                            <td class="text-subtitle-1 py-2">{{ item.description }}</td>

                                            <td>
                                                <div class="d-flex align-center">
                                                    <v-tooltip text="Edit">
                                                        <template v-slot:activator="{ props }">
                                                            <v-btn icon flat @click="editItem(item)" v-bind="props"
                                                                ><PencilIcon stroke-width="1.5" size="20" class="text-primary"
                                                            /></v-btn>
                                                        </template>
                                                    </v-tooltip>
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
                                    </tbody>
                                </v-table>
                            </v-card-item>
                        </v-card>
                    </v-window-item>
                    <v-window-item value="3">
                        <v-card class="" elevation="10">
                            <v-card-item>
                                <div class="mt-4">
                                    <ul class="d-flex flex-wrap mb-3 listingIngrednt" v-if="items2.length > 0">
                                        <li
                                            class="text-subtitle-1 py-2 border-bottom d-flex justify-content-between w-100"
                                            v-for="(item, index) in items2"
                                            :key="index"
                                        >
                                            <v-row class="ma-0 pa-0">
                                                <v-col cols="col" class="pa-0">
                                                    <a
                                                        :href="item.video_url"
                                                        class="text-primary"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {{ item.video_url }}
                                                    </a>
                                                    <!-- {{ item.video_url }} -->
                                                    <!-- <router-link class="text-primary" target="_blank" :to="item"> {{ item.video_url }}</router-link> -->
                                                </v-col>
                                                <v-col cols="auto" class="pa-0 ps-2">
                                                    <TrashIcon size="18" class="text-error ms-1" @click="delete_Vdo(index, item.id)" />
                                                </v-col>
                                            </v-row>
                                        </li>
                                    </ul>
                                </div>
                                <div class="mainIngredntStyle">
                                    <div class="inputSizeCustomIn">
                                        <VTextField
                                            hide-details="auto"
                                            density="compact"
                                            class="mb-1"
                                            required
                                            v-model="videoUrlModel"
                                            placeholder="Video URL"
                                        ></VTextField>
                                    </div>
                                    <div class="text-end buttonIngrdients">
                                        <v-btn color="primary" @click="appendItem(items2)"
                                            ><PlusIcon size="16" class="me-1" /> Add Video URL</v-btn
                                        >
                                    </div>
                                </div>
                            </v-card-item>
                        </v-card>
                    </v-window-item>
                    <v-window-item value="4">
                        <v-card elevation="10">
                            <v-card-item>
                                <template v-if="productImages">
                                    <div class="mainInnerGalryCrd">
                                        <div class="mainImageRow mt-4">
                                            <div class="image-holder w-33-custom" v-for="(image, index) in productImages" :key="index">
                                                <img :ref="'image' + index" alt="" :src="image.file" />
                                                <button type="button" class="btnTrash" @click="removeImageMain(image.id, 'image')">
                                                    <TrashIcon size="18" color="white" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template v-else>
                                    <p class="text-center">No Images Uploaded Yet</p>
                                </template>
                                <v-row>
                                    <v-col cols="col"> </v-col>
                                    <v-col cols="auto">
                                        <v-btn color="primary" @click="imageUpload = true">+ Add Photos</v-btn>
                                        <v-dialog v-model="imageUpload" max-width="900">
                                            <v-card>
                                                <!-- <v-card-title class="pa-4 bg-primary">
                                                    <span class="title text-white">{{albumTitle}}</span>
                                                </v-card-title> -->

                                                <v-card-text>
                                                    <h3 class="text-h5 mt-5 mb-3">Upload Your Recipe images</h3>
                                                    <div class="">
                                                        <label
                                                            for="file-upload"
                                                            class="labelStyleImage"
                                                            id="drop-zone"
                                                            @dragover.prevent
                                                            @dragenter.prevent
                                                            @drop="handleDrop($event)"
                                                        >
                                                            <input
                                                                id="file-upload"
                                                                type="file"
                                                                multiple
                                                                @change="uploadImage($event, 'image')"
                                                                accept="image/*"
                                                            />
                                                            <div class="innrContentTitle">
                                                                <span class="iconTitleUpld d-block text-center"
                                                                    ><PlusIcon size="24"
                                                                /></span>
                                                                Add new recipe images or drag them here
                                                            </div>
                                                        </label>
                                                        <div class="mainImageRow mt-4">
                                                            <div class="image-holder" v-for="(image, index) in uploadedImages" :key="index">
                                                                <img :ref="'image' + index" alt="" :src="image.url" />
                                                                <button type="button" class="btnTrash" @click="removeImage(index, 'image')">
                                                                    <TrashIcon size="18" color="white" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- <div
                                                        
                                                        class="dropZoneStyle"
                                                    >
                                                        <div class="innrContentTitle">
                                                            <span class="iconTitleUpld d-block text-center"><PlusIcon size="24" /></span>
                                                            Drop images here
                                                        </div>
                                                    </div> -->
                                                </v-card-text>
                                                <v-card-actions class="pa-4">
                                                    <v-spacer></v-spacer>
                                                    <v-btn @click="cancelUpload()" color="error">Cancel</v-btn>
                                                    <v-btn color="primary" variant="flat" @click="photoAddedFuc()">Save Album</v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>
                                    </v-col>
                                </v-row>
                            </v-card-item>
                        </v-card>
                    </v-window-item>
                    <v-window-item value="5">
                        <v-card class="" elevation="10">
                            <v-card-item class="">
                                <v-row class="mb-4">
                                    <v-col cols="12" md="4" class="border-end-custom py-8">
                                        <div class="v-card-title text-h6">Total Reviews</div>
                                        <div class="v-card-title text-h2 font-weight-semibold">10.0k</div>
                                        <!-- <p class="text-Darklight mb-0 text-subtitle-2">Growth in reviews on this year</p> -->
                                    </v-col>
                                    <v-col cols="12" md="8" class="ps-14 py-8">
                                        <div class="v-card-title text-h6">Average Ratings</div>
                                        <div class="v-card-title text-h2 font-weight-semibold d-flex align-center gap-2">
                                            4.0
                                            <!-- <v-rating v-model="rating2" density="compact" color="warning"></v-rating> -->
                                            <div class="d-flex">
                                                <i class="mdi mdi-star text-warning text-h3"></i>
                                                <i class="mdi mdi-star text-warning text-h3"></i>
                                                <i class="mdi mdi-star text-warning text-h3"></i>
                                                <i class="mdi mdi-star text-warning text-h3"></i>
                                                <i class="mdi mdi-star-outline text-warning text-h3"></i>
                                            </div>
                                        </div>
                                        <!-- <p class="text-Darklight mb-0 text-subtitle-2">Average rating on this year</p> -->
                                    </v-col>
                                </v-row>
                                <div class="px-3">
                                    <v-row class="mb-3 bg-grey100 px-5 border rounded">
                                        <v-col cols="12" class="">
                                            <div class="d-flex align-center border-bottom-white pb-2 mb-2">
                                                <!-- <v-avatar rounded="md" size="50">
                                                    <img contain :src="restuProfile" height="50"/>
                                                </v-avatar> -->
                                                <div class="pl-2">
                                                    <h5 class="text-h6 mb-1">Andrew</h5>
                                                    <h6 class="text-Darklight mb-0 text-subtitle-2">andrewsmith@gmail.com</h6>
                                                </div>
                                            </div>
                                            <p class="d-flex align-center text-Darklight mb-0 text-subtitle-1 font-weight-medium">
                                                <i class="mdi mdi-star text-warning text-h5"></i>
                                                <i class="mdi mdi-star text-warning text-h5"></i>
                                                <i class="mdi mdi-star text-warning text-h5"></i>
                                                <i class="mdi mdi-star text-warning text-h5"></i>
                                                <i class="mdi mdi-star-outline text-warning text-h5"></i>
                                                <span class="d-inline-block ms-2">24-10-2023</span>
                                            </p>
                                            <p class="text-body-2 font-weight-semibold mt-3 mb-2 text-13">
                                                I recently had the pleasure of working with Wedding Planner to organize and execute the
                                                wedding of my dreams, and I am beyond thrilled with the results. From the initial
                                                consultation to the last dance, Wedding Planner's demonstrated professionalism, creativity,
                                                and an unwavering commitment to making our special day absolutely perfect.
                                            </p>
                                        </v-col>
                                    </v-row>
                                </div>
                            </v-card-item>
                        </v-card>
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-col>
    </v-row>
</template>
<style>
.ProseMirror {
    min-height: 220px;
}
.dropZoneStyle {
    border: 2px dashed #ccc;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    margin-top: 10px;
}

.dropZoneStyle.dragover {
    border-color: #000;
}
.small-font {
    font-size: 14px; /* Adjust the size as needed */
}
</style>