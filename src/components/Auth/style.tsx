import styled, { css } from "styled-components";

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => css`
    gap: ${theme.spacing.medium};
  `}
`;

export const AuthContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

  ${({ theme }) => css`
    gap: ${theme.spacing.small};
  `}

  & p {
    margin: 0;
    ${({ theme }) => css`
      color: ${theme.colors.primary};
    `}
  }
`;

export const AuthContactCard = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ theme }) => css`
    background: ${theme.colors.backgroundCard};
    padding: ${theme.spacing.small} ${theme.spacing.medium};
    border-radius: ${theme.spacing.small};
  `}
`;
