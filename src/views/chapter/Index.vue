<template>
    <div class="row">
        <loading :active.sync="isLoading" 
            :can-cancel="false" 
            :is-full-page="fullPage"
            :color="color"
            :background-color="background_color"
            :height="155"
            :width="155">
        </loading>
        <div class="col-md-12">
            <div class="card">
            <div class="card-header">
                <h4 class="card-title">
                    {{$t('table_chapter.title')}}
                    <i class="nc-icon nc-simple-add float-right text-danger" data-toggle="tooltip" data-placement="left" 
                        v-bind:title="$t('table_chapter.hover')" @click="createChapter">
                    </i>
                </h4>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                <table class="table">
                    <thead class=" text-primary">
                        <th v-for="(item, index) in title" :key="index">
                            {{ item.name }}
                        </th>
                        <th class="text-right" colspan="2">
                            {{$t('table_chapter.action')}}
                        </th>
                    </thead>
                    <tbody>
                        <!-- <grid-template 
                            v-for="(chapter, index) in chapters" 
                            :key="chapter._id" 
                            :payload="chapter" 
                            :index="index">
                        </grid-template> -->
                    </tbody>
                </table>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import Create from "./Create.vue"
// import GridTemplate from "./GridTemplate.vue"
import $ from "jquery";
import Vue from "vue";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import i18n from '../../helpers/i18n'
import store from '../../store'

export default {
    components: {
        Loading, //GridTemplate
    },
    data() {
        return {
            isLoading: true,
            // isLoading: false,
            fullPage: false,
            background_color: "#4B4B4B",
            color: "#00AB00",
            title: [
                { name: this.$t('table_chapter.o_number') },
                { name: this.$t('table_chapter.name') },
                { name: this.$t('table_chapter.created_at') },
                { name: this.$t('table_chapter.updated_at') },
                { name: this.$t('table_chapter.actived') },
            ],
        }
    },
    methods: {
        createChapter() {
            let instance = null;
            this.$swal({
                title: this.$t('form_chapter.title'),
                html: '<div id="CreateChapter"></div>',
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
                    document.getElementById('CreateChapter').appendChild(instance.$el);
                }   
            })
        },
    },
    computed: {
        ...mapState({
            chapters: state => state.chapters.chapters,
        }),
    },
    beforeCreate() {
        let getTotals = [
            // this.$store.dispatch('chapters/getListChapters'),
            this.$store.dispatch('chapters/getListChapters')
        ];
        Promise.all(getTotals)
        .then(() =>{
            this.isLoading = false;
        })
        .catch(error => {
            console.error(error, 'error');
            this.isLoading = false;
        });
        // this.isLoading = false;
    },
    mounted() {
        $(document).ready(function ($) {
            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            })
        })
    },
}
</script>
<style scoped>
h4>i {
    cursor: pointer;
    font-size: 40px;
    font-weight: bolder;
    right: 30px;
}
</style>