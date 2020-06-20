const axios = require('axios');
import store from '../store'

export const CHECK_TOKEN = async() => {
    axios.interceptors.response.use(response => response
    , error => {
        const status = error.response ? error.response.status : null;
        if (status === 401 && error.response.data.accessTokenLife === false) {
            // will loop if access_token returns 401
            store.dispatch('accounts/createToken');
            return axios.request(error.config);  
        } else if (status === 400 && error.response.data.refreshTokenLife === false) {
            // will loop if refresh_token returns 404
            let store_refresh_token = store.state['accounts']["account"].refresh_token;
            let window_refresh_token = window.localStorage.getItem("refresh_token");
            if(store_refresh_token === window_refresh_token && store_refresh_token && window_refresh_token){
                store.dispatch('accounts/createToken');
                return axios.request(error.config);
            } else {
                return store.dispatch('accounts/signOut');
            }
        } 
    
        return Promise.reject(error);
    });
}