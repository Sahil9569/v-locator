<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Header from '@/components/landingpage/layout/Header.vue';
import MainBanner from '@/components/landingpage/section/mainBanner.vue';
import PricingSection from '@/components/landingpage/section/PricingSection.vue';
// import FrameWorks from '@/components/landingpage/section/frameWorks.vue';
import UserReview from '@/components/landingpage/section/userReview.vue';
import OurMission from '@/components/landingpage/section/ourMission.vue';
import specialMenuTime from '@/components/landingpage/section/specialMenu.vue';
import TableQrCode from '@/components/landingpage/section/tableQRCode.vue';
import QRStepWork from '@/components/landingpage/section/qrStepWork.vue';
import AskQuestion from '@/components/landingpage/section/askQuestion.vue';
import BuyNow from '@/components/landingpage/section/buyNow.vue';
import Footer from '@/components/landingpage/layout/Footer.vue';

import 'aos/dist/aos.css';
import AOS from 'aos';

onMounted(() => {
    AOS.init();
});

</script>

<template>
    <div class="lp-wraper">
        <!--Header-->
        <Header />

        <!----------->
        <!--Content-->
        <MainBanner />
        <section class="pricing-section-main dark-theme-section">
            <v-container class="maxWidth" id="demos">
                <v-row class="justify-center">
                    <v-col cols="12" lg="8" sm="10" data-aos="fade-up" data-aos-duration="500">
                        <h2 class="text-center mt-4 sectionTitle font-weight-bold">
                            Every plans starts off with a <br>14-day free trail
                        </h2>
                    </v-col>
                </v-row>
                <div class="mt-4">
                    <div class="product-slider position-relative lp_wrapper">
                        <div class="d-flex justify-center"><v-chip class="bg-primary text-white">Our Pricing</v-chip></div>
                        <PricingSection />
                    </div>
                </div>
            </v-container>
        </section>
        <!-- <FrameWorks /> -->
        <!-- <Features /> -->
        <AskQuestion />
        <section class="dark-theme-section py-10 bg-darkTheme qrCodeScnrSection">
            <QRStepWork/>
        </section>
        <section class="dark-theme-section py-12 light-bg-section animationGraphAdd">
            <specialMenuTime/>
        </section>
        <section class="dark-theme-section graphBgAdd">
            <TableQrCode/>
        </section>
        <section class="dark-theme-section">
            <BuyNow />
        </section>
        <section class="dark-theme-section">
            <OurMission/>
        </section>
        <section class="dark-theme-section pb-10">
            <UserReview />
        </section>
        <!----------->
        <!--Footer-->
        <Footer />
        <!----------->
    </div>
</template>
