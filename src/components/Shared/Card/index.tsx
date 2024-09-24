import { FC } from "react";
import { CardContainer } from "./style";

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

const Card: FC<IProps> = ({ children }) => {
  return <CardContainer>{children}</CardContainer>;
};

export default Card;
