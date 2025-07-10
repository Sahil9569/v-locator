<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useEcomStore } from '@/stores/apps/eCommerce';

const props = defineProps({
    name: String,
    image: String,
    desc: String,
    rating: Number,
    salePrice: Number,
    offerPrice: Number,
    goto: Number || String || Object || Array
});
const successsnackbar = ref(false);
const rate = ref(props.rating);
const store = useEcomStore();
const getCart = computed(() => {
    return store.cart;
});

</script>

<template>
    <v-card variant="outlined" class="rounded card-hover overflow-hidden">
        <div class="imageSizeProduct">
            <router-link :to="`/ecommerce/product/detail/${goto}`">
                <img alt="product" :src="image" class="w-100" />
            </router-link>
        </div>
        
        <v-card-item class="pt-3">
            <h6 class="text-h6">{{ name }}</h6>

            <div class="d-flex align-center justify-space-between mt-1">
                <div class="d-flex align-center gap-2">
                    <h6 class="text-h5 font-weight-bold">${{ offerPrice }}</h6>
                    <p class="text-decoration-line-through text-subtitle-1 text-medium-emphasis">${{ salePrice }}</p>
                </div>
                <!-- <v-rating color="warning" half-increments size="small" v-model="rate" density="compact"> </v-rating> -->
            </div>
            <div class="mt-3">
                <v-tooltip text="Add to Cart" location="bottom">
                    <template v-slot:activator="{ props }">
                        <!-- <v-btn v-for="btn in btnsColor" :key="btn" :color="btn" variant="flat"></v-btn> -->
                        <v-btn
                            variant="flat"
                            v-bind="props"
                            color="primary"
                            class="ml-auto"
                            size="small"
                            @click="$emit('handlecart', (successsnackbar = true))"
                            ><BasketIcon size="18"
                        class="me-1"/> Add To Cart</v-btn>
                    </template>
                </v-tooltip>
            </div>
        </v-card-item>
        <v-snackbar variant="flat" location="bottom right" color="success" rounded="md" class="text-white" v-model="successsnackbar">
            <span>Item Added to The Cart <v-badge color="dark" :content="getCart?.length"></v-badge></span>
            <span>
                <v-btn
                variant="flat"
                color="light"
                class="ml-auto"
                size="small"> Add To Cart</v-btn>
            </span>
        </v-snackbar>
        
    </v-card>
</template>
<style>
.descriptionH {
    height: 40px;
    overflow: hidden;
}
</style>
