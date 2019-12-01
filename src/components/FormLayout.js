import styled, { css } from 'styled-components';

const defaultProps = {
  col: 1,
};

const Layout = styled.div`
  display: grid;
  grid-gap: 20px;
  margin-bottom: 20px;

  ${props => props.col === 1 &&
    css`
      grid-template-columns: 1fr;
    `}

  ${props => props.col > 1 &&
    css`
      grid-template-columns: repeat(${props.col}, 1fr);
    `}

  @media screen and (max-width: 991px) {
    grid-template-columns: 1fr;
  }

  ${props => props.styles}
`;

Layout.defaultProps = defaultProps;

const Divider = styled.hr`
  margin: 40px 0;
  padding: 0;

  ${props => props.styles}
`;

const Error = styled.div`
  height: 20px;
  color: #AE2565;
  text-align: center;
  margin: 20px 0 0;

  ${props => props.styles}
`;

export { Layout, Divider, Error };
