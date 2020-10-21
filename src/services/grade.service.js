const axios = require('axios');
const qs = require('querystring');

const getTotalGrades = () => {
    return axios.get(`${process.env.VUE_APP_URL_API}${process.env.VUE_APP_API}${process.env.VUE_APP_GRADE}`,{
        params: {
            get_count: 1,
        },
    }).then((response) => response).catch((error) => error.response);
};

const getListGrades = () => {
    return axios.get(`${process.env.VUE_APP_URL_API}${process.env.VUE_APP_API}${process.env.VUE_APP_GRADE}`,{
        params: {
            page: 1,
        },
    }).then((response) => response).catch((error) => error.response);
};

const createGrade = ({name, activated}) => {
    let data = {
        name: name,
        activated: activated
    }; 
    return axios.post(`${process.env.VUE_APP_URL_API}${process.env.VUE_APP_API}${process.env.VUE_APP_GRADE}`, 
        qs.stringify(data)
    ).then((response) => response).catch((error) => error.response);

};

const updateGrade = (payload) => {
    let data = {
        name: payload.name,
        activated: payload.activated
    };
    return axios.put(`${process.env.VUE_APP_URL_API}${process.env.VUE_APP_API}${process.env.VUE_APP_GRADE}/${payload._id}`, 
        qs.stringify(data)
    ).then((response) => response).catch((error) => error.response);

};

const deleteGrade = (_id) => {
    return axios.delete(`${process.env.VUE_APP_URL_API}${process.env.VUE_APP_API}${process.env.VUE_APP_GRADE}/${_id}`,
    ).then((response) => response).catch((error) => error.response);

};

const countInRelationships = (_id) => {
    return axios.get(`${process.env.VUE_APP_URL_API}${process.env.VUE_APP_API}${process.env.VUE_APP_GRADE}`, {
        params: {
            relationships: 1,
            grade_id: _id
        }
    }).then((response) => response).catch((error) => error.response);
}

export const GradeService = {
    getTotalGrades, getListGrades, createGrade, updateGrade, deleteGrade, countInRelationships
};