const axios = require('axios');
import store from '../store';

export const CHECK_TOKEN = async() => {
    axios.interceptors.response.use(response => response
    , error => {
        const status = error.response ? error.response.status : null;
        let window_refresh_token = window.localStorage.getItem("refresh_token");
        if (status === 401 && error.response.data.accessTokenLife === false) {
            // will loop if access_token returns 401
            store.dispatch('accounts/createToken').then((data) => {
                if(data.status === 200) return axios.request(error.config);
            }).catch(error => console.error(error.message));
        } else if (status === 400 && error.response.data.refreshTokenLife === false) {
            // will loop if refresh_token => login again
            if(window_refresh_token && window_refresh_token !== undefined){
                return store.dispatch('accounts/signIn');
            } else {
                return store.dispatch('accounts/signOut');
            }    
        } else if (status === 403) {
            // will loop if refresh_token => login again
            if(window_refresh_token && window_refresh_token !== undefined){
                return store.dispatch('accounts/signIn');
            } else {
                return store.dispatch('accounts/signOut');
            } 
        }
    
        return Promise.reject(error);
    });
}