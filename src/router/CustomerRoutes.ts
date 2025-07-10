const CustomerRoutes = {
    path: '/main',
    component: () => import('@/layouts/full/MenuFullLayout.vue'),
    meta: {
        requiresAuth: false
    },
    children: [
        {
            name: 'Menu',
            path: '/vlocator/menu/:token/:id',
            component: () => import('@/views/Customers_module/menu/menu.vue')
        },
        {
            name: 'Staff Menu',
            path: '/staffmenu/:token',
            component: () => import('@/views/staffMenu_module/menu/menu.vue')
        },
        {
            name: 'Staff Order',
            path: '/staffOrder/:token',
            component: () => import('@/views/staffMenu_module/menu/myOrder.vue')
        },
        {
            name: 'Payment Success',
            path: '/vlocator/paymentSuccess/:token/:id',
            component: () => import('@/views/Customers_module/paymentDetails/paymentSuccess.vue')
        },
        {
            name: 'Payment Cancel',
            path: '/paymentCancel',
            component: () => import('@/views/Customers_module/paymentDetails/paymentCancel.vue')
        },
        {
            name: 'My Order',
            path: '/vlocator/myOrder/:token/:id',
            component: () => import('@/views/Customers_module/menu/myOrder.vue')
        },

        {
            name: 'Customer Old Orders',
            path: '/customerOlditems',
            component: () => import('@/views/Customers_module/customerOld_items/customer_olditems.vue')
        },
        {
            name: 'Customer Dashboard',
            path: '/vlocator/customerDashboard/:token',
            component: () => import('@/views/Customers_module/CustomerDashboard/customer_dashboard.vue')
        },
        

        //Service Staff  Routing Start

        {
            name: 'tables',
            path: '/tables/:token',
            component: () => import('@/views/serviceStaff_module/tables/tables.vue')
        },
        {
            name: 'orders',
            path: '/orders/:token',
            component: () => import('@/views/serviceStaff_module/allOrder/order.vue')
        },
        {
            name: 'Staff Dashboard',
            path: '/staffDashboard/:token',
            component: () => import('@/views/serviceStaff_module/staffDashboard/staff_dashboard.vue')
        },
        {
            name: 'profileSetting',
            path: '/profile_setting/:token',
            component: () => import('@/views/profile_setting/staff_setting.vue')
        },
        
        {
            name: 'New Order',
            path: '/newOrder/:token',
            component: () => import('@/views/serviceStaff_module/newOrder/NewOrder.vue')
        },

        
       
    ]
};

export default CustomerRoutes;
