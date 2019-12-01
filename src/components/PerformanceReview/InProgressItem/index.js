import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 468,
    padding: 16,
  },
  actions: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    display: 'flex',
  },
  bold: {
    fontWeight: 'bold',
  },
  stats: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    display: 'flex',
    marginTop: 12,

  },
  media: {
    height: 140,
  },
});

export default function InProgressItem(props) {
  const {
    id,
    setScreen,
    setPrDetail,
    KPI,
    note,
    year,
    period,
    username,
    title,
    isFinalized,
  } = props;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
            [{title}] {username}
        </Typography>
        <Typography gutterBottom variant="body1" component="p">
            Năm: {year} (Kì: {period})
        </Typography>
        <Divider />

        <div className={classes.stats}>
          <Typography className={classes.bold} gutterBottom variant="body1"  component="p">
                KPI:
          </Typography>
          <Typography gutterBottom variant="body1" color={KPI ? 'textPrimary' : 'textSecondary'} component="p">
            {KPI || 'cần bổ sung'}
          </Typography>
        </div>
        <div className={classes.stats}>
          <Typography className={classes.bold} gutterBottom variant="body1"  component="p">
            Nhận xét:
          </Typography>
          <Typography gutterBottom variant="body1" color={KPI ? 'textPrimary' : 'textSecondary'} component="p">
            {note || 'cần bổ sung'}
          </Typography>
        </div>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button 
          onClick={() => {
            setPrDetail({
              id,
              reviewee: {
                username,
                KPI,
                note,
              }
            })
            setScreen(1);
          }}
          disabled={!!isFinalized} 
          size="small" 
          variant='outlined' 
          color="primary"
        >
          Cập nhật
        </Button>
      </CardActions>
    </Card>
  );
}