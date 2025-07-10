import type {topCards, customerReport } from '@/types/components/dashboard/modernDashboard';
import {GrillIcon} from 'vue-tabler-icons';


/*--Top cards--*/
import card_icon1 from "@/assets/images/svgs/icon-user-male.svg"
import card_icon2 from "@/assets/images/backgrounds/Kitchen.png"
import card_icon3 from "@/assets/images/svgs/icon-mailbox.svg"
import card_icon4 from "@/assets/images/svgs/icon-favorites.svg"
import card_icon5 from "@/assets/images/svgs/icon-speech-bubble.svg"
import card_icon6 from "@/assets/images/svgs/icon-connect.svg"

/*--Blog Cards--*/
// const userCardData: userCard[] = [
//     { img: user4 },
//     { img: user3 },
//     { img: user2 },
//     { img: user1 },
// ];

/*--Weeekly Stas--*/
// const weeklyStatsData: weeklyStats[] = [
//     {
//         title: "Top Sales",
//         subtitle: "Spicy Chinese Eggplant",
//         rank: 'GrillIcon',
//         bgcolor: "primary",
//         textcolor: "primary",
//     },
//     {
//         title: "Best Seller",
//         subtitle: "Coconut Rice",
//         rank: "GrillIcon",
//         bgcolor: "success",
//         textcolor: "success",
//     },
//     {
//         title: "Most Commented",
//         subtitle: "Vegetable Biryani",
//         rank: "GrillIcon",
//         bgcolor: "error",
//         textcolor: "error",
//     },
// ];

/*--Top Projects --*/
const customerReportData: customerReport[] = [
    {
        img: card_icon1,
        title: "Total Customers",
        number: "100",
        bgcolor: "lightprimary",
        textcolor: "primary"
    },
    {
        img: card_icon2,
        title: "Active Customers",
        number: "80",
        bgcolor: "lightwarning",
        textcolor: "warning"
    },
    {
        img: card_icon3,
        title: "Drop-Off Customers",
        number: "20",
        bgcolor: "lightsecondary",
        textcolor: "secondary"
    },
    {
        img: card_icon4,
        title: "Peek Feedback",
        number: "80",
        bgcolor: "lightsuccess",
        textcolor: "success"
    }
];

/*--Top Cards --*/
const topCardsData: topCards[] = [
    {
        img: card_icon1,
        title: "All Orders",
        number: "500",
        bgcolor: "lightprimary",
        textcolor: "primary"
    },
    {
        img: card_icon2,
        title: "New Order",
        number: "6",
        bgcolor: "lightwarning",
        textcolor: "warning"
    },
    {
        img: card_icon3,
        title: "Confirmed Order",
        number: "10",
        bgcolor: "lightsecondary",
        textcolor: "secondary"
    },
    // {
    //     img: card_icon4,
    //     title: "Cooking Order",
    //     number: "12",
    //     bgcolor: "lighterror",
    //     textcolor: "error"
    // },
    {
        img: card_icon5,
        title: "Delivered Order",
        number: "20",
        bgcolor: "lightsuccess",
        textcolor: "success"
    },
    {
        img: card_icon6,
        title: "Complete Order",
        number: "440",
        bgcolor: "lightprimary",
        textcolor: "primary"
    }
]

export {topCardsData, customerReportData}