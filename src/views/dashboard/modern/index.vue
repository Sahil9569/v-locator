<script setup lang="ts">
/*Call Components*/
import Topcards from "../dashboardComponents/modern/TopCards.vue";
import TopProjects from "../dashboardComponents/modern/TopProjects.vue";
</script>
<template>
    <v-row>
        <!-- Top cards -->
        <v-col cols="12">
            <Topcards/>
        </v-col> 
         <v-col cols="12">
           <v-row class="mt-2">
                <v-col cols="12">
                    <TopProjects/>
                </v-col>
                <!-- Revenue Updates -->
                <!-- <v-col cols="12" lg="6" pa-5>
                    <RevenueUpdates/>
                </v-col> -->
                <!-- Yearly Breakup / Monthly Earnings -->
                <!-- <v-col cols="12" lg="4" sm="12">
                    <YearlyBreakup/>
                </v-col>
                <v-col cols="12" lg="4" sm="12">
                    <MonthlyEarnings/>
                </v-col> -->
                <v-col cols="12" lg="12" sm="6">
                    <v-row>
                        <!-- <v-col cols="12" lg="6" sm="8">
                            <EmployeeSalary/>
                        </v-col> -->
                        <!-- <v-col cols="12" lg="3" sm="8">
                            <Customers/>
                        </v-col>
                        <v-col cols="12" lg="3" sm="8">
                            <Projects/>
                        </v-col> -->
                        <!-- <v-col cols="12" lg="12" sm="8">
                            <UserCard/>
                        </v-col> -->
                        <!-- <v-col cols="12">
                            <BestSellingProducts/>
                        </v-col> -->
                    </v-row>
                    
                </v-col>
               
                <!-- Weekly Stats -->
                <!-- <v-col cols="12" lg="4" md="4">
                    <WeeklyStats/>
                </v-col> -->
                <!-- Top Projects -->
                <!-- <v-col cols="12" lg="8" md="8">
                    <TopProjects/>
                </v-col> -->
                <!-- <v-col class="mainUserCstn">
                    <UserReview />
                </v-col> -->
           </v-row>
        </v-col>    
    </v-row>
</template>