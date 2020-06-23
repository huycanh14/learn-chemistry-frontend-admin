import { ChapterService } from '../services/chapter.service';

var state = {
    count: 0,
    chapter: {

    },
    chapters: []
};

var getters = {

};

var mutations = {
    getTotalChapters(state, data){
        state.count = data.count;
    }
}

var actions = {
    getTotalChapters({commit}){
        return ChapterService.getTotalChapters().then(response => {
            if (response.status === 200)
                commit('getTotalChapters', response.date)
            return response;
        }).catch(err => err.message);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}