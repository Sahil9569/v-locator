<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import vImageIcon from '@/assets/images/locator/v-icon.jpg';

import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL;

import { GoogleMap, Marker } from 'vue3-google-map';
// const center = { lat: 30.710036, lng: 76.710269 };
const center = ref('');
// const markerOptions = { position: center, label: 'L', title: 'LADY LIBERTY' };
const markerOptions = ref('');

const itemsPerPage = 10;
const currentPage = ref(1);
const dessertsCat = ref([]);
const categoryModal = ref(false);
const sugges = ref([]);
const new_loader = ref(true);
interface ImageFile {
    url: string;
    file: File;
}
const searchQuery = ref('');
const editedIndexCat = ref(-1);
const editedItemCat = ref({
    catName: '',
    catFiles: null
});

const myerrors = ref('');
const showSuccessMessage            = ref(false);
const showErrorMessage              = ref(false);

onMounted(() => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log('part 1', position.coords.latitude);
                console.log('part 2', position.coords.longitude);
                center.value = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                markerOptions.value = {
                    position: center.value,
                    label: 'L',
                    title: 'LADY LIBERTY',
                    draggable: true
                };
            },
            (error) => {
                console.error('Error getting location:', error);
            }
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
    get_recipe_category();
});

// const coords = ref({ lat: null, lng: null });
// const locationDetails = ref({ address: '', url: '' });
// const setPlace = (place: any) => {
//     const location = place.geometry.location;
//     console.log('chekc here is i came', location);
//     console.log('chekc here is i came with place', place);
//     center.value = { lat: location.lat(), lng: location.lng() };
//     markerOptions.value = {
//         position: { lat: location.lat(), lng: location.lng() }
//     };
//     // Update the location details
//     locationDetails.value.address = place.formatted_address;
//     locationDetails.value.url = place.url;
// };

// const setPlace = (place:any) => {
//     if (place.geometry) {
//     coords.value.lat = place.geometry.location.lat();
//     coords.value.lng = place.geometry.location.lng();
//     locationDetails.value.address = place.formatted_address;
//     locationDetails.value.url = place.url;
//     }
// };
// const initializeAutocomplete = (map: any) => {
//     const input = document.getElementById('autocomplete');
//     const autocomplete = new google.maps.places.Autocomplete(input);
//     autocomplete.bindTo('bounds', map);

//     autocomplete.addListener('place_changed', () => {
//         const place = autocomplete.getPlace();
//         if (!place.geometry || !place.geometry.location) {
//             return;
//         }

//         coords.value.lat = place.geometry.location.lat();
//         coords.value.lng = place.geometry.location.lng();
//         locationDetails.value.address = place.formatted_address;
//         locationDetails.value.url = place.url;
//     });
// };

const updateMarkerPosition = (event: any) => {
    const newPosition = event.latLng.toJSON();
    center.value = newPosition;

    markerOptions.value = {
        position: newPosition,
        label: 'L',
        title: 'LADY LIBERTY',
        draggable: true
    };
    // if (marker) {
    //     marker.setPosition(newPosition);
    // }
    console.log('part 1 repeat ', markerOptions.value.position.lat);
    console.log('part 2 repeat ', markerOptions.value.position.lng);
    updateUserCurrentLocation(newPosition);
};

const updateUserCurrentLocation = (newPosition: any) => {
    console.log('User current location updated to:', newPosition);
    // For example, you can update a user object
    // user.currentLocation = newPosition;
    markerOptions.value = {
        position: newPosition,
        label: 'L',
        title: 'LADY LIBERTY'
    };
};

const debounce = (func: any, delay: any) => {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
};

const searchAddress = () => {
    const query = searchQuery.value.trim();
    if (query === '') {
        console.warn('Empty search query');
        return;
    }

    console.log('Search query:', query);
    sugges.value = '';
    const autocompleteService = new google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions({ input: query }, (predictions, status) => {
        if (status === 'OK') {
            console.log('Autocomplete predictions:', predictions);
            const suggestions = predictions.map((prediction) => prediction.description);
            console.log('Suggestions:', suggestions);
            selectSuggestion(suggestions);
        } else {
            console.error('Autocomplete error:', status);
        }
    });

    const geocoder = new google.maps.Geocoder();
    console.log('Geocoder initialized', geocoder);

    geocoder.geocode({ address: query }, (results, status) => {
        console.log('Geocoding status:', status);
        if (status === 'OK' && results[0]) {
            console.log('Geocoding results:', results);

            const location = results[0].geometry.location;
            center.value = { lat: location.lat(), lng: location.lng() };
            markerOptions.value = {
                position: center.value,
                label: 'L',
                title: 'LADY LIBERTY'
            };
            console.log('Geocoding successful:', center.value);
        } else {
            console.error('Geocode was not successful for the following reason:', status);

            if (status === 'ZERO_RESULTS') {
                // alert('No results found for the provided address. Please try a different address.');
            } else {
                alert(`Geocoding error: ${status}. Please try again later.`);
            }
        }
    });
};
const searchAgain = (upd: any) => {
    const updates = upd;
    console.log('searchAddress function called', updates);
    if (updates === '') {
        console.warn('Empty search query');
        return;
    }

    console.log('Search query:', updates);
    // searchQuery.value = updates;
    // const autocompleteService = new google.maps.places.AutocompleteService();
    // autocompleteService.getPlacePredictions({ input: updates }, (predictions, status) => {
    //     if (status === 'OK') {
    //         console.log('Autocomplete predictions:', predictions);
    //         const suggestions = predictions.map((prediction) => prediction.description);
    //         console.log('Suggestions:', suggestions);
    //     } else {
    //         console.error('Autocomplete error:', status);
    //     }
    // });

    const geocoder = new google.maps.Geocoder();
    console.log('Geocoder initialized', geocoder);

    geocoder.geocode({ address: updates }, (results, status) => {
        console.log('Geocoding status:', status);
        if (status === 'OK' && results[0]) {
            console.log('Geocoding results:', results);

            const location = results[0].geometry.location;
            center.value = { lat: location.lat(), lng: location.lng() };
            markerOptions.value = {
                position: center.value,
                label: 'L',
                title: 'LADY LIBERTY'
            };

            console.log('Geocoding successful:', center.value);
        } else {
            console.error('Geocode was not successful for the following reason:', status);

            if (status === 'ZERO_RESULTS') {
                // alert('No results found for the provided address. Please try a different address.');
            } else {
                alert(`Geocoding error: ${status}. Please try again later.`);
            }
        }
    });
};

const debouncedSearchAddress = debounce(searchAddress, 300);

const handleInput = () => {
    console.log('yshs handle input m dekh ----', handleInput);
    debouncedSearchAddress();
};
const selectSuggestion = (suggestions: any) => {
    console.log('Selected suggestion in selectSuggestion:', suggestions);

    // searchQuery.value = suggestions;
    sugges.value = suggestions;
    // searchAgain(sugges.value);
    // searchQuery.value = suggestions;
    // searchAddress();
};
const selectlisting = (suggestions: any) => {
    console.log('Selected suggestion in selectlisting:', suggestions);

    searchQuery.value = suggestions;
    sugges.value = '';
    searchAgain(sugges.value);
};

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
    delete_recipe_category(item.id);
    // const index = dessertsCat.value.indexOf(item);
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
        // Object.assign(dessertsCat.value[editedIndexCat.value], editedItemCat.value);
        edit_recipe_category(editedItemCat.value);
    } else {
        add_recipe_category();
        // dessertsCat.value.push(editedItemCat.value);
    }

    closeCat();
    if (currentImage.value.length > 3) {
        currentImage.value[3] = '';
    }
}

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

const currentImage = ref<string[]>([]);
const uploadError = ref(null);
const imagename = ref('');
const handleImageUpload = (event: any, index: any) => {
    const input = event.target;
    if (input.files && input.files[0]) {
        currentImage.value = input.files[0];
        const file = input.files[0];
        const fileSizeMB = file.size / 1024 / 1024; // Size in MB
        const reader = new FileReader();
        reader.readAsDataURL(file);
        if (fileSizeMB > 5) {
            uploadError.value = 'File size is too large. Maximum size is 5 MB.';
            return;
        }

        reader.onload = () => {
            imagename.value = file.name;
            if (typeof reader.result === 'string') {
                switch (index) {
                    case 0:
                    case 1:
                        currentImage.value[index] = reader.result; // Update currentImage with uploaded image
                        break;
                    default:
                        break;
                }
            }
        };
        // reader.readAsDataURL(input.files[0]);
    }
};

const add_recipe_category = async () => {
    try {
        const token_user = localStorage.getItem('authToken');
        const formData = new FormData();
        formData.append('token', token_user);
        formData.append('cat_name', editedItemCat.value.catName);

        if (currentImage) {
            formData.append('image', currentImage.value);
        }
        const response = await axios.post('api/v_super/add_recipe_category/', formData);
        if (response.data.status === 'add_Recp_category') {
            
            showSuccessMessage.value = true
            myerrors.value = `New Category ${response.data.recipe_category} has been Created Successfully.`;
            setTimeout(() => {  showSuccessMessage.value = false  }, 3000);
            get_recipe_category();
        }
    } catch (error) {
        console.error('Invalid response');
    }
};

const edit_recipe_category = async (cat_id: any) => {
    try {
        const token_user = localStorage.getItem('authToken');
        const formData = new FormData();
        formData.append('token', token_user);
        formData.append('cat_name', editedItemCat.value.catName);
        formData.append('cat_id', cat_id.id);

        if (currentImage) {
            formData.append('image', currentImage.value);
        }
        const response = await axios.post('api/v_super/edit_recipe_category/', formData);
        if (response.data.status === 'edit_Recp_category') {
            get_recipe_category();
        }
    } catch (error) {
        console.error('Invalid response');
    }
};

const get_recipe_category = async () => {
    new_loader.value = true;
    try {
        const token_user = localStorage.getItem('authToken');
        const res_id = window.location.href.split('/').pop();
        const formdata = {
            token: token_user,
            res_id: res_id
        };
        const response = await axios.post('api/v_super/get_recipe_category/', formdata);
        const get_recipe_category = response.data.get_Recp_category;
        if (get_recipe_category) {
            new_loader.value = false;
            const updatedData = get_recipe_category.map((item: any, index: any) => {
                return {
                    id: item.id,
                    Sr_no: `#${index + 1}`,
                    catFiles: item.cate_images,
                    catName: item.name
                };
            });
            updatedData.sort((a, b) => {
                if (a.catName === 'All') return -1; // 'All' comes first
                if (b.catName === 'All') return 1;
                return 0; // Keep the rest in the same order
            })
            dessertsCat.value = updatedData;
        } else {
            new_loader.value = false;
            console.error('API error:');
        }
    } catch (error) {
        new_loader.value = false;
        console.error('API error:', error);
    }
};

const delete_recipe_category = async (event_id: any) => {
    console.log('cjhcke krlo delete krna h kya kuch', event_id);
    try {
        const token_user = localStorage.getItem('authToken');
        const formdata = {
            token: token_user,
            event_id: event_id
        };
        console.log('this is ehy we have here', formdata);
        const response = await axios.post('api/v_super/delete_recipe_category/', formdata);
        if (response.data.status === 'delete_Recp_category') {

            showErrorMessage.value = true
            myerrors.value = `Category ${response.data.del_category} Deleted Successfully.`;
            setTimeout(() => {  showErrorMessage.value = false  }, 3000);

            get_recipe_category();
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
        <v-alert type="success" v-show="showSuccessMessage" variant="tonal" density="" class="mb-4" >
            <div >{{ myerrors }}</div>
            <template v-slot:prepend>
                <v-icon class="text-24">mdi-checkbox-marked-circle-outline</v-icon>
            </template>
        </v-alert>
        <v-alert type="error" variant="tonal"  v-show="showErrorMessage"
         density="" class="mb-4">
            <div>{{ myerrors }}</div>
            <template v-slot:prepend>
                <v-icon class="text-24">mdi-alert-circle-outline</v-icon>
            </template>
        </v-alert>
    </div>
    <v-row>
        <!-- <v-col cols="12">
            <v-row class="mb-3">
                <v-col cols="col">
                    <div style="position: relative">
                        <v-text-field
                            variant="outlined"
                            hide-details
                            v-model="searchQuery"
                            @input="handleInput"
                            placeholder="Enter address"
                        ></v-text-field>
                        <ul v-if="sugges.length" class="suggestions-list">
                            <li v-for="s in sugges" :key="sugges" @click="selectlisting(s)">
                                {{ s }}
                            </li>
                        </ul>
                    </div>
                </v-col>
                <v-col cols="auto">
                    <v-btn color="primary" flat @click="searchAddress">Search</v-btn>
                </v-col>
            </v-row>

            <GoogleMap
                api-key="AIzaSyBDgAEVa_Bno6jxhGy4W1LYhhNBW4aMSfI"
                style="width: 100%; height: 500px"
                :center="center"
                :zoom="13"
                @click="updateMarkerPosition($event)"
            >
                <Marker :options="markerOptions" @dragend="updateMarkerPosition" />
            </GoogleMap>
        </v-col>-->
        <!-- <v-col cols="12" lg="5" md="4"></v-col> -->

        <!-- <v-col cols="12" lg="5" md="4"></v-col> -->

        <!-- <GMapAutocomplete placeholder="Search for a location" @place_changed="setPlace" style="font-size: medium"> </GMapAutocomplete> -->

        <!-- <GMapAutocomplete placeholder="Search for a location" @place_changed="setPlace" style="font-size: medium"></GMapAutocomplete>
        <div v-if="locationDetails.address">
            <p>Address: {{ locationDetails.address }}</p>
            <p>
                URL: <a :href="locationDetails.url" target="_blank">{{ locationDetails.url }}</a>
            </p>
        </div> -->
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
        <div class="logoLoader tableLoader bg-Whitecustom" v-if="new_loader">
            <div class="LogoVInnerImg">
                <img src="@/assets/images/locator/v-icon.png" alt="logo-loader" />
                <p>Please Wait...</p>
            </div>
        </div>
        <v-table :items="paginatedItemsCat" class="mt-5">
            <thead>
                <tr>
                    <th class="text-subtitle-1 font-weight-semibold">Image</th>
                    <th class="text-subtitle-1 font-weight-semibold">Name</th>
                    <th class="text-subtitle-1 font-weight-semibold">Actions</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="filteredListCat.length > 0">
                    <tr v-for="item in paginatedItemsCat" :key="item.id">
                        <td class="text-subtitle-1 py-2">
                            <div v-if="item.catFiles">
                                <img :src="`${BASE_URL}${item.catFiles}`" class="imageCustomTable img-fluid" />
                            </div>
                            <div v-else>
                                <img :src="vImageIcon" class="imageCustomTable img-fluid" />
                            </div>
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
    </div>

    <v-pagination
        color="primary"
        v-model="currentPage"
        :length="Math.ceil(filteredListCat.length / itemsPerPage)"
        rounded="circle"
    ></v-pagination>
</template>
<style>
.alertWrap {
    display: flex;
    max-width: 400px;
    margin-left: auto;
}

.restuImageShowList img[src^='/src'] {
    display: none;
}
.restuImageShowList img {
    display: flex;
}

.title {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 5px 10px;
    border-radius: 3px;
}
.text-white {
    color: white;
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
</style>