import React from 'react';
import { CssBaseline, Grid, Paper, Container} from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import LeaveDetail from './LeaveDetail.js';
import LeaveCalendar from './LeaveCalendar.js';
import LeaveRequestTable from './LeaveRequestTable'
export default class LeaveBalance extends React.Component{
    constructor(props)
    {
        super(props);
        this.theme = createMuiTheme();
        this.makeThemeH1 = this.makeThemeH1.bind(this);
    }

    makeThemeH1()
    {
        this.theme.typography.h2 = {
            fontSize: '8rem',
            '@media (min-width:600px)': {
              fontSize: '4.5rem',
            },
            [this.theme.breakpoints.up('md')]: {
              fontSize: '6rem',
            },
          };
    }

    render()
    {
        return(
            <div>
                <CssBaseline />
                <div >
                    <ThemeProvider theme = {this.theme}>
                        <Grid container spacing = {1} direction="row">
                            <Grid item lg = {12}>
                                <Paper
                                square = 'true'
                                elevation = {3}
                                component = 'div'
                                >
                                    <LeaveDetail 
                                        remainingPaidLeave = {this.props.remainingPaidLeave}
                                        totalAnnual = {this.props.totalAnnual}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item lg = {12}>
                                <Container>
                                    <LeaveRequestTable 
                                    leaveRequests = {this.props.leaveRequests}
                                    />
                                </Container>
                            </Grid>
                        </Grid>
                    </ThemeProvider>
                </div>
            </div>
        )
    }
}