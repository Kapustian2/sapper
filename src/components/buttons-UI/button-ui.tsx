import React from "react";
import styled from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const ButtonUIContainer = (props: ButtonProps) => {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export const ButtonUI = styled(ButtonUIContainer)`
  font-family: "EpilepsySansRegular";
  font-size: 20px;
  padding: 6px 20px;
  border: 3px solid #000;
  background: #d4d4d4;

  &:hover {
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  }
`;
