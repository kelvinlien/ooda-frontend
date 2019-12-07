import React from 'react';
import Axios from 'axios';
import qs from 'qs';
import { datePickerDefaultProps } from '@material-ui/pickers/constants/prop-types';
import {Card, Button, Typography, Grid, Badge, CardHeader, CardContent, CardActionArea, CardActions, TextField} from '@material-ui/core';
import NativeSelect from './NativeSelect.js';
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
            userInfo : '',
            errorNoti : false,
            successNoti : false,
            unableNoti : false
        };
        this.saveToState = this.saveToState.bind(this);
        this.saveDateToState = this.saveDateToState.bind(this);
        this.createLeaveRequest = this.createLeaveRequest.bind(this);
    }
    handleClose(type)
    {
        let noti = type + "Noti";
        this.setState(() => ({
            [noti] : false
        }))
    }
    saveToState(e)
    {
        let id = e.target.id;
        let value = e.target.value;
        this.setState(()=>({
            [id] : value
        }))
        console.log(this.state);
    }

    componentDidMount()
    {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.setState(() => ({
            userInfo : userInfo
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

    createLeaveRequest()
    {
        if (this.props.remainingPaidLeave >= this.state.leaveNum)
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
        console.log(this.state);
        return(
            <>
                <Card
                // style = {{width: '1000px', alignSelf : 'center'}}
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
                            margin = "normal"
                            variant = "outlined"
                            backgroundColor = 'black'
                            disabled
                            />
                        </Grid>
                    </Grid>
                        <Grid
                        container
                        alignItems="center" 
                        justify="space-between"
                        direction="row"
                        > 
                        <Grid 
                        item 
                        >
                            <NativeSelect 
                            label = 'Lý do nghỉ' 
                            id = 'reason'
                            onChange = {e => this.saveToState(e)}
                            options = {[
                                {
                                    value : 'sick',
                                    name : 'Bị bệnh'
                                },
                                {
                                    value : 'marriage',
                                    name : 'Cưới hỏi'
                                }
                            ]}
                            style = {{width: '350px'}}
                            />
                        </Grid>
                        <Grid item>
                            <DatePicker 
                            type = 'from'
                            toDate = {this.state.toDate}
                            id = 'fromDate'
                            label = 'Từ ngày'
                            callBackFunc = {(id, value) => this.saveDateToState(id,value)}
                            />
                        </Grid>
                        </Grid>
                        <Grid
                        container
                        alignItems="center"
                        justify="space-between"
                        direction="row"
                        > 
                        <Grid item>
                            <TextField
                            label = "Số ngày nghỉ"
                            value = {this.state.leaveNum}
                            margin = "dense"
                            variant = "outlined"
                            disabled
                            />
                        </Grid>
                        <Grid item>
                            <DatePicker 
                            type = 'to' 
                            fromDate = {this.state.fromDate}
                            id = 'toDate'
                            label = 'Đến ngày'
                            callBackFunc = {(id, value) => this.saveDateToState(id,value)} 
                            />
                        </Grid>
                        </Grid> 
                    </CardContent>
                    <CardActions>
                        <Grid
                            justify="flex-end"
                            container 
                            spacing={24}
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
                    </CardActions>
                </Card>
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
            </>
        )
    }
}