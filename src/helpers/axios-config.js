const axios = require('axios');
import store from '../store';

export const CHECK_TOKEN = async() => {
    axios.interceptors.response.use(response => response
    , error => {
        const status = error.response ? error.response.status : null;
        let store_refresh_token = store.state['accounts']["account"].refresh_token;
        let window_refresh_token = window.localStorage.getItem("refresh_token");
        if (status === 401 && error.response.data.accessTokenLife === false) {
            // will loop if access_token returns 401
            Promise(store.dispatch('accounts/createToken')).then(() => axios.request(error.config));
            // return axios.request(error.config);  
        } else if (status === 400 && error.response.data.refreshTokenLife === false) {
            // will loop if refresh_token => login again
            if(store_refresh_token == window_refresh_token){
                Promise(store.dispatch('accounts/signIn')).then(() => {
                    return axios.request(error.config);
                });
            } else {
                return store.dispatch('accounts/signOut');
            }    
        } else if (status === 403) {
            if(store_refresh_token == window_refresh_token){
                Promise(store.dispatch('accounts/signIn')).then(() => {
                    return axios.request(error.config);
                });
            } else {
                return store.dispatch('accounts/signOut');
            } 
        }
    
        return Promise.reject(error);
    });
}