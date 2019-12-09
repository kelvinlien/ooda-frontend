import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import { ListItemContainer, StageContainer, Container } from './styled';

import { showGlobalNotice } from '../../../globalService';
import { getPerformanceReviewableList, createPerformanceReview } from '../service';

function ToReviewList({
    setPrDetail,
    setScreen,
}) {
    const [stage, setStage] = useState({
        year: 0,
        period: 0,
    })
    const [reviewees, setReviewees] = useState([]);

    
    useEffect(() => {
        getPerformanceReviewableList().then(({
            year, period,
            employeeList,
        }) => {
            setStage({
                year,
                period,
            });
            setReviewees(employeeList.filter(emp => !emp.isReviewedLastPeriod))
        });
    }, [])
    if (reviewees.length === 0) {
        return null;
    }

    return (
        <Container>
            <StageContainer>
                <span className='bold'>Năm: {stage.year}</span>
                <span className='bold'>Kì: {stage.period}</span>
            </StageContainer>
            <div>
                <h2>Những người chưa đánh giá năng lực của kì này: </h2>
                <List>
                    {
                        reviewees.map(reviewee => {
                            return (
                                <ListItem
                                    key={reviewee.uid}
                                    button 
                                    component={Button}
                                    onClick={() => {
                                        createPerformanceReview({
                                            revieweeId: reviewee.uid,
                                        }).then(
                                            ({error, newPR}) => {
                                                if (error) {
                                                    showGlobalNotice({
                                                        variant: 'error',
                                                        message: 'Đã có lỗi xảy ra',
                                                    })
                                                    return;
    
                                                }
                                                setPrDetail({
                                                    id: newPR.id,
                                                    reviewee,
                                                });
                                                setScreen(1);

                                            }
                                        )
                                    }}
                                >
                                    <ListItemContainer>
                                        <span className='bold'>{reviewee.username}</span>
                                        <span>title: {reviewee.title}</span>
                                    </ListItemContainer>
                                </ListItem>
                            )
                        })
                    }
                </List>
            </div>
        </Container>
    );
}

export default ToReviewList;
