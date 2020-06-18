import { AccountService } from '../services/account.service';

const state = {
    information_login: {
        username: '',
        password: ''
    },
    account: {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        date_of_birth: '',
        gender: '',
        password: '',
        role_id: '',
        activated: '',
    }

};

const getters = {
    value: state => {
        return state.value;
    }
};

const mutations = {
    // updateValue(state, payload) {
    //     state.value = payload;
    // }
    saveInformationLogin(state, data){
        state.information_login = {
            username: data.username,
            password: data.password
        }
    },

    signIn(state){
        AccountService.signIn(state.information_login)
        .then((response) => {
            console.log(response);
        }).catch((error)=>{
            console.log(error);
        });
        
    }
}

const actions = {
    signIn({commit}) {
        commit('signIn');
    },
    saveInformationLogin({commit}, payload){
        commit('saveInformationLogin', payload);
    }

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}