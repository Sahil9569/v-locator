const AuthRoutes = {
    path: '/auth',
    component: () => import('@/layouts/blank/BlankLayout.vue'),
    meta: {
        requiresAuth: false
    },
    children: [
        // {
        //     name: 'Landing Page',
        //     path: '/',
        //     component: () => import('@/views/pages/landingpage/index.vue')
        // },
        {
            name: 'vlocator',
            path: '/vlocator/:token/:tab_id',
            component: () => import('@/views/Customers_module/auth/welcomeForm.vue')
        },
        {
            name: 'Tips ',
            path: '/tipScreen',
            component: () => import('@/views/Customers_module/Tips_Screen/tipScreen.vue')
        },
        {
            name: 'Current Order ',
            path: '/currentOrder',
            component: () => import('@/views/Customers_module/customerOrder/currentOrder/Current_Order.vue')
        },
        {
            name: 'Side Login',
            path: '/auth/login',
            component: () => import('@/views/authentication/SideLogin.vue')
        },
        {
            name: 'admin otp',
            path: '/admin_otp_login',
            component: () => import('@/views/admin-app/admin_otp_login.vue')
        },
        {
            name: 'Admin Login',
            path: '/auth/adminlogin',
            component: () => import('@/views/authentication/SideLogin.vue')
        },
        {
            name: 'Boxed Login',
            path: '/auth/login2',
            component: () => import('@/views/authentication/BoxedLogin.vue')
        },
        {
            name: 'Side Register',
            path: '/',
            component: () => import('@/views/authentication/SideRegister.vue')
        },
        {
            name: 'Boxed Register',
            path: '/auth/register2',
            component: () => import('@/views/authentication/BoxedRegister.vue')
        },
        {
            name: 'Side Forgot Password',
            path: '/auth/forgot-password/:id',
            component: () => import('@/views/authentication/SideForgotPassword.vue')
        },
        {
            name: 'Boxed Forgot Password',
            path: '/auth/forgot-password2',
            component: () => import('@/views/authentication/BoxedForgotPassword.vue')
        },
        {
            name: 'Side Two Steps',
            path: '/auth/two-step',
            component: () => import('@/views/authentication/SideTwoStep.vue')
        },
        {
            name: 'Boxed Two Steps',
            path: '/auth/two-step2',
            component: () => import('@/views/authentication/BoxedTwoStep.vue')
        },
        {
            name: 'Error',
            path: '/auth/404',
            component: () => import('@/views/authentication/Error.vue')
        },
        {
            name: 'Error',
            path: '/auth/401',
            component: () => import('@/views/authentication/ErrorUnauthorized.vue')
        },
        {
            name: 'Maintenance',
            path: '/auth/maintenance',
            component: () => import('@/views/authentication/Maintenance.vue')
        },
        {
            name: 'Thanks Order',
            path: '/vlocator/thanksOrder',
            component: () => import('@/views/Customers_module/thanks-order.vue')
        },
        {
            name: 'Delete Account',
            path: '/delete_account',
            component: () => import('@/views/deleteAccount.vue')
        },
    ]
};

export default AuthRoutes;
