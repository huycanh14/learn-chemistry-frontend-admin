<template>
    <div class="search_group row">
        <div class="form-group col-md-4">
            <label for="inputName">{{ $t('form_chapter.name')}}</label>
            <input type="text" name="" class="form-control" :placeholder="$t('form_chapter.name')" v-model="keyword">
        </div>
        <div class="form-group col-md-3">
            <label for="inputName">{{ $t('form_chapter.grade')}}</label>
            <select class="form-control" v-model="grade_id"  v-bind:title="$t('form_chapter.grade')">
                <option value="" > {{$t('form_chapter.all')}} </option>
                <option v-for="grade in grades" :key="grade._id" :value="grade._id" >
                    {{grade.name }}
                </option>
            </select>
        </div>
        <div class="col-md-3 form-group">
            <label for="inputName">{{ $t('form_chapter.status')}}</label>
            <select class="form-control" v-model="activated"  v-bind:title="$t('form_chapter.grade')">
                <option value="" > {{$t('form_chapter.all')}} </option>
                <option value="true" > {{$t('form_chapter.active')}} </option>
                <option value="false" > {{$t('form_chapter.inactive')}} </option>
            </select>
        </div>
        <div class="form-group col-md-2 ">
            <label>&ensp;*</label>
            <button type="button" class="btn-outline-primary form-control" @click="selectChapters">{{$t('btn.search')}}</button>
        </div>
    </div>

</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            keyword: '',
            activated: '',
            grade_id: '',
        }
    },
    computed: {
        ...mapState({
            grades: state => state.grades.grades,
        }),
        
    },
    watch: {
    },
    methods: {
        async selectChapters() {
            this.isLoading = true;
            let updates = [
                this.$store.commit('chapters/updateKeyword', this.keyword),
                this.$store.commit('chapters/updatePage', 1),
                this.$store.commit('chapters/updateGradeId', this.grade_id),
                this.$store.commit('chapters/updateActivated', this.activated),
            ];
            let getInformations = [
                this.$store.dispatch('chapters/getListChapters'),
                this.$store.dispatch('chapters/getTotalPages'),
            ];
            await Promise.all(updates);
            await Promise.all(getInformations)
            .then(() =>{
            })
            .catch(error => {
                console.error(error, 'error');
            });
        }
    },
}
</script>