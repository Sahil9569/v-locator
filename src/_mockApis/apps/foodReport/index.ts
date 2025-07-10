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



const foodReport: KeyedObject[] = [
    {   
        id: 1,
        dishName: 'Lentil Bolognese',
        dailyPrice: '280',
        weeklyPrice: '160',
        dishCategory: 'Vegan food',
        monthlyPrice: '300',
        rolestatus: 'primary',
        vat : '2',
        
        notes: '',
        files: [],
    },
    {
        id: 2,
        dishName: 'Frankies',
        dailyPrice: '400',
        weeklyPrice: '200',
        dishCategory: 'Lunch Package',
        monthlyPrice: '300',
        rolestatus: 'primary',
        vat : '5',
        
        notes: '',
        files: [],
    },
    {
        id: 3,
        dishName: 'Coconut Rice',
        dailyPrice: '120',
        weeklyPrice: '80',
        dishCategory: 'Japanese',
        monthlyPrice: '300',
        rolestatus: 'primary',
        vat : '5',
        
        notes: '',
        files: [],
    },
    {
        id: 4,
        dishName: 'Vegetable Biryani',
        dailyPrice: '350',
        weeklyPrice: '280',
        dishCategory: 'Maxican',
        monthlyPrice: '300',
        rolestatus: 'primary',
        vat : '3',
        
        notes: '',
        files: [],
    },
    {
        id: 5,
        dishName: 'Crispy BBQ Tofu Sandwich',
        dailyPrice: '520',
        weeklyPrice: '280',
        dishCategory: 'Salad',
        monthlyPrice: '300',
        rolestatus: 'primary',
        vat : '2',
        
        notes: '',
        files: [],
    },
    {
        id: 6,
        dishName: 'Whole Roasted Cauliflower',
        dailyPrice: '120',
        weeklyPrice: '200',
        dishCategory: 'Bengali Food',
        monthlyPrice: '300',
        rolestatus: 'primary',
        vat : '5',
        
        notes: '',
        files: [],
    },
    {
        id: 7,
        dishName: 'CabbageStir Fry',
        dailyPrice: '520',
        weeklyPrice: '280',
        dishCategory: 'Salad',
        monthlyPrice: '300',
        rolestatus: 'primary',
        vat : '2',
        
        notes: '',
        files: [],
    },
    {
        id: 8,
        dishName: 'Vegan Protobello Tacos',
        dailyPrice: '420',
        weeklyPrice: '360',
        dishCategory: 'Maxican',
        monthlyPrice: '300',
        rolestatus: 'primary',
        vat : '4',
        
        notes: '',
        files: [],
    },
    {
        id: 9,
        dishName: 'Vegan Shepherds Pte!',
        dailyPrice: '320',
        weeklyPrice: '260',
        dishCategory: 'Arabian',
        monthlyPrice: '300',
        rolestatus: 'primary',
        vat : '3',
        
        notes: '',
        files: [],
    },
    {
        id: 10,
        dishName: 'Spicy Chinese Eggplant',
        dailyPrice: '300',
        weeklyPrice: '280',
        dishCategory: 'Beverages',
        monthlyPrice: '300',
        rolestatus: 'primary',
        vat : '5',
        
        notes: '',
        files: [],
    }
];


// ==============================|| MOCK SERVICES ||============================== //

// mock.onGet('/api/products/list').reply(200, { products });
mock.onGet('/api/contacts').reply(() => {
    return [200, foodReport];
});




export default foodReport;
