<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useContactStore } from '@/stores/apps/contact';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL;
import user1 from '@/assets/images/locator/restu/restu1.jpg';
const store = useContactStore();
const dateTime = ref(new Date());

const desserts = ref([]);
onMounted(() => {
    get_events();
    store.fetchContacts();
});
const itemsPerPage = 10;
const currentPage = ref(1);
const new_loader = ref(false);
const valid = ref(true);
const dialog = ref(false);
const search = ref('');

const editedIndex = ref(-1);
const editedItem = ref({
    id: '',
    image: '1.jpg',
    event_name: '',
    start_date: '',
    end_date: '',
    event_time: '',
    venue: '',
    unique_items: '',
    description: 'Vegan',
    price: ''
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
    description: 'Vegan',
    price: '5000'
});
//Methods
const filteredList = computed(() => {
    return desserts.value.filter((user: any) => {
        return user.event_name.toLowerCase().includes(search.value.toLowerCase());
    });
});

const paginatedList = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredList.value.slice(start, end);
});

import { format } from 'date-fns';
const formatDateWithoutTimezone = (dateStr: any) => {
    const date = new Date(dateStr);
    return format(date, 'EEE MMM dd yyyy HH:mm'); // Format to desired structure
};

const get_events = async () => {
    new_loader.value = true;
    try {
        const token_user = localStorage.getItem('authToken');
        const res_id = window.location.href.split('/').pop();
        const formdata = {
            token: token_user,
            res_id: res_id,
            event_get: 'Unarchive'
        };
        const response = await axios.post('api/v_super/get_events/', formdata);
        const get_events = response.data.get_events;
        if (get_events) {
            new_loader.value = false;
            const updatedData = get_events.map((item: any, index: any) => {
                return {
                    id: item.id,
                    Sr_no: `#${index + 1}`,
                    event_name: item.title,
                    start_date: formatDateWithoutTimezone(item.start_date),
                    end_date: formatDateWithoutTimezone(item.end_date),
                    price: item.price,
                    venue: item.address,
                    image: `${BASE_URL}${item.image}`,
                    event_url: item.event_url,
                    is_rsvp: item.is_rsvp,
                };
            });
            desserts.value = updatedData;
        }
    } catch (error) {
        new_loader.value = false;
        console.error('API error:', error);
    }
};

const unarchive_event = async (event_id: any) => {
    console.log('cjhcke krlo delete krna h kya kuch', event_id);
    try {
        const token_user = localStorage.getItem('authToken');
        const formdata = {
            token: token_user,
            event_id: event_id
        };
        console.log('this is ehy we have here', formdata);
        const response = await axios.post('api/v_super/unarchive_event/', formdata);
        if (response.data.status === 'unarchive_event') {
            get_events();
        } else {
            console.log('Invalid response');
        }
    } catch (error) {
        console.error('API error:', error);
    }
};
</script>
<template>
    <v-row>
        <v-col cols="12" md="6">
            <v-text-field density="compact" v-model="search" label="Search Events" hide-details variant="outlined"></v-text-field>
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
                        <td class="text-subtitle-1">{{ item.Sr_no }}</td>
                        <td>
                            <div class="d-flex align-center py-4">
                                <div>
                                    <v-img :src="item.image" class="imageSizeFixd rounded-md img-fluid" />
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
                            <div class="d-flex">
                                <v-tooltip text="View">
                                    <template v-slot:activator="{ props }">
                                        <router-link :to="`/events_detail/${item.id}`" color="primary">
                                            <v-btn icon flat>
                                                <EyeIcon size="20" v-bind="props" class="text-primary" />
                                            </v-btn>
                                        </router-link>
                                    </template>
                                </v-tooltip>
                                <v-tooltip text="Unarchive">
                                    <template v-slot:activator="{ props }">
                                        <v-btn icon flat @click="unarchive_event(item.id)" v-bind="props">
                                            <archiveOffIcon stroke-width="1.5" size="20" class="text-primary" />
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
.bg-Whitecustom {
    background: #fff !important;
}
.bg-Whitecustom img {
    width: 300px;
}
</style>