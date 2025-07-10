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
    ListSearchIcon
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

const sidebarItemAdmin: menu[] = [
    // { header: 'Dashboard' },
    {
        title: 'Dashboard',
        icon: ApertureIcon,
        // chip: 'New',
        // chipColor: 'surface',
        // chipBgColor: 'secondary',
        to: '/adminDashboard'
    },
    {
        title: 'Restaurants',
        icon: ListSearchIcon,
        // chip: 'New',
        // chipColor: 'surface',
        // chipBgColor: 'secondary',
        to: '/managerList'
    },
    {
        title: 'Packages',
        icon: PackageIcon,
        to: '/packages'
    },
    {
        title: 'Report',
        icon: ChartLineIcon,
        to: '/adminReport'
    },
];

export default sidebarItemAdmin;

