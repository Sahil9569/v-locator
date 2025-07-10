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




const kitchenOrder: KeyedObject[] = [
    {   
        id:'1',
        date: '27-08-2023',
        time: '04.00PM',
        tableNum: '#12',
        orderNum: '#00021',
        phone: '414-628-6511',
        name: 'Richard N. Sharp',
        email: 'RichardNSharp@teleworm.us',
        orderStatus: 'New Order',
        totalItems:2,
        grandPrice:120,
        foodFilterItem:[
            {
                'foodImage':user1,
                'foodName':'Vegan Food 1', 
                'quantity':1,
                'foodPrice':60,
                'addon': ['Hash browns', 'French toast sticks' , 'Classic fries' , 'Side garden salad'],
            },
            {
                'foodImage':user2,
                'foodName':'Vegan Food 2', 
                'quantity':1,
                'foodPrice':60,
                'addon': ['Hash browns', 'French toast sticks' , 'Classic fries' , 'Side garden salad'],
            }
        ],
    },
    {   
        id:'10',
        date: '27-08-2023',
        time: '04.00PM',
        tableNum: '#12',
        orderNum: '#00030',
        phone: '414-628-6511',
        name: 'Richard N. Sharp',
        email: 'RichardNSharp@teleworm.us',
        orderStatus: 'Pending',
        totalItems:2,
        grandPrice:120,
        foodFilterItem:[
            {
                'foodImage':user1,
                'foodName':'Vegan Food 1', 
                'quantity':1,
                'foodPrice':60,
                'addon': ['Hash browns', 'French toast sticks' , 'Classic fries' , 'Side garden salad'],
            },
            {
                'foodImage':user2,
                'foodName':'Vegan Food 2', 
                'quantity':1,
                'foodPrice':60,
                'addon': ['Hash browns', 'French toast sticks' , 'Classic fries' , 'Side garden salad'],
            }
        ],
    },
    {   
        id:'11',
        date: '27-08-2023',
        time: '04.00PM',
        tableNum: '#12',
        orderNum: '#00031',
        phone: '414-628-6511',
        name: 'Richard N. Sharp',
        email: 'RichardNSharp@teleworm.us',
        orderStatus: 'New Order',
        totalItems:2,
        grandPrice:120,
        foodFilterItem:[
            {
                'foodImage':user1,
                'foodName':'Vegan Food 1', 
                'quantity':1,
                'foodPrice':60,
                'addon': ['Hash browns', 'French toast sticks' , 'Classic fries' , 'Side garden salad'],
            },
            {
                'foodImage':user2,
                'foodName':'Vegan Food 2', 
                'quantity':1,
                'foodPrice':60,
                'addon': ['Hash browns', 'French toast sticks' , 'Classic fries' , 'Side garden salad'],
            }
        ],
    },
    {   
        id:'12',
        date: '27-08-2023',
        time: '04.00PM',
        tableNum: '#12',
        orderNum: '#00032',
        phone: '414-628-6511',
        name: 'Richard N. Sharp',
        email: 'RichardNSharp@teleworm.us',
        orderStatus: 'New Order',
        totalItems:2,
        grandPrice:120,
        foodFilterItem:[
            {
                'foodImage':user1,
                'foodName':'Vegan Food 1', 
                'quantity':1,
                'foodPrice':60,
                'addon': ['Hash browns', 'French toast sticks' , 'Classic fries' , 'Side garden salad'],
            },
            {
                'foodImage':user2,
                'foodName':'Vegan Food 2', 
                'quantity':1,
                'foodPrice':60,
                'addon': ['Hash browns', 'French toast sticks' , 'Classic fries' , 'Side garden salad'],
            }
        ],
    },
    {
        id:'2',
        date: '23-08-2023',
        time: '03.30PM',
        tableNum: '#13',
        orderNum: '#00022',
        phone: '620-203-3085',
        name: 'Robert K. Loudermilk',
        email: 'RobertKLoudermilk@dayrep.com',
        orderStatus: 'Confirmed',
        totalItems:2,
        grandPrice:120,
        foodFilterItem:[
            {
                'foodImage':user1,
                'foodName':'Vegan Food 2', 
                'quantity':1,
                'foodPrice':60,
            },
            {
                'foodImage':user2,
                'foodName':'Vegan Food 2', 
                'quantity':1,
                'foodPrice':60,
            }
        ],
        
    },
    {
        id:'3',
        date: '24-08-2023',
        time: '04.00PM',
        tableNum: '#14',
        orderNum: '#00023',
        phone: '612-904-7348',
        name: 'Kenneth L. Farr',
        email: 'KennethLFarr@teleworm.us',
        orderStatus: 'Cooking',
        totalItems:2,
        grandPrice:120,
        foodFilterItem:[
            {
                'foodImage':user1,
                'foodName':'Vegan Food 3', 
                'quantity':1,
                'foodPrice':60,
            },
            {
                'foodImage':user2,
                'foodName':'Vegan Food 2', 
                'quantity':1,
                'foodPrice':60,
            }
        ],
        
    },
    {
        id:'4',
        date: '27-08-2023',
        time: '05.00PM',
        tableNum: '#15',
        orderNum: '#00024',
        phone: '480-982-3278',
        name: 'Charles E. Harris',
        email: 'CharlesEHarris@jourrapide.com',
        orderStatus: 'Delivered',
        totalItems:2,
        grandPrice:120,
        foodFilterItem:[
            {
                'foodImage':user1,
                'foodName':'Vegan Food 4', 
                'quantity':1,
                'foodPrice':60,
            },
            {
                'foodImage':user2,
                'foodName':'Vegan Food 2', 
                'quantity':1,
                'foodPrice':60,
            }
        ],
        
    },
    {
        id:'5',
        date: '27-08-2023',
        time: '02.00PM',
        tableNum: '#16',
        orderNum: '#00025',
        phone: '919-967-6838',
        name: 'Dale K. Lannon',
        email: 'DaleKLannon@jourrapide.com',
        orderStatus: 'Cooking',
        totalItems:2,
        grandPrice:120,
        foodFilterItem:[
            {
                'foodImage':user1,
                'foodName':'Vegan Food 5', 
                'quantity':1,
                'foodPrice':60,
            },
            {
                'foodImage':user2,
                'foodName':'Vegan Food 2', 
                'quantity':1,
                'foodPrice':60,
            }
        ],
    },
    {
        id:'6',
        date: '25-08-2023',
        time: '04.00PM',
        tableNum: '#17',
        orderNum: '#00026',
        phone: '415-992-4700',
        name: 'Steven B. Godfrey',
        email: 'StevenBGodfrey@armyspy.com',
        orderStatus: 'Delivered',
        totalItems:2,
        grandPrice:120,
        foodFilterItem:[
            {
                'foodImage':user1,
                'foodName':'Vegan Food 6', 
                'quantity':1,
                'foodPrice':60,
            },
            {
                'foodImage':user2,
                'foodName':'Vegan Food 2', 
                'quantity':1,
                'foodPrice':60,
            }
        ],
        
    },
    {
        id:'7',
        date: '27-08-2023',
        time: '04.00PM',
        tableNum: '#18',
        orderNum: '#00027',
        phone: '413-388-9806',
        name: 'Louie L. Hardy',
        email: 'LouieLHardy@armyspy.com',
        orderStatus: 'Delivered',
        totalItems:2,
        grandPrice:120,
        foodFilterItem:[
            {
                'foodImage':user1,
                'foodName':'Vegan Food 7', 
                'quantity':1,
                'foodPrice':60,
            },
            {
                'foodImage':user2,
                'foodName':'Vegan Food 2', 
                'quantity':1,
                'foodPrice':60,
            }
        ],
    },
    {
        id:'8',
        date: '26-08-2023',
        time: '01.00PM',
        tableNum: '#19',
        orderNum: '#00028',
        phone: '832-393-7741',
        name: 'Joseph M. Camire',
        email: 'JosephMCamire@jourrapide.com',
        orderStatus: 'Delivered',
        totalItems:2,
        grandPrice:120,
        foodFilterItem:[
            {
                'foodImage':user1,
                'foodName':'Vegan Food 8', 
                'quantity':1,
                'foodPrice':60,
            },
            {
                'foodImage':user2,
                'foodName':'Vegan Food 2', 
                'quantity':1,
                'foodPrice':60,
            }
        ],
        
    },
    {
        id:'9',
        date: '22-08-2023',
        time: '02.50PM',
        tableNum: '#20',
        orderNum: '#00029',
        phone: '701-878-6142',
        name: 'Jason J. Lee',
        email: 'JasonJLee@teleworm.us',
        orderStatus: 'Cooking',
        totalItems:2,
        grandPrice:120,
        foodFilterItem:[
            {
                'foodImage':user1,
                'foodName':'Vegan Food 9', 
                'quantity':1,
                'foodPrice':60,
            },
            {
                'foodImage':user2,
                'foodName':'Vegan Food 2', 
                'quantity':1,
                'foodPrice':60,
            }
        ],
        
    },
    
];

// ==============================|| MOCK SERVICES ||============================== //

// mock.onGet('/api/products/list').reply(200, { products });
mock.onGet('/api/contacts').reply(() => {
    return [200, kitchenOrder];
});




export default kitchenOrder;
