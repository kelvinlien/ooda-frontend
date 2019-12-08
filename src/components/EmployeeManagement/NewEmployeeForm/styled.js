import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 12px;
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