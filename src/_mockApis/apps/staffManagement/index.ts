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

const staffmanagements: KeyedObject[] = [
    {
        id: '#0013',
        firstName: 'Hanna',
        lastName: 'Gover',
        Phone: '8274241752',
        Role: 'Manager',
        Email: 'hanna@gmail.com',
        rolestatus: 'primary',
        address1 :'',
        address2 :'',
        city:'',
        state:'',
        country:'',
    },
    {
        id: '#0023',
        firstName: 'Daniel',
        lastName: 'Kristeen',
        Phone: '9543216548',
        Role: 'Manager',
        Email: 'hanna@gmail.com',
        rolestatus: 'primary',
        address1 : 'lorem address1 show 1',
        address2 : 'lorem address1 show 2',
        city: 'City Dummy',
        state: 'Dummy State',
        country:'Dummy Country',
    },
    {
        id: '#0023',
        firstName: 'Julian',
        lastName: 'Josephs',
        Phone: '9876542145',
        Role: 'Manager',
        Email: 'hanna@gmail.com',
        rolestatus: 'primary',
        address1 :'',
        address2 :'',
        city:'',
        state:'',
        country:'',
    },
    {
        id: '#0015',
        firstName: 'Jan',
        lastName: 'Petrovic',
        Phone: '9875234542',
        Role: 'Manager',
        Email: 'hanna@gmail.com',
        rolestatus: 'primary',
        address1 :'',
        address2 :'',
        city:'',
        state:'',
        country:'',
    },
    {
        id: '#0025',
        firstName: 'Leanne',
        lastName: 'Graham',
        Phone: '9875236542',
        Role: 'Service Staff',
        Email: 'hanna@gmail.com',
        rolestatus: 'secondary'
    },
    {
        id: '#0014',
        firstName: 'Mrs.',
        lastName: ' Dennis',
        Phone: '9321654747',
        Role: 'Chef',
        Email: 'hanna@gmail.com',
        rolestatus: 'secondary'
    },
    {
        id: '#0027',
        firstName: 'Kurtis',
        lastName: 'Kurtis',
        Phone: '9872346542',
        Role: 'Service Staff',
        Email: 'hanna@gmail.com',
        rolestatus: 'secondary'
    },
    {
        id: '#0016',
        firstName: 'Nicholas',
        lastName: 'V',
        Phone: '8752346542',
        Role: 'Service Staff',
        Email: 'hanna@gmail.com',
        rolestatus: 'secondary'
    },
    {
        id: '#0020',
        firstName: 'Glenna',
        lastName: 'Glenna',
        Phone: '9875234542',
        Role: 'Service Staff',
        Email: 'hanna@gmail.com',
        rolestatus: 'secondary'
    },
    {
        id: '#0010',
        firstName: 'Clementina',
        lastName: 'Clementina',
        Phone: '9875236542',
        Role: 'Service Staff',
        Email: 'hanna@gmail.com',
        rolestatus: 'secondary'
    }
];


// ==============================|| MOCK SERVICES ||============================== //

// mock.onGet('/api/products/list').reply(200, { products });
mock.onGet('/api/contacts').reply(() => {
    return [200, staffmanagements];
});




export default staffmanagements;
