<script setup lang="ts">
import {ref,onMounted} from 'vue';
/*Call Components*/
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// import WelcomeCard from "../report/report_component/WelcomeCard.vue";
import SalesOverview from "./report_component/SalesOverview.vue";
import TotalEarning from "./report_component/TotalEarning.vue";
import SalesProfit from "./report_component/SalesProfit.vue";
import MonthlyEarnings from "./report_component/MonthlyEarnings.vue";
import ProductPerformance from "./report_component/ProductPerformance.vue";
import axios from 'axios';
import { useRouter } from "vue-router";
const router = useRouter();
import BASE_URL from '@/stores/myVar'
axios.defaults.baseURL = BASE_URL

const total = ref([])
onMounted(() => {
    // getData();
});

const getData = async () => {
    console.log("Order Items LIST API CALL")
    try {
        const token = localStorage.getItem('res_token');
        const formData = {
            token:token,    
        };
        const response = await axios.post('api/order_data/', formData);
        console.log("YE HAI CAT2 --------------------",response.data);
        total.value = response.data.most_sold
    } catch (error) {
        console.error('API error:', error);
    }
}

const weeklyStatsData = ref([
    {
        title: "Top Sales",
        subtitle: "Spicy Chinese Eggplant",
        rank: 'GrillIcon',
        bgcolor: "primary",
        textcolor: "primary",
    },
    {
        title: "Best Seller",
        subtitle: "Coconut Rice",
        rank: "GrillIcon",
        bgcolor: "success",
        textcolor: "success",
    },
    {
        title: "Most Commented",
        subtitle: "Vegetable Biryani",
        rank: "GrillIcon",
        bgcolor: "error",
        textcolor: "error",
    },
]);
const downloadAsPDF = async () => {
  try {
    const element = document.getElementById('test');
    
    if (!element) {
      console.error("Element with ID 'report-page' not found");
      return;
    }

    const pdfOptions = {
      margin: 10,
      filename: 'report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    const pdf = await html2pdf().from(element).set(pdfOptions).outputPdf();

    const blob = new Blob([pdf], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = pdfOptions.filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};
const generatePDF = () => {
    const element = document.getElementById('test'); // Replace with the ID of your content element
    if (!element) { console.error("Element with the specified ID not found"); return; }
    const doc = new jsPDF();
    html2canvas(element).then(canvas => {
        const dataURL = canvas.toDataURL('image/png');
        doc.addImage(dataURL, 'PNG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
        doc.save('report.pdf');
    });
};


</script>
<template >
    
    <v-row >
        <!-- Welcome Card -->
        <v-col cols="12" lg="12">
            <v-card elevation="0" rounded="md" class="bg-lightsecondary border-0">
                <v-card-item class="pt-3 pb-0">
                    <v-row class="align-center">
                        <v-col cols="12" sm="6" class="pt-sm-10 pt-5">
                            <div class="d-flex">
                                <img src="@/assets/images/backgrounds/growth.png" height="40"
                                        alt="icon" class="mt-2"/>
                                <div>
                                    <h5 class="text-h3 ml-4  d-block textPrimary">All Report</h5>
                                    <h6 class="text-medium-emphasis ms-4 text-subtitle-1 textSecondary">All Restaurant Performance</h6>
                                    <v-btn variant="flat" class="ml-4 mt-3" size="small" color="primary" @click="generatePDF">Download as PDF</v-btn>
                                </div>
                            </div>
                            <div class="mt-8">
                            </div>

                        </v-col>
                        <v-col cols="12" sm="6" class="text-sm-right">
                            <div class="mb-n2 ">
                                <img src="@/assets/images/backgrounds/reportt.png" class="" alt="image" width="340" />
                            </div>
                        </v-col>
                    </v-row>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
    <v-row id="test">
        <v-col cols="12">
            <v-row >
                <v-col cols="12" lg="6" sm="6" > 
                    <SalesOverview/>
                </v-col> 
                
                <v-col cols="12" lg="6" sm="6" > 
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
            </v-row> 
        </v-col>
    
        <!-- Weekly Stats-->

        <!-- <v-col cols="12" class="pb-0">
            <h3 class="text-h4">Best Seller</h3>
        </v-col>

        <v-col cols="12" lg="4" sm="6" v-for="(itema) in total">
            <v-card elevation="10">
                <v-card-item class="px-3">
                    <div class="d-flex align-center" >
                        <v-avatar class='rounded-md bg-light primary' size="40">
                            <GridDotsIcon size="18" class='text-primary' />
                        </v-avatar>
                        <div class="pl-4">
                            <h5 class="text-subtitle-1 textSecondary mt-1">{{itema.item__dish_name}}</h5>
                        </div>
                        <v-chip class="ml-auto font-weight-semibold text-subtitle-1 py-5" color="primary" rounded="sm" size="small">
                            <GrillIcon />
                        </v-chip>
                    </div>
                </v-card-item>
            </v-card>
        </v-col> -->

        <v-col cols="12"> 
            <ProductPerformance/>
        </v-col>
        
        
    </v-row>    
</template>
