import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Client from '../views/Client'
import Banks from '../views/Banks'
import Purchase from '../views/Purchase'
import Stock from '../views/Stock'
import Item from '../views/Item'
import Sales from '../views/Sales'
import AddClient from '../views/AddClient'
import AddBank from '../views/AddBank'
import AddSales from '../views/AddSales'
import EditBank from '../views/EditBank'
import EditClient from '../views/EditClient'
import AddPurchase from '../views/AddPurchase'
import ViewSales from '../views/ViewSales'
import AddItem from '../views/AddItem'
import EditItem from '../views/EditItem'
import EditSales from '../views/EditSales'
import EditPurchase from '../views/EditPurchase'
import AddSalesDraft from '../views/AddSalesDraft'
import EditSalesDraft from '../views/EditSalesDraft'
import AdminUser from '../views/AdminUser'
import AddAdminUser from '../views/AddAdminUser'
import EditAdminUser from '../views/EditAdminUser'
import AddUserRole from '../views/AddUserRole'
import UserRole from '../views/UserRole'
import EditUserRole from '../views/EditUserRole'

// import Myaccount from '../views/myaccount'
import Home from '../views/Home.vue'
// import Registration from '../views/registration.vue'

var user = localStorage.getItem('user')
Vue.use(VueRouter)
  const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/clients',
    name: 'Client',
    component: Client
  },
  {
    path: '/editclient/:id',
    name: 'EditClient',
    component: EditClient
  },
  {
    path: '/banks',
    name: 'Banks',
    component: Banks
  },
  {
    path: '/item',
    name: 'Item',
    component: Item
  },
  {
    path: '/purchase',
    name: 'Purchase',
    component: Purchase
  },
  {
    path: '/addpurchase',
    name: 'AddPurchase',
    component: AddPurchase
  },
  {
    path: '/stock',
    name: 'Stock',
    component: Stock
  },
  {
    path: '/sales',
    name: 'Sales',
    component: Sales
  },
  {
    path: '/addclient',
    name: 'AddClient',
    component: AddClient
  },
  {
    path: '/addbank',
    name: 'AddBank',
    component: AddBank
  },
  {
    path: '/editbank/:id',
    name: 'EditBank',
    component: EditBank
  },
  {
    path: '/addsales',
    name: 'AddSales',
    component: AddSales
  },
  {
    path: '/addsalesdraft',
    name: 'AddSalesDraft',
    component: AddSalesDraft
  },
  {
    path: '/editsalesdraft/:sid/:mode',
    name: 'EditSalesDraft',
    component: EditSalesDraft
  },
  {
    path: '/viewsales/:sid',
    name: 'ViewSales',
    component: ViewSales
  },
  {
    path: '/additem',
    name: 'AddItem',
    component: AddItem
  },
  {
    path: '/edititem/:id',
    name: 'EditItem',
    component: EditItem
  },
  {
    path: '/editsales/:sid',
    name: 'EditSales',
    component: EditSales
  },
  {
    path: '/editpurchase/:id',
    name: 'EditPurchase',
    component: EditPurchase
  },
  {
    path: '/adminuser',
    name: 'AdminUser',
    component: AdminUser
  },
  {
    path: '/addadminuser',
    name: 'AddAdminUser',
    component: AddAdminUser
  },
  {
    path: '/editadminuser/:id',
    name: 'EditAdminUser',
    component: EditAdminUser
  },
  {
    path: '/userrole',
    name: 'UserRole',
    component: UserRole
  },
  {
    path: '/adduserrole',
    name: 'AddUserRole',
    component: AddUserRole
  },
  {
    path: '/edituserrole/:id',
    name: 'EditUserRole',
    component: EditUserRole
  },
  


]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  var user = localStorage.getItem('user')
  var check_2 = localStorage.getItem('local_mobile');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!user) {
      if (check_2 != null) {
        var paths = '/Signup';
      } else {
        var paths = '/Step1';
      }
      next({
        path: paths,
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
  if (to.matched.some(record => record.meta.requiresNoAuth)) {
    if (user) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
