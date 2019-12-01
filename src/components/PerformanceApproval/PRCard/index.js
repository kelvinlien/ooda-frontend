import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { showGlobalNotice } from '../../../globalService';
import { finalizePR } from '../service';

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
  media: {
    height: 140,
  },
});

export default function PRCard(props) {
  const {
    onSuccess,
    id,
    setScreen,
    setPrDetail,
    KPI,
    note,
    year,
    managerName,
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
        <Typography gutterBottom variant="h5" component="h2">
            Người đánh gía:  {managerName}
        </Typography>
        <Typography gutterBottom variant="body1" component="p">
            Năm: {year}
        </Typography>
        <Typography gutterBottom variant="body1" component="p">
            Kì: {period}
        </Typography>

        <Typography gutterBottom variant="h5" color={KPI ? 'textPrimary' : 'textSecondary'} component="h5">
              KPI: {KPI || 'Hãy bổ sung vào trường này'}
        </Typography>

        <Typography variant="body2" color={note ? 'textPrimary' : 'textSecondary'} component="p">
          {
            `Nhận xét: ${note || 'Hãy bổ sung vào trường này'}`
          }
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button 
          onClick={() => {
            finalizePR(id).then(rs => {
              if (rs) {
                onSuccess();
                showGlobalNotice({
                    variant: 'info',
                    message: 'Đã duyệt thành công',
                });
                return;
            } 
            showGlobalNotice({
                variant: 'error',
                message: 'Đã xảy ra lỗi',
            });
            })
          }}
          disabled={!!isFinalized} 
          size="small" 
          variant='outlined' 
          color="primary"
        >
          Duyệt
        </Button>
      </CardActions>
    </Card>
  );
}