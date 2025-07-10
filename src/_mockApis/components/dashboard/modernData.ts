import type { userCard, weeklyStats,topProjects,topCards } from '@/types/components/dashboard/modernDashboard';
import {GrillIcon} from 'vue-tabler-icons';

import user1 from "@/assets/images/profile/user-1.jpg";
import user2 from "@/assets/images/profile/user-2.jpg";
import user3 from "@/assets/images/profile/user-3.jpg";
import user4 from "@/assets/images/profile/user-4.jpg";

/*--Top cards--*/
import card_icon1 from "@/assets/images/svgs/icon-user-male.svg"
import card_icon2 from "@/assets/images/backgrounds/Kitchen.png"
import card_icon3 from "@/assets/images/svgs/icon-mailbox.svg"
import card_icon4 from "@/assets/images/svgs/icon-favorites.svg"
import card_icon5 from "@/assets/images/svgs/icon-speech-bubble.svg"
import card_icon6 from "@/assets/images/svgs/icon-connect.svg"

/*--Blog Cards--*/
const userCardData: userCard[] = [
    { img: user4 },
    { img: user3 },
    { img: user2 },
    { img: user1 },
];

/*--Weeekly Stas--*/
const weeklyStatsData: weeklyStats[] = [
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
];

/*--Top Projects --*/
const topProjectsData: topProjects[] = [
    {
        img: user1,
        activestate: "",
        leadname: "Sunil Joshi",
        designation: "Web Designer",
        projectname: "Elite Admin",
        statuscolor: "success",
        statustext: "Low",
        money: "$3.9K",
    },
    {
        img: user2,
        activestate: "",
        leadname: "John Deo",
        designation: "Web Developer",
        projectname: "Flexy Admin",
        statuscolor: "warning",
        statustext: "Medium",
        money: "$24.5K",
    },
    {
        img: user3,
        activestate: "",
        leadname: "Nirav Joshi",
        designation: "Web Manager",
        projectname: "Material Pro",
        statuscolor: "error",
        statustext: "High",
        money: "$12.8K",
    },
    {
        img: user4,
        activestate: "",
        leadname: "Yuvraj Sheth",
        designation: "Project Manager",
        projectname: "Xtreme Admin",
        statuscolor: "secondary",
        statustext: "Very High",
        money: "$2.4K",
    },
];

/*--Top Cards --*/
const topCardsData: topCards[] = [
    {
        img: card_icon1,
        title: "All Staff",
        number: "150",
        bgcolor: "lightprimary",
        textcolor: "primary"
    },
    {
        img: card_icon2,
        title: "All Kitchen",
        number: "5",
        bgcolor: "lightwarning",
        textcolor: "warning"
    },
    {
        img: card_icon3,
        title: "Today Order",
        number: "5",
        bgcolor: "lightsecondary",
        textcolor: "secondary"
    },
    {
        img: card_icon4,
        title: "Today Sell",
        number: "500k",
        bgcolor: "lighterror",
        textcolor: "error"
    },
    {
        img: card_icon5,
        title: "All Customer",
        number: "250",
        bgcolor: "lightsuccess",
        textcolor: "success"
    },
    {
        img: card_icon6,
        title: "Total Delivered",
        number: "20",
        bgcolor: "lightprimary",
        textcolor: "primary"
    }
]

export { userCardData, weeklyStatsData, topProjectsData,topCardsData}