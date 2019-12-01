import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';

import { useStyles, InverseTableCell, Container } from './styled';
import { getPRHistory } from './service';

function PRTable() {
    const [prs, setPrs] = useState([]);
    const classes = useStyles();
    useEffect(() => {
        getPRHistory().then(rs => setPrs(rs));
    }, []);

    if (prs.length === 0) {
      return 'Bạn chưa được đánh giá năng lực lần nào';
    }

    return (
    <Container className={classes.root}>
      <h1>Lịch sử đánh giá năng lực: </h1>
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <InverseTableCell>Người đánh gía</InverseTableCell>
              <InverseTableCell>KPI</InverseTableCell>
              <InverseTableCell>Ghi chú</InverseTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prs.map(row => {
              // ConditionalTableCell problem
              return (
                <TableRow
                  key={row.id}
                >
                  <TableCell>{row.managerName}</TableCell>
                  <TableCell>{row.KPI}</TableCell>
                  <TableCell>{row.note}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    </Container>
    );
}

export default PRTable;