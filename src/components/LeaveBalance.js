import React from 'react';
import { CssBaseline, Grid, Paper, Container} from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import LeaveDetail from './LeaveDetail.js';
import LeaveCalendar from './LeaveCalendar.js';
export default class LeaveBalance extends React.Component{
    constructor(props)
    {
        super(props);
        this.theme = createMuiTheme();
        this.makeThemeH1 = this.makeThemeH1.bind(this);
    }

    makeThemeH1()
    {
        // this.theme.typography.h2 = {
        //     fontSize: '8rem',
        //     '@media (min-width:600px)': {
        //       fontSize: '4.5rem',
        //     },
        //     [this.theme.breakpoints.up('md')]: {
        //       fontSize: '6rem',
        //     },
        //   };
    }

    render()
    {
        return(
            <div>
                <CssBaseline />
                <div >
                    <ThemeProvider theme = {this.theme}>
                        <Grid container spacing = {3} direction="row">
                            <Grid item md = {4}>
                                <Paper>
                                    <LeaveDetail 
                                        leaveRemain = {this.props.leaveRemain}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item md = {8}>
                                <Container>
                                    <LeaveCalendar />
                                </Container>
                            </Grid>
                        </Grid>
                    </ThemeProvider>
                </div>
            </div>
        )
    }
}