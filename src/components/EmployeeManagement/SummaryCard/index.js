import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import DefaultAvatar from './img/demo_ava.png';

const useStyles = makeStyles({
    card: {
        margin: 12,
        width: 200,
    },
    media: {
      height: 300,
    },
});

function SummaryCard({
    username,
    title,
    onClick,
}) {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardActionArea
                onClick={onClick}
            >
                <CardMedia
                    component="img"
                    alt="Contemplative AVA"
                    height="300"
                    src={DefaultAvatar}
                    title="Contemplative AVA"
                />
                <CardContent>
                    <Typography gutterBottom variant="body1" component="p">
                        {username}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>);
}

export default SummaryCard;