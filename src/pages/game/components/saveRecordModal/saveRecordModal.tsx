import React, { useEffect, useState } from "react";
import { useGame } from "../../contexts/gameContext/index.tsx";
import styled from "styled-components";
import { ButtonDif } from "../../../../components/index.js";
import { useDispatch } from "react-redux";
import { setRecord } from "../../../../actions/setRecord.js";
import { useParams } from "react-router-dom";
import { setLeaderboardRecord } from "../../../../actions/setLeaderboardRecord.js";
import { ButtonUI } from "../../../../components/buttons-UI/button-ui.tsx";

const SaveRecordModalContainer = ({ className }) => {
  const game = useGame();
  const { difficulty } = useParams();
  if (!game) {
    throw new Error("GameContext недоступен");
  }

  const dispatch = useDispatch();

  const [show, setShow] = useState(true);
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (game.state.gameResult === "win") setShow(true);
  }, [game.state.gameResult]);

  const handleSubmit = () => {
    dispatch(setRecord(difficulty, game.state.timer, username));
    dispatch(
      setLeaderboardRecord({
        difficulty,
        time: game.state.timer,
        name: username,
      })
    );
    setShow(false);
  };

  const handleAbort = () => {
    setShow(false);
  };

  return (
    show && (
      <div className={className}>
        <div className="modal-window">
          <div className="modal-content">
            <label>Введите имя для отправки результата</label>
            <input
              name="username"
              value={username}
              autoComplete="false"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Имя"
            />
            <div className="buttons">
              <ButtonUI onClick={handleAbort}>Отменить</ButtonUI>
              <ButtonUI onClick={handleSubmit}>Отправить</ButtonUI>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export const SaveRecordModal = styled(SaveRecordModalContainer)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 24px;

  .modal-window {
    display: flex;
    flex-direction: column;
    background-color: white;
    width: 657px;
    height: 226px;
    padding: 35px 45px 35px 46px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }
  input {
    font-family: "EpilepsySansRegular";
    font-size: 24px;
    display: flex;
    width: 566px;
    padding: 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    margin-top: 16px;
    margin-bottom: 20px;
  }
  .buttons {
    display: flex;
    justify-content: space-around;
    gap: 32px;
  }
`;
