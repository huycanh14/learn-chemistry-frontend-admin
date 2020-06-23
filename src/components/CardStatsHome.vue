<template>
    <div class="col-lg-3 col-md-6 col-sm-6">
    <div class="card card-stats">
        <div class="card-body ">
        <div class="row">
            <div class="col-5 col-md-4">
            <div class="icon-big text-center icon-warning">
                <i :class="icon"></i>
            </div>
            </div>
            <div class="col-7 col-md-8">
            <div class="numbers">
                <p class="card-category">{{title}}</p>
                <p class="card-title">{{number}}</p>
                <p></p>
            </div>
            </div>
        </div>
        </div>
        <div class="card-footer ">
        <hr />
        <div class="stats">
            <i class="fa fa-calendar-o"></i>
            Last day
        </div>
        </div>
    </div>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ""
        },
        number: {
            type: Number,
            default: 0
        },
        icon: {
            type: String,
        }
    },
}
</script>
