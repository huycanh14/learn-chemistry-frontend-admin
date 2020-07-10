<template>
    <v-card color="basil">
        <loading :active.sync="isLoading" 
            :can-cancel="false" 
            :is-full-page="fullPage"
            :color="color"
            :background-color="background_color"
            :height="155"
            :width="155">
        </loading>
        <v-card-title class="text-center justify-center py-6">
            <h1 class="font-weight-bold display-3 basil--text">{{ lesson.title }}</h1>
        </v-card-title>
        <v-tabs
            v-model="tab"
            background-color="transparent"
            color="basil"
            grow
        >
            <v-tab
                    v-for="item in items"
                    :key="item"
            >
                    {{ item }}
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item>
                <v-card  color="basil" flat >
                    <v-card-text>
                        <edit></edit>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card  color="basil" flat >
                    <v-card-text>
                        <theory></theory>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card  color="basil" flat >
                    <v-card-text>
                        <type-of-lesson></type-of-lesson>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card  color="basil" flat >
                    <v-card-text>
                        <question-of-lesson></question-of-lesson>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { mapState, mapActions } from 'vuex'
import QuestionOfLesson from '../question/QuestionOfLesson.vue'
import Edit from './Edit.vue'
import TypeOfLesson from '../type_of_lesson/Index.vue'
import Theory from '../theory/Index.vue'
export default {
    components: {
        QuestionOfLesson, Edit, TypeOfLesson, Theory, Loading

    },
    data() {
        return {
            tab: null,
            items: [
                this.$t('lesson.title_tab.tab_detail'),
                this.$t('lesson.title_tab.tab_theory'),
                this.$t('lesson.title_tab.tab_type_of_lesson'),
                this.$t('lesson.title_tab.tab_exercise'),
            ],
            fullPage: false,
            background_color: "#4B4B4B",
            color: "#00AB00",
        }
    },
    computed: {
        ...mapState({
            lesson: state => state.lessons.lesson,
            isLoading: state => state.lessons.loading,
        })
    },
    created() {
        let getInfo = [
            this.getLessonByID(this.$route.params.id)
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
            getLessonByID: 'lessons/getLessonByID'
        })
    },
}
</script>

<style scoped>

</style>
