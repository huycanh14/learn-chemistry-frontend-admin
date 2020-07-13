const axios = require('axios');
const qs = require('querystring');

const getTheoriesByLessonId = (lesson_id) => {
    return axios.get(`${process.env.VUE_APP_URL_API}${process.env.VUE_APP_API}${process.env.VUE_APP_THEORY}`, {
        params: {
            get_all: 1,
            lesson_id: lesson_id
        }
    }).then((response) => response).catch((error) => error.response);
};

const createTheory = (payload) => {
    let data = {
        content: payload.content,
        activated: payload.activated,
        grade_id: payload.grade_id,
        chapter_id: payload.chapter_id,
        lesson_id: payload.lesson_id,
    }
    return axios.post(`${process.env.VUE_APP_URL_API}${process.env.VUE_APP_API}${process.env.VUE_APP_THEORY}`, 
        qs.stringify(data)
    ).then((response) => response).catch((error) => error.response);
};

export const TheoryService = {
    getTheoriesByLessonId, createTheory,
};