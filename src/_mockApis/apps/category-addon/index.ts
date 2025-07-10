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



const foodManagement: KeyedObject[] = [
    {   
        dishImage: user1,
        dishName: 'Lentil Bolognese',
        price: '280',
        discount: '160',
        dishCategory: 'Vegan food',
        files: [],
        addon:['Hash browns','French toast sticks','Classic fries','Side garden salad'],
    },
    {
        dishImage: user2,
        dishName: 'Frankies',
        price: '400',
        discount: '200',
        dishCategory: 'Lunch Package',
        files: [],
        addon:['Hash browns','French toast sticks','Classic fries','Side garden salad'],
    },
    {
        dishImage: user3,
        dishName: 'Coconut Rice',
        price: '120',
        discount: '80',
        dishCategory: 'Japanese',
        files: [],
        addon:['Hash browns','French toast sticks','Classic fries','Side garden salad'],
    },
    {
        dishImage: user4,
        dishName: 'Vegetable Biryani',
        price: '350',
        discount: '280',
        dishCategory: 'Maxican',
        files: [],
        addon:['Hash browns','French toast sticks','Classic fries','Side garden salad'],
    },
    {
        dishImage: user5,
        dishName: 'Crispy BBQ Tofu Sandwich',
        price: '520',
        discount: '280',
        dishCategory: 'Salad',
        files: [],
        addon:['Hash browns','French toast sticks','Classic fries','Side garden salad'],
    },
    {
        dishImage: user6,
        dishName: 'Whole Roasted Cauliflower',
        price: '120',
        discount: '',
        dishCategory: 'Bengali Food',
        files: [],
        addon:['Hash browns','French toast sticks','Classic fries','Side garden salad'],
    },
    {
        dishImage: user7,
        dishName: 'CabbageStir Fry',
        price: '520',
        discount: '280',
        dishCategory: 'Salad',
        files: [],
        addon:['Hash browns','French toast sticks','Classic fries','Side garden salad'],
    },
    {
        dishImage: user8,
        dishName: 'Vegan Protobello Tacos',
        price: '420',
        discount: '360',
        dishCategory: 'Maxican',
        files: [],
        addon:['Hash browns','French toast sticks','Classic fries','Side garden salad'],
    },
    {
        dishImage: user9,
        dishName: 'Vegan Shepherds Pte!',
        price: '320',
        discount: '260',
        dishCategory: 'Arabian',
        files: [],
        addon:['Hash browns','French toast sticks','Classic fries','Side garden salad'],
    },
    {
        dishImage: user10,
        dishName: 'Spicy Chinese Eggplant',
        price: '300',
        discount: '280',
        dishCategory: 'Beverages',
        files: [],
        addon:['Hash browns','French toast sticks','Classic fries','Side garden salad'],
    }
];


// ==============================|| MOCK SERVICES ||============================== //

// mock.onGet('/api/products/list').reply(200, { products });
mock.onGet('/api/contacts').reply(() => {
    return [200, foodManagement];
});




export default foodManagement;
