import React from 'react';
import {Card, Button, Select, Typography, Grid, FormControl, CardHeader, CardContent, CardActionArea, CardActions} from '@material-ui/core';
import NativeSelect from './NativeSelect.js';
import DatePicker from './DatePicker.js';
export default class LeaveForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            fromDate : '',
            toDate : ''
        };
        this.saveToState = this.saveToState.bind(this);
    }
    saveToState(e)
    {
        let id = e.target.id;
        let value = e.target.value;
        this.setState(()=>({
            [id] : value
        }))
        console.log(this.state);
    }
    render()
    {
        return(
            <>
                <Card>
                    <CardHeader
                    title = {
                        <Typography variant = 'h5' component = 'div' id = 'form-title'>
                        <b>
                            ĐƠN XIN NGHỈ PHÉP
                        </b>
                        </Typography>
                    }
                    />
                    <CardContent>
                    <Grid container spacing = {3}>
                    <Grid item md = {6}>
                        <NativeSelect 
                        label = 'Team' 
                        id = 'team'
                        options = {[
                            {
                                value : 'rtst',
                                name : 'rtSolution'
                            },
                            {
                                value : 'rtlab',
                                name : 'rtLab'
                            }
                        ]}
                        />
                        </Grid>
                        <Grid item md = {6}>
                        <NativeSelect 
                        label = 'Người quản lý' 
                        id = 'manager'
                        options = {[
                            {
                                value : 'vvd',
                                name : 'Vũ Viết Dũng'
                            },
                            {
                                value : 'ldt',
                                name : 'Lê Đặng Trung'
                            }
                        ]}
                        />
                        </Grid>
                        <Grid item md = {4}>
                        <NativeSelect 
                        label = 'Lý do nghỉ' 
                        id = 'reason'
                        options = {[
                            {
                                value : 'sick',
                                name : 'Bị bệnh'
                            },
                            {
                                value : 'marriage',
                                name : 'Cưới hỏi'
                            }
                        ]}
                        />
                        </Grid>
                        <Grid item md = {4}>
                            <DatePicker 
                            type = 'from'
                            id = 'fromDate'
                            label = 'Từ ngày'
                            />
                        </Grid>
                        <Grid item md = {4}>
                            <DatePicker 
                            type = 'to' 
                            fromDate = {this.state.fromDate}
                            id = 'toDate'
                            label = 'Đến ngày' 
                            />
                        </Grid>
                    </Grid>
                    </CardContent>
                    <CardActions>
                        {/* <Button 
                        variant = 'text' 
                        size = 'medium' 
                        color = 'default'
                        >
                            Quay về
                        </Button> */}
                        <Button
                        variant = 'contained'
                        size = 'medium'
                        color = 'secondary'
                        >
                            Gửi
                        </Button>
                    </CardActions>
                </Card>
            </>
        )
    }
}