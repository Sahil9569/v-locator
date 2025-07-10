<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL;
// import vImageIcon from '@/assets/images/locator/v-icon.jpg';
const itemsPerPage = 10;
const currentPage = ref(1);
const dessertsCat = ref([]);
const categoryModal = ref(false);
const modelTabCom = ref(0);
const new_loader = ref(false);

// interface ImageFile {
//     url: string;
//     file: File;
// }
const editedIndexCat = ref(-1);
const editedItemCat = ref({
    topicName: ''
    // catFiles: null
});
const defaultItemCat = ref({
    topicName: ''
    // catFiles: null
});
// const search = ref('')
const validCat = ref('');
const formTitleCat = computed(() => {
    return editedIndexCat.value === -1 ? 'Add Topics' : 'Edit Topics';
});

const filteredListCat = computed(() => {
    return dessertsCat.value;
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
    const index = dessertsCat.value.indexOf(item);
    dessertsCat.value.splice(index, 1);
    delete_topics(item);
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
        edit_topics(editedItemCat.value);
    } else {
        add_topics(editedItemCat.value);
        dessertsCat.value.push(editedItemCat.value);
    }
    closeCat();
    // if (currentImage.value.length > 3) {
    //     currentImage.value[3] = '';
    // }
}

onMounted(() => {
    getalltopics();
});

const getalltopics = async () => {
    new_loader.value = true;
    try {
        const token_user = localStorage.getItem('authToken');
        const formData = {
            token: token_user
        };
        const response = await axios.post('api/v_super/getalltopics/', formData);
        if (response.data.status === 'getalltopics') {
            new_loader.value = false;
            const top = response.data.all_topic;
            dessertsCat.value = top;
        } else {
            new_loader.value = false;
            console.error('error');
        }
    } catch (error) {
        new_loader.value = false;
        console.error('error');
    }
};

const add_topics = async (data: any) => {
    try {
        const token_user = localStorage.getItem('authToken');
        const formData = {
            token: token_user,
            topicName: data.name
        };
        const response = await axios.post('api/v_super/add_topics/', formData);
        if (response.data.status === 'add_topics') {
            console.log('check here reponse is coming or not', response.data.all_topic);
            getalltopics();
        } else {
            console.error('error');
        }
    } catch (error) {
        console.error('error');
    }
};

const edit_topics = async (topic_id: any) => {
    try {
        const token_user = localStorage.getItem('authToken');
        const formData = {
            token: token_user,
            topic_id: topic_id.id,
            topicName: topic_id.name
        };
        const response = await axios.post('api/v_super/edit_topics/', formData);
        if (response.data.status === 'edit_topics') {
            getalltopics();
        } else {
            console.error('error');
        }
    } catch (error) {
        console.error('error');
    }
};

const delete_topics = async (topic_id: any) => {
    try {
        const token_user = localStorage.getItem('authToken');
        const formData = {
            token: token_user,
            topic_id: topic_id.id
        };
        console.log('gjkfhkfdhjg formData   formData', formData);
        const response = await axios.post('api/v_super/delete_topics/', formData);
        console.log('gjkfhkfdhjg', response);
        if (response.data.status === 'delete_topics') {
            getalltopics();
        } else {
            console.error('error');
        }
    } catch (error) {
        console.error('error');
    }
};
</script>
<template>
    <v-card elevation="10" class="" rounded="md">
        <v-card-items class="pa-3">
            <v-row class="align-center">
                <v-col cols="12" lg="5" md="4">
                    <h2 class="text-h4 ms-3">Topics</h2>
                    <!-- <v-text-field density="compact" v-model="search" label="Search Category" hide-details variant="outlined"></v-text-field> -->
                </v-col>
                <v-col cols="12" lg="7" md="8" class="text-right">
                    <v-dialog v-model="categoryModal" max-width="700">
                        <template v-slot:activator="{ props }">
                            <v-btn color="primary" v-bind="props" flat class="ml-auto me-3">
                                <v-icon class="mr-2">mdi-plus</v-icon>Add Topics
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title class="pa-4 bg-primary">
                                <span class="title text-white">{{ formTitleCat }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-form ref="form" v-model="validCat" lazy-validation @submit.prevent="">
                                    <v-row>
                                        <v-col cols="12">
                                            <v-label>Topics</v-label>
                                            <v-text-field variant="outlined" hide-details v-model="editedItemCat.name"></v-text-field>
                                            <!-- <v-combobox v-model="editedItemCat.topicName" class="chipTheme" hide-details multiple chips>
                                            </v-combobox> -->
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>

                            <v-card-actions class="pa-4">
                                <v-spacer></v-spacer>
                                <v-btn color="error" @click="closeCat">Cancel</v-btn>
                                <v-btn color="primary" variant="flat" @click="saveCat">Save</v-btn>
                                <!-- :disabled="editedItemCat.topicName == '' " -->
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
                            <th class="text-subtitle-1 font-weight-semibold">ID</th>
                            <th class="text-subtitle-1 font-weight-semibold">Name</th>
                            <th class="text-subtitle-1 font-weight-semibold">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="(item, index) in filteredListCat" :key="item.id">
                            <td class="text-subtitle-1">#{{ index + 1 }}</td>
                            <td class="text-subtitle-1">
                                <div class="d-flex flex-wrap gap-2">
                                    {{ item.name }}
                                </div>
                            </td>

                            <td>
                                <div class="d-flex gap-2 align-center">
                                    <v-tooltip text="Edit">
                                        <template v-slot:activator="{ props }">
                                            <v-btn
                                                variant="flat"
                                                size="small"
                                                class="bg-lightprimary text-primary"
                                                @click="editItemCat(item)"
                                                v-bind="props"
                                                ><PencilIcon stroke-width="1.5" size="20" class="me-2" /> Edit</v-btn
                                            >
                                        </template>
                                    </v-tooltip>
                                    <v-tooltip text="Delete">
                                        <template v-slot:activator="{ props }">
                                            <v-btn
                                                variant="flat"
                                                size="small"
                                                class="bg-lighterror text-error"
                                                @click="deleteItemCat(item)"
                                                v-bind="props"
                                                ><TrashIcon stroke-width="1.5" size="20" class="me-2" /> Delete</v-btn
                                            >
                                        </template>
                                    </v-tooltip>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </div>
            <v-pagination
                color="primary"
                v-model="currentPage"
                :length="Math.ceil(filteredListCat.length / itemsPerPage)"
                rounded="circle"
            ></v-pagination>
        </v-card-items>
    </v-card>
</template>
