<script setup lang="ts">
import { format } from 'date-fns';

import user1 from '@/assets/images/profile/user-1.jpg';
import { ref, computed, onMounted } from 'vue';
import vImageIcon from '@/assets/images/locator/v-icon.jpg';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();
import BASE_URL from '@/stores/myVar';
axios.defaults.baseURL = BASE_URL;

onMounted(() => {
    get_single_post();
    get_single_comments();
});

const p_id = ref('');
const image = ref('');
const title_post = ref('');
const post_date = ref('');
const category = ref('');
const topics = ref('');
const content_post = ref('');
const parent_post = ref('');
const post_user_name = ref('');
// const user_name_comment = ref('');
// const comment_user = ref('');

const get_single_post = async () => {
    try {
        const token_user = localStorage.getItem('authToken');
        const post_id = window.location.href.split('/').pop();
        const formdata = {
            token: token_user,
            post_id: post_id
        };

        const response = await axios.post('api/v_super/get_single_post/', formdata);
        console.log('yaha data single post ka h --------',response.data)
        const data = response.data.get_single_post;
        if (response.data.status === 'get_single_post') {
            
            image.value = data.images;
            title_post.value = data.title;
            post_date.value = data.created_at.split('T')[0];
            category.value = data.post_category;
            topics.value = data.post_topics;
            content_post.value = data.content;
            
            const firstName = data.user.first_name || '';
            const lastName = data.user.last_name || '';
            post_user_name.value = firstName || lastName ? `${firstName} ${lastName}`.trim() : 'N/A';
        } else {
            console.log('Invalid data');
        }
    } catch (error) {
        console.error(error);
    }
};

const get_single_comments = async () => {
    try {
        const token_user = localStorage.getItem('authToken');
        const post_id = window.location.href.split('/').pop();
        const formdata = {
            token: token_user,
            post_id: post_id
        };
        const response = await axios.post('api/v_super/get_single_comments/', formdata);
        console.log('get_single_comments', response.data);
        const data = response.data.get_single_comments;
        // const comments = data.comments.map((comment:any) => {
        //     user_name_comment.value = `${comment.user.first_name || "No name"} ${comment.user.last_name || ""}`;
        //     return comment;
        // });

        if (response.data.status === 'get_single_comments') {
            parent_post.value = data.comments;
        } else {
            console.log('Invalid data');
        }
    } catch (error) {
        console.error(error);
    }
};


const delete_post = async () => {
    try {
        const token_user = localStorage.getItem('authToken');
        const post_id = window.location.href.split('/').pop();
        const formdata = {
            token: token_user,
            post_id: post_id
        };
        const response = await axios.post('api/v_super/delete_post/', formdata);
        const data = response.data.delete_post;
        if (response.data.status === 'delete_post') {
            get_single_post();
            get_single_comments();
            window.location.href = '/community';
        } else {
            console.log('Invalid data');
        }
    } catch (error) {
        console.error(error);
    }
}; 

const delete_comment = async (comment_id:any) => {
    try {
        const token_user = localStorage.getItem('authToken');
        const formdata = {
            token: token_user,
            comment_id: comment_id
        };
        
        const response = await axios.post('api/v_super/delete_comment/', formdata);
        const data = response.data.delete_comment;
        if (response.data.status === 'delete_comment') {
            get_single_post();
            get_single_comments();
        } else {
            console.log('Invalid data');
        }
    } catch (error) {
        console.error(error);
    }
}; 

</script>
<template>
    <v-row>
        <v-col cols="12" md="5">
            <v-card elevation="10">
                <div v-if="image">
                    <v-img :src="`${BASE_URL}${image}`" height="440" cover class="rounded-t-md align-end text-right"></v-img>
                </div>
                <div v-else class="imgSizerCustom">
                    <v-img :src="vImageIcon"  class="imageSizeFixd rounded-md img-fluid" />
                </div>
                <div class="d-flex ma-3 justify-space-between align-center bg-grey100 pa-2 border rounded">
                    <div class="d-flex">
                        <template>
                            <div>
                                <div v-if="image">
                                    <v-avatar size="60" class="me-2">
                                        <img :src="image" alt="icon" height="60" />
                                    </v-avatar>
                                </div>
                                <div v-else>
                                    <v-avatar size="60" class="me-2">
                                        <img :src="user1" alt="icon" height="60" />
                                    </v-avatar>
                                </div>
                            </div>
                        </template>
                        <div class="">
                            <h2 class="text-h5 mb-1">{{ post_user_name.trim() ? post_user_name : 'N/A' }}</h2>
                            <v-chip color="primary" size="small">{{ post_date ? post_date : 'N/A' }}</v-chip>
                        </div>

                    </div>
                    <v-btn size="small" color="error" @click="delete_post()">Delete Post</v-btn>
                </div>
                <v-card-item class="pa-4 pt-1">
                    <h1 class="text-h4 text-13 mt-2 mb-3">{{ title_post }}</h1>

                    <div class="">
                        <p class="my-4 text-subtitle-1 line-height-1-6">
                            {{ content_post }}
                        </p>
                        <!-- <v-divider class="mt-6 py-2 border-top"></v-divider>
                        <div class="">
                            <h2 class="text-h5 mb-2">Category:</h2>
                            <div class="d-flex align-center flex-wrap gap-2">
                                <v-chip color="primary" size="small" v-for="(item, index) in category" :key="category.id">
                                    {{ item.name }}
                                </v-chip>
                            </div>
                        </div> -->
                        <!-- <v-divider class="mt-6 py-2 border-top"></v-divider> -->
                        <!-- <div class="">
                            <h2 class="text-h5 mb-2">Topics:</h2>
                            <div class="d-flex align-center flex-wrap gap-2">
                                <v-chip color="secondary" size="small" v-for="topic in topics" :key="topics.id">
                                    {{ topic.name }}
                                </v-chip>
                            </div>
                        </div> -->
                    </div>
                </v-card-item>
            </v-card>
        </v-col>
        <v-col cols="12" md="7">
            <v-card class="" elevation="10">
                <v-card-item class="pa-4">
                    <h2 class="mb-6">Comments</h2>
                    <div class="px-3 mainReviewListing" v-for="parent in parent_post" :key="parent_post.id">
                        <div class="loopColumnReview">
                            <div class="mb-3 bg-grey100 pa-3 border rounded">
                                <v-row class="">
                                    <v-col cols="12" class="">
                                        <div class="d-flex mb-2 justify-space-between">
                                            <div class="d-flex align-center">
                                                <v-avatar size="40" class="">
                                                    <img :src="user1" alt="icon" height="40" />
                                                </v-avatar>
                                                <div class="pl-2">
                                                    <h5 class="text-h6 mb-1">
                                                        {{ (parent.user.first_name || '').trim() || (parent.user.last_name || '').trim() ? `${parent.user.first_name || ''} ${parent.user.last_name || ''}`.trim() : 'N/A' }}
                                                    </h5>
                                                </div>
                                            </div>
                                            <v-btn color="error" size="small" @click="delete_comment(parent.id)">Delete</v-btn>
                                        </div>
                                        <p class="text-body-2 font-weight-semibold mt-3 mb-2 text-13">
                                            {{ parent.content }}
                                        </p>
                                    </v-col>
                                </v-row>
                            </div>
                            <div
                                class="ms-6 mb-3 bg-grey100 pa-3 border rounded"
                                v-for="child in parent.child_comments"
                                :key="parent.child_comments.id"
                            >
                                <v-row class="">
                                    <v-col cols="12" class="">
                                        <div class="d-flex mb-2 justify-space-between">
                                            <div class="d-flex align-center">
                                                <v-avatar size="40" class="">
                                                    <img :src="user1" alt="icon" height="40" />
                                                </v-avatar>
                                                <div class="pl-2">
                                                    <h5 class="text-h6 mb-1">
                                                        {{ (child.user.first_name || '').trim() || (child.user.last_name || '').trim() ? `${child.user.first_name || ''} ${child.user.last_name || ''}`.trim() : 'N/A' }}
                                                    </h5>
                                                </div>
                                            </div> 
                                            <v-btn color="error" size="small" @click="delete_comment(child.id)">Delete</v-btn>
                                        </div>
                                        <p class="text-body-2 font-weight-semibold mt-3 mb-2 text-13">
                                            {{ child.content }}
                                        </p>
                                    </v-col>
                                </v-row>
                            </div>
                        </div>
                    </div>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
</template>
<style>
.imgSizerCustom .v-responsive__sizer {
    padding-bottom: 0px !important;
}

.imgSizerCustom img.v-img__img.v-img__img--contain {
    width: 100%;
    height: 100%;
}
</style>