<template>
    <Spinner class="my-5" v-if="loading"></Spinner>
    <div v-else class="cart_item d-flex align-items-lg-center align-items-center justify-content-between">
        <!-- Image & Name -->
        <div class="cart_item_image">
            <div class="d-flex justify-content-center align-items-center" style="height:200px;"><img :src="$base_url+item.media.primary.path" :alt="item.name" style="max-height:200px;"></div>
        </div>
        <div class="mx-2 d-md-flex justify-content-between w-100">
            <div class="col" align="left">
                <div class="cart_item_name">
                    <router-link :to="'/product/'+item.url">{{item.name}}</router-link>
                </div>
                <div class="cart_item_edit"><a href="javascript:void(0)" @click="removeFromCart(item.item_id)">Remove From Cart</a></div>
            </div>
            <div class="col row align-items-center justify-content-between mt-4 mt-md-0">
                <!-- Quantity -->
                <div class="col row justify-content-center">
                    <div class="cart_item_quantity">
                        <div class="product_quantity clearfix">
                            <span>Qty</span>
                            <input id="quantity_input" class="px-0" type="text" pattern="[0-9]*" :value="item.quantity" disabled>
                        </div>
                    </div>
                </div>
                <!-- Total -->
                <div class="col p-0 m-0 row justify-content-center">
                    <div class="cart_item_total px-0 d-flex justify-content-center">
                        <span>{{(((item.price-item.discount)*item.quantity)).toFixed(2)}}</span>
                        &nbsp;{{$store.state.currency}}
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
            loading: false,

        }
    },
    name: 'Product-List',
    components: {
        Spinner,
    },
    props: {
        item: {
            type: Object,
        },
    },
    methods: {
        removeFromCart: function(){
            this.loading = true
            let self = this
            axios.post(this.$api+'/cart/removeFromCart', {
                cart_id: localStorage.getItem('cart'),
                item_id: self.item.item_id,
            })
            .then(function(response){
                if(response.data.status == 200){
                    self.close()
                } else {
                    console.log('Error')
                    console.log(response.data)
                }
            })
            .catch(function(error){
                console.log(error)
            })
            .finally(function(){
                self.$store.commit('loadCart')
                self.loading = false
            })
        },
        close: function(){
            this.loading = false
            this.product = false
            this.$el.parentNode.removeChild(this.$el)
        },
    },
    created(){
    }
}
</script>