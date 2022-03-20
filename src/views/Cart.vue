<template>
		<div class="container" v-if="!loading && items.length">
			<Spinner v-if="loading"></Spinner>
            <div v-else>
                <div class="row">
                    <div class="col">
                        <!-- Column Titles -->
                        <div class="cart_info_columns clearfix">
                            <div class="cart_info_col cart_info_col_product">Product</div>
                            <div class="cart_info_col cart_info_col_quantity">Quantity</div>
                            <div class="cart_info_col cart_info_col_total">Total</div>
                        </div>
                    </div>
                </div>
                <div class="row cart_items_row">
                    <div class="col">
                        <ProductList v-for="item in items" :key="item" :item="item"></ProductList>
                    </div>
                </div>
                <div class="row row_cart_buttons">
                    <div class="col">
                        <div class="cart_buttons d-flex align-items-center justify-content-between">
                            <div class="button">
                                <a href="javascript:void(0)" @click="clear()">Clear cart</a>
                            </div>
                            <div class="button">
                                <router-link to="/">Continue shopping</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
			<div class="row row_extra">
				<div class="col-lg-4">
					<!-- <div class="delivery">
						<div class="section_title">Shipping method</div>
						<div class="section_subtitle">Select the one you want</div>
						<div class="delivery_options">
							<label class="delivery_option clearfix">Next day delivery
								<input type="radio" name="radio">
								<span class="checkmark"></span>
								<span class="delivery_price">$4.99</span>
							</label>
							<label class="delivery_option clearfix">Standard delivery
								<input type="radio" name="radio">
								<span class="checkmark"></span>
								<span class="delivery_price">$1.99</span>
							</label>
							<label class="delivery_option clearfix">Personal pickup
								<input type="radio" checked="checked" name="radio">
								<span class="checkmark"></span>
								<span class="delivery_price">Free</span>
							</label>
						</div>
					</div>

					<div class="coupon">
						<div class="section_title">Coupon code</div>
						<div class="section_subtitle">Enter your coupon code</div>
						<div class="coupon_form_container">
							<form action="#" id="coupon_form" class="coupon_form">
								<input type="text" class="coupon_input" required="required">
								<button class="button coupon_button"><span>Apply</span></button>
							</form>
						</div>
					</div> -->
				</div>
				<div class="col-lg-6 offset-lg-2">
					<div class="cart_total">
						<div class="section_title">Cart total</div>
						<div class="section_subtitle">Final info</div>
						<div class="cart_total_container">
							<ul>
								<li class="d-flex flex-row align-items-center justify-content-between">
									<div class="cart_total_title">Subtotal</div>
									<div class="cart_total_value ml-auto">{{(subtotal).toFixed(2)}}&nbsp;{{$store.state.currency}}</div>
								</li>
								<li class="d-flex flex-row align-items-center justify-content-between">
									<div class="cart_total_title">Shipping</div>
									<div class="cart_total_value ml-auto">{{(shipping).toFixed(2)}}&nbsp;{{$store.state.currency}}</div>
								</li>
								<li class="d-flex flex-row align-items-center justify-content-between">
									<div class="cart_total_title">Total</div>
									<div class="cart_total_value ml-auto">{{(total).toFixed(2)}}&nbsp;{{$store.state.currency}}</div>
								</li>
							</ul>
						</div>
						<div class="button checkout_button w-100"><router-link to="/checkout">Proceed to checkout</router-link></div>
					</div>
				</div>
			</div>
		</div>
        <div class="container d-flex justify-content-center" v-if="!loading && !items.length">
            <div class="mt-5" align="center">
                <div>Your cart is empty!</div>
                <router-link to="/">Click here to view more products</router-link>
            </div>
        </div>
</template>
<script>
import '@/assets/styles/cart.css'
import '@/assets/styles/cart_responsive.css'
import axios from 'axios'
import ProductList from '@/components/Product-List.vue'
import Spinner from '@/components/Spinner.vue'
export default {
    data(){
        return {
            loading: true,
            items: false,
        }
    },
    name: 'Cart',
    components: {
        ProductList,
        Spinner,
    },
    computed: {
        subtotal: function(){
            let subtotal = 0
            this.$store.state.cart.items.forEach(item => {
                subtotal = subtotal+item.price
            })
            return subtotal
        },
        shipping: function(){
            return 0
        },
        total: function(){
            return this.subtotal + this.shipping
        },
    },
    methods: {
        load: function(){
            this.loading = true
            this.items = false
            let self = this
            axios.get(this.$api+'/cart', {
                params: {
                    cart: localStorage.getItem('cart')
                }
            })
            .then(function(response){
                self.items = response.data.items
            })
            .catch(function(error){
                console.log(error)
            })
            .finally(function(){
                self.loading = false
            })
        },
        clear: function(){
            this.loading = true
            let self = this
            axios.get(this.$api+'/cart/clear', {
                params: {
                    cart: localStorage.getItem('cart')
                },
            })
            .then(async function(){
                localStorage.setItem('cart', '')
                await self.$store.commit('loadCart')
                await self.load()
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