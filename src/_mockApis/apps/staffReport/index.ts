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



const staffReport: KeyedObject[] = [
    {   
        id: 1,
        staffName: 'Fred C. Cunningham',
        totalServed: '500',
        totalTip: '800',
        joiningDate: '20-07-2021',
        status: 'On Duty',
    },
    {   
        id: 2,
        staffName: 'Daniel Kristeen',
        totalServed: '460',
        totalTip: '760',
        joiningDate: '26-02-2021',
        status: 'On Leave',
    },
    {   
        id: 3,
        staffName: 'Julian Josephs',
        totalServed: '430',
        totalTip: '710',
        joiningDate: '16-06-2022',
        status: 'On Duty',
    },
    {   
        id: 4,
        staffName: 'Jan Petrovic',
        totalServed: '395',
        totalTip: '685',
        joiningDate: '20-07-2018',
        status: 'Half Day leave',
    },
    {   
        id: 5,
        staffName: 'Leanne Graham',
        totalServed: '368',
        totalTip: '611',
        joiningDate: '29-07-2022',
        status: 'On Duty',
    },
    {   
        id: 6,
        staffName: 'Mrs. Dennis',
        totalServed: '346',
        totalTip: '588',
        joiningDate: '20-04-2016',
        status: 'On Leave',
    },
    {   
        id: 7,
        staffName: 'Fred C. Cunningham',
        totalServed: '322',
        totalTip: '511',
        joiningDate: '26-10-2020',
        status: 'On Duty',
    },
    {   
        id: 8,
        staffName: 'Nicholas V',
        totalServed: '214',
        totalTip: '421',
        joiningDate: '10-08-2021',
        status: 'On Duty',
    },
    {   
        id: 9,
        staffName: 'Fred C. Cunningham',
        totalServed: '144',
        totalTip: '325',
        joiningDate: '05-06-2021',
        status: 'On Duty',
    },
    {   
        id: 10,
        staffName: 'Fred C. Cunningham',
        totalServed: '94',
        totalTip: '145',
        joiningDate: '20-09-2019',
        status: 'On Leave',
    },
];


// ==============================|| MOCK SERVICES ||============================== //

// mock.onGet('/api/products/list').reply(200, { products });
mock.onGet('/api/contacts').reply(() => {
    return [200, staffReport];
});




export default staffReport;
