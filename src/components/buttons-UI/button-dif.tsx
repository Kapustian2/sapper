import React from "react";
import styled from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const ButtonDifContainer = (props: ButtonProps) => {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export const ButtonDif = styled(ButtonDifContainer)`
  font-family: "EpilepsySansRegular";
  display: flex;
  width: 170px;
  padding: 12px 32px;
  justify-content: center;
  color: ${({ children }) => {
    switch (children) {
      case "Легкая":
        return "#00bae2";
      case "Средняя":
        return "#00D715";
      case "Сложная":
        return "#E10000";
      default:
        return "#000";
    }
  }};
  font-size: 32px;

  &:hover {
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  }
`;
