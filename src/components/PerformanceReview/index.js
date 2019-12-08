import React, { useState } from 'react';
import ToReviewList from './ToReviewList/index';
import InProgressList from './InProgressList/index';
import ReviewForm from './ReviewForm/index';

import { Container } from './styled';

function PerformanceReview() {
    const [screen, setScreen] = useState(0);
    const [prDetail, setPrDetail] = useState({
        id: 0,
        reviewee: {
            username: '',
            KPI: undefined,
            note: '',
        },
    })
    return (
        <Container>
            <h1>Performance Review</h1>
            {
                screen === 0 && (
                    <>
                        <ToReviewList
                            setPrDetail={setPrDetail}
                            setScreen={setScreen}
                        />
                        <InProgressList
                            setPrDetail={setPrDetail}
                            setScreen={setScreen}
                        />
                    </>
                )
            }
            {
                screen === 1 && (
                    <ReviewForm
                        setScreen={setScreen}
                        prDetail={prDetail}
                    />
                )
            }
        </Container>
    );
}

export default PerformanceReview;
