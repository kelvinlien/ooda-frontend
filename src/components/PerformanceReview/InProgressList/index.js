import React, { useState, useEffect } from 'react';
import InProgressItem from '../InProgressItem/index';
import { getConductedPR } from '../service';
import { Container } from './styled';

function ConductedList({
    setPrDetail,
    setScreen,
}) {
    const [conducteds, setConducteds] = useState([]);

    useEffect(() => {
        getConductedPR().then(fetchedConducteds => setConducteds(fetchedConducteds));
    }, [])
    if (conducteds.length === 0) {
        return null;
    }
    return (
        <Container>
            <h2>Những bài đánh giá năng lực đã thực hiện: </h2>
            {
                conducteds.map(conducted => (
                    <InProgressItem
                        setPrDetail={setPrDetail}
                        setScreen={setScreen}
                        key={conducted.id}
                        {...conducted}
                    />
                ))
            }
        </Container>
    )
}

export default ConductedList;
