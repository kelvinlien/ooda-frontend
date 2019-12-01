import React from 'react';
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { getUsername } from '../../../util/localStorage';
import { Layout } from '../../FormLayout';
import { Container, ActionContainer } from './styled';
import { updatePerformanceReview } from '../service';
import { showGlobalNotice } from '../../../globalService';



function ReviewForm({
    setScreen,
    prDetail,
}) {
    const {
        id: prId,
        reviewee,
    } = prDetail;
    if (!reviewee) {
        return null;
    }
    const {
        note: recordedNote,
        KPI: recordedKPI,
        username: revieweedName,
    } = reviewee;
    return (
        <Container>
            <Formik
                initialValues={{
                    kpi: recordedKPI || '',
                    note: recordedNote || '',
                }}
                onSubmit={async (values) => {
                    
                    const rs = await updatePerformanceReview({
                        prId,
                        note: values.note,
                        KPI: values.kpi,
                    });
                    if (rs) {
                        showGlobalNotice({
                            variant: 'info',
                            message: 'Đã cập nhật thành công',
                        });
                        setScreen(0);
                        return;
                    } 
                    showGlobalNotice({
                        variant: 'error',
                        message: 'Đã xảy ra lỗi',
                    });
                }}
                render={({ handleSubmit, handleChange, values }) => {
                    return (
                        <>
                            <Layout col={3}>
                                <TextField
                                    disabled
                                    value={getUsername()}
                                    label='Người đánh giá'
                                />
                                <div>
                                </div>

                                <TextField
                                    disabled
                                    value={revieweedName}
                                    label='Nhân viên'
                                />
                            </Layout>
                            <Layout col={3}>
                                <TextField
                                    onChange={handleChange}
                                    name='kpi'
                                    value={values.kpi}
                                    label='KPI'
                                />
                            </Layout>
                            <Layout col={1}>
                                <TextField
                                    className='note'
                                    name='note'
                                    label="Ghi chú"
                                    placeholder="Nhận xét chi tiết về nhân viên..."
                                    multiline
                                    rows="6"
                                    onChange={handleChange}
                                    value={values.note}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Layout>
                            <Layout col={1}>
                                <ActionContainer>
                                    <Button
                                        className='item'
                                        variant='contained'
                                        onClick={() => {
                                            setScreen(0);
                                        }}                                 
                                    >
                                        Quay lại
                                    </Button>
                                    <Button
                                        className='item'
                                        color='primary'
                                        variant='contained'
                                        onClick={handleSubmit}
                                    >
                                        Cập nhật
                                    </Button>
                                </ActionContainer>
                            </Layout>
                        </>
                    );
                }}
            />
            

        </Container>
    )
}

export default ReviewForm;
