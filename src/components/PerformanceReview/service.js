import { getSelfId } from '../../util/localStorage';
import { asyncTryCatchReq, API } from '../../util/customAxios';

export async function getPerformanceReviewableList() {
    const [err, data] = await asyncTryCatchReq({
        url: API().getPerformanceReviewableList(getSelfId())
    }, true)
    if (err) {
        return [];
    }
    return data;
}

export async function createPerformanceReview(prInfo) {
    const [error, data] = await asyncTryCatchReq({
        url: API().createPerformanceReview(getSelfId()),
        method: 'post',
        data: {
            ...prInfo,
        },
    }, true);
    if (error) {
        return {
            error,
        };
    };
    const {
        newPR,
    } = data;
    return { newPR };
}

export async function getConductedPR() {
    const [err, data] = await asyncTryCatchReq({
        url: API().getConductedPR(getSelfId()),
        method: 'get',
    }, true);
    if (err) {
        return [];
    }
    return data.conducteds;
}

export async function updatePerformanceReview({
    prId,
    note,
    KPI,
}) {
    const [err] = await asyncTryCatchReq({
        url: API().updatePerfomanceReview(getSelfId()),
        method: 'patch',
        data: {
            prId,
            note,
            KPI,
        },
    }, true);
    if (err) {
        return false;
    }
    return true;
}