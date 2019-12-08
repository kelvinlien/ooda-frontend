import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { showGlobalNotice } from '../../../globalService';
import CustomizedErrorForm from '../../CustomizedErrorForm';

import { changePassword } from '../service';


const validationSchema = Yup.object().shape({
    password: Yup.string().required('Không được bỏ trống'),
    retype: Yup.string().required('Không được bỏ trống')
});

function ChangePassword() {
    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={{
                password: '',
                retype: '',
            }}
            onSubmit={(values) => {
                if (values.retype !== values.password) {
                    showGlobalNotice({
                        variant: 'error',
                        message: 'Nhập lại mật khẩu không đúng',
                    })
                    return;
                }
                changePassword(values.password).then(rs => {
                    if (rs) {
                        showGlobalNotice({
                            variant: 'info',
                            message: 'Đã cập nhật mật khẩu mới',
                        });
                        return;
                    }
                    showGlobalNotice({
                        variant: 'error',
                        message: 'Không thể cập nhật mật khẩu mới',
                    })
                })
            }}
            render={({values, handleChange, handleSubmit}) => {
                return (
                    <div>
                        <TextField
                            name='password'
                            onChange={handleChange}
                            value={values.password}
                            label='Mật khẩu mới'
                            type='password'
                        />
                        <CustomizedErrorForm
                            name='password'
                        />
                        <TextField
                            name='retype'
                            value={values.retype}
                            onChange={handleChange}
                            label='Nhập lại mật khẩu mới'
                            type='password'
                        />
                        <CustomizedErrorForm
                            name='retype'
                        />
                        <Button
                            onClick={handleSubmit}
                            variant='contained'
                            color='primary'
                        >
                            Đổi mật khẩu
                        </Button>
                    </div>
                )
            }}
        />
    );
}

export default ChangePassword;

