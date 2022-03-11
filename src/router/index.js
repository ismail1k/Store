import { createRouter, createWebHistory } from 'vue-router'

//Routes
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import Category from '../views/Category.vue'
import Search from '../views/Search.vue'
import Contact from '../views/Contact.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'

//Auth routes
import Login from '../views/Login.vue'

//Other Path
import C404 from '../views/C404.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/product/:product_name',
    name: 'Product',
    component: Product,
  },
  {
    path: '/category/:category_id',
    name: 'Category',
    component: Category,
  },
  {
    path: '/search/:q',
    name: 'Search',
    component: Search,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
