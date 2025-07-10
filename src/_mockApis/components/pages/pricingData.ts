/*import tabler icons*/
import { CheckIcon, XIcon, } from 'vue-tabler-icons';
import type { pricingType } from '@/types/components/pages/pricingData';
/*-- Pricing Page --*/
import img1 from '@/assets/images/backgrounds/silver.png';
import img2 from '@/assets/images/backgrounds/bronze.png';
import img3 from '@/assets/images/backgrounds/gold.png';
const pricing: pricingType[] = [
    {
        tagtext: false,
        caption: 'Basic',
        image: img1,
        free: true,
        price: 0.00,
        yearlyprice: 0.00 * 12,
        buttontext: 'Active',
        pacakgesURL: '1',
        list: [
            {
                icon: CheckIcon,
                iconcolor: 'primary',
                listtitle: 'Order + Payment',
                status:false,
            },
            {
                icon: CheckIcon,
                iconcolor: 'primary',
                listtitle: 'Restaurant management System',
                status:false,
            },
            {
                icon: CheckIcon,
                iconcolor: 'primary',
                listtitle: 'Customer Survey Solution',
                status:false,
            },
            {
                icon: CheckIcon,
                iconcolor: 'primary',
                listtitle: 'Guest Database tags and notes',
                status:false,
            }
        ]
    },
    {
        tagtext: false,
        caption: 'Premium A',
        image: img2,
        free: false,
        price: 29.00,
        yearlyprice: 10.99 * 12,
        buttontext: 'Choose Premium A',
        pacakgesURL: '1',
        list: [
            {
                icon: CheckIcon,
                iconcolor: 'primary',
                listtitle: 'Order + Payment',
                status:false,
            },
            {
                icon: CheckIcon,
                iconcolor: 'primary',
                listtitle: 'Restaurant management System',
                status:false,
            },
            {
                icon: CheckIcon,
                iconcolor: 'primary',
                listtitle: '1x1 consultation',
                status:false,
            },
            {
                icon: CheckIcon,
                iconcolor: 'primary',
                listtitle: 'Reporting',
                status:false,
            },
            {
                icon: CheckIcon,
                iconcolor: 'primary',
                listtitle: 'Inventory mgmt',
                status:false,
            },
            {
                icon: CheckIcon,
                iconcolor: 'primary',
                listtitle: 'Filters for most purchased, most viewed, least sold et',
                status:false,
            },
            {
                icon: CheckIcon,
                iconcolor: 'primary',
                listtitle: 'Dashboard',
                status:false,
            }
        ]
    },
    {
        tagtext: true,
        caption: 'V Locator +',
        image: img3,
        free: false,
        price: 299.99,
        yearlyprice: 22.99 * 12,
        buttontext: 'Choose V Locator +',
        pacakgesURL: '1',
        list: [
            {
                icon: CheckIcon,
                iconcolor: 'primary',
                listtitle: 'Shipping (via some sort of API)',
                status:false,
            },
            {
                icon: CheckIcon,
                iconcolor: 'primary',
                listtitle: 'Dedicated CSM',
                status:false,
            },
            {
                icon: CheckIcon,
                iconcolor: 'primary',
                listtitle: 'POS Integration',
                status:false,
            },
            {
                icon: CheckIcon,
                iconcolor: 'primary',
                listtitle: 'Automated email campaigns, guest preferences and guest profiles.',
                status:false,
            }
        ]
    },
    

];
export { pricing};