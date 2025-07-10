<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useContactStore } from '@/stores/apps/contact';
import vImageIcon from '@/assets/images/locator/v-icon.jpg';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL;


const myerrors = ref('');
const showSuccessMessage            = ref(false);
const showErrorMessage              = ref(false);



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

const new_loader = ref(false);
const store = useContactStore();
const desserts = ref([]);
const selectedGender = ref({ value: {} });
// const selectedGender = ref({});
const searchQuery = ref('');
const formattedAddress = ref('');
const res_latitute = ref('');
const res_longitude = ref('');

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
    admin_app_details();
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
            console.log('center.value ____:', center.value);
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
            admin_app_details();
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
    monEndTimeMdl: [],
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
    monEndTimeMdl: [],
});

function editedValue() {
    console.log(editedItem.value.monStartTimeMdl);
}
const CategoryList = ref(['Asian', 'Thai', 'Italian', 'Mexican', 'Indian', 'American', 'Bakery', 'Juices', 'Smoothies']);

// const restaurantTypeList = ref(['Fine Dining', 'Casual Dining', 'Fast Food', 'Cafe', 'Bar']);
// const categoryRestu = ref(['All', 'Asian', 'Thai', 'Italian', 'Mexican', 'Indian', 'American', 'Bakery']);
const categoryRestu = ref(['All']);

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

const selectedCategory = ref('All');
// const filteredList = computed(() => {
//     console.log('desserts.value',desserts.value)
//     return desserts.value.filter((item: any) => {

//         const searchLower = search.value ? search.value.toLowerCase() : ''; // Default to empty string
//         const restuName = item.restuName ? item.restuName.toLowerCase() : ''; // Default to empty string
//         const restaurantType = item.Category ? item.Category.map((category:any) => category.toLowerCase()) : []; 

//         return (
//             restuName.includes(searchLower) &&
//             (selectedCategory.value === 'All' ||
//                 selectedCategory.value === '' ||
//                 (restaurantType && restaurantType.includes(selectedCategory.value.toLowerCase())))
//         );
//     });
// });

const filteredList = computed(() => {
    console.log('desserts.value', desserts.value);
    return desserts.value.filter((item: any) => {
        const searchLower = search.value ? search.value.toLowerCase() : ''; // Default to empty string
        const restuName = item.restuName ? item.restuName.toLowerCase() : ''; // Default to empty string
        const restaurantType = item.Category ? item.Category.map((category: any) => category.toLowerCase()) : []; 

        const categoryMatch = selectedCategory.value === 'All' ||
                              selectedCategory.value === '' ||
                              restaurantType.includes(selectedCategory.value.toLowerCase());

        return restuName.includes(searchLower) && categoryMatch;
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

const admin_app_details = async () => {
    new_loader.value = true;
    const token_user = localStorage.getItem('authToken');
    console.log('this is token user   ---', token_user);
    const formData = {
        token: token_user,
        lv_1: 'all_rest'
    };
    const response = await axios.post('api/v_super/a_details/', formData);
    // const response = await axios.post('api/v_super/a_details/');
    // api/rest_detail/
    console.log('this is response', response.data);
    if (response.data.status === 'ok') {
        new_loader.value = false;
        const updatedData = response.data.res_details.map((item: any, index: any) => {

            console.log('yaha dekh aaya data kuch -----------------------', item.restaurant_name);
            


            const categoryValues = Array.isArray(item.category) ? item.category.map((c: any) => c.name) : [];
            const topicsValues = Array.isArray(item.topics) ? item.topics.map((c: any) => c.name) : [];
            const timingsValues = Array.isArray(item.timings) ? item.timings.map((c: any) => c) : [];
            console.log('check the data ---- in timings value ---', timingsValues);
            
            
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
                status : item.status,
          
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
        // categoryRestu.value = updatedData.map((item: any) => item.catName);
        // categoryRestu.value.unshift('All');
        categoryRestu.value = [...updatedData.map((item: any) => item.catName)];
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
            console.log('Staff API response --- :', response.data);
            showSuccessMessage.value = true
            myerrors.value = `New Restaurant ${response.data.res_name} has been Created Successfully.`;
            setTimeout(() => {  showSuccessMessage.value = false  }, 3000);
            resetFormData();


            admin_app_details();
            get_category();
            close();
        } else {
            console.log('First Error');
        }
    } catch (error) {
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
            admin_app_details();
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
            console.log('Staff API response --- :', response.data);
            showErrorMessage.value = true
            myerrors.value = `Restaurant ${response.data.res_del} Deleted Successfully.`;
            setTimeout(() => {  showErrorMessage.value = false  }, 3000);
            admin_app_details();
            close();
        } else {
            console.log('First Error');
        }
    } catch (error) {
        console.error('API error:', error);
    }
};
const archive_res = async (event_id: any) => {
    console.log('cjhcke krlo delete krna h kya kuch', event_id);
    try {
        const token_user = localStorage.getItem('authToken');
        const formdata = {
            token: token_user,
            event_id: event_id
        };
        console.log('this is ehy we have here', formdata);
        const response = await axios.post('api/v_super/archive_res/', formdata);
        if (response.data.status === 'archive_res') {
            admin_app_details();
        } else {
            console.log('Invalid response');
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





const rest_state = ref('All');
const state_count = ref('');
const rest_data = ref('Not Selected')
const search_rest =ref(['Not Selected','Missing Phone number', 'Missing Email', 'Missing Website', 'Missing Category', 'No Tags', 'No Menu', 'Missing Images', 'Low Quality Images(800x600)']);

const total_restaurant  = ref('');



const search_restaurant = async () => {
    new_loader.value = true; // Start the loader
    try {
        if (!rest_data.value) {
            showErrorMessage.value = true;
            myerrors.value = 'Please select the data';
            setTimeout(() => {
                showErrorMessage.value = false;
            }, 3000);
            return; // Exit the function if no selection is made
        }

        const formdata = new FormData();
        formdata.append('rest_state', rest_state.value);
        formdata.append('rest_data', rest_data.value);

        const response = await axios.post('api/rest_detail/', formdata);
        console.log('this is response', response.data);

        if (response.data.status === 'Done') {
            state_count.value = response.data.restaurants.length;

            const updatedData = response.data.restaurants.map((item, index) => {
                const categoryValues = Array.isArray(item.category) ? item.category.map(c => c.name) : [];
                const topicsValues = Array.isArray(item.topics) ? item.topics.map(c => c.name) : [];
                const timingsValues = Array.isArray(item.timings) ? item.timings : [];

                return {
                    id: item.id,
                    serial_no: `#${index + 1}`,
                    tagModel: topicsValues,
                    avatar: item.image,
                    restuName: item.restaurant_name,
                    email: item.email,
                    phone: item.phone_number,
                    Category: categoryValues,
                    websiteURL: item.website,
                    address: item.address,
                    about: item.about,
                    latitude: item.latitude,
                    longitude: item.longitude,
                    restaurantType: 'done',
                    monStartTimeMdl: timingsValues.opening_hours || null,
                    monEndTimeMdl: timingsValues.closing_hours || null,
                };
            });
            desserts.value = updatedData;
        } else {
            console.log('First Error');
        }
    } catch (error) {
        console.error('An error occurred:');
    } finally {
        new_loader.value = false; 
    }
};


// const search_restaurant = async () => {
//     if (!rest_data.value) {
//         showErrorMessage.value = true;
//         myerrors.value = 'Please select the data'
//         setTimeout(() => {
//             showErrorMessage.value = false;
//         },3000);
//         return;  // Exit the function if no selection is made
//     }
//     const formdata = new FormData();
//     formdata.append('rest_state', rest_state.value);
//     formdata.append('rest_data', rest_data.value);
//     const response = await axios.post('api/rest_detail/', formdata);
//     console.log('this is response', response.data);
//     if (response.data.status === 'Done') {
//         new_loader.value = true;
//         state_count.value = response.data.restaurants.length;
//         const updatedData = response.data.restaurants.map((item: any, index: any) => {

//             console.log('yaha dekh aaya data kuch -----------------------', item.restaurant_name);
            


//             const categoryValues = Array.isArray(item.category) ? item.category.map((c: any) => c.name) : [];
//             const topicsValues = Array.isArray(item.topics) ? item.topics.map((c: any) => c.name) : [];
//             const timingsValues = Array.isArray(item.timings) ? item.timings.map((c: any) => c) : [];
//             console.log('check the data ---- in timings value ---', timingsValues);
            
            
//             // const time = item.timings.map((a:any)=>{ selectedGender.value[a.day] = [true, a.time_obj[0], a.time_obj[1]] });
//             // console.log('check the data ---- in time value ---', time);
            
//             return {
//                 id: item.id,
//                 serial_no: `#${index + 1}`,
//                 tagModel: topicsValues,
//                 avatar: item.image,
//                 // avatar2: item.image2,
//                 restuName: item.restaurant_name,
//                 email: item.email,
//                 // start_time : item.timings,
//                 // end_time : item.timings,
//                 phone: item.phone_number,
//                 Category: categoryValues,
//                 websiteURL: item.website,
//                 address: item.address,

//                 about: item.about,
//                 latitude: item.latitude,
//                 longitude: item.longitude,
//                 restaurantType: 'done',
//                 monStartTimeMdl: timingsValues.opening_hours,
//                 monEndTimeMdl: timingsValues.closing_hours,
          
//             };
//         });
//         desserts.value = updatedData;
//     } else {
//         new_loader.value = false;
//         console.log('First Error');
//     } 
// };




const search_state = ref([]);


const loadStates = async() =>{
   
    const response = await axios.get('api/rest_detail/');
    console.log('this is response of state', response.data);
    if (response.data.status === 'Done'){
        search_state.value = ['All', ...response.data.states];
        console.log('States Loaded:', search_state);
    }else{
        console.log('Error occure when fetch the state');
    }
}


</script>
<template>
    <!-- <div class="loader" ><span class="loader-17"> </span><div class="loaderinner"><img src="@/assets/images/wedding/mainloader.png" /></div></div> -->
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
        
        <v-col cols="12" md="6">
            <div class="d-flex align-center">
            <v-select
                variant="outlined"
                v-model="rest_state"
                density="compact"
                hide-details
                :items="search_state"
                @focus="loadStates"
                label="All State Restaurant Details"
             
            ></v-select>
            </div>
            
                
        </v-col>
        <v-col cols="12" md="6">
            <div class="d-flex align-center">
                <v-select
                    variant="outlined"
                    v-model="rest_data"
                    density="compact"
                    hide-details
                    :items="search_rest"
                    label="Restaurant Details"
                ></v-select>

                <v-btn v-if="state_count !== ''" style="background: #c3c3c3;" flat class="ml-auto ms-2">
                    Total: {{ state_count }}
                </v-btn>
                
                <v-btn color="primary" flat class="ml-auto ms-2" @click="search_restaurant">
                    Submit
                </v-btn>
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
                            <th class="text-subtitle-1 font-weight-semibold">Category</th>
                            <th class="text-subtitle-1 font-weight-semibold">Tags</th>
                            <th class="text-subtitle-1 font-weight-semibold">Status</th>
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
                                            <!-- <div class="d-flex flex-wrap gap-2">
                                                <v-chip color="primary" size="small" label  v-for="(restuItem, restuIndex) in item.restaurantType" :key="restuIndex">
                                                    {{ restuItem }}
                                                </v-chip>
                                            </div> -->
                                            <!-- <div class="d-flex flex-wrap gap-2">
                                                <v-chip color="primary" size="small" label>
                                                    {{ item.restaurantType }}
                                                </v-chip>
                                            </div> -->

                                            <!-- <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.usermail }}</span> -->
                                        </div>
                                    </div>
                                </td>
                                <td class="py-2">
                                    <span class="text-subtitle-1 d-flex textSecondary" v-if="item.phone">
                                        <PhoneIcon color="primary" size="14" class="me-1" />
                                        <span>{{ item.phone }}</span>
                                    </span>
                                    <span class="text-subtitle-1 d-flex mt-1 textSecondary" v-if="item.email">
                                        <MessageIcon color="primary" size="14" class="me-1" /><span>{{ item.email }}</span>
                                    </span>
                                    <span class="text-subtitle-1 d-flex mt-1 textSecondary" v-if="item.websiteURL">
                                        <WorldIcon color="primary" size="14" class="me-1" /><span>{{ item.websiteURL }}</span>
                                    </span>
                                    <!-- <span class="text-subtitle-1 d-flex mt-1 textSecondary">
                                        <MapPinIcon color="primary" size="14" class="me-1" /><span>{{ item.address }}</span>
                                    </span> -->
                                </td>
                                <!-- <td class="text-subtitle-1">{{ item.phone }}</td> -->
                                <td class="text-subtitle-1">
                                    <template v-if="item.Category && item.Category.length > 0">
                                        <template v-for="(catItem, catIndex) in item.Category" :key="catIndex">
                                            <v-chip color="primary" class="ma-1" size="small" label v-if="catItem.name !== ''">
                                                {{ catItem }}
                                            </v-chip>
                                        </template>
                                    </template>
                                </td>
                                <td class="text-subtitle-1">
                                    <!-- <v-chip color="primary" class="ma-1" size="small" label> Foodies welcome </v-chip> -->
                                    <template v-if="item.tagModel && item.tagModel.length">
                                        <template v-for="(food_name, catIndex) in item.tagModel" :key="catIndex">
                                            <v-chip color="primary" class="ma-1" size="small" label v-if="food_name.name !== ''">
                                                {{ food_name }}
                                            </v-chip>
                                        </template>
                                    </template>
                                    <!-- <v-chip color="primary" class="ma-1" size="small" label> {{item.tagModel}} </v-chip> -->
                                </td>
                                <td class="text-subtitle-1">
                                    <template v-if="item.status && item.status !== ''">
                                    <v-chip color="primary" class="ma-1" size="small" label>
                                        {{ item.status }}
                                    </v-chip>
                                </template>


       


                                </td>
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
                                        <!-- <v-tooltip text="Edit">
                                            <template v-slot:activator="{ props }">
                                                <v-btn icon flat @click="editItem(item)" v-bind="props">
                                                    <PencilIcon stroke-width="1.5" size="20" class="text-primary" />
                                                </v-btn>
                                            </template>
                                        </v-tooltip>
                                        <v-tooltip text="Duplicate">
                                            <template v-slot:activator="{ props }">
                                                <v-btn icon flat v-bind="props">
                                                    <CopyIcon stroke-width="1.5" size="20" class="text-primary" />
                                                </v-btn>
                                            </template>
                                        </v-tooltip>
                                        <td>
                                            <v-tooltip text="Inactive">
                                                <template v-slot:activator="{ props }">
                                                    <v-btn icon flat @click="archive_res(item.id)" v-bind="props">
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
                                        </v-tooltip> -->
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