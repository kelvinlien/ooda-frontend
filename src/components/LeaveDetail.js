import React from 'react';
import {Typography, Grid} from '@material-ui/core';


export default class LeaveDetail extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            date : new Date()
        }
    }
    
    render()
    {
        return(
            <>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                spacing = {1}
            >
                <Grid item lg = {11} >
                    <Typography variant = 'overline' > 
                        <b>{this.props.remainingPaidLeave !== undefined ? 'Số ngày nghỉ phép còn lại' : 'Số đơn xin nghỉ phép còn lại'}</b>
                    </Typography>
                </Grid>
                <Grid item lg = {1} >
                    <Typography variant = 'caption'>
                        {this.props.remainingPaidLeave !== undefined ? 
                        this.props.remainingPaidLeave + ' ngày'
                        : this.props.remainRequest + ' đơn'
                        }
                    </Typography>
                </Grid>
            </Grid>
            <Grid
            container
            direction="row"
            justify = "flex-end"
            alignContent = 'space-between'
            spacing = {1}
            >
                <Grid 
                item 
                lg ={11}
                >
                    <Typography variant = 'overline' >
                        <b>{this.props.remainingPaidLeave !== undefined ? 'Tổng số ngày phép trong năm' : 'Tổng số đơn xin nghỉ phép cần duyệt'}</b>
                    </Typography>
                </Grid>
                <Grid item lg = {1} >
                    <Typography variant = 'caption'>
                        {this.props.remainingPaidLeave !== undefined ? this.props.totalAnnual + ' ngày' : this.props.totalRequest + ' đơn'}
                    </Typography>
                </Grid>
            </Grid>
            </>
        )
    }
}