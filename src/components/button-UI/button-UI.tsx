import React from "react";
import styled from "styled-components";

const ButtonUIContainer = ({ className, children, ...props }) => {
  return (
    <div className={className} {...props}>
      <button>
        <span>{children}</span>
      </button>
    </div>
  );
};

export const ButtonUI = styled(ButtonUIContainer)``;
