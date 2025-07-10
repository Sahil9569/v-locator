<script setup lang="ts">
/*Call Components*/
import WelcomeCard from "../dashboardComponents/report/WelcomeCard.vue";
import Payments from "../dashboardComponents/report/Payments.vue";
import ProductSold from "../dashboardComponents/report/ProductSold.vue";
import RevenueUpdates from "../dashboardComponents/report/RevenueUpdates.vue";
import SalesOverview from "../dashboardComponents/report/SalesOverview.vue";
import TotalEarning from "../dashboardComponents/report/TotalEarning.vue";
import SalesProfit from "../dashboardComponents/report/SalesProfit.vue";
import MonthlyEarnings from "../dashboardComponents/report/MonthlyEarnings.vue";
import WeeklyStats from "../dashboardComponents/modern/WeeklyStats.vue";
import YearlySales from "../dashboardComponents/report/YearlySales.vue";
import PaymentGateways from "../dashboardComponents/report/PaymentGateways.vue";
import ProductPerformance from "../dashboardComponents/report/ProductPerformance.vue";
import RecentTransactions from "../dashboardComponents/report/RecentTransactions.vue";
</script>
<template>
    <v-row>
        <!-- Welcome Card -->
        <v-col cols="12" lg="8">
            <WelcomeCard/>
        </v-col> 
        <!-- Payments -->
        <v-col cols="12" lg="2" sm="6">  
            <Payments/>
        </v-col>  
        <!-- Products Sold -->
        <v-col cols="12" lg="2" sm="6">  
            <ProductSold/>
        </v-col> 
        <!-- Revenue Updates -->
        <v-col cols="12" lg="4" sm="6">  
            <RevenueUpdates/>
        </v-col> 
        <!-- Sales Overview -->
        <v-col cols="12" lg="4" sm="6">  
            <SalesOverview/>
        </v-col> 
        
        <v-col cols="12" lg="4" sm="6"> 
            <v-row>
                <v-col cols="12" sm="6">
                    <!--Total Earning -->
                    <TotalEarning/>
                </v-col>
                <v-col cols="12" sm="6">
                    <!--sales profit -->
                    <SalesProfit/>
                </v-col>
            </v-row>
            <!--Monthly Earning -->
            <MonthlyEarnings/>
        </v-col> 
        <!-- Weekly Stats-->
        <v-col cols="12" lg="4" sm="6">
            <WeeklyStats/>
        </v-col>
        <!-- Yearly Stats-->
        <v-col cols="12" lg="4" md="6">
            <YearlySales/>
        </v-col>
        <!-- Payment Gateways-->
        <v-col cols="12" lg="4" md="6">
            <PaymentGateways/>
        </v-col>
        <!-- Recent Transactions -->
        <v-col cols="12" lg="4" sm="12"> 
            <RecentTransactions/>
        </v-col>
        <!-- Product Performance -->
        <v-col cols="12" lg="8" sm="12"> 
            <ProductPerformance/>
        </v-col>
    </v-row>    
</template>