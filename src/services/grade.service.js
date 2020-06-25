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

const createGrade = ({name, status}) => {
    let data = {
        name: name,
        actived: status
    }; 
    return axios.post(`${process.env.VUE_APP_URL_API}${process.env.VUE_APP_API}${process.env.VUE_APP_GRADE}`, 
        qs.stringify(data)
    ).then((response) => response).catch((error) => error.response);

}

export const GradeService = {
    getTotalGrades, getListGrades, createGrade
};