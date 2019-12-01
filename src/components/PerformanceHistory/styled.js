import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

export const Container = styled.div`
    width: 100%;
    margin-top: 24px;
`
export const InverseTableCell = styled(TableCell)`
    color: white !important;
    background: black;
`;

export const useStyles = makeStyles((theme, props) => ({
    root: {
      width: '100%',
      marginBottom: 48,
    },
    paper: {
      border: '1px black solid',
      marginTop: theme.spacing(3),
      width: '100%',
      overflowX: 'auto',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
}));