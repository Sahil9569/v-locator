<script setup lang="ts">
/*Call Components*/
import WelcomeCard from "../adminReport/WelcomeCard.vue";
// import RecentTransactions from "../adminReport/RecentTransactions.vue";
// import YearlySales from "../adminReport/YearlySales.vue";
// import ApexColumnChart from "../adminReport/ApexColumnChart.vue";
// import PaymentGateways from "../adminReport/PaymentGateways.vue";
</script>
<template>
    <v-row>
        <v-col cols="12" lg="12">
            <WelcomeCard/>
        </v-col> 
        
        <!-- <v-col cols="12" md="6">
            <RecentTransactions/>
        </v-col>    

        <v-col cols="12" md="6">
            <ApexColumnChart/>
        </v-col>

        <v-col cols="8">
            <YearlySales/>
        </v-col>

        <v-col cols="12" lg="4">
            <PaymentGateways/>
        </v-col> -->
    </v-row>    
</template>