import React from 'react';
import Axios from 'axios';
import {Card, Button, Typography, Grid, CardHeader, CardContent, TextField} from '@material-ui/core';
import SimpleSelect from './SimpleSelect.js';
import DatePicker from './DatePicker.js';
import Snackbar from './CustomSnackbar'

export default class LeaveForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            url : this.props.leaveURL,
            fromDate : new Date(),
            toDate : new Date(),
            leaveNum : '',
            userInfo : this.props.userInfo,
            errorNoti : false,
            successNoti : false,
            unableNoti : false,
            dayNumNoti : false,
            reasonOptions : [           //prototype data, name is show as option's name in select box and value is the reason saved to database
                {
                    value : 'Bị bệnh',
                    name : 'Bị bệnh'
                },
                {
                    value : 'Cưới hỏi',
                    name : 'Cưới hỏi'
                }
            ]
        };
        this.saveToState = this.saveToState.bind(this);
        this.saveDateToState = this.saveDateToState.bind(this);
        this.createLeaveRequest = this.createLeaveRequest.bind(this);
        this.counter = 0;
    }
    handleClose(type)
    {
        let noti = type + "Noti";
        this.setState(() => ({
            [noti] : false
        }))
    }
    saveToState(e, id)
    {
        let value = e.target.value;
        this.setState(()=>({
            [id] : value
        }))
    }

    componentDidMount()
    {
        this.setState(() => ({
            userInfo : this.props.userInfo
        }))
    }

    saveDateToState(id, value)
    {
        let num = 0;
        if (id === "toDate")
        {
            for (let d = new Date(this.state.fromDate); d < value; d.setDate(d.getDate() + 1))
            {
                if (d.getDay() !== 0 && d.getDay() !== 6)       //excluding Sunday and Saturday
                {
                    num++;
                }
            }
            if (value.getDay()!== 0 && value.getDay()!== 6)
            {
                num++;
            }
        }
        else
        {
            for (let d = new Date(value); d < this.state.toDate; d.setDate(d.getDate() + 1))
            {
                if (d.getDay() !== 0 && d.getDay() !== 6)       //excluding Sunday and Saturday
                {
                    num++;
                }
            }
            if (this.state.toDate.getDay() !== 0 && this.state.toDate.getDay() !== 6)
            {
                num++;
            }
        }
        this.setState(()=>({
            [id] : value,
            leaveNum : num
        }))
    }

    componentDidUpdate(prevProp)
    {
        if (prevProp.accessToken !== this.props.accessToken)
        {
            this.setState(() => ({
            }))
        }
    }

    createLeaveRequest()
    {
        if (this.state.leaveNum <= 0)
        {
            this.setState(() => ({
                dayNumNoti : true
            }))
        }
        else if (this.props.remainingPaidLeave >= this.state.leaveNum)
        {
            let _this = this;
            Axios({
                url : _this.state.url,
                baseURL : _this.props.baseURL,
                method : "post",
                headers : {
                    'Authorization': 'Bearer '+ _this.props.accessToken
                },
                data : {
                    "reason" : _this.state.reason,
                    "numberOfDays" : _this.state.leaveNum,
                    "fromDate" : _this.state.fromDate,
                    "toDate" : _this.state.toDate
                }
    
            })
            .then(function(){
                _this.setState(() => ({
                    successNoti : true
                }));
                _this.props.updateLeaveBalance();       //perform request to fetch the updated data
            })
            .catch(function(error){
                console.log(error);
                _this.setState(() => ({
                    errorNoti : true
                }));
            })
        }
        else
        {
            this.setState(() => ({
                unableNoti : true
            }))
        }
    }
    render()
    {
        return(
            <>
                <Card
                style = {{paddingTop : '20px',border: 0,borderRadius: 9}}
                >
                    <CardHeader
                    title = {
                        <Grid container 
                        spacing = {3}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        >
                        <Typography variant = 'h5' component = 'div' id = 'form-title'>
                        <b>
                            ĐƠN XIN NGHỈ PHÉP
                        </b>
                        </Typography>
                        </Grid>
                    }
                    />
                    <CardContent>                      
                        <Grid container 
                        spacing = {3}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        >
                            <Grid item md = {12}>
                                <TextField
                                label = "Người quản lý"
                                // value = {this.state.userInfo.fullname}
                                value = "Liên Hợp Quốc"
                                margin = "none"
                                variant = "outlined"
                                InputProps={{
                                    style : {
                                        color: 'black'
                                    }
                                }}
                                disabled
                                />
                            </Grid>
                        </Grid>
                        <Grid
                        container
                        direction = "row"
                        spacing = {3}
                        alignItems = 'center'
                        justify = 'space-evenly'
                        >
                            <Grid
                            item
                            md = {6}
                            style = {{}}
                            > 
                                <Grid item>
                                    <DatePicker 
                                    type = 'from'
                                    toDate = {this.state.toDate}
                                    id = 'fromDate'
                                    label = 'Ngày bắt đầu'
                                    callBackFunc = {(id, value) => this.saveDateToState(id,value)}
                                    />
                                </Grid>
                                <Grid item>
                                    <DatePicker 
                                    type = 'to' 
                                    fromDate = {this.state.fromDate}
                                    id = 'toDate'
                                    label = 'Ngày kết thúc'
                                    callBackFunc = {(id, value) => this.saveDateToState(id,value)} 
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                            item
                            md = {6}
                            style = {{paddingTop: '20px', paddingLeft: '80px'}}
                            > 
                                <Grid item>
                                    <TextField
                                    label = "Số ngày nghỉ"
                                    value = {this.state.leaveNum}
                                    margin = "dense"
                                    variant = "outlined"
                                    InputProps={{
                                        style : {
                                            color: 'black'
                                        }
                                    }}
                                    disabled
                                    />
                                </Grid>
                                <Grid 
                                item 
                                >
                                    <SimpleSelect 
                                    label = 'Lý do nghỉ' 
                                    id = 'reason'
                                    onChange = {(e,id) => this.saveToState(e, id)}
                                    options = {this.state.reasonOptions}
                                    />
                                </Grid>
                            </Grid>
                        </Grid> 
                    </CardContent>
                </Card>
                <Grid
                    justify="flex-end"
                    container 
                    spacing={3}
                    style = {{padding: "50px 30px"}}
                >
                    <Button
                    variant = 'contained'
                    size = 'large'
                    color = 'secondary'
                    onClick = {this.createLeaveRequest}
                    >
                        Gửi
                    </Button>
                </Grid>
                <Snackbar
                message = 'Gửi đơn xin phép thành công.'
                variant = 'success'
                showNoti = {this.state.successNoti}
                handleClose = {() => this.handleClose('success')}
                />
                <Snackbar
                message = 'Gửi đơn xin phép thất bại.'
                variant = 'error'
                showNoti = {this.state.errorNoti}
                handleClose = {() => this.handleClose('error')}
                />
                <Snackbar
                message = 'Số ngày nghỉ phép còn lại không đủ.'
                variant = 'error'
                showNoti = {this.state.unableNoti}
                handleClose = {() => this.handleClose('unable')}
                />
                <Snackbar
                message = 'Số ngày nghỉ không hợp lệ.'
                variant = 'error'
                showNoti = {this.state.dayNumNoti}
                handleClose = {() => this.handleClose('dayNum')}
                />
            </>
        )
    }
}