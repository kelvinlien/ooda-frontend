import { asyncTryCatchReq, API } from '../../util/customAxios';

export async function getToFinalize() {
    const [err, data] = await asyncTryCatchReq({
        url: API().getToFinalize(),
    }, true);

    if (err) {
        return [];
    };
    return data.toFinalize;
}

export async function finalizePR(prId) {
    const [err] = await asyncTryCatchReq({
        url: API().finalizePR(),
        data: {
            prId,
        },
        method: 'put',
    }, true);

    if (err) {
        return false;
    };
    return true;
}