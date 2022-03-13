<template>
        <div class="d-flex justify-content-center align-items-center my-5" v-if="loading">
            <div class="spinner-border text-dark" role="status">
                <span class="visually-hidden"></span>
            </div>
        </div>
        <div class="my-3" v-if="preview && !loading">
            <ProductPreview :product="preview" />
            <div class="products" v-if="related.length">
                <div class="container">
                    <div class="row">
                        <div class="col text-center">
                            <div class="products_title my-3">Related Products</div>
                        </div>
                    </div>
                    <div class="row">
                        <!-- Product -->
                        <ProductCart v-for="product in related" :key="product" :product="product" />
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!preview && !loading" class="d-flex justify-content-center">
            Product not found!
        </div>
</template>
<script>
import '@/assets/styles/product.css'
import '@/assets/styles/product_responsive.css'
import axios from 'axios'
import ProductPreview from '@/components/Product-Preview.vue'
import ProductCart from '@/components/Product-Cart.vue'
export default {
    data(){
        return {
            product_name: this.$route.params.product_name,
            loading: true,
            preview: false,
            related: false,
        }
    },
    name: 'Product',
    components: {
        ProductPreview,
        ProductCart,
    },
    methods: {
        load: function(){
            let self = this
            axios.get(this.$api+'/product/view', {
                params: {
                    product_name: self.product_name,
                },
            })
            .then(function(response){
                if(response.data.status == 404){
                    self.preview = false
                    self.related = false
                } else {
                    self.preview = response.data
                    self.related = response.data.related
                }
            })
            .catch(function(error){
                console.log(error)
            })
            .finally(function(){
                self.loading = false
            })
        },
    },
    beforeRouteUpdate (to, from, next) {
        this.loading = true
        this.product_name = to.params.product_name;
        this.products = [];
        this.load();
        next();
    },
    mounted(){
        this.load()
    },
}
</script>