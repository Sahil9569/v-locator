import mock from '../../mockAdapter';



// types
export type KeyedObject = {
    [key: string]: string | number | KeyedObject | any;
};

const Customer_Dash: KeyedObject[] = [
    {   
        SNo: 1,
        table: 'Table-V1',
        total: '$101',
        waiter: 'Jaizz',
        status: 'Deliverd'
    }
];
mock.onGet('/api/contacts').reply(() => {
    return [200, Customer_Dash];
});




export default Customer_Dash;
