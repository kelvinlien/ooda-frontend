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
                        <b>Số ngày nghỉ phép còn lại</b>
                    </Typography>
                </Grid>
                <Grid item lg >
                    <Typography variant = 'caption'>
                        {this.props.remainingPaidLeave} ngày
                    </Typography>
                </Grid>
            </Grid>
            <Grid
            container
            direction="row"
            // justify="space-around"
            // alignItems="center"
            spacing = {1}
            >
                <Grid 
                item 
                lg 
                justify = "flex-end"
                alignContent = 'space-around'
                >
                    <Typography variant = 'overline' >
                        <b>Tổng số ngày phép trong năm</b>
                    </Typography>
                </Grid>
                <Grid item lg >
                    <Typography variant = 'caption'>
                        {this.props.totalAnnual} ngày
                    </Typography>
                </Grid>
            </Grid>
            </>
        )
    }
}