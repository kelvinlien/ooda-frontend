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
            url : this.props.leaveURL,
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
        // let num = Math.round((id === "toDate" ? value.getTime() - this.state.fromDate.getTime() : this.state.toDate.getTime() - value.getTime()) / (1000 * 3600 * 24)) ;
        // console.log(value.getHours(), this.state.fromDate.getHours());
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
                alert("Gửi đơn xin phép thành công. Đơn của bạn sẽ được duyệt trong thời gian sớm nhất!");
                _this.props.updateLeaveBalance();       //perform request to fetch the updated data
            })
            .catch(function(error){
                console.log(error);
                alert("Gửi đơn xin phép thất bại. Vui lòng thử lại.");
            })
        }
        else
        {
            alert("Số ngày nghỉ phép còn lại không đủ. Vui lòng kiểm tra lại!");
        }
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
                        <Grid item md = {12}>
                            <TextField
                            label = "Người quản lý"
                            // value = {this.state.userInfo.fullname}
                            value = "Liên Hợp Quốc"
                            margin = "normal"
                            variant = "outlined"
                            disabled
                            />
                        </Grid>                        
                    <Grid container spacing = {3}>
                        {/* <Grid item md = {6}>
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
                        </Grid> */}
                        <Grid 
                        item 
                        md = {7}
                        alignContent = 'center'
                        alignItems = 'center'
                        justify = 'center'
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
                        <Grid item md = {7}>
                            <TextField
                            label = "Số ngày nghỉ"
                            value = {this.state.leaveNum}
                            margin = "dense"
                            variant = "outlined"
                            disabled
                            />
                        </Grid>
                        <Grid item md = {5}>
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