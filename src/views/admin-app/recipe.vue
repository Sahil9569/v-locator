<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useContactStore } from '@/stores/apps/contact';
// import { useEditor, EditorContent } from '@tiptap/vue-3';
// import StarterKit from '@tiptap/starter-kit';
// import EditorMenubar from '@/components/forms/plugins/cuisineDescription/EditorMenubar.vue';
import vImageIcon from '@/assets/images/locator/v-icon.jpg';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL;
import user1 from '@/assets/images/locator/restu/restu1.jpg';
import { GoogleMap, Marker } from 'vue3-google-map';
const center = ref('');
const showCheckboxes = ref(false);
const new_loader = ref(false);
const markerOptions = ref('');
const sugges = ref([]);

const myerrors = ref('');
const showSuccessMessage            = ref(false);
const showErrorMessage              = ref(false);

const selectedGender = ref({ value: {} });
const searchQuery = ref('');

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

const store = useContactStore();
const desserts = ref([]);

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
    get_recipe_details();
    get_category();
    store.fetchContacts();
});

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


const itemsPerPage = 10;
const currentPage = ref(1);

const valid = ref(true);
const dialog = ref(false);
const search = ref('');
const prep_hours = ref(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
const prep_mintue = ref([...Array(60).keys()].map((x: any) => String(x)));
const cook_hours = ref(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
const cook_mintue = ref([...Array(60).keys()].map((x: any) => String(x)));
const editedIndex = ref(-1);
const editedItem = ref({
    id: '',
    image: '',
    image2: '',
    recipe_name: '',
    insta_link: '',
    prep_time: '',
    difficulty_level: '',
    websiteURL: '',
    description: '',
    cuisine: '',
    instructions: '',
    prep_hours: '',
    prep_mintue: '',
    cook_hours: '',
    cook_mintue: '',
    cook_time: '',
    authorName: '',
    date: '',
    servings: ''
});
const defaultItem = ref({
    id: '',
    image: '',
    image2: '',
    recipe_name: '',
    insta_link: '',
    prep_time: '',
    difficulty_level: '',
    websiteURL: '',
    description: '',
    cuisine: '',
    instructions: '',
    prep_hours: '',
    prep_mintue: '',
    cook_hours: '',
    cook_mintue: '',
    cook_time: '',
    authorName: '',
    date: '',
    servings: ''
});
const difficulty_level_items = ref(['Easy', 'Moderate', 'Difficult']);
const cuisineFilter = ref(['Asian', 'Mediterranean', 'French', 'Vietnamese', 'Greek', 'Spanish ', 'Japanese']);
const cuisineFilterList = ref(['Mexican', 'Mediterranean', 'French', 'Vietnamese', 'Greek', 'Spanish ', 'Japanese']);
//Methods
// const filteredList = computed(() => {
//     return desserts.value.filter((user: any) => {
//         return user.recipe_name.toLowerCase().includes(search.value.toLowerCase());
//     });
// });
// const selectedCuisine = ref('');
// const filteredList = computed(() => {
//     let filtered = desserts.value.filter((item) => {
//         const searchLower = search.value ? search.value.toLowerCase() : ''; // Default to empty string
//         const restuNames = item.recipe_name ? item.cuisine.map(name => name.toLowerCase()) : []; // Default to empty array of lowercase names
//         return restuNames.some(name => name.includes(searchLower));  // Check if any name includes the search term
//     });

//     return filtered;
// });

const selectedCategory = ref('All');
const filteredList = computed(() => {
    return desserts.value.filter((user: any) => {
        const searchLower = search.value ? search.value.toLowerCase() : ''; 
        const recipe_name = user.recipe_name !== undefined && user.recipe_name !== null ? user.recipe_name.toLowerCase() : 'None'; 
        const rcats = user.cuisine ? user.cuisine.map((a: any) => a.toLowerCase()) : []; 
        
        const categoryMatch = selectedCategory.value === 'All' ||
                              selectedCategory.value === '' ||
                              rcats.includes(selectedCategory.value.toLowerCase());
        return recipe_name.includes(searchLower) && categoryMatch;
        
    });
});

const paginatedList = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredList.value.slice(start, end);
});

function editItem(item: any) {
    editedIndex.value = desserts.value.indexOf(item);
    editedItem.value = Object.assign({}, item);

    dialog.value = true;
}
function deleteItem(item: any) {
    const index = desserts.value.indexOf(item);
    delete_recipe_details(item.id);
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
        edit_recipe_details(editedItem.value.id);
    } else {
        Submit_save_recipe();
    }
    close();
}

const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'New Recipe' : 'Edit Recipe';
});

const currentImage = ref<string[]>([]);
const uploadError = ref(null);
const imagename = ref('');

// const handleImageUpload = (event: any, index: any) => {
//     const input = event.target;
//     if (input.files && input.files[0]) {
//         const file = input.files[0];
//         const fileSizeMB = file.size / 1024 / 1024; // Size in MB
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         if (fileSizeMB > 5) {
//             uploadError.value = 'File size is too large. Maximum size is 5 MB.';
//             return;
//         }
//         const img = new Image();
//         img.onload = function() {
//             const minWidth = 800; // Minimum width
//             const minHeight = 600; // Minimum height

//             if (img.width < minWidth || img.height < minHeight) {
//                 uploadError.value = `Image resolution is too low. Minimum resolution is ${minWidth}x${minHeight}.`;
//                 return;
//             }
//         }

//         reader.onload = () => {
//             imagename.value = file.name;
//             if (typeof reader.result === 'string') {
//                 switch (index) {
//                     case 0:
//                     case 1:
//                         currentImage.value[index] = reader.result; // Update currentImage with uploaded image
//                         break;
//                     default:
//                         break;
//                 }
//             }
//         };
//         currentImage.value = input.files[0];
//     }
// };
const handleImageUpload = (event: any, index: any) => {
    const input = event.target;
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const fileSizeMB = file.size / 1024 / 1024; // Size in MB

        // Check file size
        if (fileSizeMB > 5) {
            uploadError.value = 'File size is too large. Maximum size is 5 MB.';
            return;
        }

        const img = new Image();
        const reader = new FileReader();

        // Set up the onload event for the FileReader
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                img.src = reader.result; // Set the image source to the base64 data
            }
        };

        // Set up the onload event for the Image
        img.onload = function() {
            const minWidth = 800; // Minimum width
            const minHeight = 600; // Minimum height

            // Check image resolution
            if (img.width < minWidth || img.height < minHeight) {
                uploadError.value = `Image resolution is too low. Minimum resolution is ${minWidth}x${minHeight}.`;
                currentImage.value[index] = null; // Clear the image if resolution is too low
                return;
            } else {
                // Clear any previous error message if the image is valid
                imagename.value = file.name;
                uploadError.value = '';
                // Save the image in base64 format
                currentImage.value[index] = reader.result; // Update currentImage with uploaded image
            }
        };

        currentImage.value = input.files[0];
        reader.readAsDataURL(file);
    }
};




const isButtonHidden = ref(false);
const sample_id = ref([]);
const updateCheckedItems = async (id: any) => {
    try {
        if (sample_id.value.includes(id)) {
            sample_id.value = sample_id.value.filter((item) => item !== id);
            isButtonHidden.value = true;
        } else {
            sample_id.value.push(id);
        }
        isButtonHidden.value = sample_id.value.length;
    } catch (error) {
        console.log('error');
    }
};


const toggleCheckboxes = () => {
    showCheckboxes.value = !showCheckboxes.value;
    sample_id.value = [];
    if (btn_name.value === 'select all') {
        btn_name.value = 'clear';
    } else {
        btn_name.value = 'select all';
    }
};

const delete_all = async () => {
    try {
        const token_user = localStorage.getItem('authToken');
        const formdata = new FormData();
        formdata.append('token', token_user);
        sample_id.value.forEach((itemId) => {
            formdata.append('checkedItems[]', itemId);
        });
        const response = await axios.post('api/v_super/delete_all/', formdata);
        console.log('API response:', response.data);
        if ((response.data.status = 'delete_api')) {
            get_recipe_details();
            toggleCheckboxes();
            isButtonHidden.value = false;
        }
    } catch (error) {
        console.error('Error calling API:', error);
    }
};

const Submit_save_recipe = async () => {
    try {
        const token_user = localStorage.getItem('authToken');
        const formdata = new FormData();

        formdata.append('token', token_user);
        formdata.append('recipe_name', editedItem.value.recipe_name);
        formdata.append('insta_link', editedItem.value.insta_link);
        formdata.append('prep_hours', editedItem.value.prep_hours);
        formdata.append('prep_mintue', editedItem.value.prep_mintue);
        formdata.append('cook_hours', editedItem.value.cook_hours);
        formdata.append('cook_mintue', editedItem.value.cook_mintue);
        formdata.append('authorName', editedItem.value.authorName);
        formdata.append('servings', editedItem.value.servings);
        formdata.append('difficulty_level', editedItem.value.difficulty_level);
        formdata.append('description', editedItem.value.description);
        formdata.append('cuisine', editedItem.value.cuisine);
        formdata.append('instructions', editedItem.value.instructions);
        formdata.append('cook_time', editedItem.value.cook_time);
        formdata.append('save_recipe', 'Submit_recipe');
        if (currentImage) {
            console.log('check image here or not----', currentImage.value);
            formdata.append('image', currentImage.value);
        }
        const response = await axios.post('api/v_super/recipe_details/', formdata);
        if (response.data.status === 'Recipe_created') {
            showSuccessMessage.value = true
            myerrors.value = `New Recipe ${response.data.new_recipe} has been Created Successfully.`;
            setTimeout(() => {  showSuccessMessage.value = false  }, 3000);
            get_recipe_details();
            close();
        } else {
            console.error('error');
        }
    } catch (error) {
        console.error('Invalid api');
    }
};

const get_recipe_details = async () => {
    new_loader.value = true;
    // try {
    const token_user = localStorage.getItem('authToken');
    const formdata = {
        token: token_user,
        re_details: 'Recipe_details'
    };
    const response = await axios.post('api/v_super/recipe_details/', formdata);
    if (response.data.status === 'Recipe_details') {
        new_loader.value = false;

        const recipe = response.data.Recipe_details;

        const updatedData = response.data.Recipe_details.map((item: any, index: any) => {
            console.log('chekc the data comes or not ------------------', item);

            const categoryValues = Array.isArray(item.category) ? item.category.map((c: any) => c.name) : [];
            const rc_images_Values = Array.isArray(item.image) ? item.image.map((d: any) => d.recipe_images) : [];
            const rc_images = Array.isArray(item.image) ? item.image.map((w: any) => w.recipe_images2) : [];

            const dateTimeParts = splitDateTime(item.created_at);
            const data = {
                id: item.id,
                serial_no: `#${index + 1}`,
                recipe_name: item.recipe_name,
                authorName: item.author ?? 'Undefined',
                insta_link: item.insta_link,
                prep_time: item.prep_time,
                cook_time: item.cook_time,
                servings:item.serving,
                prep_hours: item.prep_time?.split(':')[0],
                prep_mintue: item.prep_time?.split(':')[1],
                cook_hours: item.cook_time?.split(':')[0],
                cook_mintue: item.cook_time?.split(':')[1],
                difficulty_level: item.difficulty_level ? toTitleCase(item.difficulty_level) : 'N/A',
                description: item.description,
                cuisine: categoryValues.length > 0 ? categoryValues : ['N/A'],
                instructions: item.website,
                // cook_time: item.cook_time,
                date: dateTimeParts.date
            };

            if (rc_images_Values.length > 0) {
                data.image = rc_images_Values;
            }

            if (rc_images.length > 0) {
                data.image2 = rc_images;
            }

            return data;
        });
        desserts.value = updatedData;
        console.log('desserts____________', desserts.value);
    } else {
        new_loader.value = false;
        console.log('First Error');
    }
    // } catch (error) {
    //     new_loader.value = false;
    //     console.error('Invalid api');
    // }
};

const edit_recipe_details = async (item: any) => {
    console.log('check yaha id aare h kya recipe ki ------------', item);
    try {
        const token_user = localStorage.getItem('authToken');
        const formdata = new FormData();
        formdata.append('token', token_user);
        formdata.append('recipe_id', item);
        formdata.append('recipe_name', editedItem.value.recipe_name);
        formdata.append('insta_link', editedItem.value.insta_link);
        formdata.append('prep_hours', editedItem.value.prep_hours);
        formdata.append('prep_mintue', editedItem.value.prep_mintue);
        formdata.append('cook_hours', editedItem.value.cook_hours);
        formdata.append('cook_mintue', editedItem.value.cook_mintue);
        formdata.append('authorName', editedItem.value.authorName);
        formdata.append('servings', editedItem.value.servings);
        formdata.append('difficulty_level', editedItem.value.difficulty_level);
        formdata.append('description', editedItem.value.description);
        formdata.append('cuisine', editedItem.value.cuisine);
        formdata.append('instructions', editedItem.value.instructions);
        formdata.append('cook_time', editedItem.value.cook_time);
        if (currentImage) {
            console.log('check image here or not----', currentImage.value);
            formdata.append('image', currentImage.value); // Append the File object
        }
        const response = await axios.post('api/v_super/edit_recipe_details/', formdata);
        console.log('this is what we have-----------', response);
        if (response.data.status === 'edit_recipe_details') {
            get_recipe_details();
            close();
        } else {
            console.log('First Error');
        }
    } catch (error) {
        console.error('Invalid api');
    }
};

const delete_recipe_details = async (item: any) => {
    try {
        const token_user = localStorage.getItem('authToken');
        const formdata = {
            token: token_user,
            recipe_id: item,
            re_delete: 'Recipe_delete_details'
        };
        const response = await axios.post('api/v_super/recipe_details/', formdata);
        if (response.data.status === 'Recipe_deleted') {
            showErrorMessage.value = true
            myerrors.value = `Recipe ${response.data.del_recipe} Deleted Successfully.`;
            setTimeout(() => {  showErrorMessage.value = false  }, 3000);
            get_recipe_details();
            close();
        } else {
            console.log('First Error');
        }
    } catch (error) {
        console.error('Invalid api');
    }
};

function splitDateTime(isoDateTime: any) {
    const dateObj = new Date(isoDateTime);

    const datePart = dateObj.toISOString().split('T')[0];
    const timePart = dateObj.toTimeString().split(' ')[0].substring(0, 5);

    return {
        date: datePart,
        time: timePart
    };
}

const get_category = async () => {
    try {
        const token_user = localStorage.getItem('authToken');
        const res_id = window.location.href.split('/').pop();
        const formdata = {
            token: token_user,
            res_id: res_id
        };
        const response = await axios.post('api/v_super/get_recipe_category/', formdata);
        const get_category = response.data.get_Recp_category;
        const updatedData = get_category.map((item: any, index: any) => {
            return {
                id: item.id,
                Sr_no: `#${index + 1}`,
                catFiles: `${BASE_URL}${item.cate_images}`,
                catName: item.name
            };
        });
        cuisineFilterList.value = updatedData.map((item: any) => item.catName);
        // cuisineFilter.value = updatedData.map((item: any) => item.catName);
        // console.log('can we check the value of  ---- ',cuisineFilter.value)
        // cuisineFilter.value.unshift('All');
        // cuisineFilter.value = [...updatedData.map((item: any) => item.catName)];
        cuisineFilter.value = updatedData.map((item: any) => item.catName);

        // Ensure "All" is always first
        const allIndex = cuisineFilter.value.indexOf('All');
        if (allIndex !== -1) {
            cuisineFilter.value.splice(allIndex, 1); // Remove "All" if it exists
        }
        cuisineFilter.value.unshift('All'); // Add "All" at the top

    } catch (error) {
        console.error('API error:', error);
    }
};

// function timeToMinutes(time: any) {
//     if (!time) {
//         return 0; // Return 0 minutes if time is null or undefined
//     }
//     const [hours, minutes, seconds] = time.split(':').map(Number);
//     return hours * 60 + minutes + Math.round(seconds / 60); // Convert seconds to minutes and add
// }
function timeToHoursAndMinutes(time: any) {
    if (!time) {
        return "0 min"; // Return "0:00 min" if time is null or undefined
    }
    
    const [hours, minutes] = time.split(':').map(Number); // Only extract hours and minutes
    const totalMinutes = hours * 60 + minutes; // Calculate total minutes

    if (totalMinutes < 60) {
        return `${totalMinutes} min`; // Return only minutes if less than 60
    }

    const finalHours = Math.floor(totalMinutes / 60);
    const finalMinutes = totalMinutes % 60;

    // Return only hours if minutes are 0, else return hours and minutes
    if (finalMinutes === 0) {
        return `${finalHours} hours`; // Only hours if there are no remaining minutes
    }

    // Format the output as "H hours MM min"
    return `${finalHours} hours ${String(finalMinutes).padStart(2, '0')} min`;
}

const btn_name = ref('select all');
const successFul = ref(false);
const file_cancel = ref(false);
const barprogress = ref(false);
const bulkUploadFile = ref(false);
const blukForm = ref('');
const selectedFile = ref<File | null>(null);
const uploading = ref(false);
const progress = ref(0);
const props = defineProps<{ progress: number }>();

function increaseProgress() {
    if (progress.value < 90) {
        progress.value += 1; // Increment progress by 1
    } else {
        clearInterval(intervalId); // Stop the interval once progress reaches 100
    }
}

const intervalId = setInterval(increaseProgress, 90);

const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
        selectedFile.value = target.files[0];
    }
};

const uploadFileToBackend = async () => {
    if (!selectedFile.value) return;
    uploading.value = true;
    const intervalId = setInterval(increaseProgress, 90);

    const token_user = localStorage.getItem('authToken');
    const formData = new FormData();
    formData.append('file', selectedFile.value);
    formData.append('token', token_user);
    try {
        const response = await axios.post('api/v_super/fileforrecipe/', formData);
        console.log('File uploaded successfully:', response.data);
        if (response) {
            progress.value = 37;
            barprogress.value = true;
            bulkUploadFile.value = true;

            clearInterval(intervalId);
            setTimeout(() => {
                progress.value = 100;
            }, 2000);
            setTimeout(() => {
                successFul.value = true;
            }, 3000);

            await new Promise((resolve) => setTimeout(resolve, 3000));
            bulkUploadFile.value = false;

            setTimeout(() => {
                successFul.value = false;
                barprogress.value = false;
            }, 3000);
            get_recipe_details();
        }
    } catch (error) {
        file_cancel.value = true;
        setTimeout(() => {
            file_cancel.value = false;
            bulkUploadFile.value = false;
        }, 4000);
        console.error('Error uploading file:', error);
    }
    selectedFile.value = null;
};

const downloadFile = () => {
    const filePath = '/assets/images/Recipe.xlsx';
    const fileName = 'Recipe.xlsx';
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// -------------------------------------------------------
const nameError = ref('');
const dateError = ref('');
const authorName = ref('');
const validateError = ref('');
const instaLink = ref('');
const recipeName = () => {
    if (editedItem.value.recipe_name.length < 4) {
        nameError.value = 'Name must be at least 4 characters long.';
    } else {
        nameError.value = '';
    }
};

const validateDate = () => {
    // Check if date is not empty
    if (!editedItem.value.date) {
        dateError.value = 'Date is required.';
        return false; // Return false if date is empty
    }

    // Check if the date is within 20 years from the current date
    const currentDate = new Date();
    const inputDate = new Date(editedItem.value.date);
    const minDate = new Date(currentDate.getFullYear() - 20, currentDate.getMonth(), currentDate.getDate());
    const maxDate = new Date(currentDate.getFullYear() + 20, currentDate.getMonth(), currentDate.getDate());

    if (inputDate < minDate || inputDate > maxDate) {
        dateError.value = 'Date must be within the last 20 years.';
        return false; // Return false if date is not within range
    }

    dateError.value = '';
    return true; // Return true if date is valid
};

const validateAuthor = () => {
    if (editedItem.value.authorName.length < 4) {
        authorName.value = 'Name must be at least 4 characters long.';
    } else {
        authorName.value = '';
    }
};
const validateInsta = () => {
    if (editedItem.value.insta_link.length < 4) {
        instaLink.value = 'Instagram link must be at least 4 characters long.';
    } else {
        instaLink.value = '';
    }
};

const validateLevel = () => {
    if (editedItem.value.difficulty_level.length < 2) {
        validateError.value = 'Level must needed.';
    } else {
        validateError.value = '';
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
        <v-col cols="12" md="3">
            <v-text-field density="compact" v-model="search" label="Search Recipe" hide-details variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
            <v-select
                variant="outlined"
                v-model="selectedCategory"
                density="compact"
                hide-details
                :items="cuisineFilter"
                label="Category Type"
            ></v-select>
        </v-col>
        <v-col cols="12" md="6" class="text-right">
            <div class="d-flex flex-wrap gap-2 justify-end">
                <div class="">
                    <v-btn color="error" flat class="ml-auto" v-if="isButtonHidden" @click="delete_all()">
                        <TrashIcon size="15" class="me-1" /> Delete All
                    </v-btn>
                </div>
                <div class="">
                    <v-btn color="primary" flat class="ml-auto" @click="toggleCheckboxes()">
                        {{ btn_name }}
                    </v-btn>
                </div>
                <div class="">
                    <v-dialog v-model="bulkUploadFile" max-width="600">
                        <template v-slot:activator="{ props }">
                            <v-btn color="primary" v-bind="props" flat class="ml-auto">
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
                                <v-form ref="form" v-model="blukForm" lazy-validation>
                                    <v-row>
                                        <v-col cols="12">
                                            <label for="bulFileId" class="uploadFileBulk">+ Upload Your File</label>
                                            <input id="bulFileId" type="file" @change="handleFileUpload" />
                                            <div v-if="selectedFile">Selected File: {{ selectedFile.name }}</div>
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
                                <v-btn color="error" @click="bulkUploadFile = false">Cancel</v-btn>
                                <v-btn color="primary" :disabled="selectedFile == null" variant="flat" @click="uploadFileToBackend()"
                                    >Save</v-btn
                                >
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </div>

                <v-dialog v-model="successFul" max-width="400" class="p-0">
                    <v-card class="p-0" style="background-color: #f7f7f7">
                        <v-card-text class="py-0 px-0 text-center">
                            <img src="@/assets/images/locator/success.gif" style="width: 320px" />
                            <h3 class="text-center pb-3">Upload Successful</h3>
                        </v-card-text>
                    </v-card>
                </v-dialog>

                <v-dialog v-model="file_cancel" max-width="400" class="p-0">
                    <v-card class="p-0">
                        <v-card-text class="py-0 px-0 text-center">
                            <img src="@/assets/images/locator/cancel.gif" style="width: 320px" />
                            <h3 class="text-center pb-3">File Format Must Be in Excel...</h3>
                        </v-card-text>
                    </v-card>
                </v-dialog>

                <div class="">
                    <v-dialog v-model="dialog" max-width="800">
                        <template v-slot:activator="{ props }">
                            <v-btn color="primary" v-bind="props" flat class="ml-auto">
                                <v-icon class="mr-2">mdi-plus</v-icon>Add Recipe
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title class="pa-4 bg-primary">
                                <span class="title text-white">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <v-text-field
                                                variant="outlined"
                                                hide-details
                                                v-model="editedItem.recipe_name"
                                                @input="recipeName">
                                                <template #label>
                                                    Recipe Name <span class="required-asterisk">*</span>
                                                </template>
                                            </v-text-field>
                                            <p v-if="nameError" class="error">{{ nameError }}</p>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                            <v-text-field
                                                variant="outlined"
                                                type="date"
                                                hide-details
                                                class="dateFullWdth"
                                                v-model="editedItem.date"
                                                @input="validateDate"
                                                >
                                                <template #label>
                                                    Recipe Date <span class="required-asterisk">*</span>
                                                </template></v-text-field>
                                            <p v-if="dateError" class="error">{{ dateError }}</p>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field
                                                variant="outlined"
                                                hide-details
                                                v-model="editedItem.authorName"
                                            >
                                                <template #label>
                                                    Author Name 
                                                </template></v-text-field>
                                            <!-- <p v-if="authorName" class="error">{{ authorName }}</p> -->
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field
                                                variant="outlined"
                                                hide-details
                                                v-model="editedItem.insta_link"
                                                @input="validateInsta"
                                                label = "Instagram link"
                                            >
                                            </v-text-field>
                                            <p v-if="instaLink" class="error">{{ instaLink }}</p>
                                        </v-col>

                                        <v-col cols="12" md="6" class="mt-2">
                                            <v-select
                                                variant="outlined"
                                                v-model="editedItem.difficulty_level"
                                                hide-details
                                                :items="difficulty_level_items"
                                                label="Difficulty Level"
                                                @input="validateLevel"
                                            >
                                                <template #label>
                                                    Difficulty Level <span class="required-asterisk">*</span>
                                                </template>
                                            </v-select>
                                        </v-col>

                                        <v-col cols="12" md="6" class="mt-2">
                                            <v-text-field
                                                variant="outlined"
                                                hide-details
                                                v-model="editedItem.servings"
                                                type="number"
                                                >
                                                <template #label>
                                                    No. of Servings <span class="required-asterisk">*</span>
                                                </template>
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="12">
                                            <div class="text-end">
                                                <router-link class="text-subtitle-1 font-weight-medium text-primary" to="/recipe_category"
                                                    >+ Add</router-link
                                                >
                                            </div>
                                            <v-select
                                                variant="outlined"
                                                hide-details
                                                multiple
                                                :items="cuisineFilterList"
                                                v-model="editedItem.cuisine"
                                                class="cutsomMultipleAdd"
                                            >
                                                <template #label>
                                                    Categories <span class="required-asterisk">*</span>
                                                </template>
                                            </v-select>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-label class="mb-2">Prep Time <span class="required">*</span></v-label>
                                            <div class="d-flex gap-2">
                                                <v-select
                                                    variant="outlined"
                                                    v-model="editedItem.prep_hours"
                                                    hide-details
                                                    :items="prep_hours"
                                                >
                                                    <template #label>
                                                        Hours <span class="required-asterisk">*</span>
                                                    </template>
                                                </v-select>
                                                <v-select
                                                    variant="outlined"
                                                    v-model="editedItem.prep_mintue"
                                                    hide-details
                                                    :items="prep_mintue"
                                                    label="Minutes"
                                                    >
                                                    <template #label>
                                                        Minutes <span class="required-asterisk">*</span>
                                                    </template>
                                                </v-select>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-label class="mb-2">Cook Time <span class="required">*</span></v-label>
                                            <div class="d-flex gap-2">
                                                <v-select
                                                    variant="outlined"
                                                    v-model="editedItem.cook_hours"
                                                    hide-details
                                                    :items="cook_hours"
                                                    label="Hours"
                                                >
                                                    <template #label>
                                                        Hours <span class="required-asterisk">*</span>
                                                    </template>
                                                </v-select>
                                                <v-select
                                                    variant="outlined"
                                                    v-model="editedItem.cook_mintue"
                                                    hide-details
                                                    :items="cook_mintue"
                                                    label="Minutes"
                                                >
                                                    <template #label>
                                                        Minutes <span class="required-asterisk">*</span>
                                                    </template>
                                                </v-select>
                                            </div>
                                        </v-col>

                                        <v-col cols="12">
                                            <v-label class="mb-1">About <span class="required-asterisk">*</span></v-label>
                                            <v-textarea
                                                hide-details
                                                v-model="editedItem.description"
                                                class="resize-none"
                                                rows="6"
                                            >
                                            </v-textarea>
                                        </v-col>
                                        <v-col cols="12">
                                            <div class="">
                                                <label for="logoImageLbl0" class="imageUploadRestu">
                                                    <span class="text-primary text-subtitle-1">Upload Your Recipe Photo</span>
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
                                    :disabled="
                                        editedItem.recipe_name == '' ||
                                        editedItem.date == '' ||
                                        // editedItem.authorName == '' ||
                                        editedItem.difficulty_level == '' ||
                                        editedItem.cuisine == '' ||
                                        editedItem.prep_hours == '' ||
                                        editedItem.prep_mintue == '' ||
                                        editedItem.cook_hours == '' ||
                                        editedItem.cook_mintue == '' ||
                                        editedItem.description == ''
                                    "
                                    variant="flat"
                                    @click="save"
                                    >Save</v-btn
                                >
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </div>
            </div>
        </v-col>
    </v-row>
    <v-card elevation="10" class="mt-4">
        <v-card-items class="pa-4">
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
                            <th v-if="showCheckboxes" class="text-center text-error"><TrashIcon color="error" size="20" /></th>
                            <th class="text-subtitle-1 font-weight-semibold">ID</th>
                            <th class="text-subtitle-1 font-weight-semibold">Recipe Info</th>
                            <th class="text-subtitle-1 font-weight-semibold">Timing</th>
                            <th class="text-subtitle-1 font-weight-semibold">Difficulty Level</th>
                            <th class="text-subtitle-1 font-weight-semibold">Categories</th>
                            <th class="text-subtitle-1 font-weight-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="paginatedList.length > 0">
                            <tr v-for="(item, index) in paginatedList" :key="index" :currentPage="currentPage" :pageSize="5">
                                <td v-if="showCheckboxes">
                                    <v-checkbox
                                        color="primary"
                                        :value="item.id"
                                        hide-details
                                        @change="updateCheckedItems(item.id)"
                                    ></v-checkbox>
                                </td>
                                <td class="text-subtitle-1">{{ item.serial_no }}</td>

                                <td>
                                    <div class="d-flex align-center py-4">
                                        <!-- {{ item.image }} -->
                                        <div v-if="item.image">
                                            <v-img :src="`${BASE_URL}${item.image}`" class="imageSizeFixd rounded-md img-fluid" />
                                        </div>
                                        <div v-else>
                                            <v-img :src="vImageIcon" class="3333 imageSizeFixd rounded-md img-fluid" />
                                        </div>

                                        <div class="ms-2">
                                            <h4 class="text-subtitle-1 font-weight-semibold d-flex mb-1">
                                                <ChefHatIcon size="16" class="me-1" style="min-width: 17px" /><span>
                                                    {{ item.recipe_name }}</span
                                                >
                                            </h4>
                                            <h4 class="text-subtitle-1 font-weight-semibold d-flex align-center mb-1">
                                                <UserIcon size="16" class="me-1" /><span>{{ item.authorName }}</span>
                                            </h4>
                                            <h4 class="text-subtitle-1 font-weight-semibold d-flex align-center">
                                                <CalendarIcon size="16" class="me-1" /><span> {{ item.date }}</span>
                                            </h4>
                                            <!-- <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.usermail }}</span> -->
                                        </div>
                                    </div>
                                </td>

                                <td class="py-2" style="min-width: 135px; margin-left: -5px;" >
                                    <span class="text-subtitle-1 d-block mt-1 textSecondary" >
                                        <strong>Prep: </strong> {{ timeToHoursAndMinutes(item.prep_time) }} 
                                    </span>
                                    <span class="text-subtitle-1 d-block mt-1 textSecondary">
                                        <strong>Cook: </strong> {{ timeToHoursAndMinutes(item.cook_time) }} 
                                    </span>
                                </td>
                                <td class="text-subtitle-1">
                                    <v-chip
                                        :color="
                                            item.difficulty_level === 'Moderate'
                                                ? 'warning'
                                                : item.difficulty_level === 'Difficult'
                                                ? 'error'
                                                : 'success'
                                        "
                                        size="small"
                                        class="textCaptilize"
                                        >{{ item.difficulty_level }}</v-chip
                                    >
                                </td>
                                <!-- <td class="text-subtitle-1">
                                    <span
                                        class="text-subtitle-2 d-inline-block textSecondary"
                                        v-for="
                                    >
                                        <span v-if="index != 0" class="d-inline-block mx-1">|</span> {{ cuisineItem }}
                                    </span>
                                </td> -->
                                <td class="text-subtitle-1">
                                    <template v-if="item.cuisine && item.cuisine.length">
                                        <template v-for="(cuisineItem, index) in item.cuisine" :key="index">
                                            <v-chip color="primary" class="ma-1" size="small" label v-if="cuisineItem !== ''">
                                                {{ cuisineItem }}
                                            </v-chip>
                                        </template>
                                    </template>
                                </td>
                                <td>
                                    <div class="d-flex align-center">
                                        <v-tooltip text="View">
                                            <template v-slot:activator="{ props }">
                                                <router-link :to="`/recipe_detail/${item.id}`" color="primary">
                                                    <v-btn icon flat>
                                                        <EyeIcon size="20" v-bind="props" class="text-primary" />
                                                    </v-btn>
                                                </router-link>
                                            </template>
                                        </v-tooltip>
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
            <v-pagination
                color="primary"
                v-model="currentPage"
                :length="Math.ceil(filteredList.length / itemsPerPage)"
                rounded="circle"
            ></v-pagination>
        </v-card-items>
    </v-card>
</template>

<style>
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

</style>