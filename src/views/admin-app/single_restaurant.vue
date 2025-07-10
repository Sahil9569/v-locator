<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import profileBg from '@/assets/images/backgrounds/profilebg.jpg';
import restuProfile from '@/assets/images/locator/restaurant-profile.jpg';
import vImageIcon from '@/assets/images/locator/v-icon.jpg';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL;
const modelTabFood = ref(0);
const imageUpload = ref(false);
const imageUpload1 = ref(false);
const productShowGallery = ref(false);
interface ImageFile {
    url: string;
    file: File;
}
const productImages = ref<ImageFile[]>([]);
const productImages1 = ref<ImageFile[]>([]);

const uploadImage = (e: Event, type: string) => {
    const selectedFiles = (e.target as HTMLInputElement).files;
    if (selectedFiles) {
        for (let i = 0; i < selectedFiles.length; i++) {
            const reader = new FileReader();
            reader.onload = () => {
                productImages.value.push({ url: reader.result as string, file: selectedFiles[i] });
            };
            reader.readAsDataURL(selectedFiles[i]);
        }
    }
};
const uploadImage1 = (e: Event, type: string) => {
    const selectedFiles = (e.target as HTMLInputElement).files;
    if (selectedFiles) {
        for (let i = 0; i < selectedFiles.length; i++) {
            const reader = new FileReader();
            reader.onload = () => {
                productImages1.value.push({ url: reader.result as string, file: selectedFiles[i] });
            };
            reader.readAsDataURL(selectedFiles[i]);
        }
    }
};

const removeImage = (index: number) => {
    console.log('check images id is coming or not', index);
    delete_image(index);
    productImages.value.splice(index, 1);
};
const removeImage1 = (index: number) => {
    console.log('check images id is coming or not', index);
    delete_image1(index);
    productImages1.value.splice(index, 1);
};
const photoAddedFuc = () => {
    // productImages.value.push(...uploadedImages.value)
    upload_image(productImages.value);
    imageUpload.value = false;
    productShowGallery.value = true;
};

const photoAddedFuc1 = () => {
    // productImages.value.push(...uploadedImages.value)
    upload_image1(productImages1.value);
    imageUpload1.value = false;
    productShowGallery.value = true;
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
        const response = await axios.post('api/v_super/res_delete_image/', formdata);
        if (response.data.status === 'delete_image') {
            get_images_restrurant();
        } else {
            console.log('Invalid response');
        }
    } catch (error) {
        console.error('API error:', error);
    }
};
const delete_image1 = async (image_id: any) => {
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
        const response = await axios.post('api/v_super/res_menu_delete_image/', formdata);
        if (response.data.status === 'delete_image') {
            get_menu_images_restrurant(); 
        } else {
            console.log('Invalid response');
        }
    } catch (error) {
        console.error('API error:', error);
    }
};

onMounted(() => {
    fetchOrderList();
    get_food_category();
    get_food_items();
    get_images_restrurant();
    get_menu_images_restrurant();
});


const valid = ref(true);
const imageShow = ref(false);
const validCat = ref(true);
const dialog = ref(false);
const categoryModal = ref(false);
const uploadedImages = ref<Array<{ url: string; file: File }>>([]);
const search = ref('');
const itemsPerPage = 11;
const currentPage = ref(1);
const dishCategory = ref(['Vegan food', 'Lunch Package', 'Maxican', 'Salad', 'Breakfast Favorites', 'Deli Classics', 'Grill Specials']);
// const dishCategory = ref([]);
console.log('dishCategory dishCategory',dishCategory)
const desserts = ref([]);
const dessertsCat = ref([]);

const editedIndex = ref(-1);
const editedItem = ref({
    dishName: '',
    price: '',
    vat: '',
    discount: '',
    dishCategory: '',
    components: '',
    dishImage: '',
    dishImage2: '',
    // description:'',
    notes: '',
    files: []
});
const defaultItem = ref({
    dishName: '',
    price: '',
    discount: '',
    dishCategory: '',
    components: '',
    dishImage: '',
    dishImage2: '',
    vat: '',
    rolestatus: '',
    // description:'',
    notes: '',
    files: []
});

console.log('Check the value of dessertsCat:', dessertsCat.value);
const editedIndexCat = ref(-1);
const editedItemCat = ref({
    catName: '',
    catFiles: null
});
const defaultItemCat = ref({
    catName: '',
    catFiles: null
});

// const imageStyle = computed(()=>{
//     return files.value = files.value
// })

//Methods
const pageCount = computed(() => {
    return Math.ceil(filteredList.value.length / itemsPerPage.value);
});
const pageCount1 = computed(() => {
    return Math.ceil(filteredListCat.value.length / itemsPerPage.value);
});

const filteredList = computed(() => {
    return desserts.value.filter((user: any) => {
        return user.dishName.toLowerCase().includes(search.value.toLowerCase());
    });
});

const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredList.value.slice(start, end);
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

function editItem(item: any) {
    editedIndex.value = desserts.value.indexOf(item);
    editedItem.value = Object.assign({}, item);
    dialog.value = true;
}

function deleteItem(item: any) {
    const index = desserts.value.indexOf(item);
    console.log('dsdsdsdsdsdsddsd', item);
    submit_food_deleteForm(item.id);
}

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
        console.log('check here id of --------------', editedItem.value);
        editfoodimage(editedItem.value);
    } else {
        submit_add_food();
        // desserts.value.push(editedItem.value);
    }
    close();
}

//Computed Property
const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'Add Food' : 'Edit Food';
});

const formTitleCat = computed(() => {
    return editedIndexCat.value === -1 ? 'Add Category' : 'Edit Category';
});




function editItemCat(item: any) {
    editedIndexCat.value = dessertsCat.value.indexOf(item);
    editedItemCat.value = Object.assign({}, item);
    categoryModal.value = true;
}

function deleteItemCat(item: any) {
    const index = dessertsCat.value.indexOf(item);
    delete_food_category(item);
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
        console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeee', editedItemCat.value);
        edit_food_category(editedItemCat.value);
    } else {
        dessertsCat.value.push(editedItemCat.value);
    }
    closeCat();
    if (currentImage.value.length > 3) {
        food_category(currentImage.value);
        currentImage.value[3] = '';
    }
}

const phone = ref('');
const category = ref('');
const email = ref('');
const website = ref('');
const address = ref('');
const resturant_name = ref('');
const permanent_closed = ref('');
const startime = ref('');
const endtime = ref('');
const about = ref('');

const upload_image = async (uploadedImages: any) => {
    const token_user = localStorage.getItem('authToken');
    const res_id = window.location.href.split('/').pop();
    console.log('fucntion challa -------------', res_id);
    const formData = new FormData();
    formData.append('token', token_user);
    formData.append('res_id', res_id);
    if (uploadedImages) {
        uploadedImages.forEach((image: any) => {
            formData.append('images', image.file);
        });
    }
    try {
        const response = await axios.post('api/v_super/upload_image_restrurant/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (response.data.status === 'upload_image') {
            get_images_restrurant();
        }
    } catch (error) {
        console.error('Error uploading images:', error);
    }
};

const upload_image1 = async (uploadedImages: any) => {
    const token_user = localStorage.getItem('authToken');
    const res_id = window.location.href.split('/').pop();
    console.log('fucntion challa -------------', res_id);
    const formData = new FormData();
    formData.append('token', token_user);
    formData.append('res_id', res_id);
    if (uploadedImages) {
        uploadedImages.forEach((image: any) => {
            formData.append('images', image.file);
        });
    }
    try {
        const response = await axios.post('api/v_super/upload_menu_image_restrurant/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (response.data.status === 'upload_image') {
            get_menu_images_restrurant();
        }
    } catch (error) {
        console.error('Error uploading images:', error);
    }
};

const get_images_restrurant = async () => {
    try {
        const token_user = localStorage.getItem('authToken');
        const res_id = window.location.href.split('/').pop();
        const formdata = {
            token: token_user,
            res_id: res_id
        };
        const response = await axios.post('api/v_super/get_images_restrurant/', formdata);
        const get_images = response.data.get_images_restrurant;
        console.log('here is an images', get_images);
        const updatedData = get_images.map((item: any, index: any) => {
            return {
                id: item.id,
                file: `${BASE_URL}${item.res_images}`
            };
        });
        productImages.value = updatedData;
        console.log('check the data here--', productImages.value);
    } catch (error) {
        console.error('API error:', error);
    }
};

const get_menu_images_restrurant = async () => {
    try {
        const token_user = localStorage.getItem('authToken');
        const res_id = window.location.href.split('/').pop();
        const formdata = {
            token: token_user,
            res_id: res_id
        };
        const response = await axios.post('api/v_super/get_menu_images_restrurant/', formdata);
        const get_images = response.data.get_images_restrurant;
        console.log('here is an images ------------------', get_images);
        const updatedData = get_images.map((item: any, index: any) => {
            return {
                id: item.id,
                file: `${BASE_URL}${item.res_images}`
            };
        });
        productImages1.value = updatedData;
        console.log('check the data here--', productImages1.value);
    } catch (error) {
        console.error('API error:', error);
    }
};

const fetchOrderList = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const res_id = window.location.href.split('/').pop();
        const formData = {
            token: token,
            res_id: res_id,
            single_lv_5: 'single_res_details'
        };
        const response = await axios.post('api/v_super/a_details/', formData);
        console.log('fetch order details _________', response.data);
        if (response.data.status === 'single_res_details') {
            const coming_data = response.data.resturant;
            // const categoryNames  = coming_data.category.map(c => c.name).join(', ');
            phone.value             = coming_data.phone_number;
            category.value          = coming_data.category;
            email.value             = coming_data.email;
            website.value           = coming_data.website;
            address.value           = coming_data.address;
            startime.value          = coming_data.timings;
            about.value             = coming_data.about;
            resturant_name.value    = coming_data.restaurant_name;
            currentImage.value[0]   = coming_data.image;
            currentImage1.value[0]  = coming_data.image2;
            permanent_closed.value  = coming_data.permanent_closed
        }
        if (response.data.status === 'single_res_details') {
            const dta_coming = response.data.food_serializer;
            const updatedData = dta_coming.map((item: any, index: any) => {
                return {
                    id: item.id,
                    dishName: item.food_name,
                    price: `${item.food_price}`,
                    dishCategory: item.food_categories,
                    dishImage: item.images,
                    dishImage2: item.images2,
                    notes: item.food_notes
                };
            });
            desserts.value = updatedData;
        } else {
            console.log('First Error');
        }
    } catch (error) {
        console.error('API error:', error);
    }
};

const submit_food_deleteForm = async (item: any) => {
    // showLoader.value = true;
    console.log('check the data into the form', item);
    try {
        const token = localStorage.getItem('authToken');
        const formdata = {
            token: token,
            food_id: item,
            lv_7: 'submit_food_deleteform'
        };
        console.log('this is what formdata', formdata);

        const response = await axios.post('/api/v_super/restaurant_detail/', formdata);

        if (response.data.status === 'delete_food') {
            fetchOrderList();
            close();
        } else {
            console.log('First Error');
        }
    } catch (error) {
        // showLoader.value = false;
        console.error('API error:', error);
    }
};

function base64ToBlob(base64Data: any) {
    const byteString = atob(base64Data.split(',')[1]); // Get the binary data
    const mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0]; // Get the MIME type
    const ab = new ArrayBuffer(byteString.length); // Create an array buffer
    const ia = new Uint8Array(ab); // Create a Uint8 array

    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i); // Convert binary data to Uint8Array
    }

    return new Blob([ia], { type: mimeString }); // Create a Blob
}

const submit_add_food = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const res_id = window.location.href.split('/').pop();
        const formdata = new FormData();

        // Add standard form fields
        formdata.append('token', token);
        formdata.append('res_id', res_id);
        formdata.append('dishName', editedItem.value.dishName);
        formdata.append('price', editedItem.value.price);
        formdata.append('vat', editedItem.value.vat);
        formdata.append('discount', editedItem.value.discount);
        formdata.append('dishCategory', editedItem.value.dishCategory);
        formdata.append('components', editedItem.value.components);
        formdata.append('dishimage', editedItem.value.files);
        formdata.append('notes', editedItem.value.notes);
        // formdata.append('description', editedItem.value.description);
        formdata.append('lv_6', 'submit_add_food');

        // Convert base64 image to Blob and append to FormData
        if (currentImage.value.length > 0 && currentImage.value[2]) {
            const imageBlob = base64ToBlob(currentImage.value[2]); // Convert to Blob
            formdata.append('uploaded_image', imageBlob, 'image.jpeg'); // Append image with a filename
        }
        const response = await axios.post('/api/v_super/restaurant_detail/', formdata);
        if (response.data.status === 'add_food') {
            fetchOrderList();
            close();
        } else {
            console.log('First Error');
        }
    } catch (error) {
        console.error('API error:', error);
    }
};

const get_food_category = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const formdata = new FormData();
        formdata.append('token', token);

        const response = await axios.post('api/v_super/get_food_category/', formdata);
        if (response.data.status === 'get_food_category') {
            console.log('check the category of food --------------',response.data)
            const updatedData = response.data.data.map((item: any, index: any) => {
                return {
                    id: item.id,
                    catName: item.name,
                    catFiles: item.food_images
                };
            });
            
            dessertsCat.value = updatedData;
            const updatedDaata = response.data.data.map((item:any) => item.name);
            dishCategory.value = updatedDaata;
            
        }
    } catch (error) {
        console.error('API error:', error);
    }
};

const food_category = async (f_images: any) => {
    try {
        const token = localStorage.getItem('authToken');
        const catName = editedItemCat.value.catName;

        const formdata = new FormData();

        formdata.append('token', token);
        formdata.append('catName', catName);
        formdata.append('catFiles', f_images[3]);

        const response = await axios.post('api/v_super/food_category/', formdata);
        if (response.data.status === 'food_created') {
            get_food_category();
        } else {
        }
    } catch (error) {
        console.error('API error:', error);
    }
};

const delete_food_category = async (cat_id: any) => {
    try {
        console.log('yaha se chekc krna h data aaehga nahi', cat_id.id);
        const token = localStorage.getItem('authToken');
        const formdata = new FormData();
        formdata.append('token', token);
        formdata.append('cat_id', cat_id.id);

        const response = await axios.post('api/v_super/delete_food_category/', formdata);
        if (response.data.status === 'delete_food_category') {
            console.log('check here the form data ------------', response.data);
            get_food_category();
        }
    } catch (error) {
        console.error('API error:', error);
    }
};

const get_food_items = async () => {
    console.log('challa mera fucntion ---------');
    try {
        const token = localStorage.getItem('authToken');
        const res_id = window.location.href.split('/').pop();
        console.log('challa mera fucntion  AGISN---------',res_id);

        const formdata = new FormData();
        formdata.append('token', token);
        formdata.append('res_id', res_id);

        const response = await axios.post('api/v_super/get_food_items/', formdata);
        if (response.data.status === 'get_food_items') {
            console.log('check here the form get_food_items ------------', response.data);
            const updatedData = response.data.data.map((item: any, index: any) => {
                return {
                    id: item.id,
                    dishName: item.food_name,
                    dishImage: item.images,
                    dishImage2: item.images2,
                    dishCategory: item.food_categories,
                    price: item.food_price,
                    notes: item.food_notes
                };
            });
            desserts.value = updatedData;
        }
    } catch (error) {
        console.error('API error:', error);
    }
};
const editfoodimage = async (food_id: any) => {
    try {
        const token = localStorage.getItem('authToken');
        const formdata = new FormData();
        formdata.append('token', token);
        formdata.append('food_id', food_id.id);
        formdata.append('foodName', food_id.dishName);
        formdata.append('dishCategory', food_id.dishCategory);
        formdata.append('price', food_id.price);
        formdata.append('notes', food_id.notes);
        formdata.append('foodFile', currentImage.value[2]);

        const response = await axios.post('api/v_super/editfoodimage/', formdata);
        if (response.data.status === 'editfoodimage') {
            get_food_items();
        }
    } catch (error) {
        console.error('API error:', error);
    }
};
const edit_food_category = async (cat_id: any, f_images: any) => {
    try {
        console.log('yaha ka dat akessa h--------------', cat_id);
        console.log('yaha ka dat akessa h f_images f_images--------------', f_images);
        const token = localStorage.getItem('authToken');
        const catName = cat_id.catName;

        const formdata = new FormData();

        formdata.append('token', token);
        formdata.append('catName', catName);
        formdata.append('cat_id', cat_id.id);
        formdata.append('catFiles', f_images[3]);

        const response = await axios.post('api/v_super/edit_food_category/', formdata);
        if (response.data.status === 'edit_food_category') {
            get_food_category();
        } else {
        }
    } catch (error) {
        console.error('API error:', error);
    }
};



const currentImage = ref<string[]>([restuProfile, profileBg, vImageIcon]); // Default image URL
const currentImage1 = ref<string[]>([restuProfile, profileBg, vImageIcon]); // Default image URL

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

const handleImageUpload1 = (event: any, index: any) => {
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
                        single_recipe_profile_update(currentImage.value[0]);
                        break;
                    default:
                        break;
                }
            }
        };
        reader.readAsDataURL(input.files[0]);
    }
};

const single_recipe_profile_update = async (file: any) => {
    const token = localStorage.getItem('authToken');
    const res_id = window.location.href.split('/').pop();
    const formData = new FormData();
    formData.append('token', token);
    formData.append('file', file); // Append the file itself
    formData.append('res_id', res_id);
    const response = await axios.post('api/v_super/single_recipe_profile_update/', formData);
    if (response.data.status === 'single_recipe_profile_update') {
        get_food_category();
        fetchOrderList();
    }
};

const bulkUpload = ref(false);
const blukForm2 = ref('');
const selectedFile2 = ref<File | null>(null);
const barprogress = ref(false);
const uploading = ref(false);

const handleFileUpl = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
        selectedFile2.value = target.files[0];
    }
};
const successFul = ref(false);
const progress = ref(0);
const file_cancel = ref(false);

const props = defineProps<{
    progress: number;
}>();

function increaseProgress() {
    if (progress.value < 90) {
        progress.value += 1; // Increment progress by 1
    } else {
        clearInterval(intervalId); // Stop the interval once progress reaches 100
    }
}
const intervalId = setInterval(increaseProgress, 90); // Increase progress every 100 milliseconds

const uploadFileTorestaurant = async () => {
    if (!selectedFile2.value) return;
    uploading.value = true; // Show the progress bar
    const intervalId = setInterval(increaseProgress, 90); // Increase progress every 90 milliseconds

    const token_user = localStorage.getItem('authToken');
    const formData = new FormData();
    formData.append('file', selectedFile2.value);
    formData.append('token', token_user);
    try {
        const response = await axios.post('api/v_super/fileUpload/', formData);
        if (response) {
            progress.value = 37; // Set progress to 100% after successful upload
            barprogress.value = true;

            clearInterval(intervalId);
            setTimeout(() => {
                progress.value = 100;
            }, 2000);
            setTimeout(() => {
                successFul.value = true;
            }, 3000);

            await new Promise((resolve) => setTimeout(resolve, 3000));
            bulkUpload.value = false;

            setTimeout(() => {
                successFul.value = false;
                barprogress.value = false; // Set progress to 100% after successful upload
            }, 5000);
            fetchOrderList();
        }
    } catch (error) {
        file_cancel.value = true;
        setTimeout(() => {
            file_cancel.value = false;
            bulkUpload.value = false; // Set progress to 100% after successful upload
        }, 4000);
        console.error('Error uploading file:', error);
    }
    selectedFile2.value = null;
};
const downloadFile = () => {
    const filePath = '/assets/images/Food.xlsx';
    const fileName = 'Food.xlsx';
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const selectedImage = ref(null);

const clickFunModal = (item: any) => { 
    // console.log('gdfgdfgdfgdf',item)
    selectedImage.value = item
    imageShow.value = true
}

</script>

<template>
    <!-- <ProfileBanner /> -->
    <v-card elevation="10" class="overflow-hidden">
        <!-- <label for="logoImageLbl1" class="labelStImgPro">
            <PencilIcon size="22" color="primary" class="text-primary" />
            <input type="file" id="logoImageLbl1" class="d-none" @change="handleImageUpload($event, 1)" accept="image/*" />
        </label> -->
        <div class="imageSizeMain profileFullImageTop">
            <img :src="currentImage[1]" alt="Uploaded Image" />
        </div>
        <!-- <img :src="profileBg" alt="profile" class="w-100 d-flex" /> -->
    </v-card>
    <v-row class="mt-4">
        <v-col cols="12" lg="4" md="4">
            <v-row>
                <v-col cols="12">
                    <v-card variant="outlined">
                        <v-card-item class="pa-0">
                            <div class="imageGroupMain businessGroup withoutRadius">
                                <label for="logoImageLbl0" class="labelStImgPro">
                                    <PencilIcon size="22" color="primary" class="text-primary" />
                                    <input
                                        type="file"
                                        id="logoImageLbl0"
                                        class="d-none"
                                        @change="handleImageUpload1($event, 0)"
                                        accept="image/*"
                                    />
                                </label>
                                <!-- <div class="imageSizeMain restaurantImagePro h-auto" v-if="currentImage1[0]">
                                    <img :src="currentImage1[0]" alt="Uploaded Image" />
                                </div> -->
                                <div v-if="currentImage[0]">
                                    <img
                                        :src="`${BASE_URL}${currentImage[0]}`"
                                        alt="Uploaded Image"
                                        style="width: 100%"
                                        class="imageSizeFixd rounded-md img-fluid"
                                    />
                                </div>
                                <div v-else>
                                    <v-img :src="vImageIcon" style="width: 100%" class="imageSizeFixd rounded-md img-fluid" />
                                </div>
                            </div>
                            <div class="pa-4">
                                <h4 class="text-h5 d-flex align-center">
                                    <BuildingCommunityIcon size="22" color="primary" class="text-primary me-2" />
                                    <span>{{ resturant_name }}</span>
                                </h4>
                                
                                <h4 v-if="permanent_closed" class="text-subtitle-1 font-weight-semibold text-error">The restaurant has been permanently closed.
                                </h4>

                                <p class="my-5 text-subtitle-1 lh-md">
                                    {{ about }}
                                </p>
                                <div class="pb-3 border-bottom mb-3">
                                    <h4 class="mb-2">Categories:</h4>
                                    <template v-for="(catIndex, index) in category" :key="index">
                                        <v-chip color="primary" class="ma-1" size="small" label v-if="catIndex.name !== ''">
                                            {{ catIndex.name }}
                                        </v-chip>
                                    </template>
                                </div>
                                <h4 class="mb-4">Contact Info:</h4>
                                <div class="d-flex gap-3 mb-3">
                                    <PhoneIcon size="18" />
                                    <span class="text-subtitle-1 font-weight-semibold">{{ phone }}</span>
                                </div>
                                <div class="d-flex gap-3 mb-3">
                                    <MailIcon size="18" />
                                    <span class="text-subtitle-1 font-weight-semibold">{{ email }}</span>
                                </div>
                                <div class="d-flex gap-3 mb-3">
                                    <WorldIcon size="18" />
                                    <span class="text-subtitle-1 font-weight-semibold">{{ website }}</span>
                                </div>
                                <div class="d-flex gap-3 mb-1">
                                    <MapPinIcon size="18" />
                                    <span class="text-subtitle-1 font-weight-semibold">{{ address }}</span>
                                </div>
                                <br />
                                <hr class="fade-effect" />
                                <h4 class="mb-2 mt-3">Timings:</h4>
                                <div v-if="startime.length > 0">
                                    <div class="d-flex gap-3 mb-1" v-for="time in startime" :key="startime.id">
                                        <ClockIcon size="18" />
                                        <span class="text-subtitle-1 font-weight-semibold"
                                            >{{ time.day }} - {{ time.opening_hours.slice(0, 5) }} - {{ time.closing_hours.slice(0, 5) }}
                                        </span>
                                    </div>
                                </div>
                                <div v-else>
                                    <p class="text-center">No Timing's Available</p>
                                </div>
                            </div>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
             <v-row>
                <v-col cols="12">
                    <v-card variant="outlined">
                        <v-card-item>
                            <v-row>
                                <v-col cols="col">
                                    <h6 class="text-h6 mb-4">Menu Image's</h6>
                                </v-col>
                                <v-col cols="auto">
                                    <v-btn color="primary" @click="imageUpload1 = true">+ Add Photos</v-btn>
                                    <v-dialog v-model="imageUpload1" max-width="900">
                                        <v-card>
                                            <v-card-text>
                                                <h3 class="text-h5 mt-5 mb-3">Upload Menu Image's Gallery</h3>
                                                <div class="">
                                                    <label for="file-upload" class="labelStyleImage">
                                                        <input
                                                            id="file-upload"
                                                            type="file"
                                                            multiple
                                                            @change="uploadImage1($event, 'image')"
                                                            accept="image/*"
                                                        />
                                                        <div class="innrContentTitle">
                                                            <span class="iconTitleUpld d-block text-center">
                                                                <PlusIcon size="24" />
                                                            </span>
                                                            Add New Photos
                                                        </div>
                                                    </label>
                                                    <div class="mainImageRow mt-4" v-if="productImages1.length > 0">
                                                        <div class="image-holder" v-for="(image, index) in productImages1" :key="index">
                                                            <template v-if="image.url">
                                                                <img :ref="'image' + index" alt="" :src="image.url" />
                                                                <button type="button" class="btnTrash" @click="removeImage1(image.id, 'image')">
                                                                    <TrashIcon size="18" color="white" />
                                                                </button>
                                                            </template>
                                                            <template v-else>
                                                                <img :ref="'image' + index" alt="" :src="image.file" />
                                                                <button type="button" class="btnTrash" @click="removeImage1(image.id, 'image')">
                                                                    <TrashIcon size="18" color="white" />
                                                                </button>
                                                            </template>
                                                        </div>
                                                    </div>
                                                </div>
                                            </v-card-text>
                                            <v-card-actions class="pa-4">
                                                <v-spacer></v-spacer>
                                                <v-btn @click="imageUpload1 = false" color="error">Cancel</v-btn>
                                                <v-btn color="primary" variant="flat" @click="photoAddedFuc1()">Save Album</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-col>
                                <template v-if="productImages1">
                                    <div class="mainInnerGalryCrd">
                                        <div class="mainImageRow mt-4 ms-4">
                                            <div class="image-holder w-33-custom" v-for="(image, index) in productImages1" :key="index">

                                                <img  @click="clickFunModal(image)" :ref="'image' + index" alt="" :src="image.file" />

                                                <v-dialog v-model="imageShow" max-width="500">
                                                    <v-card>
                                                        <div class="py-3 d-flex justify-end pe-3">
                                                            <v-btn @click="imageShow = false" color="red" class="close-btn" variant="flat">
                                                                Close
                                                            </v-btn>
                                                        </div>
                                                        <v-card-text class="pa-0 d-flex justify-center align-center">
                                                            <div class="image-container">
                                                                <img v-if="selectedImage" :alt="`Image ${selectedImage.id}`" :src="selectedImage.file" />
                                                            </div>
                                                        </v-card-text>
                                                    </v-card>
                                                </v-dialog>
                                                <button type="button" class="btnTrash" @click="removeImage1(image.id, 'image')">
                                                    <TrashIcon size="18" color="white" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template v-else>
                                    <p class="text-center">No Images Uploaded Yet</p>
                                </template>
                            </v-row>

                            
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-card variant="outlined">
                        <v-card-item>
                            <v-row>
                                <v-col cols="col">
                                    <h4 class="text-h4 mb-4">Gallery</h4>
                                </v-col>
                                <v-col cols="auto">
                                    <v-btn color="primary" @click="imageUpload = true">+ Add Photos</v-btn>
                                    <v-dialog v-model="imageUpload" max-width="900">
                                        <v-card>
                                            <v-card-text>
                                                <h3 class="text-h5 mt-5 mb-3">Upload Your Gallery</h3>
                                                <div class="">
                                                    <label for="file-upload" class="labelStyleImage">
                                                        <input
                                                            id="file-upload"
                                                            type="file"
                                                            multiple
                                                            @change="uploadImage($event, 'image')"
                                                            accept="image/*"
                                                        />
                                                        <div class="innrContentTitle">
                                                            <span class="iconTitleUpld d-block text-center">
                                                                <PlusIcon size="24" />
                                                            </span>
                                                            Add New Photos
                                                        </div>
                                                    </label>
                                                        <div class="mainImageRow mt-4 ms-4" v-if="productImages.length > 0">
                                                        <div class="image-holder" v-for="(image, index) in productImages" :key="index">
                                                            <template v-if="image.url">
                                                                <img :ref="'image' + index" alt="" :src="image.url" />
                                                                <button type="button" class="btnTrash" @click="removeImage(image.id, 'image')">
                                                                <TrashIcon size="18" color="white" />
                                                                </button>
                                                            </template>
                                                            <template v-else>
                                                                <img :ref="'image' + index" alt="" :src="image.file" />
                                                                <button type="button" class="btnTrash" @click="removeImage(image.id, 'image')">
                                                                <TrashIcon size="18" color="white" />
                                                                </button>
                                                            </template>
                                                            
                                                            
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </v-card-text>
                                            <v-card-actions class="pa-4">
                                                <v-spacer></v-spacer>
                                                <v-btn @click="imageUpload = false" color="error">Cancel</v-btn>
                                                <v-btn color="primary" variant="flat" @click="photoAddedFuc()">Save Album</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-col>
                                <template v-if="productImages">
                                    <div class="mainInnerGalryCrd">
                                        <div class="mainImageRow mt-4">
                                            <div class="image-holder w-33-custom" v-for="(image, index) in productImages" :key="index">
                                                <img :ref="'image' + index" alt="" :src="image.file" />
                                                <button type="button" class="btnTrash" @click="removeImage(image.id, 'image')">
                                                    <TrashIcon size="18" color="white" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template v-else>
                                    <p class="text-center">No Images Uploaded Yet</p>
                                </template>
                            </v-row>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12" lg="8" md="8">
            <v-card elevation="10" class="" rounded="md">
                <v-tabs
                    v-model="modelTabFood"
                    bg-color="primary"
                    next-icon="mdi-arrow-right-bold-box-outline"
                    prev-icon="mdi-arrow-left-bold-box-outline"
                    show-arrows
                >
                    <v-tab value="foodData"> Add Food </v-tab>
                    <v-tab value="categoryData"> Add Food Category </v-tab>
                </v-tabs>
                <v-card-text class="pa-3">
                    <v-window v-model="modelTabFood">
                        <v-window-item value="foodData">
                            <v-row>
                                <v-col cols="12" lg="5" md="4">
                                    <v-text-field
                                        density="compact"
                                        v-model="search"
                                        label="Search Food"
                                        hide-details
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" lg="7" md="8" class="text-right">
                                    <v-dialog v-model="bulkUpload" max-width="600">
                                        <template v-slot:activator="{ props }">
                                            <v-btn color="primary" v-bind="props" flat class="ml-auto me-2">
                                                <v-icon class="mr-2">mdi-plus</v-icon>Bulk Upload
                                            </v-btn>
                                        </template>
                                        <v-card>
                                            <v-card-title class="pa-4 bg-primary">
                                                <div class="d-flex align-center gap-2 flex-wrap">
                                                    <span class="title text-white">Bulk File Upload</span>
                                                    <div class="ml-auto">
                                                        <v-btn @click="downloadFile" color="white" flat class="text-primary" target="_blank"
                                                            ><DownloadIcon class="text-primary mr-1" size="16" /> Sample Download</v-btn
                                                        >
                                                    </div>
                                                </div>
                                            </v-card-title>

                                            <v-card-text>
                                                <v-form ref="form" v-model="blukForm2" lazy-validation>
                                                    <v-row>
                                                        <v-col cols="12">
                                                            <label for="bulFileId" class="uploadFileBulk">+ Upload Your File</label>
                                                            <input id="bulFileId" type="file" @change="handleFileUpl" />
                                                            <div v-if="selectedFile2">Selected File: {{ selectedFile2.name }}</div>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row>
                                                        <v-col>
                                                            <div class="progress-bar" v-if="barprogress">
                                                                <div class="progress" :style="{ width: progress + '%' }"></div>
                                                            </div>
                                                        </v-col>
                                                    </v-row>
                                                </v-form>
                                            </v-card-text>
                                            <v-card-actions class="pa-4">
                                                <v-spacer></v-spacer>
                                                <v-btn color="error" @click="bulkUpload = false">Cancel</v-btn>
                                                <v-btn
                                                    color="primary"
                                                    :disabled="selectedFile2 == null"
                                                    variant="flat"
                                                    @click="uploadFileTorestaurant()"
                                                    >Save</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                    <v-dialog v-model="dialog" max-width="700">
                                        <template v-slot:activator="{ props }">
                                            <v-btn color="primary" v-bind="props" flat class="ml-auto">
                                                <v-icon class="mr-2">mdi-plus</v-icon>Add Food
                                            </v-btn>
                                        </template>
                                        <v-card>
                                            <v-card-title class="pa-4 bg-primary">
                                                <span class="title text-white">{{ formTitle }}</span>
                                            </v-card-title>
                                            <v-card-text>
                                                <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit_add_food">
                                                    <v-row>
                                                        <v-col cols="12" sm="6">
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
                                                                v-model="editedItem.dishCategory"
                                                                label="Category"
                                                                item-text="text"   
                                                                item-value="value" 
                                                            ></v-select>
                                                        </v-col>
                                                        <v-col cols="12" sm="6">
                                                            <v-text-field
                                                                variant="outlined"
                                                                hide-details
                                                                prepend-inner-icon="mdi-currency-usd"
                                                                v-model="editedItem.price"
                                                                label="Price"
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="6">
                                                            <v-text-field
                                                                variant="outlined"
                                                                hide-details
                                                                v-model="editedItem.notes"
                                                                label="Notes"
                                                            ></v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" sm="12">
                                                            <div class="">
                                                                <label for="logoImageLbl2" class="imageUploadRestu">
                                                                    <span class="text-primary text-subtitle-1">Upload Your Food Photo</span>
                                                                    <input
                                                                        type="file"
                                                                        id="logoImageLbl2"
                                                                        class="d-none"
                                                                        @change="handleImageUpload($event, 2)"
                                                                        accept="image/*"
                                                                    />
                                                                </label>
                                                                <div class="restuImageShowList" v-if="currentImage.length > 0">
                                                                    <img :src="currentImage[2]" alt="Uploaded Image" />
                                                                </div>
                                                            </div>
                                                        </v-col>
                                                    </v-row>
                                                </v-form>
                                            </v-card-text>
                                            <v-card-actions class="pa-4">
                                                <v-spacer></v-spacer>
                                                <v-btn color="error" @click="close">Cancel</v-btn>
                                                <v-btn
                                                    color="primary"
                                                    :disabled="editedItem.dishName == '' || editedItem.dishCategory == ''"
                                                    variant="flat"
                                                    @click="save"
                                                    >Save</v-btn
                                                >
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-col>
                                <div>
                                    <v-dialog v-model="successFul" max-width="400" class="p-0">
                                        <v-card class="p-0" style="background-color: #f7f7f7">
                                            <v-card-text class="py-0 px-0 text-center">
                                                <img src="@/assets/images/locator/success.gif" style="width: 320px" />
                                                <h3 class="text-center pb-3">Upload Successful</h3>
                                            </v-card-text>
                                        </v-card>
                                    </v-dialog>
                                </div>
                                <div>
                                    <v-dialog v-model="file_cancel" max-width="400" class="p-0">
                                        <v-card class="p-0">
                                            <v-card-text class="py-0 px-0 text-center">
                                                <img src="@/assets/images/locator/cancel.gif" style="width: 320px" />
                                                <h3 class="text-center pb-3">File Format Must Be in Excel...</h3>
                                            </v-card-text>
                                        </v-card>
                                    </v-dialog>
                                </div>
                            </v-row>
                            <v-table :items="paginatedItems" :currentPage="currentPage" :pageSize="5" class="mt-5">
                                <thead>
                                    <tr>
                                        <th class="text-subtitle-1 font-weight-semibold">Image</th>
                                        <th class="text-subtitle-1 font-weight-semibold">Name</th>
                                        <th class="text-subtitle-1 font-weight-semibold">Category</th>
                                        <th class="text-subtitle-1 font-weight-semibold">Total Price</th>
                                        <th class="text-subtitle-1 font-weight-semibold">Notes</th>
                                        <th class="text-subtitle-1 font-weight-semibold">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in filteredList" :key="item.id">
                                        <td class="text-subtitle-1 py-2">
                                            <template v-if="item.dishImage">
                                                <img :src="`${BASE_URL}${item.dishImage}`" class="imageCustomTable img-fluid" />
                                            </template>
                                            <template v-else>
                                                <v-img :src="vImageIcon" class="3333 imageSizeFixd rounded-md img-fluid" />
                                            </template>
                                        </td>
                                        <td class="text-subtitle-1">{{ item.dishName }}</td>

                                        <td class="text-subtitle-1">{{ item.dishCategory }}</td>
                                        <td class="text-subtitle-1">${{ item.price }}</td>
                                        <td class="text-subtitle-1">{{ item.notes }}</td>

                                        <td>
                                            <div class="d-flex align-center">
                                                <v-tooltip text="Edit">
                                                    <template v-slot:activator="{ props }">
                                                        <v-btn icon flat @click="editItem(item)" v-bind="props">
                                                            <PencilIcon stroke-width="1.5" size="20" class="text-primary" />
                                                        </v-btn>
                                                    </template>
                                                </v-tooltip>
                                                <v-tooltip text="Delete">
                                                    <template v-slot:activator="{ props }">
                                                        <v-btn icon flat @click="deleteItem(item)" v-bind="props">
                                                            <TrashIcon stroke-width="1.5" size="20" class="text-error" />
                                                        </v-btn>
                                                    </template>
                                                </v-tooltip>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </v-table>
                            <v-pagination
                                color="primary"
                                v-model="currentPage"
                                :length="pageCount"
                                rounded="circle"
                            ></v-pagination>
                        </v-window-item>
                        <v-window-item value="categoryData">
                            <v-row>
                                <v-col cols="12" lg="5" md="4">
                                    <v-text-field
                                        density="compact"
                                        v-model="search"
                                        label="Search Category"
                                        hide-details
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" lg="7" md="8" class="text-right">
                                    <v-dialog v-model="categoryModal" max-width="700">
                                        <template v-slot:activator="{ props }">
                                            <v-btn color="primary" v-bind="props" flat class="ml-auto" @click="food_category">
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
                                                        <v-col cols="12">
                                                            <div class="">
                                                                <label for="logoImageLbl3" class="imageUploadRestu">
                                                                    <span class="text-primary text-subtitle-1"
                                                                        >Upload Your Category Photo</span
                                                                    >
                                                                    <input
                                                                        type="file"
                                                                        id="logoImageLbl3"
                                                                        class="d-none"
                                                                        @change="handleImageUpload($event, 3)"
                                                                        accept="image/*"
                                                                    />
                                                                </label>
                                                                <div class="restuImageShowList" v-if="currentImage[3] !== ''">
                                                                    <img :src="currentImage[3]" alt="Uploaded Image" />
                                                                </div>
                                                            </div>
                                                        </v-col>
                                                    </v-row>
                                                </v-form>
                                            </v-card-text>

                                            <v-card-actions class="pa-4">
                                                <v-spacer></v-spacer>
                                                <v-btn color="error" @click="closeCat">Cancel</v-btn>
                                                <v-btn
                                                    color="primary"
                                                    :disabled="editedItemCat.catName == ''"
                                                    variant="flat"
                                                    @click="saveCat"
                                                    >Save</v-btn
                                                >
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-col>
                            </v-row>
                            <v-table :items="paginatedItemsCat" :currentPage="currentPage" :pageSize="5" class="mt-5">
                                <thead>
                                    <tr>
                                        <th class="text-subtitle-1 font-weight-semibold">Image</th>
                                        <th class="text-subtitle-1 font-weight-semibold">Name</th>
                                        <th class="text-subtitle-1 font-weight-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in filteredListCat" :key="item.id">
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
                            <v-pagination
                                color="primary"
                                v-model="currentPage"
                                :length="Math.ceil(filteredListCat.length / itemsPerPage)"
                                rounded="circle"
                            ></v-pagination>
                        </v-window-item>
                    </v-window>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>
<style>
.restuImageShowList img[src^='/src'] {
    display: none;
}

.restuImageShowList img {
    display: flex;
}
.progress-bar {
    width: 100%;
    background-color: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
}
.fade-effect {
    opacity: 0.2; /* Initial opacity */
    transition: opacity 0.5s ease; /* Fade transition */
}

.progress {
    height: 20px;
    background-color: #40b40f;
    width: 0;
    transition: width 0.3s;
}
.imageGroupMain.businessGroup.withoutRadius img.v-img__img.v-img__img--contain {
    width: 100%;
    height: 100%;
}
.imageDesignGallery img{
    width: 100%;
    height: 100%;

}
.rounded-circle-custom {
    width: 30px !important;
    height: 30px !important;
    border-radius: 50%;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000000;
}
.mainInnerGalryCrd {
    width: 100%;
}
.mainInnerGalryCrd .image-holder img {
    height: 100%;
}
.image-holder.w-33-custom {
    height: 150px;
   
}
.image-container {
    width: 500px; /* Adjust size as needed */
    height: 500px; /* Makes it a square */
    margin: 20px; /* Adds margin from all sides */
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 10px; /* Optional for rounded corners */
    background: #f5f5f5; /* Background color to fill empty space */
}

.image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ensures the image fills the container */
}

.close-btn {
    font-weight: bold;
    color: white;
    background-color: #ff4d4d;
    text-transform: uppercase;
    padding: 8px 16px;
    border-radius: 8px;
    transition: background 0.3s ease;
}

.close-btn:hover {
    background-color: #d32f2f;
}


</style>