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
            ></font-awesome-icon>
        </td>
        <td> 
            <i class="nc-icon nc-simple-remove text-danger" 
                :title="$t('clicks.delete')"
                data-toggle="tooltip" 
                data-placement="right"
            ></i>
        </td>
    </tr>
</template>

<script>
import { mapState } from 'vuex'
import $ from "jquery";
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
            return grades.filter(grade => grade._id === value)[0].name;
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