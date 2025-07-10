<script setup lang="ts">
import { ref, computed, onMounted ,nextTick  } from 'vue';
// import vImageIcon from '@/assets/images/locator/v-icon.jpg';
import vImageIcon from '@/assets/images/locator/v-icon.jpg';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL;


const myerrors = ref('');
const showSuccessMessage            = ref(false);
const showErrorMessage              = ref(false);
const new_loader = ref(false);


const newsModal     = ref(false);
const newtitle      = ref("");
const newimage      = ref(null);
const all_news      =   ref([]);
const editedIndex   = ref(-1);

// const itemsPerPage  = 10;
const itemsPerPage  = 5;
const currentPage   = ref(1);



// For News Create
async function createNews(){
    try{
        if (!newtitle.value || !newimage.value ){
            showErrorMessage.value = true;
            myerrors.value = `Please Add Both Title and image.`;
            setTimeout(() => {
                showErrorMessage.value = false
            },3000);
            return;

        }
        const formData = new FormData();
        console.log("Title:", newtitle.value);
        console.log("Image:", newimage.value);

        formData.append("title", newtitle.value);
        formData.append("image", newimage.value);

        const response = await axios.post("api/v_super/news_feed/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("News created:", response.data);
        if (response.data.status === 'done'){
            showSuccessMessage.value = true;
            myerrors.value = `News Cretaed Successfully.`;

            resetFields();
            all_news_dta();
            setTimeout(() => {  
                showSuccessMessage.value = false  
            }, 3000);
        }
    }
    catch (error) {
        console.error("Error creating news:", error);
        alert("An error occurred while adding news.");
      }
}


// For select image when click
function onFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    newimage.value = file // Only store the file name
    console.log("Selected File Name:", file.value);
  }
}


// For close button
function resetFields() {
  newtitle.value = '';
  newimage.value = null;
  editedIndex.value = -1; 
  newsModal.value = false; 
}


// Clear any previous data when click edit news and then Add News
function openAddNewsModal() {
    resetFields(); 
    newsModal.value = true; 
}




// Fetch All the news
async function all_news_dta(){
    new_loader.value = true;
    const response = await axios.post("api/v_super/news_feed/")
    if (response.data.status === 'success'){
        new_loader.value = false;
        console.log(response.data,'aaaa----') 
        
        all_news.value = response.data.all_data.map((a:any,index:any)=> ({
            id : a.id,
            serial_no: `#${index + 1}`,
            // title : a.title,
            title: a.title.length > 50 ? a.title.substring(0, 50) + "..." : a.title,
            image : a.image

        }))
    }
    else {
        new_loader.value = false;
        console.log('First Error');
        }
}
all_news_dta()




// For create and edit both in same tab
const formTitle = computed(() => {
     return editedIndex.value === -1 ? 'New News' : 'Edit News';
 });




// For save button
async function save() {
    if (editedIndex.value > -1) {
        edit_news_details(editedIndex.value);
    } else {
        createNews();
    }
    
}


// For Edit News tab same as when create
async function editItem(item) {
    newtitle.value = item.title; 
    newimage.value = item.image; 
    editedIndex.value = item.id; 
    newsModal.value = true; 
}




// Function for edit news details 
async function edit_news_details(newsId){
    try{
        if (!newtitle.value && !newimage.value) {
            showErrorMessage.value = true;
            myerrors.value = `Please edit either the Title or the Image.`;
            setTimeout(() => {
                showErrorMessage.value = false;
            }, 3000);
            return; // Stop execution if no fields are updated
        }
        const formData = new FormData();
        formData.append('news_id',newsId)
        // formData.append('title',newtitle.value )
        // formData.append('image',newimage.value)
        if (newtitle.value) {
            formData.append('title', newtitle.value);
        }
        if (newimage.value) { // Only append the image if it's provided
            formData.append('image', newimage.value);
        }
        const response = await axios.post("api/v_super/news_feed/",formData);
        console.log('edit_news_details', response)
        if (response.data.status === 'update'){
            showSuccessMessage.value = true
            myerrors.value = `News Updated Successfully.`;

            resetFields();
            all_news_dta();
            setTimeout(() => {  
                showSuccessMessage.value = false  
            }, 3000);

        }else(console.log('error occure when edit'))
    }catch (error) {
        console.error('Invalid api');
    }
}



// for delete news
async function delete_news_details(item){
    try{
        // const formdata{
        //     news_id : item,
        //     new_delete : 'delete_news'
        // };
        const formdata = new FormData();
        formdata.append('item',item.id)
        const response = await axios.post("api/v_super/news_feed/",formdata);
        if (response.data.status === 'delete_sucsess'){
            showSuccessMessage.value = true
            myerrors.value = `News Delete Successfully.`;
            all_news_dta();
            setTimeout(() => {
                showSuccessMessage.value = false
            },3000);
            // resetFields();

        }else{
            console.log('Error occure when delete data.')
        }
    }catch (error) {
        console.error('Invalid api');
    }
}



// For pagination only 10 news in 1 page
const paginatedNews = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return all_news.value.slice(startIndex, endIndex);
});





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
    <v-col  cols="12" lg="" md="5" class="text-right">
      <v-dialog v-model="newsModal" max-width="700">
        <template v-slot:activator="{ props }">
          <!-- <v-btn color="primary" v-bind="props" flat class="ml-auto">
            <v-icon class="mr-2">mdi-plus</v-icon>Add News
          </v-btn> -->
          <v-btn color="primary" flat @click="openAddNewsModal">
            <v-icon class="mr-2">mdi-plus</v-icon>Add News
        </v-btn>
        </template>
        <v-card>
          <v-card-title class="pa-4 bg-primary">
            <!-- <span class="title text-white">Add News{{ formTitle }}</span> -->
            <span class="title text-white">{{ formTitle }}</span>
          </v-card-title>
  
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  variant="outlined"
                  hide-details
                  v-model="newtitle"
                  label="News Title"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <input
                type="file"
                id="newsImageInput"
                class="d-none"
                @change="onFileChange"
                accept="image/*"
                />
                <label for="newsImageInput" class="btn btn-primary">Choose News Image</label>
            </v-col>
            <v-col cols="12" v-if="newimage">
                <!-- Display only the selected image name -->
                <p class="mt-2"><strong>Selected Image:</strong> {{ newimage.name }}</p>
            </v-col>
            </v-row>
          </v-card-text>
  
          <v-card-actions class="pa-4">
            <v-spacer></v-spacer>
            <v-btn color="error" @click="resetFields">
              Cancel
            </v-btn>
            <!-- <v-btn color="primary" :disabled="!newtitle" @click="save"> -->
            <v-btn color="primary" :disabled="!newtitle && !newimage" @click="save">
          
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
    <v-row>
        <v-col cols="12">
            <div class="position-relative">
                    <div class="logoLoader tableLoader bg-Whitecustom" v-if="new_loader == true">
                        <div class="LogoVInnerImg">
                            <img src="@/assets/images/locator/v-icon.png" alt="logo-loader" />
                            <p class="">Please Wait...</p>
                        </div>
                    </div>
            <v-table>
                <thead>
                    <tr>
                        <th class="text-subtitle-1 font-weight-semibold">ID</th>
                        <th class="text-subtitle-1 font-weight-semibold">News Title</th>
                        <th class="text-subtitle-1 font-weight-semibold">Image</th>
                        <th class="text-subtitle-1 font-weight-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="paginatedNews.length > 0">
                    
                        <tr v-for="(item, index) in paginatedNews" :key="item.id"  >
                        <!-- <tr v-for="(item, index) in all_news" :key="item.id"> -->
                            <!-- <td class="text-subtitle-1">{{ item.id }}</td>  -->
                            <td class="text-subtitle-1">{{ item.serial_no  }}</td> <!-- Displaying Serial -->
                        <td>
                            <div class="ms-2">
                                <h4 class="text-subtitle-1 font-weight-semibold d-flex mb-1">
                                    <!-- <ChefHatIcon size="16" class="me-1" style="min-width: 17px" /> -->
                                    <span>{{ item.title }}</span>
                                </h4>
                            </div>
                        </td>
                        <td>
                            <div class="d-flex align-center py-4">
                                <div v-if="item.image">
                                    <!-- Use v-img to display the image -->
                                    <v-img :src="`${BASE_URL}${item.image}`" class="imageSizeFixd rounded-md img-fluid" />
                                </div>
                                <div v-else>
                                    <!-- Fallback image if no image exists -->
                                    <v-img :src="vImageIcon" class="imageSizeFixd rounded-md img-fluid" />
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="d-flex align-center">
                                <!-- <v-tooltip text="View">
                                    <template v-slot:activator="{ props }">
                                        <router-link :to="`/recipe_detail/${item.id}`" color="primary">
                                            <v-btn icon flat>
                                                <EyeIcon size="20" v-bind="props" class="text-primary" />
                                            </v-btn>
                                        </router-link>
                                    </template>
                                </v-tooltip> -->
                                <v-tooltip text="Edit">
                                    <template v-slot:activator="{ props }">
                                        <v-btn icon flat @click="editItem(item)" v-bind="props"
                                            ><PencilIcon stroke-width="1.5" size="20" class="text-primary"
                                        /></v-btn>
                                    </template>
                                </v-tooltip>
                                <v-tooltip text="Delete">
                                    <template v-slot:activator="{ props }">
                                        <v-btn icon flat @click="delete_news_details(item)" v-bind="props"
                                            ><TrashIcon stroke-width="1.5" size="20" class="text-error"
                                        /></v-btn>
                                    </template>
                                </v-tooltip>
                            </div>
                        </td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                        <td colspan="6">
                            <p class="text-center mt-6 mb-3">No Data Yet</p>
                        </td>
                    </tr>
                </template>
                </tbody>
                
            </v-table>
            </div>
        </v-col>
        <v-col cols="12">
            <v-pagination
                    color="primary"
                    v-model="currentPage"
                    :length="Math.ceil(all_news.length / itemsPerPage)"
                    rounded="circle"
            ></v-pagination>
        </v-col>

    </v-row>
  </template>
  
<!-- <style>
.dateFullWdth input[type='date'] {
    display: block;
}
.ProseMirror {
    min-height: 220px;
}
.progress-bar {
    width: 100%;
    background-color: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
}

.progress {
    height: 20px;
    background-color: #40b40f;
    width: 0;
    transition: width 0.3s;
}
.suggestions-list {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #fff;
    border: 1px solid #ccc;
    border-top: none;
    list-style: none;
    margin: 0;
    padding: 0;
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
}

.suggestions-list li {
    padding: 10px;
    cursor: pointer;
}

.suggestions-list li:hover {
    background: #f0f0f0;
}
.bg-Whitecustom {
    background: #fff !important;
}
.bg-Whitecustom img {
    width: 300px;
}
.error {
    color: red;
    font-size: 14px;
}
.required-asterisk {
    color: red; /* Change this to your preferred error color */
    margin-left: 4px; /* Optional: Adjust the spacing */
}

</style> -->