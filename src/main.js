import { createApp } from 'vue'
import vuex from 'vuex'
import App from './App.vue'
// import echo from "laravel-echo"
import axios from 'axios'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'

//Initialize
const app = createApp(App)
// window.Pusher = require('pusher-js');
// window.echo = new echo({
//     broadcaster: 'pusher',
//     key: 'your-pusher-key',
//     wsHost: window.location.hostname,
//     wsPort: 6001,
//     forceTLS: false,
//     disableStats: true,
// })
app.config.globalProperties.$hostname = process.env.VUE_APP_HOSTNAME
app.config.globalProperties.$api = process.env.VUE_APP_API
app.config.globalProperties.$base_url = process.env.VUE_APP_BASE_URL
const store = new vuex.Store({
    state: {
        user: false,
        cart: {
            items: [],
        },
        categories: false,
        currency: '',
    },
    mutations: {
        loadUser(state){
            if(localStorage.getItem('token')){
                axios.get(process.env.VUE_APP_API+'/auth/me', {
                    params: {
                        token: localStorage.getItem('token'),
                    },
                })
                .then(function(response){
                    if(response.data.auth == true){
                        state.user = response.data
                    }
                    if(response.data.auth == false){
                        localStorage.setItem('token', '')
                    }
                })
                .catch(function(error){
                    console.log(error)
                })
            }
        },
        loadCategories(state){
            axios.get(process.env.VUE_APP_API+'/category')
            .then(function(response){
                state.categories = response.data
            })
            .catch(function(error){
                console.log(error)
            })
        },
        async loadCart(state){
            if(!localStorage.getItem('cart')){
                await axios.get(process.env.VUE_APP_API+'/cart/create')
                .then(function(response){
                    localStorage.setItem('cart', response.data.cart_id)
                })
                .catch(function(error){
                    console.log(error)
                })
            }
            axios.get(process.env.VUE_APP_API+'/cart', {
                params: {
                    cart_id: localStorage.getItem('cart'),
                },
            })
            .then(function(response){
                if(response.data.status == 404){
                    localStorage.setItem('cart', '')
                } else {
                    state.cart = response.data
                }
            })
            .catch(function(error){
                localStorage.setItem('cart', '')
                console.log(error)
            })
        },
        loadConfig(state){
            axios.get(process.env.VUE_APP_API+'/config/view', {
                params: {
                    key: 'currency',
                },
            })
            .then(function(response){
                state.currency = response.data.value
            })
            .catch(function(error){
                console.log(error)
            })
        },
    }
})
app.use(router).use(store).mount('#app')

