<template>
    <div>
        <Spinner v-if="loading"></Spinner>
        <div v-if="!loading && order">
            <table>
                <tr>
                    <th width="60%"></th>
                    <th></th>
                </tr>
                <tr>
                    <td>Fullname:</td>
                    <td v-text="order.fullname"></td>
                </tr>
                <tr>
                    <td>Address:</td>
                    <td v-text="order.address"></td>
                </tr>
                <tr>
                    <td>Payment Method:</td>
                    <td v-text="order.payment.provider"></td>
                </tr>
                <tr v-if="order.note">
                    <td>Additional Note:</td>
                    <td v-text="order.note"></td>
                </tr>
                <tr>
                    <td>Order State:</td>
                    <td v-text="order.state"></td>
                </tr>
            </table>
        </div>
        <div v-if="!loading && !order" class="d-flex justify-content-center">
            Order not found or unavailable to see it!
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import Spinner from '@/components/Spinner.vue'
export default {
    data(){
        return {
            loading: true,
            order: false
        }
    },
    name: 'Thankyou',
    components: {
        Spinner,
    },
    methods: {
        load: function(){
            this.loading = true
            let self = this
            axios.get(this.$api+'/order/view', {
                params: {
                    token: localStorage.getItem('token'),
                    order_id: self.$route.params.order_id,
                },
            })
            .then(function(response){
                if(response.data.status == 404){
                    self.order = false
                } else {
                    self.order = response.data
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
        this.load()
    }
}
</script>