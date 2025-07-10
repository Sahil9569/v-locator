import mock from '../../mockAdapter';
// import type { ContactType } from '@/types/apps/ContactType';

import user1 from '@/assets/images/profile/user-1.jpg';
import user2 from '@/assets/images/profile/user-2.jpg';
import user3 from '@/assets/images/profile/user-3.jpg';
import user4 from '@/assets/images/profile/user-4.jpg';
import user5 from '@/assets/images/profile/user-5.jpg';
import user6 from '@/assets/images/profile/user-6.jpg';
import user7 from '@/assets/images/profile/user-7.jpg';
import user8 from '@/assets/images/profile/user-8.jpg';
import user9 from '@/assets/images/profile/user-9.jpg';
import user10 from '@/assets/images/profile/user-10.jpg';



const managerListAdmin: KeyedObject[] = [
    {   
        id: 1,
        restaurantName: 'Bistro Captain',
        firstName: 'Jesus',
        lastName: 'T. Hodgdon',
        phone: '757-575-5031',
        email: 'jesushodgdon1@dayrep.com',
        joiningDate: '20-07-2021',
        packageName:'V Locator +',
        status: true,
    },
    {   
        id: 2,
        restaurantName: 'Bistroporium',
        firstName: 'Vincent',
        lastName: 'J. Summers',
        phone: '855-575-5552',
        email: 'vincenthotspot12@dayrep.com',
        joiningDate: '25-07-2022',
        packageName:'V Locator +',
        status: false,
    },
    {   
        id: 3,
        restaurantName: 'Cuisine Wave',
        firstName: 'Tyson',
        lastName: 'E. Evans',
        phone: '657-575-5231',
        email: 'evanshotspot12@dayrep.com',
        joiningDate: '26-08-2021',
        packageName:'Premium A',
        status: true,
    },
    {   
        id: 4,
        restaurantName: 'Deli Divine',
        firstName: 'Hugh',
        lastName: 'M. Paredes',
        phone: '757-575-5031',
        email: 'paredeshotspot12@dayrep.com',
        joiningDate: '15-07-2020',
        packageName:'Premium B',
        status: true,
    },
    {   
        id: 5,
        restaurantName: 'Deli Feast',
        firstName: 'Mario',
        lastName: 'G. Cook',
        phone: '711-575-5031',
        email: 'ecook12@dayrep.com',
        joiningDate: '18-04-2021',
        packageName:'Premium A',
        status: false,
    },
    {   
        id: 6,
        restaurantName: 'Eatery Hotspot',
        firstName: 'Larry',
        lastName: 'R. Stanley',
        phone: '117-515-1131',
        email: 'eateryhotspot12@dayrep.com',
        joiningDate: '20-03-2021',
        packageName:'V Locator +',
        status: true,
    },
    {   
        id: 7,
        restaurantName: 'Kitchen Takeout',
        firstName: 'Manuel',
        lastName: 'V. Hoffman',
        phone: '757-575-5031',
        email: 'hoffman345@dayrep.com',
        joiningDate: '22-10-2023',
        packageName:'Premium B',
        status: true,
    },
    {   
        id: 8,
        restaurantName: 'Feast Palace',
        firstName: 'Brandon',
        lastName: 'A. Watts',
        phone: '557-555-5531',
        email: 'brandonhotspot12@dayrep.com',
        joiningDate: '20-07-2021',
        packageName:'V Locator +',
        status: true,
    },
    {   
        id: 9,
        restaurantName: 'Kitchen Sensation',
        firstName: 'Tyson',
        lastName: 'E. Evans',
        phone: '755-555-5031',
        email: 'eateryhotspot12@dayrep.com',
        joiningDate: '25-09-2021',
        packageName:'Premium C',
        status: true,
    },
    {   
        id: 10,
        restaurantName: 'Eatery Hotspot',
        firstName: 'Larry',
        lastName: 'R. Stanley',
        phone: '757-575-5031',
        email: 'eateryhotspot12@dayrep.com',
        joiningDate: '20-07-2021',
        packageName:'V Locator +',
        status: true,
    },
    {   
        id: 11,
        restaurantName: 'Custom11',
        firstName: 'Larry',
        lastName: 'R. Stanley',
        phone: '757-575-5031',
        email: 'eateryhotspot12@dayrep.com',
        joiningDate: '20-07-2021',
        packageName:'V Locator +',
        status: true,
    },
    {   
        id: 12,
        restaurantName: 'Custom 12',
        firstName: 'Larry',
        lastName: 'R. Stanley',
        phone: '757-575-5031',
        email: 'eateryhotspot12@dayrep.com',
        joiningDate: '20-07-2021',
        packageName:'V Locator +',
        status: true,
    },
    {   
        id: 13,
        restaurantName: 'Custom 13',
        firstName: 'Larry',
        lastName: 'R. Stanley',
        phone: '757-575-5031',
        email: 'eateryhotspot12@dayrep.com',
        joiningDate: '20-07-2021',
        packageName:'V Locator +',
        status: true,
    },
];


// ==============================|| MOCK SERVICES ||============================== //

// mock.onGet('/api/products/list').reply(200, { products });
mock.onGet('/api/contacts').reply(() => {
    return [200, managerListAdmin];
});




export default managerListAdmin;
