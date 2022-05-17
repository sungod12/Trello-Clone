import React, { useState, useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Header from "./Header";

function BoardComponent() {
  const [hidden, setHidden] = useState(true);
  const [onBoard, setonBoard] = useState(true);
  const [added, setAdded] = useState(false);
  const backgrounds = ["#9acd32", "#1899cc", "#00ffff", "#8a2be2"];
  const [boards, setBoards] = useState([]);
  const [color, setColor] = useState("#1899cc");
  const [input, setInput] = useState("");
  const { axiosJWT, url } = useAuth();
  const history = useHistory();

  const addBoard = async () => {
    await axiosJWT.post(`${url}/addBoard`, {
      boards: boards,
    });
    getBoards();
  };

  const getBoards = async () => {
    const response = await axiosJWT.get(`${url}/getBoards`);
    setBoards(response.data.boardData);
    setAdded(false);
  };

  useLayoutEffect(() => {
    getBoards();
    // eslint-disable-next-line
  }, []);

  useLayoutEffect(() => {
    if (added) addBoard();
    // eslint-disable-next-line
  }, [added]);

  const handleSubmit = () => {
    setBoards([
      {
        boardName: input,
        data: [],
        color: color,
      },
    ]);
    setInput("");
    setColor("#1899cc");
    setHidden(true);
    setAdded(true);
  };

  return (
    <>
      <Header onBoard={onBoard} setonBoard={setonBoard} />
      <div className="hero-container">
        <h3>Your Workspace Boards</h3>
        {!added &&
          boards.map((val, index) => (
            <button
              key={val.id}
              type="button"
              className="create-board-button"
              style={{
                backgroundColor: val.board.color,
                color: "#ffffff",
                fontSize: "1.1rem",
              }}
              onClick={() => {
                history.push(`/boards/${val.board.boardName}`, {
                  color: val.board.color,
                  id: val.id,
                });

                setonBoard(false);
              }}
            >
              {val.board.boardName}
            </button>
          ))}
        <button
          type="button"
          className="create-board-button"
          style={{ fontSize: "1.1rem" }}
          onClick={() => setHidden(false)}
        >
          Create new board.
        </button>
      </div>

      <div
        id="myModal"
        className="modal"
        style={{ display: hidden ? "none" : "block" }}
      >
        <div className="modal-container">
          <div className="modal-content" style={{ backgroundColor: color }}>
            <div>
              <input
                type="text"
                className="new-board-entry"
                placeholder="Add board title"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              ></input>
              <p style={{ color: "white", fontWeight: "500" }}>
                Suraj's Workspace
              </p>
            </div>
            <button
              type="button"
              className="close"
              onClick={() => setHidden(true)}
            >
              &times;
            </button>
          </div>

          <div className="backgrounds">
            {backgrounds.map((val, idx) => (
              <div
                key={idx}
                onClick={(e) => {
                  setColor(e.currentTarget.getAttribute("color-value"));
                }}
                color-value={val}
                style={{ backgroundColor: val, padding: "1rem" }}
              ></div>
            ))}
          </div>

          <button
            type="button"
            className="add-board-button"
            onClick={handleSubmit}
          >
            Create board
          </button>
        </div>
      </div>
    </>
  );
}

export default BoardComponent;
