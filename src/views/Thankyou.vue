<template>
    <div>
        <Spinner v-if="loading"></Spinner>
        <div v-if="!loading && order" class="d-flex justify-content-center">
            <div class="px-3 px-md-0 col-12 col-md-6">
                <table class="table">
                    <tr>
                        <td>Fullname:</td>
                        <td v-text="order.fullname"></td>
                    </tr>
                    <tr>
                        <td>Address:</td>
                        <td v-text="order.address"></td>
                    </tr>
                    <tr>
                        <td>Additional Note:</td>
                        <td v-text="order.note?order.note:'You don\'t let an additional note to seller'"></td>
                    </tr>
                    <tr>
                        <td>Payment Method:</td>
                        <td v-text="order.payment.provider"></td>
                    </tr>
                    <tr>
                        <td>Order State:</td>
                        <td>
                            <span v-if="order.state == 0" class="badge bg-danger">Reject</span>
                            <span v-if="order.state == 1" class="badge bg-warning">Pending</span>
                            <span v-if="order.state == 2" class="badge bg-info">Processing</span>
                            <span v-if="order.state == 3" class="badge bg-success">Complete</span>
                            <span v-if="order.state == 4" class="badge bg-info">Refund</span>
                        </td>
                    </tr>
                </table>
            </div>
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
<style scoped>
.table>:not(:first-child){
    border:0;
}
.table-bordered>:not(caption)>*>* {
    border-width: 1px;
}

</style>