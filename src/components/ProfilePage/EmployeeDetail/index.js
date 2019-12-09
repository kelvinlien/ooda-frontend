import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import BuildIcon from '@material-ui/icons/Build';
import WorkIcon from '@material-ui/icons/Work';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import { Layout } from '../../FormLayout';
import ava from './img/smav.png';
import { Formik } from 'formik';
import { 
    Container, LeftColumn, MainArea,
    useStyles, AvatarContainer,
    FormContainer
} from './styled';
import { getRole } from '../../../util/localStorage';

function EmployeeDetail({
    ...detail
}) {
    const { 
        username,
        phoneNumber,
        joinDate,
        title,
        managerName,
        email,
        address = '',
        bankAccount = '',
        idCard = '',
        dob,
    } = detail;
    const classes = useStyles();
    return (
        <Container>
            <LeftColumn>
                <AvatarContainer>
                    <Avatar
                        alt="Nobita" 
                        src={ava} 
                        className={classes.bigAvatar}
                    />
                </AvatarContainer>
                <Divider className='divider' />
                <span className='bold'>
                    Ngày bắt đầu:
                </span>
                <span>
                    { joinDate }
                </span>
                <Divider className='divider' />
                <div className='icon-text'>
                    <BuildIcon />
                    <span>
                        Fulltime
                    </span>
                </div>
                <div className='icon-text'>
                    <WorkIcon />
                    <span>
                        {title}
                    </span>
                </div>
                <Divider className='divider' />
                <span className='bold'>
                    Quản lý:
                </span>
                <span>
                    {getRole() === 'hr' ? 'Nguyen Ngan Ha' : 'Lien Hop Quoc'}
                </span>
            </LeftColumn>
            <MainArea>
                <Formik
                    initialValues={{
                        email,
                        address,
                        idCard,
                        bankAccount,
                        phoneNumber,
                    }}
                    

                    render={({ values, handleChange, handleSubmit }) => {
                        return (
                            <FormContainer>
                                <h1>{username}</h1>
                                <Divider />
                                <h3>Chi tiết nhân viên</h3>
                                <Layout col={2}>
                                    <TextField
                                        className='force-black'
                                        disabled
                                        value={values.email}
                                        name='email'
                                        onChange={handleChange}
                                        label='Email'
                                    />
                                    <TextField
                                        className='force-black'
                                        disabled
                                        value={values.phoneNumber}
                                        name='phoneNumber'
                                        onChange={handleChange}
                                        label='Số điện thoại'
                                    />
                                </Layout>
                                <Layout col={1}>
                                    <TextField
                                        className='force-black'
                                        disabled
                                        value={values.address}
                                        name='address'
                                        onChange={handleChange}
                                        label='Địa chỉ nhà'
                                    />
                                </Layout>
                                <Layout col ={3}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        className='force-black'
                                        disabled
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Ngày sinh"
                                        value={dob}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Layout>
                                <Layout col={2}>
                                    <TextField
                                        className='force-black'
                                        disabled
                                        value={values.idCard}
                                        name='idCard'
                                        onChange={handleChange}
                                        label='Số CMND'
                                    />
                                </Layout>
                                <Layout col={1}>
                                    <TextField
                                        className='force-black'
                                        disabled
                                        value={values.bankAccount}
                                        name='bankAccount'
                                        onChange={handleChange}
                                        label='Số tài khoản ngân hàng'
                                    />
                                </Layout>
                            </FormContainer>
                        );
                    }}
                />        
            </MainArea>
        </Container>
    )
}

export default EmployeeDetail;