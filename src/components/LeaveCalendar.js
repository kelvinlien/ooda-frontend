import React from 'react';
import Calendar from 'react-calendar';
import {} from '@material-ui/core';

export default class LeaveCalendar extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            date : new Date()
        };
        this.setDate = this.setDate.bind(this);
    }
    setDate = date => this.setState({ date })
    render()
    {
        return(
            <>
                <Calendar onChange = {this.setDate} value = {this.state.date} showNavigation = 'true' />
            </>
        )
    }
}