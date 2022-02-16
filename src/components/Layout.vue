<template>
    <Header></Header>
        <div style="margin-top:70px;" class="container p-0 py-2">
            <slot></slot>
        </div>
    <Footer></Footer>
</template>

<script>
import $ from 'jquery'
import Header from './Header'
import Footer from './Footer'


export default {
    name: 'Layout',
    components: {
        Header,
        Footer,
    },
    created(){
        this.$store.commit('loadConfig')
        this.$store.commit('loadUser')
        this.$store.commit('loadCart')
        this.$store.commit('loadCategories')
    },
    mounted(){
        $(document).ready(function(){
           if($('.search').length && $('.search_panel').length){
                var search = $('.search')
                var panel = $('.search_panel')
                search.on('click', function(){
                    panel.toggleClass('active')
                })
           }
        })
    },
}
</script>

<style >
@import "../assets/styles/main_styles.css";
@import "../assets/styles/responsive.css";
@import "../assets/plugins/fontawesome-4.7.0/css/font-awesome.css";
::-webkit-scrollbar {
    overflow: hidden;
    width: 7px;
    height: 6px;
    margin:5px;
}
::-webkit-scrollbar-track {
    border-radius: 5px;
}
::-webkit-scrollbar-thumb {
    background: rgb(160, 160, 160);
    border-radius: 3px;
}
.container{
    z-index:5;
    background-color:#ffffff ;
}
</style>