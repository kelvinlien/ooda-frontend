import axios from 'axios';
import { getItemFromStorage } from './localStorage';

const server = 'http://localhost:2109';

export const API = () => ({
    isManager: (userId) => `/user/manager/${userId}/`,
    getPerformanceReviewableList: (userId) => `/pr/manager/${userId}/employee/`,
    // POST
    createPerformanceReview: (managerId) => `/pr/manager/${managerId}/`,
});

export function composeAccessTokenHeader() {
    const accessToken = getItemFromStorage('accessToken');
    return {
        Authorization: "Bearer " + accessToken,
    }
}

export function asyncTryCatchReq(reqParams, isAuthenticated) {
    return axios({
        ...reqParams,
        baseURL: server,
        ...(isAuthenticated ? {headers: composeAccessTokenHeader()} : null),
    }).then(rs => {
        return [null, rs.data];
    }).catch(err => {
        const errorData = err.response.data;
        return [errorData];
    });
}