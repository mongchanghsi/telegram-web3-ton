"use client";

import { FC } from "react";
import { ButtonContainer, ButtonIcon } from "./style";
import Image from "next/image";

interface IProps {
  id?: string;
  label?: string;
  onClick?: () => void;
  size?: "tiny" | "small" | "medium" | "large";
  variant?: "primary" | "secondary";
  disabled?: boolean;
  startIcon?: JSX.Element | string;
  endIcon?: JSX.Element | string;
}

const RenderButtonIcon = (icon: JSX.Element | string, alt: string) => {
  if (typeof icon === "string") {
    return (
      <ButtonIcon>
        <Image src={icon} alt={alt} fill />
      </ButtonIcon>
    );
  }
  return <>{icon}</>;
};

const Button: FC<IProps> = ({
  id = "",
  label = "",
  onClick = () => {},
  size = "small",
  variant = "primary",
  disabled = false,
  startIcon,
  endIcon,
}) => {
  return (
    <ButtonContainer
      id={id}
      size={size}
      onClick={onClick}
      variant={variant}
      disabled={disabled}
    >
      {startIcon && RenderButtonIcon(startIcon, label ?? "")}
      {label}
      {endIcon && RenderButtonIcon(endIcon, label ?? "")}
    </ButtonContainer>
  );
};

export default Button;
