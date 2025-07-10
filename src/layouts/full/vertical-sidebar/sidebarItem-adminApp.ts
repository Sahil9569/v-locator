// import { pointToRendererPoint } from '@braks/vue-flow/dist/utils/graph';
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
    PackageIcon,
    ListSearchIcon,
    BuildingCommunityIcon,
    UsersIcon,
    SpeakerphoneIcon
    // ChartLineIcon
}

    from 'vue-tabler-icons';

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



const sidebarItemAdminApp: menu[] = [
    {
        title: 'Restaurants',
        icon: BuildingCommunityIcon,
        children: [
            {
                title: 'Restaurants List',
                icon: PointIcon,
                to: `/restaurant_list_app`
            },
            {
                title: 'Restaurant Requests',
                icon: PointIcon,
                to: `/restaurant_inactive`
            },
            {
                title: 'Restaurants Category',
                icon: PointIcon,
                to: `/restaurant_category`
            },
            {
                title: 'Pending Data Details',
                icon: PointIcon,
                to: `/rest_detail`
            }
        ]
    },
    {
        title: 'Recipes',
        icon: GrillIcon,
        children: [
            {
                title: 'All Recipes',
                to: '/recipe'
            },
            {
                title: 'Recipe Category',
                to: '/recipe_category'
            },
        ]
    },
    {
        title: 'Events',
        icon: CalendarIcon,
        children: [
            {
                title: 'All Events',
                to: '/events'
            },
            {
                title: 'Archive  Events',
                to: '/archive_events'
            },
        ]
    },
    
    {
        title: 'Communities',
        icon: UsersIcon,
        children: [
            {
                title: 'Community Posts',
                icon: PointIcon,
                to: `/community`
            },
            {
                title: 'Category',
                icon: PointIcon,
                to: `/category`
            },
            // {
            //     title: 'Topics',
            //     icon: PointIcon,
            //     to: `/topics`
            // }
        ]
    },


    {
        title: 'Advertisement',
        icon: SpeakerphoneIcon,
        to: '/advertisement'
    },
    // {
    //     title: 'News and Feed',
    //     icon: SpeakerphoneIcon,
    //     to: '/news'
    // },
    {
        title: 'Promotions',
        icon: StarIcon,
        to: '/promotional_feature'
    },

];


export default sidebarItemAdminApp;
