import {
    CircleIcon,
    HomeIcon,
    ClipboardIcon,
    AlertCircleIcon,
    SettingsIcon,
    LoginIcon,
    UserPlusIcon,
    RotateIcon,
    ZoomCodeIcon,
    FileDescriptionIcon,
    BorderAllIcon,
    AppsIcon,
    PointIcon
} from 'vue-tabler-icons';

export interface menu {
    header?: string;
    title?: string;
    icon?: any;
    to?: string;
    divider?: boolean;
    chip?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    subCaption?: string;
    class?: string;
    extraclass?: string;
    type?: string;
}

const HorizontalService: menu[] = [
    {
        title: 'Dashboard',
        // icon: HomeIcon,
        to: `/staffDashboard/${localStorage.getItem('res_token')}`,
        // children: [
        //     {
        //         title: 'Modern',
        //         icon: CircleIcon,
        //         to: '/dashboards/modern'
        //     },
        //     {
        //         title: 'Ecommerce',
        //         icon: CircleIcon,
        //         to: '/dashboards/ecommerce'
        //     }
        // ]
    },
   
    {
        title: 'Tables',
        // icon: PointIcon,
        to: `/tables/${localStorage.getItem('res_token')}`
    },
    {
        title: 'Orders',
        to: `/orders/${localStorage.getItem('res_token')}`,
        children: [
            {
                title: 'All Orders',
                to: `/orders/${localStorage.getItem('res_token')}`,
            },
            // {
            //     title: 'New Order',
            //     to: '/newOrder'
            // },
        ]
    },
    // {
    //     title: 'Staff Menu',
    //     children: [
    //         {
    //             title: 'Menu',
    //             to: `/staffmenu/${localStorage.getItem('res_token')}`
    //         },
    //         {
    //             title: 'Order',
    //             to: `/staffOrder/${localStorage.getItem('res_token')}`
    //         },
    //     ]
        
    // },
    // {
    //     title: 'Staff Availability',
    //     to: '/staffAvailability'
    // }
];

export default HorizontalService;
