import styled, { css } from "styled-components";

export const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 18px;
  border-radius: 12px;

  ${({ theme }) => css`
    background: ${theme.light};
  `};
`;
