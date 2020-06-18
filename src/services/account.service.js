const axios = require('axios');

const signIn = ({username, password}) => {
    let data = {
        username: username,
        password: password
    };
    return axios.post(`${process.env.VUE_APP_URL_API}${process.env.VUE_APP_API}${process.env.VUE_APP_ACCOUNT}${process.env.VUE_APP_LOGOPT_ENDPOINT}`, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
    })
      .then((response) => {
          return response;
      })
      .catch((error) => {
          return error.response;
      });
};

const createToken = () => {
    return axios.post('/user', {}, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'refresh_token': window.localStorage.getItem("refresh_token")
        }
    }).then((response) => {
          return response;
    }).catch((error) => {
          return error;
    });
}

export const AccountService = {
    signIn, createToken
};