import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    .note {
        height: 200px;
    }
`

export const ActionContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    .item {
        margin: 12px;
    }
`
