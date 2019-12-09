import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    bigAvatar: {
      width: 120,
      height: 120,
    },
  }));

export const AvatarContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export const Container = styled.div`
    .force-black {
        label {
            color: black !important;
        }

        input {
            color: black !important;
        }
        
    }
    .divider {
        margin: 12px 0;
    }
    .bold {
        font-weight: bold;
    }
    display: flex;
    flex-direction: row;
    height: 600px;
    .icon-text {
        margin: 12px 0;
        display: flex;
        align-items: center;

        span {
            margin-left: 12px;
        }
    }
`
export const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 250px;
    height: 100%;
`

export const FormContainer = styled.div`
    margin: 48px;
    display: flex;
    flex-direction: column;
`
export const ActionContainer = styled.div`
    width: 100%;
    display: flex;
    margin: 24px 0;
    flex-direction: row;
    justify-content: flex-end;
    .item {
        margin: 0 12px;
    }
`


export const MainArea =  styled.div`
    width: 100%;
    height: 100%;
`