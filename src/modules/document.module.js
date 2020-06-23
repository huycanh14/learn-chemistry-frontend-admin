import { DocumentService } from '../services/document.service';

var state = {
    count: 0,
    document: {

    },
    documents: []
};

var getters = {

};

var mutations = {
    getTotalDocuments(state, data){
        state.count = data.count;
    }
}

var actions = {
    getTotalDocuments({commit}){
        return DocumentService.getTotalDocuments().then(response => {
            if (response.status === 200)
                commit('getTotalDocuments', response.date)
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