import mock from '../../mockAdapter';
import user1 from '@/assets/images/locator/Lentil-Bolognese.jpg';
import user2 from '@/assets/images/locator/Frankies.jpg';
import user3 from '@/assets/images/locator/Easy-Coconut-Rice.jpg';
import user4 from '@/assets/images/locator/veg-bryni.jpg';
import user5 from '@/assets/images/locator/food-image1.jfif';
import user6 from '@/assets/images/locator/Frankies.jpg';
import user7 from '@/assets/images/locator/food-image1.jfif';
import user8 from '@/assets/images/locator/veg-bryni.jpg';
import user9 from '@/assets/images/locator/Easy-Coconut-Rice.jpg';
import user10 from '@/assets/images/locator/Lentil-Bolognese.jpg';



// types
export type KeyedObject = {
    [key: string]: string | number | KeyedObject | any;
};



const couponDiscount: KeyedObject[] = [
    {   
        id:'1',
        couponName: 'Black Friday',
        code: 'BLACKFRIDAY',
        amount: '50%',
        startDate: '20-05-2023',
        lastDate: '28-07-2023',
        status: 'Active',
    },
    {
        id:'2',
        couponName: 'Cyber Monday',
        code: 'CYBERMONDAY',
        amount: '$30',
        startDate: '20-06-2023',
        lastDate: '28-08-2023',
        status: 'Active',
    },
    {
        id:'3',
        couponName: 'Welcome Offer',
        code: 'WELCOME10',
        amount: '20%',
        startDate: '20-02-2023',
        lastDate: '28-04-2023',
        status: 'Expired',
    },
    {
        id:'4',
        couponName: 'VIP List',
        code: 'LUCKY30',
        amount: '10%',
        startDate: '20-07-2023',
        lastDate: '28-08-2023',
        status: 'Draft',
    },
    {
        id:'5',
        couponName: 'Combo Promo',
        code: 'A847C8561F',
        amount: '$75',
        startDate: '20-04-2023',
        lastDate: '28-05-2023',
        status: 'Expired',
    },
    {   
        id:'6',
        couponName: 'Black Friday',
        code: 'BLACKFRIDAY',
        amount: '50%',
        startDate: '20-05-2023',
        lastDate: '28-07-2023',
        status: 'Active',
    },
    {
        id:'7',
        couponName: 'Cyber Monday',
        code: 'CYBERMONDAY',
        amount: '$30',
        startDate: '20-06-2023',
        lastDate: '28-08-2023',
        status: 'Draft',
    },
    {
        id:'8',
        couponName: 'Welcome Offer',
        code: 'WELCOME10',
        amount: '20%',
        startDate: '20-02-2023',
        lastDate: '28-04-2023',
        status: 'Expired',
    },
    {
        id:'9',
        couponName: 'VIP List',
        code: 'LUCKY30',
        amount: '10%',
        startDate: '20-07-2023',
        lastDate: '28-08-2023',
        status: 'Active',
    },
    {
        id:'10',
        couponName: 'Combo Promo',
        code: 'A847C8561F',
        amount: '$75',
        startDate: '20-04-2023',
        lastDate: '28-05-2023',
        status: 'Expired',
    },
    
];


// ==============================|| MOCK SERVICES ||============================== //

// mock.onGet('/api/products/list').reply(200, { products });
mock.onGet('/api/contacts').reply(() => {
    return [200, couponDiscount];
});




export default couponDiscount;
