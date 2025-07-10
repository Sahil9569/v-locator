<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useContactStore } from '@/stores/apps/contact';
import { PlusIcon,CategoryIcon,ArticleIcon,LockIcon } from 'vue-tabler-icons';

// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
// theme breadcrumb
import axios from 'axios';
import { useRouter } from "vue-router";
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL
const tab = ref(null);
const page = ref({ title: 'Add Category & Addon' });
const showLoader = ref(false);
const breadcrumbs = ref([
    {
        text: 'Category & Addon List',
        disabled: true,
        href: '#'
    }
]);
const store = useContactStore();

onMounted(() => {
    store.fetchContacts();
    getAllCat();
    getAllAddons();
});
const getContacts: any = computed(() => {
    return store.contacts;
});
let temporaryImage = ''; // Declare a temporary variable to store the converted image
const valid = ref(true);
const validAddons = ref(true);
const dialog = ref(false);
const dialog2 = ref(false);
const search = ref('');
const search1 = ref('');
const itemsPerPage = ref(5)
const itemsPerPage2 = ref(5)
const items = ref([
    {
        'addonName': '',
        'addonPrice': '',
    },
]);


const e6 = ref([]);
const addonMultiple = ref([
    "Hash browns",
    "French toast sticks",
    "Classic fries",
    "Side garden salad",
    "Red Onions",
    "Spinach",
    "Corn",
    "Broccoli",
    "Bell Pepper",
    "Root Vegetables",
    "Onion",
    "Mushroom",
    "Paprika",
    "Black Pepper",
    "Red Pepper Flakes",
    "Basil",
]);
const new_loader = ref(false);
const desserts = ref();
const desserts1 = ref();
const editedIndex = ref(-1);
const editedIndex2 = ref(-1);
const editedItem = ref({
    id:'',
    dishName: '',
    price: '',
    discount: '',
    dishCategory: '',
    dishImage: '',
    nameAddons:'',
    addonsPrice:'',

});
const defaultItem = ref({
    id:'',
    dishName: '',
    price: '',
    discount: '',
    dishCategory: '',
    dishImage: '',
    nameAddons:'',
    addonsPrice:'',
});
const editedItem1 = ref({
    id:'',
    addonName: '',
    addonPrice: '',
    addonImage: '',
});
const defaultItem1 = ref({
    id:'',
    addonName: '',
    addonPrice: '',
    addonImage: '',
});
// const imageStyle = computed(()=>{
//     return files.value = files.value
// })

//Methods
const pageCount = computed(() => {
    return Math.ceil(filteredList.value.length / itemsPerPage.value) 
});
const pageCount2 = computed(() => {
    return Math.ceil(filteredList2.value.length / itemsPerPage2.value) 
});


const filteredList = computed(() => {
    if (!Array.isArray(desserts.value)) return [];
    return desserts.value.filter((item: any) => {
        return item.dishCategory.toLowerCase().includes(search.value.toLowerCase());
    });
});
const filteredList2 = computed(() => {
    if (!Array.isArray(desserts1.value)) return [];

    return desserts1.value.filter((item: any) => {
        console.log("CHEKC",item.addonName);
        return item.addonName.toLowerCase().includes(search1.value.toLowerCase());
               
    });
});


function editItem(item:any) {
    console.log("HERE", desserts.value.indexOf(item));
    editedIndex.value = desserts.value.indexOf(item);
    console.log(editedIndex.value);
    
    // Assign the dishCategory to the editedItem's dishCategory property
    editedItem.value.dishCategory = item.dishCategory;
    editedItem.value.id = item.id;

    // You can keep the dishImage property as is
    // editedItem.value.dishImage = item.dishImage;

    dialog.value = true;
}

function editAddonItem(item:any) {
    editedIndex2.value = desserts1.value.indexOf(item);
    console.log('mmnmnmnnmnmnmhmhmjjmjmjy',editedIndex2.value);
    
    // Assign the dishCategory to the editedItem's dishCategory property
    editedItem1.value.addonName = item.addonName;
    editedItem1.value.id = item.id;
    editedItem1.value.addonPrice = item.addonPrice;

    // You can keep the dishImage property as is
    // editedItem.value.dishImage = item.dishImage;

    dialog2.value = true;
}

function deleteItem(item: any) {
    const index = desserts.value.indexOf(item);
    deleteCat(item.id);
}
function deleteAddonItem(item: any) {
    const index = desserts1.value.indexOf(item);
    deleteAddons(item.id);
}

function close() {
    dialog.value = false;
    dialog2.value = false;
    setTimeout(() => {
        editedItem.value = Object.assign({}, defaultItem.value);
        editedIndex.value = -1;
    }, 300);
}
function close1() {
    dialog2.value = false;
    setTimeout(() => {
        editedItem1.value = Object.assign({}, defaultItem1.value);
        editedIndex2.value = -1;
    }, 300);
}
function save() {
    if (editedIndex.value > -1) {
        Object.assign(desserts.value[editedIndex.value], editedItem.value);
        console.log("HELLO",editedItem.value)
        updateCategoryAPI(editedItem.value.id, editedItem.value.dishCategory, editedItem.value.dishImage);
    } else {
        
        addCat();
        // desserts.value.push(editedItem.value);
    }
    close();
}
function save1() {
    if (editedIndex2.value > -1) {
        Object.assign(desserts.value[editedIndex2.value], editedItem1.value);
        console.log("HELLO",editedItem1.value)
        updateAddonsAPI(editedItem1.value.id, editedItem1.value.addonName, editedItem1.value.addonPrice);
    } else {
        
        addAddons();
        // desserts.value.push(editedItem.value);
    }
    close1();
}
//Computed Property
const formTitle = computed(() => {
    console.log("I AM HERERERERE")
    return editedIndex.value === -1 ? 'Add Category' : 'Edit Category';
});

const formTitle2 = computed(() => {
    console.log("I AM HERERERERE",editedIndex2.value)
    console.log("I AM HERERERERE",editedIndex2.value)
    return editedIndex2.value === -1 ? 'Add Addon' : 'Edit Addon';
});
const updateCategoryAPI = async (id:any, dishCategory:any, dishImage:any) => {
    console.log("ID",id)
    try {
        const token = localStorage.getItem('authToken');
        const urlToken = window.location.href.split('/').pop();
        console.log("HELLLEOEO",temporaryImage)
        const formdata = {
            token: token,
            cat_id: id,
            url_token:urlToken,
            name: dishCategory,
            img:temporaryImage, // Declare a temporary variable to store the converted image,
        };
        console.log("FORMADATA UPDATE",formdata);
        const response = await axios.post('api/kitchen/edit_cat/', formdata);
        console.log('Update Category API response:', response.data);
        const index = desserts.value.findIndex(item => item.id === id);
        console.log(desserts.value.findIndex(item => item.id === id))
        if (index !== -1) {
            console.log('Update Category API response If part')
            getAllCat();

            // Update the edited item's properties with the API response
            desserts.value[index].dishCategory = response.data.cat_name;
            desserts.value[index].dishImage = response.data.base64_image;
        }
        editedIndex.value=-1
        temporaryImage = ''
        // Handle the response or do any further actions as needed
    } catch (error) {
        console.error('API error:', error);
        // Handle the error gracefully
    }
}
const updateAddonsAPI = async (id:any, addonName:any, addonPrice:any) => {
    console.log("ID",id)
    try {
        const token = localStorage.getItem('authToken');
        const urlToken = window.location.href.split('/').pop();
        console.log("HELLLEOEO",temporaryImage)
        const formdata = {
            token: token,
            add_id: id,
            url_token:urlToken,
            name: addonName,
            price:addonPrice,
            img:temporaryImage, // Declare a temporary variable to store the converted image,
        };
        console.log("FORMADATA UPDATE",formdata);
        const response = await axios.post('api/kitchen/edit_addons/', formdata);
        console.log('Update Category API response:', response.data);
        const index = desserts1.value.findIndex(item => item.id === id);
        console.log(desserts1.value.findIndex(item => item.id === id))
        if (index !== -1) {
            console.log('Update Category API response If part')
            // Update the edited item's properties with the API response
            desserts1.value[index].addonName = response.data.add_name;
            desserts1.value[index].addonPrice = response.data.add_price;
            desserts1.value[index].addonImage = response.data.base64_image;
        }
        editedIndex2.value=-1
        temporaryImage = ''
        // Handle the response or do any further actions as needed
    } catch (error) {
        console.error('API error:', error);
        // Handle the error gracefully
    }
}
const addCat = async () => {
    showLoader.value = true; 
    new_loader.value = true;
    console.log("Coupan API CALL")
    try {
        const token = localStorage.getItem('authToken');
        const urlToken = window.location.href.split('/').pop();
        const formdata = {
            token:token,
            url_token:urlToken,
            name:editedItem.value.dishCategory,
            img:temporaryImage,
        }
        console.log("TESTSTS",formdata)
        const response = await axios.post('api/kitchen/add_cat/',formdata);
        showLoader.value = false;
        console.log('Customer API response:', response.data);
        new_loader.value = false;
        const newItem = {
            id: response.data.id,
            dishCategory: response.data.cat_name,
            dishImage: response.data.base64_image, // Declare a temporary variable to store the converted image,
        };
        console.log(newItem)
        desserts.value.push(newItem);
    } catch (error) {
        showLoader.value = false;
        new_loader.value = false;
        console.error('API error:', error);
        
    }
}
const addAddons = async () => {
    showLoader.value = true; 
    console.log("Coupan API CALL")
    new_loader.value = true;
    try {
        const token = localStorage.getItem('authToken');
        const urlToken = window.location.href.split('/').pop();
        const formdata = {
            token:token,
            url_token:urlToken,
            name:editedItem1.value.addonName,
            price:editedItem1.value.addonPrice,
            img:temporaryImage,
        }
        console.log("TESTSTS",formdata)
        const response = await axios.post('api/kitchen/add_addons/',formdata);
        console.log('Customer API response:', response.data);
        showLoader.value = false;
        new_loader.value = false;
        const newItem = {
                id: response.data.id,
                addonName:response.data.add_name,
                addonPrice:response.data.add_price,
                addonImage:response.data.base64_image,
            };
            console.log(newItem)
            desserts1.value.push(newItem);
            temporaryImage = ''
    } catch (error) {
        showLoader.value = false;
        new_loader.value = false;
        console.error('API error:', error);
        
    }
}


const handleImageUpload = (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput.files?.[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      // Set the temporaryImage variable with the converted base64 image
      temporaryImage = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};


const getAllCat = async () => {
    console.log("Order LIST API CALL")
    new_loader.value = true;
    try {
        console.log("INSIDE TRY",valid.value)
        const token = localStorage.getItem('authToken');
        const urlToken = window.location.href.split('/').pop();
        const formData = {
            token:token,
            url_token:urlToken,        
        };
        const response = await axios.post('api/kitchen/all_cat/',formData);
        console.log('Coupans API response:', response.data);
        if (response.data) {
            new_loader.value = false;
            const updatedData = response.data.map((item:any,index:any) => ({   
                id:item.id, 
                dishCategory: item.cat_name,
                dishImage: item.base64_image,
                
                }));
                // Update the desserts ref with the new mapped data
                desserts.value = updatedData;
                console.log("HEllo WORLD",desserts.value)
        }else{
            new_loader.value = false;
            console.log("First Error")
        }
    } catch (error) {
        new_loader.value = false;
        console.error('API error:', error);
        
    }
}

const getAllAddons = async () => {
    console.log("Order LIST API CALL")
    new_loader.value = true;
    try {
        console.log("INSIDE TRY",valid.value)
        const token = localStorage.getItem('authToken');
        const urlToken = window.location.href.split('/').pop();
        const formData = {
            token:token,
            url_token:urlToken,        
        };
        const response = await axios.post('api/kitchen/all_addons/',formData);
        console.log('Coupans API response:', response.data);
        if (response.data) {
            new_loader.value = false;
            const updatedData = response.data.map((item:any,index:any) => ({   
                id:item.id, 
                addonName:item.add_name,
                addonPrice:item.add_price,
                addonImage:item.base64_image,
                
                }));
                // Update the desserts ref with the new mapped data
                desserts1.value = updatedData;
                console.log("HEllo WORLD",desserts.value)
        }else{
            new_loader.value = false;
            console.log("First Error")
        }
    } catch (error) {
        new_loader.value = false;
        console.error('API error:', error);
        
    }
}
const deleteCat = async (index:any) => {
    console.log("STAFF Delete API CALL")
  try {
    console.log("INSIDE TRY",index)
    const token = localStorage.getItem('authToken');
    const urlToken = window.location.href.split('/').pop();
    const formdata = {
        token:token,
        url_token:urlToken,
        cat_id:index,
    }
    console.log(formdata);
    const response = await axios.post('api/kitchen/delete_cat/',formdata);
      console.log('Staff API response:', response.data);
    //   router.push('/dashboards');
      if (response.data) {
        // console.log("INSIDE IF")
        // localStorage.setItem('authToken', response.data.access);
        // router.push('/dashboards');
      }else{
        console.log("First Error")
      }
  } catch (error) {
    console.error('API error:', error);
    
  }
}
const deleteAddons = async (index:any) => {
    console.log("STAFF Delete API CALL")
  try {
    console.log("INSIDE TRY",index)
    const token = localStorage.getItem('authToken');
    const urlToken = window.location.href.split('/').pop();
    const formdata = {
        token:token,
        url_token:urlToken,
        add_id:index,
    }
    console.log(formdata);
    const response = await axios.post('api/kitchen/delete_addons/',formdata);
      console.log('Staff API response:', response.data);
    //   router.push('/dashboards');
      if (response.data) {
        // console.log("INSIDE IF")
        // localStorage.setItem('authToken', response.data.access);
        // router.push('/dashboards');
      }else{
        console.log("First Error")
      }
  } catch (error) {
    console.error('API error:', error);
    
  }
}
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-card elevation="10" class=" " rounded="md">
        <v-tabs v-model="tab" bg-color="transparent" min-height="70" height="70" color="primary">
            <v-tab value="Category"  class="text-medium-emphasis"><CategoryIcon class="mr-2" size="20"/>Category</v-tab>
            <v-tab value="Addons" class="text-medium-emphasis"><PlusIcon class="mr-2" size="20"/> Addons</v-tab>
            <!-- <v-tab value="Bills"  class="text-medium-emphasis"><ArticleIcon class="mr-2" size="20"/>Bills</v-tab> -->
            <!-- <v-tab value="Security"  class="text-medium-emphasis"><LockIcon class="mr-2" size="20"/>Security</v-tab> -->
        </v-tabs>
        <v-divider></v-divider>
        <v-card-text class="pa-sm-6 pa-3 pb-sm-6 pb-6">
            <v-window v-model="tab">
                <v-window-item value="Category">
                    <v-row>
                        <v-col cols="12" class="text-right">
                            <v-dialog v-model="dialog" max-width="700">
                                <template v-slot:activator="{ props }">
                                    <v-btn color="primary" v-bind="props" flat class="ml-auto">
                                        <v-icon class="mr-2">mdi-plus</v-icon>Add Category
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title class="pa-4 bg-primary">
                                        <span class="title text-white">{{ formTitle }}</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-form ref="form" v-model="valid" lazy-validation>
                                            <v-row>
                                                <v-col cols="12">
                                                    <v-text-field
                                                        variant="outlined"
                                                        hide-details
                                                        v-model="editedItem.dishCategory"
                                                        label="Category Name"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="12">
                                                    <v-file-input
                                                        v-model="editedItem.dishImage"
                                                        color="deep-purple-accent-4"
                                                        label="Upload Image"
                                                        hide-details
                                                        accept="image/png, image/jpeg, image/jpg"
                                                        placeholder="Select your files"
                                                        prepend-inner-icon="mdi-camera"
                                                        variant="outlined"
                                                        class="inputFileUploadCstm"
                                                        type="file"
                                                        @change="handleImageUpload"
                                                        ></v-file-input>
                                                </v-col>
                                                <!-- <v-col cols="12">
                                                    <v-select 
                                                    v-model="e6" 
                                                    :items="addonMultiple" 
                                                    label="Select Addon" 
                                                    color="primary"
                                                    multiple chips
                                                    persistent-hint></v-select>
                                                </v-col> -->
                                            </v-row>
                                        </v-form>
                                    </v-card-text>

                                    <v-card-actions class="pa-4">
                                        <v-spacer></v-spacer>
                                        <v-btn color="error" @click="close">Cancel</v-btn>
                                        <!-- <v-btn
                                            color="primary"
                                            :disabled="(editedIndex.value === -1 && (editedItem.dishCategory === '' || editedItem.dishImage === '')) || (editedIndex.value !== -1 && (editedItem.dishCategory === '' || editedItem.dishImage === ''))"

                                            variant="flat"
                                            @click="save"
                                            >Save</v-btn
                                        > -->
                                        <v-btn
                                            color="primary"
                                            :disabled="((editedIndex.value === -1 && (editedItem.dishCategory === '' || editedItem.dishImage === '')) || (editedIndex.value !== -1 && (editedItem.dishCategory === '' || editedItem.dishImage === '')))"
                                            variant="flat"
                                            @click="save"
                                            type="submit">
                                            <template v-if="showLoader">
                                                <div class="loaderBn"></div> Saving
                                            </template>
                                            <template v-else>
                                                Save
                                            </template>
                                        </v-btn>

                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-col>
                    </v-row>
                    <div class="p-relative">
                        <div class="logoLoader tableLoader" v-if="new_loader == true">
                            <div class="LogoVInnerImg">
                                <img src="@/assets/images/locator/v-icon.png" alt="logo-loader"/>
                                <p class="">Please Wait...</p>
                            </div>
                        </div>
                        <v-table v-model:page="page" :items="filteredList" :items-per-page="itemsPerPage2" class="mt-5">
                            <thead>
                                <tr>
                                    <th class="text-subtitle-1 font-weight-semibold">Category Image</th>
                                    <th class="text-subtitle-1 font-weight-semibold">Category Name</th>
                                    <th class="text-subtitle-1 font-weight-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in filteredList" :key="item.id">
                                    <td class="text-subtitle-1 py-1"><img :src="item.dishImage" class="imageCustomTable img-fluid" /></td>
                                    <td class="text-subtitle-1">{{ item.dishCategory }}</td>
                                    
                                    <!-- <td>
                                        <span  class="text-subtitle-1 mt-1 textSecondary" v-for="(itemss, index) in item.addon" :key="index">
                                            {{ itemss }} <span v-if="index != Object.keys(item.addon).length - 1 ">, </span>
                                        </span>
                                    </td> -->
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
                        <v-pagination v-model="page" :length="pageCount2"></v-pagination>
                    </div>
                </v-window-item>
                <v-window-item value="Addons">
                    <v-row>
                        <v-col cols="12" class="text-right">
                            <v-dialog v-model="dialog2" max-width="700">
                                <template v-slot:activator="{ props }">
                                    <v-btn color="primary" v-bind="props" flat class="ml-auto">
                                        <v-icon class="mr-2">mdi-plus</v-icon>Add Addon
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title class="pa-4 bg-primary">
                                        <span class="title text-white"> {{formTitle2}} {{ editedIndex2 }}</span>
                                    </v-card-title>

                                    <v-card-text class="pa-0">
                                        <v-form ref="form" v-model="validAddons" class="pa-5" lazy-validation>
                                            <v-row>
                                                <v-col cols="6">
                                                    <v-text-field
                                                        variant="outlined"
                                                        hide-details
                                                        v-model="editedItem1.addonName"
                                                        label="Addon Name"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-text-field
                                                        variant="outlined"
                                                        hide-details
                                                        v-model="editedItem1.addonPrice"
                                                        label="Addon price"
                                                        type="number"
                                                        placeholder="$"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="12">
                                                    <v-file-input
                                                        v-model="editedItem1.addonImage"
                                                        color="deep-purple-accent-4"
                                                        label="Upload Image"
                                                        hide-details
                                                        accept="image/png, image/jpeg, image/jpg"
                                                        placeholder="Select your files"
                                                        prepend-inner-icon="mdi-camera"
                                                        variant="outlined"
                                                        class="inputFileUploadCstm"
                                                        type="file"
                                                        @change="handleImageUpload"
                                                    ></v-file-input>
                                                </v-col>
                                                <!-- <v-col cols="12">
                                                    <v-select 
                                                    v-model="e6" 
                                                    :items="addonMultiple" 
                                                    label="Select Addon" 
                                                    color="primary"
                                                    multiple chips
                                                    persistent-hint></v-select>
                                                </v-col> -->
                                            </v-row>
                                        </v-form>
                                    </v-card-text>

                                    <v-card-actions class="pa-4">
                                        <v-spacer></v-spacer>
                                        <v-btn color="error" @click="close1">Cancel</v-btn>
                                        <v-btn
                                            color="primary"
                                            :disabled="(editedIndex2.value === -1 && (editedItem1.addonName === '' || editedItem1.addonPrice === '')) || (editedIndex2.value !== -1 && (editedItem1.addonName === '' || editedItem1.addonPrice === '' ))"
                                            
                                            variant="flat"
                                            @click="save1"
                                            type="submit">
                                            <template v-if="showLoader">
                                                <div class="loaderBn"></div> Saving
                                            </template>
                                            <template v-else>
                                                Save
                                            </template></v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-col>
                    </v-row>
                    <div class="p-relative">
                        <div class="logoLoader tableLoader" v-if="new_loader == true">
                            <div class="LogoVInnerImg">
                                <img src="@/assets/images/locator/v-icon.png" alt="logo-loader"/>
                                <p class="">Please Wait...</p>
                            </div>
                        </div>
                        <v-table v-model:page="page" :items="filteredList2" :items-per-page="itemsPerPage" class="mt-5">
                            <thead>
                                <tr>
                                    <th class="text-subtitle-1 font-weight-semibold">Image</th>
                                    <th class="text-subtitle-1 font-weight-semibold">Addons Name</th>
                                    <th class="text-subtitle-1 font-weight-semibold">Addons Price</th>
                                    <th class="text-subtitle-1 font-weight-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in filteredList2" :key="item.id">
                                    <templates v-if="item.addonImage">
                                        <td class="text-subtitle-1 py-1"><img :src="item.addonImage" class="imageCustomTable img-fluid" /></td>
                                    </templates>
                                    <templates v-else>
                                        <td class="text-subtitle-1 py-1"><img src="@/assets/images/locator/v-icon.png" class="imageCustomTable img-fluid" /></td>
                                    </templates>
                                    
                                    <td class="text-subtitle-1">{{ item.addonName }}</td>
                                    <td class="text-subtitle-1">${{ item.addonPrice }}</td>                                
                                    <td>
                                        <div class="d-flex align-center">
                                            <v-tooltip text="Edit">
                                                <template v-slot:activator="{ props }">
                                                    <v-btn icon flat @click="editAddonItem(item)" v-bind="props"
                                                        ><PencilIcon stroke-width="1.5" size="20" class="text-primary"
                                                    /></v-btn>
                                                </template>
                                            </v-tooltip>
                                            <v-tooltip text="Delete">
                                                <template v-slot:activator="{ props }">
                                                    <v-btn icon flat @click="deleteAddonItem(item)" v-bind="props"
                                                        ><TrashIcon stroke-width="1.5" size="20" class="text-error"
                                                    /></v-btn>
                                                </template>
                                            </v-tooltip>
                                        </div>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </v-table>
                        <v-pagination v-model="page" :length="pageCount"></v-pagination>
                    </div>
                </v-window-item>
                <!-- <v-window-item value="Bills">
                    <BillsTab/>
                </v-window-item> -->
                <!-- <v-window-item value="Security">
                    <SecurityTab/>
                </v-window-item> -->
            </v-window>
        </v-card-text>
    </v-card>
    
</template>
