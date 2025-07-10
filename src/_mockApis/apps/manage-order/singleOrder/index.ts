import mock from '../../../mockAdapter';
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

const singleOrder: KeyedObject[] = [
    // {
    //     foodName: 'Vegan Food 1',
    //     foodPrice: '90',
    //     vat: '5',
    //     kitchenName: 'Kitchen1',
    //     quantity: '1',
    //     discount:'10',
    //     subTotal: '180',
    //     TotalPrice: '174',
    //     foodImage: user1,
    //     category: 'Vegan Category 1',
    //     statusLabel: ['New Order','Confirmed','Cooking','Delivered',]
    // },
    // {
    //     foodName: 'Vegan Food 2',
    //     foodPrice: '90',
    //     vat: '5',
    //     kitchenName: 'Kitchen2',
    //     quantity: '4',
    //     discount:'10',
    //     subTotal: '180',
    //     TotalPrice: '174',
    //     foodImage: user1,
    //     category: 'Vegan Category 2',
    //     statusLabel: ['New Order','Confirmed','Cooking','Delivered',]
    // },
    // {
    //     foodName: 'Vegan Food 3',
    //     foodPrice: '90',
    //     vat: '5',
    //     quantity: '2',
    //     kitchenName: 'Kitchen3',
    //     discount:'10',
    //     subTotal: '180',
    //     TotalPrice: '174',
    //     foodImage: user1,
    //     category: 'Vegan Category 2',
    //     statusLabel: ['New Order','Confirmed','Cooking','Delivered',]
    // },
    // {
    //     foodName: 'Vegan Food 2',
    //     foodPrice: '90',
    //     vat: '5',
    //     quantity: '1',
    //     discount:'10',
    //     subTotal: '180',
    //     TotalPrice: '174',
    //     foodImage: user1,
    //     category: 'Vegan Category 2',
    //     status: 'Delivered'
    // }
];
// ==============================|| MOCK SERVICES ||============================== //

// mock.onGet('/api/products/list').reply(200, { products });
mock.onGet('/api/contacts').reply(() => {
    return [200, singleOrder];
});




export default singleOrder;
