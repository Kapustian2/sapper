import React from "react";
import styled from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;

  onClick: () => void;
}

const ButtonUIContainer = (props: ButtonProps) => {
  return (
    <button className={props.className} {...props}>
      {props.children}
    </button>
  );
};

export const ButtonUI = styled(ButtonUIContainer)``;
