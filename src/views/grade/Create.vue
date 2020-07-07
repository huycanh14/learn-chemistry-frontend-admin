<template>
    <form @submit.prevent="doCreate">
        <div class="row">
            <div class="col-md-12 col-12 pr-1">
                <div class="form-group">
                    <label>{{ $t('form_grade.title') }} </label>
                    <input type="text" class="form-control" v-bind:placeholder="$t('form_grade.name')" v-model="grade.name" required/>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-md-12 col-12 pr-1">
                <label class="pr-4">{{ $t('form_grade.status') }}:</label> 
                <div class="form-check form-check-inline pr-4">
                    <input class="form-check-input" type="radio" name="activated" v-model="grade.activated" value="true">
                    <label class="form-check-label" for="inlineRadio1">{{ $t('form_grade.active') }}</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="activated" v-model="grade.activated" value="false">
                    <label class="form-check-label" for="inlineRadio2">{{ $t('form_grade.inactive') }}</label>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="update ml-auto mr-auto">
                <button type="submit" class="btn btn-primary btn-round"> {{ $t('form_grade.submit')}}</button>
            </div>
        </div>
    </form>
</template>
<script>

export default {
    data() {
        return {
            grade: {
                name: '',
                activated: true
            }
        }
    },
    methods: {
        doCreate() {
            this.$store.dispatch('grades/createGrade', this.grade).then(response => {
                if(response.status == 200) {
                    this.$toast.success(this.$t('messages.create_success'))
                } else {
                    this.$toast.error(this.$t('messages.create_error'))
                }
            });
        }
    },
}
</script>