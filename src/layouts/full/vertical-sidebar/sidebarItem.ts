// import { pointToRendererPoint } from '@braks/vue-flow/dist/utils/graph';
const resType = localStorage.getItem('res_type');
console.log('check hi to kr na h ',resType)

import {
    CircleOffIcon,
    BoxMultipleIcon,
    AppsIcon,
    FileTextIcon,
    FileDotsIcon,
    FilesIcon,
    EditIcon,
    BorderAllIcon,
    BorderHorizontalIcon,
    BorderInnerIcon,
    BorderTopIcon,
    BorderVerticalIcon,
    BoxIcon,
    AlertCircleIcon,
    LoginIcon,
    UserPlusIcon,
    RotateIcon,
    CurrencyDollarIcon,
    ChartLineIcon,
    ChartAreaIcon,
    ChartDotsIcon,
    ChartArcsIcon,
    ChartCandleIcon,
    ChartDonut3Icon,
    ChartRadarIcon,
    ShoppingCartIcon,
    ApertureIcon,
    LayoutIcon,
    HelpIcon,
    UserCircleIcon,
    BoxAlignBottomIcon,
    BoxAlignLeftIcon,
    SettingsIcon,
    ZoomCodeIcon,
    StarIcon,
    AwardIcon,
    MoodSmileIcon,
    Message2Icon,
    PointIcon,
    AppWindowIcon,
    MailIcon,
    BasketIcon,
    CalendarIcon,
    BorderStyle2Icon,
    Category2Icon,
    ToolsKitchen2Icon,
    ChefHatIcon,
    GrillIcon,
    FilePencilIcon,
    Discount2Icon,
    BrandAirtableIcon,
    // ChartLineIcon
} from 'vue-tabler-icons';

export interface menu {
    header?: string;
    title?: string;
    icon?: any;
    to?: string;
    chip?: string;
    chipBgColor?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
}

const sidebarItem: menu[] = [
    // { header: 'Dashboard' },
    
    {
        title: 'Dashboard',
        icon: ApertureIcon,
        to: `/dashboards/${localStorage.getItem('res_token')}`
    },
    
    
    // {
    //     title: 'Staff Mangement',
    //     icon: ChefHatIcon,
    //     children: [
    //         {
    //             title: 'Staff Users' ,
    //             icon: PointIcon,
    //             to: `/staff/${localStorage.getItem('res_token')}`,
    //         },
    //         {
    //             title: 'Availability',
    //             icon: PointIcon,
    //             to: `/staffAvailability/${localStorage.getItem('res_token')}`
    //         },
    //         {
    //             title: 'Table Requests',
    //             icon: PointIcon,
    //             to: `/tableRequests/${localStorage.getItem('res_token')}`
    //         }
    //     ]
        
    // },
    {
        title: 'Food Management',
        icon: GrillIcon,
        children: [
            {
                title: 'Category and Addon',
                icon: PointIcon,
                to: `/addCategory/${localStorage.getItem('res_token')}`
            },
            {
                title: 'Food List',
                icon: PointIcon,
                to: `/food/${localStorage.getItem('res_token')}`
            }
        ]
    },
    {
        title: 'Manage Order',
        icon: ShoppingCartIcon,
        children: [
            {
                title: 'Order Lists',
                icon: PointIcon,
                to: `/order-list/${localStorage.getItem('res_token')}`
            },
            {
                title: 'Pending Orders',
                icon: PointIcon,
                to: `/pending-order/${localStorage.getItem('res_token')}`
            },
            {
                title: 'Complete Orders',
                icon: PointIcon,
                to: `/complete-order/${localStorage.getItem('res_token')}`,
            },
            {
                title: 'Cancel Orders',
                icon: PointIcon,
                to: `/cancel-order/${localStorage.getItem('res_token')}`,
            },
           
        ]
    },
    {
        title: 'Kitchen Mangement',
        icon: ToolsKitchen2Icon,
        to: `/kitchen/${localStorage.getItem('res_token')}`,
    },

    
    // {
    //     title: 'Table',
    //     icon: BrandAirtableIcon,
    //     children: [
    //         {
    //             title: 'Add Table',
    //             icon: PointIcon,
    //             to: `/table/${localStorage.getItem('res_token')}`,
    //         },
    //         {
    //             title: 'Table Availability',
    //             icon: PointIcon,
    //             to: `/availability_table/${localStorage.getItem('res_token')}`
    //         },
           
    //     ]
    // },
    {
        title: 'Customer List',
        icon: UserCircleIcon,
        to: `/restaurantCustomerList/${localStorage.getItem('res_token')}`
    },
    {

        title: 'Coupon and Discount',
        icon: Discount2Icon,
        to: `/coupon-discount/${localStorage.getItem('res_token')}`,
    },
    
    {
        title: 'All Feedback',
        icon: FilePencilIcon,
        to: `/feedback/${localStorage.getItem('res_token')}`,
    },
    {
        title: 'Report',
        icon: ChartLineIcon,
        children:[
            {
                title: 'All Report',
                icon: PointIcon,
                to: `/report/${localStorage.getItem('res_token')}`,
            },
            {
                title: 'Food Report',
                icon: PointIcon,
                to: `/foodReport/${localStorage.getItem('res_token')}`,
            },
            {
                title: 'Staff Report',
                icon: PointIcon,
                to: `/staffReport/${localStorage.getItem('res_token')}`,
            },
        ]
    },
    
    {
        title: 'Settings',
        icon: SettingsIcon,
        to: '/',
        children: [
            {
                title: 'Payment Setting',
                icon: PointIcon,
                to: `/manage-order/order-list/${localStorage.getItem('res_token')}`,
                children: [
                    // {
                    //     title: 'Payment Method List',
                    //     icon: PointIcon,
                    //     to: `/payment-method-list/${localStorage.getItem('res_token')}`,
                    // },
                    {
                        title: 'Payments ',
                        icon: PointIcon,
                        to: `/payment-setup/${localStorage.getItem('res_token')}`,
                    }
                ]
            },
            {
                title: 'Restaurant Setting',
                icon: PointIcon,
                to: `/restaurant-setting/${localStorage.getItem('res_token')}`,
            },
        ]
    },
    {
        title: 'Packages',
        icon: BrandAirtableIcon,
        to: `/packages/${localStorage.getItem('res_token')}`,
    },
];
const filteredSidebar = sidebarItem.filter(tab => tab);
resType!='Vendor'?filteredSidebar.splice(1, 0,{
    title: 'Staff Mangement',
    icon: ChefHatIcon,
    children: [
      {
        title: 'Staff Users',
        icon: PointIcon,
        to: `/staff/${localStorage.getItem('res_token')}`,
      },
      {
        title: 'Availability',
        icon: PointIcon,
        to: `/staffAvailability/${localStorage.getItem('res_token')}`,
      },
      {
        title: 'Table Requests',
        icon: PointIcon,
        to: `/tableRequests/${localStorage.getItem('res_token')}`,
      },
    ],
  }):''

  resType!='Vendor'?filteredSidebar.splice(4, 0,{
        title: 'Table',
        icon: BrandAirtableIcon,
        children: [
            {
                title: 'Add Table',
                icon: PointIcon,
                to: `/table/${localStorage.getItem('res_token')}`,
            },
            {
                title: 'Table Availability',
                icon: PointIcon,
                to: `/availability_table/${localStorage.getItem('res_token')}`
            },
        ],
    }):''
export default filteredSidebar;
