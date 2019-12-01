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
                alignItems="flex-start"
                spacing = {1}
            >
                <Grid item lg >
                    <Typography variant = 'overline' > 
                        <b>{this.props.remainingPaidLeave !== undefined ? 'Số ngày nghỉ phép còn lại' : 'Số đơn xin nghỉ phép còn lại'}</b>
                    </Typography>
                </Grid>
                <Grid item lg >
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
            spacing = {1}
            >
                <Grid 
                item 
                lg 
                justify = "flex-end"
                alignContent = 'space-around'
                >
                    <Typography variant = 'overline' >
                        <b>{this.props.remainingPaidLeave !== undefined ? 'Tổng số ngày phép trong năm' : 'Tổng số đơn xin nghỉ phép cần duyệt'}</b>
                    </Typography>
                </Grid>
                <Grid item lg >
                    <Typography variant = 'caption'>
                        {this.props.remainingPaidLeave !== undefined ? this.props.totalAnnual + ' ngày' : this.props.totalRequest + ' đơn'}
                    </Typography>
                </Grid>
            </Grid>
            </>
        )
    }
}