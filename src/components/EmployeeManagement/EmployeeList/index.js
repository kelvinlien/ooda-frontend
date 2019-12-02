import React, { useState, useEffect } from 'react';

import SummaryCard from '../SummaryCard/index';
import NewCard from '../NewCard/index';
import { getEmployeeList } from '../service';
import { ListContainer } from './styled';

function EmployeeList({setScreen}) {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        getEmployeeList().then(fetchedEmployees => setEmployees(fetchedEmployees));
    }, []);

    return (
        <ListContainer>
            {
                <NewCard
                    key={0}
                    onClick={() => setScreen(1)}
                />
            }
            {
                employees.map(employee => (
                    <SummaryCard
                        key={employee.id}
                        {...employee}
                    />
                ))
            }
        </ListContainer>
    )
}

export default EmployeeList;
