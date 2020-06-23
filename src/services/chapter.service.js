const axios = require('axios');
// const qs = require('querystring');

const getTotalChapters = () => {
    return axios.get(`${process.env.VUE_APP_URL_API}${process.env.VUE_APP_API}${process.env.VUE_APP_CHAPTER}`,{
        params: {
            get_count: 1,
        },
    }).then((response) => response).catch((error) => error.response);
}
export const ChapterService = {
    getTotalChapters
};