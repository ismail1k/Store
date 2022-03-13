<template>
        <div class="my-3 mx-1 row justify-content-start">
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
			<div v-else>
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
import $ from 'jquery'
import ProductCart from '../components/Product-Cart.vue'
import Spinner from '../components/Spinner.vue'
export default {
    data(){
        return {
            category_id: this.$route.params.category_id,
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
                    category_id: self.category_id,
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
        this.category_id = to.params.category_id;
        this.products = [];
        this.load();
        $('#menu').removeClass('active')
        next();
    },
    created(){
        this.load()
    },
}
</script>