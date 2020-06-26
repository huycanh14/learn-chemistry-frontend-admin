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

    getListGrades(state, data){
        state.grades = data.data;
    },

    updateValue(state, payload){
        state.grade = payload.grade;
    }
};

var actions = {
    getTotalGrades({commit}){
        GradeService.getTotalGrades().then(response => {
            if(response.status === 200)
                commit('getTotalGrades', response.data);
            return response;
        }).catch(error => {
            return error;
        });
    },

    getListGrades({commit}){
        GradeService.getListGrades().then(response => {
            if(response.status === 200)
                commit('getListGrades', response.data);
            return response;
        }).catch(error => error.response);
    },

    createGrade({dispatch}, payload){
        return GradeService.createGrade({name: payload.name, activated: payload.activated}).then((response) => {
            if(response.status === 200)
                dispatch('getListGrades');
            return response;
        }).catch((error) => error.response);
    },

    updateGrade({dispatch}, payload){
        console.log(payload);
        return GradeService.updateGrade(payload).then((response) => {
            if(response.status === 200)
                dispatch('getListGrades');
            return response;
        }).catch((error) => error.response);
    },

    deleteGrade({dispatch}, _id){
        return GradeService.deleteGrade(_id).then((response) => {
            if(response.status === 200)
                dispatch('getListGrades');
            return response;
        }).catch((error) => error.response);
    },

} 

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}