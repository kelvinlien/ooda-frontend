import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles({
    card: {
        margin: 12,
        width: 200,
    },
    explain: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
    content: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        margin: 12,
    }
});


function NewCard({onClick}) {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardActionArea onClick={onClick} className={classes.content}>
                <div className={classes.explain}>
                    <AddCircleIcon
                        color='primary'
                        fontSize="large"
                    />
                    <span className={classes.text}>Thêm nhân viên mới</span>
                </div>
            </CardActionArea>
        </Card>);
}

export default NewCard;
