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

const paymentSetup: KeyedObject[] = [
    {   
        SNo: 1,
        PaymentMethod: 'Stripe',
        price: '$280',
        discount: '$160',
        email: 'admin@gmail.com',
        MarchantID: 'Rajesh',
        currency: 'USD',
        mode: 'Online',
        rolestatus: 'primary',
        vat : '2',
        status: 'Paid'
    },
    {
        SNo: 2,
        PaymentMethod: 'Cash',
        price: '$400',
        discount: '$200',
        email: 'admin@gmail.com',
        MarchantID: 'Rahul',
        currency: 'USD',
        mode: 'Offline',
        rolestatus: 'primary',
        vat : '5',
        status: 'Paid'
    },
    {
        SNo: 3,
        PaymentMethod: 'Stripe ',
        price: '$120',
        discount: '$80',
        email: 'admin@gmail.com',
        MarchantID: 'John',
        currency: 'USD',
        mode: 'Online',
        rolestatus: 'primary',
        vat : '5',
        status: 'Paid'   
    },
    {
        SNo: 4,
        PaymentMethod: 'Cash',
        price: '$350',
        discount: '$280',
        email: 'admin@gmail.com',
        MarchantID: 'Rajesh',
        currency: 'USD',
        mode: 'Offline',
        rolestatus: 'primary',
        vat : '3',
        status: 'Paid'
    },
    // {
    //     SNo: 5,
    //     PaymentMethod: 'Paypal',
    //     price: '$520',
    //     discount: '$280',
    //     email: 'admin@gmail.com',
    //     MarchantID: '002020000000001',
    //     currency: 'USD',
    //     mode: 'Live Mode',
    //     rolestatus: 'primary',
    //     vat : '2',
    //     status: 'Active'
    // },
    // {
    //     SNo: 6,
    //     PaymentMethod: 'Paystack Payments',
    //     price: '$120',
    //     discount: '',
    //     email: 'admin@gmail.com',
    //     MarchantID: '002020000000001',
    //     currency: 'USD',
    //     mode: 'Live Mode',
    //     rolestatus: 'primary',
    //     vat : '5',
    //     status: 'Active'
    // },
    // {
    //     SNo: 7,
    //     PaymentMethod: 'Paytm Payments',
    //     price: '$520',
    //     discount: '$280',
    //     email: 'admin@gmail.com',
    //     MarchantID: '002020000000001',
    //     currency: 'USD',
    //     mode: 'Live Mode',
    //     rolestatus: 'primary',
    //     vat : '2',
    //     status: 'Active'
    // },
    // {
    //     SNo: 8,
    //     PaymentMethod: 'RMA PAYMENT GATEWAY',
    //     price: '$420',
    //     discount: '$360',
    //     email: 'admin@gmail.com',
    //     MarchantID: '002020000000001',
    //     currency: 'USD',
    //     mode: 'Live Mode',
    //     rolestatus: 'primary',
    //     vat : '4',
    //     status: 'Active'
    // },
    // {
    //     SNo: 9,
    //     PaymentMethod: 'Square Payments',
    //     price: '$320',
    //     discount: '$260',
    //     email: 'admin@gmail.com',
    //     MarchantID: '002020000000001',
    //     currency: 'USD',
    //     mode: 'Live Mode',
    //     rolestatus: 'primary',
    //     vat : '3',
    //     status: 'Active'
    // },
    // {
    //     SNo: 10,
    //     PaymentMethod: 'SSL Commerz',
    //     price: '$300',
    //     discount: '$280',
    //     email: 'admin@gmail.com',
    //     MarchantID: '002020000000001',
    //     currency: 'USD',
    //     mode: 'Live Mode',
    //     rolestatus: 'primary',
    //     vat : '5',
    //     status: 'Active'
    // }
];


// ==============================|| MOCK SERVICES ||============================== //

// mock.onGet('/api/products/list').reply(200, { products });
mock.onGet('/api/contacts').reply(() => {
    return [200, paymentSetup];
});




export default paymentSetup;
