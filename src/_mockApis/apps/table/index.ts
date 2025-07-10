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

const tableList: KeyedObject[] = [
    {   
        serial: 1,
        tableName: 'Table-V1',
        Capacity: '1',
        side: 'VIP Block',
        dishCategory: 'Indian food',
        components: 'Regular size',
        rolestatus: 'warning',
        vat : '1'
    },
    {
        serial: 2,
        tableName: 'Table-V2',
        Capacity: '2',
        side: 'Family Corner',
        dishCategory: 'Lunch Package',
        components: 'Regular size',
        rolestatus: 'primary',
        vat : '5'
    },
    {
        serial: 3,
        tableName: 'Table-V3',
        Capacity: '3',
        side: 'Pool Side',
        dishCategory: 'Japanese',
        components: 'Regular size',
        rolestatus: 'secondary',
        vat : '5'
    },
    {
        serial: 4,
        tableName: 'Table-V4',
        Capacity: '4',
        side: 'Family Corder',
        dishCategory: 'Maxican',
        components: 'Regular size',
        rolestatus: 'primary',
        vat : '3'
    },
    {
        serial: 5,
        tableName: 'Table-V5',
        Capacity: '5',
        side: 'VIP Block',
        dishCategory: 'Salad',
        components: 'Regular size',
        rolestatus: 'warning',
        vat : '2'
    },
    {
        serial: 6,
        tableName: 'Table-V6',
        Capacity: '6',
        side: 'Pool Side',
        dishCategory: 'Bengali Food',
        components: 'Regular size',
        rolestatus: 'secondary',
        vat : '5'
    },
    {
        serial: 7,
        tableName: 'Table-V7',
        Capacity: '7',
        side: 'VIP Block',
        dishCategory: 'Salad',
        components: 'Regular size',
        rolestatus: 'warning',
        vat : '2'
    },
    {
        serial: 8,
        tableName: 'Table-V8',
        Capacity: '8',
        side: 'Family Corner',
        dishCategory: 'Maxican',
        components: 'Regular size',
        rolestatus: 'primary',
        vat : '4'
    },
    {
        serial: 9,
        tableName: 'Table-V9',
        Capacity: '9',
        side: 'VIP Block',
        dishCategory: 'Arabian',
        components: 'Regular size',
        rolestatus: 'warning',
        vat : '3'
    },
    {
        serial: 10,
        tableName: 'Table-V10',
        Capacity: '1',
        side: 'Pool side',
        dishCategory: 'Beverages',
        components: 'Regular size',
        rolestatus: 'secondary',
        vat : '5'
    }
];


// ==============================|| MOCK SERVICES ||============================== //

// mock.onGet('/api/products/list').reply(200, { products });
mock.onGet('/api/contacts').reply(() => {
    return [200, tableList];
});




export default tableList;
