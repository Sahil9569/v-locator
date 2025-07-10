import mock from '../../mockAdapter';
// import type { ContactType } from '@/types/apps/ContactType';

import user1 from '@/assets/images/profile/Spoons.png';
// import user2 from '@/assets/images/profile/user-2.jpg';
// import user3 from '@/assets/images/profile/user-3.jpg';
// import user4 from '@/assets/images/profile/user-4.jpg';
// import user5 from '@/assets/images/profile/user-5.jpg';
// import user6 from '@/assets/images/profile/user-6.jpg';
// import user7 from '@/assets/images/profile/user-7.jpg';
// import user8 from '@/assets/images/profile/user-8.jpg';
// import user9 from '@/assets/images/profile/user-9.jpg';
// import user10 from '@/assets/images/profile/user-10.jpg';


// types
export type KeyedObject = {
    [key: string]: string | number | KeyedObject | any;
};

const notification_details: KeyedObject[] = [
    {
        dishImage: user1,
        // avatar: user1,
        userinfo: 'Hanna Gover',
        usermail: 'Wackup jaw',
        phone: 'Wackup',
        Category: 'Kitchen',
        Floor: '1',
        rolestatus: 'primary'
    },
    {
        dishImage: user1,
        // avatar: user2,
        userinfo: 'Daniel Kristeen',
        usermail: 'Kabir Khan',
        phone: 'Kabir Khan',
        Category: 'Kitchen',
        Floor: '2',
        rolestatus: 'secondary'
    },
    {
        dishImage: user1,
        // avatar: user3,
        userinfo: 'Julian Josephs',
        usermail: 'Daniel',
        phone: 'Daniel',
        Category: 'Kitchen',
        Floor: '3',
        rolestatus: 'primary'
    },
    {
        dishImage: user1,
        // avatar: user4,
        userinfo: 'Jan Petrovic',
        usermail: 'Kurtis',
        phone: 'Kurtis',
        Category: 'Kitchen',
        Floor: '5',
        rolestatus: 'secondary'
    },
    {
        dishImage: user1,
        // avatar: user5,
        userinfo: 'Leanne Graham',
        usermail: 'Wackup jaw',
        phone: 'Windsa',
        Category: 'Bar',
        Floor: '4',
        rolestatus: 'secondary'
    },
    {
        dishImage: user1,
        // avatar: user6,
        userinfo: 'Mrs. Dennis',
        usermail: 'Kitdnd',
        phone: 'Kitdnd',
        Category: 'Bar',
        Floor: '2',
        rolestatus: 'primary'
    },
    {
        dishImage: user1,
        // avatar: user7,
        userinfo: 'Kurtis',
        usermail: 'Wackup jaw',
        phone: 'Danial',
        Category: 'Bar',
        Floor: '3',
        rolestatus: 'secondary'
    },
    {
        dishImage: user1,
        // avatar: user8,
        userinfo: 'Nicholas V',
        usermail: 'Wackup jaw',
        phone: 'Dusido',
        Category: 'Bar',
        Floor: '4',
        rolestatus: 'primary'
    },
    {
        dishImage: user1,
        // avatar: user9,
        userinfo: 'Glenna',
        usermail: '---',
        phone: '--',
        Category: 'Bar',
        Floor: '2',
        rolestatus: 'secondary'
    },
    {
        dishImage: user1,
        // avatar: user10,
        userinfo: 'Clementina',
        usermail: '---',
        phone: '--',
        Category: 'Bar',
        Floor: '1',
        rolestatus: 'primary'
    }
];

const staffDataa: KeyedObject[] = [
    {
        dishImage: user1,
        // avatar: user1,
        userinfo: 'Hanna Gover',
        usermail: 'Wackup jaw',
        phone: 'Wackup',
        Category: 'Kitchen',
        Floor: '1',
        rolestatus: 'primary'
    },
    {
        dishImage: user1,
        // avatar: user2,
        userinfo: 'Daniel Kristeen',
        usermail: 'Kabir Khan',
        phone: 'Kabir Khan',
        Category: 'Kitchen',
        Floor: '2',
        rolestatus: 'secondary'
    },
    {
        dishImage: user1,
        // avatar: user3,
        userinfo: 'Julian Josephs',
        usermail: 'Daniel',
        phone: 'Daniel',
        Category: 'Kitchen',
        Floor: '3',
        rolestatus: 'error'
    },
    {
        dishImage: user1,
        // avatar: user4,
        userinfo: 'Jan Petrovic',
        usermail: 'Kurtis',
        phone: 'Kurtis',
        Category: 'Kitchen',
        Floor: '5',
        rolestatus: 'success'
    },
    {
        dishImage: user1,
        // avatar: user5,
        userinfo: 'Leanne Graham',
        usermail: 'Wackup jaw',
        phone: 'Windsa',
        Category: 'Bar',
        Floor: '4',
        rolestatus: 'info'
    },
    {
        dishImage: user1,
        // avatar: user6,
        userinfo: 'Mrs. Dennis',
        usermail: 'Kitdnd',
        phone: 'Kitdnd',
        Category: 'Bar',
        Floor: '2',
        rolestatus: 'warning'
    },
    {
        dishImage: user1,
        // avatar: user7,
        userinfo: 'Kurtis',
        usermail: 'Wackup jaw',
        phone: 'Danial',
        Category: 'Bar',
        Floor: '3',
        rolestatus: 'primary'
    },
    {
        dishImage: user1,
        // avatar: user8,
        userinfo: 'Nicholas V',
        usermail: 'Wackup jaw',
        phone: 'Dusido',
        Category: 'Bar',
        Floor: '4',
        rolestatus: 'secondary'
    },
    {
        dishImage: user1,
        // avatar: user9,
        userinfo: 'Glenna',
        usermail: '---',
        phone: '--',
        Category: 'Bar',
        Floor: '2',
        rolestatus: 'error'
    },
    {
        dishImage: user1,
        // avatar: user10,
        userinfo: 'Clementina',
        usermail: '---',
        phone: '--',
        Category: 'Bar',
        Floor: '1',
        rolestatus: 'success'
    }
];
// ==============================|| MOCK SERVICES ||============================== //

// mock.onGet('/api/products/list').reply(200, { products });
mock.onGet('/api/notification_details').reply(() => {
    return [200, notification_details];
});




export default notification_details;
