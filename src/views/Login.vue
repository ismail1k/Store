<template>
    <div class="container">
        <div class="row d-flex justify-content-center mt-5">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                <div class="card py-3 px-2">
                    <div class="myform mt-4">
                        <div v-if="alert" class="alert alert-warning">
                            {{alert}}
                        </div>
                        <div class="form-group"> <input type="email" v-model="email" class="form-control" placeholder="Email"> </div>
                        <div class="form-group"> <input type="password" v-model="password" class="form-control" placeholder="Password"> </div>
                        <div class="row">
                            <div class="col-md-6 col-12"></div>
                            <div class="col-md-6 col-12 bn">Forget password ?</div>
                        </div>
                        <div class="form-group mt-3"> <button type="button" @click="login()" class="btn btn-block btn-primary btn-lg"><small>Login</small></button> </div>
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
            loading: false,
            email: '',
            password: '',
            alert: false,
        }
    },
    name: 'Login',
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


<style>

.card {
    border: none;
    border-top: 5px solid rgb(176, 106, 252);
    background: #212042;
    color: #57557A
}

p {
    font-weight: 600;
    font-size: 15px
}

.fab {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background: #2A284D;
    height: 40px;
    width: 90px
}

.fab:hover {
    cursor: pointer
}

.fa-twitter {
    color: #56ABEC
}

.fa-facebook {
    color: #1775F1
}

.fa-google {
    color: #CB5048
}

.division {
    float: none;
    position: relative;
    margin: 30px auto 20px;
    text-align: center;
    width: 100%;
    box-sizing: border-box
}

.division .line {
    border-top: 1.5px solid #57557A;
    ;
    position: absolute;
    top: 13px;
    width: 85%
}

.line.l {
    left: 52px
}

.line.r {
    right: 45px
}

.division span {
    font-weight: 600;
    font-size: 14px
}

.myform {
    padding: 0 25px 0 33px
}

.form-control {
    border: 1px solid #57557A;
    border-radius: 3px;
    background: #212042;
    margin-bottom: 20px;
    letter-spacing: 1px
}

.form-control:focus {
    border: 1px solid #57557A;
    border-radius: 3px;
    box-shadow: none;
    background: #212042;
    color: #fff;
    letter-spacing: 1px
}

.bn {
    text-decoration: underline
}

.bn:hover {
    cursor: pointer
}

.form-check-input {
    margin-top: 8px !important
}

.btn-primary {
    background: linear-gradient(135deg, rgba(176, 106, 252, 1) 39%, rgba(116, 17, 255, 1) 101%);
    border: none;
    border-radius: 50px
}

.btn-primary:focus {
    box-shadow: none;
    border: none
}

small {
    color: #F2CEFF
}

.far.fa-user {
    font-size: 13px
}

@media(min-width: 767px) {
    .bn {
        text-align: right
    }
}

@media(max-width: 767px) {
    .form-check {
        text-align: center
    }

    .bn {
        text-align: center;
        align-items: center
    }
}

@media(max-width: 450px) {
    .fab {
        width: 100%;
        height: 100%
    }

    .division .line {
        width: 50%
    }
}
</style>