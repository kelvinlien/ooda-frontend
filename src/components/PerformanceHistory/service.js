import { getSelfId } from '../../util/localStorage';
import { asyncTryCatchReq, API } from '../../util/customAxios';

export async function getPRHistory() {
    const [err, data] = await asyncTryCatchReq({
        url: API().getPRHistory(getSelfId()),
    }, true)
    if (err) {
        return [];
    }
    return data.history;
}
