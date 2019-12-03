import React from 'react';
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import { showGlobalNotice } from '../../../globalService';
import { addNewEmployee } from '../service';
import CustomizedErrorForm from '../../CustomizedErrorForm';
import { Layout } from '../../FormLayout';
import { Container, ActionContainer } from './styled';

const departmentList = [
    {
        label: 'Kĩ sư',
        value: 'it',
    },
    {
        label: 'Nhân sự',
        value: 'hr',
    },
]

function NewEmployeeForm({setScreen, setDetail}) {
    const [joinDate, setJoinDate] = React.useState(new Date());
    const [openSelect, setOpenSelect] = React.useState(false);
    const handleDateChange = date => {
        setJoinDate(date);
    };
    return (
        <Container>
            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    department: '',
                    title: '',
                }}
                onSubmit={(values, { resetForm }) => {
                    const {
                        department,
                    } = values;
                    addNewEmployee({
                        ...values,
                        joinDate,
                        managerId: 3,
                        role: department === 'hr' ? 'hr' : 'staff',
                    }).then(rs => {
                        if (!rs) {
                            showGlobalNotice({
                                variant: 'error',
                                message: 'Không thể tạo nhân viên mới',
                            })
                            return;
                        };
                        showGlobalNotice({
                            variant: 'success',
                            message: 'Đã tạo thành công, hãy cập nhật những thông tin chi tiết',
                        });
                        resetForm();
                        setDetail({
                            ...rs,
                            managerName: 'Lien Hop Quoc',
                        });
                        setScreen(2);
                    })

                }}
                render={({values, handleChange, handleSubmit, setValues}) => {
                    return (
                        <>
                            <Layout col={2}>
                                <TextField
                                    onChange={handleChange}
                                    label="Họ tên"
                                    name='username'
                                    value={values.username}
                                />
                            </Layout>
                            <CustomizedErrorForm
                                name="username"
                            />
                            
                            <Layout col={2}>
                                <TextField
                                    onChange={handleChange}
                                    label="Đia chỉ email"
                                    name='email'
                                    value={values.email}
                                />
                            </Layout>
                            <CustomizedErrorForm
                                name="email"
                            />
                            <Layout col={3}>
                                <FormControl>
                                    <InputLabel id="brand-label">Phòng ban</InputLabel>
                                    <Select
                                        id='select-component'
                                        onClose={() => setOpenSelect(false)}
                                        onOpen={() => setOpenSelect(true)}
                                        onChange={(e) => {
                                            setValues({
                                                ...values,
                                                department: e.target.value,
                                            });
                                        }}
                                        open={openSelect}
                                        value={values.department}
                                    >
                                        {
                                            departmentList.map(brand => {
                                                return (
                                                    <MenuItem
                                                        key={brand.value}
                                                        value={brand.value}
                                                    >
                                                        {brand.label}
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <TextField
                                    onChange={handleChange}
                                    label="Chức vụ"
                                    name='title'
                                    value={values.title}
                                />
                            </Layout>
                            <Layout col ={3}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Ngày tham gia"
                                        value={joinDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Layout>
                            <ActionContainer>
                                    <Button
                                        onClick={() => setScreen(0)}
                                        variant='contained'
                                        color='secondary'
                                        className='item'
                                    >
                                        Huỷ
                                    </Button>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        className='item'
                                        onClick={handleSubmit}
                                    >
                                        Xác nhận
                                    </Button>
                            </ActionContainer>
                        </>
                    )
                }}
            />
        </Container>
    );
}

export default NewEmployeeForm;
