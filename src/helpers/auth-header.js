const axios = require('axios');

export const AUTH_HEADER = async () => {
    let url = `${process.env.VUE_APP_URL_API}${process.env.VUE_APP_API}${process.env.VUE_APP_ACCOUNT}`;
    axios.interceptors.request.use(
        config => {
            if(config.url === `${url}${process.env.VUE_APP_LOGOPT_ENDPOINT}` && config.method == 'post'){
                config.headers = {
                    'Content-Type': 'application/x-www-form-urlencoded'
                };
            } else if(config.url === `${url}` && config.method == 'post'){
                config.headers = {
                    'Content-Type': 'application/x-www-form-urlencoded'
                };
            } else if(config.url === `${url}${process.env.VUE_APP_TOKEN_ENDPOINT}` && config.method == 'post'){
                config.headers = {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'refresh_token': window.localStorage.getItem("refresh_token")
                };
            } else {
                config.headers = {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'access_token': window.localStorage.getItem("access_token")
                };
            }
          return config;
        },
        error => Promise.reject(error)
    );
}
