<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import vImageIcon from '@/assets/images/locator/v-icon.jpg';

import { useContactStore } from '@/stores/apps/contact';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import EditorMenubar from '@/components/forms/plugins/cuisineDescription/EditorMenubar.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL;

const store = useContactStore();

const desserts = ref([]);
onMounted(() => {
    single_event_details();
    store.fetchContacts();
});
const itemsPerPage = 10;
const currentPage = ref(1);
const api_key = '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';
const valid = ref(true);
const dialog = ref(false);
const search = ref('');
const E_name = ref('');
const E_image = ref('');
const E_description = ref('');
const E_address = ref('');
const E_startdate = ref('');
const E_enddate = ref('');
const latitude = ref('');
const longitude = ref('');
const E_qrcode  = ref('')
const E_qrcode_download_url  = ref('')

const mapUrl = (api_key:any, latitude:any, longitude:any) => {
    return `https://www.google.com/maps/embed/v1/view?key=${api_key}&center=${latitude},${longitude}&zoom=14`;
}


const editedIndex = ref(-1);
const editedItem = ref({
    // id: '',
    // image: '1.jpg',
    event_name: '',
    start_date: '',
    end_date: '',
    event_time: '',
    venue: '',
    unique_items: '',
    description: '',
    price: '',
    // qr_token: '',
});
const defaultItem = ref({
    id: '',
    image: '1.jpg',
    event_name: '',
    start_date: new Date(),
    end_date: new Date(),
    event_time: '',
    venue: '',
    unique_items: '',
    description: '',
    price: '',
});
//Methods
const location = ref(['Chandugarh', 'Mohali']);
const filteredList = computed(() => {
    return desserts.value.filter((user: any) => {
        return user.start_date.toLowerCase().includes(search.value.toLowerCase());
    });
});

const paginatedList = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredList.value.slice(start, end);
});

const filterList = computed(() => {
    return rsvp_user_data.value.filter((user: any) => {
        return user.user.email.toLowerCase().includes(search.value.toLowerCase());
    });
});

// const paginatList = computed(() => {
//     const start = (currentPage.value - 1) * itemsPerPage;
//     const end = start + itemsPerPage;
//     return filterList.value.slice(start, end);
// });

const paginatList = computed(() => {
    // this conditon added for search any page then give result
    if (search.value) { currentPage.value = 1 } 
   
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filterList.value.slice(start, end);
});



function editItem(item: any) {
    editedIndex.value = desserts.value.indexOf(item);
    editedItem.value = Object.assign({}, item);
    dialog.value = true;
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
    } else {
        desserts.value.push(editedItem.value);
    }
    close();
}

//Computed Property
const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'New Events' : 'Edit Events';
});


const editor = useEditor({
    extensions: [StarterKit],
    content: ``,
});
const editorDesc = useEditor({
    extensions: [StarterKit],
    content: ``,
});

// const single_event_details = async () => {
//     try {
//         const token_user = localStorage.getItem('authToken')
//         const event_id = window.location.href.split('/').pop();
//         const formdata = {
//             'token':token_user,
//             'event_id': event_id,
//         }
//         console.log('this is formdata', formdata)
//         const response = await axios.post('api/v_super/single_event_details/',formdata);
//         console.log('yaha se response aaya',response)
//         if (response.data.status === 'single_event_details'){
//         }
//     } catch(error) {
//         console.error('API error:', error);
//     }
// };
function stripTags(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
}

const rsvp_user_data = ref([]);


const single_event_details = async () => {
    try {
        const token_user = localStorage.getItem('authToken');
        const event_id = window.location.href.split('/').pop();
        const formdata = {
            token: token_user,
            event_id: event_id
        };
        console.log('this is qqehy we have here', formdata);
        const response = await axios.post('api/v_super/single_event_details/', formdata);
        console.log('this is ehy we have here', response);
        if (response.data.status === 'single_event_details') {
            const e_data = response.data.event_data 
            console.log('data aagya h ',e_data)
            E_name.value = e_data.title
            E_image.value = e_data.image
            E_description.value = stripTags(e_data.description || '').trim() || 'N/A';
            E_address.value = e_data.address
            E_startdate.value = e_data.start_time
            E_enddate.value = e_data.end_time
            latitude.value = e_data.latitude
            longitude.value = e_data.longitude
            E_qrcode.value  = e_data.qr_token
            E_qrcode_download_url.value  = `${BASE_URL}/api/v_super/get_event_qr/${event_id}`

            rsvp_user_data.value = e_data.rsvp_user || [];

        } else {
            console.log('Invalid response -------');
        }
    } catch (error) {
        console.error('API error:', error);
    }
};

import eventProfile from '@/assets/images/backgrounds/events.jpg'
const currentImage = ref<string[]>([eventProfile]); // Default image URL

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


</script>
<template>
    <v-row>
        <v-col cols="12" class="px-2">
            <v-row>
                <v-col cols="12" md="4">
                    <v-card elevation="0" rounded="md" class="">
                        <v-card-item v-if="E_image"  class="pb-0 pt-0 ps-0 pe-0 img-pos-left">
                            <img :src="`${BASE_URL}${E_image}`" class="eventsImg rounded-lg" alt="image" />
                        </v-card-item>
                        <v-card-item  v-else class="pb-0 pt-0 ps-0 pe-0 img-pos-left">
                            <img :src="vImageIcon" class="eventsImg" alt="image" />
                        </v-card-item>
                        <div class="pb-0 pt-0 ps-0 pe-0">
                            
                        </div>
                        <div >
                            
                        </div>
                    </v-card>
                </v-col>
                <v-col cols="12" :md="E_qrcode ? 5 : 8">
                    <v-card elevation="0" rounded="md" class="">
                        <v-card-item class="pb-0 pt-0 ps-0 pe-0">
                            <h4 class="text-20 font-weight-semibold mb-4">Event Name - {{E_name}} </h4>
                            <div class="mb-5">
                                
                                <p class="mb-2">
                                    <span class="font-weight-semibold">Venue Address:</span> - {{ E_address }}
                                </p>
                                <p class="mb-2">
                                    <span class="font-weight-semibold">Start Time:</span> - {{ E_startdate }}
                                </p>
                                <p class="mb-2">
                                    <span class="font-weight-semibold">End Time:</span> - {{ E_enddate }}
                                </p>
                            </div>

                            <h4 class="text-20 font-weight-semibold">Description</h4>
                            <p>{{ E_description }}</p>
                        </v-card-item>
                    </v-card>
                </v-col>
                <v-col cols="12" md="3" v-if="E_qrcode" class="mb-6">
                    <v-card elevation="0" rounded="md">
                        <v-card-item class="pb-0 pt-0 ps-0 pe-0 d-flex justify-center">
                        <v-img
                            :src="`${BASE_URL}${E_qrcode}`"
                            max-width="200"
                            max-height="200"
                            class="border"
                            alt="Event QR Code"
                        ></v-img>
                        <div class="d-flex justify-center mt-2">
                            <a
                                :href="`${E_qrcode_download_url}`"
                                class="v-btn v-btn--size-small v-btn--variant-elevated v-theme--primary"
                                style="display: inline-flex; align-items: center; justify-content: center;"
                            >
                                <DownloadIcon size="15" class="me-2" />
                                Event QR Code
                            </a>
                        </div>
                        </v-card-item>
                    </v-card>
                </v-col>
              
            </v-row>
        </v-col>
    </v-row>
    <v-row v-if="rsvp_user_data.length > 0">
        <v-col cols="12" md="3">
            <v-text-field density="compact" v-model="search" label="Search User Email" hide-details variant="outlined"></v-text-field>
        </v-col>
    </v-row>
    <v-row v-if="paginatList.length > 0">
        <v-col cols="12">
            <div class="position-relative">
                <v-table>
                    <thead>
                        <tr>
                            <th class="text-subtitle-1 font-weight-semibold">Sr.no</th>
                            <th class="text-subtitle-1 font-weight-semibold">User Name</th>
                            <th class="text-subtitle-1 font-weight-semibold">User Email</th>
                            <th class="text-subtitle-1 font-weight-semibold">User Status</th>
                            <th class="text-subtitle-1 font-weight-semibold">Checked In</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="paginatList.length > 0">
                            <tr v-for="(user,index ) in paginatList" :key="user.id" :currentPage="currentPage" :pageSize="5">
                                <!-- <td class="text-subtitle-1">{{ user.user.id }}</td> -->
                                 <td class="text-subtitle-1">
                                    #{{ (currentPage - 1) * itemsPerPage + index + 1 }}
                                </td>
                                <td class="text-subtitle-1">
                                    <span class="text-subtitle-1 mb-1 font-weight-semibold">{{ user.user.full_name  }} </span>
                                </td>
            
                                <td class="text-subtitle-1">
                                    <span class="text-subtitle-1 mb-1 font-weight-semibold">{{ user.user.email }}</span>
                                </td>
                                
                                <td class="text-subtitle-1">
                                    <v-chip :color="user.status === 'Going' ? 'primary' : 'error'" class="ma-1" size="small" label>
                                        {{ user.status }}
                                    </v-chip>
                                </td>
                                
                                <td class="text-subtitle-1">
                                    <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ user.checked_in ? 'Yes' : 'No' }}</span>
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
                :length="Math.ceil(filterList.length / itemsPerPage)"
                rounded="circle"
            ></v-pagination>
        </v-col>
    </v-row>

    <v-row>
    </v-row>
</template>

<style>
.ProseMirror {
    min-height: 220px;
}

.cstmEditbtn {
    height: 40px;
    width: 40px;
    padding: 10px;
    border-radius: 50%;
    stroke: #fff;
}

.eventsImg {
    height: 380px !important;
    width: 100% !important;
    object-fit: cover !important;
    border-radius: 5px;
}
.img-pos-left img{
    object-position: left;
}
</style>