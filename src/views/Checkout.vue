<template>
    <div class="container">
        <Spinner v-if="loading" class="my-4"></Spinner>
        <div class="row" v-show="!loading">
            <div class="col-lg-6">
                <div v-if="$store.state.cart.items.length" class="billing checkout_section">
                    <div class="row" v-if="alert" id="alert">
                        <span class="alert alert-warning">
                            {{alert}}
                        </span>
                    </div>
                    <div class="section_title">Billing Address</div>
                    <div class="section_subtitle">Enter your address info</div>
                    <div class="checkout_form_container">
                        <form action="#" id="checkout_form" class="checkout_form">
                            <div class="row">
                                <div class="col-xl-6">
                                    <!-- Name -->
                                    <label for="checkout_name">First Name*</label>
                                    <input v-model="credentials.firstname" type="text" id="checkout_name" class="checkout_input" required="required">
                                </div>
                                <div class="col-xl-6 last_name_col">
                                    <!-- Last Name -->
                                    <label for="checkout_last_name">Last Name*</label>
                                    <input v-model="credentials.lastname" type="text" id="checkout_last_name" class="checkout_input" required="required">
                                </div>
                            </div>
                            <div>
                                <!-- Email -->
                                <label for="checkout_phone">Email*</label>
                                <input v-model="credentials.email" type="email" id="checkout_email" class="checkout_input" required="required">
                            </div>
                            <div>
                                <!-- Phone no -->
                                <label for="checkout_phone">Phone no*</label>
                                <input v-model="credentials.phone" type="phone" id="checkout_phone" class="checkout_input" required="required">
                            </div>
                            <div>
                                <!-- Address -->
                                <label for="checkout_address">Address*</label>
                                <input v-model="credentials.address" type="text" id="checkout_address" class="checkout_input" required="required">
                            </div>
                            <div>
                                <!-- Zipcode -->
                                <label for="checkout_zipcode">Zipcode*</label>
                                <input v-model="credentials.zip" type="text" id="checkout_zipcode" class="checkout_input" required="required">
                            </div>
                            <div>
                                <!-- Note -->
                                <label for="checkout_note">Additional Note</label>
                                <textarea v-model="credentials.note" id="checkout_note" class="checkout_input" style="height:100px;" placeholder="You can add a note to seller if you want."></textarea>
                            </div>
                            <div class="checkout_extra">
                                <span class="checkbox_title">*Once you place order, thats mean you are agree to our terms of use.</span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Order Info -->

            <div class="col-lg-6">
                <div class="order checkout_section">
                    <div class="section_title">Your order</div>
                    <div class="section_subtitle">Order details</div>

                    <!-- Order details -->
                    <div class="order_list_container">
                        <div class="d-flex flex-row align-items-center justify-content-between">
                            <div class="order_list_title">Product</div>
                            <div class="order_list_value ml-auto">Price</div>
                        </div>
                        <ul class="order_list my-5">
                            <li v-for="item in $store.state.cart.items" :key="item" class="d-flex align-items-center justify-content-between mb-4">
                                <div class="order_list_title">{{item.name}}</div>
                                <div class="order_list_value ml-auto">{{((item.price-item.discount)*item.quantity)}}&nbsp;{{$store.state.currency}}</div>
                            </li>
                        </ul>
                        <span v-if="$store.state.cart.items">{{calcTotal()}}</span>
                        <div class="d-flex flex-row align-items-center justify-content-between">
                            <div class="order_list_title">Total</div>
                            <div class="order_list_value ml-auto">{{total}}&nbsp;{{$store.state.currency}}</div>
                        </div>
                    </div>

                    <!-- Payment Options -->
                    <div class="payment">
                        <div class="mt-5">
                            <!-- <label class="payment_option clearfix">Paypal
                                <input type="radio" v-model="credentials.payment_method" value="paypal">
                                <span class="checkmark"></span>
                            </label> -->
                            <label class="payment_option clearfix">Cach on delivery
                                <input type="radio" v-model="credentials.payment_method" value="cod">
                                <span class="checkmark"></span>
                            </label>
                            <!-- <label class="payment_option clearfix">Credit card
                                <input type="radio" v-model="credentials.payment_method" value="cc">
                                <span class="checkmark"></span>
                            </label> -->
                        </div>
                    </div>
                    <div v-if="$store.state.cart.items.length" class="button order_button" @click="order()"><a href="javascript:void(0)">Place Order</a></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import '@/assets/styles/checkout.css'
import '@/assets/styles/checkout_responsive.css'
import $ from 'jquery'
import axios from 'axios'
import Spinner from '@/components/Spinner.vue'  
export default {
    data(){
        return {
            alert: '',
            loading: false,
            total: 0,
            credentials: {
                firstname: '',
                lastname: '',
                email: '',
                phone: '',
                address: '',
                zip: '',
                note: '',
                payment_method: 'cod',
            },
        }
    },
    name: 'Checkout',
    components: {
        Spinner,
    },
    methods: {
        validate: function(){
            if(!this.credentials.firstname){
                this.alert = 'Please set firstname!'
                return false
            }
            if(!this.credentials.lastname){
                this.alert = 'Please set lastname!'
                return false
            }
            if(!this.credentials.email){
                this.alert = 'Please set email!'
                return false
            }
            if(!this.credentials.phone){
                this.alert = 'Please set phone number!'
                return false
            }
            if(!this.credentials.address){
                this.alert = 'Please set full address!'
                return false
            }
            if(!this.credentials.zip){
                this.alert = 'Please set zip code!'
                return false
            }
            if(!this.credentials.payment_method){
                this.alert = 'Invalide payment method!'
                return false
            }
            return true
        },
        payment: async function(payment_method, order_id){
            let self = this
            if(payment_method == 'paypal'){
                self.loading = true
                axios.get(this.$api+'/payment/paypal', {
                    params: {
                        token: localStorage.getItem('token'),
                        order_id: order_id,
                    },
                })
                .then(function(response){
                    if(response.data.status == 200){
                        let paypal = window.open(response.data.url, '_blank', 'width:calc(100vw / 2);height:calc(100vh / 2);')
                        paypal.focus()
                        let interval = setInterval(function(){
                            if(paypal.closed){
                                clearInterval(interval)
                                self.loading = false
                                self.orderCheck(order_id)
                            }
                        }, 2000)
                    } else if(response.data.status == 500){
                        self.loading = false
                        self.alert = response.data.message?response.data.message:'Error!'
                    } else {
                        self.loading = false
                    }
                })
                .catch(function(error){
                    self.loading = false
                    console.log(error)
                })
            }
            if(payment_method == 'cod'){
                self.loading = true
                axios.get(this.$api+'/payment/cod', {
                    params: {
                        token: localStorage.getItem('token'),
                        order_id: order_id,
                    },
                })
                .then(function(response){
                    if(response.data.status == 200){
                        self.orderCheck(order_id)
                    }
                })
                .catch(function(error){
                    console.log(error)
                })
                .finally(function(){
                    self.loading = false
                })
            }
            if(payment_method == 'cc'){
                // cc
            }
        },
        orderCheck: function(order_id){
            this.loading = true
            let self = this
            axios.get(this.$api+'/order/view', {
                params: {
                    token: localStorage.getItem('token'),
                    order_id: order_id,
                },
            })
            .then(function(response){
                if(response.data.payment_method){
                    self.$router.push('/thank-you/'+order_id)
                } else {
                    self.alert = 'Error while checking order!'
                }
            })
            .catch(function(error){
                console.log(error)
            })
            .finally(function(){
                self.loading = false
            })
        },
        order: async function(){
            this.alert = ''
            if(!await this.validate()){
                $('html').animate({scrollTop: $('#alert').position().top}, 0)
                return false
            }
            let self = this 
            this.loading = true
            axios.post(this.$api+'/order/new', {
                token: localStorage.getItem('token'),
                cart_id: localStorage.getItem('cart'),
                fullname: self.credentials.firstname+' '+self.credentials.lastname,
                email: self.credentials.email,
                phone: self.credentials.phone,
                address: self.credentials.address+' '+self.credentials.zip,
                note: self.credentials.note,
            })
            .then(async function(response){
                self.loading = false
                if(response.data.status == 200){
                    await self.payment(self.credentials.payment_method, response.data.order_id)
                }
            })
            .catch(function(error){
                console.log(error)
                self.loading = false
            })
        },
        calcTotal: function(){
            let total = 0
            this.$store.state.cart.items.forEach(item => {
                total += ((item.price-item.discount)*item.quantity)
            })
            this.total = total
        },
    },
    created(){
        let self = this
        axios.get(this.$api+'/cart', {
            params: {
                cart_id: localStorage.getItem('cart'),
            },
        })
        .then(function(response){
            if(!response.data.items.length){
                self.$router.back()
            }
        })
        .catch(function(error){
            console.log(error)
        })
    },
}
</script>
<style scoped>
input[type="radio"]:checked ~ * { 
    background: #e95a5a;
}
</style>