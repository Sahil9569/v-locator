import mock from '../../mockAdapter';

// third-party
import { add, sub } from 'date-fns';
import { Chance } from 'chance';
import product1 from '@/assets/images/locator/food-menus/Chile-Verde-Bowl.webp';
import product2 from '@/assets/images/locator/food-menus/Teriyaki-Bowl.webp';
import product3 from '@/assets/images/locator/food-menus/Thai-Peanut-Bowl.webp';
import product4 from '@/assets/images/locator/food-menus/Chimichurri-Bowl.webp';
import product5 from '@/assets/images/locator/food-menus/Greek-Wrap.webp';
import product6 from '@/assets/images/locator/food-menus/Thai-Wrap.webp';
import product7 from '@/assets/images/locator/food-menus/Greek-Salad.webp';
import product8 from '@/assets/images/locator/food-menus/Thai-Salad.webp';
import product9 from '@/assets/images/locator/food-menus/PK-Greek-Salad.webp';
import product10 from '@/assets/images/locator/food-menus/Overnight-Oats.webp';

//Types
import type { Products } from '@/types/apps/EcommerceType';

const chance = new Chance();
// products list
const products: Products[] = [
    {
        id: 1,
        image: product1,
        name: 'Chile Verde Bowl',
        description: chance.paragraph({ sentences: 1 }),
        rating: chance.floating({ min: 0.1, max: 5.0 }),
        discount: 25,
        salePrice: 200,
        offerPrice: 175,
        gender: 'kids',
        categories: ['bowls'],
        colors: ['error', 'warning', 'primary', 'secondary'],
        popularity: chance.natural(),
        date: chance.natural(),
        created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
        isStock: true,
        qty: 1,
        rank:87,
        price:'200'
    },
    {
        id: 2,
        image: product2,
        name: 'Teriyaki Bowl',
        description: chance.paragraph({ sentences: 2 }),
        rating: chance.floating({ min: 0.1, max: 5.0 }),
        discount: 10,
        salePrice: 89,
        offerPrice: 81,
        gender: 'kids',
        categories: ['bowls', ],
        colors: ['lightprimary', 'success', 'lighterror', 'warning'],
        popularity: chance.natural(),
        date: chance.natural(),
        created: sub(new Date(), { days: 10, hours: 8, minutes: 69 }),
        isStock: false,
        qty: 1,
        rank:87,
        price:'100'
    },
    {
        id: 3,
        image: product3,
        name: 'Thai Peanut Bowl',
        description: chance.paragraph({ sentences: 2 }),
        rating: chance.floating({ min: 0.1, max: 5.0 }),
        discount: 40,
        salePrice: 85.0,
        offerPrice: 49.9,
        gender: 'male',
        categories: ['bowls'],
        colors: ['lightprimary', 'primary'],
        popularity: chance.natural(),
        date: chance.natural(),
        created: sub(new Date(), { days: 4, hours: 9, minutes: 50 }),
        isStock: true,
        qty: 1,
        rank:50,
        price:'100'
    },
    {
        id: 4,
        image: product4,
        name: 'Chimichurri Bowl',
        description: chance.paragraph({ sentences: 2 }),
        rating: chance.floating({ min: 0.1, max: 5.0 }),
        discount: 17,
        salePrice: 36.0,
        offerPrice: 29,
        gender: 'kids',
        categories: ['bowls', 'meltsMore'],
        colors: ['error', 'warning', 'warning'],
        popularity: chance.natural(),
        date: chance.natural(),
        created: sub(new Date(), { days: 7, hours: 6, minutes: 45 }),
        isStock: false,
        qty: 1,
        rank:90,
        price:'50'
    },
    {
        id: 5,
        image: product5,
        name: 'Greek Wrap',
        description: chance.paragraph({ sentences: 2 }),
        rating: chance.floating({ min: 0.1, max: 5.0 }),
        discount: 20,
        salePrice: 15,
        offerPrice: 12,
        gender: 'male',
        categories: ['wrapsSalads'],
        colors: ['warning', 'lightprimary'],
        popularity: chance.natural(),
        date: chance.natural(),
        created: sub(new Date(), { days: 2, hours: 9, minutes: 45 }),
        isStock: true,
        qty: 1,
        rank:88,
        price:'50'
    },
    {
        id: 6,
        image: product6,
        name: 'Thai Wrap',
        description: chance.paragraph({ sentences: 2 }),
        rating: chance.floating({ min: 0.1, max: 5.0 }),
        discount: 13,
        salePrice: 99,
        offerPrice: 86,
        gender: 'female',
        categories: ['wrapsSalads'],
        colors: ['primary', 'warning'],
        popularity: chance.natural(),
        date: chance.natural(),
        created: add(new Date(), { days: 6, hours: 10, minutes: 0 }),
        isStock: true,
        qty: 1,
        rank:95,
        price:'100'
    },
    {
        id: 7,
        image: product7,
        name: 'Greek Salad',
        description: chance.paragraph({ sentences: 2 }),
        rating: chance.floating({ min: 0.1, max: 5.0 }),
        discount: 15,
        salePrice: 16,
        offerPrice: 14.59,
        gender: 'female',
        categories: ['wrapsSalads'],
        colors: ['error', 'secondary', 'primary', 'warning'],
        popularity: chance.natural(),
        date: chance.natural(),
        created: add(new Date(), { days: 14, hours: 1, minutes: 55 }),
        isStock: false,
        qty: 1,
        rank:60,
        price:'50'
    },
    {
        id: 8,
        image: product8,
        name: 'Thai Salad',
        description: chance.paragraph({ sentences: 2 }),
        rating: chance.floating({ min: 0.1, max: 5.0 }),
        discount: 20,
        salePrice: 130,
        offerPrice: 105,
        gender: 'female',
        categories: ['wrapsSalads', 'meltsMore'],
        colors: ['lightsuccess', 'primary', 'success'],
        popularity: chance.natural(),
        date: chance.natural(),
        created: sub(new Date(), { days: 0, hours: 11, minutes: 10 }),
        isStock: true,
        qty: 1,
        rank:80,
        price:'151'
    },
    {
        id: 9,
        image: product9,
        name: 'PK Greek Salad',
        description: chance.paragraph({ sentences: 2 }),
        rating: chance.floating({ min: 0.1, max: 5.0 }),
        discount: 20,
        salePrice: 130,
        offerPrice: 105,
        gender: 'female',
        categories: ['paleoKeto'],
        colors: ['lightsuccess', 'primary', 'success'],
        popularity: chance.natural(),
        date: chance.natural(),
        created: sub(new Date(), { days: 0, hours: 11, minutes: 10 }),
        isStock: true,
        qty: 1,
        rank:80,
        price:'151'
    },
    {
        id: 10,
        image: product10,
        name: 'Overnight Oats',
        description: chance.paragraph({ sentences: 2 }),
        rating: chance.floating({ min: 0.1, max: 5.0 }),
        discount: 20,
        salePrice: 130,
        offerPrice: 105,
        gender: 'female',
        categories: ['breakfast'],
        colors: ['lightsuccess', 'primary', 'success'],
        popularity: chance.natural(),
        date: chance.natural(),
        created: sub(new Date(), { days: 0, hours: 11, minutes: 10 }),
        isStock: true,
        qty: 1,
        rank:80,
        price:'151'
    }
];

// ==============================|| MOCK SERVICES ||============================== //

// mock.onGet('/api/products/list').reply(200, { products });
mock.onGet('/api/products/list').reply(() => {
    return [200, products];
});

export default products;