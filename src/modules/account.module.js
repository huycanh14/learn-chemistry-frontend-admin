import { AccountService } from '../services/account.service';
import router from '../router'

var state = {
    count: 0,
    information_login: {
        username: window.localStorage.getItem("username") ? window.localStorage.getItem("username") :'',
        password: window.localStorage.getItem("password") ? window.localStorage.getItem("password") :''
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
    },
    accounts: [],
};

var getters = {
    value: state => {
        return state.value;
    }
};

var mutations = {
    saveInformationLogin(state, data){
        state.information_login = {
            username: data.username,
            password: data.password
        };
        window.localStorage.setItem('username',data.username);
        window.localStorage.setItem('password',data.password);
    },

    saveInfoAccount(state, data){
        state.account = data;
    },

    getListAccounts(state, data){
        state.accounts = data;
    },

    signOut(state) {
        state.account = {
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            date_of_birth: '',
            gender: '',
            password: '',
            role_id: '',
            activated: '',
        };
    },

    getTotalAccounts(state, data){
        state.count = data.count;
    }
}

var actions = {
    async signIn({commit, dispatch}) {
        return await AccountService.signIn({username: state.information_login.username, password: state.information_login.password })
        .then((response) => {
            window.localStorage.setItem("refresh_token",response.data.refresh_token);
            commit('saveInfoAccount', response.data);
            if(response.status == 200){
                return dispatch('createToken');
            }
            return response;
        }).catch((error)=>{
            return error;
        });
    },

    createToken() {
        return AccountService.createToken()
        .then(response => {
            if(response.status == 200)
                window.localStorage.setItem("access_token",response.data.access_token);
            return response;
        }).catch(error => {
            return error
        });
    },

    saveInformationLogin({commit}, payload){
        commit('saveInformationLogin', payload);
    },

    getListAccounts({commit}, payload){
        return AccountService.getListAccounts(payload.page)
        .then(response => {
            if(response.status == 200)
                commit('getListAccounts', response.data);
            return response;
        }).catch(error => {
            return error;
        })
    },
    
    signOut({commit}){
        window.localStorage.clear();
        commit('signOut');
        router.go({name: "Login"});
    },

    getTotalAccounts({commit}){
        return AccountService.getTotalAccounts().then(response => {
            if(response.status === 200)
                commit('getTotalAccounts', response.data);
            return response;
        }).catch(error => error.message);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}