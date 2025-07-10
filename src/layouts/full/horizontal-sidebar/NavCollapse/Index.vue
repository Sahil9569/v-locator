<script setup>
import NavItem from '../NavItem/Index.vue';
import Icon from '../../vertical-sidebar/Icon.vue';
const props = defineProps({ item: Object, level: Number });
</script>

<template>
    <a class="navItemLink rounded-md cursor-pointer">
        <i class="navIcon"><Icon :item="item.icon" :level="level" /></i>
        <span class="mr-auto">{{ item.title }}</span>
        <small v-if="item.subCaption" class="text-caption mt-n1 hide-menu">
            {{ item.subCaption }}
        </small>
        <i class="ddIcon ml-2 d-flex align-center"><ChevronDownIcon size="15" /></i>
    </a>
    <ul :class="`ddMenu ddLevel-${level + 1}`">
        <li v-for="(subitem, i) in item.children" :key="i" v-if="item.children" class="navItem">
            <Index :item="subitem" v-if="subitem.children" :level="level + 1" />
            <NavItem :item="subitem" :level="level + 1" v-else></NavItem>
        </li>
    </ul>
</template>
