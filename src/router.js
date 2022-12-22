import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from './pages/Dashboard.vue'

import Orders from './pages/ecommerce/Orders.vue'
import Customers from './pages/ecommerce/Customers.vue'
import RooftopOrders from './pages/ecommerce/RooftopOrders.vue'
import axios from "axios";

import UsersTabs from './pages/community/UsersTabs.vue'


import Account from './pages/settings/Account.vue'
import Notifications from './pages/settings/Notifications.vue'

import EmptyState from './pages/utility/EmptyState.vue'
import PageNotFound from './pages/utility/PageNotFound.vue'
import Cookies from 'js-cookie'
import Signin from './pages/Signin.vue'
import ResetPassword from './pages/ResetPassword.vue'

import {useAuthStore} from './stores/authStore'
const routerHistory = createWebHistory()
const BASE_API='https://hotelapp.fastery.dev/v1/'

const router = createRouter({
  history: routerHistory,
  routes: [

    //Home Page + Analytics
    {
      path: '/',
      component: Dashboard
    },
    

    //Friendstel Related
    {
      name: 'Orders',
      path: '/ecommerce/orders',
      component: Orders
    },
    {
      path: '/ecommerce/invoices',
      component: RooftopOrders
    },
    {
      path: '/ecommerce/customers',
      component: Customers
    },
   
    //Operadores
    {
      path: '/community/users-tabs',
      component: UsersTabs
    },


    //Auth Related
    {
      name: 'Login',
      path: '/signin',
      component: Signin
    },
    {
      path: '/reset-password',
      component: ResetPassword
    },

    //Ajustes Perfil
    {
      path: '/settings/account',
      component: Account
    },
    {
      path: '/settings/notifications',
      component: Notifications
    },

    
     {
      path: '/:pathMatch(.*)*',
      component: PageNotFound
    }
  ]
})

router.beforeEach(async (to,from)=>{  
  const authStore = useAuthStore();
  if(to.name !== 'Login' && authStore?.user?.role ==='user') {
    return {name:'Login'}
  }
  if(to.name !== 'Login' && !authStore.user) {
    let uid = Cookies.get('user_id');
    let at = Cookies.get('access_token');
    if(uid && at)
    {
      let response = await axios.get(BASE_API+'/users/'+uid)
     
      authStore.loadUser(response.data)
      
    }
    
    else {  
      return {name : 'Login'}
    }
      
  }
  
})

export default router
