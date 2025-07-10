const MainRoutes = {
    path: '/main',
    meta: {requiresAuth: false},
    redirect: '/main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            name: 'Modern',
            path: '/dashboards/:id',
            component: () => import('@/views/dashboard/modern/index.vue')
        },
        {
            name: 'All Report',
            path: '/report/:id',
            component: () => import('@/views/report/index.vue')
        },
        {
            name: 'Report',
            path: '/adminReport',
            component: () => import('@/views/admin-module/adminReport/index.vue')
        },
        {
            name: 'FoodManagement',
            path: '/food/:id',
            component: () => import('@/views/foodmanagement/foodManagement.vue')
        },
        {
            name: 'AddAddonCat',
            path: '/addCategory/:id',
            component: () => import('@/views/foodmanagement/addAddonCat.vue')
        },
        {
            name: 'FoodReport',
            path: '/foodReport/:id',
            component: () => import('@/views/report/foodReport/foodReport.vue')
        },
        {
            name: 'StaffReport',
            path: '/staffReport/:id',
            component: () => import('@/views/report/staffReport/staffReport.vue')
        },
        {
            name: 'Kitchen',
            path: '/kitchen/:id',
            component: () => import('@/views/kitchen/kitchen_list.vue')
        },
        {
            name: 'Kitchen Orders',
            path: '/KitchenOrders/',
            component: () => import('@/views/serviceStaff_module/allOrder/order.vue')
        },
        {
            name: 'StaffMangement',
            path: '/staff/:id',
            component: () => import('@/views/staffMangement/staffManagement.vue')
        },
        {
            name: 'Staff Availability',
            path: '/staffAvailability/:id',
            component: () => import('@/views/serviceStaff_module/staffAvailability/availability_tables.vue')
        },
        {
            name: 'Table Requests',
            path: '/tableRequests/:id',
            component: () => import('@/views/serviceStaff_module/staffAvailability/tableRequests.vue')

        },
        {
            name: 'SingleProfile',
            path: '/singleProfile/:token/:id',
            component: () => import('@/views/singleProfile/single_profile.vue')
        },
        {
            name: 'CustomerProfile',
            path: '/customerProfile/:token/:id',
            component: () => import('@/views/singleProfile/customer_profile.vue')
        },
        {
            name: 'kitchenSetting',
            path: '/kitchen_setting/:token',
            component: () => import('@/views/profile_setting/kitchen_setting.vue')
        },
        {
            name: 'Table',
            path: '/table/:id',
            component: () => import('@/views/table/tableList.vue')
        },
        {
            name: 'Table Availability',
            path: '/availability_table/:id',
            component: () => import('@/views/table/table_availability.vue')
        },
        {
            name: 'payment',
            path: '/payment-method-list/:id',
            component: () => import('@/views/paymentSetting/payment_method/paymentMethod.vue')
        },
        {
            name: 'PaymentSetup',
            path: '/payment-setup/:id',
            component: () => import('@/views/paymentSetting/payment_Setup/paymentSetup.vue')
        },
        {
            name: 'RestaurantSetting',
            path: '/restaurant-setting/:id',
            component: () => import('@/views/restaurantSetting/settingRestaurant.vue')
        },
        {
            name: 'CouponDiscount',
            path: '/coupon-discount/:id',
            component: () => import('@/views/coupon-discount/couponDiscount.vue')
        },
        {
            name: 'Feedback',
            path: '/feedback/:id',
            component: () => import('@/views/feedback/feedback.vue')
        },
        {
            name: 'OrderList',
            path: '/order-list/:id',
            component: () => import('@/views/manage-order/order_list/orderList.vue')
        },
        {
            name: 'Pending Order',
            path: '/pending-order/:id',
            component: () => import('@/views/manage-order/pending_order/pendingorderList.vue')
        },
        {
            name: 'Complete Order',
            path: '/complete-order/:id',
            component: () => import('@/views/manage-order/complete_list/completeorderList.vue')
        },
        {
            name: 'Cancel Order',
            path: '/cancel-order/:id',
            component: () => import('@/views/manage-order/cancel_order/cancelOrderList.vue')
        },
        {
            name: 'SingleOrderDetail',
            path: '/singleOrderDetail/:token/:id',
            component: () => import('@/views/manage-order/singleOrder/SingleOrderDetail.vue')
        },
        {
            name: 'Notification',
            path: '/notification/:token',
            component: () => import('@/views/all_Notifications/notification_details.vue')
        },

        {
            name: 'Kitchen Single Detail',
            path: '/kitchenSingleDetail/:token/:id',
            component: () => import('@/views/restaurantKitchenDetail/resKitchenDetail.vue')

        },
        {
            name: 'Packages Resturant',
            path: '/packages/:id',
            component: () => import('@/views/packages/packages.vue')

        },
        {
            name: 'Restaurant Customer List',
            path: '/restaurantCustomerList/:token',
            component: () => import('@/views/restaurantCustomerList/restaurantCustomerList.vue')

        },


        // Admin Routing
        {
            name: 'adminDashboard',
            path: '/adminDashboard',
            component: () => import('@/views/admin-module/dashboard/modern/index.vue')
        },
        {
            name: 'adminManagerList',
            path: '/managerList',
            component: () => import('@/views/admin-module/managerList/managerList.vue')
        },
        {
            name: 'packages',
            path: '/packages',
            component: () => import('@/views/admin-module/packages/packages.vue')
        },
        {
            name: 'SingleManager',
            path: '/singleManager/:id',
            component: () => import('@/views/admin-module/singleManager/single_manager.vue')
        },

        {
            name: 'Stripe Connected',
            path: '/StripeConnected',
            component: () => import('@/views/restaurantSetting/StripeConnected.vue')
        },

        //Admin App Menu Routing Start
        

        {
            name: 'Restaurant List',
            path: '/restaurant_list_app',
            meta: {requiresAuth: true},
            component: () => import('@/views/admin-app/restaurant_listing.vue')
        },
        {
            name: 'Restaurant Inactive',
            path: '/restaurant_inactive',
            meta: {requiresAuth: true},
            component: () => import('@/views/admin-app/restaurant_inactive.vue')
        },
        {
            name: 'Pending Data Details',
            path: '/rest_detail',
            meta: {requiresAuth: true},
            component: () => import('@/views/admin-app/rest_details.vue')
        },
        {
            name: 'Restaurant Detail',
            path: '/restaurant_detail/:id',
            meta: {requiresAuth: true},
            component: () => import('@/views/admin-app/single_restaurant.vue')
        },
        {
            name: 'Recipe',
            path: '/recipe',
            meta: {requiresAuth: true},
            component: () => import('@/views/admin-app/recipe.vue')
        },
        {
            name: 'Events',
            path: '/events',
            meta: {requiresAuth: true},
            component: () => import('@/views/admin-app/events.vue')
        },
        {
            name: 'Archive Events',
            path: '/archive_events',
            meta: {requiresAuth: true},
            component: () => import('@/views/admin-app/archive_events.vue')
        },
        {
            name: 'Events Details',
            path: '/events_detail/:id',
            meta: {requiresAuth: true},
            component: () => import('@/views/admin-app/events_detail.vue')
        },

        {
            name: 'Recipe Detail',
            path: '/recipe_detail/:id',
            meta: {requiresAuth: true},
            component: () => import('@/views/admin-app/single_recipe.vue')
        },
         {
            name: 'Recipe Category',
            path: '/recipe_category',
            meta: {requiresAuth: true},
            component: () => import('@/views/admin-app/recipe_category.vue')
        },
        {
            name: 'Advertisement',
            path: '/advertisement',
            meta: {requiresAuth: true},
            component: () => import('@/views/admin-app/advertisement.vue')
        },
        // {
        //     name: 'News and Feed',
        //     path: '/news',
        //     component: () => import('@/views/admin-app/news.vue')
        // },
        {
            name: 'Promotions',
            path: '/promotional_feature',
            meta: {requiresAuth: true},
            component: () => import('@/views/admin-app/promotional_feature.vue')
        },
        {
            name: 'Community',
            path: '/community',
            meta: {requiresAuth: true},
            component: () => import('@/views/admin-app/community.vue')
        },
        {
            name: 'Restaurant Category',
            path: '/restaurant_category',
            meta: {requiresAuth: true},
            component: () => import('@/views/admin-app/restaurant_category.vue')
        },
        {
            name: 'Post Category',
            path: '/category',
            meta: {requiresAuth: true},
            component: () => import('@/views/admin-app/post_category.vue')
        },
        {
            name: 'Post Topics',
            path: '/topics',
            meta: {requiresAuth: true},
            component: () => import('@/views/admin-app/post_topics.vue')
        },
        {
            name: 'Single Community',
            path: '/single-community/:id',
            meta: {requiresAuth: true},
            component: () => import('@/views/admin-app/single_community.vue')
        },

        // Kitchen Routing Module
        {
            name: 'KitchenDashboard',
            path: '/kitchenDashboard/:id',
            component: () => import('@/views/kitchen-module/KitchenDashboard/kitchenDashboard.vue')
        },
        // {
        //     name: 'KitchenOrderOld',
        //     path: '/kitchenOrderOld',
        //     component: () => import('@/views/kitchen-module/KitchenOrder-old/kitchenOrder.vue')
        // },
        {
            name: 'KitchenDetail',
            path: '/kitchenDetail/:id',
            component: () => import('@/views/kitchen-module/KitchenDashboard/kitchenDetail.vue')

        },
        {
            name: 'kitchenOrder',
            path: '/kitchenOrder/:id',
            component: () => import('@/views/kitchen-module/kitchenOrderNew/kitchenOrderNew.vue')
        },
        {
            name: 'kitchenReport',
            path: '/kitchenReport/:id',
            component: () => import('@/views/kitchen-module/kitchenReport/kitchenReport.vue')
        },
        {
            name: 'Stripe Connected',
            path: '/StripeConnected',
            component: () => import('@/views/restaurantSetting/StripeConnected.vue')
        },
    ]
};

export default MainRoutes;
export const BASE_URL = 'https://example.com/api';
