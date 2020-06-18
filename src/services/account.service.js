const axios = require('axios');

const signIn = ({username, password}) => {
    let data = {
        username: username,
        password: password
    };
    axios.post(`${process.env.URL_API}${process.env.API}${process.env.ACCOUNT}${process.env.LOGOPT_ENDPOINT}`, data)
      .then((response) => {
          return response;
      })
      .catch((error) => {
          return error;
      });
};

const createToken = () => {
    axios.post('/user', {}, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
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