<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useContactStore } from '@/stores/apps/contact';
import vImageIcon from '@/assets/images/locator/v-icon.jpg';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL;

// import restuProfile from '@/assets/images/locator/restaurant-profile.jpg';
// import contact from '@/_mockApis/apps/contact';
// import { VTable, VPagination } from '@/_mockApis/apps/contact';

import user1 from '@/assets/images/locator/restu/restu1.jpg';
// import user2 from '@/assets/images/locator/restu/restu2.jpg';
// import user3 from '@/assets/images/locator/restu/restu3.jpg';
// import user4 from '@/assets/images/locator/restu/restu2.jpg';
// import user5 from '@/assets/images/locator/restu/restu3.jpg';
// import user6 from '@/assets/images/locator/restu/restu1.jpg';
// import user7 from '@/assets/images/locator/restu/restu2.jpg';
// import user8 from '@/assets/images/locator/restu/restu1.jpg';
// import user9 from '@/assets/images/locator/restu/restu3.jpg';
// import user10 from '@/assets/images/locator/restu/restu1.jpg';

import { GoogleMap, Marker } from 'vue3-google-map';
// const center = { lat: 30.710036, lng: 76.710269 };
// const center = ref({ lat: 37.7749, lng: -122.4194 });
const center = ref('');
// const markerOptions = { position: center, label: 'L', title: 'LADY LIBERTY' };
const markerOptions = ref('');
const sugges = ref([]);

const permanent_closed = ref('');



const myerrors = ref('');
const showSuccessMessage            = ref(false);
const showErrorMessage              = ref(false);


const new_loader = ref(false);
const store = useContactStore();
const desserts = ref([]);
const selectedGender = ref({ value: {} });
// const selectedGender = ref({});
const searchQuery = ref('');
const formattedAddress = ref('');
const res_latitute = ref('');
const res_longitude = ref('');
const submitted_name = ref('');
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

    weekData.value.map((weekItem) => {
        selectedGender.value[weekItem.weekLabel] = [false, null, null];
        editedItem.value.monStartTimeMdl.push('');
        editedItem.value.monEndTimeMdl.push('');
    });
    all_inactive_res();
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
            formattedAddress.value = results[0].formatted_address;
            editedItem.address = results[0].formatted_address;
            console.log('Formatted Address:', formattedAddress.value);
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
    const geocoder = new google.maps.Geocoder();
    console.log('Geocoder initialized', geocoder);
    geocoder.geocode({ address: updates }, (results, status) => {
        console.log('Geocoding status:', status);
        if (status === 'OK' && results[0]) {
            console.log('Geocoding results:', results);

            const location = results[0].geometry.location;
            res_latitute.value = location.lat();
            res_longitude.value = location.lng();
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
    sugges.value = suggestions;
};
const selectlisting = (suggestions: any) => {
    console.log('Selected suggestion in selectlisting:', suggestions);
    searchQuery.value = suggestions;

    sugges.value = '';
    searchAgain(sugges.value);
};

const bulkUpload = ref(false);
const successFul = ref(false);
const file_cancel = ref(false);
const blukForm2 = ref('');
const barprogress = ref(false);
const selectedFile2 = ref<File | null>(null);

const handleFileUpl = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
        selectedFile2.value = target.files[0];
    }
};
const uploading = ref(false);
const progress = ref(0);
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
        const response = await axios.post('api/v_super/fileforrestaurant/', formData);
        console.log('check the data response --------------',response.data)
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
            all_inactive_res();
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

const itemsPerPage = 10;
const currentPage = ref(1);

const valid = ref(true);
const dialog = ref(false);
const search = ref('');
// const topics_value = ref('');

const generateTimes = (index: number) => {
    const times = [];
    const formatTime = (hour: number, minute: number) => {
        const ampm = hour < 12 ? 'AM' : 'PM';
        const h = hour % 12 || 12;
        const m = minute.toString().padStart(2, '0');
        return `${h}:${m} ${ampm}`;
    };

    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            times.push(formatTime(hour, minute));
        }
    }
    return times;
};
// const monStartTimeItem =ref({})
const weekData = ref([
    {
        weekLabel: 'Monday',
        checkValue: false
    },
    {
        weekLabel: 'Tuesday',
        checkValue: false
    },
    {
        weekLabel: 'Wednesday',
        checkValue: false
    },
    {
        weekLabel: 'Thrusday',
        checkValue: false
    },
    {
        weekLabel: 'Friday',
        checkValue: false
    },
    {
        weekLabel: 'Saturday',
        checkValue: false
    },
    {
        weekLabel: 'Sunday',
        checkValue: false
    }
]);

const editedIndex = ref(-1);

const editedItem = ref({
    id: '',
    avatar: '',
    restuName: '',
    email: '',
    phone: '',
    websiteURL: '',
    address: '',
    Category: '',
    about: '',
    restaurantType: '',
    openHours: '',
    tagModel: [],
    start_time: '',
    end_time: '',
    monStartTimeMdl: [],
    monEndTimeMdl: []
});

const defaultItem = ref({
    id: '',
    avatar: '',
    restuName: '',
    email: '',
    phone: '',
    tagModel: [],
    websiteURL: '',
    address: '',
    Category: '',
    about: '',
    restaurantType: '',
    openHours: '',
    start_time: '',
    end_time: '',
    monStartTimeMdl: [],
    monEndTimeMdl: []
});

function editedValue() {
    console.log(editedItem.value.monStartTimeMdl);
}
const CategoryList = ref(['Asian', 'Thai', 'Italian', 'Mexican', 'Indian', 'American', 'Bakery', 'Juices', 'Smoothies']);

// const restaurantTypeList = ref(['Fine Dining', 'Casual Dining', 'Fast Food', 'Cafe', 'Bar']);
const categoryRestu = ref(['All', 'Asian', 'Thai', 'Italian', 'Mexican', 'Indian', 'American', 'Bakery']);

// const CategoryList = ref();
// Methods
// const filteredList = computed(() => {
//     return desserts.value.filter((user: any) => {
//         return (
//             user.restuName.toLowerCase().includes(search.value.toLowerCase()) ||
//             user.restaurantType.toLowerCase().includes(search.value.toLowerCase())
//         );
//     });
// });

const selectedCategory = ref('');
const filteredList = computed(() => {
    console.log('desserts.value',desserts.value)
    return desserts.value.filter((item: any) => {

        const searchLower = search.value ? search.value.toLowerCase() : ''; // Default to empty string
        const restuName = item.restuName ? item.restuName.toLowerCase() : ''; // Default to empty string
        const restaurantType = item.Category ? item.Category.map((category:any) => category.toLowerCase()) : []; 

        return (
            restuName.includes(searchLower) &&
            (selectedCategory.value === 'All' ||
                selectedCategory.value === '' ||
                (restaurantType && restaurantType.includes(selectedCategory.value.toLowerCase())))
        );
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
    center.value = ref({ lat: editedItem.value.latitude, lng: editedItem.value.longitude }); 
    res_latitute.value = editedItem.value.latitude;
    res_longitude.value = editedItem.value.longitude;
    console.log("editedItem.value_________________________", editedItem.value, editedItem.value.latitude, editedItem.value.longitude);
    editedItem.value.monStartTimeMdl = [];
    editedItem.value.monEndTimeMdl = [];
    dialog.value = true;
}

function deleteItem(item: any) {
    const index = desserts.value.indexOf(item);
    console.log('yaha delete id hai', item.id);
    submit_res_deleteForm(item.id);
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
        submit_res_EditForm();
    } else {
        submit_res_Form();
        // desserts.value.push(editedItem.value);
    }
    close();
}

//Computed Property
const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'New Restaurant' : 'Edit Restaurant';
});

const all_inactive_res = async () => {
    new_loader.value = true;
    const token_user = localStorage.getItem('authToken');
    const formData = {
        token: token_user,
        lv_1: 'all'
    };
    const response = await axios.post('api/v_super/all_inactive_res/', formData);
    if (response.data.status === 'done') {
        new_loader.value = false;
        const updatedData = response.data.v_res_details.map((item: any, index: any) => {
            // console.log('yaha dekh aaya data kuch -----------------------', item.timings);
            try{
                const submitted_by = `${item.sub_by.first_name} ${item.sub_by.last_name}`;
                submitted_name.value = submitted_by.replace(' ','') ? submitted_by : 'N/A';
            }catch(error){
                submitted_name.value = 'N/A'
            }
            
            const categoryValues = Array.isArray(item.category) ? item.category.map((c: any) => c.name) : [];
            const topicsValues = Array.isArray(item.topics) ? item.topics.map((c: any) => c.name) : [];
            const timingsValues = Array.isArray(item.timings) ? item.timings.map((c: any) => c) : [];
            
            
            // const time = item.timings.map((a:any)=>{ selectedGender.value[a.day] = [true, a.time_obj[0], a.time_obj[1]] });
            // console.log('check the data ---- in time value ---', time);
            
            return {
                id: item.id,
                serial_no: `#${index + 1}`,
                tagModel: topicsValues,
                avatar: item.image,
                // avatar2: item.image2,
                restuName: item.restaurant_name,
                email: item.email,
                // start_time : item.timings,
                // end_time : item.timings,
                phone: item.phone_number,
                Category: categoryValues,
                websiteURL: item.website,
                address: item.address,

                
                about: item.about,
                latitude: item.latitude,
                longitude: item.longitude,
                restaurantType: 'done',
                monStartTimeMdl: timingsValues.opening_hours,
                monEndTimeMdl: timingsValues.closing_hours,
                permanent_closed: item.permanent_closed
          
            };
        });
        desserts.value = updatedData;
    } else {
        new_loader.value = false;
        console.log('First Error');
    }
    // } catch (error) {
    //     console.error('Invalid api');
    // }
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

const get_category = async () => {
    try {
        const token_user = localStorage.getItem('authToken');
        const res_id = window.location.href.split('/').pop();
        const formdata = {
            token: token_user,
            res_id: res_id
        };
        const response = await axios.post('api/v_super/get_category/', formdata);
        const get_category = response.data.get_category;
        const updatedData = get_category.map((item: any, index: any) => {
            return {
                id: item.id,
                Sr_no: `#${index + 1}`,
                catFiles: `${BASE_URL}${item.cate_images}`,
                catName: item.name
            };
        });

        CategoryList.value = updatedData.map((item: any) => item.catName);
        categoryRestu.value = updatedData.map((item: any) => item.catName);
        categoryRestu.value.unshift('All');
    } catch (error) {
        console.error('API error:', error);
    }
};

const submit_res_Form = async () => {
    try {
        const token = localStorage.getItem('authToken');

        const formdata = new FormData();

        formdata.append('token', token);
        formdata.append('restuName', editedItem.value.restuName);
        formdata.append('restaurantType', editedItem.value.restaurantType);
        formdata.append('email', editedItem.value.email);
        formdata.append('about', editedItem.value.about);
        formdata.append('phone', editedItem.value.phone);
        formdata.append('tagModel', editedItem.value.tagModel);
        formdata.append('websiteURL', editedItem.value.websiteURL);
        formdata.append('add', formattedAddress.value);
        formdata.append('category', editedItem.value.Category);
        // formdata.append('openHours', editedItem.value.openHours);
        formdata.append('start_time', editedItem.value.start_time);
        formdata.append('end_time', editedItem.value.end_time);
        formdata.append('res_latitute', res_latitute.value);
        formdata.append('res_longitude', res_longitude.value);

        // weekData.value.forEach((weekItem, index) => {
        //     const weekLabel = weekItem.weekLabel;
        //     console.log('Appending weekLabel:', weekLabel); // Debugging
        //     if (selectedGender.value[weekLabel]) {
        //         formdata.append(`openHours[${weekLabel}][from]`, editedItem.value.monStartTimeMdl[index]);
        //         formdata.append(`openHours[${weekLabel}][to]`, editedItem.value.monEndTimeMdl[index]);
        //     }
        // });
        weekData.value.forEach((weekItem, index) => {
            const weekLabel = weekItem.weekLabel;
            console.log('Appending weekLabel:', weekLabel); // Debugging
            if (selectedGender.value[weekLabel][0]) {
                formdata.append(`openHours[${weekLabel}][from]`, selectedGender.value[weekLabel][1]);
                formdata.append(`openHours[${weekLabel}][to]`, selectedGender.value[weekLabel][2]);
            }
        });
        formdata.append('lv_2', 'submit_res_data');

        if (currentImage.value.length > 0 && currentImage.value[0]) {
            const imageBlob = base64ToBlob(currentImage.value[0]); // Convert to Blob
            formdata.append('uploaded_image', imageBlob, 'image.jpeg'); // Append image with a filename
        }

        console.log('this is form data', formdata);
        const response = await axios.post('api/v_super/a_details/', formdata);
        if (response.data.status === 'res_created') {
            resetFormData();


            all_inactive_res();
            get_category();
            close();
        } else {
            console.log('First Error');
        }
    } catch (error) {
        console.error('API error:', error);
    }
};


const togglePermanentClosed = async (item) => {
    editedItem.value = { ...item };
    permanent_closed.value = item.permanent_closed;

    // showLoader.value = true;
    try {
        const token = localStorage.getItem('authToken');
        const formdata = new FormData();
        // Add standard form fields
        formdata.append('token', token);
        formdata.append('res_id', editedItem.value.id);
        formdata.append('permanent_closed', permanent_closed.value);
        formdata.append('lv_3', 'submit_res_editform');

        const response = await axios.post('api/v_super/a_details/', formdata);
        // showLoader.value = false;
        if (item.permanent_closed) {
            showSuccessMessage.value = true
            myerrors.value = ' The restaurant has been Marked as permanently closed.';
            setTimeout(() => {  showSuccessMessage.value = false  }, 3000);
        } else {
            showSuccessMessage.value = true
            myerrors.value = 'Marked as open.';
            setTimeout(() => {  showSuccessMessage.value = false  }, 3000);
        }

        if (response.data.status === 'res_edited') {
            admin_app_details();
            close();
            weekData.value.forEach((weekItem) => {
                console.log(weekItem, "---------------------------------------------");
                selectedGender.value[weekItem.id] = '';
                selectedGender.value[weekItem.weekLabel] = [false, null, null];
                editedItem.value.monStartTimeMdl.push('');
                editedItem.value.monEndTimeMdl.push('');
            });
            
        } else {
            console.log('First Error');
        }
    } catch (error) {
        // showLoader.value = false;
        console.error('API error:', error);
    }  
};


const resetFormData = () => {
    // Reset image
    currentImage.value = '';
    currentImage.value = [];
    searchQuery.value =  '';
    imagename.value = '';
    // Reset address
    formattedAddress.value = '';

    // Reset edited item fields
    editedItem.value = {
        restuName: '',
        restaurantType: '',
        email: '',
        about: '',
        phone: '',
        tagModel: '',
        websiteURL: '',
        Category: '',
        start_time: '',
        end_time: '',
        // Add more fields as needed
    };

    // Reset week data
    weekData.value.forEach((weekItem) => {
        const weekLabel = weekItem.weekLabel;
        selectedGender.value[weekLabel] = ['', '', '']; // Reset each week data
    });

    // Reset latitude and longitude
    res_latitute.value = '';
    res_longitude.value = '';
};

const submit_res_EditForm = async () => {
    // showLoader.value = true;
    try {
        const token = localStorage.getItem('authToken');
        const formdata = new FormData();
        // Add standard form fields
        formdata.append('token', token);
        formdata.append('res_id', editedItem.value.id);
        formdata.append('restuName', editedItem.value.restuName);
        formdata.append('email', editedItem.value.email);
        formdata.append('phone', editedItem.value.phone);
        formdata.append('tagModel', editedItem.value.tagModel);
        formdata.append('websiteURL', editedItem.value.websiteURL);
        formdata.append('add', editedItem.value.address);
        formdata.append('category', editedItem.value.Category);
        formdata.append('openHours', editedItem.value.openHours);
        formdata.append('start_time', editedItem.value.start_time);
        formdata.append('end_time', editedItem.value.end_time);
        formdata.append('res_latitute', res_latitute.value);
        formdata.append('res_longitude', res_longitude.value);
        formdata.append('lv_3', 'submit_res_editform');
        
        if (currentImage.value.length > 0 && currentImage.value[0]) {
            const imageBlob = base64ToBlob(currentImage.value[0]); // Convert to Blob
            formdata.append('uploaded_image', imageBlob, 'image.jpeg'); // Append image with a filename
        }

        weekData.value.forEach((weekItem, index) => {
            const weekLabel = weekItem.weekLabel;
            console.log('Appending weekLabel:', weekLabel); // Debugging
            if (selectedGender.value[weekLabel][0]) {
                formdata.append(`openHours[${weekLabel}][from]`, selectedGender.value[weekLabel][1]);
                formdata.append(`openHours[${weekLabel}][to]`, selectedGender.value[weekLabel][2]);
            }
        });

        const response = await axios.post('api/v_super/a_details/', formdata);
        // showLoader.value = false;
        if (response.data.status === 'res_edited') {
            all_inactive_res();
            close();
        } else {
            console.log('First Error');
        }
    } catch (error) {
        // showLoader.value = false;
        console.error('API error:', error);
    }
};

const submit_res_deleteForm = async (item: any) => {
    try {
        const token = localStorage.getItem('authToken');
        const formdata = {
            token: token,
            res_id: item,
            lv_4: 'submit_res_deleteform'
        };
        const response = await axios.post('api/v_super/a_details/', formdata);
        if (response.data.status === 'res_deleted') {
            all_inactive_res();
            close();
        } else {
            console.log('First Error');
        }
    } catch (error) {
        console.error('API error:', error);
    }
};

const currentImage = ref<string[]>([]);
const uploadError = ref(null);
const imagename = ref('');
const handleImageUpload = (event: any, index: any) => {
    const input = event.target;
    if (input.files && input.files[0]) {
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
// const handleImageUpload = (event: any, index: any) => {
//     const input = event.target;
//     if (input.files && input.files[0]) {
//         const file = input.files[0];
//         const fileSizeMB = file.size / 1024 / 1024; // Size in MB

// if (fileSizeMB > 5) {
//     uploadError.value = 'File size is too large. Maximum size is 5 MB.';
//     return;
// }

//         const reader = new FileReader();
//         reader.readAsDataURL(file);

//         reader.onload = (e) => {
//             uploadError.value = null;
//             imagename.value = file.name;
//             console.log(`File accepted: ${file.name}, ${fileSizeMB.toFixed(2)} MB`);
//             // Add your upload logic here
//         };
//     }
// };

const categoryAdd = () => {
    valid.value = false;
    router.push('/restaurant_category');
};

const downloadFile = () => {
    const filePath = '/assets/images/Restaurant_details.xlsx';
    const fileName = 'Restaurant_details.xlsx';
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// -------------------------------------------
const nameError = ref('');
const emailError = ref('');
const phoneError = ref('');
const websiteURLError = ref('');
const validateName = () => {
    if (editedItem.value.restuName.length < 4) {
        nameError.value = 'Name must be at least 4 characters long.';
    } else {
        nameError.value = '';
    }
};

const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(editedItem.value.email) && editedItem.value.email) {
        emailError.value = 'Invalid email address.';
    } else {
        emailError.value = '';
    }
};

const validatePhone = () => {
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(editedItem.value.phone) && editedItem.value.phone) {
        phoneError.value = 'Phone number must be 10 digits long.';
    } else {
        phoneError.value = '';
    }
};

const validateWebsiteURL = () => {
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/;
    const url = editedItem.value.websiteURL.trim(); // Trim whitespace from input
    const allowedDomains = [
        '.com',
        '.org',
        '.net',
        '.int',
        '.edu',
        '.gov',
        '.mil', // Generic TLDs
        '.biz',
        '.info',
        '.mobi',
        '.name',
        '.pro',
        '.aero',
        '.coop',
        '.museum', // Sponsored TLDs
        '.us',
        '.uk',
        '.ca',
        '.de',
        '.fr',
        '.au',
        '.in',
        '.cn',
        '.jp',
        '.kr', // Country code TLDs
        '.br',
        '.ru',
        '.za',
        '.nz',
        '.mx',
        '.es',
        '.it',
        '.nl',
        '.se',
        '.no', // More country code TLDs
        '.ch',
        '.be',
        '.dk',
        '.fi',
        '.pl',
        '.tr',
        '.gr',
        '.pt',
        '.ro',
        '.hu' // Even more country code TLDs
    ];

    const hasValidDomain = allowedDomains.some((domain) => url.endsWith(domain));

    if ((!urlPattern.test(url) || !hasValidDomain) && editedItem.value.websiteURL) {
        websiteURLError.value = 'Invalid website URL. Must start with http:// or https:// and end with .com & .in etc';
    } else {
        websiteURLError.value = '';
    }
};

const unarchive_res = async (event_id: any) => {
    console.log('cjhcke krlo delete krna h kya kuch', event_id);
    try {
        const token_user = localStorage.getItem('authToken');
        const formdata = {
            token: token_user,
            event_id: event_id
        };
        console.log('this is ehy we have here', formdata);
        const response = await axios.post('api/v_super/unarchive_res/', formdata);
        if (response.data.status === 'unarchive_res') {
            all_inactive_res();
        } else {
            console.log('Invalid response');
        }
    } catch (error) {
        console.error('API error:', error);
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
        const response = await axios.post('api/v_super/delete_all_res/', formdata);
        console.log('API response:', response.data);
        if ((response.data.status = 'delete_api')) {
            admin_app_details();
            toggleCheckboxes();
            isButtonHidden.value = false;
        }
    } catch (error) {
        console.error('Error calling API:', error);
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
            <v-text-field density="compact" v-model="search" label="Search Restaurant" hide-details variant="outlined"></v-text-field>
        </v-col>
        <!-- <v-col cols="12" md="3">
            <v-select
                variant="outlined"
                v-model="selectedCategory"
                density="compact"
                hide-details
                :items="categoryRestu"
                label="Category"
            ></v-select>
        </v-col> -->
        <v-col cols="12" md="6">
            <div class="d-flex flex-wrap gap-2 justify-md-end">
                <!-- <div class="">
                    <v-btn color="error" flat class="ml-auto" v-if="isButtonHidden" @click="delete_all()">
                        <TrashIcon size="15" class="me-1" /> Delete All
                    </v-btn>
                </div> -->
                <!-- <div class="">
                    <v-btn color="primary" flat class="ml-auto" @click="toggleCheckboxes()">
                        {{ btn_name }}
                    </v-btn>
                </div> -->
                <!-- <div>
                    <v-dialog v-model="bulkUpload" max-width="600">
                        <template v-slot:activator="{ props }">
                            <v-btn color="primary" v-bind="props" flat class=""> <v-icon class="mr-2">mdi-plus</v-icon>Bulk Upload </v-btn>
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
                                <v-btn color="primary" :disabled="selectedFile2 == null" variant="flat" @click="uploadFileTorestaurant()"
                                    >Save</v-btn
                                >
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </div> -->

                <!-- <v-dialog v-model="successFul" max-width="400" class="p-0">
                    <template v-slot:activator="{ props }">
                            <v-btn color="primary" v-bind="props" flat class="ml-auto">
                                <v-icon class="mr-2">mdi-plus</v-icon>Success
                            </v-btn>
                        </template>
                    <v-card class="p-0" style="background-color: #f7f7f7">
                        <v-card-text class="py-0 px-0 text-center">
                            <img src="@/assets/images/locator/success.gif" style="width: 320px" />
                            <h3 class="text-center pb-3">Upload Successful</h3>
                        </v-card-text>
                    </v-card>
                </v-dialog> -->

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

                <div>
                    <v-dialog v-model="dialog" max-width="800">
                       
                        <v-card>
                            <v-card-title class="pa-4 bg-primary">
                                <span class="title text-white">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit_res_Form">
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <v-label>Restaurant Name <span class="required"> *</span></v-label>
                                            <v-text-field
                                                variant="outlined"
                                                hide-details
                                                v-model="editedItem.restuName"
                                                @input="validateName"
                                            ></v-text-field>
                                            <p v-if="nameError" class="error">{{ nameError }}</p>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                            <v-label>Email </v-label>
                                            <v-text-field
                                                variant="outlined"
                                                hide-details
                                                v-model="editedItem.email"
                                                @input="validateEmail"
                                                placeholder="example@google.com"
                                            ></v-text-field>
                                            <p v-if="emailError" class="error">{{ emailError }}</p>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                            <v-label>Phone Number</v-label>
                                            <v-text-field
                                                variant="outlined"
                                                type="number"
                                                hide-details
                                                v-model="editedItem.phone"
                                                @input="validatePhone"
                                            ></v-text-field>
                                            <p v-if="phoneError" class="error">{{ phoneError }}</p>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-label>Website URL </v-label>
                                            <v-text-field
                                                variant="outlined"
                                                hide-details
                                                v-model="editedItem.websiteURL"
                                                @input="validateWebsiteURL"
                                                placeholder="http://www.testing.com"
                                            ></v-text-field>
                                            <p v-if="websiteURLError" class="error">{{ websiteURLError }}</p>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <div class="d-flex" style="justify-content: space-between">
                                                <v-label>Category <span class="required">*</span></v-label>
                                                <v-btn @click="categoryAdd" color="primary" variant="text">+ Add</v-btn>
                                            </div>
                                            <v-select
                                                variant="outlined"
                                                hide-details
                                                multiple
                                                :items="CategoryList"
                                                v-model="editedItem.Category"
                                                class="cutsomMultipleAdd"
                                            ></v-select>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-label>Tags</v-label>
                                            <v-combobox
                                                v-model="editedItem.tagModel"
                                                class="chipTheme"
                                                hide-details
                                                multiple
                                                chips
                                            ></v-combobox>
                                        </v-col>
                                        <v-col cols="12">
                                            <div class="bg-lightsecondary pa-4">
                                                <h3 class="text-h6 mb-4">Restaurant Weekdays Timing</h3>
                                                <v-row class="ma-n1">
                                                    <v-col
                                                        cols="12"
                                                        md="6"
                                                        lg="4"
                                                        class="px-1 py-0"
                                                        v-for="(weekItems, index) in weekData"
                                                        :key="index"
                                                    >
                                                        <v-checkbox
                                                            :label="weekItems.weekLabel"
                                                            v-model="selectedGender[weekItems.weekLabel][0]"  
                                                            color="primary"
                                                            hide-details
                                                        >
                                                        </v-checkbox>
                                                        <div class="d-flex gap-1 mt-n2">
                                                            <v-select
                                                                :items="generateTimes(index)"
                                                                label="From"
                                                                hide-details=""
                                                                v-model="selectedGender[weekItems.weekLabel][1]"
                                                                density="compact"
                                                                class="selectBoxWdth"
                                                                :disabled="!selectedGender[weekItems.weekLabel][0]"
                                                                ></v-select>
                                                                <!-- editedItem.timings[weekItems.weekLabel][0][0] -->
                                                                <!-- v-model="editedItem.monStartTimeMdl[index]" -->
                                                            <!-- {{editedItem.timings[weekItems.weekLabel][0][0]}} -->

                                                            <div class="centerLineTime"></div>
                                                            <v-select
                                                                :items="generateTimes(index)"
                                                                label="To"
                                                                hide-details=""
                                                                v-model="selectedGender[weekItems.weekLabel][2]"
                                                                density="compact"
                                                                class="selectBoxWdth"
                                                                :disabled="!selectedGender[weekItems.weekLabel][0]"
                                                            ></v-select>
                                                        </div>
                                                    </v-col>
                                                </v-row>
                                            </div>
                                        </v-col>
                                        <!-- <v-col cols="12" md="3" sm="6">
                                            <v-label class="mt-n1">Start Time</v-label>
                                            <v-text-field
                                                v-model="editedItem.start_time"
                                                variant="outlined"
                                                hide-details
                                                type="time"
                                                ampm
                                                format="12hr"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="3" sm="6">
                                            <v-label class="mt-n1">End Time</v-label>
                                            <v-text-field
                                                v-model="editedItem.end_time"
                                                variant="outlined"
                                                hide-details
                                                type="time"
                                                ampm
                                                format="12hr"
                                            ></v-text-field>
                                        </v-col> -->
                                        <v-col cols="12">
                                            <v-textarea
                                                variant="outlined"
                                                hide-details
                                                v-model="editedItem.about"
                                                label="About"
                                                rows="4"
                                                class="resize-none"
                                            ></v-textarea>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-textarea
                                                variant="outlined"
                                                hide-details
                                                v-model="editedItem.address"
                                                label="Address"
                                                rows="2"
                                                class="resize-none"
                                            ></v-textarea>
                                        </v-col>
                                        <v-col cols="12">
                                            <div class="">
                                                <label for="logoImageLbl0" class="imageUploadRestu">
                                                    <span class="text-primary text-subtitle-1">Upload Your Restaurant Photo</span>
                                                    <input
                                                        type="file"
                                                        id="logoImageLbl0"
                                                        class="d-none"
                                                        @change="handleImageUpload($event, 0)"
                                                        accept="image/*"
                                                    />
                                                </label>

                                                <!-- <div class="restuImageShowList" v-if="currentImage.length > 0">
                                                    <img :src="currentImage[0]" alt="Uploaded Image" />
                                                </div> -->
                                                <p v-if="uploadError" class="error">{{ uploadError }}</p>
                                                <p v-if="imagename">{{ imagename }}</p>
                                            </div>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-row class="mb-3">
                                                <v-col cols="col">
                                                    <div style="position: relative">
                                                        <v-label>Hit Search To Set The MAP.</v-label>
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
                                        editedItem.restuName == '' ||
                                        editedItem.Category == '' "
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
    <v-card elevation="10">
        <v-card-items>
            <div class="position-relative">
                <div class="logoLoader tableLoader bg-Whitecustom" v-if="new_loader == true">
                    <div class="LogoVInnerImg">
                        <img src="@/assets/images/locator/v-icon.png" alt="logo-loader" />
                        <p class="">Please Wait...</p>
                    </div>
                </div>
                <v-table class="mt-8 imgShow">
                    <thead>
                        <tr>
                            <th v-if="showCheckboxes" class="text-center text-error"><TrashIcon color="error" size="20" /></th>
                            <th class="text-subtitle-1 font-weight-semibold">ID</th>
                            <th class="text-subtitle-1 font-weight-semibold">Restaurant Info</th>
                            <th class="text-subtitle-1 font-weight-semibold">Contact Detail</th>
                            <th class="text-subtitle-1 font-weight-semibold">Submitted by</th>
                            <!-- <th class="text-subtitle-1 font-weight-semibold">Category</th>
                            <th class="text-subtitle-1 font-weight-semibold">Tags</th> -->
                            <th class="text-subtitle-1 font-weight-semibold">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <!-- <tr v-if="showLoader === true">
                            <td colspan="6" class="py-12">
                                <div class="loaderBn loaderDark"></div>
                                <p class="text-center text-primary text-h5 mt-4 font-weight-medium">Please Wait</p>
                            </td>
                        </tr> -->

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
                                    <div class="d-flex py-2 align-start">
                                        <div v-if="item.avatar">
                                            <v-img :src="`${BASE_URL}${item.avatar}`" class="imageSizeFixd rounded-md img-fluid" />
                                        </div>
                                        <div v-else>
                                            <v-img :src="vImageIcon" class="imageSizeFixd rounded-md img-fluid" />
                                        </div>
                                        <div class="ms-2">
                                            <h4 class="text-subtitle-1 font-weight-semibold">{{ item.restuName }}</h4>
                                            <h4 v-if="item.permanent_closed" class="text-subtitle-1 font-weight-semibold text-error">Permanent Closed</h4>
                                            
                                        </div>
                                    </div>
                                </td>
                                <td class="py-2">
                                    <span class="text-subtitle-1 d-flex textSecondary">
                                        <PhoneIcon color="primary" size="14" class="me-1" />
                                        <span>{{ item.phone }}</span>
                                    </span>
                                    <span class="text-subtitle-1 d-flex mt-1 textSecondary">
                                        <MessageIcon color="primary" size="14" class="me-1" /><span>{{ item.email }}</span>
                                    </span>
                                    <span class="text-subtitle-1 d-flex mt-1 textSecondary">
                                        <WorldIcon color="primary" size="14" class="me-1" /><span>{{ item.websiteURL }}</span>
                                    </span>
                                    <!-- <span class="text-subtitle-1 d-flex mt-1 textSecondary">
                                        <MapPinIcon color="primary" size="14" class="me-1" /><span>{{ item.address }}</span>
                                    </span> -->
                                </td>
                                <td class="text-subtitle-1">
                                    <v-chip color="primary" class="ma-1" size="small" label >
                                        {{ submitted_name }}
                                    </v-chip>
                                </td>
                                <!-- <td class="text-subtitle-1">{{ item.phone }}</td> -->
                                <!-- <td class="text-subtitle-1">
                                    <template v-if="item.Category && item.Category.length > 0">
                                        <template v-for="(catItem, catIndex) in item.Category" :key="catIndex">
                                            <v-chip color="primary" class="ma-1" size="small" label v-if="catItem.name !== ''">
                                                {{ catItem }}
                                            </v-chip>
                                        </template>
                                    </template>
                                </td>
                                <td class="text-subtitle-1">
                                    <v-chip color="primary" class="ma-1" size="small" label> Foodies welcome </v-chip> 
                                    <template v-if="item.tagModel && item.tagModel.length">
                                        <template v-for="(food_name, catIndex) in item.tagModel" :key="catIndex">
                                            <v-chip color="primary" class="ma-1" size="small" label v-if="food_name.name !== ''">
                                                {{ food_name }}
                                            </v-chip>
                                        </template>
                                    </template>
                                    <v-chip color="primary" class="ma-1" size="small" label> {{item.tagModel}} </v-chip> 
                                </td> -->
                                <!-- <td>
                                    <v-chip :color="item.rolestatus" size="small" label>{{ item.role }}</v-chip>
                                </td> -->
                                <td>
                                    <div class="d-flex align-center">
                                        <v-tooltip text="View">
                                            <template v-slot:activator="{ props }">
                                                <router-link :to="`/restaurant_detail/${item.id}`" color="primary">
                                                    <v-btn icon flat>
                                                        <EyeIcon size="20" v-bind="props" class="text-primary" />
                                                    </v-btn>
                                                </router-link>
                                            </template>
                                            <!-- <v-btn icon flat to="/restaurant_detail" v-bind="props"
                                            ><EyeIcon stroke-width="1.5" size="20" class="text-primary"
                                            /></v-btn> -->
                                        </v-tooltip>
                                        <v-tooltip text="Edit">
                                            <template v-slot:activator="{ props }">
                                                <v-btn icon flat @click="editItem(item)" v-bind="props">
                                                    <PencilIcon stroke-width="1.5" size="20" class="text-primary" />
                                                </v-btn>
                                            </template>
                                        </v-tooltip>
                                        <!-- <v-tooltip text="Duplicate">
                                            <template v-slot:activator="{ props }">
                                                <v-btn icon flat v-bind="props">
                                                    <CopyIcon stroke-width="1.5" size="20" class="text-primary" />
                                                </v-btn>
                                            </template>
                                        </v-tooltip> -->
                                        <td>
                                            <v-tooltip text="Active">
                                                <template v-slot:activator="{ props }">
                                                    <v-btn icon flat @click="unarchive_res(item.id)" v-bind="props">
                                                        <archiveOffIcon stroke-width="1.5" size="20" class="text-primary" />
                                                    </v-btn>
                                                </template>
                                            </v-tooltip>
                                        </td>
                                        <v-tooltip text="Delete">
                                            <template v-slot:activator="{ props }">
                                                <v-btn icon flat @click="deleteItem(item)" v-bind="props">
                                                    <TrashIcon stroke-width="1.5" size="20" class="text-error" />
                                                </v-btn>
                                            </template>
                                        </v-tooltip>
                                        <div class="mt-3 mb-3">
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ props }">
                                            <v-switch 
                                                color="primary"
                                                v-model="item.permanent_closed"
                                                hide-details
                                                v-bind="props"
                                                @change="() => togglePermanentClosed(item)"
                                            ></v-switch>
                                            </template>
                                            <span>{{ item.permanent_closed ? 'Change to open' : 'Change to closed' }}</span>
                                        </v-tooltip>
                                        </div>
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
        </v-card-items>
    </v-card>
</template>
<style scoped>
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
/* .loaderBn.loaderDark {
    border-top: 3px solid #40b40f;
    width: 70px;
    height: 70px;
} */

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
}
</style>