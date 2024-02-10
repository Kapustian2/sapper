import React from "react";
import { ButtonUI } from "../../components";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MainContainer = ({ className }) => {
  return (
    <div className={className}>
      <div>Сапёр</div>
      <div>Выберите сложность</div>
      <div className="row">
        <Link to={`/game/${"easy"}`}>
          <ButtonUI onClick={() => console.log("hi")}>{"лёгкая"}</ButtonUI>
        </Link>
        <Link to={`/game/${"middle"}`}>
          <ButtonUI onClick={() => console.log("hi")}>{"средняя"}</ButtonUI>
        </Link>
        <Link to={`/game/${"hard"}`}>
          <ButtonUI onClick={() => console.log("hi")}>{"сложная"}</ButtonUI>
        </Link>
      </div>
    </div>
  );
};

export const Main = styled(MainContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  .row {
    display: flex;
  }
`;
