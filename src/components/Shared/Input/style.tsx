import { css, styled } from "styled-components";

export const InputContainer = styled.div<{
  size: "tiny" | "small" | "medium" | "large";
}>`
  position: relative;
  width: 100%;
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: center;

  border-width: 2px;
  border-style: solid;

  ${({ theme, size }) => css`
    border-radius: ${theme.spacing.medium};
    padding: ${theme.spacing.medium} ${theme.spacing.large};
  `}
`;

export const InputIcon = styled.div<{
  size: "tiny" | "small" | "medium" | "large";
}>`
  position: relative;
  aspect-ratio: 1/1;

  ${({ theme, size }) => css`
    height: ${size === "tiny"
      ? theme.fontSizes.medium
      : size === "small"
        ? theme.fontSizes.large
        : size === "medium"
          ? theme.fontSizes.large
          : theme.fontSizes.xlarge};
  `}
`;

export const InputContent = styled.input<{
  size: "tiny" | "small" | "medium" | "large";
}>`
  width: 100%;

  border: none;
  outline: none;
  box-shadow: none;

  ${({ theme, size }) => css`
    font-size: ${size === "tiny"
      ? theme.fontSizes.small
      : size === "small"
        ? theme.fontSizes.medium
        : size === "medium"
          ? theme.fontSizes.large
          : theme.fontSizes.xlarge};

    border-radius: ${theme.spacing.medium};
  `}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const InputClearButton = styled.button<{
  size: "tiny" | "small" | "medium" | "large";
}>`
  position: relative;
  border: none;
  margin: 0;
  padding: 0;
  aspect-ratio: 1/1;
  background: transparent;

  ${({ theme, size }) => css`
    height: ${size === "tiny"
      ? theme.fontSizes.small
      : size === "small"
        ? theme.fontSizes.medium
        : size === "medium"
          ? theme.fontSizes.medium
          : theme.fontSizes.medium};
  `}
`;
