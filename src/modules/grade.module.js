import { GradeService } from '../services/grade.service'

var state = {
    count: 0,
    grade: {

    },
    grades: []
};

var getters = {
    value: state => {
        return state.value;
    }
};

var mutations = {
    getTotalGrades(state, data){
        state.count = data.count;
    },
};

var actions = {
    getTotalGrades({commit}){
        GradeService.getTotalGrades().then(response => {
            if(response.status == 200)
                commit('getTotalGrades', response.data);
            return response;
        }).catch(error => {
            return error;
        });
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}