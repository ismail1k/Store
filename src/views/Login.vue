<template>
    <Layout>
        <div v-if="!$store.state.user.auth" class="d-flex justify-content-center">
            <div class="col-12 col-md-10 col-lg-8 col-xl-5">
                <div class="form-group mb-3">
                    <div class="d-flex justify-content-center">
                        <div class="footer_logo"><a>{{$hostname}}</a></div>
                    </div>
                </div>
                <div class="form-group" v-if="alert">
                    <div class="alert alert-danger">
                        <span>{{alert}}</span>
                    </div>
                </div>
                <Spinner v-if="loading"></Spinner>
                <div v-else>
                    <div class="form-group row align-items-center mb-3">
                        <div class="d-flex justify-content-start">
                            <label for="email">Email: </label>
                        </div>
                        <div>
                            <input type="text" v-model="email" id="email" placeholder="Email">
                        </div>
                    </div>
                    <div class="form-group row align-items-center mb-3">
                        <div class="d-flex justify-content-start">
                            <label for="password">Password: </label>
                        </div>
                        <div>
                            <input type="password" v-model="password" id="password" placeholder="Password">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-ligth border-2 border-dark px-5 rounded-0" @click="login()"><span>Login</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script>
import axios from 'axios'

import Layout from '@/components/Layout'
import Spinner from '@/components/Spinner.vue'

export default {
    data(){
        return {
            loading: false,
            email: '',
            password: '',
            alert: false,
        }
    },
    name: 'Login',
    components: {
        Layout,
        Spinner,
    },
    methods: {
        login: function(){
            let self = this
            this.alert = false
            this.loading = true
            axios.post(this.$api+'/auth/login',{
                email: self.email,
                password: self.password
            })
            .then(function(response){
                console.log(response.data)
                if(response.data.auth == true){
                    localStorage.setItem('token', response.data.token)
                    self.$router.back()
                } else {
                    self.alert = response.data.message
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
    created(){
        if(this.$store.state.user.auth){
            this.$router.back()
        }
    },
}
</script>
<style scoped>
input{
    width: 100%;
    height: 52px;
    background: #f2f4f8;
    border: none;
    outline: none;
    padding-left: 15px;
}
</style>