import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'

import { showGlobalNotice } from '../../../globalService';
import { finalizePR } from '../service';

const useStyles = makeStyles({
  card: {
    maxWidth: 468,
    padding: 16,
  },
  stats: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    display: 'flex',
    marginTop: 12,

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
                message: 'Đã xảy ra lỗi (người quản lý phải điền hết tất cả các trường dữ liệu)',
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