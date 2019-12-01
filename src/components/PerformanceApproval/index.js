import React, { useState, useEffect } from 'react';
import { getToFinalize } from './service';
import { Container } from './styled';
import PRCard from './PRCard/index';


function PerformanceApproval() {
    const [toFinalizes, setToFinalizes] = useState([]);
    useEffect(() => {
        getToFinalize().then(fetchedToFinalizes => {
            setToFinalizes(fetchedToFinalizes);
        }) 
    }, []) 
    if (toFinalizes.length === 0) {
        return 'Không có gì để xử lý ở đây';
    }
    return (
        <Container>
            <h1>
                Duyệt phiếu đánh giá năng lực
            </h1>
            {
                toFinalizes.map(toFinalize => (
                    <PRCard
                        key={toFinalize.id}
                        onSuccess={() => {
                            const removed = toFinalizes.filter(t =>  t.id !== toFinalize.id)
                            setToFinalizes(removed);
                        }}
                        {...toFinalize}
                    />
                ))
            }
        </Container>
    )
}

export default PerformanceApproval;