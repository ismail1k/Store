<template>
	<div class="footer_overlay"></div>
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="py-4 d-md-flex align-items-center justify-content-md-between">
                        <div class="footer_logo"><a>{{$hostname}}</a></div>
                        <div class="copyright ml-auto mr-auto mt-0">Copyright &copy; {{new Date().getFullYear()}} All rights reserved </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
<script>
export default {
    name: 'Footer',
}
</script>
<style scoped>
footer {
    z-index: 1;
    background-color:#ffffff;
}
</style>