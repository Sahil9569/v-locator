import mock from '../../mockAdapter';
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

const services_staff: KeyedObject[] = [
    {   
        SNo: 1,
        table: 'Table-V1',
        orderNo: '#101',
        customer: 'Jaizz'
    },
    {
        SNo: 2,
        table: 'Table-V2',
        orderNo: '#102',
        customer: 'John'
    },
    {
        SNo: 3,
        table: 'Table-V3',
        orderNo: '#103',
        customer: 'Jaizz'
    },
    {
        SNo: 4,
        table: 'Table-V4',
        orderNo: '#104',
        customer: 'Saraj'
    },
    {
        SNo: 5,
        table: 'Table-V5',
        orderNo: '#105',
        customer: 'Jaizz'
    },
    {
        SNo: 6,
        table: 'Table-V6',
        orderNo: '#106',
        customer: 'Fayaz'
    },
    {
        SNo: 7,
        table: 'Table-V7',
        orderNo: '#107',
        customer: 'Jaizz'
    },
    {
        SNo: 8,
        table: 'Table-V8',
        orderNo: '#108',
        customer: 'Jaizz'
    },
    {
        SNo: 9,
        table: 'Table-V9',
        orderNo: '#109',
        customer: 'Fayaz'
    },
    {
        SNo: 10,
        table: 'Table-V10',
        orderNo: '#110',
        customer: 'Jaizz'
    }
];


// ==============================|| MOCK SERVICES ||============================== //

// mock.onGet('/api/products/list').reply(200, { products });
mock.onGet('/api/contacts').reply(() => {
    return [200, services_staff];
});




export default services_staff;
