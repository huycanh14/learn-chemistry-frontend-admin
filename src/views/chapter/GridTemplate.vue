<template>
    <tr>
        <td> {{ index + 1 }} </td>
        <td> {{ chapter.chapter_number }} </td>
        <td> {{ chapter.title }} </td>
        <td> {{ chapter.relationships.grade_id | filterNameGrade(grades) }} </td>
        <td> {{ chapter.created_at | numberToDate }} </td>
        <td v-if="chapter.activated == true">{{$t('form_grade.active')}}</td>

        <td v-if="chapter.activated == false" >{{$t('form_grade.inactive')}}</td>
        <td>
            <font-awesome-icon 
                :icon="['fas', 'edit']" class="text-info"
                :title="$t('clicks.cancel')"
                data-toggle="tooltip" 
                data-placement="right"
                @click="updateChapter"
            ></font-awesome-icon>
        </td>
        <td> 
            <i class="nc-icon nc-simple-remove text-danger" 
                :title="$t('clicks.delete')"
                data-toggle="tooltip" 
                data-placement="right"
                @click="deleteItem"
            ></i>
        </td>
    </tr>
</template>

<script>
import { mapState } from 'vuex'
import $ from "jquery";
import i18n from '../../helpers/i18n'
import store from '../../store'
import Edit from "./Edit.vue"
import Vue from "vue";
export default {
    props: {
        payload: {
        },
        index: {}
    },
    data() {
        return {
            edit: false,
            chapter: {},
        }
    },
    created() {
        this.chapter = { ...this.payload };
    },
    computed: {
        ...mapState({
            grades: state => state.grades.grades,
        }),
    },
    filters: {
        filterNameGrade: function(value, grades) {
            if(grades.length > 0){
                let name = grades.filter(grade => grade._id === value)[0];
                if(name) return name.name;
            }
            return value;
        },
        numberToDate: function(value) {
            return `${new Date(value).toLocaleString().split(',')[1]} - ${new Date(value).toLocaleString().split(',')[0]}`;
        },

    },
    mounted() {
        $(document).ready(function ($) {
            $(function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('[title]').tooltip();
            })
        })
    },
    methods: {
        updateChapter() {
            let instance = null;
            let res = this.payload;
            this.$swal({
                title: this.$t('form_chapter.title_update'),
                html: '<div id="updateChapter"></div>',
                showConfirmButton: false,
                onBeforeOpen: () => {
                    let ComponentClass = Vue.extend(Edit);
                    instance = new ComponentClass({
                        propsData: {
                            payload: res
                        },
                        i18n,
                        store,
                    });
                    instance.$mount();
                    document.getElementById('updateChapter').appendChild(instance.$el);
                }   
            })
        },
        deleteItem(){
            this.$swal({
                title: `${this.$t('title_delete.title')}: ${this.payload.title}`,
                icon: 'warning', showCancelButton: true, confirmButtonText: this.$t('title_delete.btn_conform'), cancelButtonText: this.$t('title_delete.btn_cancel'), showCloseButton: true,
            }).then((result) => {
                if(result.value) {
                    this.$store.dispatch('chapters/countInRelationships', this.payload._id)
                    .then(total => {
                        if(total > 0) {
                            this.$swal({
                                title: `${this.payload.title}: ${this.$t('title_delete.title_relationship')} `, text: `Total: ${total}`, icon: 'warning', showCancelButton: true, confirmButtonText: this.$t('title_delete.btn_conform'),
                                cancelButtonText: this.$t('title_delete.btn_cancel'), showCloseButton: true,
                            }).then((res) => {
                                if(res.value) {
                                    this.$store.dispatch('chapters/deleteChapter', this.payload._id).then(response => {
                                        if(response.status == 200) {
                                            this.$toast.success(this.$t('messages.delete_success'))
                                        } else {
                                            this.$toast.error(this.$t('messages.delete_error'))
                                        }
                                    });
                                }
                            })
                        } else {
                            this.$store.dispatch('chapters/deleteChapter', this.payload._id).then(response => {
                                if(response.status == 200) {
                                    this.$toast.success(this.$t('messages.delete_success'))
                                } else {
                                    this.$toast.error(this.$t('messages.delete_error'))
                                }
                            });
                        }
                    });
                }
            });
        }
    },
}
</script>
<style lang="scss" scoped>
i{
    font-size:32px;
    cursor: pointer;
}
svg{
    font-size:26px;
    cursor: pointer;
}
</style>