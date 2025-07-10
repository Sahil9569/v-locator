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


const singleManagerList: KeyedObject[] = [
    {   
        id: 1,
        packages: 'V Locator +',
        amount: '500',
        totalTip: '800',
        Date: '20-07-2021',
        // status: 'On Duty',
    },
    {   
        id: 2,
        packages: 'V Locator +',
        amount: '460',
        totalTip: '760',
        Date: '26-02-2021',
        // status: 'On Leave',
    },
    {   
        id: 3,
        packages: 'Premium A',
        amount: '430',
        totalTip: '710',
        Date: '16-06-2022',
        // status: 'On Duty',
    },
    {   
        id: 4,
        packages: 'Premium B',
        amount: '395',
        totalTip: '685',
        Date: '20-07-2018',
        // status: 'Half Day leave',
    },
    {   
        id: 5,
        packages: 'Premium A',
        amount: '368',
        totalTip: '611',
        Date: '29-07-2022',
        // status: 'On Duty',
    },
    {   
        id: 6,
        packages: 'Premium C',
        amount: '346',
        totalTip: '588',
        Date: '20-04-2016',
        // status: 'On Leave',
    },
    {   
        id: 7,
        packages: 'V Locator +',
        amount: '322',
        totalTip: '511',
        Date: '26-10-2020',
        // status: 'On Duty',
    },
    {   
        id: 8,
        packages: 'Premium C',
        amount: '214',
        totalTip: '421',
        Date: '10-08-2021',
        // status: 'On Duty',
    },
    {   
        id: 9,
        packages: 'Premium A',
        amount: '144',
        totalTip: '325',
        Date: '05-06-2021',
        // status: 'On Duty',
    },
    {   
        id: 10,
        packages: 'V Locator +',
        amount: '94',
        totalTip: '145',
        Date: '20-09-2019',
        // status: 'On Leave',
    },
];


// ==============================|| MOCK SERVICES ||============================== //

// mock.onGet('/api/products/list').reply(200, { products });
mock.onGet('/api/contacts').reply(() => {
    return [200, singleManagerList];
});




export default singleManagerList;
