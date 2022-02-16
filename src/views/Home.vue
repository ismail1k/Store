<template>
    <Layout>
        <Spinner v-if="loading"></Spinner>
        <div class="my-3 mx-1 row justify-content-start" v-show="!loading">
            <ProductCart v-for="product in products" :key="product" :product="product"></ProductCart>
        </div>
    </Layout>
</template>

<script>
import axios from 'axios'
import Layout from '@/components/Layout'
import ProductCart from '../components/Product-Cart.vue'
import Spinner from '../components/Spinner.vue'

export default {
    data(){
        return {
            loading: true,
            products: false,
        }
    },
    name: 'Home',
    components: {
        Layout,
        ProductCart,
        Spinner,
    },
    methods: {
        load: function(){
            let self = this
            axios.get(this.$api+'/product', {
                params: {
                    limit: 8,
                },
            })
            .then(function(response){
                self.products = response.data
            })
            .catch(function(error){
                console.log(error)
            })
            .finally(function(){
                self.loading = false
            })
        },
    },
    created(){
        this.load()
    },
}
</script>
