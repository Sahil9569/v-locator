<script setup lang="ts">
import { ref, computed, onMounted ,nextTick} from 'vue';
import { useContactStore } from '@/stores/apps/contact';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import vImageIcon from '@/assets/images/locator/v-icon.jpg';
import StarterKit from '@tiptap/starter-kit';
import EditorMenubar from '@/components/forms/plugins/cuisineDescription/EditorMenubar.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL;
const new_loader = ref(false);
import user1 from '@/assets/images/locator/restu/restu1.jpg';
const store = useContactStore();
const dateTime = ref(new Date());

const desserts = ref([]);

import { GoogleMap, Marker } from 'vue3-google-map';
// const center = { lat: 30.710036, lng: 76.710269 };
// const center = ref('');
// const markerOptions = { position: center, label: 'L', title: 'LADY LIBERTY' };
// const markerOptions = ref('');
const sugges = ref([]);

const selectedGender = ref({ value: {} });
const searchQuery = ref('');

const res_latitute = ref('');
const res_longitude = ref('');
const center = ref({
    lat: null,
    lng: null
});
const markerOptions = ref({
    position: center.value,
    label: '',
    title: '',
    draggable: false
});

console.log('haaaa yaha kadam kadam par checking hotti h res_latitute', res_latitute.value);
console.log('haaaa yaha kadam kadam par checking hotti h res_longitude', res_longitude.value);

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
    get_events();
    store.fetchContacts();
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
            res_latitute.value = center.value.lat;
            res_longitude.value = center.value.lng;
            console.log('Geocoding successful:', center.value);
            console.log('res_latitute successful:', res_latitute.value);
            console.log('res_longitude successful:', res_longitude.value);
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
            res_latitute.value = center.value.lat;
            res_longitude.value = center.value.lng;

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

const sortBy = ref('name'); 
const valid = ref(true);
const dialog = ref(false);
const search = ref('');

const editedIndex = ref(-1);
const editedItem = ref({
    id: '',
    image: '',
    image2: '',
    event_url: '',
    tagModel: [],
    event_name: '',
    start_date: '',
    end_date: '',
    event_time: '',
    venue: '',
    unique_items: '',
    description: '',
    price: '',
    is_rsvp: false
});
const defaultItem = ref({
    id: '',
    image: '',
    image2: '',
    event_name: '',
    tagModel: [],
    start_date: '',
    end_date: '',
    event_time: '',
    venue: '',
    unique_items: '',
    description: '',
    price: ''
});
//Methods
const filteredList = computed(() => {
    return desserts.value.filter((user: any) => {
        if (user.event_name === null || user.event_name === undefined) {
            return false;
        }
        return user.event_name.toLowerCase().includes(search.value.toLowerCase());
    });
});





// const paginatedList = computed(() => {
//     const start = (currentPage.value - 1) * itemsPerPage;
//     const end = start + itemsPerPage;
//     return filteredList.value.slice(start, end);
// });
const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return sortedList.value.slice(start, end);
});



const sortedList = computed(() => {
  return [...filteredList.value].sort((a, b) => {
    if (sortBy.value === 'name') {
      return a.event_name.localeCompare(b.event_name);
    } else if (sortBy.value === 'price') {
      return a.price - b.price;
    } else if (sortBy.value === 'start date') {
      return new Date(a.start_date) - new Date(b.start_date);
    }
    return 0;
  });
});

function editItem(item: any) {
    editedIndex.value = desserts.value.indexOf(item);
    editedItem.value = Object.assign({}, item);
    dialog.value = true;
}
function deleteItem(item: any) {
    console.log('check this id is correct or not------------', item);
    delete_events(item);
    const index = desserts.value.indexOf(item);
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
        // Object.assign(desserts.value[editedIndex.value], editedItem.value);
        // console.log('check the data is here or not----', editedItem.value.id);
        edit_event(editedItem.value.id);
    } else {
        event_create();
        // desserts.value.push(editedItem.value);
    }
    close();
}

//Computed Property
const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'New Events' : 'Edit Events';
});

const editor = useEditor({
    extensions: [StarterKit],
    content: ``
});

const editorDesc = useEditor({
    extensions: [StarterKit],
    content: ``
});

import { format } from 'date-fns';

const formatDateWithoutTimezone = (dateStr: any) => {
    const date = new Date(dateStr);
    return format(date, 'EEE MMM dd yyyy HH:mm'); // Format to desired structure
};

const currentImage = ref<string[]>([]);

// const handleImageUpload = (event: any, index: any) => {
//     const input = event.target;
//     if (input.files && input.files[0]) {
//         const reader = new FileReader();
//         reader.onload = () => {
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
//         reader.readAsDataURL(input.files[0]);
//     }
// };

// Ref to hold the image file
// const currentImage = ref<File | null>(null); // Using ref to store the File object

// // Event handler for image upload
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
        reader.readAsDataURL(input.files[0]);
    }
};


const event_create = async () => {
    try {
        const token_user = localStorage.getItem('authToken');
        const description = editorDesc.value?.getHTML().trim(); // Use .getText() for plain text
        const unique_items = editor.value?.getHTML().trim(); // Use .getText() for plain text

        const formdata = new FormData();

        formdata.append('token', token_user);
        formdata.append('event_name', editedItem.value.event_name);
        formdata.append('event_url', editedItem.value.event_url);
        formdata.append('start_date', editedItem.value.start_date);
        formdata.append('end_date', editedItem.value.end_date);
        formdata.append('price', editedItem.value.price);
        formdata.append('venue', editedItem.value.venue);
        formdata.append('description', editedItem.value.description);
        formdata.append('unique_items', editedItem.value.unique_items);
        formdata.append('tagModel', editedItem.value.tagModel);
        formdata.append('res_latitute', res_latitute.value);
        formdata.append('res_longitude', res_longitude.value);
        formdata.append('is_rsvp', editedItem.value.is_rsvp ? 'true' : 'false');


        if (currentImage) {
            console.log('check image here or not----', currentImage.value);
            formdata.append('image', currentImage.value); // Append the File object
        }

        const response = await axios.post('api/v_super/add_event/', formdata);
        if (response.data.status === 'add_event') {
            get_events();

            // Reset the form fields
            editedItem.value.event_name = '';
            editedItem.value.event_url = '';
            editedItem.value.start_date = '';
            editedItem.value.end_date = '';
            editedItem.value.price = '';
            editedItem.value.venue = '';
            editedItem.value.description = '';
            editedItem.value.unique_items = '';
            editedItem.value.tagModel = '';
            res_latitute.value = '';
            res_longitude.value = '';
            if (currentImage) {
                currentImage.value = null;
            }
        } else {
            console.log('Invalid response');
        }
    } catch (error) {
        console.error('API error:', error);
    }
};
// onUnmounted(() => {
//     if (editorDesc.value) {
//         editorDesc.value.destroy();
//     }
//     if (editor.value) {
//         editor.value.destroy();
//     }
// });
const get_events = async () => {
    new_loader.value = true;
    try {
        const token_user = localStorage.getItem('authToken');
        const res_id = window.location.href.split('/').pop();
        const formdata = {
            token: token_user,
            res_id: res_id
        };
        const response = await axios.post('api/v_super/get_events/', formdata);
        const get_events = response.data.get_events;
        if (get_events) {
            new_loader.value = false;
            const updatedData = get_events.map((item: any, index: any) => {
                console.log('chekc the time ------------------', item);
                const topicsValues = Array.isArray(item.topics) ? item.topics.map((c: any) => c.name) : [];
                // nextTick(() => {
                //     setTimeout(() => {
                //         if (editorDesc.value?.commands) {
                //             console.log('check kitni bar challa _____')
                //             editorDesc.value.commands.insertContent(item.description); // Insert the current item's description
                //         } else {
                //             console.error("Editor instance not ready yet!");
                //         }
                //     }, 500);
                // });
                return {
                    id: item.id,
                    Sr_no: `#${index + 1}`,
                    event_name: item.title,
                    start_date: formatDateWithoutTimezone(item.start_date + ' ' + item.start_time),
                    end_date: formatDateWithoutTimezone(item.end_date + ' ' + item.end_time),

                    tagModel: topicsValues,
                    price: item.price,
                    venue: item.address,
                    image: item.image,
                    image2: item.image2,
                    event_url: item.event_url,
                    unique_items: item.unique_items?.trim() ? item.unique_items : 'N/A',
                    description: item.description?.trim() ? item.description : 'N/A',
                    is_rsvp   : item.is_rsvp,
                    is_active: item.is_active,
                };
            });
            desserts.value = updatedData;
        }
    } catch (error) {
        new_loader.value = false;
        console.error('API error:', error);
    }
};

const delete_events = async (event_id: any) => {
    console.log('cjhcke krlo delete krna h kya kuch', event_id);
    try {
        const token_user = localStorage.getItem('authToken');
        const formdata = {
            token: token_user,
            event_id: event_id
        };
        console.log('this is ehy we have here', formdata);
        const response = await axios.post('api/v_super/delete_events/', formdata);
        if (response.data.status === 'delete_events') {
            get_events();
        } else {
            console.log('Invalid response');
        }
    } catch (error) {
        console.error('API error:', error);
    }
};

const edit_event = async (event_id: any) => {
    try {
        const token_user = localStorage.getItem('authToken');
        console.log('this is token', token_user);

        const formdata = new FormData();

        formdata.append('token', token_user);
        formdata.append('event_id', event_id);
        formdata.append('event_name', editedItem.value.event_name);
        formdata.append('event_url', editedItem.value.event_url);
        formdata.append('start_date', editedItem.value.start_date);
        formdata.append('end_date', editedItem.value.end_date);
        formdata.append('price', editedItem.value.price);
        formdata.append('venue', editedItem.value.venue);
        formdata.append('description', editedItem.value.description);
        formdata.append('unique_items', editedItem.value.unique_items);
        formdata.append('is_rsvp', editedItem.value.is_rsvp ? 'true' : 'false');

        if (currentImage) {
            console.log('check image here or not----', currentImage.value);
            formdata.append('image', currentImage.value);
        }

        const response = await axios.post('api/v_super/edit_event/', formdata);
        if (response.data.status === 'edit_event') {
            get_events();
        } else {
            console.log('Invalid response');
        }
    } catch (error) {
        console.error('API error:', error);
    }
};

const archive_event = async (event_id: any) => {
    console.log('cjhcke krlo delete krna h kya kuch', event_id);
    try {
        const token_user = localStorage.getItem('authToken');
        const formdata = {
            token: token_user,
            event_id: event_id
        };
        console.log('this is ehy we have here', formdata);
        const response = await axios.post('api/v_super/archive_event/', formdata);
        if (response.data.status === 'archive_event') {
            get_events();
        } else {
            console.log('Invalid response');
        }
    } catch (error) {
        console.error('API error:', error);
    }
};


const event_submit = async (item: any) => {
    console.log('cjhcke krlo delete krna h kya kuch', item);
    console.log('cjhcke krlo delete krna h kya kuch', item.id);
    console.log('cjhcke krlo delete krna h kya kuch', item.is_active);
    try {
        const token_user = localStorage.getItem('authToken');
        const formdata = {
            token: token_user,
            event_id: item.id,
            is_active: item.is_active,
        };
        console.log('this is ehy we have here', formdata);
        const response = await axios.post('api/v_super/Edit_event_active_toggle/', formdata);
        if (response.data.status === 'edit_event_status') {
            get_events();
        } else {
            console.log('Invalid response');
        }
    } catch (error) {
        console.error('API error:', error);
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

const uploadFileToevents = async () => {
    if (!selectedFile2.value) return;
    uploading.value = true; // Show the progress bar
    const intervalId = setInterval(increaseProgress, 90); // Increase progress every 90 milliseconds

    const token_user = localStorage.getItem('authToken');
    const formData = new FormData();
    formData.append('file', selectedFile2.value);
    formData.append('token', token_user);
    try {
        const response = await axios.post('api/v_super/fileforevents/', formData);
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
            }, 3000);
            get_events();
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
    const filePath = '/assets/images/events.xlsx';
    const fileName = 'events.xlsx';
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;   
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// --------------------------------------------------------------
const Eventname_error = ref('');
const websiteURLError = ref('');
const priceError = ref('');
const venueError = ref('');

const validateEventname = () => {
    if (editedItem.value.event_name.length < 4) {
        Eventname_error.value = 'Name must be at least 4 characters long.';
    } else {
        Eventname_error.value = '';
    }
};

const validateWebsiteURL = () => {
    const allowedDomains = [
        'com',
        'org',
        'net',
        'int',
        'edu',
        'gov',
        'mil', // Generic TLDs
        'biz',
        'info',
        'mobi',
        'name',
        'pro',
        'aero',
        'coop',
        'museum', // Sponsored TLDs
        'us',
        'uk',
        'ca',
        'de',
        'fr',
        'au',
        'in',
        'cn',
        'jp',
        'kr', // Country code TLDs
        'br',
        'ru',
        'za',
        'nz',
        'mx',
        'es',
        'it',
        'nl',
        'se',
        'no', // More country code TLDs
        'ch',
        'be',
        'dk',
        'fi',
        'pl',
        'tr',
        'gr',
        'pt',
        'ro',
        'hu', // Even more country code TLDs
        'io',
        'xyz',
        'co',
        'ai',
        'me',
        'tv' // Newer popular TLDs
        // Add more as needed
    ];

    // Join the allowed domains into a single string separated by '|'
    const allowedDomainsPattern = allowedDomains.join('|');
    // Create the regular expression pattern
    const urlPattern = new RegExp(`^(https?:\\/\\/)?([\\w-]+\\.)+[\\w-]{2,}\\.(?:${allowedDomainsPattern})(\\/\\S*)?$`);

    const url = editedItem.value.event_url.trim(); // Trim whitespace from input

    if (!urlPattern.test(url)) {
        websiteURLError.value = 'Invalid website URL. Must start with http:// or https:// & www and end with a valid domain.';
    } else {
        websiteURLError.value = '';
    }
};

const validatePrice = () => {
    const price = editedItem.value.price;
    if (price == '') {
        priceError.value = 'Price must be a valid number';
    } else {
        priceError.value = '';
    }
};
const validateVenue = () => {
    if (editedItem.value.venue.length < 4) {
        venueError.value = 'Address must be at least 4 characters long.';
    } else {
        venueError.value = '';
    }
};

const isButtonHidden = ref(false);
const showCheckboxes = ref(false);
const sample_id = ref([]);
const btn_name = ref('select all');
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
        const response = await axios.post('api/v_super/delete_all_events/', formdata);
        console.log('API response:', response.data);
        if ((response.data.status = 'delete_api')) {
            get_events();
            toggleCheckboxes();
            isButtonHidden.value = false;
        }
    } catch (error) {
        console.error('Error calling API:', error);
    }
};






</script>
<template>
    <v-row>
        <!-- <v-col cols="12" md="6">
            <v-text-field density="compact" v-model="search" label="Search Events" hide-details variant="outlined"></v-text-field>
        </v-col> -->
        <v-col cols="12" md="3">
            <v-text-field density="compact" v-model="search" label="Search Events" hide-details variant="outlined"></v-text-field>
        </v-col>

        <v-col cols="12" md="3">
            <v-select
                v-model="sortBy"
                :items="['name', 'price','start date']"
                label="Sort By"
                variant="outlined"
                density="compact"
                hide-details
            ></v-select>
        </v-col>


        

        <v-col cols="12" md="6" class="text-right">
            <div>
                <v-btn color="error" flat class="ml-auto me-1" v-if="isButtonHidden" @click="delete_all()">
                    <TrashIcon size="15" class="me-1" /> Delete All
                </v-btn>
                <v-btn color="primary" flat class="ml-auto me-1" @click="toggleCheckboxes()">
                    {{ btn_name }}
                </v-btn>
                <v-dialog v-model="dialog" max-width="800">
                    <template v-slot:activator="{ props }">
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

                                                <!-- <div id="app">
                                                    <h1>Progress Bar Example</h1>
                                                    <ProgressBar :progress="progress" />
                                                </div> -->
                                            </v-col>
                                        </v-row>
                                    </v-form>
                                </v-card-text>

                                <v-card-actions class="pa-4">
                                    <v-spacer></v-spacer>
                                    <v-btn color="error" @click="bulkUpload = false">Cancel</v-btn>
                                    <v-btn color="primary" :disabled="selectedFile2 == null" variant="flat" @click="uploadFileToevents()"
                                        >Save</v-btn
                                    >
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                        <v-btn color="primary" v-bind="props" flat class="ml-auto">
                            <v-icon class="mr-2">mdi-plus</v-icon>Add Events
                        </v-btn>
                        <div>
                            <v-dialog v-model="successFul" max-width="400" class="p-0">
                                <!-- <template v-slot:activator="{ props }">
                                    <v-btn color="primary" v-bind="props" flat class="ml-auto">
                                        <v-icon class="mr-2">mdi-plus</v-icon>Success
                                    </v-btn>
                                </template> -->
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
                                <!-- <template v-slot:activator="{ props }">
                                    <v-btn color="primary" v-bind="props" flat class="ml-auto">
                                        <v-icon class="mr-2">mdi-plus</v-icon>Cancel
                                    </v-btn>
                                </template> -->
                                <v-card class="p-0">
                                    <v-card-text class="py-0 px-0 text-center">
                                        <img src="@/assets/images/locator/cancel.gif" style="width: 320px" />
                                        <h3 class="text-center pb-3">File Format Must Be in Excel...</h3>
                                    </v-card-text>
                                </v-card>
                            </v-dialog>
                        </div>
                    </template>
                    <v-card>
                        <v-card-title class="pa-4 bg-primary">
                            <span class="title text-white">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-form ref="form" v-model="valid" lazy-validation>
                                <v-row>
                                    <v-col cols="12" sm="6">
                                        <v-label>Events Name <span class="required">*</span></v-label>
                                        <v-text-field
                                            variant="outlined"
                                            hide-details
                                            v-model="editedItem.event_name"
                                            @input="validateEventname"
                                        ></v-text-field>
                                        <p v-if="Eventname_error" class="error">{{ Eventname_error }}</p>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-label>Website Url <span class="required">*</span></v-label>
                                        <v-text-field
                                            variant="outlined"
                                            hide-details
                                            v-model="editedItem.event_url"
                                            type="text"
                                            @input="validateWebsiteURL"
                                            placeholder="http://www.example.com"
                                        ></v-text-field>
                                        <p v-if="websiteURLError" class="error">{{ websiteURLError }}</p>
                                    </v-col>
                                    <v-col cols="12" md="6" sm="6">
                                        <v-label>Start Date & Time <span class="required">*</span></v-label>
                                        <VueDatePicker variant="outlined" v-model="editedItem.start_date" time-picker-inline />
                                    </v-col>
                                    <v-col cols="12" md="6" sm="6">
                                        <v-label>End Date & Time <span class="required">*</span></v-label>
                                        <VueDatePicker v-model="editedItem.end_date" time-picker-inline class="pt-1 pb-1" />
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                        <v-label>Price <span class="required">*</span></v-label>
                                        <v-text-field
                                            variant="outlined"
                                            hide-details
                                            v-model="editedItem.price"
                                            type="number"
                                            @input="validatePrice"
                                        >
                                            <template v-slot:prepend-inner>
                                                <CurrencyDollarIcon stroke-width="1.5" size="18" class="text-medium-emphasis" />
                                            </template>
                                        </v-text-field>
                                        <p v-if="priceError" class="error">{{ priceError }}</p>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-label>Tags <span class="required">*</span></v-label>
                                        <v-combobox
                                            v-model="editedItem.tagModel"
                                            class="chipTheme"
                                            hide-details
                                            multiple
                                            chips
                                        ></v-combobox>
                                    </v-col>

                                    <v-col cols="12" md="6">
                                    <v-checkbox
                                        v-model="editedItem.is_rsvp"
                                        label="RSVP Event"
                                        hide-details
                                    ></v-checkbox>
                                    </v-col>


                                    <v-col cols="12" md="12" sm="12">
                                        <v-label>Venue address <span class="required">*</span></v-label>
                                        <v-textarea
                                            variant="outlined"
                                            hide-details
                                            v-model="editedItem.venue"
                                            @input="validateVenue"
                                        ></v-textarea>
                                        <p v-if="venueError" class="error">{{ venueError }}</p>
                                    </v-col>

                                    <v-col cols="12" md="12" sm="12">
                                        <v-label>Description</v-label>
                                        <v-textarea
                                            variant="outlined"
                                            hide-details
                                            v-model="editedItem.description"
                                        ></v-textarea>
                                        <!-- <p v-if="venueError" class="error">{{ venueError }}</p> -->
                                    </v-col>

                                    <v-col cols="12" md="12" sm="12">
                                        <v-label>Unique Feature</v-label>
                                        <v-textarea
                                            variant="outlined"
                                            hide-details
                                            v-model="editedItem.unique_items"
                                        ></v-textarea>
                                    </v-col>

                                    <!-- <v-col cols="12" md="12" sm="12">
                                        <v-lable>Description</v-lable>

                                        <div v-if="editor">
                                            <EditorMenubar :editor="editorDesc" />
                                        </div>
                                        <editor-content :editor="editorDesc" v-model="editedItem.description" />
                                    </v-col> -->

                                    <!-- <v-col cols="12" md="12" sm="12">
                                        <v-lable>Unique Feature</v-lable>

                                        <div v-if="editor">
                                            <EditorMenubar :editor="editor" />
                                        </div>
                                        <editor-content :editor="editor" v-model="editedItem.unique_items" />
                                    </v-col> -->
                                    <v-col cols="12">
                                        <div class="">
                                            <label for="logoImageLbl0" class="imageUploadRestu">
                                                <span class="text-primary text-subtitle-1">Upload Your Events Photo</span>
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
                                            <!-- <div class="restuImageShowList" v-if="currentImage.length > 0">
                                                <img :src="currentImage[0]" alt="Uploaded Image" />
                                            </div> -->
                                        </div>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-row class="mb-3">
                                            <v-col cols="col">
                                                <div style="position: relative">
                                                    <v-text-field
                                                        variant="outlined"
                                                        hide-details
                                                        v-model="searchQuery"
                                                        @input="handleInput"
                                                        placeholder="Search your venue address"
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
                                        <!-- <v-col cols="12" lg="5" md="4"></v-col> -->

                                        <!-- <v-col cols="12" lg="5" md="4"></v-col> -->

                                        <!-- <GMapAutocomplete placeholder="Search for a location" @place_changed="setPlace" style="font-size: medium"> </GMapAutocomplete> -->

                                        <!-- <GMapAutocomplete placeholder="Search for a location"  @place_changed="setPlace" style="font-size: medium"></GMapAutocomplete>
                                            <div v-if="locationDetails.address">
                                                <p>Address: {{ locationDetails.address }}</p>
                                                <p>
                                                    URL: <a :href="locationDetails.url" target="_blank">{{ locationDetails.url }}</a>
                                                </p>
                                        </div> -->

                                        <GoogleMap
                                            api-key="AIzaSyBDgAEVa_Bno6jxhGy4W1LYhhNBW4aMSfI"
                                            style="width: 100%; height: 500px"
                                            :center="center"
                                            :zoom="13"
                                            @click="updateMarkerPosition($event)"
                                        >
                                            <Marker :options="markerOptions" @dragend="updateMarkerPosition" />
                                        </GoogleMap>
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
                                    editedItem.event_name == '' ||
                                    editedItem.event_url == '' ||
                                    websiteURLError !== '' ||  // Disable if websiteURLError has a value
                                    editedItem.start_date == '' ||
                                    editedItem.end_date == '' ||
                                    editedItem.tagModel == '' ||
                                    editedItem.price == '' ||
                                    editedItem.venue == ''
                                "
                                variant="flat"
                                @click="save"
                                >Save</v-btn
                            >
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
        </v-col>
    </v-row>
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
                    <th class="text-subtitle-1 font-weight-semibold">Events Details</th>
                    <th class="text-subtitle-1 font-weight-semibold">Start Date / End Date</th>
                    <th class="text-subtitle-1 font-weight-semibold">Price</th>
                    <th class="text-subtitle-1 font-weight-semibold">Venue</th>
                    <th class="text-subtitle-1 font-weight-semibold">Actions</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="paginatedList.length > 0">
                    <tr v-for="(item, index) in paginatedList" :key="index" :currentPage="currentPage" :pageSize="5">
                        <td v-if="showCheckboxes">
                            <v-checkbox color="primary" :value="item.id" hide-details @change="updateCheckedItems(item.id)"></v-checkbox>
                        </td>
                        <td class="text-subtitle-1">{{ item.Sr_no }}</td>
                        <td>
                            <div class="d-flex align-center py-4">
                                <div v-if="item.image2">
                                    <v-img :src="item.image2" class="imageSizeFixd rounded-md img-fluid" />
                                </div>
                                <div v-else-if="item.image">
                                    <v-img :src="`${BASE_URL}${item.image}`" class="imageSizeFixd rounded-md img-fluid" />
                                </div>
                                <div v-else>
                                    <v-img :src="vImageIcon" class="imageSizeFixd rounded-md img-fluid" />
                                </div>

                                <div class="ms-2">
                                    <h4 class="text-subtitle-1 mb-1 font-weight-semibold">{{ item.event_name }}</h4>
                                     <v-chip v-if="item.is_rsvp" color="primary" class="ma-1" size="small"
                                        label>
                                        RSVP Event
                                    </v-chip>
                                </div>
                            </div>
                        </td>
                        <td class="py-2">
                            <span class="text-subtitle-1 d-flex textSecondary">
                                <ClockIcon color="primary" size="14" class="me-1" />
                                <span>{{ item.start_date }}</span>
                            </span>
                            <span class="text-subtitle-1 d-flex mt-1 textSecondary">
                                <AlarmOffIcon color="primary" size="14" class="me-1" /><span>{{ item.end_date }}</span>
                            </span>
                        </td>
                        <td class="text-subtitle-1">
                            <v-chip
                                :color="item.price === 'Moderate' ? 'warning' : item.price === 'Difficult' ? 'error' : 'success'"
                                size="small"
                                >{{ item.price }}</v-chip
                            >
                        </td>
                        <td class="text-subtitle-1">
                            <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.venue }}</span>
                        </td>
                        <td>
                            <div  class="d-flex align-center"> 
                                <!-- <div  class="me-4">
                                    <v-switch 
                                    color="primary" 
                                    v-model="item.is_active" 
                                    hide-details 
                                    @change="event_submit(item)">
                                    </v-switch>
                                </div>    -->
                                <v-tooltip text="View">
                                    <template v-slot:activator="{ props }">
                                        <router-link :to="`/events_detail/${item.id}`" color="primary">
                                            <v-btn icon flat>
                                                <EyeIcon size="20" v-bind="props" class="text-primary" />
                                            </v-btn>
                                        </router-link>
                                    </template>
                                </v-tooltip>
                                <v-tooltip text="Edit">
                                    <template v-slot:activator="{ props }">
                                        <v-btn icon flat @click="editItem(item)" v-bind="props">
                                            <PencilIcon stroke-width="1.5" size="20" class="text-primary" />
                                        </v-btn>
                                    </template>
                                </v-tooltip>
                                <v-tooltip text="Archive">
                                    <template v-slot:activator="{ props }">
                                        <v-btn icon flat @click="archive_event(item.id)" v-bind="props">
                                            <ArchiveIcon stroke-width="1.5" size="20" class="text-primary" />
                                        </v-btn>
                                    </template>
                                </v-tooltip>
                                <v-tooltip text="Delete">
                                    <template v-slot:activator="{ props }">
                                        <v-btn icon flat @click="deleteItem(item.id)" v-bind="props">
                                            <TrashIcon stroke-width="1.5" size="20" class="text-error" />
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
        :length="Math.ceil(filteredList.length / itemsPerPage)"
        rounded="circle"
    ></v-pagination>
</template>

<style>
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
.required {
    color: red;
    margin-left: 4px;
}
</style>