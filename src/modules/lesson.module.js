import { LessonService } from '../services/lesson.service';

var state = {
    lesson: {
    },
    lessons: [],
    chapter_id: "",

};

var getters = {

};

var mutations = {
    updateLessons(state, data){
        state.lessons = data.data;
    },

    saveChapterID(state, data){
        state.chapter_id = data;
    }
};

var actions = {
    getAllLessonByChapterID ({commit, state}) {
        return LessonService.getAllLessonByChapterID(state.chapter_id).then((response) => {
            if(response.status === 200)
                commit('updateLessons', response.data);
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