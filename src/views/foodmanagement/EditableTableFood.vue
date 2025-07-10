<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useContactStore } from '@/stores/apps/contact';

// import { VTable, VPagination } from '@/_mockApis/apps/contact';
const store = useContactStore();
const itemsPerPage = 10;
const currentPage = ref(1);
const new_loader = ref(false);
import BASE_URL from '@/stores/myVar';
import axios from 'axios';
axios.defaults.baseURL = BASE_URL
onMounted(() => {
    fetchfoodList();
    fetchCategories();
    fetchAddons();
    fetchKitchen();
});
const getContacts: any = computed(() => {
    return store.contacts;
});
const showLoader = ref(false)
let dishImage = '';
const showAdditionalFields = ref(false);
const valid = ref(true);
const dialog = ref(false);
const search = ref('');
// const itemsPerPage = ref(5)
const page = ref(1)
const dishCategory1 = ref(['Standard','Small', 'Medium', 'Large']);
const dishCategory = ref('');
const kitchens = ref();
const dishCategory12 = ref();
const filterOption = ref(['High on demand', 'on sale', 'featured vegan food']);
const desserts = ref();
const editedIndex = ref(-1);
const errormsg = ref('');
const switchValue= ref(false);

const editedItem = ref({
    id:'',
    dishName: '',
    price: '',
    vat:'',
    discount: '',
    dishCategory: [],
    components: '',
    dishImage: '',
    description:'',
    notes:'',
    size:[],
    price1:'',
    discount1:'',
    size1:[],
    price2:'',
    discount2:'',
    size2:[],
    addons:[],
    kitchen:[],
});
const defaultItem = ref({
    id:'',
    dishName: '',
    price: '',
    vat:'',
    discount: '',
    dishCategory: [],
    components: '',
    dishImage: '',
    description:'',
    notes:'',
    size:[],
    price1:'',
    discount1:'',
    size1:[],
    price2:'',
    discount2:'',
    size2:[],
    addons:[],
    kitchen:[],
});

const kitchenOptions = computed(()=>{
    const kit = kitchens.value; // Reference to your kitchens data
      return Object.keys(kit).map((key) => ({
        text: kit.name,
        value: kit.id,
      }));
});
const pageCount = computed(() => {
    return Math.ceil(filteredList.value.length / itemsPerPage.value) 
});

const switchLabel = computed(() => {
  return switchValue.value ? 'Off' : 'On'; // Change label based on the switch value
});

const filteredList = computed(() => {
    if (!Array.isArray(desserts.value)) return [];
    return desserts.value.filter((item: any) => {
        return item.dishName.toLowerCase().includes(search.value.toLowerCase());
    });
});

const paginatedList = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredList.value.slice(start, end);
});



function editItem(item: any) {
    fetchfoodList();
    editedIndex.value = desserts.value.indexOf(item);
    
    // Assign the dishCategory to the editedItem's dishCategory property
    editedItem.value.dishName = item.dishName;
    editedItem.value.dishImage = item.dishImage;

    
    editedItem.value = Object.assign({}, item);
    dialog.value = true;
}
function deleteItem(item: any) {
    const index = desserts.value.indexOf(item);
    // confirm('Are you sure you want to delete this item?') && desserts.value.splice(index, 1);
    submitDeleteForm(item.id);
}

function close() {
    dialog.value = false;
    setTimeout(() => {
        editedItem.value = Object.assign({}, defaultItem.value);
        editedIndex.value = -1;
    }, 300);
}
async function save() {
    if (editedIndex.value > -1) {
        Object.assign(desserts.value[editedIndex.value], editedItem.value);
        await editfood(editedItem.value.id); 
    } else {
        submitForm();
    }
    close();
}

const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'Add Food' : 'Edit Food';
});
const foodSwitchChange = ((value,food_id)=> {
    console.log('Switch Value ------------------:', value); // Log the current value of the switch
    console.log('Switch food_id ------------------:', food_id); // Log the current value of the switch
    app_food_items(value,food_id); // Call the function to send the value to the API
});

const app_food_items = async (value,food_id) =>{
    console.log('check the value ',value)
    console.log('check the food_id ',food_id)
    try{
        const tokenn = localStorage.getItem('authToken')
        const formdata = {
            token:tokenn,
            food_id:food_id,
            food_value:value,
        }
        console.log('here is app_food_items token ---',tokenn)
        const response = await axios.post('api/kitchen/app_food_items/',formdata);
        if (response.data){
            console.log('yaha tak to data aahi gya h bhai if k ander----')
        }else{
            console.log('else m data yaha tak aagya ----')
            
        }
    } catch(error:any){
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
      dishImage = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const submitForm = async () => {
    showLoader.value = true;
    try {
        const token = localStorage.getItem('authToken');
        const formdata = {
            token:token,
            dishName:editedItem.value.dishName,
            dishCategory:editedItem.value.dishCategory,
            kitchenname:editedItem.value.kitchen,
            price:editedItem.value.price,
            discount:editedItem.value.discount,
            vat:editedItem.value.vat,
            notesuntry:editedItem.value.notes,
            description:editedItem.value.description,
            // components:editedItem.value.components,
            dishImage:dishImage,
            // files:dishImage,
            addons:editedItem.value.addons,
            dish_size:editedItem.value.size,
            dish_size2:editedItem.value.size1,
            dish_discount2:editedItem.value.discount1,
            dish_price2:editedItem.value.price1,
            dish_size3:editedItem.value.size2,
            dish_discount3:editedItem.value.discount2,
            dish_price3:editedItem.value.price2,
        }
        const response = await axios.post('api/kitchen/food_management/',formdata);
        console.log('food management API response:', response.data);
        showLoader.value = false;
        if (response.data) {
            fetchfoodList();
            desserts.value = response.data;
        }else{
            showLoader.value = false;
            console.log("First Error")
        }
    } catch (error:any) {
        showLoader.value = false;
        console.error('API error:', error);
        if (error.response && error.response.data) {
            errormsg.value = error.response.data.error;
            setTimeout(() => {
                errormsg.value = ''
            }, 5000);
    }
}

}
const fetchfoodList = async () => {
    showLoader.value = true;
    new_loader.value = true;
    try {
        console.log("INSIDE TRY",valid.value)
        const token = localStorage.getItem('authToken');
        const response = await axios.post('api/kitchen/all_food_detais/',{'token':token});
        console.log('kitchen food API response:---------------', response.data);
        if (response.data) {
            showLoader.value = false;
            new_loader.value = false;
            const updatedData = response.data.map((item:any) => {
                console.log('check tha data is coming ---- ',item.food_for_app)
                const addons_var = item.addons.map((addon:any) => ({
                    text: addon.add_name,
                    value: addon.id,
                }));
                const isActive = item.food_for_app === 'Activate';
            return {
                id: item.id,
                dishName: item.dish_name,
                dishCategory: item.dish_categories.cat_name,
                kitchen: item.dish_categories.category,
                size: item.dish_size,
                size1: item.dish_size2,
                size2: item.dish_size3,
                price: item.dish_discount,
                addons: addons_var, // Change this line to use the addons_var array
                dish_size: item.dish_size,
                discount: item.dish_discount,
                discount1: item.dish_discount2,
                discount2: item.dish_discount3,
                vat: item.dish_vat_percentage,
                notes: item.dish_notes,
                description: item.dish_discripiton,
                dishImage: item.base64_images,
                switchValue: isActive,
                
                // dishImage: BASE_URL + item.images,
                // state: item.state,
                // country: item.country,
            };
        });

        console.log('updated data:---------', updatedData);
        desserts.value = updatedData;

        }else{
            showLoader.value = false;
            new_loader.value = false;
            console.log("First Error")
        }
    } catch (error) {
        showLoader.value = false;
        new_loader.value = false;
        console.error('API error:', error);
        
    }
}
const editfood = async (id:any) => {
    showLoader.value = true;
    try {
        const token = localStorage.getItem('authToken');
        const formdata = {
            token:token,
            kit_id:editedItem.value.id,
            dishName:editedItem.value.dishName,
            dishCategory:editedItem.value.dishCategory,
            price:editedItem.value.price,
            discount:editedItem.value.discount,
            vat:editedItem.value.vat,
            notesuntry:editedItem.value.notes,
            description:editedItem.value.description,
            // components:editedItem.value.components,
            dishImage:dishImage,
            // files:dishImage,
            addons:editedItem.value.addons,
            dish_size:editedItem.value.size,
            dish_size2:editedItem.value.size1,
            dish_discount2:editedItem.value.discount1,
            dish_price2:editedItem.value.price1,
            dish_size3:editedItem.value.size2,
            dish_discount3:editedItem.value.discount2,
            dish_price3:editedItem.value.price2,

        }
        console.log("CREATE",formdata)
        const response = await axios.post('api/kitchen/update_food/',formdata);
        console.log('update food API response: ---------------', response.data);
        //   router.push('/dashboards');
        const index = desserts.value.findIndex((item:any) => item.id === id);
        showLoader.value = false;
        if (response.data) {
            if (response.data.base64_images) {
                if (index !== -1) {
                    // Assign the base64_images value to the dishImage property
                    desserts.value[index].dishImage = response.data.base64_images;
                    console.log('Updated dishImage:', desserts.value[index].dishImage);

                    // You can also update the editedItem if needed
                    // editedItem.value.dishImage = response.data.base64_images;
                } else {
                     console.log('Index not found for the edited item');
                }
            } else {
                console.log("Image not found in API response");
            }
        }else{
            showLoader.value = false;
            console.log("First Error")
        }
    } catch (error) {
        showLoader.value = false;
        console.error('API error:', error);
    }
}
const submitDeleteForm = async (index:any) => {
    try {
        const token = localStorage.getItem('authToken');
        const formdata = {
            token:token,
            food_id:index,
        }
        const response = await axios.post('api/kitchen/delete_food/',formdata);
            console.log('delete_food API response:', response.data);
            if (response.data) {
                fetchfoodList()
                desserts.value.push(response.data);
            }else{
                console.log("First Error")
            }
    } catch (error) {
        console.error('API error:', error);
        
    }
}

const fetchCategories = async () => {
    try {
        // Make an API call to fetch the managers' data
        const token = localStorage.getItem('authToken');
        const formdata = {
        token:token
        }
        const response = await axios.post('api/kitchen/fetch_cate/',formdata);
        console.log("fetch cate RESPONSE",response.data);
        // dishCategory.value = response.data.map((m:any) => (`${m.cat_name}`));
        dishCategory.value = response.data.map((m:any) => ({text: `${m.cat_name}`,value: `${m.id}` }));
      } catch (error) {
        console.error('Error fetching managers:', error);
      }
    }
const fetchAddons = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const formdata = {
            token:token
        }
        const response = await axios.post('api/kitchen/fetch_addons/',formdata);
        // Assuming the response contains an array of managers with IDs and names
        console.log("RESPONSE",response.data);
        // dishCategory12.value = response.data.map((m:any) => (`${m.add_name} --- ${m.id} `));
        dishCategory12.value =response.data.map((m:any) => ({text: `${m.add_name}`,value: m.id }));
       
      } catch (error) {
        console.error('Error fetching managers:', error);
      }
    }
const fetchKitchen = async () => {
    try {
        // Make an API call to fetch the managers' data
        const token = localStorage.getItem('authToken');
        const urlToken = window.location.href.split('/').pop();
        const formdata = {
            token:token,
            url_token:urlToken,
        }
        const response = await axios.post('api/kitchen/all_kitchen/',formdata);
        console.log("RESPONSE Kitchen LIST",response.data);
        console.log("RESPONSE Kitchen LIST",typeof response.data);
        kitchens.value = response.data.kitchen.map((m:any) => (`${m.id}-${m.name}`));
      } catch (error) {
        console.error('Error fetching managers:', error);
      }
    }
</script>
<style scoped>
    .error-message {
    color: red;
    margin-top: 5px;
    margin-bottom: 10px;
    font-size: medium;
    }
</style>
<template>
    <p class="text-error">{{ errormsg }}</p>
    <v-row>
        <v-col cols="12" lg="4" md="4">
            <v-text-field density="compact" v-model="search" label="Search Food" hide-details variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="12" lg="4" md="4">
            <!-- <v-select variant="outlined" density="compact" hide-details :items="filterOption"  label="Filter"></v-select> -->
        </v-col>
        <v-col cols="12" lg="4" md="4" class="text-right">
            <v-dialog v-model="dialog" max-width="700">
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props" flat class="ml-auto">
                        <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Add Food
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title class="pa-4 bg-primary">
                        <span class="title text-white">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submitForm">
                            <v-row>
                                <!-- <v-col cols="12" sm="6">
                                    <v-text-field variant="outlined" hide-details v-model="editedItem.id" label="S No"></v-text-field>
                                </v-col> -->
                                <v-col cols="12" sm="12">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.dishName"
                                        label="Name"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="dishCategory"
                                        item-title="text"
                                        item-value="value"
                                        v-model="editedItem.dishCategory"
                                        label="Category"
                                    ></v-select>
                                    <!-- <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="dishCategory12"
                                        item-title="text"
                                        item-value="value"
                                        v-model="editedItem.addons"
                                        label="Select Addons"
                                        multiple
                                    ></v-select> -->
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="kitchens"
                                        v-model="editedItem.kitchen"
                                        label="Kitchen"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="dishCategory1"
                                        v-model="editedItem.size"
                                        label="Item Size"
                                    ></v-select>
                                </v-col>
                                <!-- <v-col cols="12" sm="4">
                                    <v-text-field
                                        variant="outlined"
                                        type="number"
                                        hide-details prepend-inner-icon="mdi-currency-usd"
                                        v-model="editedItem.price"
                                        label="Base Price"
                                    ></v-text-field>
                                </v-col> -->
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        type="number"
                                        hide-details prepend-inner-icon="mdi-currency-usd"
                                        v-model="editedItem.discount"
                                        label="Price"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="py-0">
                                    <v-checkbox v-model="showAdditionalFields" hide-details label="Add More Sizes"></v-checkbox>
                                </v-col>
                                    <!-- Additional Fields -->
                                    <v-col v-if="showAdditionalFields" cols="12" sm="6">
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="dishCategory1"
                                        v-model="editedItem.size1"
                                        label="Item Size"
                                    ></v-select>
                                    </v-col>
                                    <!-- <v-col v-if="showAdditionalFields" cols="12" sm="6">
                                        <v-text-field
                                            variant="outlined"
                                            hide-details prepend-inner-icon="mdi-currency-usd"
                                            v-model="editedItem.price1"
                                            label="Base Price"
                                            type="number"
                                        ></v-text-field>
                                    </v-col> -->
                                    <v-col v-if="showAdditionalFields" cols="12" sm="6">
                                        <v-text-field
                                            variant="outlined"
                                            hide-details prepend-inner-icon="mdi-currency-usd"
                                            v-model="editedItem.discount1"
                                            label="Offer Price"
                                            type="number"
                                        ></v-text-field>
                                    </v-col>
                                <v-col v-if="showAdditionalFields" cols="12" sm="6">
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="dishCategory1"
                                        v-model="editedItem.size2"
                                        label="Item Size"
                                    ></v-select>
                                    </v-col>
                                    <!-- <v-col v-if="showAdditionalFields" cols="12" sm="4">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details prepend-inner-icon="mdi-currency-usd"
                                        v-model="editedItem.price2"
                                        label="Base Price"
                                        type="number"
                                    ></v-text-field>
                                    </v-col> -->
                                    <v-col v-if="showAdditionalFields" cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details prepend-inner-icon="mdi-currency-usd"
                                        v-model="editedItem.discount2"
                                        label="Offer Price"
                                        type="number"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="dishCategory12"
                                        item-title="text"
                                        item-value="value"
                                        v-model="editedItem.addons"
                                        label="Select Addons"
                                        multiple
                                    ></v-select>
                                    </v-col>
                                <!-- <v-col cols="12" sm="4">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.vat"
                                        label="Vat %"
                                        type="number"
                                    ></v-text-field>
                                </v-col> -->
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.notes"
                                        label="Notes"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-textarea
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.description"
                                        label="Description"
                                    ></v-textarea>
                                </v-col>
                                <!-- <v-col cols="12" sm="12">
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
                                </v-col> -->
                                <v-col cols="12" sm="12">
                                    <v-file-input
                                    v-model="editedItem.dishImage"
                                    color="deep-purple-accent-4"
                                    label="Upload Image"
                                    accept="image/png, image/jpeg, image/jpg, image/webp"
                                    multiple
                                    placeholder="Select your files"
                                    prepend-inner-icon="mdi-camera"
                                    variant="outlined"
                                    :show-size="1000"
                                    class="inputFileUploadCstm"
                                    type="file"
                                    @change="handleImageUpload"
                                    >
                                    </v-file-input>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>

                    <v-card-actions class="pa-4">
                        <v-spacer></v-spacer>
                        <v-btn color="error" @click="close">Cancel</v-btn>
                        <v-btn
                            color="primary"
                            :disabled="editedItem.dishName === '' || editedItem.dishCategory === '' || editedItem.kitchen === ''  || editedItem.size === '' || editedItem.discount === '' || editedItem.description === ''"
                            variant="flat"
                            @click="save"
                            type="submit"
                            >
                            <template v-if="showLoader">
                                <div class="loaderBn"></div>Submitting
                            </template>
                            <template v-else>
                                Submit
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
        <v-table v-model:page="page" :items="filteredList" class="mt-5">
            <thead>
                <tr>
                    <th class="text-subtitle-1 font-weight-semibold">Image</th>
                    <th class="text-subtitle-1 font-weight-semibold">Name</th>
                    <th class="text-subtitle-1 font-weight-semibold">Category</th>
                    <th class="text-subtitle-1 font-weight-semibold">Total Price</th>
                    <th class="text-subtitle-1 font-weight-semibold">Notes</th>
                    <th class="text-subtitle-1 font-weight-semibold">Visibility</th>
                    <th class="text-subtitle-1 font-weight-semibold">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr  v-for="item in paginatedList" :key="item.id" :currentPage="currentPage" :pageSize="10">
                    <templates v-if="item.dishImage">
                        <td class="text-subtitle-1"><img :src="item.dishImage"  class="imageCustomTable img-fluid" /></td>
                    </templates>
                    <templates v-else>
                        <td class="text-subtitle-1 py-1"><img src="@/assets/images/locator/v-icon.png" class="imageCustomTable img-fluid" /></td>
                    </templates>

                    <td class="text-subtitle-1">{{ item.dishName }}</td>
                    
                    <td>
                        <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.dishCategory }}</span>
                    </td>
                    
                    <td>
                        <template v-if="item.discount === ''">
                            <span> <span class="text-subtitle-1">${{ item.price }}</span></span>
                            <span class="d-block">vat: {{ item.vat }}%</span>
                        </template>
                        <template v-else>
                            <span class="text-subtitle-1">${{ item.discount }}</span>
                        </template>
                    </td>
                    <td>
                        <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.notes }}</span>
                    </td>
                    <td>
                        <v-switch color="primary" v-model="item.switchValue" @update:model-value="(value) => foodSwitchChange(value, item.id)"
                            :label="item.switchLabel"></v-switch>
                    </td>
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
        <v-pagination v-model="currentPage" :length="Math.ceil(filteredList.length / itemsPerPage)"
            rounded="circle"></v-pagination>
    </div>
</template>
