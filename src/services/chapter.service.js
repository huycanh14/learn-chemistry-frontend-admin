const axios = require('axios');
const qs = require('querystring');

const getTotalChapters = () => {
    return axios.get(`${process.env.VUE_APP_URL_API}${process.env.VUE_APP_API}${process.env.VUE_APP_CHAPTER}`,{
        params: {
            get_count: 1,
        },
    }).then((response) => response).catch((error) => error.response);
}

const getListChapters = () => {
    return axios.get(`${process.env.VUE_APP_URL_API}${process.env.VUE_APP_API}${process.env.VUE_APP_CHAPTER}`,{
        params: {
            page: 1,
        },
    }).then((response) => response).catch((error) => error.response);
};

const createChapter = (payload) => {
    let data = {
        title: payload.title,
        chapter_number: parseInt(payload.chapter_number),
        description: payload.description,
        grade_id: payload.grade_id,
        activated: payload.activated
    };
    return axios.post(`${process.env.VUE_APP_URL_API}${process.env.VUE_APP_API}${process.env.VUE_APP_CHAPTER}`, 
        qs.stringify(data)
    ).then((response) => response).catch((error) => error.response);

};

const updateChapter = (payload) => {
    let data = {
        name: payload.name,
        activated: payload.activated
    };
    return axios.put(`${process.env.VUE_APP_URL_API}${process.env.VUE_APP_API}${process.env.VUE_APP_CHAPTER}/${payload._id}`, 
        qs.stringify(data)
    ).then((response) => response).catch((error) => error.response);

};

const deleteChapter = (_id) => {
    return axios.delete(`${process.env.VUE_APP_URL_API}${process.env.VUE_APP_API}${process.env.VUE_APP_CHAPTER}/${_id}`,
    ).then((response) => response).catch((error) => error.response);

};

const countInRelationships = (_id) => {
    return axios.get(`${process.env.VUE_APP_URL_API}${process.env.VUE_APP_API}${process.env.VUE_APP_CHAPTER}`, {
        params: {
            relationships: 1,
            chapter_id: _id
        }
    }).then((response) => response).catch((error) => error.response);
}
export const ChapterService = {
    getTotalChapters, createChapter, updateChapter, deleteChapter, countInRelationships, getListChapters
};