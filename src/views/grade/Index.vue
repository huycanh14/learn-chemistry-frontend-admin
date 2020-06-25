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
                    {{$t('table_grade.title')}}
                    <i class="nc-icon nc-simple-add float-right text-danger" data-toggle="tooltip" data-placement="left" 
                        v-bind:title="$t('table_grade.hover')" @click="createGrade">
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
                        <th class="text-right">
                            {{$t('table_grade.action')}}
                        </th>
                    </thead>
                    <tbody>
                        <tr v-for="(grade, index) in grades" :key="grade._id">
                            <td> {{index + 1}} </td>
                            <td>{{grade.name}} </td>
                            <td>{{grade.created_at | numberToDate}}</td>
                            <td>{{grade.updated_at | numberToDate}}</td>
                            <td v-if="grade.activated == true">{{$t('form_grade.active')}}</td>
                            <td v-if="grade.activated == false">{{$t('form_grade.inactive')}}</td>
                            <td class="text-right"> $36,738 </td>
                        </tr>
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
import $ from "jquery";
import Vue from "vue";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import i18n from '../../helpers/i18n'
import store from '../../store'

export default {
    components: {
        Loading
    },
    data() {
        return {
            isLoading: true,
            fullPage: false,
            background_color: "#4B4B4B",
            color: "#00AB00",
            title: [
                { name: this.$t('table_grade.o_number') },
                { name: this.$t('table_grade.name') },
                { name: this.$t('table_grade.created_at') },
                { name: this.$t('table_grade.updated_at') },
                { name: this.$t('table_grade.actived') },
            ],
        }
    },
    methods: {
        createGrade() {
            let instance = null;
            this.$swal({
                html: '<div id="CreateGrade"></div>',
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
                    document.getElementById('CreateGrade').appendChild(instance.$el);
                }   
            })
        }
    },
    computed: {
        ...mapState({
            grades: state => state.grades.grades,
        }),
    },
    beforeCreate() {
        let getTotals = [
            this.$store.dispatch('grades/getListGrades')
        ];
        Promise.all(getTotals)
        .then(() =>{
            this.isLoading = false;
        })
        .catch(error => {
            console.error(error, 'error');
            this.isLoading = false;
        });
        
    },
    mounted() {
        $(document).ready(function ($) {
            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            })
        })
    },
    filters: {
        numberToDate: function(value) {
            return `${new Date(value).toLocaleString().split(',')[1]} - ${new Date(value).toLocaleString().split(',')[0]}`;
            // return new Date(value).toLocaleString().split(',')[1];
            // return new Date(value).format('MMM D, YYYY');
        },

    }
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