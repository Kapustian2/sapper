import React, { useEffect, useState } from "react";
import { useGame } from "../../contexts/gameContext/index.tsx";
import styled from "styled-components";
import { ButtonDif } from "../../../../components/index.js";
import { useDispatch } from "react-redux";
import { setRecord } from "../../../../actions/setRecord.js";
import { useParams } from "react-router-dom";
import { setLeaderboardRecord } from "../../../../actions/setLeaderboardRecord.js";

const SaveRecordModalContainer = ({ className }) => {
  const game = useGame();
  const { difficulty } = useParams();
  if (!game) {
    throw new Error("GameContext недоступен");
  }

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
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
            />
            <ButtonDif onClick={handleSubmit}>Отправить</ButtonDif>
            <ButtonDif onClick={handleAbort}>Отменить</ButtonDif>
            <div></div>
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

  .modal-window {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  }
`;
