<template>
        <div class="container">
			<div class="row">
                <Spinner v-if="loading"></Spinner>
                <div v-if="!loading && Credentials" class="get_in_touch">
                    <div class="section_title" align="left">Get in Touch</div>
                    <div class="section_subtitle" align="left">Say hello</div>
                    <div class="contact_form_container">
                        <div class="contact_form">
                            <div class="row">
                                <div class="col-xl-6" align="left">
                                    <!-- Name -->
                                    <label for="contact_name">First Name*</label>
                                    <input v-model="Credentials.firstname" type="text" id="contact_name" class="contact_input" required="required">
                                </div>
                                <div class="col-xl-6 last_name_col" align="left">
                                    <!-- Last Name -->
                                    <label for="contact_last_name">Last Name*</label>
                                    <input v-model="Credentials.lastname" type="text" id="contact_last_name" class="contact_input" required="required">
                                </div>
                            </div>
                            <div align="left">
                                <!-- Email -->
                                <label for="contact_company">Email*</label>
                                <input v-model="Credentials.email" type="text" id="contact_company" class="contact_input">
                            </div>
                            <div align="left">
                                <!-- Subject -->
                                <label for="contact_company">Subject*</label>
                                <input v-model="Credentials.subject" type="text" id="contact_company" class="contact_input">
                            </div>
                            <div align="left">
                                <label for="contact_textarea">Message*</label>
                                <textarea v-model="Credentials.message" id="contact_textarea" class="contact_input contact_textarea" required="required"></textarea>
                            </div>
                            <button class="button contact_button" @click="send()"><span>Send Message</span></button>
                        </div>
                    </div>
                </div>
                <div v-if="!Credentials" class="d-flex justify-content-center my-4">
                    Your Email was sent!
                </div>
			</div>
		</div>
</template>
<script>
import '@/assets/styles/contact.css'
import '@/assets/styles/contact_responsive.css'
import axios from 'axios'
import Spinner from '@/components/Spinner.vue'
export default {
    data(){
        return {
            loading: false,
            Credentials: {
                firstname: '',
                lastname: '',
                email: '',
                subject: '',
                message: '',
            },
        }
    },
    name: 'Contact',
    components: {
        Spinner,
    },
    methods: {
        send: function(){
            for(let element in this.Credentials){
                if(!this.Credentials[element]){
                    return false
                }
            }
            this.loading = true
            let self = this
            axios.post(this.$api+'/contact/send', {
                token: localStorage.getItem('token'),
                firstname: self.Credentials.firstname,
                lastname: self.Credentials.lastname,
                email: self.Credentials.email,
                subject: self.Credentials.subject,
                message: self.Credentials.message,
            })
            .then(function(response){
                if(response.data.status == 200){
                    self.Credentials = false
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
}
</script>