<template>
    <div class="product col-sm-12 col-md-6 col-lg-4 col-xl-3" v-if="product">
        <div class="row">
            <div class="product_image d-flex justify-content-center align-items-center" style="height:300px;">
                <router-link :to="'/product/'+product.url"><img style="max-height:300px;" :src="$base_url+product.media.primary.path"></router-link>
            </div>
            <div class="product_content py-3">
                <div class="product_title mx-0"><router-link :to="'/product/'+product.url">{{product.name.length>50?product.name.substring(0, 50)+' ...':product.name}}</router-link></div>
                <div class="d-flex align-items-center justify-content-between mx-2">
                    <div class="product_price">
                        <small class="text-dark">
                            <span v-if="product.discount">
                                <span class="text-danger fw-bolder"><s>{{(product.price).toFixed(2)}}</s></span>&nbsp;
                                <span>{{(product.price - product.discount).toFixed(2)}}</span>
                            </span>
                            <span v-else>
                                {{(product.price).toFixed(2)}}
                            </span>
                            &nbsp;{{$store.state.currency}}
                        </small>
                    </div>
                    <div v-if="!adding && !added" class="product_price" @click="addToCart()">
                        <a href="javascript:void(0)">
                            <img style="width:25px;" src="data:image/png;base64,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"/>
                        </a>
                    </div>
                    <div v-if="adding" class="product_price">
                        <Spinner></Spinner>
                    </div>
                    <div v-if="added" class="product_price">
                        <router-link to="/cart">View Cart</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</template>
<script>
import axios from 'axios'
import Spinner from './Spinner.vue'
export default {
    data(){
        return {
            adding: false,
            added: false,
        }
    },
    name: 'Product-Cart',
    components: {
        Spinner,
    },
    props: {
        product: {
            type: Object,
        },
    },
    methods: {
        addToCart: function(){
            this.adding = true
            let self = this
            axios.post(this.$api+'/cart/addToCart', {
                cart_id: localStorage.getItem('cart'),
                product_id: self.product.id,
                quantity: 1,
            })
            .then(function(response){
                if(response.data.status == 200){
                    self.added = true
                }
            })
            .catch(function(error){
                console.log(error)                
            })
            .finally(function(){
                self.adding = false
                self.$store.commit('loadCart')
            })
        },
    },
}
</script>