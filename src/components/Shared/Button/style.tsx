import styled, { css } from "styled-components";

export const ButtonContainer = styled.button<{
  variant: "primary" | "secondary";
  disabled: boolean;
  size: "tiny" | "small" | "medium" | "large";
}>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme, size, variant }) => css`
    padding: ${size === "tiny"
      ? theme.spacing.xsmall
      : size === "small"
        ? theme.spacing.small
        : size === "medium"
          ? theme.spacing.medium
          : theme.spacing.large};

    gap: ${size === "tiny"
      ? theme.spacing.xsmall
      : size === "small"
        ? theme.spacing.xsmall
        : size === "medium"
          ? theme.spacing.small
          : theme.spacing.small};

    border-color: ${variant === "primary"
      ? theme.colors.primary
      : variant === "secondary"
        ? theme.colors.secondary
        : theme.colors.primary};

    color: ${theme.colors.primary};

    background-color: ${variant === "primary"
      ? theme.colors.backgroundCard
      : variant === "secondary"
        ? theme.colors.secondary
        : theme.colors.backgroundCard};

    font-size: ${size === "tiny"
      ? theme.fontSizes.small
      : size === "small"
        ? theme.fontSizes.medium
        : size === "medium"
          ? theme.fontSizes.large
          : theme.fontSizes.xlarge};

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: ${theme.boxShadow};
    }

    border-radius: ${theme.spacing.medium};
  `}

  border-width: 2px;
  border-style: solid;
  font-weight: bold;

  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease-in-out;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: none;
  }
`;

export const ButtonIcon = styled.div`
  position: relative;
  height: 24px;
  aspect-ratio: 1/1;
`;
