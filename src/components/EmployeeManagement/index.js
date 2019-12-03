import React, { useState } from 'react';
import EmployeeList from './EmployeeList/index';
import NewEmployeeForm from './NewEmployeeForm/index';
import EmployeeDetail  from './EmployeeDetail/index';

function EmployeeManagement() {
    const [screen, setScreen] = useState(0);
    const [detail, setDetail] = useState({
        id: 0,
        username: '',
        phoneNumber: '',
    });
    return (
        <div>
            <h1>
                Quản lý nhân sự
            </h1>
            {
                screen === 0 && <EmployeeList setDetail={setDetail} setScreen={setScreen} />
            }
            {
                screen === 1 && <NewEmployeeForm setDetail={setDetail} setScreen={setScreen} />
            }
            {
                screen === 2 && <EmployeeDetail {...detail} setScreen={setScreen} />
            }
            
            
        </div>
    )
}

export default EmployeeManagement;
