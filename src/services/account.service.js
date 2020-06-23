const axios = require('axios');
const qs = require('querystring');

const signIn = ({username, password}) => {
    let data = {
        username: username,
        email: username,
        password: password
    };  
    return axios.post(`${process.env.VUE_APP_URL_API}${process.env.VUE_APP_API}${process.env.VUE_APP_ACCOUNT}${process.env.VUE_APP_LOGOPT_ENDPOINT}`, qs.stringify(data)).then((response) => response).catch((error) => error.response);
};

const createToken = () => {
    return axios.post(`${process.env.VUE_APP_URL_API}${process.env.VUE_APP_API}${process.env.VUE_APP_ACCOUNT}${process.env.VUE_APP_TOKEN_ENDPOINT}`).then((response) => response).catch((error) => error.response);
}

const getListAccounts = (page=1) => {
    return axios.get(`${process.env.VUE_APP_URL_API}${process.env.VUE_APP_API}${process.env.VUE_APP_ACCOUNT}`,
    {
        params: {
            page: page,
        },
    }).then((response) => response).catch((error) => error.response);
}

const getTotalAccounts = () => {
    return axios.get(`${process.env.VUE_APP_URL_API}${process.env.VUE_APP_API}${process.env.VUE_APP_ACCOUNT}`,
    {
        params: {
            get_count: 1,
        },
    }).then((response) => response).catch((error) => error.response);
}

export const AccountService = {
    signIn, createToken, getListAccounts, getTotalAccounts
};