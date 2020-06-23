const axios = require('axios');
// const qs = require('querystring');

const getTotalDocuments = () => {
    return axios.get(`${process.env.VUE_APP_URL_API}${process.env.VUE_APP_API}${process.env.VUE_APP_DOCUMENT}`,{
        params: {
            get_count: 1,
        },
    }).then((response) => response).catch((error) => error.response);
}
export const DocumentService = {
    getTotalDocuments
};