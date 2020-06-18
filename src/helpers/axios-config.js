export const AXIOS_CONFIG = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'access_token': window.localStorage.getItem("access_token")
    }
};