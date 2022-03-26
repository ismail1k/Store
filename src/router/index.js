import { createRouter, createWebHistory } from 'vue-router'

//Routes
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import Category from '../views/Category.vue'
import Search from '../views/Search.vue'
import Contact from '../views/Contact.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'
import Thankyou from '../views/Thankyou.vue'

//Auth routes
import Login from '../views/Login.vue'

//Other Path
import C404 from '../views/C404.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
        layout: true,
    },
  },
  {
    path: '/product/:product_name',
    name: 'Product',
    component: Product,
    meta: {
        layout: true,
    },
  },
  {
    path: '/category/:category_id',
    name: 'Category',
    component: Category,
    meta: {
        layout: true,
    },
  },
  {
    path: '/search/:q',
    name: 'Search',
    component: Search,
    meta: {
        layout: true,
    },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
        layout: true,
    },
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: {
        layout: true,
    },
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: {
        layout: true,
    },
  },
  {
    path: '/thank-you/:order_id',
    name: 'thankyou',
    component: Thankyou,
    meta: {
        layout: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/admin',
    name: 'admin',
    redirect: () => {
      window.location.href = 'http://admin.'+location.host
    },
  },
  {
    path: '/:catchAll(.*)',
    component: C404,
    meta: {
        layout: true,
    },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
