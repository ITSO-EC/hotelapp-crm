import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from './pages/Dashboard.vue'

import Orders from './pages/ecommerce/Orders.vue'
import Customers from './pages/ecommerce/Customers.vue'
import Invoices from './pages/ecommerce/Invoices.vue'
import Shop from './pages/ecommerce/Shop.vue'
import Workspace from './pages/ecommerce/Workspace.vue'

import UsersTabs from './pages/community/UsersTabs.vue'


import Account from './pages/settings/Account.vue'
import Notifications from './pages/settings/Notifications.vue'

import Changelog from './pages/utility/Changelog.vue'
import EmptyState from './pages/utility/EmptyState.vue'
import PageNotFound from './pages/utility/PageNotFound.vue'
import KnowledgeBase from './pages/utility/KnowledgeBase.vue'

import Signin from './pages/Signin.vue'
import Signup from './pages/Signup.vue'
import ResetPassword from './pages/ResetPassword.vue'

const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [

    //Home Page + Analytics
    {
      path: '/',
      component: Dashboard
    },
    

    //FriendsHotel Related
    {
      path: '/ecommerce/orders',
      component: Orders
    },
    {
      path: '/ecommerce/invoices',
      component: Invoices
    },
    {
      path: '/ecommerce/customers',
      component: Customers
    },
    {
      path: '/ecommerce/shop',
      component: Shop
    },
    {
      path: '/ecommerce/workspace/:id?/:categoryId?',
      name:'Workspace',
      component: Workspace
    },

    //Operadores
    {
      path: '/community/users-tabs',
      component: UsersTabs
    },


    //Auth Related
    {
      path: '/signin',
      component: Signin
    },
    {
      path: '/signup',
      component: Signup,
      name:'Signup'
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
      path: '/utility/changelog',
      component: Changelog
    },
    {
      path: '/utility/empty-state',
      component: EmptyState
    },
    {
      path: '/utility/404',
      component: PageNotFound
    },
    {
      path: '/utility/knowledge-base',
      component: KnowledgeBase
    },
   
    {
      path: '/:pathMatch(.*)*',
      component: PageNotFound
    }
  ]
})

export default router
