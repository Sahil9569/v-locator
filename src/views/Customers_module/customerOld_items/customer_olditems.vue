<script setup lang="ts">

</script>

<template>
    <v-card class="bg-lightprimary elevation-0 rounded-md mb-8">
        <div class="px-8 py-8 py-sm-0">
            <div class="d-flex justify-space-between">
                <div class="d-flex py-0 align-center">
                    <div>
                        <h3 class="text-h3 mb-2 textPrimary">My Orders</h3>
                    </div>
                </div>
                <div class="d-none py-0 d-sm-block overflow-hidden">
                    <div class="mb-n16 mt-3">
                        <img src="@/assets/images/backgrounds/customerOld.png" alt="breadcrumb" width="250" />
                    </div>
                </div>
            </div>
        </div>
    </v-card>
    <v-row>
        <v-col cols="12" md="4" sm="6">
            <v-card elevation="10" class="border  border-primary overflow-hidden">
                <v-card-item class="">
                    <div class="">
                        <h2 class="font-weight-normal text-h5 mb-2">Order : #101</h2>
                        <h3 class="font-weight-normal mb-2 text-h6">Table No : Table-V1</h3>
                        <h3 class="font-weight-normal mb-2 text-h6">Items : 2 </h3>
                    </div>
                    <p class="text-subtitle-1 text-primary">27-08-2023 | 04.00PM</p>
                </v-card-item>
                <v-divider />
                <v-sheet class="bg-primary rounded-0 pa-0">
                    <RouterLink to="/myOrder" class="text-decoration-none">
                        <v-btn color="white" class="w-100 rounded-0" icon variant="text">
                            View Items
                        </v-btn>
                    </RouterLink>
                </v-sheet>
            </v-card>
        </v-col>
        <v-col cols="12" md="4" sm="6">
            <v-card elevation="10" class="border  border-primary overflow-hidden">
                <v-card-item class="">
                    <div class="">
                        <h2 class="font-weight-normal text-h5 mb-2">Order : #102</h2>
                        <h3 class="font-weight-normal mb-2 text-h6">Table No : Table-V2</h3>
                        <h3 class="font-weight-normal mb-2 text-h6">Items : 1 </h3>
                    </div>
                    <p class="text-subtitle-1 text-primary">18-08-2023 | 04.00PM</p>
                </v-card-item>
                <v-divider />
                <v-sheet class="bg-primary rounded-0 pa-0">
                    <RouterLink to="/myOrder" class="text-decoration-none">
                        <v-btn color="white" class="w-100 rounded-0" icon variant="text">
                            View Items
                        </v-btn>
                    </RouterLink>
                </v-sheet>
            </v-card>
        </v-col>
        <v-col cols="12" md="4" sm="6">
            <v-card elevation="10" class="border  border-primary overflow-hidden">
                <v-card-item class="">
                    <div class="">
                        <h2 class="font-weight-normal text-h5 mb-2">Order : #103</h2>
                        <h3 class="font-weight-normal mb-2 text-h6">Table No : Table-V3</h3>
                        <h3 class="font-weight-normal mb-2 text-h6">Items : 4 </h3>
                    </div>
                    <p class="text-subtitle-1 text-primary">27-08-2023 | 04.00PM</p>
                </v-card-item>
                <v-divider />
                <v-sheet class="bg-primary rounded-0 pa-0">
                    <RouterLink to="/myOrder" class="text-decoration-none">
                        <v-btn color="white" class="w-100 rounded-0" icon variant="text">
                            View Items
                        </v-btn>
                    </RouterLink>
                </v-sheet>
            </v-card>
        </v-col>
        <v-col cols="12" md="4" sm="6">
            <v-card elevation="10" class="border  border-primary overflow-hidden">
                <v-card-item class="">
                    <div class="">
                        <h2 class="font-weight-normal text-h5 mb-2">Order : #101</h2>
                        <h3 class="font-weight-normal mb-2 text-h6">Table No : Table-V1</h3>
                        <h3 class="font-weight-normal mb-2 text-h6">Items : 2 </h3>
                    </div>
                    <p class="text-subtitle-1 text-primary">27-08-2023 | 04.00PM</p>
                </v-card-item>
                <v-divider />
                <v-sheet class="bg-primary rounded-0 pa-0">
                    <RouterLink to="/myOrder" class="text-decoration-none">
                        <v-btn color="white" class="w-100 rounded-0" icon variant="text">
                            View Items
                        </v-btn>
                    </RouterLink>
                </v-sheet>
            </v-card>
        </v-col>
        <v-col cols="12" md="4" sm="6">
            <v-card elevation="10" class="border  border-primary overflow-hidden">
                <v-card-item class="">
                    <div class="">
                        <h2 class="font-weight-normal text-h5 mb-2">Order : #102</h2>
                        <h3 class="font-weight-normal mb-2 text-h6">Table No : Table-V2</h3>
                        <h3 class="font-weight-normal mb-2 text-h6">Items : 1 </h3>
                    </div>
                    <p class="text-subtitle-1 text-primary">18-08-2023 | 04.00PM</p>
                </v-card-item>
                <v-divider />
                <v-sheet class="bg-primary rounded-0 pa-0">
                    <RouterLink to="/myOrder" class="text-decoration-none">
                        <v-btn color="white" class="w-100 rounded-0" icon variant="text">
                            View Items
                        </v-btn>
                    </RouterLink>
                </v-sheet>
            </v-card>
        </v-col>
        <v-col cols="12" md="4" sm="6">
            <v-card elevation="10" class="border  border-primary overflow-hidden">
                <v-card-item class="">
                    <div class="">
                        <h2 class="font-weight-normal text-h5 mb-2">Order : #103</h2>
                        <h3 class="font-weight-normal mb-2 text-h6">Table No : Table-V3</h3>
                        <h3 class="font-weight-normal mb-2 text-h6">Items : 4 </h3>
                    </div>
                    <p class="text-subtitle-1 text-primary">27-08-2023 | 04.00PM</p>
                </v-card-item>
                <v-divider />
                <v-sheet class="bg-primary rounded-0 pa-0">
                    <RouterLink to="/myOrder" class="text-decoration-none">
                        <v-btn color="white" class="w-100 rounded-0" icon variant="text">
                            View Items
                        </v-btn>
                    </RouterLink>
                </v-sheet>
            </v-card>
        </v-col>
    </v-row>
</template>