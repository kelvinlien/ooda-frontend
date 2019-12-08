import React from 'react';
import styled from 'styled-components';
import { ErrorMessage } from 'formik';

const ErrorContainer = styled.div`
        margin: 4px 0;
        color: red;
        font-weight: bold;
    `;

export default function CustomizedErrorForm({ name }) {
    return (
        <ErrorContainer>
            <ErrorMessage
                name={name}
            />
        </ErrorContainer>
    )
}


