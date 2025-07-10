
import type { basicTable1, basicTable2, basicTable3, basicTable4, basicTable5, tableDark, tableDensity, tableFixedHeader, heightTable, tableAction } from '@/types/components/table/index';
/*import tabler icons*/
import { PlusIcon, EditIcon, TrashIcon, CheckIcon, XIcon, ArrowBackUpIcon } from 'vue-tabler-icons';
import img1 from '@/assets/images/profile/user-1.jpg';
import img2 from '@/assets/images/profile/user-2.jpg';
import img3 from '@/assets/images/profile/user-3.jpg';
import img4 from '@/assets/images/profile/user-4.jpg';
import img5 from '@/assets/images/profile/user-5.jpg';
import img6 from '@/assets/images/profile/user-6.jpg';
import authimg1 from '@/assets/images/blog/blog-img1.jpg';
import authimg2 from '@/assets/images/blog/blog-img2.jpg';
import authimg3 from '@/assets/images/blog/blog-img3.jpg';
import authimg4 from '@/assets/images/blog/blog-img4.jpg';
import authimg5 from '@/assets/images/blog/blog-img5.jpg';



const staffCurrentOrders: tableFixedHeader[] = [
    {
        avatar: img2,
        name: 'John',
        handle: '@steele',
        status: 'Table-V1',
        statusoffline:true,
        statuscolor: '',
        email: '#101',
        time : '12:37:00',
        teams: '#101'
    },
    {
        avatar: img3,
        name: 'Gordon',
        handle: '@gordon',
        status: 'Table-V1',
        statusoffline:false,
        statuscolor: '',
        email: '987654321',
        time : '12:45:00',
        teams: '#102'
    },
    {
        avatar: img1,
        name: 'Rhye',
        handle: '@rhye',
        status: 'Table-V2',
        statusoffline:false,
        statuscolor: '',
        email: '987654321',
        time : '12:50:00',
        teams: '#103'
    },

    {
        avatar: img4,
        name: 'Evelyn',
        handle: '@pope',
        status: 'Table-V2',
        statusoffline:true,
        statuscolor: '',
        email: '987654321',
        time : '1:00:00',
        teams: '#104'
    },
    {
        avatar: img5,
        name: 'Tommy',
        handle: '@garza',
        status: 'Table-V2',
        statusoffline:false,
        statuscolor: '',
        email: '987654321',
        time : '1:15:00',
        teams: '#105'
    },
    {
        avatar: img6,
        name: 'Isabel',
        handle: '@vasquez',
        status: 'Table-V3',
        statusoffline:false,
        statuscolor: '',
        email: '987654321',
        time : '1:30:00',
        teams: '#106'
    }
];

/*Height Table*/
const heightTableData: heightTable[] = [
    {
        avatar: authimg3,
        name: 'New Users',
        handle: 'Awesome Users',
        users: '2000 Users',
        email: 'mark@ui.com',
        courses: [
            {
                status: 'Reactjs',
                statuscolor: 'success'
            },
            {
                status: 'Angular',
                statuscolor: 'error'
            }
        ]
    },
    {
        avatar: authimg4,
        name: 'Active Customers',
        handle: 'Best Customers',
        users: '1500 Users',
        email: 'deo@ui.com',
        courses: [
            {
                status: 'Bootstrap',
                statuscolor: 'primary'
            }
        ]
    },
    {
        avatar: authimg1,
        name: 'Top Authors',
        handle: 'Successful Fellas',
        users: '4300 Users',
        email: 'olivia@ui.com',
        courses: [
            {
                status: 'Angular',
                statuscolor: 'error'
            },
            {
                status: 'PHP',
                statuscolor: 'primary'
            }
        ]
    },
    {
        avatar: authimg2,
        name: 'Popular Authors',
        handle: 'Most Successful',
        users: '1200 Users',
        email: 'john@doe.com',
        courses: [
            {
                status: 'Bootstrap',
                statuscolor: 'primary'
            }
        ]
    },
    {
        avatar: authimg5,
        name: 'Bestseller Theme',
        handle: 'Amazing Templates',
        users: '9500 Users',
        email: 'steele@ui.com',
        courses: [
            {
                status: 'Angular',
                statuscolor: 'error'
            },
            {
                status: 'Reactjs',
                statuscolor: 'success'
            }
        ]
    },
    {
        avatar: authimg1,
        name: 'New Authors',
        handle: 'Successful Fellas',
        users: '4800 Users',
        email: 'olivia@ui.com',
        courses: [
            {
                status: 'Angular',
                statuscolor: 'error'
            },
            {
                status: 'Java',
                statuscolor: 'info'
            }
        ]
    }
]


/*Table Action*/
const tableActionData: tableAction[] = [
    {
        icon: PlusIcon,
        listtitle: 'Add'
    },
    {
        icon: EditIcon,
        listtitle: 'Edit'
    },
    {
        icon: TrashIcon,
        listtitle: 'Delete'
    }
]
export { basicTableData1, basicTableData2, basicTableData3, basicTableData4, basicTableData5, darkTableData, tableDensityData, staffCurrentOrders, heightTableData, tableActionData };
