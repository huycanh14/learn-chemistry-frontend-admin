import { ChapterService } from '../services/chapter.service';
import { TOTAL_IN_RELATIONSHIPS } from '../helpers/helper'

var state = {
    count: 0,
    chapter: {
    },
    total_page: 1,
    chapters: [],
    keyword: '',
    page: 1,
    grade_id: ""
};

var getters = {

};

var mutations = {
    getTotalChapters(state, data){
        state.count = data.count;
    },

    getListChapters(state, data){
        state.chapters = data.data;
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

    getListChapters({commit}){
        ChapterService.getListChapters().then(response => {
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
            if(response.status === 200)
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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}