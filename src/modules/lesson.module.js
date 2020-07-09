import { LessonService } from '../services/lesson.service';

var state = {
    lesson: {
    },
    lessons: [],
    chapter_id: "",
    loading: true
};

var getters = {

};

var mutations = {
    getLessons(state, data){
        state.loading = false;
        state.lessons = data.data;
    },

    saveChapterID(state, data){
        state.chapter_id = data;
    },

    updateLoading(state, data){
        state.loading = data;
    },
};

var actions = {
    getAllLessonByChapterID ({commit, state}) {
        commit('updateLoading', true);
        return LessonService.getAllLessonByChapterID(state.chapter_id).then((response) => {
            if(response.status === 200)
                commit('getLessons', response.data);
            return response;
        }).catch((error) => error.response);
    },

    createLesson({dispatch}, payload) {
        return LessonService.createLesson(payload).then((response) => {
            if(response.status === 200){
                dispatch('getAllLessonByChapterID')
            }
            return response;
        }).catch(err => err.message);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}