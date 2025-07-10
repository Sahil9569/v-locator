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

const sidebarItemKitchen: menu[] = [
    // { header: 'Dashboard' },
    {

        title: 'Dashboard',
        icon: ChefHatIcon,
        to: `/kitchenDashboard/${localStorage.getItem('res_token')}`,
    },
    {
        title: 'Order',
        icon: ShoppingCartIcon,
        to: `/kitchenOrder/${localStorage.getItem('res_token')}`,
    },
    {
        title: 'Report',
        icon: ChartLineIcon,
        to: `/kitchenReport/${localStorage.getItem('res_token')}`,
    },
];

export default sidebarItemKitchen;
