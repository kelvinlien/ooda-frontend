import React from 'react';
import axios from 'axios';
import {  Grid,  Container} from '@material-ui/core';
import LeaveRequestTable from './LeaveRequestTable'

export default class LeaveBalance extends React.Component{
    constructor(props)
    {
        super(props);
        this.cellNames = ['Lý do', 'Từ ngày', 'Đến ngày', 'Số ngày nghỉ', 'Trạng thái'];
        this.state = {
            totalRequest : 0,
            remainRequest : 0,
            decidedRequests : {},
            leaveRequests : []
        }
        this.leaveDecide = this.leaveDecide.bind(this);
    }


    componentDidUpdate(prevProp)
    {
        if (prevProp.leaveRequests !== this.props.leaveRequests)
        {
            this.setState(() => ({
                leaveRequests: this.props.leaveRequests,
                totalRequest : this.props.leaveRequests.length
            }))
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
        })
        .catch(function(error){
            console.log(error);
            console.log(_this.props.leaveRequests);
            console.log(_this.state.totalRequest);
        })
    }

    componentDidMount()
    {
        this.props.updateLeaveRequests();
        this.setState(() => ({
            leaveRequests: this.props.leaveRequests,
            totalRequest : this.props.leaveRequests.length
        }))
    }


    render()
    {
        console.log('leave balance got rendered');
        // console.log(this.state.decidedRequests);
        console.log(this.props.leaveRequests);
        // console.log(this.props.updateLeaveRequests);
        if (this.props.title == 'manager')
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
                    {/* <Grid item lg = {12}>
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
                    </Grid> */}
                    <Grid item lg = {12}>
                        <Container maxWidth = '1'>
                            <LeaveRequestTable 
                            leaveRequests = {this.props.leaveRequests}
                            cellNames = {this.cellNames}
                            leaveDecide = {this.leaveDecide}
                            decidedRequests = {this.state.decidedRequests}
                            title = {this.props.title}
                            remainingPaidLeave = {this.props.remainingPaidLeave}
                            totalAnnual = {this.props.totalAnnual}
                            />
                        </Container>
                    </Grid>
                </Grid>
            </>
        )
    }
}