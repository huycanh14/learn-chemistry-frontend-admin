import { ChapterService } from '../services/chapter.service';
import { TOTAL_IN_RELATIONSHIPS } from '../helpers/helper'

var state = {
    count: 0,
    chapter: {
    },
    pages: 1,
    chapters: [],
    keyword: '',
    page: 1,
    grade_id: "",
    activated: "",
    loading: true
};

var getters = {

};

var mutations = {
    getTotalChapters(state, data){
        state.count = data.count;
    },

    getListChapters(state, data){
        state.loading = false;
        state.chapters = [...data.data];
    },
    
    getTotalPages(state, data){
        state.pages = Math.ceil(data.count/10);
    },

    updatePage(state, data){
        state.page = data;
    },

    updateKeyword(state, data){
        state.keyword = data;
    },
    
    updateGradeId(state, data){
        state.grade_id = data;
    },

    updateActivated(state, data){
        state.activated = data;
    },

    updateLoading(state, data){
        state.loading = data;
    },

    updateChapter(state, data){
        state.chapter = data.data;
    }
}

var actions = {
    getTotalChapters({commit}){
        return ChapterService.getTotalChapters().then(response => {
            if (response.status === 200)
                commit('getTotalChapters', response.date)
            return response;
        }).catch(err => err.message);
    },

    getListChapters({commit, state}){
        commit('updateLoading', true);
        let payload = {
            page: state.page
        }
        if(state.keyword != '') payload.key_word = state.keyword;
        if(state.activated != '') payload.activated = state.activated;
        if(state.grade_id != '') payload.grade_id = state.grade_id;
        ChapterService.getListChapters(payload).then(response => {
            if(response.status === 200)
                commit('getListChapters', response.data);
            return response;
        }).catch(error => error.response);
    },

    createChapter({dispatch}, payload){
        return ChapterService.createChapter(payload).then((response) => {
            if(response.status === 200)
                dispatch('getListChapters');
            return response;
        }).catch((error) => error.response);
    },

    updateChapter({dispatch}, payload){
        return ChapterService.updateChapter(payload).then((response) => {
            dispatch('getListChapters');
            return response;
        }).catch((error) => error.response);
    },

    deleteChapter({dispatch}, _id){
        return ChapterService.deleteChapter(_id).then((response) => {
            if(response.status === 200)
                dispatch('getListChapters');
            return response;
        }).catch((error) => error.response);
    },

    countInRelationships({dispatch}, _id) {
        return ChapterService.countInRelationships(_id).then((response) => {
            if(response.status === 200) {
                let total = TOTAL_IN_RELATIONSHIPS(response.data.data);
                return total;
            }
            dispatch('getListChapters');
            return response;
        }).catch((error) => error.response);
    }, 

    getTotalPages({commit, state}){
        let payload = {
            get_count: 1,
        }
        if(state.keyword !== '') payload.key_word = state.keyword;
        if(state.activated !== '') payload.activated = state.activated;
        if(state.grade_id != '') payload.grade_id = state.grade_id;
        return ChapterService.getTotalPages(payload).then((response) => {
            if(response.status === 200) {
                commit('getTotalPages', response.data)
            }
            return response;
        }).catch((error) => error.response);
    },

    getChapterByID({commit}, _id){
        return ChapterService.getChapterByID(_id).then(response => {
            if(response.status === 200) {
                commit('updateChapter', response.data)
            }
            return response;
        }).catch((error) => error.response);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}