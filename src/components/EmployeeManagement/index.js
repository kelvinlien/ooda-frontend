import React, { useState } from 'react';
import EmployeeList from './EmployeeList/index';
import NewEmployeeForm from './NewEmployeeForm/index';

function EmployeeManagement() {
    const [screen, setScreen] = useState(0);
    return (
        <div>
            <h1>
                Quản lý nhân sự
            </h1>
            {
                screen === 0 && <EmployeeList setScreen={setScreen} />
            }
            {
                screen === 1 && <NewEmployeeForm setScreen={setScreen} />
            }
            
            
        </div>
    )
}

export default EmployeeManagement;
