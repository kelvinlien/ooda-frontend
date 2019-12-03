import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});



export default function SimpleTable(props) {
  const classes = useStyles();

    const rows = props.leaveRequests;

    const cellNames = props.cellNames;

    function handleClick(e, decision, id)
    {
      props.leaveDecide(decision, id);
      console.log(Object.keys(props.decidedRequests));
    }


  return (
    <Paper className={classes.root}>
      {props.totalRequest > 0 || props.totalAnnual > 0 ?
        <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              cellNames.map((name, index) => (
                index === 0 ?
                <TableCell>{name}</TableCell>
                :
                name === 'Quyết định' ?
                <TableCell align="center">{name}</TableCell>
                :<TableCell align="right">{name}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              {
                row.title === undefined ?
                <TableCell component="th" scope="row">
                {row.reason}
                </TableCell>
                :
                <>
                <TableCell component="th" scope="row">
                {/* {row.name} */} Pham Huy Phat
                </TableCell>
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">{row.reason}</TableCell>
                </>
              }
              <TableCell align="right">{row.fromDate}</TableCell>
              <TableCell align="right">{row.toDate}</TableCell>
              <TableCell align="right">{row.numberOfDays}</TableCell>
              {row.title === undefined ?    //check if there is a title key in leaveRequests -> tell if current account is a manager or not
              <TableCell align="right">{row.status}</TableCell>
              :Object.keys(props.decidedRequests).includes(''+row.id) ?
              <TableCell align="center">
                {props.decidedRequests[''+row.id]}
              </TableCell>
              :<TableCell align="center">
                <Button
                type="button"
                color="primary"
                onClick = { e => handleClick(e, 'approved', row.id)}
                >
                  Chấp thuận
                </Button>
                <Button
                type = 'button'
                color = 'secondary'
                onClick = { e => handleClick(e, 'rejected', row.id)}
                >
                  Bỏ qua
                </Button>
              </TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    :
    <Typography
    variant = 'h5'
    color = 'inherit'
    align = 'center'
    >
      Hiện tại không có đơn nào cần duyệt
    </Typography>
    }
    </Paper>
  );
}
