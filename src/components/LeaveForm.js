import React from 'react';
import {Card, Button, Typography, Grid, Badge, CardHeader, CardContent, CardActionArea, CardActions, TextField} from '@material-ui/core';
import CompareArrowsOutlinedIcon from '@material-ui/icons/CompareArrowsOutlined';
import NativeSelect from './NativeSelect.js';
import DatePicker from './DatePicker.js';
import { datePickerDefaultProps } from '@material-ui/pickers/constants/prop-types';
import Axios from 'axios';
import qs from 'qs';
export default class LeaveForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            url : "leaveRequest/employee/2/",
            fromDate : new Date(),
            toDate : new Date(),
            leaveNum : '',
            userInfo : ''
        };
        this.saveToState = this.saveToState.bind(this);
        this.saveDateToState = this.saveDateToState.bind(this);
        this.createLeaveRequest = this.createLeaveRequest.bind(this);
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
        let num = Math.round((id === "toDate" ? value.getTime() - this.state.fromDate.getTime() : this.state.toDate.getTime() - value.getTime()) / (1000 * 3600 * 24)) ;
        // console.log(value.getHours(), this.state.fromDate.getHours());
        this.setState(()=>({
            [id] : value,
            leaveNum : num
        }))
    }

    createLeaveRequest()
    {
        let _this = this;
        Axios({
            url : _this.state.url,
            baseURL : _this.props.baseURL,
            method : "post",
            headers : {
                'Authorization': 'Bearer '+ this.props.accessToken
            },
            data : {
                "reason" : this.state.reason,
                "numberOfDays" : this.state.leaveNum
            }

        })
        .then(function(){
            alert("Gửi đơn xin phép thành công. Đơn của bạn sẽ được duyệt trong thời gian sớm nhất!");
        })
        .catch(function(error){
            console.log(error);
        })
    }
    render()
    {
        console.log(this.state);
        return(
            <>
                <Card>
                    <CardHeader
                    title = {
                        <Typography variant = 'h5' component = 'div' id = 'form-title'>
                        <b>
                            ĐƠN XIN NGHỈ PHÉP
                        </b>
                        </Typography>
                    }
                    />
                    <CardContent>
                    <Grid container spacing = {3}>
                        <Grid item md = {6}>
                            <TextField
                            label = "Họ và tên"
                            // value = {this.state.userInfo.fullname}
                            value = {this.state.userInfo.username}
                            margin = "normal"
                            variant = "outlined"
                            disabled
                            />
                        </Grid>
                        <Grid item md = {6}>
                            <TextField
                            label = "Team"
                            // value = {this.state.userInfo.fullname}
                            value = "webdev"
                            margin = "normal"
                            variant = "outlined"
                            disabled
                            />
                        </Grid>
                        <Grid item md = {6}>
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
                            />
                        </Grid>
                        <Grid item md = {6}>
                            <TextField
                            label = "Người quản lý"
                            // value = {this.state.userInfo.fullname}
                            value = "Lê Đặng Trung"
                            margin = "normal"
                            variant = "outlined"
                            disabled
                            />
                        </Grid>
                        <Grid item md = {5}>
                            <DatePicker 
                            type = 'from'
                            toDate = {this.state.toDate}
                            id = 'fromDate'
                            label = 'Từ ngày'
                            callBackFunc = {(id, value) => this.saveDateToState(id,value)}
                            />
                        </Grid>
                        <Grid item md = {3}>
                            <TextField
                            label = "Số ngày nghỉ"
                            value = {this.state.leaveNum}
                            margin = "dense"
                            variant = "filled"
                            disabled
                            />
                        </Grid>
                        <Grid item md = {4}>
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
                        {/* <Button 
                        variant = 'text' 
                        size = 'medium' 
                        color = 'default'
                        >
                            Quay về
                        </Button> */}
                        <Button
                        variant = 'contained'
                        size = 'medium'
                        color = 'secondary'
                        onClick = {this.createLeaveRequest}
                        >
                            Gửi
                        </Button>
                    </CardActions>
                </Card>
            </>
        )
    }
}