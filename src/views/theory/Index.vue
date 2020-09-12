<template>
    <div>
        <v-icon x-large color="blue darken-2" 
           
            data-toggle="tooltip" 
            data-placement="right" 
            @click="show = true"
            v-if="show==false"
        > mdi-database-plus</v-icon> 
        <!-- :title="$t('theory.title_create')" -->
        <v-expand-x-transition>
            <create @message-form-create="notShowForm" v-if="show == true"></create>
        </v-expand-x-transition>

    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Create from './Create.vue'
import $ from 'jquery'
export default {
    components: {
        Create,
    },
    data() {
        return {
            show: false,
        }
    },
    computed: {
        ...mapState({
            theories: state => state.theories.theories
        })
    },
    created () {
        
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
        ...mapActions({
            getTheoriesByLessonId: 'theories/getTheoriesByLessonId'
        }),
        notShowForm(){
            this.show = false;
        }
    },
}
</script>

<style scoped>
i{
    font-size:26px;
    cursor: pointer;
}
</style>