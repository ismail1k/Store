<template>
    <div class="d-flex align-items-center justify-content-center pt-5">
        <div>
            <h1>Error 404</h1>
            <a> The page are you looking for is not exist!</a>
            <button class="mt-3 btn-dark form-control text-light" @click="$router.back()"> Return Back</button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'C404',
}
</script>
