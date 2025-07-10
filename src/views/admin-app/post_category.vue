<script setup lang="ts">
import { ref, computed, onMounted ,nextTick  } from 'vue';
// import vImageIcon from '@/assets/images/locator/v-icon.jpg';
const itemsPerPage = 10;
const currentPage = ref(1);
const dessertsCat = ref([]);
const categoryModal = ref(false);
const modelTabCom = ref(0);
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL;

// interface ImageFile {
//     url: string;
//     file: File;
// }
onMounted(() => {
    get_Unarchive_category();
    get_communities_category();
});
const new_loader = ref(false);
const editedIndexCat = ref(-1);
const editedItemCat = ref({
    catName: ''
    // catFiles: null
});
const defaultItemCat = ref({
    catName: ''
    // catFiles: null
});
const search = ref('');
const validCat = ref('');
const formTitleCat = computed(() => {
    return editedIndexCat.value === -1 ? 'Add Category' : 'Edit Category';
});

// const filteredListCat = computed(() => {
    //     return dessertsCat.value.filter((user: any) => {
        //         return user.catName.toLowerCase().includes(search.value.toLowerCase());
        //     });
        // });
   
const filteredListCat = computed(() => {
    return dessertsCat.value.filter((user: any) => {
        // Add a null check for user and user.catName
        if (user && user.catName) {
            return user.catName.toLowerCase().includes(search.value.toLowerCase());
        }
        return false; // Or handle the case when user or user.catName is undefined/null
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
    delete_communities_cat(item.id);
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
        edit_communities_cat(editedItemCat.value);
        // Object.assign(dessertsCat.value[editedIndexCat.value], editedItemCat.value);
    } else {
        add_communities_cat();
        // dessertsCat.value.push(editedItemCat.value);
    }
    closeCat();
    // if (currentImage.value.length > 3) {
        //     currentImage.value[3] = '';
        // }
    }
    
    // ************** For Topics Function *************************
    
    const itemsPerPageTopics = 10;
    const currentPageTopics = ref(1);
    const dessertsTopics = ref([]);
    
    const editedIndexTopics = ref(-1);
    const editedItemTopics = ref({
        TopicsName: ''
        // TopicsFiles: null
    });
    const defaultItemTopics = ref({
        TopicsName: ''
        // TopicsFiles: null
    });
    const searchTopics = ref('');
    const validTopics = ref('');
    const TopicsModal = ref(false);
    const formTitleTopics = computed(() => {
        return editedIndexTopics.value === -1 ? 'Add Topics' : 'Edit Topics';
    });
    
    const filteredListTopics = computed(() => {
        return dessertsTopics.value.filter((user: any) => {
            return user.TopicsName.toLowerCase().includes(search.value.toLowerCase());
        });
    });
    
    const paginatedItemsTopics = computed(() => {
        if (filteredListTopics.value) {
            const start = (currentPage.value - 1) * itemsPerPageTopics;
            const end = start + itemsPerPageTopics;
            return filteredListTopics.value.slice(start, end);
    } else {
        return []; // or handle the case when filteredListTopics.value is undefined
    }
});

// function editItemTopics(item: any) {
//     editedIndexTopics.value = dessertsTopics.value.indexOf(item);
//     editedItemTopics.value = Object.assign({}, item);
//     TopicsModal.value = true;
// }

function deleteItemTopics(item: any) {
    const index = dessertsTopics.value.indexOf(item);
    dessertsCat.value.splice(index, 1);
}

// function closeTopics() {
    //     TopicsModal.value = false;
//     setTimeout(() => {
    //         editedItemTopics.value = Object.assign({}, defaultItemTopics.value);
    //         editedIndexTopics.value = -1;
    //     }, 300);
    // }
    // function saveTopics(index:number) {
        //     if (editedIndexTopics.value > -1) {
            //         Object.assign(dessertsTopics.value[editedIndexTopics.value], editedItemTopics.value);
            //     } else {
                //         dessertsTopics.value.push(editedItemTopics.value);
                //     }
                //     closeTopics();
                //     // if (currentImage.value.length > 3) {
                    //     //     currentImage.value[3] = '';
                    //     // }
                    // }
                    
                    // const currentImage = ref<string[]>([vImageIcon]);
                    
// const handleImageUpload = (event: any, index: any) => {
//     const input = event.target;
//     if (input.files && input.files[0]) {
    //         const reader = new FileReader();
    //         reader.onload = () => {
        //             if (typeof reader.result === 'string') {
//                 switch (index) {
    //                     case 0:
    //                     case 1:
    //                     case 2:
//                     case 3:
//                         currentImage.value[index] = reader.result;
//                         break;
//                     default:
//                         break;
//                 }
//             }
//         };
//         reader.readAsDataURL(input.files[0]);
//     }
// };

const add_communities_cat = async () => {
    try {
        const token_user = localStorage.getItem('authToken');
        const highestIndex = filteredListCat.value.length;
        console.log('check the value of highest number ----',highestIndex)
        const formdata = {
            token: token_user,
            catName: editedItemCat.value.catName,
            highestIndex:highestIndex,
        };
        console.log('check the value of formdata  ----',formdata)

        const response = await axios.post('api/v_super/add_communities_cat/', formdata);
        if (response.data.status === 'add_communities_cat') {
            get_communities_category();
            get_Unarchive_category();
            // alert('yes add_communities_cat saved in backend')
            // console.log('response is here---',response)
        }
    } catch (error) {
        console.error(error);
    }
};

const get_communities_category = async () => {
    new_loader.value = true;
    try {
        const token_user = localStorage.getItem('authToken');
        const res_id = window.location.href.split('/').pop();
        const formdata = {
            token: token_user,
            res_id: res_id
        };
        const response = await axios.post('api/v_super/get_communities_category/', formdata);
        const get_communities_category = response.data.get_communities_category;
        new_loader.value = false;
        if (get_communities_category) {
            const updatedData = get_communities_category.map((item: any, index: any) => {
                return {
                    id: item.id,
                    Sr_no: `#${index + 1}`,
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

const get_Unarchive_category = async () => {
    new_loader.value = true;
    try {
        const token_user = localStorage.getItem('authToken');
        const res_id = window.location.href.split('/').pop();
        const formdata = {
            token: token_user,
            res_id: res_id
        };
        const response = await axios.post('api/v_super/get_Unarchive_category/', formdata);
        const get_Unarchive_category = response.data.get_Unarchive_category;
        console.log('data yaha hai------------',get_Unarchive_category)
        new_loader.value = false;
        if (get_Unarchive_category) {
            const updatedData = get_Unarchive_category.map((item: any, index: any) => {
                return {
                    id: item.id,
                    Sr_no: `#${index + 1}`,
                    TopicsName: item.name
                };
            });
            dessertsTopics.value = updatedData;
        }
    } catch (error) {
        new_loader.value = false;
        console.error('API error:', error);
    }
};

const archiveItem = async (id: any) => {
    try {
        const token_user = localStorage.getItem('authToken');
        const formdata = {
            token: token_user,
            archive_id: id,
            arc_status: 'Unarchive'
        };
        const response = await axios.post('api/v_super/get_archiveItem/', formdata);
        const archiveItem = response.data;
        if (archiveItem.status === 'archiveItem') {
            get_communities_category();
            get_Unarchive_category();
        }
    } catch (error) {
        console.error('API error:', error);
    }
};

const UnarchiveItem = async (id: any) => {
    try {
        const token_user = localStorage.getItem('authToken');
        const formdata = {
            token: token_user,
            archive_id: id,
            arc_status: 'Archive'
        };
        const response = await axios.post('api/v_super/get_unarchiveItem/', formdata);
        const archiveItem = response.data;
        if (archiveItem.status === 'unarchiveItem') {
            get_communities_category();
            get_Unarchive_category();
        }
    } catch (error) {
        console.error('API error:', error);
    }
};

const edit_communities_cat = async (value: any) => {
    const cate_id = value.id;
    try {
        const token_user = localStorage.getItem('authToken');
        const formdata = {
            token: token_user,
            catName: editedItemCat.value.catName,
            cate_id: cate_id
        };
        const response = await axios.post('api/v_super/edit_communities_cat/', formdata);
        if (response.data.status === 'edit_communities_cat') {
            get_communities_category();
        }
    } catch (error) {
        console.error(error);
    }
};

const delete_communities_cat = async (value: any) => {
    const cate_id = value;
    try {
        const token_user = localStorage.getItem('authToken');
        const formdata = {
            token: token_user,
            cate_id: cate_id
        };
        const response = await axios.post('api/v_super/delete_communities_cat/', formdata);
        if (response.data.status === 'delete_communities_cat') {
            get_communities_category();
        }
    } catch (error) {
        console.error(error);
    }
};
// const filteredListCat2 = ref([]);
const ascDesc = ref('Sort by');
const ascDescItem = ref(["Shuffle", "Descending"]);
// const shuffleList = () => {
//     console.log('start with step 2 --- ')
//     console.log('start with step 3 --- ',filteredListCat.value)

//     filteredListCat.value = filteredListCat.value
//     .map((item) => ({ ...item, sortKey: Math.random() }))
//     .sort((a, b) => a.sortKey - b.sortKey)
//     .map(({ sortKey, ...rest }) => rest);
// };


// const shuffleList = () => {
//     console.log("Start with step 2 --- ");
//     console.log(
//     "Start with step 3 --- Original Data: ",
//     JSON.parse(JSON.stringify(filteredListCat.value))
//     );

//     const shuffled = filteredListCat.value
//         .map((item) => ({ ...item, sortKey: Math.random() }))  // Add random key
//         .sort((a, b) => a.sortKey - b.sortKey)  // Sort based on random key
//         .map(({ sortKey, ...rest }) => rest);  // Remove sortKey

//     // Use Vue reactivity
//     console.log("Start with step 4 --- ",shuffled);

//     filteredListCat.value = [...shuffled];
//     console.log("Start with step 5 --- ",filteredListCat.value);


//     nextTick(() => {
//         console.log(
//             "Shuffled Data: ",
//             JSON.parse(JSON.stringify(filteredListCat.value)) // Log shuffled data
//         );
//     });
// };

const reverseList = () => {
    const reversed = [...dessertsCat.value].reverse();  // Reverse the array
    dessertsCat.value = reversed;  // Update the original list
};
const shwlist = () =>{
    const rev = [...dessertsCat.value];  // Reverse the array
    dessertsCat.value = rev;  // Update the original list
};
const shuffleList = () => {
    const shuffled = [...dessertsCat.value]
        .sort(() => Math.random() - 0.5);  // Randomly shuffle the array
    dessertsCat.value = shuffled;  // Update the original list
};


const han = () => {
    console.log("Dropdown value changed to:", ascDesc.value);
    if (ascDesc.value === "Shuffle") {
        shuffleList();
    }
   
    else if (ascDesc.value === "Descending") {
        reverseList(); 
    }
};

const moveItemUp = async (index:any,item_id:any) => {
    if (index > 0) {
        const formdata = {
            itemId : item_id, 
            newIndex : index,
        };
        console.log('check the index',formdata)
        try {
            const response = await axios.post('api/v_super/increase_indexing/', formdata);
            if (response.data.status === 'Increase_indexing') {
                get_communities_category()
            }
        } catch (error) {
            console.error('API Error:', error);
            alert('You cannot move the first item up.');
        }
        
    }
    
};


const moveItemDown = async (index:any,item_id:any) => {
    console.log('check the index --- ',index)
    console.log('check the item_id --- ',item_id)
    if (index > 0) {
        const formdata = {
            itemId : item_id, 
            newIndex : index,
        };
        console.log('check the index',formdata)
        try {
            const response = await axios.post('api/v_super/decrease_indexing/', formdata);
            if (response.data.status === 'decrease_indexing') {
                get_communities_category()
            }
        } catch (error) {
            console.error('API Error:', error);
            alert('You cannot move the last item down.');
        }
    }
};

</script>
<template>
    <main>
        <v-card elevation="10" class="" rounded="md">
            <v-tabs
                v-model="modelTabCom"
                bg-color="primary"
                next-icon="mdi-arrow-right-bold-box-outline"
                prev-icon="mdi-arrow-left-bold-box-outline"
                show-arrows
            >
                <v-tab value="categoryData"> Add Category </v-tab>
                <v-tab value="topicsData"> Archive Category </v-tab>
            </v-tabs>
            <v-card-text class="pa-3 mt-2">
                <v-window v-model="modelTabCom" class="pt-3">
                    <v-window-item value="categoryData">
                        <v-row>
                            <v-col cols="12"  lg="5" md="6">
                                <v-text-field
                                    density="compact"
                                    v-model="search"
                                    label="Search Category"
                                    hide-details
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                            <!-- <v-col cols="12" lg="2" md="3">
                                <v-select
                                    v-model="ascDesc"
                                    :items="ascDescItem"
                                    return-object
                                    single-line
                                    variant="outlined"
                                    class="inputFeildsCstm"
                                    @update:modelValue="han"
                                ></v-select>/
                            </v-col> -->
                            <v-col cols="12" lg="" md="5" class="text-right">
                                <v-dialog v-model="categoryModal" max-width="700">
                                    <template v-slot:activator="{ props }">
                                        <v-btn color="primary" v-bind="props" flat class="ml-auto">
                                            <v-icon class="mr-2">mdi-plus</v-icon>Add Category
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
                                                        <v-text-field
                                                            variant="outlined"
                                                            hide-details
                                                            v-model="editedItemCat.catName"
                                                            label="Category Name"
                                                        ></v-text-field>
                                                    </v-col>
                                                </v-row>
                                            </v-form>
                                        </v-card-text>

                                        <v-card-actions class="pa-4">
                                            <v-spacer></v-spacer>
                                            <v-btn color="error" @click="closeCat">Cancel</v-btn>
                                            <v-btn color="primary" :disabled="editedItemCat.catName == ''" variant="flat" @click="saveCat"
                                                >Save</v-btn
                                            >
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-col>
                        </v-row>
                        <div class="position-relative" :class="new_loader == true ? 'minHeight' : ''">
                            <div class="logoLoader tableLoader bg-Whitecustom" v-if="new_loader == true">
                                <div class="LogoVInnerImg">
                                    <img src="@/assets/images/locator/v-icon.png" alt="logo-loader" />
                                    <p class="">Please Wait...</p>
                                </div>
                            </div>
                            <v-table :items="paginatedItemsCat" :currentPage="currentPage" :pageSize="5" class="mt-5">
                                <thead>
                                    <tr>
                                        <th class="text-subtitle-1 font-weight-semibold">Sr no</th>
                                        <th class="text-subtitle-1 font-weight-semibold">Name</th>
                                        <th class="text-subtitle-1 font-weight-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-if="filteredListCat.length > 0">
                                        <tr v-for="(item,index) in filteredListCat" :key="item.id">
                                            <!-- <td class="text-subtitle-1 py-2">
                                        <template v-if="item.catFiles !== ''">
                                            <img :src="item.catFiles" class="imageCustomTable img-fluid" />
                                        </template>
                                        <template v-else>
                                            <img :src="vImageIcon" class="imageCustomTable img-fluid" />
                                        </template>
                                    </td> -->
                                            <td class="text-subtitle-1">{{ item.Sr_no }}</td>
                                            <td class="text-subtitle-1">{{ item.catName }}</td>

                                            <td>
                                                <div class="d-flex gap-2 align-center">
                                                    <v-tooltip text="Archive">
                                                        <template v-slot:activator="{ props }">
                                                            <v-btn
                                                                variant="flat"
                                                                size="small"
                                                                class="bg-lightwarning text-warning"
                                                                v-bind="props"
                                                                @click="archiveItem(item.id)"
                                                                ><ArchiveIcon stroke-width="1.5" size="20" class="me-2 text-warning" />
                                                                Archive</v-btn
                                                            >
                                                        </template>
                                                    </v-tooltip>
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
                                                    <v-tooltip text="Move Up">
                                                        <template v-slot:activator="{ props }">
                                                            <v-btn
                                                                variant="flat"
                                                                size="small"
                                                                
                                                                :class="{
                                                                    'bg-lightprimary text-primary': index !== 0, 
                                                                    'bg-disabled text-disabled': index === 0
                                                                }"
                                                                :disabled="index === 0"
                                                                v-bind="props"
                                                                @click="moveItemUp(index+1,item.id)"
                                                            >
                                                                ↑ Up
                                                            </v-btn>
                                                        </template>
                                                    </v-tooltip>

                                                    <!-- Move Down button -->
                                                    <v-tooltip text="Move Down">
                                                        <template v-slot:activator="{ props }">
                                                            <v-btn
                                                                variant="flat"
                                                                size="small"
                                                                :class="{
                                                                    'bg-lightprimary text-primary': index !== filteredListCat.length - 1,
                                                                    'bg-disabled text-disabled': index === filteredListCat.length - 1
                                                                }"
                                                                :disabled="index === filteredListCat.length - 1"
                                                                v-bind="props"
                                                                @click="moveItemDown(index+1,item.id)"
                                                            >
                                                                ↓ Down
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
                        </div>
                        <v-pagination
                            color="primary"
                            v-model="currentPage"
                            :length="Math.ceil(filteredListCat.length / itemsPerPage)"
                            rounded="circle"
                        ></v-pagination>
                    </v-window-item>
                    <v-window-item value="topicsData">
                        <v-row>
                            <v-col cols="12" lg="4" md="5">
                                <v-text-field
                                    density="compact"
                                    v-model="searchTopics"
                                    label="Search Archive Category"
                                    hide-details
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <div class="position-relative" :class="new_loader == true ? 'minHeight' : ''">
                            <div class="logoLoader tableLoader bg-Whitecustom" v-if="new_loader == true">
                                <div class="LogoVInnerImg">
                                    <img src="@/assets/images/locator/v-icon.png" alt="logo-loader" />
                                    <p class="">Please Wait...</p>
                                </div>
                            </div>
                            <v-table :items="paginatedItemsTopics" :currentPage="currentPage" :pageSize="5" class="mt-5">
                                <thead>
                                    <tr>
                                        <th class="text-subtitle-1 font-weight-semibold">Sr no</th>
                                        <th class="text-subtitle-1 font-weight-semibold">Name</th>
                                        <th class="text-subtitle-1 font-weight-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-if="filteredListTopics.length > 0">
                                        <tr v-for="item in filteredListTopics" :key="item.id">
                                            <td class="text-subtitle-1">{{ item.Sr_no }}</td>
                                            <td class="text-subtitle-1">{{ item.TopicsName }}</td>

                                            <td>
                                                <div class="d-flex align-center">
                                                    <v-tooltip text="UnArchive">
                                                        <template v-slot:activator="{ props }">
                                                            <v-btn
                                                                variant="flat"
                                                                size="small"
                                                                class="bg-lightwarning text-warning"
                                                                v-bind="props"
                                                                @click="UnarchiveItem(item.id)"
                                                            >
                                                                <ArchiveOffIcon stroke-width="1.5" size="20" class="me-2 text-warning" />
                                                                Unarchive
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
                        </div>
                        <v-pagination
                            color="primary"
                            v-model="currentPageTopics"
                            :length="Math.ceil(filteredListTopics.length / itemsPerPage)"
                            rounded="circle"
                        ></v-pagination>
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-card>
    </main>
</template>
<style>
.bg-Whitecustom {
    background: #fff !important;
}
.bg-Whitecustom img {
    width: 300px;
}
.minHeight {
    min-height: 300px;
}
</style>