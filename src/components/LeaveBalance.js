import React from 'react';
import axios from 'axios';
import { styled } from '@material-ui/core/styles';
import { CssBaseline, Grid, Paper, Container} from '@material-ui/core';
import LeaveDetail from './LeaveDetail.js';
import LeaveRequestTable from './LeaveRequestTable'
import {getItem, setItem} from '../LocalStorage'
import LeaveRequestCard from './LeaveRequestCard'

const CustomPaper = styled(Paper)({
    background: 'transparent',
    border: 0,
    borderRadius: 7,
    boxShadow: '0 3px 5px 2px rgba(0, 0, 254, .3)',
    color: 'black',
    padding: '10px 30px 10px 30px',
  });
export default class LeaveBalance extends React.Component{
    constructor(props)
    {
        super(props);
        this.cellNames = ['Lý do', 'Từ ngày', 'Đến ngày', 'Số ngày nghỉ', 'Trạng thái'];
        this.state = {
            totalRequest : 0,
            remainRequest : 0,
            decidedRequests : {} 
        }
        this.leaveDecide = this.leaveDecide.bind(this);
    }


    componentDidUpdate(prevProp)
    {
        if (prevProp.leaveRequests !== this.props.leaveRequests)
        {
            if (getItem('decidedRequests'))
            {
                this.setState(() => ({
                    totalRequest : getItem("totalRequest"),
                    remainRequest : getItem("remainRequest"),
                    decidedRequests : getItem("decidedRequests")
                }))
            }
            else
            {
                this.setState(() => ({
                    totalRequest : this.props.leaveRequests.length,
                    remainRequest : this.props.leaveRequests.length
                }));
            }
        }
    }


    leaveDecide(decision, id)
    {
        let _this = this;
        axios({
            url : _this.props.managerURL,
            baseURL : _this.props.baseURL,
            method : "patch",
            headers : {
                'Authorization': 'Bearer '+ _this.props.accessToken
            },
            data : {
                'leaveRequestId' : '' + id,
                'decision' : decision
            }
        })
        .then(function(){
            let newDecidedRequests = _this.state.decidedRequests;
            decision == 'rejected' ? newDecidedRequests[id] = 'Đã bỏ qua' : newDecidedRequests[id] = 'Đã chấp thuận';
            _this.setState((prevState) => ({
                ...prevState,
                remainRequest : prevState.remainRequest - 1,
                decidedRequests : newDecidedRequests
            }));
            setItem(_this.state);
        })
        .catch(function(error){
            console.log(error);
            console.log(_this.props.leaveRequests);
            console.log(_this.state.totalRequest);
        })
    }

    componentDidMount()
    {
        // this.props.updateLeaveRequests();
        if (getItem("decidedRequests"))
        {
        this.setState(() => ({
            totalRequest : getItem("totalRequest"),
            remainRequest : getItem("remainRequest"),
            decidedRequests : getItem("decidedRequests")
        }))
        }
    }

    render()
    {
        console.log(getItem("remainRequest"));
        console.log(getItem('decidedRequests'));
        if (this.props.title == 'manager')     //check if there is a title from manager's leaveRequests
        {
            this.cellNames = ['Họ tên', 'Vị trí', 'Lý do', 'Từ ngày', 'Đến ngày', 'Số ngày nghỉ', 'Quyết định'];
        }
        return(
            <>
                <Grid 
                container 
                spacing = {1} 
                direction="column"
                justify = "space-evenly"
                >
                    <Grid item lg = {12}>
                        <CustomPaper
                        elevation = {3}
                        component = 'div'
                        >
                            <LeaveDetail 
                            remainingPaidLeave = {this.props.remainingPaidLeave}
                            totalAnnual = {this.props.totalAnnual}
                            totalRequest = {this.state.totalRequest}
                            remainRequest = {this.state.remainRequest}
                            />
                        </CustomPaper>
                    </Grid>
                    <Grid item lg = {12}>
                        <Container maxWidth = '1'>
                            <LeaveRequestTable 
                            leaveRequests = {this.props.leaveRequests}
                            cellNames = {this.cellNames}
                            leaveDecide = {this.leaveDecide}
                            decidedRequests = {this.state.decidedRequests}
                            title = {this.props.title}
                            />
                        </Container>
                    </Grid>
                </Grid>
            </>
        )
    }
}