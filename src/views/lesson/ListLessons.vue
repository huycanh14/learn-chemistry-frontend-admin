<template>
    <div>
        <loading :active.sync="isLoading" 
            :can-cancel="false" 
            :is-full-page="fullPage"
            :color="color"
            :background-color="background_color"
            :height="155"
            :width="155">
        </loading>
        <div class="card text-center _card text-white">
            <div class="card-header">
                <h3>
                    {{ chapter.title }}
                    <i class="nc-icon nc-simple-add float-right text-danger" data-toggle="tooltip" data-placement="left" 
                        v-bind:title="$t('lesson.hover_add')" @click="createLesson">
                    </i>
                </h3>
            </div>
            <div class="card-body">
                <blockquote class="blockquote mb-0">
                    <p>{{chapter.description}}</p>
                    <footer class="blockquote-footer  text-white">List of lessons. Count:  
                        <cite title="Source Title"> {{ lessons.length }} </cite>
                    </footer>
                </blockquote>
            </div>
        </div>
        <div class="row">
            <card-list-lesson v-for="lesson in lessons" :key="lesson._id" :payload="lesson"></card-list-lesson>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import CardListLesson from './CardListLesson.vue'
import Create from './Create.vue'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import $ from "jquery";
import Vue from "vue";
import i18n from '../../helpers/i18n'
import store from '../../store'
export default {
    components: {
        CardListLesson, Loading
    },
    data() {
        return {
            fullPage: false,
            background_color: "#4B4B4B",
            color: "#00AB00",
        }
    },
    computed: {
        ...mapState({
            lessons: state => state.lessons.lessons,
            chapter: state => state.chapters.chapter,
            isLoading: state => state.lessons.loading,
        }),
    },
    created() {
        let getInfo = [
            this.saveChapterID(this.$route.params.id),
            this.getLessonsByChapterID(),
            this.getChapterByID(this.$route.params.id)
        ];
        Promise.all(getInfo)
        .then(() =>{
        })
        .catch(error => {
            console.error(error, 'error');
        });
        
    },
    methods: {
        ...mapActions({
            getLessonsByChapterID: 'lessons/getAllLessonByChapterID',
            getChapterByID: 'chapters/getChapterByID'
        }),
        ...mapMutations({
            saveChapterID: 'lessons/saveChapterID'
        }),
        createLesson(){
           let instance = null;
            this.$swal({
                title: this.$t('lesson.title_create'),
                html: '<div id="CreateLesson"></div>',
                showConfirmButton: false,
                onBeforeOpen: () => {
                    let ComponentClass = Vue.extend(Create);
                    instance = new ComponentClass({
                        propsData: {
                        },
                        i18n,
                        store
                    });
                    instance.$mount();
                    document.getElementById('CreateLesson').appendChild(instance.$el);
                }   
            }) 
        }
    },
    watch: {
        
    },
    mounted() {
        $(document).ready(function ($) {
            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            })
        })
    },
};
</script>
<style lang="scss" scrop>
._card{
    background: rgba(179,220,237,1);
    background: -moz-linear-gradient(left, rgba(179,220,237,1) 0%, rgba(41,184,229,1) 50%, rgba(188,224,238,1) 100%);
    background: -webkit-gradient(left top, right top, color-stop(0%, rgba(179,220,237,1)), color-stop(50%, rgba(41,184,229,1)), color-stop(100%, rgba(188,224,238,1)));
    background: -webkit-linear-gradient(left, rgba(179,220,237,1) 0%, rgba(41,184,229,1) 50%, rgba(188,224,238,1) 100%);
    background: -o-linear-gradient(left, rgba(179,220,237,1) 0%, rgba(41,184,229,1) 50%, rgba(188,224,238,1) 100%);
    background: -ms-linear-gradient(left, rgba(179,220,237,1) 0%, rgba(41,184,229,1) 50%, rgba(188,224,238,1) 100%);
    background: linear-gradient(to right, rgba(179,220,237,1) 0%, rgba(41,184,229,1) 50%, rgba(188,224,238,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#b3dced', endColorstr='#bce0ee', GradientType=1 );
}
h3>i {
    cursor: pointer;
    font-size: 40px;
    font-weight: bolder;
    right: 30px;
}
</style>