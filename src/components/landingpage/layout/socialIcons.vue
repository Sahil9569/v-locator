<script setup lang="ts">
import { ref } from 'vue';
import { BrandFacebookIcon , BrandTwitterIcon, BrandPinterestIcon, BrandVimeoIcon, BrandInstagramIcon } from 'vue-tabler-icons';
</script>
<template>
    <div class="social-iocns-style">
        <ul>
            <li>
                <a href=""><BrandFacebookIcon stroke-width="1.5"/></a>
            </li>
            <li>
                <a href=""><BrandTwitterIcon  stroke-width="1.5"/></a>
            </li>
            <li>
                <a href=""><BrandPinterestIcon  stroke-width="1.5"/></a>
            </li>
            <li>
                <a href=""><BrandVimeoIcon  stroke-width="1.5"/></a>
            </li>
            <li>
                <a href=""><BrandInstagramIcon  stroke-width="1.5"/></a>
            </li>
        </ul>
    </div>
</template>