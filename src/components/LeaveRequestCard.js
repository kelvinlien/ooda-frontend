import React from 'react'
import {Card, CardContent, CardHeader, Grid, TextField, Button, Typography, Divider} from '@material-ui/core'
import {styled} from '@material-ui/styles'


export default function LeaveRequestCard(props)
{
    const rows = props.leaveRequests;
    const CustomCard = styled(Card)({
        background: 'transparent',
        border: 0,
        borderRadius: 7,
        // boxShadow: '0 3px 5px 2px rgba(0, 254, 254, .3)',
        color: 'black',
        // height: 48,
        // padding:" 20px 20px 20px 20px"
      });
    const GridContainer = styled(Grid)({
        // background: 'transparent',
        border: 3,
        borderRadius: 7,
        // boxShadow: '0 3px 5px 2px rgba(0, 254, 254, .3)',
        // color: 'black',
        // height: 48,
        padding:" 10px 0px 10px 0px"
      });
    const Item = styled(Grid)({
        // background: 'transparent',
        border: 3,
        borderRadius: 7,
        // boxShadow: '0 3px 5px 2px rgba(0, 254, 254, .3)',
        // color: 'black',
        // height: 48,
        // display: "flex",
        // flexDirection: "column",
        // justifyContent: "center"
        padding: "0px 60px 0px 0px"

      });
    function handleClick(e, decision, id)
    {
      props.leaveDecide(decision, id);
      console.log(Object.keys(props.decidedRequests));
    }
    return(
        <>
            {
                rows ? 
                rows.map(row => (
                <GridContainer
                container
                direction = "row"
                alignItems = 'center'
                justify = "center"
                maxWidth = '1'
                >
                    <Grid
                    item lg={props.title === 'manager' ? '9' : '12'}
                    >
                    <CustomCard
                    raised = 'true'
                    style = {{backgroundColor: Object.keys(props.decidedRequests).includes(''+row.id) ? '#d6d6d6' : 'initial'}}
                    >
                        {
                            props.title === 'dev'?
                            <CardHeader
                                title = 
                                {<Typography
                                variant = 'h5'
                                color = {row.status === 'REJECTED' ? 'secondary' : row.status === 'APPROVED' ? 'primary' : 'initial'}
                                align = 'center'
                                >{row.status === 'REJECTED' ? 'Đã từ chối' : row.status === 'APPROVED' ? 'Đã chấp thuận' : 'Đang chờ'}</Typography>}
                                />
                            :''
                        }
                        <CardContent>
                        {
                        props.title === 'manager' ?                            
                            <Grid container 
                            spacing = {1}
                            direction="row"
                            alignItems="center"
                            justify="space-around"
                            >
                                <Grid item lg = {5}>
                                    <TextField
                                    label = "Nhân viên"
                                    value = {row.username}
                                    margin = "normal"
                                    variant = "outlined"
                                    value = 'Pham Huy Phat'
                                    disabled
                                    />
                                </Grid>
                                <Grid item lg>
                                    <TextField
                                    label = "Vị trí"
                                    // value = {this.state.userInfo.fullname}
                                    value = {row.title}
                                    margin = "normal"
                                    variant = "outlined"
                                    backgroundColor = 'black'
                                    disabled
                                    />
                                </Grid>
                                <Grid item lg = {3}>
                                    <TextField
                                    label = "Lý do nghỉ"
                                    // value = {this.state.userInfo.fullname}
                                    value = {row.reason}
                                    margin = "normal"
                                    variant = "outlined"
                                    backgroundColor = 'white'
                                    disabled
                                    />
                                </Grid>
                            </Grid>
                            :
                            <Grid container 
                            spacing = {4}
                            direction="row"
                            alignItems="center"
                            justify="space-around"
                            >
                                <Grid item lg = {3}>
                                    <TextField
                                    label = "Nghỉ từ ngày"
                                    value = {row.fromDate}
                                    margin = "normal"
                                    variant = "outlined"
                                    disabled
                                    />
                                </Grid>
                                <Grid item lg = {3}>
                                    <TextField
                                    label = "Đến ngày"
                                    // value = {this.state.userInfo.fullname}
                                    value = {row.toDate}
                                    margin = "normal"
                                    variant = "outlined"
                                    backgroundColor = 'black'
                                    disabled
                                    />
                                </Grid>
                                <Grid item lg = {3}>
                                    <TextField
                                    label = "Lý do nghỉ"
                                    // value = {this.state.userInfo.fullname}
                                    value = {row.reason}
                                    margin = "normal"
                                    variant = "outlined"
                                    backgroundColor = 'white'
                                    disabled
                                    />
                                </Grid>
                                <Grid item lg = {3}>
                                    <TextField
                                    label = "Số ngày nghỉ"
                                    value = {row.numberOfDays}
                                    margin = "normal"
                                    variant = "outlined"
                                    backgroundColor = 'black'
                                    disabled
                                    />
                                </Grid>
                            </Grid>
                            }
                            {
                            props.title === 'manager' ?
                            <Grid container 
                            spacing = {1}
                            direction="row"
                            alignItems="center"
                            justify="space-between"
                            >
                                <Grid item lg = {5}>
                                    <TextField
                                    label = "Nghỉ từ ngày"
                                    value = {row.fromDate}
                                    margin = "normal"
                                    variant = "outlined"
                                    backgroundColor = 'black'
                                    disabled
                                    />
                                </Grid>
                                <Grid item lg>
                                    <TextField
                                    label = "Đến ngày"
                                    // value = {this.state.userInfo.fullname}
                                    value = {row.toDate}
                                    margin = "normal"
                                    variant = "outlined"
                                    backgroundColor = 'black'
                                    disabled
                                    />
                                </Grid>
                                <Grid item lg = {3}>
                                    <TextField
                                    label = "Số ngày nghỉ"
                                    value = {row.numberOfDays}
                                    margin = "normal"
                                    variant = "outlined"
                                    backgroundColor = 'black'
                                    disabled
                                    />
                                </Grid>
                            </Grid>
                            :
                            <Grid container 
                            spacing = {4}
                            direction="row"
                            alignItems="center"
                            justify="space-between"
                            >

                            </Grid>
                            }
                        </CardContent>
                    </CustomCard>
                    </Grid>
                    <Item
                    item
                    lg
                    >
                    <GridContainer
                    container
                    direction = 'column'
                    alignItems = 'center'
                    justify = 'space-around'
                    spacing = {3}
                    >
                        <Divider style = {{padding : '0 0 20px'}} />
                        {props.title === 'manager' ?
                        Object.keys(props.decidedRequests).includes(''+row.id) ?
                        <TextField 
                        align="center"
                        value = {props.decidedRequests[''+row.id]}
                        disabled
                        />
                        :
                        <>
                            <Button
                            type="button"
                            color="primary"
                            variant = 'contained'
                            onClick = { e => handleClick(e, 'approved', row.id)}
                            style = {{width : "150px"}}
                            >
                                Chấp thuận
                            </Button>
                            <Divider style = {{padding : '15px 0 15px'}} />
                            <Button
                            type = 'button'
                            color = 'secondary'
                            variant = 'contained'
                            onClick = { e => handleClick(e, 'rejected', row.id)}
                            style = {{width : "150px"}}
                            >
                            Bỏ qua
                            </Button>
                        </>
                        :''
                        }
                    </GridContainer>
                    </Item>
                </GridContainer>
                ))
                :''
            }
        </>
    )
}