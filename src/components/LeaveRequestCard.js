import React from 'react'
import {Card, CardContent, CardHeader, Grid, TextField, Button, CardActionArea, Typography} from '@material-ui/core'
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
    const Container = styled(Grid)({
        // background: 'transparent',
        border: 3,
        borderRadius: 7,
        // boxShadow: '0 3px 5px 2px rgba(0, 254, 254, .3)',
        // color: 'black',
        // height: 48,
        padding:" 20px 20px 20px 20px"
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
        padding: "110px 0 100px 50px"

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
                <Container
                container
                direction = "row"
                alignItems = 'flex-start'
                justify = "center"
                >
                    <Grid
                    item
                    >
                    <CustomCard
                    raised = 'true'
                    >
                        {
                            props.title === 'dev'?
                            // <CardHeader>
                                <Typography
                                variant = 'h5'
                                color = {row.status === 'REJECTED' ? 'secondary' : row.status === 'APPROVED' ? 'primary' : 'initial'}
                                align = 'center'
                                >{row.status ? row.status : "Not yet"}</Typography>
                                
                            // </CardHeader>
                            :''
                        }
                        <CardContent>
                            <Grid container 
                            spacing = {3}
                            direction="row"
                            alignItems="center"
                            justify="space-between"
                            >
                                <Grid item md = {6}>
                                    <TextField
                                    label = "Nhân viên"
                                    value = {row.username}
                                    margin = "normal"
                                    variant = "outlined"
                                    backgroundColor = 'black'
                                    disabled
                                    />
                                </Grid>
                                <Grid item md = {6}>
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
                            </Grid>
                            <Grid container 
                            spacing = {3}
                            direction="row"
                            alignItems="center"
                            justify="space-between"
                            >
                                <Grid item md = {6}>
                                    <TextField
                                    label = "Nghỉ từ ngày"
                                    value = {row.fromDate}
                                    margin = "normal"
                                    variant = "outlined"
                                    backgroundColor = 'black'
                                    disabled
                                    />
                                </Grid>
                                <Grid item md = {6}>
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
                            </Grid>
                            <Grid container 
                            spacing = {3}
                            direction="row"
                            alignItems="center"
                            justify="space-between"
                            >
                                <Grid item md = {6}>
                                    <TextField
                                    label = "Số ngày nghỉ"
                                    value = {row.numberOfDays}
                                    margin = "normal"
                                    variant = "outlined"
                                    backgroundColor = 'black'
                                    disabled
                                    />
                                </Grid>
                                <Grid item md = {6}>
                                    <TextField
                                    label = "Lý do nghỉ"
                                    // value = {this.state.userInfo.fullname}
                                    value = {row.reason}
                                    margin = "normal"
                                    variant = "outlined"
                                    backgroundColor = 'black'
                                    disabled
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </CustomCard>
                    </Grid>
                    <Item
                    item
                    >
                    <Container
                    container
                    direction = 'column'
                    alignItems = 'flex-start'
                    justify = 'space-evenly'
                    >
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
                            >
                                Chấp thuận
                            </Button>
                            <Button
                            type = 'button'
                            color = 'secondary'
                            variant = 'contained'
                            onClick = { e => handleClick(e, 'rejected', row.id)}
                            >
                            Bỏ qua
                            </Button>
                        </>
                        :''
                        }
                    </Container>
                    </Item>
                </Container>
                ))
                :''
            }
        </>
    )
}