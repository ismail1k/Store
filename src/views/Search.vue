<template>
        <div class="container">
			<div class="row">
                <div class="my-3 d-flex align-items-center justify-content-between">
                    <div class="results">Showing <span v-text="products.length"></span> results</div>
                    <!-- <div class="sorting_container ml-md-auto">
                        <div class="sorting">
                            <ul class="item_sorting">
                                <li>
                                    <span class="sorting_text">Sort by</span>
                                    <i class="fa fa-chevron-down" aria-hidden="true"></i>
                                    <ul>
                                        <li class="product_sorting_btn" data-isotope-option='{ "sortBy": "original-order" }'><span>Default</span></li>
                                        <li class="product_sorting_btn" data-isotope-option='{ "sortBy": "price" }'><span>Price</span></li>
                                        <li class="product_sorting_btn" data-isotope-option='{ "sortBy": "stars" }'><span>Name</span></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div> -->
                </div>
			</div>
            <Spinner v-if="loading"></Spinner>
			<div class="row" v-else>
                <div class="row" v-if="products.length">
                    <ProductCart v-for="product in products" :key="product" :product="product"></ProductCart>
                </div>
                <div class="row justify-content-center" v-else>
                    No product found
                </div>
			</div>
		</div>
</template>
<script>
import '@/assets/styles/categories.css'
import '@/assets/styles/categories_responsive.css'
import axios from 'axios'
import ProductCart from '../components/Product-Cart.vue'
import Spinner from '../components/Spinner.vue'
export default {
    data(){
        return {
            q: this.$route.params.q,
            loading: true,
            products: [],
        }
    },
    name: 'Category',
    components: {
        ProductCart,
        Spinner,
    },
    methods: {
        load: function(){
            let self = this
            axios.get(this.$api+'/search/product', {
                params: {
                    q: self.q,
                }
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
        }
    },
    beforeRouteUpdate (to, from, next) {
        this.loading = true
        this.q = to.params.q;
        this.products = [];
        this.load();
        next();
    },
    created(){
        this.load()
    },
}
</script>