const axios = require('axios');
const qs = require('querystring');

const getAllLessonByChapterID = (chapter_id) => {
    return axios.get(`${process.env.VUE_APP_URL_API}${process.env.VUE_APP_API}${process.env.VUE_APP_LESSON}`, {
        params: {
            get_all: 1,
            chapter_id: chapter_id
        }
    }).then((response) => response).catch((error) => error.response);
};

const createLesson = (payload) => {
    let data = {
        title: payload.title,
        lesson_number: parseInt(payload.lesson_number),
        description: payload.description,
        grade_id: payload.grade_id,
        chapter_id: payload.chapter_id,
        activated: payload.activated
    };
    return axios.post(`${process.env.VUE_APP_URL_API}${process.env.VUE_APP_API}${process.env.VUE_APP_LESSON}`, 
        qs.stringify(data)
    ).then((response) => response).catch((error) => error.response);

};

const deleteLesson = (_id) => {
    return axios.delete(`${process.env.VUE_APP_URL_API}${process.env.VUE_APP_API}${process.env.VUE_APP_LESSON}/${_id}`,
    ).then((response) => response).catch((error) => error.response);

};

const countInRelationships = (_id) => {
    return axios.get(`${process.env.VUE_APP_URL_API}${process.env.VUE_APP_API}${process.env.VUE_APP_LESSON}`, {
        params: {
            relationships: 1,
            lesson_id: _id
        }
    }).then((response) => response).catch((error) => error.response);
};

const getLessonByID = (_id) => {
    return axios.get(`${process.env.VUE_APP_URL_API}${process.env.VUE_APP_API}${process.env.VUE_APP_LESSON}/${_id}`,
    ).then((response) => response).catch((error) => error.response);
}

export const LessonService = {
    getAllLessonByChapterID, createLesson, deleteLesson, countInRelationships, getLessonByID,
};