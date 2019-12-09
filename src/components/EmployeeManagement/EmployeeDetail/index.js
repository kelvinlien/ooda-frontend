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
import { updateEmployee } from '../service';
import ava from './img/smav.png';
import { Formik } from 'formik';
import { 
    Container, LeftColumn, MainArea,
    useStyles, AvatarContainer,
    FormContainer, ActionContainer,
} from './styled';
import { showGlobalNotice } from '../../../globalService';


const mockEmployee = {
    id: 2,
    phoneNumber: '0984388497',
    username: 'Pham Huy Phat',
    email: 'phat.pham@nfq.asia',
    joinDate: '2019/12/01',
    title: 'developer',
    managerName: 'Lien Hop Quoc',
}

function EmployeeDetail({
    setScreen,
    ...detail
}) {
    const departmentDisplay = {
        it: 'kĩ sư IT',
        hr: 'nhân sự',
      };

    const { 
        id: employeeId,
        username,
        phoneNumber,
        joinDate,
        title,
        managerName,
        email,
        address = '',
        bankAccount = '',
        idCard = '',
        dob: initDob,
        department,
    } = detail;
    function getDeptDisplay() {
        return departmentDisplay[department];
    }
    const [dob, setDob] = React.useState(new Date(initDob));
    const handleDateChange = date => {
        setDob(date);
    };
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
                    {managerName}
                </span>
                <span className='bold'>
                    Phòng ban:
                </span>
                <span>
                    {getDeptDisplay()}
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
                    onSubmit={async (values) => {
                        const updateResult = await updateEmployee({
                            employeeId,
                            ...values,
                            dob,
                        });

                        if (!updateResult) {
                            showGlobalNotice({
                                variant: 'error',
                                message: 'Đã xảy ra lỗi khi cập nhật',
                            })
                            return;
                        }
                        showGlobalNotice({
                            variant: 'info',
                            message: 'Đã cập nhật thông tin nhân viên thành công',
                        })
                    }}

                    render={({ values, handleChange, handleSubmit }) => {
                        return (
                            <FormContainer>
                                <h1>{username}</h1>
                                <Divider />
                                <h3>Chi tiết nhân viên</h3>
                                <Layout col={2}>
                                    <TextField
                                        disabled
                                        value={values.email}
                                        name='email'
                                        onChange={handleChange}
                                        label='Email'
                                    />
                                    <TextField
                                        value={values.phoneNumber}
                                        name='phoneNumber'
                                        onChange={handleChange}
                                        label='Số điện thoại'
                                    />
                                </Layout>
                                <Layout col={1}>
                                    <TextField
                                        value={values.address}
                                        name='address'
                                        onChange={handleChange}
                                        label='Địa chỉ nhà'
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
                                        label="Ngày sinh"
                                        value={dob}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Layout>
                                <Layout col={2}>
                                    <TextField
                                        value={values.idCard}
                                        name='idCard'
                                        onChange={handleChange}
                                        label='Số CMND'
                                    />
                                </Layout>
                                <Layout col={1}>
                                    <TextField
                                        value={values.bankAccount}
                                        name='bankAccount'
                                        onChange={handleChange}
                                        label='Số tài khoản ngân hàng'
                                    />
                                </Layout>
                                <ActionContainer>
                                    <Button
                                        onClick={() => setScreen(0)}
                                        color='secondary'
                                        variant='contained'
                                        className='item'
                                    >
                                        Quay lại
                                    </Button>
                                    <Button
                                        color='primary'
                                        variant='contained'
                                        className='item'
                                        onClick={handleSubmit}
                                    >
                                        Cập nhật
                                    </Button>
                                </ActionContainer>
                            </FormContainer>
                        );
                    }}
                />        
            </MainArea>
        </Container>
    )
}

export default EmployeeDetail;