import { asyncTryCatchReq, API } from '../../util/customAxios';
import { getSelfId } from '../../util/localStorage';

export async function changePassword(password) {
    const [err] = await asyncTryCatchReq({
        url: API().changePassword(getSelfId()),
        method: 'patch',
        data: {
            password,
        },
    }, true);
    if (err) {
        return false
    }

    return true;
}