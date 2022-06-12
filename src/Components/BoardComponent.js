import React, { useState, useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Header from "./Header";
import Modal from "./Modal";

function BoardComponent() {
  const [onBoard, setonBoard] = useState(true);
  const [added, setAdded] = useState(false);
  const [boards, setBoards] = useState(
    JSON.parse(localStorage.getItem("boards")) || []
  );
  const { axiosJWT, url, checkExpiry } = useAuth();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [showShimmer, setShowShimmer] = useState(false);
  const [hidden, setHidden] = useState(true);

  const getBoards = async () => {
    const response = await axiosJWT.get(`${url}/getBoards`);
    localStorage.setItem("boards", JSON.stringify(response.data.boardData));
    setBoards(JSON.parse(localStorage.getItem("boards")) || []);
    setTimeout(() => setLoading(false), 3500);
  };

  const addBoard = async () => {
    setShowShimmer(true);
    await axiosJWT.post(`${url}/addBoard`, {
      boards: boards,
    });
    setTimeout(() => {
      setShowShimmer(false);
      setAdded(false);
    }, 4500);
  };

  useLayoutEffect(() => {
    if (added) {
      addBoard();
    }
    getBoards();
    return () => setLoading(false);
    // eslint-disable-next-line
  }, [added]);

  useLayoutEffect(() => {
    const timer = setInterval(() => {
      checkExpiry();
    }, 30000);
    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, []);

  return loading ? (
    <h1 className="loading-screen-placeholder">Loading...</h1>
  ) : (
    <>
      <Header onBoard={onBoard} setonBoard={setonBoard} />
      <h3 className="board-screen-title">Your Workspace Boards</h3>
      <div className="hero-container board-container">
        {boards.map((val) => (
          <div key={val.id}>
            {!added && (
              <button
                type="button"
                className="create-board-button"
                style={{
                  backgroundColor: val.board.color,
                  color: "#ffffff",
                  fontSize: "1.1rem",
                }}
                hidden={showShimmer}
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
            )}
            {showShimmer && <div className="create-board-button shimmer"></div>}
          </div>
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
      <Modal
        hidden={hidden}
        setBoards={setBoards}
        setHidden={setHidden}
        setAdded={setAdded}
      />
    </>
  );
}

export default BoardComponent;
