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
    saveInformationLogin(state, data){
        state.information_login = {
            username: data.username,
            password: data.password
        }
    },

    saveInfoAccount(state){
        state
    }
}

const actions = {
    async signIn({commit, dispatch}) {
        return await AccountService.signIn(state.information_login)
        .then((response) => {
            window.localStorage.setItem("refresh_token",response.data.refresh_token);
            commit('saveInfoAccount', response.data);
            if(response.status == 200){
                return dispatch('createToken');
            }
            return   response;
        }).catch((error)=>{
            return error;
        });
    },

    createToken() {
        return AccountService.createToken()
        .then(response => {
            window.localStorage.setItem("access_token",response.data.access_token);
            return response;
        }).catch(error => {
            return error
        });
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