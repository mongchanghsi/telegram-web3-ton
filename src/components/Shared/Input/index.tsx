import { FC, useEffect, useState } from "react";
import {
  InputClearButton,
  InputContainer,
  InputContent,
  InputIcon,
} from "./style";
import Image from "next/image";
import RemoveSVG from "@/assets/icons/remove.svg";

interface IProps {
  value?: string;
  type: string;
  onChange: (value: string) => void;
  placeholder: string;
  size?: "tiny" | "small" | "medium" | "large";
  disabled?: boolean;
  startIcon?: JSX.Element | string;
  hasClear?: boolean;
}

const RenderIcon = (
  icon: JSX.Element | string,
  alt: string,
  size: "tiny" | "small" | "medium" | "large"
) => {
  if (typeof icon === "string") {
    return (
      <InputIcon size={size}>
        <Image src={icon} alt={alt} fill />
      </InputIcon>
    );
  }
  return <>{icon}</>;
};

const Input: FC<IProps> = ({
  value = "",
  type = "text",
  onChange = () => {},
  placeholder = "",
  size = "small",
  disabled = false,
  startIcon,
  hasClear = true,
}) => {
  const [inputValue, setInputValue] = useState<string>(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleClear = () => {
    setInputValue("");
    onChange("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <InputContainer size={size}>
      {startIcon && RenderIcon(startIcon, placeholder ?? "", size)}
      <InputContent
        size={size}
        placeholder={placeholder}
        value={inputValue}
        type={type}
        onChange={handleChange}
        disabled={disabled}
      />
      {hasClear && (
        <InputClearButton onClick={handleClear} size={size}>
          <Image src={RemoveSVG} alt="remove" fill />
        </InputClearButton>
      )}
    </InputContainer>
  );
};

export default Input;
