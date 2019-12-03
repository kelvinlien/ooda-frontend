import { asyncTryCatchReq, API } from '../../util/customAxios';

export async function getEmployeeList() {
    const [err, rs] = await asyncTryCatchReq({
        url: API().getEmployees(),
    }, true);
    if (err) {
        return [];
    }
    return rs.employees;
}

export async function addNewEmployee(newEmployee) {
    const [err, rs] = await asyncTryCatchReq({
        url: API().createNewEmployee(),
        data: {
            ...newEmployee,
            password: '1',
        },
        method: 'post'
    }, true);
    if (err) {
        return null;
    }
    return rs;
}

export async function updateEmployee(updatedEmployee) {
    const [err] = await  asyncTryCatchReq({
        url: API().updateEmployee(),
        data: updatedEmployee,
        method: 'patch',
    }, true);

    if (err) {
        return false;
    }

    return true;
}