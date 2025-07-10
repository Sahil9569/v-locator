<script setup lang="ts">
import { ref } from 'vue';
import { useDisplay } from 'vuetify';
const { xs, lgAndUp } = useDisplay();
const sDrawer = ref(false);
</script>

<template>
    <!---/Left chat list -->
    <div class="mainbox">
        <div class="sideBarCategory">
            <!-- <perfect-scrollbar style="height: calc(100vh - 290px)"> -->
            <slot name="leftpart"></slot>
            <!-- </perfect-scrollbar> -->
        </div>

        <!---right chat conversation -->
        <div class="menuOrderType">
            <slot name="rightpart"></slot>
        </div>
        <!---right chat conversation -->
    </div>
</template>

<style lang="scss">
.mainbox {
    position: relative;
    overflow: hidden;
}
.left-part {
    width: 320px;
    border-right: 1px solid rgb(var(--v-theme-borderColor));
    min-height: 500px;
    transition: 0.1s ease-in;
    flex-shrink: 0;
}
.v-theme--light {
    .left-part {
        background: white;
    }
}
.v-theme--dark {
    .left-part {
        background: #2b2b2b;
    }
}
.right-part {
    width: 100%;
    min-height: 500px;
    position: relative;
}
</style>
