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


// types
export type KeyedObject = {
    [key: string]: string | number | KeyedObject | any;
};

const contacts: KeyedObject[] = [
    {
        id: '1',
        avatar: user1,
        userinfo: 'Hanna Gover',
        usermail: 'Wackup jaw',
        phone: 'Wackup',
        Category: 'Kitchen',
        Floor: '1',
        rolestatus: 'primary'
    },
    {
        id: '2',
        avatar: user2,
        userinfo: 'Daniel Kristeen',
        usermail: 'Kabir Khan',
        phone: 'Kabir Khan',
        Category: 'Kitchen',
        Floor: '2',
        rolestatus: 'secondary'
    },
    {
        id: '3',
        avatar: user3,
        userinfo: 'Julian Josephs',
        usermail: 'Daniel',
        phone: 'Daniel',
        Category: 'Kitchen',
        Floor: '3',
        rolestatus: 'primary'
    },
    {
        id: '4',
        avatar: user4,
        userinfo: 'Jan Petrovic',
        usermail: 'Kurtis',
        phone: 'Kurtis',
        Category: 'Kitchen',
        Floor: '5',
        rolestatus: 'secondary'
    },
    {
        id: '5',
        avatar: user5,
        userinfo: 'Leanne Graham',
        usermail: 'Wackup jaw',
        phone: 'Windsa',
        Category: 'Bar',
        Floor: '4',
        rolestatus: 'secondary'
    },
    {
        id: '6',
        avatar: user6,
        userinfo: 'Mrs. Dennis',
        usermail: 'Kitdnd',
        phone: 'Kitdnd',
        Category: 'Bar',
        Floor: '2',
        rolestatus: 'primary'
    },
    {
        id: '7',
        avatar: user7,
        userinfo: 'Kurtis',
        usermail: 'Wackup jaw',
        phone: 'Danial',
        Category: 'Bar',
        Floor: '3',
        rolestatus: 'secondary'
    },
    {
        id: '8',
        avatar: user8,
        userinfo: 'Nicholas V',
        usermail: 'Wackup jaw',
        phone: 'Dusido',
        Category: 'Bar',
        Floor: '4',
        rolestatus: 'primary'
    },
    {
        id: '9',
        avatar: user9,
        userinfo: 'Glenna',
        usermail: '---',
        phone: '--',
        Category: 'Bar',
        Floor: '2',
        rolestatus: 'secondary'
    },
    {
        id: '10',
        avatar: user10,
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
        id: '1',
        avatar: user1,
        userinfo: 'Hanna Gover',
        usermail: 'Wackup jaw',
        phone: 'Wackup',
        Category: 'Kitchen',
        Floor: '1',
        rolestatus: 'primary'
    },
    {
        id: '2',
        avatar: user2,
        userinfo: 'Daniel Kristeen',
        usermail: 'Kabir Khan',
        phone: 'Kabir Khan',
        Category: 'Kitchen',
        Floor: '2',
        rolestatus: 'secondary'
    },
    {
        id: '3',
        avatar: user3,
        userinfo: 'Julian Josephs',
        usermail: 'Daniel',
        phone: 'Daniel',
        Category: 'Kitchen',
        Floor: '3',
        rolestatus: 'error'
    },
    {
        id: '4',
        avatar: user4,
        userinfo: 'Jan Petrovic',
        usermail: 'Kurtis',
        phone: 'Kurtis',
        Category: 'Kitchen',
        Floor: '5',
        rolestatus: 'success'
    },
    {
        id: '5',
        avatar: user5,
        userinfo: 'Leanne Graham',
        usermail: 'Wackup jaw',
        phone: 'Windsa',
        Category: 'Bar',
        Floor: '4',
        rolestatus: 'info'
    },
    {
        id: '6',
        avatar: user6,
        userinfo: 'Mrs. Dennis',
        usermail: 'Kitdnd',
        phone: 'Kitdnd',
        Category: 'Bar',
        Floor: '2',
        rolestatus: 'warning'
    },
    {
        id: '7',
        avatar: user7,
        userinfo: 'Kurtis',
        usermail: 'Wackup jaw',
        phone: 'Danial',
        Category: 'Bar',
        Floor: '3',
        rolestatus: 'primary'
    },
    {
        id: '8',
        avatar: user8,
        userinfo: 'Nicholas V',
        usermail: 'Wackup jaw',
        phone: 'Dusido',
        Category: 'Bar',
        Floor: '4',
        rolestatus: 'secondary'
    },
    {
        id: '9',
        avatar: user9,
        userinfo: 'Glenna',
        usermail: '---',
        phone: '--',
        Category: 'Bar',
        Floor: '2',
        rolestatus: 'error'
    },
    {
        id: '10',
        avatar: user10,
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
mock.onGet('/api/contacts').reply(() => {
    return [200, contacts];
});




export default contacts;
