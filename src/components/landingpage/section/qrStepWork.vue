<template>
    <v-container class="maxWidth">
            <v-row class="justify-center pb-16">
                <v-col cols="12" lg="8" sm="10" data-aos="fade-up" data-aos-duration="500">
                    <h2 class="text-center mt-4 sectionTitle font-weight-bold text-white">Contactless QR Menu</h2>
                    <p class="text-center mt-3 text-white">This is the most simplest form of QR Menu. Perfect if your restaurant believes in table service.  All we have done is replaced the printed menu with a QR Menu!</p>
                </v-col>
            </v-row>
            <v-row class="mt-16">
                <v-col cols="12" xs="12" sm="12" md="4" class="columnStepStyle">
                    <v-card elevation="10" class="ma-lg-4 pa-3 bg-primary">
                        <div class="innrCrdMnu">
                            <h2>01  </h2>
                            <div class="imageCrdInr">
                                <img src="@/assets/images/locator/phoneScan.png" alt="scanner1">
                            </div>
                            <h4>Guest Scan's QR Code placed on the table with his / her mobile phone</h4>
                        </div>
                    </v-card>
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="4"  class="columnStepStyle">
                    <v-card elevation="10" class="ma-lg-4 pa-3 bg-primary">
                        <div class="innrCrdMnu">
                            <h2>02</h2>
                            <div class="imageCrdInr">
                                <img src="@/assets/images/locator/menuListOrder.png" alt="scanner2">
                            </div>
                            <h4>Guest browse's the menu without downloading any app</h4>
                        </div>
                    </v-card>
                </v-col>
                <v-col col="12" xs="12" sm="12" md="4"  class="columnStepStyle">
                    <v-card elevation="10" class="ma-lg-4 pa-3 bg-primary">
                        <div class="innrCrdMnu">
                            <h2>03</h2>
                            <div class="imageCrdInr">
                                <img src="@/assets/images/locator/groupOrder.png" alt="scanner3">
                            </div>
                            <h4>The staff takes the order like you would normally do.</h4>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
    </v-container>
</template>