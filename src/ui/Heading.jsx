import styled, { css } from "styled-components";

const test = css`
  text-align: center;
`;

const Heading = styled.h1`
  font-size: 30px;
  font-weight: 600;
  ${test}
`;

export default Heading;
