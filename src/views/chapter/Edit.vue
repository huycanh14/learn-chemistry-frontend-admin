<template>
    <form @submit.prevent="doUpdate">
        <div class="row">
            <div class="col-md-12 col-12 pr-1">
                <div class="form-group">
                    <label>{{ $t('form_chapter.chapter_number') }} </label>
                    <input type="number" class="form-control" v-bind:placeholder="$t('form_chapter.chapter_number')" v-model="chapter.chapter_number" required min="1"/>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 col-12 pr-1">
                <div class="form-group">
                    <label>{{ $t('form_chapter.title_update') }} </label>
                    <input type="text" class="form-control" v-bind:placeholder="$t('form_chapter.title_update')" v-model="chapter.title" required/>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 col-12 pr-1">
                <div class="form-group">
                    <label>{{ $t('form_chapter.description') }} </label>
                    <textarea v-model="chapter.description" class="form-control" v-bind:placeholder="$t('form_chapter.description')" required></textarea>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 col-12 pr-1">
                <label >{{ $t('form_chapter.grade') }}</label>
                <select class="form-control" v-model="chapter.relationships.grade_id"  v-bind:title="$t('form_chapter.grade')" required>
                    <option v-for="grade in grades" :key="grade._id" :value="grade._id" >
                        {{grade.name }}
                    </option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-md-12 col-12 pr-1">
                <label class="pr-4">{{ $t('form_chapter.status') }}:</label> 
                <div class="form-check form-check-inline pr-4">
                    <input class="form-check-input" type="radio" name="activated" v-model="chapter.activated" value="true">
                    <label class="form-check-label" for="inlineRadio1">{{ $t('form_chapter.active') }}</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="activated" v-model="chapter.activated" value="false">
                    <label class="form-check-label" for="inlineRadio2">{{ $t('form_chapter.inactive') }}</label>
                </div>
            </div>  
        </div>
        <div class="row">
            <div class="update ml-auto mr-auto">
                <button type="submit" class="btn btn-primary btn-round"> {{ $t('form_chapter.submit_update')}}</button>
            </div>
        </div>
    </form>
</template>
<script>
import { mapState } from 'vuex'
export default {
    props: {
        payload: {}
    },
    created() {
        this.chapter = { ...this.payload };
    },
    data() {
        return {
            chapter: {
                title: '',
                activated: true,
                chapter_number: 1,
                description: '',
                grade_id: "",
            }
        }
    },
    computed: {
        ...mapState({
            grades: state => state.grades.grades,
        }),
        
    },
    methods: {
        doUpdate() {
            let data = {
                data: []
            }
            this.$store.dispatch('chapters/updateChapter', this.chapter).then(response => {
                if(response.status == 200) {
                    this.$store.commit('chapters/getListChapters', data);
                    this.$toast.success(this.$t('messages.update_success'))
                    this.payload = { ...this.chapter}
                } else {
                    this.$toast.error(this.$t('messages.update_error'))
                }
            });
        }
    },
    beforeCreate(){
        let getInformation = [
            this.$store.dispatch('grades/getListGrades'),
        ];
        Promise.all(getInformation)
        .then(() =>{
        })
        .catch(error => {
            console.error(error, 'error');
        });
    },
    watch: {
        payload(newValue, oldValue) {
            console.log(newValue, oldValue)
        }
    },
}
</script>
<style lang="scss" scoped>
form {
    text-align: left;
}
</style>