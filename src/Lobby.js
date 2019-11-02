import React from 'react';
import axios from 'axios';
import {Container, Button} from '@material-ui/core';
export default class Lobby extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            url : 'protected/ping/'
        }
        this.checkRole = this.checkRole.bind(this);
    }
    checkRole()
    {
        let _this = this;
        axios({
            url : this.state.url,
            baseURL : _this.props.baseURL,
            method : 'get',
            headers: {'Authorization': "Bearer " + _this.props.accessToken}
        })
        .then(function(response){
            console.log(response);
            alert('Welcome to da club');
        })
        .catch(function(error){
            let statusCode = error.response.status;
            if ( statusCode === 401)
            {
                alert(error.response.data.message);
                window.open('../','_self');
            }
        })
    }
    render()
    {
        console.log(this.props);
        return(
            <Container>
                {
                this.props.accessible && 
                <Button type = 'button' onClick = {() => this.checkRole()}>
                    HR Only
                </Button>
                }
            </Container>
        )
    }
}