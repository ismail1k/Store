<template>
    <div class="container my-3">
        <div v-if="product">
            <div class="row details_row">
                <div class="col-lg-6">
                    <div class="details_image">
                        <div class="details_image_large"><img :src="$base_url+product.media.primary.path" :alt="product.name"></div>
                        <div class="mt-3 row align-items-center justify-content-start">
                            <div class="details_image_thumbnail col-3 d-flex align-items-center"><img :src="$base_url+product.media.primary.path" :alt="product.name"></div>
                            <!-- <div class="details_image_thumbnail col-3 d-flex align-items-center" v-for="video in product.media.video" :key="video">
                                <video style="max-width:100%;" muted autoplay loop>
                                    <source :src="$base_url+video" :alt="product.name">
                                </video>
                            </div> -->
                            <div class="details_image_thumbnail col-3 d-flex align-items-center" v-for="image in product.media.image" :key="image">
                                <img :src="$base_url+image.path" :alt="product.name">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="details_content">
                        <div class="details_name" align="left">{{product.name}}</div>
                        <div v-if="product.discount" align="left">
                            <div class="details_discount fw-bolder" align="left">{{product.price}}&nbsp;{{$store.state.currency}}</div>
                            <div class="details_price fw-bolder" align="left">{{product.price-product.discount}}&nbsp;{{$store.state.currency}}</div>
                        </div>
                        <div v-if="!product.discount" align="left">
                            <div class="details_price fw-bolder" align="left">{{product.price}}&nbsp;{{$store.state.currency}}</div>
                        </div>

                        <!-- In Stock -->
                        <div class="in_stock_container" align="left">
                            <div class="availability fw-bolder">Availability:</div>
                            <span v-if="product.inventory.quantity" class="fw-bolder">In Stock</span>
                            <span v-if="!product.inventory.quantity" class="fw-bolder text-danger">Out Stock</span>
                        </div>
                        <div class="details_text fw-bolder" align="left">
                            <p>{{product.short_description}}</p>
                        </div>

                        <!-- Product Quantity -->
                        <div class="product_quantity_container d-flex align-items-center justify-content-between" align="left">
                            <div class="product_quantity clearfix">
                                <span>Qty</span>
                                <input id="quantity_input" type="text" v-model="quantity">
                            </div>
                            <div class="button cart_button">
                                <a v-if="loading" href="javascript:void(0)" @click="addToCart()">Proccess...</a>
                                <a v-if="!loading && product.inventory.quantity" href="javascript:void(0)" @click="addToCart()">Add to cart</a>
                                <a v-if="!loading && !product.inventory.quantity" href="javascript:void(0)">Sold out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row description_row" >
                <div class="col" v-if="product.description">
                    <div class="description_title_container" align="left">
                        <div class="description_title mt-4">Description</div>
                    </div>
                    <div class="description_text fw-bolder" align="left">
                        <p v-html="product.description"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return {
            message: '',
            loading: false,
            quantity: this.product.inventory.quantity?1:0,
        }
    },
    name: 'Product-Preview',
    props: {
        product: {
            type: Object,
        },
    },
    watch: {
        quantity(value){
            if(value > 0 && value <= this.product.inventory.quantity){
                this.quantity = value
            } else {
                if(value > this.product.inventory.quantity){
                    this.quantity = this.product.inventory.quantity
                } else {
                    this.quantity = 0
                }
                
            }
            // if(value > this.product.inventory.quantity){
            //     this.quantity = this.product.inventory.quantity
            // } else if(value < 0){
            //     this.quantity = 0
            // }
        },
    },
    methods: {
        addToCart: function(){
            this.loading = true
            let self = this
            axios.post(this.$api+'/cart/addToCart', {
                cart: localStorage.getItem('cart'),
                product_id: self.product.id,
                quantity: self.quantity,
            })
            .then(function(response){
                if(response.data.status == 200){
                    self.$router.push({path: '/cart'})
                } else {
                    self.message = 'Error: can\' add product to cart!'
                }
            })
            .catch(function(error){
                console.log(error)
            })
            .finally(function(){
                self.loading = false
            })
        }
    }
}
</script>
