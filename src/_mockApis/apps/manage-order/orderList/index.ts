import mock from '../../../mockAdapter';
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

const orderList: KeyedObject[] = [
    // {   
    //     SNo: 1,
    //     invoiceNO: '20',
    //     customer: 'Jaizz',
    //     waiter: 'zizzey',
    //     table: 'Table-1',
    //     orderDate: '07-25-2023',
    //     rolestatus: 'primary',
    //     vat : '2',
    //     amount : '1000',
    //     status: 'Served'
    // },
    // {
    //     SNo: 2,
    //     invoiceNO: '22',
    //     customer: 'Fayaz Saraj',
    //     waiter: 'Saraj',
    //     table: 'Table-2',
    //     orderDate: '07-25-2023',
    //     rolestatus: 'primary',
    //     vat : '5',
    //     amount : '1000',
    //     status: 'pending'
    // },
    // {
    //     SNo: 3,
    //     invoiceNO: '23',
    //     customer: 'Fayaz Saraj',
    //     waiter: 'Saraj',
    //     table: 'Table-3',
    //     orderDate: '07-25-2023',
    //     rolestatus: 'primary',
    //     vat : '5',
    //     amount : '1000',
    //     status: 'Served'
    // },
    // {
    //     SNo: 4,
    //     invoiceNO: '24',
    //     customer: 'Fayaz Saraj',
    //     waiter: 'Saraj',
    //     table: 'Table-4',
    //     orderDate: '07-25-2023',
    //     rolestatus: 'primary',
    //     vat : '3',
    //     amount : '1000',
    //     status: 'Served'
    // },
    // {
    //     SNo: 5,
    //     invoiceNO: '25',
    //     customer: 'Walkin',
    //     waiter: 'Saraj',
    //     table: 'Table-5',
    //     orderDate: '07-25-2023',
    //     rolestatus: 'primary',
    //     vat : '2',
    // amount : '1000',
    //     status: 'pending'
    // },
    // {
    //     SNo: 6,
    //     invoiceNO: '26',
    //     customer: 'Walkin',
    //     waiter: 'Saraj',
    //     table: 'Table-6',
    //     orderDate: '07-25-2023',
    //     rolestatus: 'primary',
    //     vat : '5',
    // amount : '1000',
    //     status: 'Served'
    // },
    // {
    //     SNo: 7,
    //     invoiceNO: '27',
    //     customer: 'Walkin',
    //     waiter: 'Saraj',
    //     table: 'Table-7',
    //     orderDate: '07-25-2023',
    //     rolestatus: 'primary',
    //     vat : '2',
    // amount : '1000',
    //     status: 'Served'
    // },
    // {
    //     SNo: 8,
    //     invoiceNO: '9',
    //     customer: 'Kamal Hassan',
    //     waiter: 'Pravin ',
    //     table: 'Table-8',
    //     orderDate: '07-25-2023',
    //     rolestatus: 'primary',
    //     vat : '4',
    // amount : '1000',
    //     status: 'Served'
    // },
    // {
    //     SNo: 9,
    //     invoiceNO: '8',
    //     customer: 'Kamal Hassan',
    //     waiter: 'Pravin ',
    //     table: 'Table-9',
    //     orderDate: '07-25-2023',
    //     rolestatus: 'primary',
    //     vat : '3',
    // amount : '1000',
    //     status: 'Served'
    // },
    // {
    //     SNo: 10,
    //     invoiceNO: '7',
    //     customer: 'Kamal Hassan',
    //     waiter: 'Pravin ',
    //     table: 'Table-10',
    //     orderDate: '07-25-2023',
    //     rolestatus: 'primary',
    //     vat : '5',
    // amount : '1000',
    //     status: 'Served'
    // }
];


// ==============================|| MOCK SERVICES ||============================== //

// mock.onGet('/api/products/list').reply(200, { products });
mock.onGet('/api/contacts').reply(() => {
    return [200, orderList];
});




export default orderList;
