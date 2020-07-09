import { LessonService } from '../services/lesson.service';
import { TOTAL_IN_RELATIONSHIPS } from '../helpers/helper'

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
    },

    deleteLesson({dispatch}, _id){
        return LessonService.deleteLesson(_id).then((response) => {
            if(response.status === 200)
                dispatch('getAllLessonByChapterID');
            return response;
        }).catch((error) => error.response);
    },

    countInRelationships({dispatch}, _id) {
        return LessonService.countInRelationships(_id).then((response) => {
            if(response.status === 200) {
                let total = TOTAL_IN_RELATIONSHIPS(response.data.data);
                return total;
            }
            dispatch('getAllLessonByChapterID');
            return response;
        }).catch((error) => error.response);
    }, 
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}